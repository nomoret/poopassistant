# Generated by Django 2.0.7 on 2018-11-25 09:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nlp', '0005_auto_20181125_1836'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entityvalue',
            name='entity_type',
            field=models.CharField(choices=[('patterns', 'Patterns'), ('not-specified', 'Not-specified'), ('synonyms', 'Synonyms')], max_length=80, null=True),
        ),
    ]
