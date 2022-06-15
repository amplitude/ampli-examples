from threading import RLock
from typing import Optional

from amplitude import EventPlugin, PluginType, BaseEvent


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
