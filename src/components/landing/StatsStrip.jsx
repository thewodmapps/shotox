import React from 'react';
import { motion } from 'framer-motion';

const STATS = [
  { value: '100+', label: 'Designer templates' },
  { value: '8', label: 'Store-ready device sizes' },
  { value: 'PNG / JPEG', label: 'Pixel-perfect export' },
  { value: '2 min', label: 'Upload to download' },
];

export default function StatsStrip() {
  return (
    <section className="relative bg-[#0B0B12] text-white px-6 py-12 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-24 w-[700px] h-[300px] rounded-full bg-violet-600/15 blur-[120px] pointer-events-none" />
      <div className="relative max-w-5xl mx-auto">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-white/35 mb-8">Built for makers shipping to the App Store &amp; Google Play</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl bg-white/[0.06] overflow-hidden border border-white/10">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-[#0B0B12] px-4 py-7 text-center"
            >
              <div className="font-display text-2xl md:text-3xl font-bold tracking-tight shotox-gradient-text">{s.value}</div>
              <div className="mt-1.5 text-[11px] uppercase tracking-wider text-white/45">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}