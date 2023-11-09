from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView 
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        permission_classes = [IsAuthenticated]
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            user = authenticate(username=request.data['username'], password=request.data['password'])
            if user:
                refresh = RefreshToken.for_user(user)
                response.data['refresh'] = str(refresh)
                response.data['access'] = str(refresh.access_token)
        return response
    
    
revoked_tokens = []

class TokenRevokeView(APIView):
    def post(self, request):
        refresh_token = request.data.get("refresh")

        if refresh_token:
            try:
                RefreshToken(refresh_token).check_blacklist()
                return Response({"detail": "Token has already been revoked."}, status=status.HTTP_400_BAD_REQUEST)
            except:
                # If the token is not in the blacklist, add it
                revoked_tokens.append(refresh_token)
                return Response({"detail": "Token revoked successfully."}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Invalid or missing token."}, status=status.HTTP_400_BAD_REQUEST)