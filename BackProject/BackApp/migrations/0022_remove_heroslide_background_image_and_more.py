# Generated by Django 5.0.6 on 2024-06-06 16:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BackApp', '0021_rename_title_second_heroslide_title_two'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='heroslide',
            name='background_image',
        ),
        migrations.AlterField(
            model_name='heroslide',
            name='rating',
            field=models.IntegerField(default=0, null=True),
        ),
    ]
