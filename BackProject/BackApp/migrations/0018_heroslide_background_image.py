# Generated by Django 5.0.6 on 2024-06-05 17:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BackApp', '0017_hostel_background_image_hostelimage_nom'),
    ]

    operations = [
        migrations.AddField(
            model_name='heroslide',
            name='background_image',
            field=models.ImageField(blank=True, null=True, upload_to='hostels_backgrounds/'),
        ),
    ]
