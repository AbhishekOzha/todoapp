from django.urls import path
from .views import TodoItemList, TodoItemDetail, TodayTodoItemList, UpcomingTodoItemList

urlpatterns = [
    path('todos/', TodoItemList.as_view(), name='todo-list'),
    path('todos/<int:pk>/', TodoItemDetail.as_view(), name='todo-detail'),
    path('today/', TodayTodoItemList.as_view(), name='today-todo-list'),
    path('upcoming/', UpcomingTodoItemList.as_view(), name='upcoming-todo-list'),
]
