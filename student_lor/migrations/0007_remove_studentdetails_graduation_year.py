# Generated by Django 2.2.4 on 2019-10-09 14:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('student_lor', '0006_auto_20191009_1444'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='studentdetails',
            name='graduation_year',
        ),
    ]