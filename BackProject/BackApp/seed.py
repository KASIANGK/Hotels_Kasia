from django_seed import Seed
from .models import *
from django.contrib.auth.hashers import make_password
import os
from django.core.files.uploadedfile import SimpleUploadedFile

def runRole():
    seeder = Seed.seeder()

    roles = [
        {"nom": "user"},
        {"nom": "admin"},
        {"nom": "receptionnist"},
        {"nom": "webmaster"},
        {"nom": "writer"},
    ]

    for r in roles:
        seeder.add_entity(Role, 1, r)

    pks = seeder.execute()
    print("Roles created:", pks)

def runAdmin():
    if not User.objects.filter(username="admin").exists():
        seeder = Seed.seeder()
        psw = make_password('admin')

        seeder.add_entity(User, 1, {
            'username': "admin",
            "email": "dummy@gmail.com",
            "password": psw,
            "role_id": 2,
            "last_login": None
        })

        pks = seeder.execute()
        print("Admin created:", pks)
    else:
        print("Admin already exists.")

def runAvatar():
    seeder = Seed.seeder()

    avatars_data = [
        {"nom": "Avatar1", "image": "media/avatars/avatar.png"},
        {"nom": "Avatar2", "image": "media/avatars/avatar2.png"},
        {"nom": "Avatar3", "image": "media/avatars/avatar3.png"},
        {"nom": "Avatar4", "image": "media/avatars/avatar4.png"},
        {"nom": "Avatar5", "image": "media/avatars/avatar5.png"},
        {"nom": "Avatar6", "image": "media/avatars/avatar6.png"},
        {"nom": "Avatar7", "image": "media/avatars/avatar7.png"},
        {"nom": "Avatar8", "image": "media/avatars/avatar8.png"}
    ]

    for avatar in avatars_data:
        image_path = avatar['image']
        with open(image_path, 'rb') as image_file:
            image = SimpleUploadedFile(name=os.path.basename(image_path), content=image_file.read())
            seeder.add_entity(AvatarUser, 1, {
                'nom': avatar['nom'],
                'image': image,
            })

    pks = seeder.execute()
    print("Avatars created:", pks)



def runHostels():
    hostel_data = [
        {"name": "Hostel One", "location": "WARSAW", "image": "media/hostels/h1.jpg", "rating": 5, "phone": "+980 123 4567 891"},
        {"name": "Hostel Two", "location": "KASHMIR", "image": "media/hostels/h2.jpg", "rating": 4, "phone": "+980 123 4567 892"},
        {"name": "Hostel Three", "location": "COLOSSEUM", "image": "media/hostels/h3.jpg", "rating": 3, "phone": "+980 123 4567 893"},
        {"name": "Hostel Four", "location": "Some Other Location", "image": "media/hostels/h4.jpg", "rating": 5, "phone": "+980 123 4567 894"},
    ]

    for data in hostel_data:
        image_path = data['image']
        name = data['name']
        location = data['location']
        rating = data['rating']
        phone = data['phone']
        
        with open(image_path, 'rb') as image_file:
            image = SimpleUploadedFile(name=os.path.basename(image_path), content=image_file.read())
            hostel_image = HostelImage.objects.create(image=image)
        
        # Create a Hostel associated with each image
        hostel = Hostel.objects.create(
            nom=name,
            location=location,  # Assigner l'emplacement de l'hôtel
            rating=rating,  # Assigner la valeur de rating de l'hôtel
            phone=phone,  # Assigner la valeur de téléphone de l'hôtel
        )
        hostel.images.add(hostel_image)  # Ajouter l'image à la liste des images de l'auberge

    print("Hostels created")



    
def runHeroSlides():
    seeder = Seed.seeder()

    # Obtenez tous les hôtels existants
    hostels = Hostel.objects.all()

    # Si aucun hôtel n'existe, vous pouvez gérer ce cas en conséquence
    if not hostels.exists():
        print("No hostels found. Please make sure to create hostels before creating HeroSlides.")
        return

    hero_slides_data = [
        {
            "title": f"TITLE {index + 1}",
            "title_one": "THE BEST LUXURY HOTEL",
            "title_two": f"IN {hostel.location.upper()}",  # Utiliser l'emplacement de l'hôtel pour le titre_two
            "subtitle": "LUXURY HOTEL AND RESORT",
            "rating": hostel.rating, 
            "phone": hostel.phone,
            "hostel": hostel,
            "hostel_image": hostel.images.first()  # Utiliser la première image de l'hôtel
        }
        for index, hostel in enumerate(hostels)
    ]

    for hero_slide_data in hero_slides_data:
        seeder.add_entity(HeroSlide, 1, hero_slide_data)

    pks = seeder.execute()
    print("HeroSlides created:", pks)








