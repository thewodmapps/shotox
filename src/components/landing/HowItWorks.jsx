import React from 'react';
import { motion } from 'framer-motion';
import { LayoutTemplate, CloudUpload, SlidersHorizontal, Download } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import SectionHeading from './SectionHeading';

const STEPS = [
  {
    icon: LayoutTemplate,
    n: '01',
    title: 'Choose your template',
    text: 'Start from 100+ designer templates across every category and device — 3D tilted, dark, vibrant or minimal.',
  },
  {
    icon: CloudUpload,
    n: '02',
    title: 'Upload your screenshot',
    text: 'Drop in a raw app screenshot. We auto-fit it into a pixel-perfect device frame — no manual resizing.',
  },
  {
    icon: SlidersHorizontal,
    n: '03',
    title: 'Customize the look',
    text: 'Tweak colors, fonts, layouts and backgrounds. Let AI draft high-converting headlines for every slide.',
  },
  {
    icon: Download,
    n: '04',
    title: 'Export & ship',
    text: 'Download store-ready PNGs at the exact resolution each store expects — iPhone, iPad, Android and the feature graphic.',
  },
];

export default function HowItWorks() {
  const reduce = usePrefersReducedMotion();
  return (
    <section id="how-it-works" className="py-24 px-6 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-violet-200/40 blur-[120px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative">
        <SectionHeading align="center" eyebrow="How it works" title="From screenshot to store in four steps" subtitle="No design skills, no Photoshop, no friction — just a clean path from raw screenshot to store-ready artwork." className="mb-16" />
        <div className="relative grid md:grid-cols-4 gap-10 md:gap-6">
          {/* connecting line on desktop */}
          <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent" />
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative text-center md:text-left"
            >
              <div className="relative inline-flex md:flex items-center justify-center mb-5">
                <div className="w-12 h-12 rounded-full grid place-items-center bg-white border border-violet-200 text-violet-600 shadow-[0_8px_24px_-12px_rgba(124,58,237,0.4)]">
                  <s.icon className="w-5 h-5" />
                </div>
                <span className="absolute -top-3 -right-3 md:relative md:top-auto md:right-auto md:ml-auto font-display text-xs font-bold text-white bg-violet-600 rounded-full px-2 py-0.5 md:hidden">{s.n}</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start mb-1.5">
                <span className="font-display text-xs font-bold text-violet-500 tracking-widest hidden md:inline">{s.n}</span>
                <h3 className="font-display font-semibold text-lg text-[#0B0B12]">{s.title}</h3>
              </div>
              <p className="text-sm text-[#0B0B12]/60 leading-relaxed max-w-[15rem] mx-auto md:mx-0">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}