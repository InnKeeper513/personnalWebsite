from django import forms
from .models import Contact_Info

class ContactForm(forms.ModelForm):
    class Meta:
        model=Contact_Info
        fields=['email','name','text']
        labels = {'email' : 'Email:', 'title' : 'Title:', 'text' : 'Text:'}
        widgets = {'email' : forms.Textarea(attrs={'cols':30}),
                   'name' : forms.Textarea(attrs={'cols':30}),
                   'text' : forms.Textarea(attrs={'cols':300})
                   }
