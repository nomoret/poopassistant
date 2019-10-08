from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework import status
from . import serializers
from . import models

from konlpy.tag import Mecab
from konlpy.tag import Twitter
from khaiii import KhaiiiApi

import pandas as pd
import io
from sklearn.feature_extraction.text import CountVectorizer, TfidfTransformer
from sklearn.linear_model import SGDClassifier
from sklearn.pipeline import Pipeline

import numpy as np

from flashtext import KeywordProcessor

class Intents(APIView):

    def get(self, request, format=None):

        print(request.scheme)
        print(request.body)

        all_intents = models.Intent.objects.all()

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

        all_entities = models.Entity.objects.all()

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
            entity = models.Entity.objects.get(id=entity_id)
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

        if request.data is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # need to finding existing entity value
        try:
            entity_value_name = request.data['entity_value_name']
            entity_type = request.data['entity_type']
            new_entity_value = models.EntityValue.objects.create(
                entity_value_name=entity_value_name,
                entity_type=entity_type,
                creator=user,
                entity=found_entity,
            )
            new_entity_value.save()
        except Exception as e:
            print("Exception", e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

        synonyms = request.data['entity_synonym']
        if synonyms is None:
            Response(data=request.data, status=status.HTTP_200_OK)

        synonym_serializer = serializers.SimpleSynonymSerializer(data=synonyms, many=True)
        if synonym_serializer.is_valid():
            synonym_serializer.save(creator=user, entity_synonym=new_entity_value)
        else:
            print("not creat synoym!!!!")
            return Response(status=status.HTTP_404_NOT_FOUND)

        new_entity_value_serializer = serializers.EntityValueSerializer(new_entity_value)
        return Response(data=new_entity_value_serializer.data, status=status.HTTP_200_OK)


entity_add_values_view = EntityAddValues.as_view()


class EntityValueDetail(APIView):
    def get(self, request, entity_value_id, format=None):
        user = request.user

        print("this api valid")

        try:
            entity_value = models.EntityValue.objects.get(id=entity_value_id)
        except models.EntityValue.DoesNotExist:
            print("not found entity value")
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.EntityValueSerializer(entity_value)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, entity_value_id, format=None):
        user = request.user

        print("this api valid")

        try:
            entity_value = models.EntityValue.objects.get(id=entity_value_id)
            entity_value.delete()
        except models.EntityValue.DoesNotExist:
            print("not found entity value")
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)

entity_value_detail_view = EntityValueDetail.as_view();

class Nodes(APIView):
    def get(self, request, format=None):
        user = request.user

        print("this api is load the node tree")
        res = models.Node.dump_bulk()
        print(res)
        return Response(data=res, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        user = request.user
        print(user)
        print(request.data)
        
        try:
            found_node_id = request.data['index']
            try:
                found_node = models.Node.objects.get(id=request.data['index'])
                found_node.add_child(title="Undefined", desc="Undefined")
            except models.Node.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        except:
            models.Node.add_root(title="Undefined", desc="Undefined")
            
        res = models.Node.dump_bulk()

        return Response(data=res, status=status.HTTP_200_OK)

        # adding_response_data = request.data['response']

        # if adding_response_data != '':

        #     response_serializer = serializers.ResponseSerializer(data={ 'example': adding_response_data })

        #     if response_serializer.is_valid():
        #         response_serializer.save(node=found_node, creator=user)
        #     else:
        #         return Response(data=response_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # serializer = serializers.UpdateNodeSerializer(found_node, data=request.data)

        # if serializer.is_valid():
            
        #     serializer.save()

        #     print(serializer.data)
        #     return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        # else:
        #     return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
node_tree_view =  Nodes.as_view();

class NodeDetail(APIView):
    def get(self, request, node_id, format=None):
        user = request.user

        print(node_id)

        try:
            found_node = models.Node.objects.get(id=node_id)
        except models.Node.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.NodeSerializer(found_node)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, node_id, format=None):
        user = request.user

        print(request.data)
    
        try:
            found_node = models.Node.objects.get(id=node_id)
        except models.Node.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        adding_response_data = request.data['response']

        if adding_response_data != '':

            response_serializer = serializers.ResponseSerializer(data={ 'example': adding_response_data })

            if response_serializer.is_valid():
                response_serializer.save(node=found_node, creator=user)
            else:
                return Response(data=response_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer = serializers.UpdateNodeSerializer(found_node, data=request.data, partial=True)

        if serializer.is_valid():
            
            serializer.save()

            print(serializer.data)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, node_id, format=None):
        user = request.user

        try:
            found_node = models.Node.objects.get(id=node_id)
            found_node.delete()
        except models.Node.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)    
        return Response(status=status.HTTP_204_NO_CONTENT)

   
node_detail_view =  NodeDetail.as_view();


def get_noun(text):
    api = KhaiiiApi()

    anlayze = []    
    for word in api.analyze(text):
        for pos in word.morphs:
            print("{0} - {1}".format(pos.lex, pos.tag))
            if pos.tag.startswith('NN') or pos.tag.startswith('SL'):
                anlayze.append(pos.lex)
    message = ''.join(anlayze)
    return str(message)

