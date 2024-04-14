import datetime

from rest_framework import serializers

from accounts.serializers import UserSimpleSerializer
from food.serializers import MenuContentSerializer, MenuSimpleSerializer

from .models import Order, OrderContent


class OrderContentCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        extra_kwargs = {'order': {'required': False, 'read_only': True}}
        model = OrderContent


class OrderCreateUpdateSerializer(serializers.ModelSerializer):
    content = OrderContentCreateUpdateSerializer(many=True, required=False)

    class Meta:
        model = Order
        fields = '__all__'
        extra_kwargs = {'created_by': {'default': serializers.CurrentUserDefault()}}

    def validate(self, attrs):
        menu = attrs.get('menu')
        for item in attrs.get('content'):
            if item['menu_content'].menu != menu:
                raise serializers.ValidationError('order_content.menu != order.menu')
        return attrs

    def validate_menu(self, value):
        if datetime.date.today() >= value.date:
            raise serializers.ValidationError('date.today() >= menu.date')
        return value

    def create(self, validated_data):
        content = validated_data.pop('content', None)
        order = Order.objects.create(**validated_data)
        if content is not None:
            for content_item in content:
                OrderContent.objects.create(order=order,
                                            menu_content=content_item['menu_content'],
                                            amount=content_item['amount'])
        return order

    def update(self, instance, validated_data):
        content = validated_data.pop('content', None)
        if content is not None:
            OrderContent.objects.filter(order=instance).delete()
            for content_item in content:
                OrderContent.objects.create(order=instance,
                                            menu_content=content_item['menu_content'],
                                            amount=content_item['amount'])
        super().update(instance=instance, validated_data=validated_data)
        return instance


class OrderContentSerializer(serializers.ModelSerializer):
    menu_content = MenuContentSerializer(read_only=True)

    class Meta:
        model = OrderContent
        fields = ('menu_content', 'amount')


class OrderRetrieveSerializer(serializers.ModelSerializer):
    # https://github.com/encode/django-rest-framework/issues/5403
    content = serializers.SerializerMethodField()
    total_price = serializers.SerializerMethodField()
    created_by = UserSimpleSerializer()

    def get_content(self, obj):
        return OrderContentSerializer(OrderContent.objects.filter(order=obj), many=True, read_only=True).data

    def get_total_price(self, obj):
        return obj.total_price

    class Meta:
        model = Order
        fields = ('id', 'menu', 'content', 'note', 'total_price', 'created_by', 'created_at', 'updated_at')


class OrderListSerializer(serializers.ModelSerializer):
    total_price = serializers.SerializerMethodField()
    created_by = UserSimpleSerializer()
    menu = MenuSimpleSerializer()

    def get_total_price(self, obj):
        return obj.total_price

    class Meta:
        model = Order
        fields = ('id', 'menu', 'total_price', 'created_by', 'created_at', 'updated_at')
