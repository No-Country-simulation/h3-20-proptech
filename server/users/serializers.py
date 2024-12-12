from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.db import transaction
from django.utils.crypto import get_random_string
from .models import PersonalInformationToValidate

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    

    def validate(self, attrs):
        email = attrs.get("username")
        password = attrs.get("password")

        user = User.objects.filter(email=email).first()
        if user is None:
            raise serializers.ValidationError("No user")
        if user is None or not user.check_password(password):
            raise serializers.ValidationError("Invalid email or password")
        
        attrs["username"] = user.username  # Requiere el username para el flujo JWT
        validated_data = super().validate(attrs)

        # Agrega información adicional al token de respuesta
        validated_data["user_name"] = user.get_full_name() or user.username
        validated_data["user_type"] = user.user_type if hasattr(user, "user_type") else None
        validated_data["email"] = user.email

        return validated_data
    
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Agrega claims personalizados al token
        token['name'] = user.get_full_name() or user.username  # Nombre o Nick del usuario
        token['user_type'] = user.user_type if hasattr(user, "user_type") else None  # Tipo de usuario
        token['email'] = user.email  # Opcional

        return token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class RegisterWithKYCSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    front_id = serializers.ImageField()
    back_id = serializers.ImageField()
    first_receipt = serializers.ImageField()
    second_receipt = serializers.ImageField()
    third_receipt = serializers.ImageField()
    service_receipt = serializers.ImageField()
    
    @transaction.atomic
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        personal_data = PersonalInformationToValidate.objects.create(
            user = user,
            front_id = validated_data['front_id'],
            back_id = validated_data['back_id'],
            first_receipt = validated_data['first_receipt'],
            second_receipt = validated_data['second_receipt'],
            third_receipt = validated_data['third_receipt'],
            service_receipt = validated_data['service_receipt'],
            first_income_gross = validated_data['first_income_gross'],
            first_income_net = validated_data['first_income_net'],
            first_income_date = validated_data['first_income_date'],
            second_income_gross = validated_data['second_income_gross'],
            second_income_net = validated_data['second_income_net'],
            second_income_date = validated_data['second_income_date'],
            third_income_gross = validated_data['third_income_gross'],
            third_income_net = validated_data['third_income_net'],
            third_income_date = validated_data['third_income_date'],
        )
        return personal_data
    
    def to_representation(self, instance):
        representation = {
            'user_id' : instance.user.pk,
            'username' : instance.user.username,
            'email' : instance.user.email,
            'front_id' : instance.front_id.url,
            'back_id' : instance.back_id.url,
            'first_receipt' : instance.first_receipt.url,
            'second_receipt' : instance.second_receipt.url,
            'third_receipt' : instance.third_receipt.url,
            'service_receipt' : instance.service_receipt.url,
            'first_income_gross': instance.first_income_gross,
            'first_income_net': instance.first_income_net,
            'first_income_date': instance.first_income_date,
            'second_income_gross': instance.second_income_gross,
            'second_income_net': instance.second_income_net,
            'second_income_date': instance.second_income_date,
            'third_income_gross': instance.third_income_gross,
            'third_income_net': instance.third_income_net,
            'third_income_date': instance.third_income_date,
        }
       
        return representation
    
    
class UpdatePersonalDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['identification', 'first_name', 'last_name', 'gender', 'income', 'contact', 'second_contact']
      
      
      
class AddGarantorSerializer(serializers.Serializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    gender = serializers.CharField()
    identification = serializers.IntegerField()
    front_id = serializers.ImageField()
    back_id = serializers.ImageField()
    first_receipt = serializers.ImageField()
    second_receipt = serializers.ImageField()
    third_receipt = serializers.ImageField()
    service_receipt = serializers.ImageField()
    first_income_receipt = serializers.ImageField()
    second_income_receipt = serializers.ImageField()
    third_income_receipt = serializers.ImageField()
    first_income_gross = serializers.FloatField()
    first_income_net = serializers.FloatField()
    first_income_date = serializers.DateField()
    second_income_gross = serializers.FloatField()
    second_income_net = serializers.FloatField()
    second_income_date = serializers.DateField()
    third_income_gross = serializers.FloatField()
    third_income_net = serializers.FloatField()
    third_income_date = serializers.DateField()
    
     
    @transaction.atomic
    def create(self, validated_data):
        original_user = self.context.get('original_user')
        
        user = User.objects.create_user(
            username=validated_data['first_name'] + validated_data['last_name'],
            email=None,
            password=get_random_string(12),
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            gender=validated_data['gender'],
            identification=validated_data['identification'],
            is_guarantor=True,
            garants=original_user
        )
        personal_data = PersonalInformationToValidate.objects.create(
            user = user,
            front_id = validated_data['front_id'],
            back_id = validated_data['back_id'],
            first_receipt = validated_data['first_receipt'],
            second_receipt = validated_data['second_receipt'],
            third_receipt = validated_data['third_receipt'],
            service_receipt = validated_data['service_receipt'],
            first_income_receipt = validated_data['service_receipt'],
            second_income_receipt = validated_data['service_receipt'],
            third_income_receipt = validated_data['service_receipt'],
            first_income_gross = validated_data['first_income_gross'],
            first_income_net = validated_data['first_income_net'],
            first_income_date = validated_data['first_income_date'],
            second_income_gross = validated_data['second_income_gross'],
            second_income_net = validated_data['second_income_net'],
            second_income_date = validated_data['second_income_date'],
            third_income_gross = validated_data['third_income_gross'],
            third_income_net = validated_data['third_income_net'],
            third_income_date = validated_data['third_income_date'],
        )
        return personal_data
    
    


class PersonalInformationToValidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalInformationToValidate
        fields = [
            'front_id',
            'back_id',
            'first_receipt',
            'second_receipt',
            'third_receipt',
            'service_receipt',
            'first_income_receipt',
            'second_income_receipt',
            'third_income_receipt',
            'first_income_gross',
            'first_income_net',
            'first_income_date',
            'second_income_gross',
            'second_income_net',
            'second_income_date',
            'third_income_gross',
            'third_income_net',
            'third_income_date',
        ]
        
        
class CompleteUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password']