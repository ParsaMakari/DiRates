from .views import list_courses, add_course,list_ratings, post_rating, toggle_like_post, list_comments, add_comment
from django.urls import path

urlpatterns = [
    path("", list_courses, name= "list_course"),
    path("new", add_course, name="add_course"),
    path("ratings", list_ratings, name="list_ratings"),
    path("ratings/post", post_rating, name="post_rating"),
    path("ratings/feedback/like", toggle_like_post, name="toggle_like_post"),
    path("ratings/feedback/comments/<int:course_rating_id>", list_comments, name="list_comments"),
    path("ratings/feedback/comments/<int:course_rating_id>/post", add_comment, name="add_comment"),

]
