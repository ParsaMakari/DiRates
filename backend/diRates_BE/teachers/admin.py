from django.contrib import admin
from .models import Teachers
from .models import TeacherRatings
from .models import ReviewComment 
from .models import ReviewLike 

admin.site.register(Teachers)
admin.site.register(TeacherRatings)
admin.site.register(ReviewComment )
admin.site.register(ReviewLike)
# Register your models here.
