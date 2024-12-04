from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model

from .models import PersonalInformationToValidate
from .serializers import RegisterSerializer, UserSerializer, RegisterWithKYCSerializer

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)
        
        
class RegisterWithKYC(generics.CreateAPIView):
    def get(self, request):
        queryset = PersonalInformationToValidate.objects.all()
        serializer = RegisterWithKYCSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = RegisterWithKYCSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response( status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)