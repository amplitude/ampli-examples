Keep agent instrumentation on the existing Node model-call boundary.
Preserve confirmed identity, consent, authentication, routes and enabled products.
Use a stable task ID across the task; close it only when the task ends.
The provider wrapper auto-tracks its user message and AI response; avoid duplicate manual events.
Use metadata_only and redactPii for this synthetic reference.
Keep provider keys in backend Secrets, never VITE_ variables or source files.
Await flush after closure, including errors, and test the actual host lifecycle.
Separate local wrapper tests from provider calls, ingestion and processed session checks.
Record conflicting sources and resolve affected claims before continuing.
