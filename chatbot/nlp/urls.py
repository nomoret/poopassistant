from django.urls import path
from .views import (
    svm_view,
    list_all_intents_view,
    intent_detaile_view,
    # test_view
)

app_name = "nlp"
urlpatterns = [
    path("api/v1/svm", view=svm_view, name="svm"),
    path("<int:intent_id>/intent", view=intent_detaile_view, name="intent_detail"),
    path("intents", view=list_all_intents_view, name="intents"),
    # path("api/v1/test", view=test_view, name="test")
]