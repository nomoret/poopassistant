from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from konlpy.tag import Mecab
from konlpy.tag import Twitter

class SVM(APIView):

    def get(self, request, format=None):

        print(request.query_params)
        input_str = request.query_params.get('chat', None)

        if not input_str:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        pos_tagger_type =  request.query_params.get('pos_tagger', None)
        pos_tags = self._pos_tagger(input_str, pos_tagger_type)

        if pos_tags is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        print(pos_tags)
        responseData = {
        'status': True,
        'data': {
            'input': input_str,
            'pos_list': pos_tags,
            'pos_tagger' : 'mecab'
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
