from django.db import models
from users.models import User
# Create your models here.


class Loan(models.Model):
    STATE_CHOICES = [
        ('N', 'Normal'),
        ('D', 'Defaulter')
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    original_month_duration = models.PositiveSmallIntegerField()
    actual_month_duration = models.PositiveSmallIntegerField()
    original_total_due = models.PositiveIntegerField()
    actual_total_due = models.PositiveIntegerField()
    interest_rate = models.PositiveSmallIntegerField()
    total_payments = models.PositiveSmallIntegerField()
    start_date = models.DateField()
    end_date = models.DateField()
    state = models.CharField(max_length=2, choices=STATE_CHOICES, default='N')
    
    
class Payment(models.Model):
    loan = models.ForeignKey(Loan, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    total_payment = models.PositiveIntegerField()
    interest_payment = models.PositiveIntegerField()
    principal_payment = models.PositiveIntegerField()
    punitive_interest = models.PositiveIntegerField()
    punitive_payment= models.PositiveIntegerField()
    remaining_balance = models.PositiveIntegerField()
    delayed = models.BooleanField(default=False)
    