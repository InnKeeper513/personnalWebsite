from django.db import models

# Create your models here.
class ProjectAttachments(models.Model):
    project_attachment_name = models.CharField(max_length=50)
    project_attachment_type = models.CharField(max_length=10)
    project_attachment = models.FileField(upload_to='attachments')
    project_attachment_id = models.CharField(primary_key=True,max_length=10)

    def __str__(self):
        return self.project_attachment_id

class SubProject(models.Model):
    project_id = models.CharField(max_length=10)

    def __str__(self):
        return self.project_id

# Project can have sub projects that can have subprojects
# All project has an ID, which is connected by SubProject object
class Project(models.Model):
    project_name = models.CharField(max_length=50)
    project_done = models.BooleanField()
    project_desc = models.CharField(max_length=500,blank=True)
    project_sub = models.ManyToManyField(SubProject,blank=True)
    project_id = models.CharField(primary_key=True,max_length=10)
    project_attachment = models.ManyToManyField(ProjectAttachments,blank=True)

    def __str__(self):
        return self.project_name
