from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, RegisterWithKYC, ValidateUserView, UpdatePersonalDataView, AddGarantorView, CustomTokenObtainPairView, UpdateUserInformationView, UserListView, UserDetailView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('registerkyc/', RegisterWithKYC.as_view(), name='register_kyc'),
    path('validate/', ValidateUserView.as_view(), name='validate'),
    path('updateprofile/', UpdatePersonalDataView.as_view(), name='update_profile'),
    path('addgarantor/', AddGarantorView.as_view(), name='add_garantor'),
    path('update-user-information/', UpdateUserInformationView.as_view(), name='update_user_information'),
    path('all-users/', UserListView.as_view(), name='all_users'),
    path('user/<int:pk>/', UserDetailView.as_view(), name='user')
]
