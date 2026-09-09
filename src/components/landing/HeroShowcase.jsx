import React from 'react';
import { motion } from 'framer-motion';
import { getTemplate, getDevice } from '@/lib/templates';
import SlideCanvas from '@/components/editor/SlideCanvas';

const ITEMS = [
  { id: 'royale', device: 'iphone-6.7', slide: 0, w: 150, rot: -8, y: 0, delay: 0 },
  { id: 'golden', device: 'android-phone', slide: 2, w: 162, rot: 6, y: -16, delay: 0.5 },
  { id: 'reverb', device: 'ipad-11', slide: 4, w: 150, rot: -4, y: 10, delay: 1 },
  { id: 'nightclub', device: 'android-tab-10', slide: 6, w: 142, rot: 8, y: -8, delay: 1.5 },
];

export default function HeroShowcase() {
  return (
    <div className="relative h-[300px] sm:h-[440px] w-full">
      <div className="absolute inset-0 flex items-end justify-center gap-2 sm:gap-4 scale-[0.6] sm:scale-90 lg:scale-100 origin-bottom">
        {ITEMS.map((it) => {
          const slide = getTemplate(it.id).slides[it.slide] || getTemplate(it.id).slides[0];
          const device = getDevice(it.device);
          return (
            <motion.div
              key={it.id}
              animate={{ y: [it.y, it.y - 12, it.y] }}
              transition={{ duration: 6, delay: it.delay, repeat: Infinity, ease: 'easeInOut' }}
              style={{ rotate: `${it.rot}deg` }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-b from-violet-500/30 to-pink-500/20 blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden">
                <SlideCanvas slide={slide} device={device} width={it.w} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}