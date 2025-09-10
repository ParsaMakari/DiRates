from rest_framework import serializers
from .models import Courses, CourseRatings, ReviewComment, ReviewLike
from django.contrib.auth.models import User


class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','first_name', 'last_name','username']
        

class RatingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = CourseRatings
        fields = '__all__'
        read_only_fields= ['user', 'created_at', 'likes']
        
    def validate_score(self, value):
        if value < 1 or value >5:
            raise serializers.ValidationError("The rating must be between 1 and 5")
        return value
        
    def validate_course(self,value):
        if not Courses.objects.filter(code = value.code).exists():
            raise serializers.ValidationError("The course doesnt exist")
        return value
    
    def validate(self,data):
        user = self.context['request'].user
        course= data.get('course')
        
        if CourseRatings.objects.filter(user=user, course=course).exists():
            raise serializers.ValidationError("You have already rated this course!")
        return data
    

class  ReviewLikeSerializer(serializers.ModelSerializer):
    class Meta: 
        model = ReviewLike
        fields = '__all__'
        read_only_fields = ['user', 'created_at']


class  ReviewCommentSerializer(serializers.ModelSerializer):
    class Meta: 
        model = ReviewComment
        fields = '__all__'
        read_only_fields = ['user', 'created_at']






