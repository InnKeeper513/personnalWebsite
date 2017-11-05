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

class SignUpForm(UserCreationForm):
    first_name = forms.CharField(max_length=30, required=False, help_text='(Optional)')
    last_name = forms.CharField(max_length=30, required=False, help_text='(Optional)')
    email = forms.EmailField(max_length=100, help_text='Required. Inform a valid email address')

    class Meta:
        model = User
        fields=('username','first_name','last_name','email','password1','password2')
