from rest_framework import viewsets

from .models import Nomenclature, Menu, MenuContent
from .serializers import NomenclatureSerializer, MenuSerializer, MenuContentSerializer


class NomenclatureViewSet(viewsets.ModelViewSet):
    queryset = Nomenclature.objects.all()
    serializer_class = NomenclatureSerializer


class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer


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