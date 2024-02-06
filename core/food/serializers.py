from rest_framework import serializers

from .models import Nomenclature, Menu, MenuContent, Order, OrderContent


class NomenclatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nomenclature
        fields = ('__all__')


class NomenclatureSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nomenclature
        fields = ('id', 'name')


class MenuContentSerializer(serializers.ModelSerializer):
    nomenclature = NomenclatureSimpleSerializer(read_only=True)
    class Meta:
        model = MenuContent
        fields = ('__all__')


class MenuSerializer(serializers.ModelSerializer):
    content = serializers.SerializerMethodField()

    def get_content(self, obj):
        return MenuContentSerializer(MenuContent.objects.filter(menu=obj), many=True, read_only=True).data

    class Meta:
        model = Menu
        fields = ('__all__')


class OrderCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('__all__')
        extra_kwargs = {'created_by': {'default': serializers.CurrentUserDefault()}}


class OrderContentSerializer(serializers.ModelSerializer):
    menu_content = serializers.SerializerMethodField()
    nomenclature = serializers.SerializerMethodField()

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
