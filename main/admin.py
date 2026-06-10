from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as Base
from .models import User, Car, Booking

@admin.register(User)
class UserAdmin(Base):
    list_display = ('email', 'full_name', 'phone_number', 'driver_license', 'is_staff')
    search_fields = ('email', 'full_name'); ordering = ('email',)
    fieldsets = Base.fieldsets + (('Доп. данные', {'fields': ('full_name', 'phone_number', 'driver_license')}),)

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'description')

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('user', 'car', 'booking_date', 'status', 'created_at')
    list_filter = ('status',); list_editable = ('status',); date_hierarchy = 'booking_date'
