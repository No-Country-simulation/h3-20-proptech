from django.urls import path
from .views import InvestmentDetailView, InvestmentListCreateView

urlpatterns = [
    path('investment-detail/', InvestmentDetailView.as_view(), name='investment-datail'),
    path('investment-list-create/', InvestmentListCreateView.as_view(), name='investment-datail'),
]
