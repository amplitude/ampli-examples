from threading import RLock
from typing import Optional

from amplitude import EventPlugin, DestinationPlugin, PluginType, BaseEvent, \
    IdentifyEvent
from analytics import Client as SegmentClient


class MyEventIDPlugin(EventPlugin):

    def __init__(self):
        self.plugin_type = PluginType.ENRICHMENT
        self.current_id = 0
        self.lock = RLock()

    def execute(self, event: BaseEvent) -> Optional[BaseEvent]:
        with self.lock:
            event["event_id"] = self.current_id
            self.current_id += 1
        return event


class SegmentPlugin(DestinationPlugin):

    def __init__(self, write_key):
        self.plugin_type = PluginType.DESTINATION
        self.configuration = None
        self.segment = SegmentClient(write_key)

    def setup(self, client):
        self.configuration = client.configuration

    def execute(self, event: BaseEvent) -> None:
        if isinstance(event, IdentifyEvent):
            self.segment.identify(event.user_id, event.user_properties)
        elif isinstance(event, BaseEvent):
            self.segment.track(event.user_id, event.event_type, event.event_properties)
