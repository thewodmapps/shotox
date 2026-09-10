import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, LayoutTemplate, Download, Palette, Layers, Wand2 } from 'lucide-react';

const FEATURES = [
  { icon: Wand2, title: 'AI copywriting', text: 'Generate marketing-focused screenshot copy and refine it to match your app.', ai: true },
  { icon: Smartphone, title: 'Real device frames', text: 'Show your app inside realistic iPhone, iPad, and Android device frames.' },
  { icon: LayoutTemplate, title: 'Designer templates', text: 'Start with professionally designed layouts instead of designing from a blank canvas.' },
  { icon: Palette, title: 'Backgrounds & fonts', text: 'Customize colors, typography, backgrounds, and visual styling.' },
  { icon: Layers, title: 'Multi-slide stories', text: "Create complete screenshot sets that tell your app's story across multiple slides." },
  { icon: Download, title: 'One-click export', text: 'Export polished PNG or JPEG screenshots at store-ready dimensions.' },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-[#FAFAFC]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#0B0B12]">Everything you need</h2>
          <p className="mt-3 text-xl font-display font-medium text-[#0B0B12]/80">From raw screenshot to store-ready in minutes</p>
          <p className="mt-4 text-[#0B0B12]/60 leading-relaxed">Shotox combines designer-ready templates, real device frames, AI-powered copy, and exact store sizes so you can create polished App Store and Google Play screenshots without starting from scratch.</p>
        </div>
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