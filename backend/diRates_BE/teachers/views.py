from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from .models import TeacherRatings, Teachers
from .serializer import TeacherRatingsSerializer, TeachersSerializer
from rest_framework.response import Response
from django.db.models import Avg

@api_view(['GET'])
@permission_classes([AllowAny])
def list_teachers(request):
    teachers = Teachers.objects.all()
    serializer = TeachersSerializer(teachers, many=True)
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
    serializer = TeacherRatingsSerializer(data=request.data)
    if serializer.is_valid():
        rating = serializer.save(user=request.user)
        teacher = rating.teacher
        avg= TeacherRatings.objects.filter(teacher=teacher).aggregate(avg=Avg('score'))['avg']
        teacher.rating = avg
        teacher.save()
        return Response(serializer.data, status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

