from rest_framework import serializers
from .models import Project

class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['project_name','project_done','project_desc','project_sub','project_id',
        'project_attachment','project_create_date','project_start_date','project_dead_line',
        'project_level','project_tag','project_emergence','project_status']
