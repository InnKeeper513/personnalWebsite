# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-12 14:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0015_auto_20171111_1437'),
    ]

    operations = [
        migrations.AddField(
            model_name='projects',
            name='front_image',
            field=models.ImageField(blank=True, upload_to='front_image'),
        ),
    ]
