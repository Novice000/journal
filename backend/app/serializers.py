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
        
    def create(self, validated_data):
        tasks_data = validated_data.pop('tasks', [])  # Get tasks data from validated data
        entry = Entries.objects.create(**validated_data)  # Create the entry

            # Now handle the creation of tasks
        for task_data in tasks_data:
            task = Task(**task_data)  # Create task objects
            entry.tasks.append(task)  # Append to the entry's tasks list

        entry.save()  # Save the entry with the tasks
        return entry
    
    def update(self, instance, validated_data):
        tasks_data = validated_data.pop("tasks",[])
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
            
            instance.tasks.clear()
            
        for task_data in tasks_data:
            task = Task(**task_data)
            instance.tasks.append(task)
         
        instance.save()
        return instance