from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import serializers
from . import models

# Create your models here.
class Histories(APIView):

    def get(self, request, format=None):

        all_history = models.History.objects.all()

        serializer = serializers.HistorySerializer(all_history, many=True)

        return Response(data=serializer.data)

histories_view = Histories.as_view()

def create_history(message, intent_id, accuary, response, user):
    new_history = models.History.objects.create(
            message = message,
            intent_id = intent_id,
            accuary = accuary,
            response = response,
            user = user
        )
    new_history.save()