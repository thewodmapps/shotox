import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScaledSlide from '@/components/editor/ScaledSlide';

// One large featured card whose hero slide auto-cycles through the template's
// full slide set with a soft crossfade — showing visitors that every template
// ships a complete, multi-slide store-ready set.
export default function FeaturedTemplateCard({ template, device, label, Icon, category, interval = 2800 }) {
  const [i, setI] = useState(0);
  const total = template.slides.length;

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % total), interval);
    return () => clearInterval(t);
  }, [total, interval]);

  const slide = template.slides[i];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] group-hover:border-violet-400/50 group-hover:-translate-y-1.5 transition-all duration-300 shadow-[0_30px_80px_-40px_rgba(124,58,237,0.5)]">
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: `${device.w} / ${device.h}` }}>
          <AnimatePresence>
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <ScaledSlide slide={slide} device={device} />
            </motion.div>
          </AnimatePresence>
          <div className="absolute top-2.5 right-2.5 z-10 flex gap-1">
            {template.slides.map((_, idx) => (
              <span
                key={idx}
                className={`h-1 rounded-full transition-all duration-300 ${idx === i ? 'w-4 bg-white' : 'w-1.5 bg-white/35'}`}
              />
            ))}
          </div>
        </div>
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="min-w-0">
            <span className="font-display font-semibold text-white block truncate">{template.name}</span>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-white/50 mt-0.5 whitespace-nowrap">
              <Icon className="w-3 h-3 shrink-0" /> {label}
            </span>
          </div>
          <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-400/30 whitespace-nowrap">{category}</span>
        </div>
      </div>
    </motion.div>
  );
}