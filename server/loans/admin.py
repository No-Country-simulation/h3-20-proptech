from django.contrib import admin
from .models import Loan, Payment
# Register your models here.

admin.site.register(Loan)
admin.site.register(Payment)