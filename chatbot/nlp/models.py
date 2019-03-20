from django.db import models
from chatbot.users import models as user_model
from django.contrib.humanize.templatetags.humanize import naturaltime

class TimeStampModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Intent(TimeStampModel):

    """ Intent Model """

    name = models.CharField(max_length=128, blank=True)
    description = models.CharField(max_length=128, blank=True)
    creator = models.ForeignKey(user_model.User, on_delete=models.PROTECT, null=True)

    @property
    def modified_time(self):
        return naturaltime(self.updated_at)

    @property
    def examples_count(self):
        return self.examples.count()

    def __str__(self):
        return self.name

class Example(TimeStampModel):

    """ Example Model """

    example = models.TextField()
    creator = models.ForeignKey(user_model.User, on_delete=models.PROTECT, null=True)
    intent = models.ForeignKey(Intent, on_delete=models.CASCADE, null=True, related_name='examples')

    @property
    def modified_time(self):
        return naturaltime(self.updated_at)
        
    def __str__(self):
        return self.example

class Entity(TimeStampModel):

    """ Entity Model """

    name = models.CharField(max_length=128, blank=True)  
    creator = models.ForeignKey(user_model.User, on_delete=models.PROTECT, null=True)

    @property
    def modified_time(self):
        return naturaltime(self.updated_at)

    def __str__(self):
        return self.name

class EntityValue(TimeStampModel):

    """ Entity Value Model """

    ENTITY_CHOICE = {
        ("synonyms", "Synonyms"),
        ("patterns", "Patterns"),
        ("not-specified", "Not-specified")
    }

    entity_value_name = models.CharField(max_length=128, blank=False)
    entity_type = models.CharField(max_length=80, choices=ENTITY_CHOICE, null=True)
    creator = models.ForeignKey(user_model.User, on_delete=models.PROTECT, null=True)    
    entity = models.ForeignKey(Entity, on_delete=models.CASCADE, null=True, related_name='entitiy_values')

    def __str__(self):
        return self.entity_value_name

class Synonym(TimeStampModel):

    """ Synonym Model """
    text = models.CharField(max_length=128, blank=True)
    creator = models.ForeignKey(user_model.User, on_delete=models.PROTECT, null=True)
    entity_synonym = models.ForeignKey(EntityValue, on_delete=models.CASCADE, null=True, related_name='entity_synonym')

    def __str__(self):
        return self.text