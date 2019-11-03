# Generated by Django 3.0b1 on 2019-11-03 11:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20191103_1634'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('research', '0002_project_publication'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='author',
        ),
        migrations.RemoveField(
            model_name='publication',
            name='author',
        ),
        migrations.AddField(
            model_name='project',
            name='authors',
            field=models.ManyToManyField(related_name='project', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='publication',
            name='authors',
            field=models.ManyToManyField(related_name='publication', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='researchscholar',
            name='dept',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='scholars', to='users.Department'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='project',
            name='status',
            field=models.CharField(choices=[('COM', 'communicated'), ('REJ', 'rejected'), ('ACT', 'accepted')], max_length=3),
        ),
        migrations.AlterField(
            model_name='project',
            name='title',
            field=models.CharField(max_length=250),
        ),
        migrations.AlterField(
            model_name='publication',
            name='title',
            field=models.CharField(max_length=250),
        ),
    ]
