import json
import re
from pathlib import Path
p=Path(__file__).resolve().parents[1]/'Package.resolved'
d=json.loads(p.read_text())
pins=d.get('pins',d.get('object',{}).get('pins',[]))
assert pins, 'Missing dependency pins'
for pin in pins:
    assert re.fullmatch('[0-9a-f]{40}',pin['state']['revision']), pin
unified=[x for x in pins if x.get('identity')=='amplitudeunified-swift']
assert len(unified)==1
assert unified[0]['state']['revision']=='a4ece539444213cc76fcac39b72ecc402b386eb6', 'Unified release commit drifted'
assert unified[0]['state']['version']=='0.0.4'
print(f'Validated {len(pins)} immutable package revisions, including Unified 0.0.4.')
