# Generated by Django 5.0.1 on 2024-02-06 06:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("food", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="nomenclature",
            name="parent",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="food.nomenclature",
            ),
        ),
    ]