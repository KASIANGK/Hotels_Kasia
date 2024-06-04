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
    # path('connexion/', views.connexion),
    # path('logout/', views.deconnexion),
    # path('users/all/', views.all_users),
    path('avatars/', views.avatars_list),
    path('create-avatar/', views.create_avatar),

    # path('dashboard/', views.dashboard),
    # path('user-update/<int:user_id>/', views.update_user),
    # path('images/', views.images_list),
    # path('categories/', views.categories_list),
    # path('create-images/', views.create_image),
    # path('send-email/', views.send_email),
    # path('mail-content/', views.mail_content),

    path('get_user/', views.get_user),


]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)