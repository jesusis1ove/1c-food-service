from django.db import models
from django.contrib.postgres.fields import ArrayField


class Nomenclature(models.Model):
    uuid = models.CharField(max_length=36, unique=True)
    name = models.CharField(max_length=255)
    rate = models.CharField(max_length=150, blank=True, null=True)
    price = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    is_group = models.BooleanField(default=False)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.name


class Menu(models.Model):
    uuid = models.CharField(max_length=36, blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    date = models.DateField()
    #content = models.ManyToManyField('MenuContent', related_name='menu_content')

    def __str__(self):
        return self.name


class MenuContent(models.Model):
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    nomenclature = models.ManyToManyField(Nomenclature, related_name='menucontent_nomenclature')

    @property
    def total_price(self):
        queryset = self.nomenclature.all().aggregate(total_price=models.Sum('price'))
        return queryset['total_price']


