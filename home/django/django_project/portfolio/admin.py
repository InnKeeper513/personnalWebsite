from django.contrib import admin
from .models import Projects,IssueTracker,TodoList,Language,Contact_Info

# Register your models here.
admin.site.register(Projects)
admin.site.register(IssueTracker)
admin.site.register(TodoList)
admin.site.register(Language)
admin.site.register(Contact_Info)
