"""
URL configuration for BackProject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from BackApp import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', views.register),
    path('connexion/', views.connexion),
    path('logout/', views.deconnexion),
    path('avatars/', views.avatars_list),
    path('create-avatar/', views.create_avatar),


    path('hostel/', views.get_hostels),
    path('hostels/<int:id>/', views.get_hostel_details),
    path('hostel-images/', views.hostel_image_list),
    path('hostel-images/<int:pk>/', views.hostel_image_detail),
    path('hostels/', views.hostels_list),
    path('create-hostel/', views.create_hostel),
    path('update-hostel/<int:pk>/', views.update_hostel),


    path('get_user/', views.get_user),

    path('hero-slides/', views.get_hero_slides),
    path('hero-slides/', views.create_hero_slide),
    path('hero-slides/<int:pk>/', views.hero_slide_detail), 
    path('hero-slides/update/<int:pk>/', views.update_hero_slide), 
    path('hero-slides/delete/<int:pk>/', views.delete_hero_slide), 
    path('section-manager/', views.get_section_manager),


    path('room-section/', views.get_room_section),

    path('rooms/', views.get_chambres, name='get_chambres'),
    path('rooms-images/', views.get_chambre_images, name='get_chambre_images'),




    path('testimonials/', views.get_testimonials),



]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)