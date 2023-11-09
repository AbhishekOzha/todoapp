from django.urls import path
from . import views
from .auth_view import CustomTokenObtainPairView, TokenRevokeView

urlpatterns = [
    path('login/', views.authentication_api, name='login_api'),
    path('signup/', views.authentication_api, name='signup_api'),
    path('token/', CustomTokenObtainPairView.as_view(), name='tokens'),
    path('token/revoke/', TokenRevokeView.as_view(), name='token_revoke'),
]
