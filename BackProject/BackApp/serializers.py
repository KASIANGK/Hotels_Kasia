from rest_framework import serializers
from .models import *

class AvatarUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvatarUser
        fields = '__all__'
        extra_kwargs = {
            'image': {'required': False}  
        }


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    avatar = AvatarUserSerializer(required=False)
    
    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {'password': {'write_only': True}}


    # fonction pour ajouter des fonctionnalités personnalisées au sérialiseur tout en conservant le comportement par défaut pour les autres aspects de la sérialisation
    def to_representation(self, instance):
        #En appelant super().to_representation(instance), on appelle la méthode to_representation() de la classe mère afin de récupérer la représentation par défaut de l'instance du modèle. 
        #Ensuite, on peut ajouter des modifications personnalisées à cette représentation, comme ici, l'ajout de l'URL de l'image de l'avatar
        rep = super().to_representation(instance)
        if instance.avatar is not None and instance.avatar.image is not None:
            rep['avatar'] = {
                'id': instance.avatar.id,
                'nom': instance.avatar.nom,
                'image': instance.avatar.image.url  # instance.avatar.image.url
            }
        return rep


class ChambreImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChambreImage
        fields = "__all__"
        extra_kwargs = {
            'image': {'required': False}  
        }

class ChambreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chambre
        fields = '__all__'

class HostelImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HostelImage
        fields = ['id', 'image']
        extra_kwargs = {
            'image': {'required': False}  
        }

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"

class HostelSerializer(serializers.ModelSerializer):
    chambres = ChambreSerializer(many=True)
    service = ServiceSerializer(many=True)

    class Meta:
        model = Hostel
        fields = '__all__'
        extra_kwargs = {
            'rating': {'required': False},
            'nbre_chambres': {'required': False}
        }


    # def create(self, validated_data):
    #     chambres_data = validated_data.pop('chambres')
    #     services_data = validated_data.pop('service')
    #     hostel = Hostel.objects.create(**validated_data)
    #     for chambre_data in chambres_data:
    #         Chambre.objects.create(hostel=hostel, **chambre_data)
    #     for service_data in services_data:
    #         Service.objects.create(hostel=hostel, **service_data)
    #     return hostel

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = "__all__"

class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = "__all__"

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'

# class HomeBannerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = HomeBanner
#         fields = '__all__'
class HeroSlideSerializer(serializers.ModelSerializer):
    hostel = HostelSerializer()
    hostel_image = HostelImageSerializer()

    class Meta:
        model = HeroSlide
        fields = '__all__'
        extra_kwargs = {
            'image': {'required': False},
            'rating': {'required': False},
            'nbre_chambres': {'required': False}
        }



class SectionManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = SectionManager
        fields = '__all__'


class RoomSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomSection
        fields = '__all__'