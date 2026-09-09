import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, LayoutTemplate, Download, Palette, Layers, Sparkles } from 'lucide-react';

const FEATURES = [
  { icon: Smartphone, title: 'Real device frames', text: 'iPhone 6.7", 6.5", 5.5" and Google Play sizes with pixel-exact output.' },
  { icon: LayoutTemplate, title: 'Designer templates', text: 'Start from curated looks — 3D tilted, dark, colorful or minimal.' },
  { icon: Palette, title: 'Backgrounds & fonts', text: 'Solid colors, rich gradients and five display typefaces.' },
  { icon: Layers, title: 'Multi-slide stories', text: 'Build the full set side by side. Duplicate, reorder, delete.' },
  { icon: Download, title: 'One-click export', text: 'PNG or JPEG at the exact resolution each store expects.' },
  { icon: Sparkles, title: 'No design skills', text: 'Upload screenshots, tweak the words, ship in minutes.' },
];

export default function Features() {
  return (
    <section id="features" className="relative py-28 px-6 bg-[#FAFAFC] overflow-hidden">
      {/* soft ambient wash */}
      <div className="absolute -top-24 right-0 w-[460px] h-[460px] rounded-full bg-violet-400/15 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-10 w-[420px] h-[420px] rounded-full bg-pink-400/15 blur-[120px] pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold">Why Shotox</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-[-0.02em] text-[#0B0B12] mt-5 leading-[1.05]">From raw screenshot to <span className="shotox-gradient-text">store-ready</span> in minutes</h2>
          <p className="mt-4 text-[#0B0B12]/55 text-base">Everything you need to design, customize and export App Store &amp; Google Play screenshots — without opening Photoshop.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="group relative rounded-3xl bg-white border border-black/[0.06] p-7 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-[0_24px_70px_-24px_rgba(124,58,237,0.35)]"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 grid place-items-center text-white mb-5 shadow-lg shadow-violet-500/25 group-hover:scale-110 group-hover:-rotate-3 transition-transform">
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