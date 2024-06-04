from rest_framework import serializers
from .models import AvatarUser, Role, User, ChambreImage, Chambre, HostelImage, Service, Hostel, Testimonial, Publication, Question, Reservation, HomeBanner

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
                'name': instance.avatar.name,
                'image': instance.avatar.image.url  # instance.avatar.image.url
            }
        return rep
        # if instance.avatar is not None and instance.avatar.image is not None:
        #     rep['avatar_image_url'] = instance.avatar.image.url
        # return rep


    # def create(self, validated_data):
    #     user = User.objects.create_user(
    #         username=validated_data['username'],
    #         email=validated_data['email'],
    #         password=validated_data['password'],
    #         first_name=validated_data.get('first_name', ''),
    #         last_name=validated_data.get('last_name', ''),
    #         carte_banque=validated_data.get('carte_banque', ''),
    #         role=validated_data['role'],
    #         mail=validated_data.get('mail', ''),
    #         nom=validated_data.get('nom', ''),
    #         prenom=validated_data.get('prenom', ''),
    #         adresse_mail=validated_data['adresse_mail'],
    #         numero_tel=validated_data.get('numero_tel', ''),
    #         avatar=validated_data['avatar']
    #     )
    #     return user

class ChambreImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChambreImage
        fields = ['id', 'image']

class ChambreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chambre
        fields = [
            'id', 'nom', 'image', 'rating', 'prix', 'promotion', 'disponibilite',
            'nombre_lits', 'm2', 'category'
        ]

class HostelImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HostelImage
        fields = ['id', 'image']

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

class HomeBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeBanner
        fields = '__all__'
