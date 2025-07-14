from django.shortcuts import render
from .models import Courses, CourseRatings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializer import CoursesSerializer, RatingSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def list_courses(request):
    courses = Courses.objects.all()
    serializer = CoursesSerializer(courses, many =True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def add_course(request):
    serializer = CoursesSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def list_rating(request):
    ratings = CourseRatings.objects.all()
    serializer = RatingSerializer(ratings, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_rating(request):
    serializer = RatingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user) #The user field is filled automatically.
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)