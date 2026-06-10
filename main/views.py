import json
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib import messages
from .models import User, Car, Booking

def home(request):
    return redirect('my_bookings' if request.user.is_authenticated else 'login')

def login(request):
    if request.method == 'POST':
        u = authenticate(request, email=request.POST['email'], password=request.POST['password'])
        if u:
            auth_login(request, u); return redirect('my_bookings')
        messages.error(request, 'Неверный email или пароль')
    return render(request, 'main/login.html')

def register(request):
    if request.method == 'POST':
        p = request.POST
        if p['password'] != p['confirm_password']:
            messages.error(request, 'Пароли не совпадают')
        elif User.objects.filter(email=p['email']).exists():
            messages.error(request, 'Email уже зарегистрирован')
        else:
            u = User.objects.create_user(username=p['email'], email=p['email'], password=p['password'],
                full_name=p['full_name'], phone_number=p['phone_number'], driver_license=p['driver_license'])
            auth_login(request, u); return redirect('my_bookings')
    return render(request, 'main/register.html')

def logout(request):
    auth_logout(request); return redirect('home')

def my_bookings(request):
    if not request.user.is_authenticated: return redirect('login')
    return render(request, 'main/my_bookings.html',
        {'bookings': Booking.objects.filter(user=request.user).select_related('car')})

def create_booking(request):
    if not request.user.is_authenticated: return redirect('login')
    if request.method == 'POST':
        Booking.objects.create(user=request.user, booking_date=request.POST['booking_date'],
            car=get_object_or_404(Car, id=request.POST['car_id']))
        messages.success(request, 'Заявка создана'); return redirect('my_bookings')
    cars = Car.objects.all()
    return render(request, 'main/create_booking.html', {'cars': cars,
        'cars_json': json.dumps({str(c.id): {'price': str(c.price), 'description': c.description} for c in cars})})
