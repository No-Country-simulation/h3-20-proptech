from django.shortcuts import render
from rest_framework import generics

from .serializers import InvestmentSerializer, ResultSerializer
from .models import Investment, Result

# Create your views here.
class InvestmentListCreateView(generics.ListCreateAPIView):
    queryset = Investment.objects.active()
    serializer_class = InvestmentSerializer

class InvestmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Investment.objects.active()
    serializer_class = InvestmentSerializer
    
    
    
class ResultListCreateView(generics.ListCreateAPIView):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer

class ResultDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer