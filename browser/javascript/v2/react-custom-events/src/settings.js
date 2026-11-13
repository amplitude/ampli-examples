export const storageKey = 'build-custom-events-settings-v1';
export const defaultSettings = { theme: 'light', digest: 'weekly' };

export function normalizeSettings(value) {
  if (!['light', 'dark'].includes(value?.theme)
    || !['daily', 'weekly'].includes(value?.digest)) {
    throw new Error('Choose a supported theme and digest frequency.');
  }
  return { theme: value.theme, digest: value.digest };
}

export function loadSettings(storage) {
  try {
    const value = storage.getItem(storageKey);
    return value ? normalizeSettings(JSON.parse(value)) : { ...defaultSettings };
  } catch {
    return { ...defaultSettings };
  }
}

export function createSettingsSaver({ persistSettings, trackSaved, pause }) {
  let saving = false;
  return async function saveSettings(value, { fail = false } = {}) {
    if (saving) return { status: 'busy' };
    saving = true;
    try {
      const settings = normalizeSettings(value);
      await pause();
      if (fail) throw new Error('Demo failure. Your saved preferences did not change.');
      await persistSettings(settings);
      try {
        trackSaved({
          settings_section: 'workspace',
          theme: settings.theme,
          digest_frequency: settings.digest,
          save_source: 'preferences_form',
        });
      } catch (error) {
        console.warn('Preferences saved; analytics could not be queued', error);
      }
      return { status: 'saved', settings };
    } finally {
      saving = false;
    }
  };
}
