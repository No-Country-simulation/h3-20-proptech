from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class User(AbstractUser):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    validated = models.BooleanField(default=False)
    score = models.PositiveSmallIntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)], default=None)
    is_guarantor = models.BooleanField(default=False)
    garants = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='guarantor')


class PersonalInformationToValidate(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    front_id = models.ImageField(upload_to="media/") 
    back_id = models.ImageField(upload_to="media/") 
    first_receipt = models.ImageField(upload_to="media/") 
    second_receipt = models.ImageField(upload_to="media/") 
    third_receipt  = models.ImageField(upload_to="media/") 
    service_receipt = models.ImageField(upload_to="media/") 