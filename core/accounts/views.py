from django.contrib.auth import authenticate, login
from rest_framework import status

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
        login(request, user_obj, backend="django_auth_ldap.backend.LDAPBackend")
        return Response({"success": "true"}, status=status.HTTP_200_OK)