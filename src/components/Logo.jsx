import React, { useId } from 'react';
import { Link } from 'react-router-dom';

export function Logo({ size = 30, className = '', rounded = 11 }) {
  const id = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
      role="img"
    >
      <defs>
        <linearGradient id={`zg-${id}`} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7C3AED" />
          <stop offset="0.5" stopColor="#EC4899" />
          <stop offset="1" stopColor="#F97316" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx={rounded} fill={`url(#zg-${id})`} />
      {/* layered S — two curves with an offset ghost suggesting stacked screenshots */}
      <path
        d="M29 12 C 29 9.5, 13 9.5, 13 15 C 13 19, 29 19, 29 23 C 29 28.5, 13 28.5, 13 26"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 13 C 28 10.5, 12 10.5, 12 16 C 12 20, 28 20, 28 24 C 28 29.5, 12 29.5, 12 27"
        stroke="white"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Brand({ to = '/', size = 30, withText = true, textClass = 'text-[#0B0B12]', className = '' }) {
  return (
    <Link to={to} className={`flex items-center gap-2 font-display font-bold tracking-tight ${className}`}>
      <Logo size={size} />
      {withText && <span className={textClass}>Shotox</span>}
    </Link>
  );
}

export default Logo;