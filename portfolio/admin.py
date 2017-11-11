from django.contrib import admin
from .models import Projects,IssueTracker,TodoList,Language,Contact_Info,Features

# Register your models here.
admin.site.register(Projects)
admin.site.register(IssueTracker)
admin.site.register(TodoList)
admin.site.register(Language)
admin.site.register(Contact_Info)
admin.site.register(Features)
