import React from 'react';
import { motion } from 'framer-motion';
import { CloudUpload, SlidersHorizontal, Download } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const STEPS = [
  {
    icon: CloudUpload,
    n: '01',
    title: 'Upload your screenshot',
    text: 'Drop in a raw app screenshot or grab one with our screen-capture tool. We auto-fit it into a pixel-perfect device frame — no manual resizing.',
  },
  {
    icon: SlidersHorizontal,
    n: '02',
    title: 'Customize the look',
    text: 'Pick from 100+ designer templates, then tweak colors, fonts, layouts and backgrounds. Let AI draft high-converting headlines for every slide.',
  },
  {
    icon: Download,
    n: '03',
    title: 'Export & ship',
    text: 'Download store-ready PNGs at the exact resolution each store expects — iPhone, iPad, Android and the Google Play feature graphic.',
  },
];

export default function HowItWorks() {
  const reduce = usePrefersReducedMotion();
  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#0B0B12] text-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-violet-600/20 blur-[140px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-medium text-pink-400 mb-3">How it works</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">From screenshot to store in three steps</h2>
          <p className="mt-4 text-white/55 leading-relaxed">No design skills, no Photoshop, no friction — just a clean path from raw screenshot to store-ready artwork.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative rounded-3xl p-7 bg-white/[0.04] border border-white/10 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl grid place-items-center bg-gradient-to-br from-violet-600 to-pink-600 shadow-[0_18px_40px_-12px_rgba(236,72,153,0.5)]">
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <span className="font-display text-3xl font-bold text-white/15">{s.n}</span>
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}