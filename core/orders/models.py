from django.contrib.auth import get_user_model
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from food.models import Menu, MenuContent


class Order(models.Model):
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    note = models.CharField(max_length=255, blank=True, null=True)
    created_by = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def total_price(self):
        queryset = OrderContent.objects.filter(order=self).values('menu_content__nomenclature__price')\
            .aggregate(total_price=models.Sum('menu_content__nomenclature__price'))
        return queryset['total_price']


class OrderContent(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='contents')
    menu_content = models.ForeignKey(MenuContent, on_delete=models.CASCADE, related_name='orders')
    amount = models.PositiveIntegerField(
        default=1,
        validators=[
            MaxValueValidator(10),
            MinValueValidator(1),
        ])

    class Meta:
        unique_together = ('order', 'menu_content')
