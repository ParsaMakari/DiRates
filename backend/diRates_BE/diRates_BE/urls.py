from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/courses/", include("Courses.urls")),
    path("api/users/", include("Users.urls")),
    path("api/teachers/", include("teachers.urls"))
]