from rest_framework import serializers

from .models import Investment, Result


     

class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = '__all__'
        
        
class InvestmentSerializer(serializers.ModelSerializer):
    results = serializers.SerializerMethodField()

    class Meta:
        model = Investment
        fields = '__all__'
        read_only_fields = ['is_active']

    def get_results(self, obj):
        results = Result.objects.filter(investment=obj)
        return ResultSerializer(results, many=True).data