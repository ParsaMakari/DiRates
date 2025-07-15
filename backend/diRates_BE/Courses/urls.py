from .views import list_courses, add_course
from django.urls import path

urlpatterns = [
    path("", list_courses, name= "list_course"),
    path("new", add_course, name="add_course")
]
