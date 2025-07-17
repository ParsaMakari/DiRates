from django.db import models
from django.conf import settings

class Courses(models.Model):
    code = models.CharField(max_length=10, primary_key=True)
    nom = models.CharField(max_length=50)
    departement = models.CharField(max_length=50)
    description = models.TextField()
    open_to_vis = models.BooleanField(default= True)
    rating = models.FloatField(default = 0.0)

    def __str__(self):
        return f"{self.code} - {self.nom}"
    
class CourseRatings(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    course = models.ForeignKey(Courses, on_delete= models.CASCADE)
    review = models.TextField()
    score = models.PositiveSmallIntegerField()
    likes = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

class ReviewLike(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    course_rating = models.ForeignKey(CourseRatings, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class ReviewComment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    course_rating = models.ForeignKey(CourseRatings, on_delete=models.CASCADE)
    comment = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    



    