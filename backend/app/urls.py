from django.urls import path
from .views import CreateUser, GetEntries, CreateEntries, GetEntry, UpdateEntry, GetUser

urlpatterns = [
    path("register/",CreateUser.as_view(), name="register"),
    path("entries/", GetEntries.as_view(), name="get_entries"),
    path("entry/create/", CreateEntries.as_view(), name="create_entry"),
    path("update/entry/<int:id>/", UpdateEntry.as_view(), name="update_entry"),
    path("entry/<int:id>/", GetEntry.as_view(), name="get_entry"),
    path("user/<int:id>", GetUser.as_view(), name="get_user" )
]
