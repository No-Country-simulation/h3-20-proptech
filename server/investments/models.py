from django.db import models
from users.models import User

# Create your models here.

class Investor(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    
class Investment(models.Model):
    investor = models.ForeignKey(Investor, on_delete=models.CASCADE)
    amount = models.PositiveBigIntegerField()
    interest_rate = models.PositiveSmallIntegerField()