def train_data():
    all_examples = models.Example.objects.all()
    q = all_examples.values(*['id', 'example', 'intent_id'])
    print(q)

    df = pd.DataFrame.from_records(q)
    print(df)
    x_data = df['example']
    y_data = pd.Categorical(df['intent_id'])

    cv = CountVectorizer(tokenizer=get_noun)
    tdm = cv.fit_transform(x_data)
    print(tdm.shape)
    # pprint.pprint(cv.vocabulary_)
    text_clf_svm = Pipeline([('vect', cv),
                            ('tfidf', TfidfTransformer()),
                            ('clf-svm', SGDClassifier(loss='log',
                                                    penalty='l2',
                                                    alpha=1e-3,
                                                    max_iter=10,
                                                    random_state=42
                                                    ))])
    print(text_clf_svm.fit(x_data, y_data))
    return text_clf_svm

text_clf_svm = train_data()

keyword_processor =  None
replace_processor = None

def initialize_entity():
    global keyword_processor
    global replace_processor
    keyword_processor = KeywordProcessor()
    replace_processor = KeywordProcessor()

    all_entity = models.Entity.objects.all()
    print(all_entity)
    for entity in all_entity:
        print(entity.id)
        print(entity.name)
        cur_entity_name = entity.name

        all_entity_values = models.EntityValue.objects.filter(entity__id=entity.id)
        for entity_value in all_entity_values:
            print("1depth\n", entity_value)
            print(entity_value.id)
            print(entity_value.entity_value_name)
            cur_entity_value_name = entity_value.entity_value_name

            all_synonyms = models.Synonym.objects.filter(entity_synonym__id=entity_value.id)
            for synomym in all_synonyms:
                print("2depth\n", synomym)
                replace_processor.add_keyword(synomym.text, cur_entity_value_name)

            keyword_processor.add_keyword(cur_entity_value_name, cur_entity_name)

initialize_entity()

class SVM(APIView):

    def get(self, request, format=None):

        print(request.query_params)
        input_str = request.query_params.get('chat', None)

        if not input_str:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        pos_tagger_type = request.query_params.get('pos_tagger', None)
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
                'pos_tagger': pos_tagger_type,
            }
        }

        return Response(data=responseData, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        print("request message response")

        if request.data is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        user_message = request.data['msg']
        print(user_message)

        replace_list = replace_processor.extract_keywords(user_message, span_info=True)
        print("변경합니다")
        print(type(replace_list))

        if len(replace_list) > 0:
            replace_user_message = replace_processor.replace_keywords(user_message)
        else:
            replace_user_message = user_message
        print("치환 문자열")
        print(replace_user_message)

        entityList = keyword_processor.extract_keywords(replace_user_message, span_info=True)
        print("변경합니다")
        print(entityList)

        entities = []
        for item in entityList:
            start_index = item[1]
            end_index = item[2]

            # for replace_item in replace_list:
            #     if replace_item[0] == replace_user_message[start_index:end_index]:
            #         start_index = replace_item[1]
            #         end_index = replace_item[2]
            #         break

            origin_keyword = replace_user_message[start_index:end_index]
            item = {
              "entity":item[0],
              "origin": origin_keyword
            }
            entities.append(item)

        print(entities)

        probs = text_clf_svm.predict_proba([user_message])

        limit=3
        top_n_predictions = np.argsort(-probs, axis = 1)[:,:limit]
        print(top_n_predictions)

        top_socs = text_clf_svm.classes_[top_n_predictions]
        print(top_socs)

        prob_intent_dict = dict(zip(top_socs[0], probs[0][top_n_predictions][0]))
        print(prob_intent_dict)

        probs_list =  []
        for prob_intent_id in prob_intent_dict:
            
            try:
                found_prob_intent = models.Intent.objects.get(id=prob_intent_id)
            except models.Intent.DoesNotExist:
                continue

            print(prob_intent_id)
            print(prob_intent_dict[prob_intent_id])
            prob_intent_accuracy = prob_intent_dict[prob_intent_id]

            hoho = {
                'id': prob_intent_id,
                'name': found_prob_intent.name,
                'accuracy': prob_intent_accuracy
            }
            probs_list.append(hoho)
        print(probs_list)

        probs_index = top_n_predictions[0][0]
        idx = top_socs[0][0]

        try:
            found_intent = models.Intent.objects.get(id=idx)
        except models.Intent.DoesNotExist:
            print("not found entity value")
            invalid_data = {
                'name': 'nothing',
                'description': 'invalide intent'
            }
            return Response(data=invalid_data, status=status.HTTP_204_NO_CONTENT)

        # serializer = serializers.ResponseIntentSerializer(found_intent)
        
        response_data = {
            'entities': entities,
            'name': found_intent.name,
            'description': found_intent.description,
            # 'name': serializer.data['name'],
            # 'description': serializer.data['description'],
            'outputs': probs_list,
            'accuracy':(probs[0][probs_index])
        }

        return Response(data=response_data, status=status.HTTP_200_OK)
        
    def _pos_tagger(self, input, type='mecab'):

        if(type == 'mecab'):
            osx_path = '/usr/local/lib/mecab/dic/mecab-ko-dic'
            tumbleweed_path = '/usr/local/lib64/mecab/dic/mecab-ko-dic'
            mecab = Mecab(osx_path)
            return mecab.pos(str(input))
        elif (type == 'twitter'):
            twitter = Twitter()
            return twitter.pos(str(input))

svm_view = SVM.as_view()
