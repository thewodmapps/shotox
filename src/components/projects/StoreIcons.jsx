import React from 'react';

// Colorful, recognizable App Store + Google Play brand marks (rounded square icons).
export function AppStoreIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <linearGradient id="as-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0A84FF" />
          <stop offset="1" stopColor="#0040DD" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="11" fill="url(#as-g)" />
      <g stroke="#fff" strokeWidth="3.4" strokeLinecap="round" fill="none">
        <path d="M18 37 L24 14" />
        <path d="M30 37 L24 14" />
        <path d="M14 28 L34 28" />
      </g>
    </svg>
  );
}

export function GooglePlayIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path d="M20 17 L36 24 L20 24 Z" fill="#4285F4" />
      <path d="M20 24 L36 24 L20 31 Z" fill="#34A853" />
      <path d="M12 12 L20 17 L20 24 L12 24 Z" fill="#EA4335" />
      <path d="M12 24 L20 24 L20 31 L12 36 Z" fill="#FBBC05" />
    </svg>
  );
}