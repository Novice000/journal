from bson import ObjectId
from django.contrib.auth.backends import BaseBackend
from .models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from bson import ObjectId
from mongoengine import DoesNotExist
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.middleware import AuthenticationMiddleware as DjangoAuthMiddleware
from django.contrib.auth.models import AnonymousUser


class MongoEngineBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = User.objects.get(username=username)
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(id=ObjectId(user_id))
        except User.DoesNotExist:
            return None

class CustomJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        user_id = validated_token.get("user_id")

        # Validate if user_id is a valid ObjectId (required for MongoDB)
        if not ObjectId.is_valid(user_id):
            raise AuthenticationFailed("Invalid token payload")

        try:
            # Convert user_id to ObjectId and query the MongoEngine User model
            user = User.objects.get(id=ObjectId(user_id))
        except DoesNotExist:
            raise AuthenticationFailed("User not found")

        return user
    


class CustomAuthMiddleware(DjangoAuthMiddleware):
    def process_request(self, request):
        user = super().process_request(request)
        if hasattr(user, 'is_authenticated'):
            return user
        request.user = AnonymousUser()

