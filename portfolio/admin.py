from django.contrib import admin
from .models import Projects,IssueTracker,TodoList,Language

# Register your models here.
admin.site.register(Projects)
admin.site.register(IssueTracker)
admin.site.register(TodoList)
admin.site.register(Language)
