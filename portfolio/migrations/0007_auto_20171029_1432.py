# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-10-29 18:32
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0006_auto_20171029_1325'),
    ]

    operations = [
        migrations.RenameField(
            model_name='language',
            old_name='cshart',
            new_name='csharp',
        ),
    ]
