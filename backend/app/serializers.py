from django.contrib.auth.hashers import make_password
from rest_framework_mongoengine.serializers import DocumentSerializer, EmbeddedDocumentSerializer
from .models import User, Task, Entries

class UserSerializer(DocumentSerializer):
    class Meta:
        model = User
        fields = ["username","email","password"]
        extra_kwargs = {"password":{"write_only":True},
                    }
    
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)
        

class TaskSerializer(EmbeddedDocumentSerializer):
    class Meta:
        model = Task
        fields = ["task", "completed"]
        
class EntriesSerializer(DocumentSerializer):
    tasks = TaskSerializer(many=True)
    
    class Meta:
        model = Entries
        fields = ["id","text","review", "tasks", "timestamp"]
        read_only_fields =["user","id","timestamp"]