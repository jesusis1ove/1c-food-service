from django.urls import path

from .views import LDAPLogin, UserView

urlpatterns = [
    path(r'login/', LDAPLogin.as_view()),
    path(r'me/', UserView.as_view())
]