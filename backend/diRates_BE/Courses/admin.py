from django.contrib import admin
from .models import Courses
from .models import CourseRatings
from .models import ReviewLike
from .models import ReviewComment 


admin.site.register(Courses)
admin.site.register(CourseRatings)
admin.site.register(ReviewLike)
admin.site.register(ReviewComment)
# Register your models here.
