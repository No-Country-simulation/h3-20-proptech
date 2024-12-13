from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404

from .models import PersonalInformationToValidate
from .serializers import RegisterSerializer, UserSerializer, RegisterWithKYCSerializer, UpdatePersonalDataSerializer, AddGarantorSerializer, CustomTokenObtainPairSerializer, PersonalInformationToValidateSerializer, CompleteUserSerializer

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
     


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer   
        
class RegisterWithKYC(generics.CreateAPIView):
   
    def post(self, request):
        serializer = RegisterWithKYCSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response( status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class ValidateUserView(generics.CreateAPIView):
    def get(self, request):
        queryset = PersonalInformationToValidate.objects.all()
        serializer = RegisterWithKYCSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def post(self, request, pk):
        try:
            user_to_validate = User.objects.get(pk=pk)
        except (PersonalInformationToValidate.DoesNotExist, User.DoesNotExist):
            return Response({'error':'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if user_to_validate.validated:
            return Response({'error':'User already validated'}, status=status.HTTP_400_BAD_REQUEST)
        
        user_to_validate.validated = True
        
        return Response(status=status.HTTP_200_OK)


class UpdatePersonalDataView(APIView):
    permission_classes = [IsAuthenticated]
    
    def patch(self, request, *args, **kwargs):
        user = request.user
        serializer = UpdatePersonalDataSerializer(instance=user, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Updated succesfully'}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class AddGarantorView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        user = request.user
        serializer = AddGarantorSerializer(data=request.data, context={'original_user':user})
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        return Response({'message': 'Garantor added succesfully'}, status=status.HTTP_200_OK)
    
    
    
    
class UpdateUserInformationView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Actualizar información del usuario",
        operation_description="Permite actualizar la información personal y documentos del usuario autenticado.",
        manual_parameters=[
            openapi.Parameter(
                'identification', openapi.IN_FORM, 
                description="numero de dni", type=openapi.TYPE_STRING
            ),
            openapi.Parameter(
                'first_name', openapi.IN_FORM, 
                description="nombre", type=openapi.TYPE_STRING
            ),
            openapi.Parameter(
                'last_name', openapi.IN_FORM, 
                description="apellido", type=openapi.TYPE_STRING
            ),
            openapi.Parameter(
                'gender', openapi.IN_FORM, 
                description="Género del usuario (M/F/X)", type=openapi.TYPE_STRING
            ),
            openapi.Parameter(
                'contact', openapi.IN_FORM, 
                description="Número de contacto principal", type=openapi.TYPE_STRING
            ),
            openapi.Parameter(
                'second_contact', openapi.IN_FORM, 
                description="Número de contacto secundario", type=openapi.TYPE_STRING
            ),
            openapi.Parameter(
                'income', openapi.IN_FORM, 
                description="Ingreso mensual", type=openapi.TYPE_INTEGER
            ),
            openapi.Parameter(
                'front_id', openapi.IN_FORM, 
                description="Imagen del frente del documento", type=openapi.TYPE_FILE
            ),
            openapi.Parameter(
                'back_id', openapi.IN_FORM, 
                description="Imagen del reverso del documento", type=openapi.TYPE_FILE
            ),
            openapi.Parameter(
                'first_receipt', openapi.IN_FORM, 
                description="Primer recibo de pago", type=openapi.TYPE_FILE
            ),
            openapi.Parameter(
                'second_receipt', openapi.IN_FORM, 
                description="Segundo recibo de pago", type=openapi.TYPE_FILE
            ),
            openapi.Parameter(
                'third_receipt', openapi.IN_FORM, 
                description="Tercer recibo de pago", type=openapi.TYPE_FILE
            ),
            openapi.Parameter(
                'service_receipt', openapi.IN_FORM, 
                description="Recibo de servicio", type=openapi.TYPE_FILE
            ),
            openapi.Parameter(
                'first_income_receipt', openapi.IN_FORM, 
                description="Primer comprobante de ingreso", type=openapi.TYPE_FILE
            ),
            openapi.Parameter(
                'second_income_receipt', openapi.IN_FORM, 
                description="Segundo comprobante de ingreso", type=openapi.TYPE_FILE
            ),
            openapi.Parameter(
                'third_income_receipt', openapi.IN_FORM, 
                description="Tercer comprobante de ingreso", type=openapi.TYPE_FILE
            ),
            openapi.Parameter(
                'first_income_gross', openapi.IN_FORM, 
                description="Ingreso bruto del primer periodo", type=openapi.TYPE_NUMBER
            ),
            openapi.Parameter(
                'first_income_net', openapi.IN_FORM, 
                description="Ingreso neto del primer periodo", type=openapi.TYPE_NUMBER
            ),
            openapi.Parameter(
                'first_income_date', openapi.IN_FORM, 
                description="Fecha del primer ingreso", type=openapi.TYPE_STRING, format=openapi.FORMAT_DATE
            ),
            openapi.Parameter(
                'second_income_gross', openapi.IN_FORM, 
                description="Ingreso bruto del segundo periodo", type=openapi.TYPE_NUMBER
            ),
            openapi.Parameter(
                'second_income_net', openapi.IN_FORM, 
                description="Ingreso neto del segundo periodo", type=openapi.TYPE_NUMBER
            ),
            openapi.Parameter(
                'second_income_date', openapi.IN_FORM, 
                description="Fecha del segundo ingreso", type=openapi.TYPE_STRING, format=openapi.FORMAT_DATE
            ),
            openapi.Parameter(
                'third_income_gross', openapi.IN_FORM, 
                description="Ingreso bruto del tercer periodo", type=openapi.TYPE_NUMBER
            ),
            openapi.Parameter(
                'third_income_net', openapi.IN_FORM, 
                description="Ingreso neto del tercer periodo", type=openapi.TYPE_NUMBER
            ),
            openapi.Parameter(
                'third_income_date', openapi.IN_FORM, 
                description="Fecha del tercer ingreso", type=openapi.TYPE_STRING, format=openapi.FORMAT_DATE
            ),

        ],
        responses={
            200: openapi.Response("Información del usuario actualizada exitosamente"),
            400: openapi.Response("Errores en los datos enviados"),
        }
    )
    def post(self, request, *args, **kwargs):

        user = request.user

        user_serializer = UpdatePersonalDataSerializer(user, data=request.data, partial=True)
        if user_serializer.is_valid():
            user_serializer.save()
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


        personal_info, created = PersonalInformationToValidate.objects.get_or_create(user=user)
        personal_info_serializer = PersonalInformationToValidateSerializer(personal_info, data=request.data, partial=True)

        if personal_info_serializer.is_valid():
            personal_info_serializer.save()
        else:
            return Response(personal_info_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "User information updated successfully"}, status=status.HTTP_200_OK)
    
    
    
    
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = CompleteUserSerializer
    
    
class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = CompleteUserSerializer
    
    
    
class UpdateUserStatusView(APIView):
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(
        operation_summary="Actualizar status del usuario",
        operation_description="Permite actualizar el status.",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'user_type': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description="New type of user (Admin, User, Investor, Borrower)",
                )
            },
            required=['user_type'],
        ),
        responses={
            400: openapi.Response("Errores en los datos enviados"),
        }
    )
    def post(self, request, user_id, *args, **kwargs):
        if not request.user.is_staff:
            return Response(
                {"detail": "User not allowed"},
                status=status.HTTP_403_FORBIDDEN
            )
            
            
        new_user_type = request.data.get('user_type').lower()

        # Validar el nuevo tipo de usuario (puedes ajustar estos valores según tus modelos/negocio)
        valid_user_types = ['user', 'admin', 'investor', 'borrower']
        if new_user_type not in valid_user_types:
            return Response(
                {"detail": f"user_type must be one of {', '.join(valid_user_types)}."},
                status=status.HTTP_400_BAD_REQUEST
            )
            
            
        user_to_update = User.objects.get(pk=user_id)
        user_to_update.user_type = new_user_type[0]
        if new_user_type == 'admin':
            user_to_update.is_staff == True
        user_to_update.save()
        
        return Response({'detail': f'User type updated to {new_user_type.capitalize()}'})