from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from rest_framework_simplejwt.tokens import RefreshToken
import json

@csrf_exempt
@require_POST
def authentication_api(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError as e:
        return JsonResponse({'message': 'Invalid JSON data', 'error': str(e)}, status=400)

    username = data.get('username')
    password = data.get('password')

    action = data.get('action')

    if action == 'login':
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            refresh = RefreshToken.for_user(user)
            response_data = {
                'message': 'Login successful',
                'access_token': str(refresh.access_token),
                'refresh_token': str(refresh),
            }

            return JsonResponse(response_data)
        else:
            return JsonResponse({'message': 'Login failed'}, status=401)
    elif action == 'signup':
        form = UserCreationForm(data)
        if form.is_valid():
            user = form.save()
            return JsonResponse({'message': 'Signup successful'})
        else:
            errors = form.errors.as_json()
            return JsonResponse({'message': 'Signup failed', 'errors': json.loads(errors)}, status=400)
    else:
        return JsonResponse({'message': 'Invalid action'}, status=400)
