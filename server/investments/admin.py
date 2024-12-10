from django.contrib import admin
from .models  import Investment, Result, Investor
# Register your models here.

admin.site.register(Investment)
admin.site.register(Result)
admin.site.register(Investor)