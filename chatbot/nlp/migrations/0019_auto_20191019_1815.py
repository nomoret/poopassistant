# Generated by Django 2.0.9 on 2019-10-19 09:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('nlp', '0018_auto_20191009_1631'),
    ]

    operations = [
        migrations.CreateModel(
            name='History',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.TextField()),
                ('accuary', models.FloatField()),
                ('response', models.TextField(blank=True)),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('intent', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='nlp.Intent')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AlterField(
            model_name='entityvalue',
            name='entity_type',
            field=models.CharField(choices=[('synonyms', 'Synonyms'), ('patterns', 'Patterns'), ('not-specified', 'Not-specified')], max_length=80, null=True),
        ),
    ]
