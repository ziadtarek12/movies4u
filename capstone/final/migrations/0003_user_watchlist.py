# Generated by Django 4.2 on 2023-07-16 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('final', '0002_film'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='watchlist',
            field=models.ManyToManyField(blank=True, related_name='users', to='final.film'),
        ),
    ]
