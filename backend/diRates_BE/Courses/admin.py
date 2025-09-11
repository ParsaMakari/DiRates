from django.contrib import admin
from .models import Course
from .models import CourseRating
from .models import ReviewLike
from .models import ReviewComment 


admin.site.register(Course)
admin.site.register(CourseRating)
admin.site.register(ReviewLike)
admin.site.register(ReviewComment)
# Register your models here.
