from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import serializers
from . import models

from konlpy.tag import Mecab
from konlpy.tag import Twitter

class Intents(APIView):

    def get(self, request, format=None):

        print(request.scheme)
        print(request.body)

        all_intents =  models.Intent.objects.all()

        serializer = serializers.SimpleIntentSerializer(all_intents, many=True)

        return Response(data=serializer.data)

    def post(self, request, format=None):        
        user = request.user        
        print(request.data)

        serializer = serializers.SimpleIntentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(creator=user)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):    
        user = request.user

        print(request.data)

        intent_id_list = request.data['entities']

        try:
            found_intents = models.Intent.objects.filter(id__in=intent_id_list)
            found_intents.delete()
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_204_NO_CONTENT)       

intents_view = Intents.as_view()

class IntentDetail(APIView):

    def get(self, request, intent_id, format=None):
        user = request.user

        try:
            intent = models.Intent.objects.get(id=intent_id)
        except models.Intent.DoesNotExist:
            print("not found intent!!!!")
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.IntentSerializer(intent)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, intent_id, format=None):
        user = request.user
        print(user)

        try:
            intent = models.Intent.objects.get(id=intent_id)
        except models.Intent.DoesNotExist:
            print("not found intent!!!!")
            return Response(status=status.HTTP_404_NOT_FOUND)

        intent.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

intent_detail_view = IntentDetail.as_view()

class IntentAddExamples(APIView):
    def get(self, request, intent_id, format=None):
        user = request.user

        examples = models.Example.objects.filter(intent__id=intent_id)

        serializer = serializers.ExampleSerializer(examples, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

        
    def post(self, request, intent_id, format=None):
        user = request.user
        print(user)

        try:
            found_intent = models.Intent.objects.get(id=intent_id)
        except models.Intent.DoesNotExist:
            print("not found intent!!!!")
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        print(request.data)
        serializer = serializers.ExampleSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(intent=found_intent, creator=user)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.error, status=status.HTTP_400_BAD_REQUEST)

intent_add_examples_view = IntentAddExamples.as_view()

class Example(APIView):
    # def get(self, request, example_id, format=None):
    #     pass

    def delete(self, request, example_id, format=None):
        user = request.user
        print(user)

        print(example_id)

        try:
            example = models.Example.objects.get(id=example_id)
        except models.Example.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        example.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

example_view = Example.as_view()

class Entities(APIView):

    def get(self, request, format=None):

        print(request.scheme)
        print(request.body)

        all_entities =  models.Entity.objects.all()

        serializer = serializers.SimpleEntitySerializer(all_entities, many=True)

        return Response(data=serializer.data)

    def post(self, request, format=None):        
        user = request.user        
        print(request.data)

        serializer = serializers.SimpleEntitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(creator=user)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):    
        user = request.user

        print(request.data)

        entity_id_list = request.data['entities']

        try:
            found_entities = models.Entity.objects.filter(id__in=entity_id_list)
            found_entities.delete()
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_204_NO_CONTENT)

entities_view = Entities.as_view()

class EntityDetail(APIView):

    def get(self, request, entity_id, format=None):

        user = request.user
        print(user)

        try:
            entity =  models.Entity.objects.get(id=entity_id)
        except models.Entity.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = serializers.EntitySerializer(entity)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

entity_detail_view = EntityDetail.as_view()

class EntityAddValues(APIView):
    def get(self, request, entity_id, format=None):
        user = request.user

        values = models.EntityValue.objects.filter(entity__id=entity_id)

        serializer = serializers.EntityValueSerializer(values, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
        
    def post(self, request, entity_id, format=None):
        user = request.user
        print(user)

        try:
            found_entity = models.Entity.objects.get(id=entity_id)
        except models.Entity.DoesNotExist:
            print("not found Entity!!!!")
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        print(request.data)

        value = request.data
        print(value)

        serializer = serializers.SimpleEntityValueSerializer(data=value)
        if not serializer.is_valid():   
            return Response(data=serializer.error, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer.save(creator=user, entity=found_entity)    

    
        synonyms = request.data['entity_synonym']
        print(synonyms)
        synonym_serializer = serializers.SimpleSynonymSerializer(data=synonyms, many=True)
        if synonym_serializer.is_valid():
            synonym_serializer.save(creator=user, entity_synonym=serializer.data)
        else:
            print("not creat synoym!!!!")

        print(synonym_serializer.data)
        
        # serializer = serializers.EntityValueSerializer(data=request.data)
        
        

entity_add_values_view = EntityAddValues.as_view()

class SVM(APIView):

    def get(self, request, format=None):

        print(request.query_params)
        input_str = request.query_params.get('chat', None)

        if not input_str:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        pos_tagger_type =  request.query_params.get('pos_tagger', None)
        if not pos_tagger_type:
            pos_tagger_type = 'mecab'
        
        pos_tags = self._pos_tagger(input_str, pos_tagger_type)
        print(pos_tags)

        if pos_tags is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        print(pos_tags)
        responseData = {
        'status': True,
        'data': {
            'input': input_str,
            'pos_list': pos_tags,
            'pos_tagger' : pos_tagger_type,
            }
        }

        return Response(data=responseData, status=status.HTTP_200_OK)

    def _pos_tagger(self, input, type='mecab'):

        if(type == 'mecab'):
            osx_path = '/usr/local/lib/mecab/dic/mecab-ko-dic'
            tumbleweed_path = '/usr/local/lib64/mecab/dic/mecab-ko-dic'
            mecab = Mecab(osx_path)
            return mecab.pos(str(input))
        elif (type == 'twitter'):
            twitter = Twitter()
            return twitter.pos(str(input))

    # def train_data(self, type):
    #     data = pd.read_csv('resource/'+type+'.csv')
    #     x_data = data['question']
    #     y_data = pd.Categorical(data['id'])

    #     answer_index = dict()
    #     for row in data.iterrows():
    #         id = row[1]['id']
    #         answer = row[1]['answer']

    #     if not id in answer_index:
    #         answer_index[id] = answer

    #     cv = CountVectorizer(tokenizer=get_noun)
    #     tdm = cv.fit_transform(x_data)
    #     print(tdm.shape)
    #     # pprint.pprint(cv.vocabulary_)
    #     text_clf_svm = Pipeline([('vect', cv),
    #                             ('tfidf', TfidfTransformer()),
    #                             ('clf-svm', SGDClassifier(loss='hinge',
    #                                                     penalty='l2',
    #                                                     alpha=1e-3,
    #                                                     max_iter=10,
    #                                                     random_state=42
    #                                                    ))])
    #     print(text_clf_svm.fit(x_data, y_data))
    #     return  [text_clf_svm, answer_index]

svm_view = SVM.as_view()
