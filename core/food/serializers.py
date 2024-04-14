from rest_framework import serializers

from .models import Nomenclature, Menu, MenuContent


"""
    Nomenclature
"""

class NomenclatureGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nomenclature
        fields = ('id', 'name', 'is_group')

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['children'] = NomenclatureSerializer(Nomenclature.objects.filter(parent=instance),
                                                            many=True).data
        return representation


class NomenclatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nomenclature
        fields = '__all__'


class NomenclatureSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nomenclature
        fields = ('id', 'name', 'rate', 'price')


"""
    MenuContent
"""


class MenuContentSerializer(serializers.ModelSerializer):
    price = serializers.SerializerMethodField()
    nomenclature = NomenclatureSimpleSerializer(many=True, read_only=True)

    def get_price(self, obj):
        return obj.total_price

    class Meta:
        model = MenuContent
        fields = '__all__'


class MenuContentCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuContent
        fields = '__all__'
        extra_kwargs = {'menu': {'read_only': True}}


"""
    Menu
"""


class MenuRetrieveSerializer(serializers.ModelSerializer):
    content = serializers.SerializerMethodField()

    def get_content(self, obj):
        return MenuContentSerializer(MenuContent.objects.filter(menu=obj), many=True, read_only=True).data

    class Meta:
        model = Menu
        fields = ('__all__')


class MenuListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ('id', 'uuid', 'date', 'name')


class MenuCreateUpdateSerializer(serializers.ModelSerializer):
    content = MenuContentCreateUpdateSerializer(many=True, required=True, write_only=True)

    def create(self, validated_data):
        content = validated_data.pop('content', None)
        menu = Menu.objects.create(**validated_data)
        if content is not None:
            for item in content:
                menu_content = MenuContent.objects.create(menu=menu)
                menu_content.nomenclature.set(item['nomenclature'])
        return menu

    class Meta:
        model = Menu
        fields = '__all__'


class MenuSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ('id', 'name', 'date')
