from django.urls import path
from .views import (
    svm_view,
    intents_view,
    intent_detail_view,
    intent_add_examples_view,
    example_view,
    entities_view,
    entity_detail_view,
    entity_add_values_view,
    entity_value_detail_view
)

app_name = "nlp"
urlpatterns = [
    path("api/v1/svm", view=svm_view, name="svm"),
    path("intents", view=intents_view, name="intents"),
    path("intents/<int:intent_id>", view=intent_detail_view, name="intent_detail"),    
    path("intents/<int:intent_id>/examples", view=intent_add_examples_view, name="intent_add_examples"),
    path("examples/<int:example_id>", view=example_view, name="examples"),
    path("entities", view=entities_view, name="entities"),
    path("entities/<int:entity_id>", view=entity_detail_view, name="entity_detail"),
    path("entities/<int:entity_id>/values", view=entity_add_values_view, name="entity_add_values"),
    path("values/<int:entity_value_id>", view=entity_value_detail_view, name="entity_value_detail"),
]