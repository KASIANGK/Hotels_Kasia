# Generated by Django 5.0.6 on 2024-06-08 16:06

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BackApp', '0034_rename_nom_chambre_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chambre',
            name='image',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='BackApp.chambreimage'),
        ),
    ]
