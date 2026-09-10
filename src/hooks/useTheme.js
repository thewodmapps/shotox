import { useSyncExternalStore } from 'react';

const KEY = 'shotox-theme';

const readInitial = () => {
  if (typeof window === 'undefined') return 'light';
  return localStorage.getItem(KEY) || 'light';
};

let current = readInitial();
const listeners = new Set();

const apply = (t) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (t === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
};

apply(current);

const emit = () => listeners.forEach((l) => l(current));

export function setTheme(t) {
  current = t;
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEY, t);
    apply(t);
  }
  emit();
}

export function toggleTheme() {
  setTheme(current === 'dark' ? 'light' : 'dark');
}

export function useTheme() {
  const theme = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => current
  );
  return { theme, isDark: theme === 'dark', toggleTheme, setTheme };
}