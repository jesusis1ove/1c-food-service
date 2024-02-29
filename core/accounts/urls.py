from django.urls import path

from .views import LDAPLogin

urlpatterns = [
    path(r'login/', LDAPLogin.as_view())
]