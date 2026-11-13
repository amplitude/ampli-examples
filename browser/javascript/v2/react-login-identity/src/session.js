export async function sessionRequest(path, body) {
  const response = await fetch(`/api/${path}`, body === undefined ? {
    credentials: 'same-origin', cache: 'no-store',
  } : {
    method: 'POST', credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error ?? 'Session request failed.');
  return result;
}
