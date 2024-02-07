from django.contrib.auth import get_user_model
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from food.models import MenuContent


# Create your models here.
class Order(models.Model):
    note = models.CharField(max_length=255, blank=True, null=True)
    created_by = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class OrderContent(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    menu_content = models.ForeignKey(MenuContent, on_delete=models.CASCADE)
    count = models.PositiveIntegerField(
        default=1,
        validators=[
            MaxValueValidator(99),
            MinValueValidator(1),
        ])

    class Meta:
        unique_together = ('order', 'menu_content')
