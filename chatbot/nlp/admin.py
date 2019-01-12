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

@admin.register(models.Entity)
class EntityAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'creator',
        'created_at',
        'updated_at',
    )

@admin.register(models.EntityValue)
class EntityValueAdmin(admin.ModelAdmin):
    list_display = (
        'entity_value_name',
        'entity_type',
        'creator',
        'entity',
        'created_at',
        'updated_at',
    )

@admin.register(models.Synonym)
class SynonymAdmin(admin.ModelAdmin):
    list_display = (
        'text',
        'creator',
        'created_at',
        'updated_at',
        'entity_synonym',
    )