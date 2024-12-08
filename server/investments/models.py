from django.db import models
from users.models import User

# Create your models here.

class Investor(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    
class Investment(models.Model):
    TERM_OPTIONS = [
        ('M', 'months'),
        ('Y', 'years'),
    ]
    
    investor = models.ForeignKey(Investor, on_delete=models.CASCADE)
    date = models.DateField(auto_created=True)
    amount = models.PositiveBigIntegerField()
    interest_rate = models.PositiveSmallIntegerField()
    payments_amount = models.PositiveSmallIntegerField()
    montly_return = models.PositiveIntegerField()
    term = models.PositiveSmallIntegerField()
    term_type = models.CharField(max_length=1, choices=TERM_OPTIONS)
    anual_rate = models.PositiveSmallIntegerField()
    
    
class Result(models.Model):
    investment = models.ForeignKey(Investment, on_delete=models.CASCADE)
    term = models.PositiveSmallIntegerField()
    cuota = models.DecimalField(max_digits=10, decimal_places=2)
    month_capitalization = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=10, decimal_places=2)
    interest_rate = models.DecimalField(max_digits=10, decimal_places=2)
    to_pay = models.DecimalField(max_digits=10, decimal_places=2)
    total_capitalization = models.DecimalField(max_digits=10, decimal_places=2)