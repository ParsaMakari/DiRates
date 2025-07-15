from django.db import models
from Courses.models import Courses
from django.contrib.auth.models import User


class Teachers(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    picture = models.ImageField(null=True)
    departement = models.CharField(max_length=100)
    faculte = models.CharField(max_length=100)
    taught_courses = models.ManyToManyField(Courses)
    rating = models.FloatField(default=0.0)


    def __str__(self):
        return f"{self.first_name} - {self.last_name}"


class TeacherRatings(models.Model): 
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teachers, on_delete=models.CASCADE)
    score = models.SmallIntegerField()
    review = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} rated {self.teacher} - {self.score}/5"

