
from django.db import models
from chatbot.users import models as user_model
from chatbot.nlp import models as chat_bot_model
from django.contrib.humanize.templatetags.humanize import naturaltime

class History(models.Model):

    """ History Model """
    message = models.TextField()
    intent = user = models.ForeignKey(chat_bot_model.Intent, on_delete=models.SET_NULL, null=True)
    accuary = models.FloatField()
    response = models.TextField(blank=True)
    user = models.ForeignKey(user_model.User, on_delete=models.SET_NULL, null=True)
    time = models.DateTimeField(auto_now_add=True)