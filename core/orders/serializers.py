from rest_framework import serializers

from food.models import MenuContent, Nomenclature
from food.serializers import NomenclatureSimpleSerializer, MenuContentSerializer

from orders.models import Order, OrderContent


class OrderContentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('menu_content', 'amount')
        #extra_kwargs = {'order': {'required': False}}
        model = OrderContent


class OrderCreateSerializer(serializers.ModelSerializer):
    content = OrderContentCreateSerializer(many=True, required=False)
    class Meta:
        model = Order
        fields = ('__all__')
        extra_kwargs = {'created_by': {'default': serializers.CurrentUserDefault()}}

    def create(self, validated_data):
        content = validated_data.pop('content')
        order = Order.objects.create(**validated_data)
        if content is not None:
            for content_item in content:
                OrderContent.objects.create(menu_content=content_item['menu_content'],
                                            amount=content_item['amount'],
                                            order=order)
        return order


class OrderContentSerializer(serializers.ModelSerializer):
    menu_content = serializers.SerializerMethodField()

    def get_nomenclature(self, obj):
        nomenclature_pks = MenuContent.objects.filter(id=obj.menu_content.id).values_list('nomenclature', flat=True)
        return NomenclatureSimpleSerializer(Nomenclature.objects.filter(id__in=nomenclature_pks).first(), ).data

    def get_menu_content(self, obj):
        return MenuContentSerializer(MenuContent.objects.filter(id=obj.menu_content.id), many=True, read_only=True).data

    class Meta:
        model = OrderContent
        fields = ('__all__')


class OrderSerializer(serializers.ModelSerializer):
    content = serializers.SerializerMethodField()

    def get_content(self, obj):
        return OrderContentSerializer(OrderContent.objects.filter(order=obj), many=True, read_only=True).data

    class Meta:
        model = Order
        fields = ('__all__')
