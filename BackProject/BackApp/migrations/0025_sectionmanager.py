# Generated by Django 5.0.6 on 2024-06-07 21:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BackApp', '0024_hostel_nbre_chambres'),
    ]

    operations = [
        migrations.CreateModel(
            name='SectionManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('entete', models.CharField(default='MANAGER', max_length=255)),
                ('titre', models.CharField(default='LUXURY BEST HOTEL IN CITY CALIFORNIA, USA', max_length=255)),
                ('contenu', models.TextField(default='Rapidiously myocardinate cross-platform intellectual capital after model. Appropriately create interactive infrastructures after main Holisticly facilitate stand-alone inframe')),
            ],
        ),
    ]