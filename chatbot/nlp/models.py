from django.db import models
from chatbot.users import models as user_model

class TimeStampModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Intent(TimeStampModel):
    name = models.CharField(max_length=128, blank=True)
    description = models.CharField(max_length=128, blank=True)
    creator = models.ForeignKey(user_model.User, on_delete=models.PROTECT, null=True)


class Example(TimeStampModel):

    """ Comment Model """
    example = models.TextField()
    creator = models.ForeignKey(user_model.User, on_delete=models.PROTECT, null=True)
    intent = models.ForeignKey(Intent, on_delete=models.CASCADE, null=True, related_name='examples')

    def __str__(self):
            return self.example

class Entity(TimeStampModel):

    ENTITY_CHOICE = {
        ("synonyms", "Synonyms"),
        ("patterns", "Patterns"),
        ("not-specified", "Not-specified")
    }

    entity_name = models.CharField(max_length=128, blank=True)
    entity_type = models.CharField(max_length=80, choices=ENTITY_CHOICE, null=True)
    creator = models.ForeignKey(user_model.User, on_delete=models.PROTECT, null=True)

class EntityValue(TimeStampModel):
    entity_value_name = models.CharField(max_length=128, blank=True)
    creator = models.ForeignKey(user_model.User, on_delete=models.PROTECT, null=True)    
    entity = models.ForeignKey(Entity, on_delete=models.CASCADE, null=True, related_name='entities')

class Synonym(TimeStampModel):

    """ Comment Model """
    name = models.TextField()
    creator = models.ForeignKey(user_model.User, on_delete=models.PROTECT, null=True)
    entity_value = models.ForeignKey(EntityValue, on_delete=models.CASCADE, null=True, related_name='entityvalue')

    def __str__(self):
            return self.name