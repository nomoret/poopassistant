from django.urls import path
from .views import (
    svm_view,
    list_all_intents_view,
    intent_detail_view,
    list_all_entities_view,
    entity_detail_view,
    # test_view
)

app_name = "nlp"
urlpatterns = [
    path("api/v1/svm", view=svm_view, name="svm"),
    path("<int:intent_id>/intent", view=intent_detail_view, name="intent_detail"),
    path("all/intents", view=list_all_intents_view, name="intents"),
    path("<int:entity_id>/entity", view=entity_detail_view, name="entity_detail"),
    path("all/entities", view=list_all_entities_view, name="entities"),
    # path("api/v1/test", view=test_view, name="test")
]