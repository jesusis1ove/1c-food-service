from rest_framework import viewsets

from .models import Nomenclature, Menu, MenuContent
from .serializers import NomenclatureSerializer, MenuSerializer, MenuContentSerializer


class NomenclatureViewSet(viewsets.ModelViewSet):
    queryset = Nomenclature.objects.all()
    serializer_class = NomenclatureSerializer


class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
