import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/**
 * Attention-grabbing cover: rich gradient mesh, floating app-icon tiles, the
 * post title overlaid in white, and a hover "Read article →" pill that nudges
 * the user to click.
 */
const TILES = ['A', 'F', 'PS', 'Ui', '<>', 'ASO', '★', '⚙', '◎', '✦'];

export default function BlogCover({ color = '#7C3AED', icon: Icon, title, className = '' }) {
  const gridId = `grid-${color.replace('#', '')}`;
  return (
    <div className={`relative w-full aspect-[16/9] overflow-hidden ${className}`} style={{ background: color }}>
      {/* rich gradient mesh — light sheen top-right, dark depth bottom-left */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(100% 75% at 100% 0%, rgba(255,255,255,0.28), transparent 52%), radial-gradient(85% 65% at 5% 100%, rgba(0,0,0,0.32), transparent 55%)' }}
      />

      {/* grid overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.10]" aria-hidden="true">
        <defs>
          <pattern id={gridId} width="26" height="26" patternUnits="userSpaceOnUse">
            <path d="M26 0H0V26" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${gridId})`} />
      </svg>

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
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/45 via-black/12 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 pr-[150px]">
        <h3 className="text-white font-display font-bold leading-tight text-lg sm:text-xl line-clamp-3 drop-shadow-sm">
          {title}
        </h3>
      </div>

      {/* hover CTA overlay — appears on group-hover (BlogCard wraps this in a `group` Link) */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/25 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#111827] font-semibold text-sm shadow-xl group-hover:scale-105 transition-transform duration-300">
          Read article
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}