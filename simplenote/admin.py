from django.contrib import admin
from .models import Project, ProjectAttachments, TagName

# Register your models here.
admin.site.register(Project)
admin.site.register(ProjectAttachments)
admin.site.register(TagName)
