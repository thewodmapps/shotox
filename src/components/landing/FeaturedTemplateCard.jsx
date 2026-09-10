import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ScaledSlide from '@/components/editor/ScaledSlide';

// A large, clickable featured card. Each template's slides auto-cycle with a
// soft crossfade; an ambient color glow bleeds behind it, and hovering tilts
// the card in 3D and reveals a "Use this template" prompt.
export default function FeaturedTemplateCard({ template, device, label, Icon, category, glow, to, index = 0, interval = 2800 }) {
  const [i, setI] = useState(0);
  const total = template.slides.length;

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % total), interval);
    return () => clearInterval(t);
  }, [total, interval]);

  const slide = template.slides[i];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        whileHover={{ rotateX: 7, rotateY: -9, y: -10 }}
        transition={{ type: 'spring', stiffness: 200, damping: 16 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="group relative h-full"
      >
        {/* ambient color glow */}
        <div
          className="absolute -inset-2.5 rounded-[28px] blur-2xl opacity-45 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(62% 58% at 50% 38%, ${glow}, transparent 70%)` }}
        />
        <Link
          to={to}
          className="relative block rounded-3xl overflow-hidden border border-white/10 bg-white/[0.04] group-hover:border-white/30 transition-colors duration-300 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.85)] backdrop-blur-sm"
        >
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
                <span key={idx} className={`h-1 rounded-full transition-all duration-300 ${idx === i ? 'w-4 bg-white' : 'w-1.5 bg-white/35'}`} />
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-center pb-4 pt-16 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white px-3.5 py-2 rounded-full bg-white/15 border border-white/35 backdrop-blur-md shadow-lg">
                Use this template <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="min-w-0">
              <span className="font-display font-semibold text-white block truncate">{template.name}</span>
              <span className="inline-flex items-center gap-1.5 text-sm text-white/50 mt-0.5 whitespace-nowrap">
                <Icon className="w-3 h-3 shrink-0" /> {label}
              </span>
            </div>
            <span className="text-sm font-medium px-2 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-400/30 whitespace-nowrap">{category}</span>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}