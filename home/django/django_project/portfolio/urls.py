from django.conf.urls import url
from django.contrib.auth.views import login

from . import views
app_name = 'portfolio'

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^about/', views.about, name='about'),
    url(r'^project/', views.project, name='project'),
    url(r'contact/', views.contact, name='contact'),
    url(r'login/', login, {'template_name': 'portfolio/login.html'}, name='login'),
    url(r'register/', views.signup, name='signup'),
]
