from django.db import models
from Courses.models import Course
from django.conf import settings


class Teacher(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    picture = models.ImageField(null=True, upload_to='teacher_images/')
    departement = models.CharField(max_length=100)
    faculte = models.CharField(max_length=100)
    taught_courses = models.ManyToManyField(Course)
    rating = models.FloatField(default=0.0)


    def __str__(self):
        return f"{self.first_name} - {self.last_name}"


class TeacherRating(models.Model): 
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    score = models.SmallIntegerField()
    review = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} rated {self.teacher} - {self.score}/5"
    


class ReviewLike(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="teacher_review_likes")
    teacher_rating = models.ForeignKey(TeacherRating, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class ReviewComment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="teacher_review_comments")
    teacher_rating = models.ForeignKey(TeacherRating, on_delete=models.CASCADE)
    comment = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)

