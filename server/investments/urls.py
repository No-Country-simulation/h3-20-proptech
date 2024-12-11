from django.urls import path
from .views import InvestmentDetailView, InvestmentListCreateView, ResultDetailView, ResultListCreateView

urlpatterns = [
    path('investment-detail/<int:pk>/', InvestmentDetailView.as_view(), name='investment-datail-list'),
    path('investment-list-create/', InvestmentListCreateView.as_view(), name='investment-datail'),
    

    path('result-detail/<int:pk>/', ResultDetailView.as_view(), name='result-datail-list'),
    path('result-list-create/', ResultListCreateView.as_view(), name='result-datail'),
]
