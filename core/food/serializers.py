from rest_framework import serializers

from .models import Nomenclature, Menu, MenuContent


class NomenclatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nomenclature
        fields = ('__all__')


class MenuContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuContent
        fields = ('__all__')


class MenuSerializer(serializers.ModelSerializer):
    content = MenuContentSerializer(many=True, read_only=True)

    class Meta:
        model = Menu
        fields = ('__all__')



