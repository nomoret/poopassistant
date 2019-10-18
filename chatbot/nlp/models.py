from django.db import models
from chatbot.users import models as user_model
from django.contrib.humanize.templatetags.humanize import naturaltime

class TimeStampModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Intent(TimeStampModel):

    """ Intent Model """

    name = models.CharField(max_length=128, blank=True)
    description = models.CharField(max_length=128, blank=True)
    creator = models.ForeignKey(user_model.User, on_delete=models.PROTECT, null=True)

    @property
    def modified_time(self):
        return naturaltime(self.updated_at)

    @property
    def examples_count(self):
        return self.examples.count()

    def __str__(self):
        return self.name

class Example(TimeStampModel):

    """ Example Model """

    example = models.TextField()
    creator = models.ForeignKey(user_model.User, on_delete=models.PROTECT, null=True)
    intent = models.ForeignKey(Intent, on_delete=models.CASCADE, null=True, related_name='examples')

    @property
    def modified_time(self):
        return naturaltime(self.updated_at)
        
    def __str__(self):
        return self.example

class Entity(TimeStampModel):

    """ Entity Model """

    name = models.CharField(max_length=128, blank=True)  
    creator = models.ForeignKey(user_model.User, on_delete=models.PROTECT, null=True)

    @property
    def modified_time(self):
        return naturaltime(self.updated_at)

    def __str__(self):
        return self.name

class EntityValue(TimeStampModel):

    """ Entity Value Model """

    ENTITY_CHOICE = {
        ("synonyms", "Synonyms"),
        ("patterns", "Patterns"),
        ("not-specified", "Not-specified")
    }

    entity_value_name = models.CharField(max_length=128, blank=False)
    entity_type = models.CharField(max_length=80, choices=ENTITY_CHOICE, null=True)
    creator = models.ForeignKey(user_model.User, on_delete=models.PROTECT, null=True)    
    entity = models.ForeignKey(Entity, on_delete=models.CASCADE, null=True, related_name='entitiy_values')

    def __str__(self):
        return self.entity_value_name

class Synonym(TimeStampModel):

    """ Synonym Model """
    text = models.CharField(max_length=128, blank=True)
    creator = models.ForeignKey(user_model.User, on_delete=models.PROTECT, null=True)
    entity_synonym = models.ForeignKey(EntityValue, on_delete=models.CASCADE, null=True, related_name='entity_synonym')

    def __str__(self):
        return self.text

from treebeard.al_tree import AL_Node

class Node(AL_Node):
    parent = models.ForeignKey('self',
                               related_name='children_set',
                               on_delete=models.CASCADE,
                               null=True,
                               db_index=True)
    sib_order = models.PositiveIntegerField(null=True)
    title = models.CharField(max_length=255)
    desc = models.CharField(max_length=255)
    message = models.ForeignKey(Intent, on_delete=models.PROTECT, null=True, blank=True)

    @property
    def depth(self):
        return self.get_depth()

    def __str__(self):
        return 'Node - {0} : {1}'.format(self.title, self.desc)
    
    
class Response(TimeStampModel):

    """ Response Model """

    example = models.TextField()
    creator = models.ForeignKey(user_model.User, on_delete=models.PROTECT, null=True)
    node = models.ForeignKey(Node, on_delete=models.CASCADE, null=True, related_name='responses')
    
    @property
    def modified_time(self):
        return naturaltime(self.updated_at)
        
    def __str__(self):
        return self.example

class NodeSorted(AL_Node):
    parent = models.ForeignKey('self',
                               related_name='children_set',
                               on_delete=models.CASCADE,
                               null=True,
                               db_index=True)
    node_order_by = ['val1', 'val2', 'desc']
    val1 = models.IntegerField()
    val2 = models.IntegerField()
    desc = models.CharField(max_length=255)