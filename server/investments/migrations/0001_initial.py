# Generated by Django 5.1.3 on 2024-12-08 22:53

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Investment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_created=True)),
                ('amount', models.PositiveBigIntegerField()),
                ('interest_rate', models.PositiveSmallIntegerField()),
                ('payments_amount', models.PositiveSmallIntegerField()),
                ('montly_return', models.PositiveIntegerField()),
                ('term', models.PositiveSmallIntegerField()),
                ('term_type', models.CharField(choices=[('M', 'months'), ('Y', 'years')], max_length=1)),
                ('anual_rate', models.PositiveSmallIntegerField()),
                ('investor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Investor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Result',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('term', models.PositiveSmallIntegerField()),
                ('cuota', models.DecimalField(decimal_places=2, max_digits=10)),
                ('month_capitalization', models.DecimalField(decimal_places=2, max_digits=10)),
                ('discount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('interest_rate', models.DecimalField(decimal_places=2, max_digits=10)),
                ('to_pay', models.DecimalField(decimal_places=2, max_digits=10)),
                ('total_capitalization', models.DecimalField(decimal_places=2, max_digits=10)),
                ('investment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='investments.investment')),
            ],
        ),
    ]
