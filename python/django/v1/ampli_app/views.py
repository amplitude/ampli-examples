import logging
from dotenv import dotenv_values

from django.http import HttpResponse
from .ampli import *
from .plugins import SegmentPlugin, MyEventIDPlugin

envs = dotenv_values("ampli_app/.env")
api_key = envs['AMPLITUDE_API_KEY']
write_key = envs['SEGMENT_WRITE_KEY']
ampli.load(LoadOptions(client=LoadClientOptions(api_key)))

# add plugin
my_plugin = MyEventIDPlugin()
#segment_plugin = SegmentPlugin(write_key)
ampli.client.add(my_plugin)
#ampli.client.add(segment_plugin)

# remove plugin
ampli.client.remove(my_plugin)
#ampli.client.remove(segment_plugin)


# Create your views here.
def set_user_property(request):
    try:
        user_id = request.GET.get('user_id')
        required_number = request.GET.get('required_number')
        optional_array = request.GET.get('optional_array', '')
        if (user_id is None) or (required_number is None):
            return HttpResponse('user_id and required_number are required')
        event = Identify(float(required_number), optional_array.split(',') or None)
        ampli.identify(user_id=user_id,
                       event=event)
        return HttpResponse('Success')
    except Exception:
        logging.exception('Error parsing user properties input')
        return HttpResponse('Error parsing user properties input')


def set_group_property(request):
    try:
        group_type = request.GET.get('group_type')
        group_name = request.GET.get('group_name')
        required_boolean = request.GET.get('required_boolean')
        if (group_type is None) or (group_name is None) or (required_boolean is None):
            return HttpResponse('group_type, group_name and required_boolean is required')
        optional_string = request.GET.get('optional_string', None)
        event = Group(bool(required_boolean), optional_string)
        ampli.group_identify(group_type, group_name, event)
        return HttpResponse('Success')
    except Exception:
        logging.exception('Error parsing group properties input')
        return HttpResponse('Error parsing group properties input')


def set_user_group(request):
    try:
        user_id = request.GET.get('user_id')
        group_type = request.GET.get('group_type')
        group_name = request.GET.get('group_name')
        if (group_type is None) or (group_name is None) or (user_id is None):
            return HttpResponse('user_id, group_type and group_name are required')
        ampli.set_group(user_id, group_type, group_name.split(','))
        return HttpResponse('Success')
    except Exception:
        logging.exception('Error parsing input')
        return HttpResponse('Error parsing input')


def track_event_no_properties(request):
    try:
        user_id = request.GET.get('user_id')
        if not user_id:
            return HttpResponse('user_id is required')
        ampli.track(user_id, EventNoProperties())
        return HttpResponse('Success')
    except Exception:
        logging.exception('Error parsing input')
        return HttpResponse('Error parsing input')


def track_event_with_const_types(request):
    try:
        user_id = request.GET.get('user_id')
        if not user_id:
            return HttpResponse('user_id is required')
        ampli.event_with_const_types(user_id)
        return HttpResponse('Success')
    except Exception:
        logging.exception('Error parsing input')
        return HttpResponse('Error parsing input')


def flush_events(request):
    ampli.flush()


# TODO: Add a template to render a page, collect imformation and track a EventWithAllProperties
def track_event_with_all_properties(request):
    event = EventWithAllProperties(
        required_array=["a", "b"],
        required_boolean=False,
        required_enum=EventWithAllProperties.RequiredEnum.ENUM_1,
        required_number=16.4,
        required_integer=3,
        required_string="str"
    )
    ampli.track('user_id', event)
    return HttpResponse('Success')
