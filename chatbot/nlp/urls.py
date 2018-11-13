from django.urls import path
from .views import (
    svm_view,
    # test_view
)

app_name = "nlp"
urlpatterns = [
    path("api/v1/svm", view=svm_view, name="svm"),
    # path("api/v1/test", view=test_view, name="test")
]