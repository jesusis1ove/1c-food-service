from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from core.renders import MainJSONRenderer
from orders.serializers import OrderCreateUpdateSerializer, OrderRetrieveSerializer, OrderContentSerializer, OrderListSerializer
from orders.models import Order, OrderContent


class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, ]
    renderer_classes = [MainJSONRenderer]

    def get_serializer_class(self):
        if self.action == 'list':
            return OrderListSerializer
        elif self.action == 'retrieve':
            return OrderRetrieveSerializer
        return OrderCreateUpdateSerializer

    def get_queryset(self):
        return Order.objects.filter(created_by=self.request.user)
