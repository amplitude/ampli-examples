export const ACCOUNT_KEY = 'build-campaign-account-v1';

export function readAccount(storage) {
  const saved = storage.getItem(ACCOUNT_KEY);
  if (!saved) return null;
  const account = JSON.parse(saved);
  if (!/^campaign-user-[0-9a-f-]{36}$/.test(account.userId)
    || !['starter', 'pro'].includes(account.plan) || !Number.isFinite(account.createdAt)) {
    throw Error('Invalid saved demo account.');
  }
  return account;
}

export function createAccount(storage, plan, uuid = () => crypto.randomUUID()) {
  const existing = readAccount(storage);
  if (existing) return { account: existing, created: false };
  if (!['starter', 'pro'].includes(plan)) throw Error('Choose a valid demo plan.');
  const account = { userId: `campaign-user-${uuid()}`, plan, createdAt: Date.now() };
  storage.setItem(ACCOUNT_KEY, JSON.stringify(account));
  return { account, created: true };
}
