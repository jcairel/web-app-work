# Generated by Django 3.2.25 on 2025-01-25 01:48

import django.contrib.gis.db.models.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stores', '0002_auto_20250121_0401'),
    ]

    operations = [
        migrations.AlterField(
            model_name='store',
            name='location',
            field=django.contrib.gis.db.models.fields.PointField(geography=True, null=True, srid=4326),
        ),
    ]
