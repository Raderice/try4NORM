
from django.shortcuts import render, redirect, get_object_or_404
from .models import User, Car, Booking
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout

def home(request):
    return redirect('my_bookings') if request.user.is_authenticated else redirect('login')

def login(request):
    if request.method == 'POST':
        user = authenticate(request, email=request.POST['email'], password=request.POST['password'])
        if user:
            auth_login(request, user)
            return redirect('my_bookings')
    return render(request, 'main/login.html')

def register(request):
    if request.method == 'POST' and request.POST['password'] == request.POST['confirm_password']:
        user = User.objects.create_user(
            username=request.POST['email'],
            email=request.POST['email'],
            password=request.POST['password'],
            full_name=request.POST['full_name'],
            phone_number=request.POST['phone_number'],
            driver_license=request.POST['driver_license'],
        )
        auth_login(request, user)
        return redirect('my_bookings')
    return render(request, 'main/register.html')

def logout(request):
    auth_logout(request)
    return redirect('home')

def my_bookings(request):
    if not request.user.is_authenticated:
        return redirect('login')
    return render(request, 'main/my_bookings.html', {'bookings': Booking.objects.filter(user=request.user)})

def create_booking(request):
    if not request.user.is_authenticated:
        return redirect('login')
    if request.method == 'POST':
        car = get_object_or_404(Car, id=request.POST['car_id'])
        Booking.objects.create(user=request.user, car=car, booking_date=request.POST['booking_date'])
        return redirect('my_bookings')
    return render(request, 'main/create_booking.html', {'cars': Car.objects.all()})
