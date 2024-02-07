from rest_framework import serializers

from .models import Nomenclature, Menu, MenuContent


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


