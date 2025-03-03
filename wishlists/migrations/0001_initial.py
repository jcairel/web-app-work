# Generated by Django 3.2.25 on 2025-01-25 01:54

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('stores', '0003_alter_store_location'),
    ]

    operations = [
        migrations.CreateModel(
            name='WishList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('buyer', models.CharField(max_length=100)),
                ('wishmaster', models.CharField(max_length=100)),
                ('items', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=100), size=None)),
                ('status', models.CharField(choices=[('PENDING', 'PENDING'), ('ACCEPTED', 'ACCEPTED'), ('FULFILLED', 'FULFILLED')], default='PENDING', max_length=10)),
                ('store', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='wishlists', to='stores.store')),
            ],
        ),
    ]
