from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from orders.serializers import OrderCreateSerializer, OrderSerializer
from orders.models import Order


# Create your views here.
class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated,]
    def get_serializer_class(self):
        if self.action in ('list', 'retrieve'):
            return OrderSerializer
        return OrderCreateSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Order.objects.all()
        return Order.objects.filter(created_by=user)
