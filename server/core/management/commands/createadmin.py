import os
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Create an admin user'

    def handle(self, *args, **kwargs):
        if not User.objects.filter(username=os.environ.get('ADMIN_USER')).exists():
            User.objects.create_superuser(
                username=os.environ.get('ADMIN_USER'),
                email=os.environ.get('ADMIN_EMAIL'),
                password = os.environ.get('ADMIN_PASSWORD')
            )
           
            self.stdout.write(self.style.SUCCESS('Successfully created admin user'))
        else:
            self.stdout.write(self.style.WARNING('Admin user already exists'))