from rest_framework import serializers
from .models import Teachers, TeacherRatings, ReviewComment, ReviewLike


class TeachersSerializer(serializers.ModelSerializer):
    picture = serializers.SerializerMethodField()

    class Meta: 
        model = Teachers
        fields = '__all__'

    def get_picture(self, obj):
        request = self.context.get('request')
        if obj.picture:
            return request.build_absolute_uri(obj.picture.url)
        return None

class TeacherRatingsSerializer(serializers.ModelSerializer):
    class Meta:
        model= TeacherRatings
        fields= '__all__'
        read_only_fields=['created_at', "user"]

    def validate_score(self, value):
        if value < 1 or value >5:
            raise serializers.ValidationError("The rating must be between 1 and 5")
        return value
        
    def validate_teacher(self,value):
        if not Teachers.objects.filter(pk = value.pk).exists():
            raise serializers.ValidationError("The teacher doesnt exist")
        return value
    
    def validate(self,data):
        user = self.context['request'].user
        teacher= data.get('teacher')
        
        if TeacherRatings.objects.filter(user=user, teacher=teacher).exists():
            raise serializers.ValidationError("You have already rated this teacher!")
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
     

