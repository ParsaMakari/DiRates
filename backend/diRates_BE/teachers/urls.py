from django.urls import path
from .views import get_review, get_teacher, list_reviews,list_teachers,add_rating,add_teacher, add_comment, list_comments, toggle_like_post



urlpatterns = [
    path("", list_teachers, name="list_teachers"),
    path("ratings", list_reviews, name="list_reviews"),
    path("ratings/add", add_rating, name="add_rating"),
    path("add", add_teacher, name="add_teacher"),
    path("teacher/<int:pk>", get_teacher, name="get_teacher"),
    path("rating/<int:pk>", get_review, name="get_review"),
    path("ratings/feedback/like", toggle_like_post, name="toggle_like_post"),
    path("ratings/feedback/<int:teacher_rating_id>", list_comments, name="list_comments"),
    path("ratings/feedback/<int:teacher_rating_id>/post", add_comment, name="add_comment"),
]
