import React from 'react';
import { motion } from 'framer-motion';

// Deterministic confetti so it renders identically on every load — multi-color
// small rects drifting + rotating slowly across the hero canvas.
const COLORS = ['#ffffff', '#f9a8d4', '#c084fc', '#fb923c', '#bef264', '#67e8f9'];
const BITS = Array.from({ length: 34 }, (_, i) => {
  const r = (n) => ((Math.sin(i * 9.7 + n) * 10000) % 1 + 1) % 1;
  return {
    left: `${r(1) * 100}%`,
    top: `${r(2) * 100}%`,
    size: 5 + Math.floor(r(3) * 8),
    color: COLORS[i % COLORS.length],
    rot: Math.floor(r(4) * 360),
    dur: 5 + r(5) * 5,
    delay: r(6) * 4,
  };
});

export default function HeroConfetti() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {BITS.map((b, i) => (
        <motion.span
          key={i}
          className="absolute block rounded-[1px]"
          style={{ left: b.left, top: b.top, width: b.size, height: b.size * 0.6, background: b.color, rotate: `${b.rot}deg`, opacity: 0.5 }}
          animate={{ y: [0, -16, 0], rotate: [b.rot, b.rot + 180, b.rot] }}
          transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}