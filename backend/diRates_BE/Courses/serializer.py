from rest_framework import serializers
from .models import Courses, CourseRatings

class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = '__all__'

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseRatings
        fields = '__all__'
