from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, RegisterWithKYC, ValidateUserView, UpdatePersonalDataView, AddGarantorView, CustomTokenObtainPairView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('registerkyc/', RegisterWithKYC.as_view(), name='register_kyc'),
    path('validate/', ValidateUserView.as_view(), name='validate'),
    path('updateprofile/', UpdatePersonalDataView.as_view(), name='update_profile'),
    path('addgarantor/', AddGarantorView.as_view(), name='add_garantor'),
]
