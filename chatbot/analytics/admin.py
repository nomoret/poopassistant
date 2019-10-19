from django.contrib import admin
from . import models

# Register your models here.
@admin.register(models.History)
class HistoryAdmin(admin.ModelAdmin):
    list_display = (
        'intent',
        'accuary',
        'message',
        'response',
        'user',
        'time',
    )