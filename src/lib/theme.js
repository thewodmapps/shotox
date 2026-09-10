// System dark-mode support with an optional user override persisted in localStorage.
// Applies the existing `.dark` class on <html> based on prefers-color-scheme, unless
// the user has chosen an explicit mode. Keeps today's light look when the system is light.

const STORAGE_KEY = 'shotox-theme';

const systemPrefersDark = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

export const getThemeMode = () => {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage ? localStorage.getItem(STORAGE_KEY) : null;
  if (stored === 'light' || stored === 'dark') return stored;
  return systemPrefersDark() ? 'dark' : 'light';
};

export const applyTheme = (mode) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (mode === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
};

// Persist an explicit user choice ('light' | 'dark'); pass null/undefined to clear it
// and follow the system again.
export const setThemeOverride = (mode) => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  if (mode === 'light' || mode === 'dark') localStorage.setItem(STORAGE_KEY, mode);
  else localStorage.removeItem(STORAGE_KEY);
  applyTheme(getThemeMode());
};

// Apply on startup and react to system theme changes when no explicit override is set.
export const initTheme = () => {
  applyTheme(getThemeMode());
  if (typeof window === 'undefined' || !window.matchMedia) return;
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== 'light' && stored !== 'dark') applyTheme(systemPrefersDark() ? 'dark' : 'light');
  };
  if (mq.addEventListener) mq.addEventListener('change', handler);
  else if (mq.addListener) mq.addListener(handler);
};