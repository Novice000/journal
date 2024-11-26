from django.shortcuts import render
from rest_framework_mongoengine import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.views.decorators.csrf import csrf_exempt
from .serializers import UserSerializer, EntriesSerializer
from .models import User, Entries
from bson.objectid import ObjectId
from rest_framework.exceptions import PermissionDenied

# Create your views here.

def index(request):
    return render(request, "app/index.html")

class CreateUser(generics.CreateAPIView):
    """ creating a user"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class GetEntries(generics.ListAPIView):
    """ getting all entried by the user performing the request """
    permission_classes = [IsAuthenticated]
    serializer_class = EntriesSerializer 
    
    def get_queryset(self):
        user = self.request.user
        return Entries.objects.filter(user = user)

class CreateEntries(generics.CreateAPIView):
    """ creating user entries """
    queryset = Entries.objects.all()
    serializer_class = EntriesSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user = user)
        
class UpdateEntry(generics.UpdateAPIView):
    """ update or edit entries by the user"""
    serializer_class =EntriesSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        entry_id = self.kwargs.get("id")
        if not ObjectId.is_valid(entry_id):
            raise PermissionDenied("Invalid Entry ID")
        try:
            entry = Entries.objects.get(id = ObjectId(entry_id))
        except Entries.DoesNotExist:
            raise PermissionDenied("Entry does not exist")
        
        if entry.user != self.request.user:
            raise PermissionDenied("Not authorised to edit this entry")
        return entry
    
class GetEntry(generics.RetrieveAPIView):
    serializer_class = EntriesSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        entry_id = self.kwargs.get(id)
        if not ObjectId.is_valid(entry_id):
            raise PermissionDenied("Invalid Entry ID")
        try:
            entry = Entries.objects.get(id = ObjectId(entry_id))
        except Entries.DoesNotExist:
            raise PermissionDenied("Entry does not exist")
        
        if entry.user != self.request.user:
            raise PermissionDenied("Not authorised to edit this entry")
        return entry