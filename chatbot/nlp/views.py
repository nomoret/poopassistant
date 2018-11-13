from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from konlpy.tag import Mecab

class SVM(APIView):

    def get(self, request, format=None):

        print(request.query_params)
        input_str = request.query_params.get('chat', None)

        if not input_str:
            return Response(status=status.HTTP_400_BAD_REQUEST)    

        pos_tags = self._pos_tagger(input_str)
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
            mecab = Mecab('/usr/local/lib64/mecab/dic/mecab-ko-dic')
            return mecab.pos(str(input))

svm_view = SVM.as_view()
