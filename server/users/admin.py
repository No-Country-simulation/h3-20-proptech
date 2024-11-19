from django.contrib import admin
from .models import User, PersonalInformationToValidate

# Register your models here.
admin.site.register(User)
admin.site.register(PersonalInformationToValidate)