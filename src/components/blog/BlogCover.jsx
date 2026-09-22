import React from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';

/**
 * AppLaunchpad-style cover graphic: solid color background, white grid overlay,
 * a cluster of floating rounded "app icon" tiles, the post title overlaid in
 * white, and a small brand mark.
 */
const TILES = ['A', 'F', 'PS', 'Ui', '<>', 'ASO', '★', '⚙', '◎', '✦'];

export default function BlogCover({ color = '#7C3AED', icon: Icon, title, coverUrl, className = '' }) {
  const gridId = `grid-${color.replace('#', '')}`;

  if (coverUrl) {
    return (
      <div className={`relative w-full aspect-[16/9] overflow-hidden ${className}`} style={{ background: color }}>
        <Image src={coverUrl} alt={title || ''} fittingType="fill" className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-md bg-white/95 flex items-center justify-center text-[11px] font-extrabold" style={{ color }}>S</div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="text-white font-display font-bold leading-tight text-lg sm:text-xl line-clamp-3 drop-shadow-sm">
            {title}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full aspect-[16/9] overflow-hidden ${className}`} style={{ background: color }}>
      {/* grid overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.13]" aria-hidden="true">
        <defs>
          <pattern id={gridId} width="26" height="26" patternUnits="userSpaceOnUse">
            <path d="M26 0H0V26" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${gridId})`} />
      </svg>

      {/* soft radial sheen */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 90% at 80% 0%, rgba(255,255,255,0.22), transparent 55%)' }} />

      {/* brand mark */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5">
        <div className="w-6 h-6 rounded-md bg-white/95 flex items-center justify-center text-[11px] font-extrabold" style={{ color }}>S</div>
      </div>

      {/* floating tile cluster */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <div className="relative w-[150px] h-[150px]">
          {[
            'top-0 right-6',
            'top-3 right-0',
            'top-1/2 -translate-y-1/2 right-[44%]',
            'bottom-3 right-0',
            'bottom-0 right-6',
            'bottom-2 right-[44%]',
          ].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} w-9 h-9 rounded-xl bg-white/95 shadow-lg flex items-center justify-center text-[10px] font-extrabold`}
              style={{ color }}
              animate={{ y: [0, i % 2 ? 5 : -5, 0] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {TILES[i % TILES.length]}
            </motion.div>
          ))}
          {Icon && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-white/95 shadow-xl flex items-center justify-center">
              <Icon className="w-7 h-7" style={{ color }} />
            </div>
          )}
        </div>
      </div>

      {/* title scrim + overlay */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 pr-[150px]">
        <div className="text-white font-display font-bold leading-tight text-lg sm:text-xl line-clamp-3 drop-shadow-sm">
          {title}
        </div>
      </div>
    </div>
  );
}