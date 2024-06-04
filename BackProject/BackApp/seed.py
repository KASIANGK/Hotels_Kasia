from django_seed import Seed
from .models import *
from django.contrib.auth.hashers import make_password
import os
from django.core.files.uploadedfile import SimpleUploadedFile
from django.utils.timezone import make_aware
from datetime import datetime

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
        {"nom": "Avatar8", "image": "media/avatars/avatar8.png"},
        # {"name": "Avatar1", "image": "media/avatars/avatar_batman.png"},
        # {"name": "Avatar2", "image": "media/avatars/avatar_boy.png"},
        # {"name": "Avatar3", "image": "media/avatars/avatar_mouton.png"},
        # {"name": "Avatar4", "image": "media/avatars/avatar_zombie.png"},
        # {"name": "Avatar5", "image": "media/avatars/avatar_cloud.png"},
        # {"name": "Avatar6", "image": "media/avatars/avatar_ovni.png"},
        # {"name": "Avatar7", "image": "media/avatars/avatar_koala.png"},
        # {"name": "Avatar8", "image": "media/avatars/avatar_coffee.png"},
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


def run():
    runRole()
    runAdmin()
    runAvatar()
    # runUsers()
