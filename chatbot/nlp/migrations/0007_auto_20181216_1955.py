# Generated by Django 2.0.7 on 2018-12-16 10:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nlp', '0006_auto_20181125_1844'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entityvalue',
            name='entity_type',
            field=models.CharField(choices=[('not-specified', 'Not-specified'), ('patterns', 'Patterns'), ('synonyms', 'Synonyms')], max_length=80, null=True),
        ),
    ]