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
engagement=[x for x in pins if x.get('identity')=='amplitude-engagement-swift']
assert len(engagement)==1
assert engagement[0]['state']=={'revision':'c48a608151e20853f8f0337f59d37e760fa21516','version':'4.2.0'}
assert len(pins)==11 and len({x['identity'] for x in pins})==11
print(f'Validated {len(pins)} package revisions, Unified 0.0.4 and engagement 4.2.0.')
