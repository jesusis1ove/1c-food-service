from django.contrib import admin
from .models import Nomenclature, Menu, MenuContent, Order, OrderContent


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


class OrderContentInLine(admin.TabularInline):
    model = OrderContent


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'created_by', 'created_at', )
    inlines = [
        OrderContentInLine
    ]



