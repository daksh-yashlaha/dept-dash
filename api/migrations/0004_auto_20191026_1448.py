# Generated by Django 2.2.4 on 2019-10-26 14:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_appuser_is_staff'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appuser',
            name='is_staff',
            field=models.BooleanField(default=True),
        ),
    ]
