from rest_framework.routers import DefaultRouter

from .views import NomenclatureViewSet, MenuViewSet

router = DefaultRouter()
router.register(r'nomenclature', NomenclatureViewSet, basename='nomenclatures')
router.register(r'menu', MenuViewSet, basename='menu')

urlpatterns = router.urls
