import { Identify } from '@amplitude/unified';

export function preferenceValues(input) {
  if (!['starter', 'pro'].includes(input?.plan)
    || !['light', 'dark'].includes(input?.theme)) {
    throw new Error('Choose one of the listed plans and themes.');
  }
  return { plan: input.plan, theme: input.theme };
}

export function preferenceIdentify(input) {
  const { plan, theme } = preferenceValues(input);
  return new Identify()
    .set('plan', plan)
    .set('preferred_theme', theme)
    .setOnce('first_theme', theme)
    .add('preference_updates', 1);
}

export function clearedThemeIdentify() {
  return new Identify().unset('preferred_theme');
}
