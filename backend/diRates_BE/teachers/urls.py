from django.urls import path
from .views import get_review, get_teacher, list_reviews,list_teachers,add_rating,add_teacher



urlpatterns = [
    path("", list_teachers, name="list_teachers"),
    path("ratings", list_reviews, name="list_reviews"),
    path("ratings/add", add_rating, name="add_rating"),
    path("add", add_teacher, name="add_teacher"),
    path("teacher/<int:pk>", get_teacher, name="get_teacher"),
    path("rating/<int:pk>", get_review, name="get_review")
]
