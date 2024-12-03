from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.db import transaction
from django.utils.crypto import get_random_string
from .models import PersonalInformationToValidate

User = get_user_model()

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
        }
       
        return representation
    
    
class UpdatePersonalDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['identification', 'first_name', 'last_name', 'gender', 'income']
      
      
      
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
        )
        return personal_data
    