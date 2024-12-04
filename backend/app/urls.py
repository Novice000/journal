from django.urls import path
from .views import CreateUser, GetEntries, CreateEntries, GetEntry, UpdateEntry, GetUser, index

urlpatterns = [
    path("register/",CreateUser.as_view(), name="register"),
    path("entries/", GetEntries.as_view(), name="get_entries"),
    path("entry/create/", CreateEntries.as_view(), name="create_entry"),
    path("update/entry/<str:id>/", UpdateEntry.as_view(), name="update_entry"),
    path("entry/<str:id>/", GetEntry.as_view(), name="get_entry"),
    path("user/<str:id>/", GetUser.as_view(), name="get_user" ),
    path("populate_db", index)
]
