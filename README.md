# Минимальный сервис бронирования на Django

## Быстрый старт

1. **Создайте проект и приложение**
   ```bash
   django-admin startproject try4
   cd try4
   python -m venv .venv
   source .venv/bin/activate
   pip install django
   python manage.py startapp main
   ```
2. **Добавьте приложение и пользователя**
   - В `try4/settings.py`:
     - В `INSTALLED_APPS` добавьте `'main',`
     - Добавьте строку:
       ```python
       AUTH_USER_MODEL = 'main.User'
       ```
     - Для статики (фото и т.д.):
       ```python
       STATIC_URL = '/static/'
       STATICFILES_DIRS = [BASE_DIR / 'static']
       ```
3. **Создайте модели**
   - В `main/models.py` опишите:
     - Кастомную модель пользователя (User)
     - Модель для бронируемого объекта (например, Car)
     - Модель Booking (связь пользователя и объекта)
4. **Зарегистрируйте модели в админке**
   - В `main/admin.py`:
     ```python
     from .models import User, Car, Booking
     admin.site.register(User)
     admin.site.register(Car)
     admin.site.register(Booking)
     ```
5. **Создайте и примените миграции**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
6. **Создайте шаблоны**
   - В `templates/main/` создайте HTML-файлы для каталога, создания заявки, просмотра заявок и т.д.
   - Используйте минимальный дизайн, добавьте места под фото (например, `<img src="/static/cars/1.jpg">`).
7. **Реализуйте views и urls**
   - В `main/views.py` реализуйте регистрацию, вход, создание и просмотр заявок.
   - В `main/urls.py` настройте маршруты.
   - В `try4/urls.py`:
     ```python
     from django.contrib import admin
     from django.urls import path, include
     urlpatterns = [
         path('admin/', admin.site.urls),
         path('', include('main.urls')),
     ]
     ```
8. **Добавьте статику**
   - Положите изображения в `static/cars/` или другую нужную папку.
9. **Создайте суперпользователя и запустите сервер**
   ```bash
   python manage.py createsuperuser
   python manage.py runserver
   ```

---

## Как быстро изменить тематику (например, на бронирование билетов)

1. **Модели:**
   - В `main/models.py` замените модель `Car` на нужную (`Ticket`, `Event`, и т.д.).
   - В Booking поменяйте поле `car` на нужное (`ticket`, `event`).
2. **Шаблоны:**
   - В `templates/main/` замените все упоминания автомобилей на новую сущность (например, "Автомобиль" → "Билет").
   - Обновите изображения и пути к ним.
3. **views.py:**
   - Измените работу с моделями под новую сущность.
4. **urls.py:**
   - В `main/urls.py` настройте маршруты под новые страницы.
   - В `try4/urls.py` ничего менять не нужно, если структура остается прежней.
5. **settings.py:**
   - Проверьте, что `'main'` в `INSTALLED_APPS` и `AUTH_USER_MODEL = 'main.User'`.
   - Для статики: `STATIC_URL` и `STATICFILES_DIRS`.
6. **Миграции:**
   - После изменения моделей:
     ```bash
     python manage.py makemigrations
     python manage.py migrate
     ```
7. **Админка:**
   - Зарегистрируйте новые модели в `main/admin.py`.
8. **Проверьте шаблоны и статику:**
   - Обновите шаблоны и изображения под новую тематику.

---

## Пример структуры проекта

```
project_root/
├── db.sqlite3
├── manage.py
├── try4/                # настройки проекта
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── ...
├── main/                # основное приложение
│   ├── __init__.py
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   ├── admin.py
│   ├── templates/
│   │   └── main/
│   │       ├── base.html
│   │       ├── catalog.html
│   │       └── ...
│   └── migrations/
├── static/              # папка для статики
│   └── cars/            # фотографии автомобилей (или другие фото)
│       ├── 1.jpg
│       ├── 2.jpg
│       └── ...
└── README.md
```

- Все фотографии и другие статические файлы должны лежать в папке `static/` на уровне с manage.py.
- Для фото автомобилей используйте подпапку `static/cars/` (или другую, если меняете тематику).
- В шаблонах путь к фото будет, например: `<img src="/static/cars/1.jpg">`

---

Теперь вы можете быстро адаптировать проект под любую похожую задачу: бронирование билетов, комнат, мероприятий и т.д. Просто меняйте модели, шаблоны и логику под свою тему.
