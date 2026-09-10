import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export default function ThemeToggle({ className = '', size = 20, label = false }) {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={`inline-flex items-center justify-center gap-2 rounded-xl transition-colors ${className}`}
    >
      {isDark ? <Sun style={{ width: size, height: size }} /> : <Moon style={{ width: size, height: size }} />}
      {label && <span className="text-sm font-medium">{isDark ? 'Light' : 'Dark'}</span>}
    </button>
  );
}