# Generated by Django 5.0.6 on 2024-06-05 16:33

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BackApp', '0015_hostel_rating'),
    ]

    operations = [
        migrations.CreateModel(
            name='HeroSlide',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('subtitle', models.CharField(max_length=200)),
                ('rating', models.IntegerField()),
                ('hostel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='BackApp.hostel')),
                ('hostel_image', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='BackApp.hostelimage')),
            ],
        ),
        migrations.DeleteModel(
            name='HomeBanner',
        ),
    ]
