import React from 'react';
import { motion } from 'framer-motion';

const STATS = [
  { value: '100+', label: 'Designer templates' },
  { value: '8', label: 'Device sizes supported' },
  { value: 'PNG', label: '& JPEG store-ready export' },
  { value: '2 min', label: 'From upload to download' },
];

export default function StatsStrip() {
  return (
    <section className="relative bg-[#0B0B12] text-white py-10 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="text-center"
          >
            <div className="font-display text-3xl md:text-4xl font-bold tracking-tight shotox-gradient-text">{s.value}</div>
            <div className="mt-1 text-xs text-white/55">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}