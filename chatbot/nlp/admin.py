from django.contrib import admin
from . import models

@admin.register(models.Intent)
class IntentAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'description',
        'creator',
        'created_at',
        'updated_at',
    )
    # examples size

@admin.register(models.Example)
class CommentAdmin(admin.ModelAdmin):
    list_display = (
        'example',
        'creator',
        'intent',
        'created_at',
        'updated_at',
    )