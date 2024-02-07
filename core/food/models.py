from django.db import models


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




