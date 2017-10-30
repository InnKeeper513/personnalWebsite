from django.shortcuts import render
from .models import Projects
# Create your views here.

def index(request):
    return render(request, 'portfolio/index.html')

def about(request):
    return render(request, 'portfolio/about.html')

class Combine:
    def __init__(self,title,language,description):
        self.title=title
        self.language=language
        self.description=description

def project(request):

    combine_list = []
    projects = Projects.objects.all()
    #project_name = projects[0].project_name

    #languages = projects[0].project_language_use.__dict__
    project_strings = {}
    looptime = len(projects)
    for project in projects:
        temp_string = []
        for key,value in project.project_language_use.__dict__.items():
            if value == True and key != 'id':
                temp_string.append(key)
        combine_obj = Combine(project.project_name,",".join(temp_string),project.project_description)
        combine_list.append(combine_obj)

    #project_string = "Languages: " + ",".join(project_language_use)
    #context={'project_name':project_name,'project_string':project_string}
    context={'combine_list':combine_list}
    return render(request, 'portfolio/project.html', context)

def contact(request):
    return render(request, 'portfolio/contact.html')
