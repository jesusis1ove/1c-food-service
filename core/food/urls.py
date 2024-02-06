from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import NomenclatureViewSet, MenuViewSet, LDAPLogin

router = DefaultRouter()
router.register(r'nomenclature', NomenclatureViewSet, basename='nomenclatures')
router.register(r'menu', MenuViewSet, basename='menu')

urlpatterns = router.urls

urlpatterns += [
    path(r'login/', LDAPLogin.as_view())
]