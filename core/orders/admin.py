from django.contrib import admin

from .models import OrderContent, Order


@admin.register(OrderContent)
class OrderContentAdmin(admin.ModelAdmin):
    list_display = ('id', 'order')


class OrderContentInLine(admin.TabularInline):
    model = OrderContent


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'created_by', 'created_at', )
    inlines = [
        OrderContentInLine
    ]
