from rest_framework import serializers
from . import models
from chatbot.users import models as user_models


class SimpleIntentSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Intent
        fields = (
            'id',
            'name',
            'description',
            'creator',
            'modified_time',
            'examples_count',
        )


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
            'modified_time',
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
            'modified_time',
        )


class ResponseIntentSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Intent
        fields = (
            'name',
            'description',
        )


class SimpleEntitySerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)
    values = serializers.SerializerMethodField()

    class Meta:
        model = models.Entity
        fields = (
            'id',
            'name',
            'creator',
            'values',
            'modified_time',
        )

    def get_values(self, obj):
        try:
            entity_values = models.EntityValue.objects.filter(entity__id=obj.id)[:10]
            serializer = SimpleEntityValueSerializer(entity_values, many=True)
            return serializer.data
        except models.EntityValue.DoesNotExist:
            return []


class SynonymSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)

    class Meta:
        model = models.Synonym
        fields = (
            'text',
            'creator'
        )


class SimpleSynonymSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)

    class Meta:
        model = models.Synonym
        fields = ('__all__')
        # fields = (
        #     'text'
        #     'creator'
        # )


class SimpleEntityValueSerializer(serializers.ModelSerializer):
    entity_synonym = SimpleSynonymSerializer(many=True, read_only=True)

    class Meta:
        model = models.EntityValue
        fields = (
            'entity_value_name',
            'entity_type',
            'entity_synonym'
        )


class EntityValueSerializer(serializers.ModelSerializer):
    entity_synonym = SynonymSerializer(many=True)

    class Meta:
        model = models.EntityValue
        fields = (
            'id',
            'entity_value_name',
            'entity_type',
            'entity_synonym'
        )


class EntitySerializer(serializers.ModelSerializer):
    entitiy_values = EntityValueSerializer(many=True)
    creator = UserSerializer(read_only=True)

    class Meta:
        model = models.Entity
        fields = (
            'id',
            'name',
            'entitiy_values',
            'creator',
        )


class ResponseSerializer(serializers.ModelSerializer):

    creator = UserSerializer(read_only=True)

    class Meta:
        model = models.Response
        fields = (
            'id',
            'example',
            'creator',
            'modified_time',
        )    


# class GreatSimpleIntentSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = models.Intent
#         fields = (
#             'name',
#         )

class NodeSerializer(serializers.ModelSerializer):
    responses = ResponseSerializer(many=True)
    message = SimpleIntentSerializer()

    class Meta:
        model = models.Node
        fields = (
            # 'sib_order',
            'id',
            'title',
            'desc',
            'message',
            'responses'
        )

class UpdateNodeSerializer(serializers.ModelSerializer):
    responses = ResponseSerializer(many=True, read_only=True)
    depth = serializers.SerializerMethodField()

    class Meta:
        model = models.Node
        fields = (
            'id',
            'title',
            'desc',
            'responses',
            'depth',
        )

    def get_depth(self, obj):
        return obj.get_depth()
