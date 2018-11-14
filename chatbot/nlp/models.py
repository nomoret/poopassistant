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