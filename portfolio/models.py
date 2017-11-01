from __future__ import unicode_literals


from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class IssueTracker(models.Model):
    issue_number = models.IntegerField(primary_key=True)
    issue_description = models.CharField(max_length=500)
    issue_title = models.CharField(max_length=100)
    possible_solution = models.CharField(max_length=300)
    progress = models.IntegerField()

class TodoList(models.Model):
    todo_number = models.IntegerField(primary_key=True)
    todo_title = models.CharField(max_length=100)
    todo_description = models.CharField(max_length=500)
    todo_progress = models.IntegerField()

class Language(models.Model):
    project_name = models.CharField(max_length=30)
    java = models.BooleanField()
    c = models.BooleanField()
    cpp = models.BooleanField()
    python = models.BooleanField()
    sql = models.BooleanField()
    csharp = models.BooleanField()
    html = models.BooleanField()
    javascript = models.BooleanField()
    css = models.BooleanField()
    r = models.BooleanField()
    vbscript = models.BooleanField()

    def __str__(self):
        return self.project_name

class Projects(models.Model):
    project_id = models.AutoField(primary_key=True)
    project_name = models.CharField(max_length=50,unique=True)
    project_progress = models.IntegerField(blank = True)
    project_description = models.CharField(max_length=300)
    project_language_use = models.ForeignKey(Language)
    owner = models.ForeignKey(User)
    startDate = models.DateTimeField(null=True,blank=True)
    endDate = models.DateTimeField(null=True,blank=True)
    issue = models.ForeignKey(IssueTracker,null=True,blank = True)
    todoList = models.ForeignKey(TodoList,null=True,blank = True)

    def __str__(self):
        return self.project_name

class Contact_Info(models.Model):
    email = models.CharField(max_length=30,primary_key=True)
    name = models.CharField(max_length=30)
    text = models.CharField(max_length=300)

    def __str__(self):
        return self.email
