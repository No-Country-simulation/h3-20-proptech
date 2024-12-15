from django.db import models
from django.db.models import QuerySet

from users.models import User
# Create your models here.

class ActiveInvestmentQuerySet(QuerySet):
    def active(self):
        return self.filter(is_active=True)

class Investor(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    
class Investment(models.Model):
    TERM_OPTIONS = [
        ('M', 'months'),
        ('Y', 'years'),
    ]
    
    investor = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True, blank=True)
    amount = models.DecimalField(max_digits=20, decimal_places=6)
    calc_rate = models.DecimalField(max_digits=20, decimal_places=5, default=0.0)
    interest_rate = models.DecimalField(max_digits=20, decimal_places=6)
    number_of_payments = models.PositiveSmallIntegerField(default=0)
    payments_amount = models.DecimalField(max_digits=20, decimal_places=6, default=0.0, blank=True)
    monthly_return = models.DecimalField(max_digits=20, decimal_places=6, default=0.0)
    term = models.PositiveSmallIntegerField()
    term_type = models.CharField(max_length=1, choices=TERM_OPTIONS)
    anual_rate = models.DecimalField(max_digits=20, decimal_places=6)
    enforcement = models.BooleanField(default=True)
    monthly_enforcement = models.PositiveIntegerField(default=0)
    deposited_cuota = models.DecimalField(max_digits=20, decimal_places=6, default=0.0, blank=True)
    validated = models.BooleanField(default=None, blank=True, null=True)
    state = models.TextField(default='', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    
    objects = ActiveInvestmentQuerySet.as_manager()
    
    def delete(self, *args, **kwargs):
        # Marcar como inactivo en lugar de eliminar físicamente
        self.is_active = False
        self.save()
    
    
class Result(models.Model):
    investment = models.ForeignKey(Investment, on_delete=models.CASCADE)
    term = models.PositiveSmallIntegerField()
    cuota = models.DecimalField(max_digits=20, decimal_places=6)
    month_capitalization = models.DecimalField(max_digits=20, decimal_places=6)
    discount = models.DecimalField(max_digits=20, decimal_places=6)
    interest_rate = models.DecimalField(max_digits=20, decimal_places=6)
    to_pay = models.DecimalField(max_digits=20, decimal_places=6)
    total_capitalization = models.DecimalField(max_digits=20, decimal_places=6)