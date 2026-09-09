import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Zap, Sparkles, Scissors } from 'lucide-react';
import { getTemplate, getDevice } from '@/lib/templates';
import SlideCanvas from '@/components/editor/SlideCanvas';

// The "explosion": a fan of six phone mockups bursting outward from a central
// pivot at varied 3D rotations, each with its own neon glow halo. Three glass
// tags float around the cluster.
const PHONES = [
  { id: 'aura', slide: 0, w: 120, cx: 80, cy: 270, rot: -34, glow: '#8B5CF6' },
  { id: 'golden', slide: 2, w: 130, cx: 175, cy: 220, rot: -16, glow: '#F97316' },
  { id: 'magnolia', slide: 6, w: 140, cx: 280, cy: 190, rot: 0, glow: '#EC4899' },
  { id: 'drift', slide: 1, w: 130, cx: 385, cy: 220, rot: 16, glow: '#22D3EE' },
  { id: 'onyx', slide: 3, w: 120, cx: 480, cy: 270, rot: 34, glow: '#A3E635' },
  { id: 'spark', slide: 4, w: 112, cx: 280, cy: 360, rot: 6, glow: '#F59E0B' },
];

const Tag = ({ className, icon: Icon, children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.6, duration: 0.5 }}
    className={`absolute z-20 flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium text-white glass-card ${className}`}
  >
    {Icon && <Icon className="w-3.5 h-3.5" />}
    {children}
  </motion.div>
);

export default function HeroExplosion() {
  const device = getDevice('iphone-6.7');
  return (
    <div className="relative w-full max-w-[560px] mx-auto h-[440px] sm:h-[540px] scale-[0.7] sm:scale-90 lg:scale-100">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[540px]">
        {PHONES.map((p, i) => {
          const slide = getTemplate(p.id).slides[p.slide] || getTemplate(p.id).slides[0];
          return (
            <motion.div
              key={p.id}
              className="absolute z-10"
              style={{ left: p.cx, top: p.cy, rotate: p.rot }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
              transition={{ opacity: { delay: 0.2 + i * 0.08, duration: 0.5 }, scale: { delay: 0.2 + i * 0.08, duration: 0.5 }, y: { duration: 6, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' } }}
            >
              <div className="relative -translate-x-1/2 -translate-y-1/2">
                <div className="absolute -inset-5 rounded-[2.2rem] blur-2xl" style={{ background: `${p.glow}33` }} />
                <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/15" style={{ boxShadow: `0 0 0 1px ${p.glow}55, 0 26px 50px -14px ${p.glow}66` }}>
                  <SlideCanvas slide={slide} device={device} width={p.w} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Tag className="left-0 top-10" icon={Smartphone}>Store-ready sizes for every device</Tag>
      <Tag className="right-0 top-16" icon={Zap}>Pixel-perfect PNG &amp; JPEG export</Tag>
      <Tag className="right-2 bottom-6" icon={Scissors}>100 designer templates</Tag>
    </div>
  );
}