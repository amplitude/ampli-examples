// lib/amplitude-user-id.ts
export function amplitudeUserId(accountId: string): string {
  if (!accountId.trim()) throw new Error('An account ID is required');
  return `user-${accountId}`;
}
