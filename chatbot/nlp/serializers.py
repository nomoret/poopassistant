from rest_framework import serializers
from . import models
from chatbot.users import models as user_models


class SimpleIntentSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Intent
        fields = ('__all__')

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = user_models.User
        fields = (
            'username',
        )

class ExampleSerializer(serializers.ModelSerializer):

    creator = UserSerializer(read_only=True)
    
    class Meta:
        model = models.Example
        fields = (
            'id',
            'example',
            'creator',
        )

class IntentSerializer(serializers.ModelSerializer):

    examples = ExampleSerializer(many=True)

    class Meta:
        model = models.Intent
        fields = (
            'id',
            'name',
            'description',
            'examples',
            'creator',
        )

class SimpleEntitySerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)

    class Meta:
        model = models.Entity
        fields = (
            'id',
            'entity_name',
            'creator',
        )
class SynonymSerializer(serializers.ModelSerializer):
    # creator = UserSerializer(read_only=True)

    class Meta:
        model = models.Synonym
        fields = (
            'text',
        )

class EntityValueSerializer(serializers.ModelSerializer):
    entity_synonym = SynonymSerializer(many=True)

    class Meta:
        model = models.EntityValue
        fields = (
            'entity_value_name',
            'entity_type',
            'entity_synonym',
        )


class EntitySerializer(serializers.ModelSerializer):
    entitiy_values = EntityValueSerializer(many=True)
    creator = UserSerializer(read_only=True)

    class Meta:
        model = models.Entity
        fields = (
            'id',
            'entity_name',
            'entitiy_values',
            'creator',
        )