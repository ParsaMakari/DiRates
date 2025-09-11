from django.shortcuts import render
from .models import Course, CourseRating, ReviewLike, ReviewComment
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializer import CourseSerializer, RatingSerializer, ReviewCommentSerializer, ReviewLikeSerializer
from django.db.models import Avg

@api_view(['GET'])
@permission_classes([AllowAny])
def list_courses(request):
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many =True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def add_course(request):
    serializer = CourseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def list_ratings(request):
    ratings = CourseRating.objects.all()
    serializer = RatingSerializer(ratings, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_rating(request):
    print("RAW DATA RECEIVED:", request.data)
    serializer = RatingSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        rating = serializer.save(user=request.user) #The user field is filled automatically.
        course = rating.course
        avg = CourseRating.objects.filter(course=course).aggregate(avg=Avg("score"))['avg']
        course.rating = avg
        course.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_like_post(request):
    serializer = ReviewLikeSerializer(data=request.data)
    if serializer.is_valid():
        user = request.user
        rating = serializer.validated_data['course_rating']
        previous = ReviewLike.objects.filter(user=user, course_rating= rating)
        if previous.exists():
            previous.delete()
            rating.likes -= 1
            rating.save()
        else:
            serializer.save(user=user)
            rating.likes+=1
            rating.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def list_comments(request, course_rating_id):
    try:
        course_rating_id = int(course_rating_id)
    except ValueError:
        return Response("Not a valid courseRating", status=status.HTTP_400_BAD_REQUEST)
    comments = ReviewComment.objects.filter(course_rating_id=course_rating_id)
    serializer = ReviewCommentSerializer(comments, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_comment(request):
    serializer = ReviewCommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




