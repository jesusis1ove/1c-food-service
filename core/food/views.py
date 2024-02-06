from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend

from .models import Nomenclature, Menu, Order
from .serializers import NomenclatureSerializer, MenuSerializer, OrderCreateSerializer, OrderSerializer


class NomenclatureViewSet(viewsets.ModelViewSet):
    queryset = Nomenclature.objects.all()
    serializer_class = NomenclatureSerializer


class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['date']


class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated,]
    def get_serializer_class(self):
        if self.action in ('list', 'retrieve'):
            return OrderSerializer
        return OrderCreateSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Order.objects.all()
        return Order.objects.filter(created_by=user)






from django.contrib.auth import authenticate, login, logout
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
class LDAPLogin(APIView):
    """
    Class to authenticate a user via LDAP and
    then creating a login session
    """
    authentication_classes = ()

    def post(self, request):
        """
        Api to login a user
        :param request:
        :return:
        """
        user_obj = authenticate(username=request.data['username'],
                                password=request.data['password'])
        login(request, user_obj)
        data={'detail': 'User logged in successfully'}
        return Response(data, status=200)