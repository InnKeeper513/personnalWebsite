from django.conf.urls import url

from . import views
app_name = 'localjava'

urlpatterns = [
    url(r'schedular/$', views.schedular, name='schedular'),
]
