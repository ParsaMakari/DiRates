from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from .models import TeacherRatings, Teachers, ReviewLike, ReviewComment
from .serializer import TeacherRatingsSerializer, TeachersSerializer, ReviewCommentSerializer, ReviewLikeSerializer
from rest_framework.response import Response
from django.db.models import Avg

@api_view(['GET'])
@permission_classes([AllowAny])
def list_teachers(request):
    teachers = Teachers.objects.all()
    serializer = TeachersSerializer(teachers, many=True, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_teacher(request, pk):
    try:
        pk = int(pk)
    except ValueError:
        return Response("invalid teacher idenitifer", status=status.HTTP_400_BAD_REQUEST)
    try:
        teacher = Teachers.objects.get(pk=pk)
        serializer = TeachersSerializer(teacher)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Teachers.DoesNotExist:
        return Response("Teacher not found", status=status.HTTP_404_NOT_FOUND)
    

@api_view(['POST'])
@permission_classes([IsAdminUser])
def add_teacher(request):
    serializer = TeachersSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def list_reviews(request):
    reviews= TeacherRatings.objects.all()
    serializer = TeacherRatingsSerializer(reviews, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_review(request,pk):
    try:
        pk = int(pk)
    except ValueError:
        return Response("invalid review identifier", status=status.HTTP_400_BAD_REQUEST)
    try:
        teacher_review = TeacherRatings.objects.get(pk=pk)
        serializer = TeacherRatingsSerializer(teacher_review)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except TeacherRatings.DoesNotExist:
        return Response("Rating not found", status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_rating(request):
    print("RAW DATA RECEIVED:", request.data)
    serializer = TeacherRatingsSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        rating = serializer.save(user=request.user)
        teacher = rating.teacher
        avg= TeacherRatings.objects.filter(teacher=teacher).aggregate(avg=Avg('score'))['avg']
        teacher.rating = avg
        teacher.save()
        return Response(serializer.data, status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_like_post(request):
    serializer = ReviewLikeSerializer(data=request.data)
    if serializer.is_valid():
        user = request.user
        rating = serializer.validated_data['teacher_rating']
        previous = ReviewLike.objects.filter(user=user, teacher_rating= rating)
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
def list_comments(request, teacher_rating_id):
    try:
        teacher_rating_id = int(teacher_rating_id)
    except ValueError:
        return Response("Not a valid courseRating", status=status.HTTP_400_BAD_REQUEST)
    comments = ReviewComment.objects.filter(teacher_rating_id=teacher_rating_id)
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

