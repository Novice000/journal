from django.urls import path
from .views import CreateUser, GetEntries, CreateEntries

urlpatterns = [
    path("register/",CreateUser.as_view(), name="register"),
    path("entries/", GetEntries.as_view(), name="get_entries"),
    path("entries/create/", CreateEntries.as_view(), name="create_entries"),
]
