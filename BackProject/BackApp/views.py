from django.shortcuts import render, redirect # Je ne vais jamais faire de render sur une page html interne au projet, mais je pourrais

from django.contrib.auth import authenticate, login, logout # sert a gérer les fonction built in de django: login, logout, auth
from django.contrib.auth.hashers import make_password # pour hacher un mdp (obligatoire avant de l e stocker dans la db)
from rest_framework.decorators import api_view, permission_classes # Je veux une vieuw api + je veux gérer des permission sur certaines vue
from rest_framework_simplejwt.authentication import JWTAuthentication # Je vais gérer les token de manière simplifiée
from rest_framework.permissions import IsAuthenticated # Je vais pouvoir vérifier si un user est connecté et avoir accès a ces données
from rest_framework_simplejwt.tokens import RefreshToken # je veux le refresh token

from .models import *
from .serializers import *

import json # pour pouvoir interpréter des données recues en Json
from django.http import JsonResponse # envoyer des reponse en Json
from rest_framework.response import Response # envoi réponse HTTP (ici on utilise des réponse Http au lieu de render une page)

from django.core.mail import send_mail 
from django.template.loader import render_to_string # template HTML

from django.views.decorators.csrf import csrf_exempt
from rest_framework import status # connaitre le status de l'erreur en cas d'erreur

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer

import logging


# VIEW REGISTER
@api_view(["POST"])
def register(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    avatar_id = data.get('avatar')  # Get the avatar ID from the request data
    
    if User.objects.filter(username=username).exists():
        return JsonResponse({
            'status': 'already_exist',
            'message': 'This username is already used.'
        })

    # Check if the avatar ID is valid
    avatar = AvatarUser.objects.get(id=avatar_id) if avatar_id else None

    new_user = User(
        role_id=1,
        username=username,
        password=make_password(password),
        email=email,
        avatar=avatar  # Set the avatar field
    )
    new_user.save()

    # mail_context = render_to_string("mailTemplate.html", {"username": username})
    # send_mail("new account", "", DEFAULT_BACK_EMAIL, [email], html_message=mail_context)

    return JsonResponse({
        "status": 'success',
        "message": 'Account successfully created',
    })

    # mail_context = render_to_string("mailTemplate.html", {"username": username})
    # send_mail("new account", "", DEFAULT_BACK_EMAIL, [email], html_message=mail_context)

    return JsonResponse({
        "status": 'success',
        "message": 'Account successfully created',
    })



def get_user(request):
    try:
        auth = JWTAuthentication()
        user , _ = auth.authenticate(request)
    except:
         return JsonResponse({
            "status": "not_connected",
            "message": "request do not contain JWtoken"
        })
    
    serializer = UserSerializer(user)
    user_data = serializer.data

    return JsonResponse({
            "status": "success",
            "message": "get_user() successfully result",
            "user_data" : user_data
        })






# VIEW AVATARS
@api_view(["GET"])
def get_avatars(request):
    avatars = AvatarUser.objects.all()
    serializer = AvatarUserSerializer(avatars, many=True)
    return Response(serializer.data)



def avatars_list(request):
    avatars = AvatarUser.objects.all()
    avatars_data = [{"id": avatar.id, "nom": avatar.nom, "image_url": request.build_absolute_uri(avatar.image.url)} for avatar in avatars]
    return JsonResponse(avatars_data, safe=False)


# @api_view(['POST'])
# def create_avatar(request):
#     serializer = AvatarUserSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=201)
#     return Response(serializer.errors, status=400)


@api_view(['POST'])
def create_avatar(request):
    serializer = AvatarUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)