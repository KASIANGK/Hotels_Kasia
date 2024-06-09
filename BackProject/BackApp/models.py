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
    name = models.CharField(max_length=220, default='')
    image = models.ImageField(upload_to='rooms/', blank=True, null=True)


class Chambre(models.Model):
    name = models.CharField(max_length=255)
    images = models.ManyToManyField(ChambreImage, blank=True, null=True)
    rating = models.IntegerField(default="0")
    prix = models.CharField(max_length=255, default="0")
    promotion = models.BooleanField(default=True)
    disponibilite = models.BooleanField(default=True)
    nombre_lits = models.IntegerField()
    m2 = models.IntegerField(default="0")
    category = models.CharField(max_length=255, default="0")
    hostel_nom = models.ForeignKey('Hostel', on_delete=models.CASCADE, default='Hostel One')  



class HostelImage(models.Model):
    image = models.ImageField(upload_to='hostels/')
    nom = models.CharField(max_length=220, default='')



class Service(models.Model):
    icone = models.ImageField(upload_to='services-icons/', blank=True, null=True)
    titre = models.CharField(max_length=255)
    description = models.CharField(max_length=255, default="Blablabla")
    image = models.ImageField(upload_to='services-img/', blank=True, null=True)


# class Hostel(models.Model):
#     nom = models.CharField(max_length=255)
#     images = models.ManyToManyField(HostelImage, related_name='hostels')  
#     chambres = models.ManyToManyField(Chambre, related_name='hostels')
#     service = models.ManyToManyField(Service, related_name='hostels')
#     rating = models.IntegerField(default=0)
#     nbre_chambres = models.IntegerField(default=0)
class Hostel(models.Model):
    nom = models.CharField(max_length=255)
    location = models.CharField(max_length=255, default='')  # Champ pour enregistrer l'emplacement de l'hôtel
    images = models.ManyToManyField(HostelImage, related_name='hostels', blank=True)  
    chambres = models.ManyToManyField(Chambre, related_name='hostels', blank=True)
    service = models.ManyToManyField(Service, related_name='hostels', blank=True)
    rating = models.IntegerField(default=0)
    nbre_chambres = models.IntegerField(default=0)
    phone = models.CharField(max_length=20, default='')


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


class HeroSlide(models.Model):
    title = models.CharField(max_length=200, default='')
    title_one = models.CharField(max_length=200, default='')
    title_two = models.CharField(max_length=220, default='')
    subtitle = models.CharField(max_length=200, default='')
    rating = models.IntegerField(default=0, null=True)
    hostel_image = models.ForeignKey(HostelImage, on_delete=models.CASCADE)
    hostel = models.ForeignKey(Hostel, on_delete=models.CASCADE)
    phone = models.CharField(max_length=20, default='+980 123 4567 890') 

class SectionManager(models.Model):
    entete = models.CharField(max_length=255, default="MANAGER")
    titre = models.CharField(max_length=255, default="LUXURY BEST HOTEL IN CITY CALIFORNIA, USA")
    contenu = models.TextField(default="Rapidiously myocardinate cross-platform intellectual capital after model. Appropriately create interactive infrastructures after main Holisticly facilitate stand-alone inframe")



class RoomSection(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()



