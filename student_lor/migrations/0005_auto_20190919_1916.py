# Generated by Django 2.2.4 on 2019-09-19 19:16

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('student_lor', '0004_auto_20190917_0640'),
    ]

    operations = [
        migrations.RenameField(
            model_name='facultylistlor',
            old_name='faculty_id',
            new_name='faculty',
        ),
        migrations.RenameField(
            model_name='facultylistlor',
            old_name='lor_id',
            new_name='lor',
        ),
        migrations.AlterUniqueTogether(
            name='facultylistlor',
            unique_together={('lor', 'faculty')},
        ),
    ]
