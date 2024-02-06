# Generated by Django 5.0.1 on 2024-02-06 06:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Menu",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("uuid", models.CharField(max_length=36, unique=True)),
                ("name", models.CharField(max_length=255)),
                ("date", models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name="Nomenclature",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("uuid", models.CharField(max_length=36, unique=True)),
                ("name", models.CharField(max_length=255)),
                ("is_group", models.BooleanField(default=False)),
                (
                    "parent",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="food.nomenclature",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="MenuContent",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("rate", models.CharField(max_length=150)),
                ("price", models.DecimalField(decimal_places=2, max_digits=6)),
                (
                    "menu",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="food.menu"
                    ),
                ),
                (
                    "nomenclature",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="food.nomenclature",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="menu",
            name="content",
            field=models.ManyToManyField(
                through="food.MenuContent", to="food.nomenclature"
            ),
        ),
    ]