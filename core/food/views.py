from rest_framework import viewsets, status, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response

from core.renders import MainJSONRenderer

from .permissions import IsAdminOrReadOnly
from .models import Nomenclature, Menu, MenuContent
from .serializers import NomenclatureSerializer, MenuSerializer, MenuCreateUpdateSerializer, \
    MenuContentCreateUpdateSerializer, MenuContentSerializer


class NomenclatureViewSet(viewsets.ModelViewSet):
    queryset = Nomenclature.objects.all()
    serializer_class = NomenclatureSerializer
    renderer_classes = [MainJSONRenderer]


class MenuViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly, ]
    queryset = Menu.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['date']
    renderer_classes = [MainJSONRenderer]

    def get_serializer_class(self):
        if self.action in ('list', 'retrieve'):
            return MenuSerializer
        return MenuCreateUpdateSerializer

    def create(self, request, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MenuContentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly, ]
    renderer_classes = [MainJSONRenderer]

    def get_serializer_class(self):
        if self.action in ('list', 'retreive'):
            return MenuContentSerializer
        return MenuContentCreateUpdateSerializer

    def get_queryset(self):
        menu = self.request.query_params.get('menu')
        if menu is None:
            return MenuContent.objects.none()
        return MenuContent.objects.filter(menu=menu)








