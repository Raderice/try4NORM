from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('register/', views.register, name='register'),
    path('my_bookings/', views.my_bookings, name='my_bookings'),
    path('create_booking/', views.create_booking, name='create_booking'),
]
