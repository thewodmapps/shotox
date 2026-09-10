import React from 'react';
import { motion } from 'framer-motion';

/**
 * AppLaunchpad-style cover graphic: solid color background,
 * white grid pattern overlay, floating rounded "app icon" tiles.
 */
const ICONS = ['A', 'PS', 'F', '✦', 'Ui', '<>', 'ASO', '★', '⚙', '◎'];

export default function BlogCover({ color = '#7C3AED', icon: Icon, title, className = '' }) {
  return (
    <div
      className={`relative w-full aspect-[16/9] overflow-hidden ${className}`}
      style={{ background: color }}
    >
      {/* grid overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.12]" aria-hidden="true">
        <defs>
          <pattern id={`grid-${color.replace('#', '')}`} width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0H0V28" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${color.replace('#', '')})`} />
      </svg>

      {/* floating tiles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[58%] aspect-square max-w-[170px]">
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const positions = [
              'top-0 left-1/2 -translate-x-1/2',
              'top-1/4 right-0 -translate-y-1/2',
              'bottom-1/4 right-0 translate-y-1/2',
              'bottom-0 left-1/2 -translate-x-1/2',
              'bottom-1/4 left-0 translate-y-1/2',
              'top-1/4 left-0 -translate-y-1/2',
            ];
            return (
              <motion.div
                key={i}
                className={`absolute ${positions[i]} w-[34%] aspect-square rounded-xl bg-white/95 shadow-lg flex items-center justify-center text-[10px] font-bold`}
                style={{ color }}
                animate={{ y: [0, i % 2 ? 5 : -5, 0] }}
                transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                {ICONS[i % ICONS.length]}
              </motion.div>
            );
          })}
          {/* center icon */}
          {Icon && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[42%] aspect-square rounded-2xl bg-white/95 shadow-xl flex items-center justify-center">
                <Icon className="w-1/2 h-1/2" style={{ color }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* soft top sheen */}
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/15 to-transparent" />
    </div>
  );
}