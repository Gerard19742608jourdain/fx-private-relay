# Generated by Django 3.2.14 on 2022-07-27 21:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('phones', '0016_alter_relaynumber_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='relaynumber',
            name='enabled',
            field=models.BooleanField(default=True),
        ),
    ]
