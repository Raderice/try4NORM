# Сервис бронирования на Django — порядок создания проекта

---

## 1. Установка и создание проекта

```bash
pip install django
```
```bash
django-admin startproject try4 .
```
> Точка в конце — проект создаётся в текущей папке, без вложенной директории.

```bash
python manage.py startapp main
```

---

## 2. Настройка settings.py

В файле `try4/settings.py` добавить/изменить:

```python
AUTH_USER_MODEL = 'main.User'       # кастомная модель пользователя — ОБЯЗАТЕЛЬНО ДО ПЕРВОЙ МИГРАЦИИ

INSTALLED_APPS = [
    ...
    'main',                          # подключить приложение
]

LANGUAGE_CODE = 'ru-ru'             # язык (опционально)
```

---

## 3. Написать модели — `main/models.py`

Описать классы `User`, `Car`, `Booking` (или другие нужные модели).

---

## 4. Зарегистрировать модели в админке — `main/admin.py`

```python
from django.contrib import admin
from .models import User, Car, Booking

admin.site.register(User)
admin.site.register(Car)
admin.site.register(Booking)
```

---

## 5. Написать представления — `main/views.py`

Реализовать функции: `home`, `login`, `logout`, `register`, `my_bookings`, `create_booking`.

---

## 6. Настроить маршруты

**`main/urls.py`** — маршруты приложения:
```python
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
```

**`try4/urls.py`** — главный роутер проекта:
```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('main.urls')),
]
```

---

## 7. Создать шаблоны

Папка: `main/templates/main/`

Файлы: `base.html`, `login.html`, `register.html`, `my_bookings.html`, `create_booking.html`

---

## 8. Миграции

```bash
python manage.py makemigrations
```
> Создаёт файлы миграций на основе моделей. Запускать после каждого изменения моделей.

```bash
python manage.py migrate
```
> Применяет миграции к базе данных (создаёт таблицы).

---

## 9. Создать суперпользователя

**Стандартный способ (интерактивный):**
```bash
python manage.py createsuperuser
```

**Быстрый способ через shell (логин: admin@admin.com, пароль: admin):**
```bash
python manage.py shell -c "
from django.contrib.auth import get_user_model
U = get_user_model()
U.objects.filter(username='admin').delete()
U.objects.create_superuser(username='admin', email='admin@admin.com', password='admin', full_name='Admin', phone_number='0000000000', driver_license='0000000000')
"
```

---

## 10. Запуск сервера

```bash
python manage.py runserver
```

Сервер запустится на `http://127.0.0.1:8000/`
Админка: `http://127.0.0.1:8000/admin/`

---

## Все команды кратко

| Команда | Когда использовать |
|---|---|
| `pip install django` | Один раз перед началом |
| `django-admin startproject try4 .` | Создать проект |
| `python manage.py startapp main` | Создать приложение |
| `python manage.py makemigrations` | После каждого изменения моделей |
| `python manage.py migrate` | После makemigrations |
| `python manage.py createsuperuser` | Создать администратора |
| `python manage.py runserver` | Запустить сервер |
| `python manage.py check` | Проверить проект на ошибки |
| `python manage.py shell` | Открыть Python-консоль с Django |

---

## Структура проекта

```
project_root/
├── manage.py
├── db.sqlite3
├── try4/
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
└── main/
    ├── models.py
    ├── views.py
    ├── urls.py
    ├── admin.py
    ├── migrations/
    └── templates/
        └── main/
            ├── base.html
            ├── login.html
            ├── register.html
            ├── my_bookings.html
            └── create_booking.html
```

---

## Важные моменты

- `AUTH_USER_MODEL` нужно добавить в `settings.py` **до первой миграции**, иначе придётся пересоздавать базу.
- `makemigrations` — только создаёт файлы, `migrate` — применяет их.
- Если база сломалась: удали `db.sqlite3` и все файлы в `migrations/` кроме `__init__.py`, затем снова `makemigrations` + `migrate`.
