from django.conf.urls import url
from django.contrib.auth import views as auth_views
from . import views

app_name='simplenote'

urlpatterns=[
    url(r'login/',auth_views.login,{'template_name':'simplenote/login.html'},name='login'),
    url(r'register/', views.signup, name='signup'),
]
