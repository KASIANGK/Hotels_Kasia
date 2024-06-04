from django.db import models
from django.contrib.auth.models import AbstractUser


class AvatarUser(models.Model):
    nom = models.CharField(max_length=255, default ='')
    image = models.ImageField(upload_to='avatars/', blank=True, null=True)



class Role(models.Model):
    nom = models.CharField(max_length=100, default='')
    

class User(AbstractUser):
    carte_banque = models.CharField(max_length=16, blank=True, null=True)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True)
    nom = models.CharField(max_length=255, default='')
    prenom = models.CharField(max_length=255, default='')
    numero_tel = models.CharField(max_length=20, default='')
    avatar = models.ForeignKey(AvatarUser, on_delete=models.SET_NULL, null=True, blank=True)


class ChambreImage(models.Model):
    image = models.ImageField(upload_to='rooms/', blank=True, null=True)

class Chambre(models.Model):
    nom = models.CharField(max_length=255)
    image = models.ForeignKey(ChambreImage, on_delete=models.CASCADE)
    rating = models.IntegerField(default="0")
    prix = models.CharField(max_length=255, default="0")
    promotion = models.BooleanField(default=True)
    disponibilite = models.BooleanField(default=True)
    nombre_lits = models.IntegerField()
    m2 = models.IntegerField(default="0")
    category = models.CharField(max_length=255, default="0")


class HostelImage(models.Model):
    image = models.ImageField(upload_to='hostels/')


class Service(models.Model):
    icone = models.ImageField(upload_to='services-icons/', blank=True, null=True)
    titre = models.CharField(max_length=255)
    description = models.CharField(max_length=255, default="Blablabla")
    image = models.ImageField(upload_to='services-img/', blank=True, null=True)

class Hostel(models.Model):
    nom = models.CharField(max_length=255)
    image = models.ForeignKey(HostelImage, on_delete=models.CASCADE, default=None)  # Add default value
    nombre_chambres = models.IntegerField()
    chambres = models.ManyToManyField(Chambre, related_name='hostels')
    service = models.ManyToManyField(Service, related_name='hostels')


class Testimonial(models.Model):
    contenu = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()
    image = models.ImageField(upload_to='testimonials/', blank=True, null=True)


class Publication(models.Model):
    titre = models.CharField(max_length=255)
    image = models.ImageField(upload_to='publications/', blank=True, null=True)
    date_publication = models.DateField(default=None)  
    contenu = models.TextField()
    valide = models.BooleanField(default=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE)


class Question(models.Model):
    question = models.TextField()
    reponse = models.TextField()

class Reservation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    chambre = models.ForeignKey(Chambre, on_delete=models.CASCADE)
    date_arrivee = models.DateField()
    date_depart = models.DateField()


class HomeBanner(models.Model):
    titre = models.TextField()
    rating = models.IntegerField()
    image = models.ForeignKey(HostelImage, on_delete=models.CASCADE, default=None)  # Add default value

    
