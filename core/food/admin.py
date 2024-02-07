from django.contrib import admin
from .models import Nomenclature, Menu, MenuContent


@admin.register(Nomenclature)
class NomenclatureAdmin(admin.ModelAdmin):
    list_display = ('uuid', 'name', 'is_group', 'parent')


class MenuContentInline(admin.TabularInline):
    model = MenuContent


@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    list_display = ('uuid', 'name', 'date')
    inlines = [
        MenuContentInline
    ]




