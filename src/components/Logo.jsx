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
      {/* layered Z — top bar + diagonal + bottom bar, with an offset ghost suggesting stacked screenshots */}
      <path
        d="M13.5 12.5 H28"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M12 13.5 H27 L13 26.5 H28"
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
      {withText && <span className={textClass}>Zubilo</span>}
    </Link>
  );
}

export default Logo;