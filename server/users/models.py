from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from django.core.exceptions import ValidationError

from .utils.credit_score import get_user_score
from .utils.cuit_generator import get_cuit

# Create your models here.
class User(AbstractUser):
    GENDER_CHOICES = [
        ('M', 'male'),
        ('F', 'female'),
    ]
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True, null=True)
    identification = models.PositiveBigIntegerField(null=True, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default=None, null=True, blank=True)
    validated = models.BooleanField(default=False)
    income = models.PositiveIntegerField(default=None, null=True, blank=True)
    score = models.PositiveSmallIntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)], default=None, editable=False)
    is_guarantor = models.BooleanField(default=False)
    garants = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='guarantor')
    
    def clean(self):
        super().clean()
        
        if len(str(self.identification)) != 11:
            raise ValidationError({'identification': 'Identification must be 11 numbers'})
        
        
    def save(self, *args, **kwargs):
        if self.identification and self.gender:
            self.score = get_user_score(get_cuit(self.identification, self.gender))
        else:
            self.score = 0
        super().save(*args, **kwargs)


class PersonalInformationToValidate(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    front_id = models.ImageField(upload_to="media/") 
    back_id = models.ImageField(upload_to="media/") 
    first_receipt = models.ImageField(upload_to="media/") 
    second_receipt = models.ImageField(upload_to="media/") 
    third_receipt  = models.ImageField(upload_to="media/") 
    service_receipt = models.ImageField(upload_to="media/") 