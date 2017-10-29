from django.shortcuts import render
from .models import Projects
# Create your views here.

def index(request):
    return render(request, 'portfolio/index.html')

def about(request):
    return render(request, 'portfolio/about.html')

def project(request):
    projects = Projects.objects.all()
    #project_name = projects[0].project_name

    #languages = projects[0].project_language_use.__dict__
    project_strings = {}
    for project in projects:
        temp_string = []
        for key,value in project.project_language_use.__dict__.items():
            if value == True and key != 'id':
                temp_string.append(key)
        project_strings[project.project_name]=",".join(temp_string)

    #project_string = "Languages: " + ",".join(project_language_use)
    #context={'project_name':project_name,'project_string':project_string}
    context={'projects':projects,'project_strings':project_strings}
    return render(request, 'portfolio/project.html', context)

def contact(request):
    return render(request, 'portfolio/contact.html')
