from django.urls import path
from . import views


urlpatterns = [
    path('eventnoproperties', views.track_event_no_properties, name='Track Event with no properties'),
    path('identify', views.set_user_property, name='Identify Event'),
    path('groupidentify', views.set_group_property, name='Group Identify Event'),
    path('setgroup', views.set_user_group, name='Set User Group'),
    path('flush', views.flush_events, name='Flush Events'),
    path('eventwithconsttypes', views.track_event_with_const_types, name='Track Event with const properties'),
    path('eventwithallproperties', views.track_event_with_all_properties, name='Track Event with all properties')
]
