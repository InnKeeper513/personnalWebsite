from django.db import models

EMERGENCE_CHOICES = (
    ('none','None'),
    ('emergency','Emergency'),
    ('wait','Can Wait'),
)
STATUS_CHOICES = (
    ('none','None'),
    ('planning','Planning'),
    ('research','Researching'),
    ('stuck','Stuck'),
    ('doing','In Progress'),
    ('done','Done'),
)

# Create your models here.
class ProjectAttachments(models.Model):
    project_attachment_name = models.CharField(max_length=50)
    project_attachment_type = models.CharField(max_length=10)
    project_attachment = models.FileField(upload_to='attachments')
    project_attachment_id = models.CharField(primary_key=True,max_length=10)
    project_attachment_create_date = models.DateTimeField(auto_now_add=True,blank=True)

    def __str__(self):
        return self.project_attachment_id

class SubProject(models.Model):
    project_id = models.CharField(max_length=10)

    def __str__(self):
        return self.project_id

class TagName(models.Model):
    tag_name = models.CharField(max_length=20)

    def __str__(self):
        return self.tag_name

# Project can have sub projects that can have subprojects
# All project has an ID, which is connected by SubProject object
class Project(models.Model):
    project_name = models.CharField(max_length=50)
    project_done = models.BooleanField()
    project_desc = models.CharField(max_length=500,blank=True)
    project_sub = models.ManyToManyField(SubProject,blank=True)
    project_id = models.CharField(primary_key=True,max_length=10)
    project_attachment = models.ManyToManyField(ProjectAttachments,blank=True)
    project_create_date = models.DateTimeField(auto_now_add=True,blank=True)
    project_start_date = models.DateTimeField(blank=True)
    project_dead_line = models.DateTimeField(blank=True)
    project_level = models.IntegerField(default=0)
    project_tag = models.ManyToManyField(TagName, blank=True)
    project_emergence = models.CharField(max_length=10,choices=EMERGENCE_CHOICES,default='none')
    project_status = models.CharField(max_length=10,choices=STATUS_CHOICES,default='none')

    def __str__(self):
        return self.project_name
