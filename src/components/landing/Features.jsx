import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, LayoutTemplate, Download, Palette, Layers, Wand2 } from 'lucide-react';
import SectionHeading from './SectionHeading';

const FEATURES = [
  { icon: Wand2, title: 'AI copywriting', text: 'AI writes high-converting headlines & subheadings tailored to your app category — never start from a blank page.', ai: true },
  { icon: Smartphone, title: 'Real device frames', text: 'iPhone 6.7", 6.5", 5.5" and Google Play sizes with pixel-exact output.' },
  { icon: LayoutTemplate, title: 'Designer templates', text: 'Start from curated looks — 3D tilted, dark, colorful or minimal.' },
  { icon: Palette, title: 'Backgrounds & fonts', text: 'Solid colors, rich gradients and five display typefaces.' },
  { icon: Layers, title: 'Multi-slide stories', text: 'Build the full set side by side. Duplicate, reorder, delete.' },
  { icon: Download, title: 'One-click export', text: 'PNG or JPEG at the exact resolution each store expects.' },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-[#FAFAFC]">
      <div className="max-w-6xl mx-auto">
        <SectionHeading align="center" eyebrow="Everything you need" title="From raw screenshot to store-ready in minutes" subtitle="Shotox pairs AI with designer-grade templates — describe your app and let AI draft the marketing copy, then fine-tune every detail and export pixel-perfect screenshots." className="mb-14" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }} className={`group rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 ${f.ai ? 'bg-gradient-to-br from-violet-600 to-pink-600 text-white border border-transparent shadow-[0_30px_70px_-25px_rgba(236,72,153,0.5)]' : 'bg-white border border-black/5 hover:shadow-[0_20px_60px_-20px_rgba(124,58,237,0.25)]'}`}>
              <div className="flex items-center justify-between mb-5">
                <div className={`w-11 h-11 rounded-2xl grid place-items-center group-hover:scale-110 transition-transform ${f.ai ? 'bg-white/15 text-white' : 'bg-gradient-to-br from-violet-500/10 to-pink-500/10 text-violet-600'}`}>
                  <f.icon className="w-5 h-5" />
                </div>
                {f.ai && <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/20 text-white tracking-wide">AI</span>}
              </div>
              <h3 className={`font-display font-semibold text-lg mb-2 ${f.ai ? 'text-white' : 'text-[#0B0B12]'}`}>{f.title}</h3>
              <p className={`text-sm leading-relaxed ${f.ai ? 'text-white/80' : 'text-[#0B0B12]/60'}`}>{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}