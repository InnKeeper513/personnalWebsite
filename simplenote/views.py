from django.shortcuts import render
from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.views.generic import View
from django.contrib.auth.decorators import login_required

from .forms import SignUpForm
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .serializers import ToDoSerializer
from .models import Project


# Create your views here.

@login_required
def home(request):
    return render(request, 'simplenote/home.html')

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username,password=raw_password)
            login(request,user)
            return redirect('home')
    else:
        form = SignUpForm()
    return render(request, 'simplenote/register.html',{'form':form})

class ToDoView(APIView):
    def get(self,request):
        todos = Project.objects.all()
        serializer = ToDoSerializer(todos, many=True)
        return Response(serializer.data)

    def put(get,request):
        serializer = ToDoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
