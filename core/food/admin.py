from django.contrib import admin
from .models import Nomenclature, Menu, MenuContent


@admin.register(Nomenclature)
class NomenclatureAdmin(admin.ModelAdmin):
    list_display = ('id', 'uuid', 'name', 'is_group', 'parent')


@admin.register(MenuContent)
class MenuContentAdmin(admin.ModelAdmin):
    list_display = ('id', 'menu')


class MenuContentInline(admin.TabularInline):
    model = MenuContent


@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    list_display = ('id', 'uuid', 'name', 'date')
    inlines = [
        MenuContentInline
    ]




