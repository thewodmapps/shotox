import React from 'react';
import { motion } from 'framer-motion';
import { getTemplate, getDevice } from '@/lib/templates';
import SlideCanvas from '@/components/editor/SlideCanvas';

// Organic, overlapping stack of phone mockups across brand-aligned templates.
// Each item is positioned absolutely to create a free-form scattered layout
// rather than a rigid row.
const ITEMS = [
  { id: 'magnolia', device: 'android-phone', slide: 0, w: 128, x: '2%',  y: '56%', rot: -10, z: 10, delay: 0,   float: 10 },
  { id: 'aura',     device: 'iphone-6.7',    slide: 1, w: 138, x: '18%', y: '14%', rot: -5,  z: 20, delay: 0.4, float: 14 },
  { id: 'royale',   device: 'ipad-11',      slide: 2, w: 170, x: '32%', y: '52%', rot: 4,   z: 30, delay: 0.8, float: 12 },
  { id: 'halo',     device: 'iphone-6.7',    slide: 0, w: 144, x: '52%', y: '10%', rot: 7,   z: 25, delay: 1.2, float: 16 },
  { id: 'drift',    device: 'android-tab-10', slide: 3, w: 162, x: '64%', y: '50%', rot: 11,  z: 15, delay: 1.6, float: 11 },
  { id: 'sprint',   device: 'android-phone', slide: 1, w: 122, x: '84%', y: '20%', rot: -7,  z: 8,  delay: 2.0, float: 13 },
];

// Scattered confetti shapes — small translucent squares/rects in light tones.
const CONFETTI = [
  { x: '14%', y: '10%', s: 14, r: 18, c: 'bg-violet-400/40', delay: 0 },
  { x: '32%', y: '6%',  s: 9,  r: -12, c: 'bg-white/30', delay: 0.5 },
  { x: '52%', y: '8%',  s: 12, r: 25, c: 'bg-pink-400/35', delay: 1 },
  { x: '70%', y: '5%',  s: 7,  r: -8, c: 'bg-white/25', delay: 1.5 },
  { x: '88%', y: '12%', s: 11, r: 15, c: 'bg-orange-400/35', delay: 0.3 },
  { x: '18%', y: '82%', s: 10, r: -20, c: 'bg-white/25', delay: 0.7 },
  { x: '40%', y: '88%', s: 13, r: 10, c: 'bg-violet-400/35', delay: 1.2 },
  { x: '62%', y: '84%', s: 8,  r: -15, c: 'bg-pink-400/30', delay: 1.8 },
  { x: '82%', y: '78%', s: 12, r: 22, c: 'bg-white/20', delay: 0.9 },
  { x: '96%', y: '60%', s: 9,  r: -10, c: 'bg-orange-400/30', delay: 1.4 },
];

export default function HeroShowcase() {
  return (
    <div className="relative h-[320px] sm:h-[420px] w-full overflow-hidden">
      {/* Confetti */}
      {CONFETTI.map((c, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-sm ${c.c}`}
          style={{ left: c.x, top: c.y, width: c.s, height: c.s, rotate: `${c.r}deg` }}
          animate={{ y: [0, -10, 0], rotate: [c.r, c.r + 20, c.r] }}
          transition={{ duration: 5 + i, delay: c.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Overlapping mockups */}
      <div className="absolute inset-0">
        {ITEMS.map((it) => {
          const slide = getTemplate(it.id).slides[it.slide] || getTemplate(it.id).slides[0];
          const device = getDevice(it.device);
          return (
            <motion.div
              key={it.id}
              className="absolute"
              style={{ left: it.x, top: it.y, zIndex: it.z, rotate: `${it.rot}deg` }}
              animate={{ y: [0, -it.float, 0] }}
              transition={{ duration: 6, delay: it.delay, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-b from-violet-500/25 to-pink-500/15 blur-xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
                <SlideCanvas slide={slide} device={device} width={it.w} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}