from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.


def schedular(request,test):
    # Process the Data
    return HttpResponse(test)
