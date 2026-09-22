import React from 'react';

export default function SectionHeading({ eyebrow, title, subtitle, dark = false, align = 'left', className = '' }) {
  const isCenter = align === 'center';
  return (
    <div className={`${isCenter ? 'text-center mx-auto' : ''} max-w-2xl ${className}`}>
      {eyebrow && (
        <p className={`text-sm font-medium mb-3 ${dark ? 'text-pink-400' : 'text-violet-600'}`}>{eyebrow}</p>
      )}
      <h2 className={`font-display text-4xl sm:text-5xl font-bold tracking-tight ${dark ? 'text-white' : 'text-[#0B0B12]'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${dark ? 'text-white/60' : 'text-[#0B0B12]/60'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}