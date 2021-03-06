# Generated by Django 2.0.9 on 2019-06-01 10:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('nlp', '0015_auto_20190512_1837'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entityvalue',
            name='entity_type',
            field=models.CharField(choices=[('not-specified', 'Not-specified'), ('synonyms', 'Synonyms'), ('patterns', 'Patterns')], max_length=80, null=True),
        ),
        migrations.AlterField(
            model_name='response',
            name='node',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='responses', to='nlp.Node'),
        ),
    ]
