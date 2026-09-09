import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { TEMPLATES } from '@/lib/templates';
import ScaledSlide from '@/components/editor/ScaledSlide';

export default function TemplateShowcase() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-medium text-violet-600 mb-3">Templates</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#0B0B12]">Pick a look. Make it yours.</h2>
          </div>
          <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0B0B12] hover:gap-3 transition-all">
            Browse all templates <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {TEMPLATES.slice(0, 4).map((tpl, i) => (
            <motion.div key={tpl.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}>
              <Link to="/projects" className="block rounded-3xl overflow-hidden border border-black/5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)] hover:-translate-y-1.5 transition-transform duration-300">
                <div className="flex gap-1.5 p-3 bg-[#0B0B12]">
                  {tpl.slides.map((s) => (
                    <div key={s.id} className="flex-1 min-w-0 aspect-[1290/2796] relative overflow-hidden rounded-lg">
                      <ScaledSlide slide={s} />
                    </div>
                  ))}
                </div>
                <div className="px-5 py-4 flex items-center justify-between bg-white">
                  <span className="font-display font-semibold text-[#0B0B12]">{tpl.name}</span>
                  <span className="text-xs text-[#0B0B12]/50">{tpl.tags.join(' · ')}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}