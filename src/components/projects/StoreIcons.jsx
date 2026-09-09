import React from 'react';

// Official-style App Store + Google Play brand marks (rounded square icons).
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
      {/* "A" formed by three crossed brush strokes — the App Store mark */}
      <g stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M16 38 L29 10" />
        <path d="M32 38 L19 10" />
        <path d="M12 29 L36 29" />
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