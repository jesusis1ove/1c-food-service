from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.contrib.auth import get_user_model


class Nomenclature(models.Model):
    uuid = models.CharField(max_length=36, unique=True)
    name = models.CharField(max_length=255)
    is_group = models.BooleanField(default=False)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.name


class Menu(models.Model):
    uuid = models.CharField(max_length=36, unique=True)
    name = models.CharField(max_length=255)
    date = models.DateField()
    #content = models.ManyToManyField(Nomenclature, through='MenuContent')

    def __str__(self):
        return self.name


class MenuContent(models.Model):
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    nomenclature = models.ForeignKey(Nomenclature, on_delete=models.CASCADE)
    rate = models.CharField(max_length=150)
    price = models.DecimalField(max_digits=6, decimal_places=2)

    class Meta:
        unique_together = ('menu', 'nomenclature')


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




