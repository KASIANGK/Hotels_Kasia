# Generated by Django 5.0.6 on 2024-06-08 11:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BackApp', '0028_hostel_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='heroslide',
            name='phone',
            field=models.CharField(default='+980 123 4567 890', max_length=20),
        ),
    ]