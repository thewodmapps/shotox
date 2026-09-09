import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getTemplate } from '@/lib/templates';
import TemplateBlock from '@/components/landing/TemplateBlock';

const FEATURED = ['neon', 'candy', 'midnight', 'coral', 'sunset', 'pulse', 'stream', 'aurora'];

export default function TemplateShowcase() {
  return (
    <section className="py-24 px-6 bg-[#0B0B12] text-white relative overflow-hidden">
      <div className="absolute -top-40 -left-24 w-[520px] h-[520px] rounded-full bg-violet-600/30 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-24 w-[520px] h-[520px] rounded-full bg-pink-500/25 blur-[140px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-medium text-pink-400 mb-3">Template gallery</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">Pick a look. Make it yours.</h2>
            <p className="mt-3 text-white/55 max-w-md">20 designer templates across iPhone, iPad, Tablet & Android — every device, every category.</p>
          </div>
          <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:gap-3 transition-all whitespace-nowrap">
            Browse all templates <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-6">
          {FEATURED.map((id, i) => (
            <motion.div key={id} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5, delay: (i % 2) * 0.05 }}>
              <TemplateBlock template={getTemplate(id)} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/projects" className="inline-flex items-center gap-2 rounded-full bg-white text-[#0B0B12] px-6 h-11 text-sm font-semibold hover:gap-3 transition-all">
            Explore all 20 templates <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/40">
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