import os
import django
import random



from django.contrib.auth import get_user_model


User = get_user_model()

def runCreateSectionManager():
    section_data = {
        "entete": "MANAGER",
        "titre": "LUXURY BEST HOTEL IN CITY CALIFORNIA, USA",
        "contenu": (
            "Rapidiously myocardinate cross-platform intellectual capital after model. "
            "Appropriately create interactive infrastructures after main Holisticly facilitate stand-alone inframe"
        )
    }
    SectionManager.objects.create(**section_data)
    print("SectionManager seeded successfully.")

def runCreateTestimonials():
    users = User.objects.all()
    if users.exists():
        for i in range(5):
            testimonial_data = {
                "contenu": f"Testimonial content {i}",
                "author": random.choice(users),
                "rating": random.randint(1, 5),
                "image": None  # Vous pouvez ajouter le chemin vers une image si nécessaire
            }
            Testimonial.objects.create(**testimonial_data)
        print("Testimonials seeded successfully.")
    else:
        print("No users found. Please create some users first.")

from faker import Faker

fake = Faker()

def runTestimonial():
    seeder = Seed.seeder()
    
    # Vérifiez d'abord qu'il y a au moins un utilisateur existant pour être l'auteur des témoignages
    if not User.objects.exists():
        print("No users exist. Please create users first.")
        return

    users = list(User.objects.all())
    testimonials_data = [
        {
            'contenu': fake.paragraph(nb_sentences=5),
            'author': users[fake.random_int(0, len(users) - 1)],
            'rating': fake.random_int(min=1, max=5),
            'image': None  # Ajoutez une logique pour les images si nécessaire
        }
        for _ in range(10)
    ]

    for data in testimonials_data:
        seeder.add_entity(Testimonial, 1, data)

    pks = seeder.execute()
    print("Testimonials created:", pks)



def runSectionManager():
    seeder = Seed.seeder()
    
    section_manager_data = {
        'entete': "MANAGER",
        'titre': "LUXURY BEST HOTEL IN CITY CALIFORNIA, USA",
        'contenu': fake.text(max_nb_chars=200),
    }

    seeder.add_entity(SectionManager, 1, section_manager_data)

    pks = seeder.execute()
    print("SectionManager created:", pks)





def runRoomSection():
    fake = Faker()
    seeder = Seed.seeder()
    
    room_section_data = {
        'title': "Royal Luxury Rooms and Blablabla",
        'description': fake.text(max_nb_chars=200),
    }

    seeder.add_entity(RoomSection, 1, room_section_data)

    pks = seeder.execute()
    print("RoomSection created:", pks)


def runChambres():
    # seeder = Seed.seeder()

    chambre_images_data = [
        {"name": "Image One", "image_path": "media/rooms/r2.jpg"},
        {"name": "Image Two", "image_path": "media/rooms/r3.jpg"},
        # {"name": "Image Three", "image_path": "media/rooms/r2.jpg"}
    ]

    chambre_images = []
    for data in chambre_images_data:
        image_path = data['image_path']
        with open(image_path, 'rb') as image_file:
            image = SimpleUploadedFile(name=data['name'], content=image_file.read(), content_type='image/jpeg')
            chambre_image = ChambreImage.objects.create(name=data['name'], image=image)
            chambre_image.save()
            chambre_images.append(chambre_image)

    
    print("ChambreImages created successfully.")


    chambre_data = [
        {"name": "Room One", "rating": 5, "prix": "250", "promotion": True, "disponibilite": True, "nombre_lits": 2, "m2": 25, "category": "Standard", "hostel_nom": "Hostel One"},
        {"name": "Room Two", "rating": 5, "prix": "200", "promotion": True, "disponibilite": True, "nombre_lits": 1, "m2": 30, "category": "Standard", "hostel_nom": "Hostel Two"},
    ]

    for data in chambre_data:
        hostel_nom = data.pop('hostel_nom')
        hostel_instance = Hostel.objects.get(nom=hostel_nom)

        chambre_instance = Chambre.objects.create(**data, hostel_nom=hostel_instance)
        chambre_instance.save()

        for chambre_image in chambre_images:
                chambre_instance.images.add(chambre_image)

    print("Chambres created successfully.")





def run():
    runRole()
    runAdmin()
    runAvatar()
    runHostels()
    runHeroSlides()
    runCreateSectionManager()
    runCreateTestimonials()
    runRoomSection()
    runChambres()

