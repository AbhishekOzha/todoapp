from django.db import models
from django.contrib.auth.models import User


class TodoItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(blank=True, max_length=200)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    due_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    comments = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return str(self.title)
