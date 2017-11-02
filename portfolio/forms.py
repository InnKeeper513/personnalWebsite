from django import forms
from .models import Contact_Info

class ContactForm(forms.ModelForm):
    class Meta:
        model=Contact_Info
        fields=['email','name','text']
        labels = {'email' : 'Email:', 'title' : 'Title:', 'text' : 'Text:'}
