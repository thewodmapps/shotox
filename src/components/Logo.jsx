import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';

const LOGO_URL =
  'https://media.base44.com/images/public/6aa0ad9172db932d1d29336b/b3e63b968_shotox.png';

export function Logo({ size = 30, className = '', rounded = 11 }) {
  // `rounded` follows the original SVG viewBox scale (0–40) so the corner
  // radius scales proportionally with the rendered size.
  const radius = size * (rounded / 40);
  return (
    <Image
      src={LOGO_URL}
      alt="Shotox logo"
      fittingType="fill"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      style={{ width: size, height: size, borderRadius: radius }}
    />
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