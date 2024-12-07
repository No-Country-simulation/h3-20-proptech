from django.shortcuts import render
from rest_framework import generics

from .serializers import InvestmentSerializer
from .models import Investment

# Create your views here.
class InvestmentListCreateView(generics.ListCreateAPIView):
    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer

class InvestmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer