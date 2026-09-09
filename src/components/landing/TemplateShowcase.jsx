import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Apple, Play, Tablet } from 'lucide-react';
import { getTemplate, getDevice } from '@/lib/templates';
import ScaledSlide from '@/components/editor/ScaledSlide';

const SHOW = [
  { id: 'neon', device: 'iphone-6.7', label: 'iPhone 6.7"', icon: Apple, category: 'AI' },
  { id: 'sunset', device: 'android-phone', label: 'Google Play', icon: Play, category: 'Travel' },
  { id: 'pulse', device: 'ipad-11', label: 'iPad 11"', icon: Tablet, category: 'Fitness' },
  { id: 'galaxy', device: 'android-tab-10', label: 'Android Tablet', icon: Tablet, category: 'Social' },
];

export default function TemplateShowcase() {
  return (
    <section className="py-24 px-6 bg-[#0B0B12] text-white relative overflow-hidden">
      <div className="absolute -top-40 -left-24 w-[520px] h-[520px] rounded-full bg-violet-600/30 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-24 w-[520px] h-[520px] rounded-full bg-pink-500/25 blur-[140px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-medium text-pink-400 mb-3">Templates</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">Pick a look. Make it yours.</h2>
            <p className="mt-3 text-white/55 max-w-md">20 designer templates across iPhone, iPad and Android — every device, every category.</p>
          </div>
          <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:gap-3 transition-all whitespace-nowrap">
            Browse all templates <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SHOW.map((s, i) => {
            const tpl = getTemplate(s.id);
            const device = getDevice(s.device);
            const Icon = s.icon;
            return (
              <motion.div key={s.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}>
                <Link to="/projects" className="group block rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-violet-400/50 hover:-translate-y-1.5 transition-all duration-300 shadow-[0_30px_80px_-40px_rgba(124,58,237,0.5)]">
                  <div className="flex gap-1.5 p-3 bg-gradient-to-b from-white/[0.06] to-transparent">
                    {tpl.slides.map((sl) => (
                      <div key={sl.id} className="flex-1 min-w-0 aspect-[1290/2796] relative overflow-hidden rounded-lg ring-1 ring-white/10">
                        <ScaledSlide slide={sl} device={device} />
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-4 flex items-center justify-between">
                    <div className="min-w-0">
                      <span className="font-display font-semibold text-white block truncate">{tpl.name}</span>
                      <span className="inline-flex items-center gap-1.5 text-[11px] text-white/50 mt-0.5">
                        <Icon className="w-3 h-3" /> {s.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-400/30 whitespace-nowrap">{s.category}</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/40">
          <span>iPhone 6.7" / 6.5" / 5.5"</span><span className="hidden sm:inline">•</span>
          <span>iPad 13" / 11"</span><span className="hidden sm:inline">•</span>
          <span>Android Phone & Tablet</span><span className="hidden sm:inline">•</span>
          <span>Google Play Feature Graphic</span><span className="hidden sm:inline">•</span>
          <span>Custom sizes</span>
        </div>
      </div>
    </section>
  );
}