# Generated by Django 5.0.6 on 2024-06-05 08:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('BackApp', '0013_hostelimage_nom_hostelimage_nombre_lits_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='hostel',
            name='nombre_chambres',
        ),
        migrations.RemoveField(
            model_name='hostelimage',
            name='nom',
        ),
        migrations.RemoveField(
            model_name='hostelimage',
            name='nombre_lits',
        ),
        migrations.RemoveField(
            model_name='hostelimage',
            name='rating',
        ),
    ]
