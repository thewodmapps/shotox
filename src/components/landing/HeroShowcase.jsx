import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Zap, Sparkles } from 'lucide-react';
import { getTemplate, getDevice } from '@/lib/templates';
import SlideCanvas from '@/components/editor/SlideCanvas';

// Fixed design canvas. The composition is authored once at this size and scaled
// uniformly via CSS transform so it renders identically on every viewport —
// phone, tablet, and desktop — with no reflow or collision.
const DESIGN_W = 1024;
const DESIGN_H = 580;

// Organic, overlapping stack of phone mockups across brand-aligned templates.
const ITEMS = [
  { id: 'magnolia', device: 'android-phone', slide: 0, w: 180, x: '2%',  y: '54%', rot: -10, z: 10, delay: 0,   float: 12 },
  { id: 'aura',     device: 'iphone-6.7',    slide: 1, w: 196, x: '17%', y: '12%', rot: -5,  z: 20, delay: 0.4, float: 16 },
  { id: 'royale',   device: 'ipad-11',      slide: 2, w: 240, x: '31%', y: '50%', rot: 4,   z: 30, delay: 0.8, float: 14 },
  { id: 'halo',     device: 'iphone-6.7',    slide: 0, w: 204, x: '51%', y: '8%',  rot: 7,   z: 25, delay: 1.2, float: 18 },
  { id: 'drift',    device: 'android-tab-10', slide: 3, w: 228, x: '63%', y: '48%', rot: 11,  z: 15, delay: 1.6, float: 13 },
  { id: 'sprint',   device: 'android-phone', slide: 1, w: 172, x: '83%', y: '18%', rot: -7,  z: 8,  delay: 2.0, float: 15 },
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

// Floating glass callout bubbles — positioned at fixed design coordinates so
// they scale uniformly with the mockups across every viewport.
const BUBBLES = [
  { left: 6,   top: 34,  delay: 0.5, icon: 'phone',    text: 'Store-ready sizes for every device', tint: 'text-violet-300' },
  { left: 742, top: 132, delay: 1.2, icon: 'zap',      text: 'Pixel-perfect PNG & JPEG export',    tint: 'text-lime-300' },
  { left: 44,  top: 520, delay: 2.0, icon: 'sparkles', text: '100 designer templates',              tint: 'text-pink-300' },
];

const BubbleIcon = ({ icon, tint }) => {
  const Cmp = icon === 'phone' ? Smartphone : icon === 'zap' ? Zap : Sparkles;
  return <Cmp className={`w-4 h-4 ${tint}`} />;
};

export default function HeroShowcase() {
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / DESIGN_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full max-w-[720px] mx-auto overflow-hidden" style={{ height: DESIGN_H * scale }}>
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})` }}
      >
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

        {/* Floating callout bubbles */}
        {BUBBLES.map((b, i) => (
          <motion.div
            key={`b-${i}`}
            className="absolute z-50"
            style={{ left: b.left, top: b.top }}
            animate={{ y: [0, -14, 0], rotate: [0, 4, 0] }}
            transition={{ duration: 6, delay: b.delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="glass-card"><BubbleIcon icon={b.icon} tint={b.tint} /> {b.text}</div>
          </motion.div>
        ))}

        {/* Overlapping mockups */}
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