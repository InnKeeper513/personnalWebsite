from django import forms
from .models import Contact_Info
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class ContactForm(forms.ModelForm):
    class Meta:
        model=Contact_Info
        fields=['email','name','text']
        labels = {'email' : 'Email:', 'title' : 'Title:', 'text' : 'Text:'}

class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    class Meta:
        model = User
        fields = ['username','email','password']
