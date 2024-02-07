from django.contrib import admin

from .models import OrderContent, Order


class OrderContentInLine(admin.TabularInline):
    model = OrderContent


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'created_by', 'created_at', )
    inlines = [
        OrderContentInLine
    ]
