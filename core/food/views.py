from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

from .models import Nomenclature, Menu
from .serializers import NomenclatureSerializer, MenuSerializer


class NomenclatureViewSet(viewsets.ModelViewSet):
    queryset = Nomenclature.objects.all()
    serializer_class = NomenclatureSerializer


class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['date']


