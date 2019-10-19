from rest_framework import serializers
from . import models
from chatbot.users import models as user_models

class HistorySerializer(serializers.ModelSerializer):

    class Meta:
        model = models.History
        fields = (
            'message',
            'intent',
            'accuary',
            'response',
            'user',
            'time',
        )