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
    avatar_id = data.get('avatar')  
    if User.objects.filter(username=username).exists():
        return JsonResponse({
            'status': 'already_exist',
            'message': 'This username is already used.'
        })

    avatar = AvatarUser.objects.get(id=avatar_id) if avatar_id else None

    new_user = User(
        role_id=1,
        username=username,
        password=make_password(password),
        email=email,
        avatar=avatar 
    )
    new_user.save()

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


@api_view(["POST"])
def connexion(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    user = authenticate(request, username=username, password=password)

    if user is None:
        return JsonResponse({
            "status": "fail_connexion",
            "message": "Invalid username or password"
        }, status=400)  
    else:
        login(request, user)
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        
        return JsonResponse({
            "status": "success",
            "message": "Connexion valid",
            "access_token" : access_token
        })
    



 # VIEW DECONNEXION
@api_view(["POST"])
def deconnexion(request):
    logout(request)
    return redirect('/')
    # return JsonResponse({
    #     "status": "success",
    #     "message": "logout success"
    # })



   

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





@api_view(['POST'])
def create_avatar(request):
    serializer = AvatarUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)




# VIEW HOSTELS
@api_view(["GET"])
def get_hostels(request):
    hostels = Hostel.objects.all()
    serializer = HostelSerializer(hostels, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def get_hostel_details(request, id):
    try:
        hostel = Hostel.objects.get(id=id)
    except Hostel.DoesNotExist:
        return Response({"error": "Hostel not found"}, status=404)
    
    serializer = HostelSerializer(hostel)
    return Response(serializer.data)


# def hostels_list(request):
#     hostels = Hostel.objects.all()
#     hostels_data = [{
#         "id": hostel.id,
#         "nom": hostel.nom,
#         "image_url": request.build_absolute_uri(hostel.image.image.url),
#     } for hostel in hostels]
#     return JsonResponse(hostels_data, safe=False)

def hostels_list(request):
    hostels = Hostel.objects.all()
    hostels_data = [{
        "id": hostel.id,
        "nom": hostel.nom,
        "image_url": request.build_absolute_uri(hostel.images.first().image.url) if hostel.images.exists() else None,
    } for hostel in hostels]
    return JsonResponse(hostels_data, safe=False)



@api_view(['GET', 'POST'])
def hostel_image_list(request):
    if request.method == 'GET':
        images = HostelImage.objects.all()
        serializer = HostelImageSerializer(images, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = HostelImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
def hostel_image_detail(request, pk):
    try:
        image = HostelImage.objects.get(pk=pk)
    except HostelImage.DoesNotExist:
        return Response(status=404)

    if request.method == 'GET':
        serializer = HostelImageSerializer(image)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = HostelImageSerializer(image, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    elif request.method == 'DELETE':
        image.delete()
        return Response(status=204)
    
# @api_view(['POST'])
# def create_hostel(request):
#     hostel_serializer = HostelSerializer(data=request.data)
#     if hostel_serializer.is_valid():
#         hostel = hostel_serializer.save()
#         image_data = request.data.get('images')  # Récupérer les données des images depuis la requête
#         if image_data:
#             # Créer et associer les images à l'hostel
#             for image_item in image_data:
#                 image_serializer = HostelImageSerializer(data=image_item)
#                 if image_serializer.is_valid():
#                     image_serializer.save(hostel=hostel)
#                 else:
#                     return Response(image_serializer.errors, status=400)
#         return Response(hostel_serializer.data, status=201)
#     return Response(hostel_serializer.errors, status=400)
    
@api_view(['POST'])
def create_hostel(request):
    # Récupérer les données de la requête
    hostel_data = request.data.copy()  # Copier les données de la requête

    # Retirer les champs facultatifs s'ils sont vides dans la requête
    if 'chambres' in hostel_data and not hostel_data['chambres']:
        hostel_data.pop('chambres')
    if 'service' in hostel_data and not hostel_data['service']:
        hostel_data.pop('service')

    # Définir les champs facultatifs sur None s'ils ne sont pas présents dans la requête
    for field in ['rating', 'nbre_chambres']:
        if field not in hostel_data:
            hostel_data[field] = None

    # Créer une instance du sérialiseur avec les données modifiées
    hostel_serializer = HostelSerializer(data=hostel_data)

    # Valider et sauvegarder le sérialiseur
    if hostel_serializer.is_valid():
        hostel = hostel_serializer.save()
        # Traitement supplémentaire pour les images...
        return Response(hostel_serializer.data, status=201)
    return Response(hostel_serializer.errors, status=400)



@api_view(['PUT'])
def update_hostel(request, pk):  # Renommer le paramètre en 'pk'
    try:
        hostel = Hostel.objects.get(id=pk)  # Utiliser 'pk' pour récupérer l'objet Hostel
    except Hostel.DoesNotExist:
        return Response({"error": "Hostel not found"}, status=404)

    if request.method == 'PUT':
        serializer = HostelSerializer(hostel, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)



    


# Vue pour obtenir les détails d'un HeroSlide spécifique
@api_view(['GET'])
def hero_slide_detail(request, pk):
    try:
        hero_slide = HeroSlide.objects.get(pk=pk)
    except HeroSlide.DoesNotExist:
        return Response({'error': 'Hero slide not found.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = HeroSlideSerializer(hero_slide)
    return Response(serializer.data)

# Vue pour obtenir tous les HeroSlides
@api_view(['GET'])
def get_hero_slides(request):
    hero_slides = HeroSlide.objects.all()
    serializer = HeroSlideSerializer(hero_slides, many=True)
    return Response(serializer.data)

# Vue pour créer un nouveau HeroSlide
@api_view(['POST'])
def create_hero_slide(request):
    serializer = HeroSlideSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Vue pour mettre à jour un HeroSlide spécifique
@api_view(['PUT'])
def update_hero_slide(request, pk):
    try:
        hero_slide = HeroSlide.objects.get(pk=pk)
    except HeroSlide.DoesNotExist:
        return Response({'error': 'Hero slide not found.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = HeroSlideSerializer(hero_slide, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Vue pour supprimer un HeroSlide spécifique
@api_view(['DELETE'])
def delete_hero_slide(request, pk):
    try:
        hero_slide = HeroSlide.objects.get(pk=pk)
    except HeroSlide.DoesNotExist:
        return Response({'error': 'Hero slide not found.'}, status=status.HTTP_404_NOT_FOUND)

    hero_slide.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

# @api_view(['GET'])
# def get_hero_slides(request):
#     if request.method == 'GET':
#         hero_slides = HeroSlide.objects.all()
#         serializer = HeroSlideSerializer(hero_slides, many=True)
#         return Response(serializer.data)
    

# @api_view(['POST'])
# def create_hero_slide(request):
#     if request.method == 'POST':
#         serializer = HeroSlideSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=201)
#         return Response(serializer.errors, status=400)



@api_view(['GET'])
def get_section_manager(request):
    section_manager = SectionManager.objects.all()
    serializer = SectionManagerSerializer(section_manager, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def get_testimonials(request):
    testimonials = Testimonial.objects.all()
    serializer = TestimonialSerializer(testimonials, many=True)
    return Response(serializer.data)




@api_view(['GET'])
def get_room_section(request):
    try:
        room_sections = RoomSection.objects.all()
    except RoomSection.DoesNotExist:
        return Response({'error': 'Room sections not found.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = RoomSectionSerializer(room_sections, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_chambres(request):
    try:
        chambres = Chambre.objects.all()
    except Chambre.DoesNotExist:
        return Response({'error': 'Chambres not found.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ChambreSerializer(chambres, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_chambre_images(request):
    try:
        images = ChambreImage.objects.all()
    except ChambreImage.DoesNotExist:
        return Response({'error': 'Images not found.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ChambreImageSerializer(images, many=True)
    return Response(serializer.data)