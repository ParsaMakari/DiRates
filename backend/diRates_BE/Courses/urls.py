from .views import list_courses, add_course
from django.urls import path

urlpatterns = [
    path("courses", list_courses, name= "list_course"),
    path("courses/new", add_course, name="add_course")
]
