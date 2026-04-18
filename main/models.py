from django.db import models
from django.contrib.auth.models import AbstractUser



class User(AbstractUser):
    full_name = models.CharField(max_length=150)
    phone_number = models.CharField(max_length=15)
    driver_license = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'full_name', 'phone_number', 'driver_license']


class Car(models.Model):
    name = models.CharField(max_length=100)



class Booking(models.Model):
    STATUS_CHOICES = [
        ('new', 'Новое'),
        ('confirmed', 'Подтверждено'),
        ('declined', 'Отклонено'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    booking_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    created_at = models.DateTimeField(auto_now_add=True)