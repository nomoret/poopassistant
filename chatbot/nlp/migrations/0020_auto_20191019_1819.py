# Generated by Django 2.0.9 on 2019-10-19 09:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nlp', '0019_auto_20191019_1815'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entityvalue',
            name='entity_type',
            field=models.CharField(choices=[('not-specified', 'Not-specified'), ('patterns', 'Patterns'), ('synonyms', 'Synonyms')], max_length=80, null=True),
        ),
    ]