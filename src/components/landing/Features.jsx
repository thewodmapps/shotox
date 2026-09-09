import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, LayoutTemplate, Download, Palette, Layers, Sparkles } from 'lucide-react';

const FEATURES = [
  { icon: Smartphone, title: 'Real device frames', text: 'iPhone 6.7", 6.5", 5.5" and Google Play sizes with pixel-exact output.' },
  { icon: LayoutTemplate, title: 'Designer templates', text: 'Start from curated looks — 3D tilted, dark, colorful or minimal.' },
  { icon: Palette, title: 'Backgrounds & fonts', text: 'Solid colors, rich gradients and five display typefaces.' },
  { icon: Layers, title: 'Multi-slide stories', text: 'Build the full set side by side. Duplicate, reorder, delete.' },
  { icon: Download, title: 'One-click export', text: 'PNG or JPEG at the exact resolution each store expects.' },
  { icon: Sparkles, title: 'AI copy writer', text: 'Describe your app — AI writes every slide headline for you.' },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-[#FAFAFC]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-medium text-violet-600 mb-3">Everything you need</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#0B0B12]">From raw screenshot to store-ready in minutes</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }} className="group rounded-3xl bg-white border border-black/5 p-7 hover:shadow-[0_20px_60px_-20px_rgba(124,58,237,0.25)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500/10 to-pink-500/10 grid place-items-center text-violet-600 mb-5 group-hover:scale-110 transition-transform">
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-lg text-[#0B0B12] mb-2">{f.title}</h3>
              <p className="text-sm text-[#0B0B12]/60 leading-relaxed">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}