from django.contrib import admin
from .models import Teacher
from .models import TeacherRating
from .models import ReviewComment 
from .models import ReviewLike 

admin.site.register(Teacher)
admin.site.register(TeacherRating)
admin.site.register(ReviewComment )
admin.site.register(ReviewLike)
# Register your models here.
