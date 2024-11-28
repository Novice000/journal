from mongoengine import *
from django.utils.timezone import now
from django.contrib.auth.hashers import make_password, check_password
from mongoengine import Document, StringField

class User (Document):
    meta = {"collection":"user"}
    #fields of the model
    username = StringField(max_length=150, unique=True, required=True)
    email = StringField(max_length=255, unique=True, required=True)
    password = StringField(required=True)
    is_active = BooleanField(default=True)
    is_staff = BooleanField(default=False)
    is_superuser = BooleanField(default=False)
    date_joined = DateTimeField(default=now)

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):# -> BooleanField | Any:
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser
    
    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)


    
class Task(EmbeddedDocument):
    task = StringField()
    completed = BooleanField(required= True, default=False)
    
class Entries(Document):
    meta = {"collection":"entries"}
    #fields of the model
    user = ReferenceField(User, required=True)
    text = StringField(required= True)
    review = StringField()
    tasks = ListField(EmbeddedDocumentField(Task))
    timestamp = DateTimeField(default=now)
