# Generated by Django 5.1.3 on 2024-12-11 21:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('investments', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='investment',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]