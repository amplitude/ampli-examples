"""Loopback-only SDK integration fixture. Never forward requests to Amplitude."""
import base64
import gzip
import json
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

lock = threading.Lock()
requests = []
events = []
release = threading.Event()

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *_): pass
    def reply(self, body, status=200):
        raw = json.dumps(body).encode()
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)
    def do_GET(self):
        if self.path.startswith('/test/requests'):
            with lock: result = list(requests)
            return self.reply(result)
        if self.path.startswith('/test/events'):
            with lock: result = list(events)
            return self.reply(result)
        if not self.path.startswith('/sdk/v2/vardata'):
            return self.reply({}, 404)
        encoded = self.headers.get('X-Amp-Exp-User', '')
        try: user = json.loads(base64.urlsafe_b64decode(encoded + '=' * (-len(encoded) % 4)))
        except Exception: return self.reply({}, 400)
        user_id = user.get('user_id') or ''
        with lock: requests.append({'user_id': user_id, 'device_id': user.get('device_id')})
        if user_id.startswith('delayed-'):
            if not release.wait(15): return self.reply({}, 504)
        if user_id.startswith('failed-'): return self.reply({}, 500)
        if user_id.startswith('control-'): value = 'control'
        elif user_id.startswith(('expanded-', 'delayed-')): value = 'expanded'
        elif user_id.startswith('unknown-'): value = 'not-a-supported-layout'
        else: return self.reply({})
        self.reply({'report-layout': {'value': value, 'key': value}})
    def do_POST(self):
        body = self.rfile.read(int(self.headers.get('Content-Length', '0')))
        if self.path == '/test/reset':
            with lock:
                requests.clear()
                events.clear()
            release.clear()
            return self.reply({'ok': True})
        if self.path == '/test/release':
            release.set()
            return self.reply({'ok': True})
        if self.path != '/2/httpapi': return self.reply({}, 404)
        if self.headers.get('Content-Encoding') == 'gzip': body = gzip.decompress(body)
        try: payload = json.loads(body)
        except Exception: return self.reply({}, 400)
        # Retain event data only. Never log or store the API-key envelope/header.
        with lock: events.extend(payload.get('events', []))
        self.reply({'code': 200, 'events_ingested': len(payload.get('events', [])),
                    'payload_size_bytes': len(body), 'server_upload_time': 0})

if __name__ == '__main__':
    ThreadingHTTPServer(('127.0.0.1', 28679), Handler).serve_forever()
