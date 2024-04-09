from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import NomenclatureViewSet, MenuViewSet, MenuContentViewSet

router = DefaultRouter()
router.register(r'nomenclature', NomenclatureViewSet, basename='nomenclature')
router.register(r'menu', MenuViewSet, basename='menu')
router.register(r'menu-content', MenuContentViewSet, basename='menu-content')

urlpatterns = router.urls

# urlpatterns += [
#     path(r'login/', LDAPLogin.as_view())
# ]