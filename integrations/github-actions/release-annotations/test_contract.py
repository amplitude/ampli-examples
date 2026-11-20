"""Exercise the exact workflow shell against a local HTTP fixture, never Amplitude."""
import base64
import datetime
import http.server
import json
import os
from pathlib import Path
import subprocess
import tempfile
import threading

ROOT = Path(__file__).resolve().parent
workflow = json.loads(subprocess.check_output([
    "ruby", "-rpsych", "-rjson", "-e",
    "puts JSON.generate(Psych.load_file(ARGV[0]))", str(ROOT / "annotate-release.yml")
]))
script = workflow["jobs"]["annotate"]["steps"][0]["run"]
requests = []
reply_status = 200
reply_body = None


class Handler(http.server.BaseHTTPRequestHandler):
    def do_POST(self):
        body = json.loads(self.rfile.read(int(self.headers["Content-Length"])))
        requests.append({"path": self.path, "payload": body, "auth": self.headers["Authorization"]})
        response = reply_body
        if response is None:
            response = json.dumps({"success": True, "release": {
                "id": "fixture-release", "version": body["version"],
                "release_start": body["release_start"], "chart_visibility": True}})
        self.send_response(reply_status)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(response.encode())

    def log_message(self, *args):
        pass


server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), Handler)
thread = threading.Thread(target=server.serve_forever, daemon=True)
thread.start()
results = []
try:
    with tempfile.TemporaryDirectory() as td:
        root = Path(td)
        (root / "curl").write_text('''#!/usr/bin/env python3
import os, sys
args = sys.argv[1:]
hosts = {"https://amplitude.com/api/2/release": "US", "https://analytics.eu.amplitude.com/api/2/release": "EU"}
assert sum(a in hosts for a in args) == 1
assert "--retry" not in args
assert args[args.index("--connect-timeout") + 1] == "5"
assert args[args.index("--max-time") + 1] == "15"
if os.environ.get("FIXTURE_TRANSPORT_ERROR"):
    sys.exit(28)
args = [(os.environ["FIXTURE_ORIGIN"] + "/" + hosts[a]) if a in hosts else a for a in args]
os.execv("/usr/bin/curl", ["curl"] + args)
''')
        (root / "curl").chmod(0o755)
        env = dict(os.environ, PATH=td + os.pathsep + os.environ["PATH"],
                   AMPLITUDE_API_KEY="synthetic-api-key", AMPLITUDE_SECRET_KEY="synthetic-secret-key",
                   AMPLITUDE_SERVER_ZONE="US", DEPLOY_SHA="a" * 40,
                   DEPLOY_RUN_URL="https://github.com/example/repo/actions/runs/123",
                   DEPLOY_REPOSITORY='example/quote"repo\n$(touch SHOULD_NOT_EXIST)',
                   FIXTURE_ORIGIN=f"http://127.0.0.1:{server.server_port}", TMPDIR=td)

        def case(name, expected_success, overrides=None, status=200, body=None):
            global reply_status, reply_body
            reply_status, reply_body = status, body
            requests.clear()
            run = subprocess.run(["bash", "-c", script], env=env | (overrides or {}),
                                 cwd=td, capture_output=True, text=True, timeout=20)
            assert (run.returncode == 0) == expected_success, (name, run.returncode, run.stderr)
            assert "synthetic-api-key" not in run.stdout + run.stderr
            assert "synthetic-secret-key" not in run.stdout + run.stderr
            assert not (root / "SHOULD_NOT_EXIST").exists()
            assert sorted(p.name for p in root.iterdir()) == ["curl"], "response temp file leaked"
            if expected_success:
                assert len(requests) == 1
                req = requests[0]
                assert req["path"] == "/" + (overrides or {}).get("AMPLITUDE_SERVER_ZONE", "US")
                assert req["auth"] == "Basic " + base64.b64encode(b"synthetic-api-key:synthetic-secret-key").decode()
                assert req["payload"]["version"] == "a" * 40
                assert req["payload"]["chart_visibility"] == "true"
                assert req["payload"]["description"].startswith(env["DEPLOY_REPOSITORY"])
                timestamp = datetime.datetime.strptime(req["payload"]["release_start"], "%Y-%m-%d %H:%M:%S")
                assert abs((datetime.datetime.now(datetime.timezone.utc).replace(tzinfo=None) - timestamp).total_seconds()) < 5
                assert json.loads(run.stdout)["id"] == "fixture-release"
            if name in ("missing API key", "missing secret key", "invalid zone", "transport timeout"):
                assert not requests
            else:
                assert len(requests) == 1, "unexpected request count/retry"
            results.append({"case": name, "passed": True, "requests": len(requests)})

        case("US success and JSON-safe metadata", True)
        case("EU success", True, {"AMPLITUDE_SERVER_ZONE": "EU"})
        case("missing API key", False, {"AMPLITUDE_API_KEY": ""})
        case("missing secret key", False, {"AMPLITUDE_SECRET_KEY": ""})
        case("invalid zone", False, {"AMPLITUDE_SERVER_ZONE": "elsewhere"})
        case("HTTP 400", False, status=400, body='{"success":false}')
        case("HTTP 401", False, status=401, body='{"error":"unauthorized"}')
        case("HTTP 500", False, status=500, body='server error')
        case("application rejection", False, body='{"success":false}')
        case("malformed JSON", False, body='not JSON')
        case("missing release ID", False, body='{"success":true,"release":{}}')
        case("transport timeout", False, {"FIXTURE_TRANSPORT_ERROR": "1"})
finally:
    server.shutdown()
    server.server_close()

print(json.dumps({"scope": "Exact workflow shell; local HTTP fixture, not Amplitude or hosted GitHub Actions",
                  "results": results}, indent=2))
