from rest_framework import generics
from .models import TodoItem
from .serializers import TodoItemSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import filters
from django.db.models import Q
from django.utils import timezone


class TodoItemList(generics.ListCreateAPIView):
    queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TodoItem.objects.filter(user=self.request.user)

    def perform_create(self, serializer):

        serializer.save(user=self.request.user)


class TodoItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter on basis of user
        return TodoItem.objects.filter(user=self.request.user)


class TodayTodoItemList(generics.ListAPIView):
    queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.OrderingFilter]

    def get_queryset(self):
        today = timezone.localdate()
        return TodoItem.objects.filter(
            Q(due_date=today) | Q(due_date__isnull=True),
            user=self.request.user 
        ).order_by('created_at')


class UpcomingTodoItemList(generics.ListAPIView):
    queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.OrderingFilter]

    def get_queryset(self):
        today = timezone.localdate()
        return TodoItem.objects.filter(
            Q(due_date__gt=today) | Q(due_date__isnull=False),
            user=self.request.user 
        ).order_by('created_at')
