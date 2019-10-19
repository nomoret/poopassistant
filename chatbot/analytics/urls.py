from django.urls import path
from .views import (
    histories_view,
)

app_name = "analytics"
urlpatterns = [
    path("history", view=histories_view, name="conversation_history"),
]