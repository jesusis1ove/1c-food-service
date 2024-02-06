from rest_framework import serializers

from .models import Nomenclature, Menu, MenuContent


class NomenclatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nomenclature
        fields = ('__all__')


class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ('__all__')


class MenuContentSerializer(serializers.ModelSerializer):
    class Meta:
        model =MenuContent
        fields = ('__all__')

