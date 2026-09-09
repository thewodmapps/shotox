import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Smartphone, Tablet, Play } from 'lucide-react';
import { TEMPLATES, getDevice } from '@/lib/templates';
import ScaledSlide from '@/components/editor/ScaledSlide';

const SHOW = [
  { tpl: 'aurora', device: 'iphone-6.7' },
  { tpl: 'ocean', device: 'android-phone' },
  { tpl: 'editorial', device: 'ipad-13' },
  { tpl: 'mint', device: 'android-tab-10' },
];

const deviceMeta = (id) => {
  const d = getDevice(id);
  const Icon = d.form === 'tablet' ? Tablet : d.platform === 'android' ? Play : Smartphone;
  const label = d.platform === 'android' ? (d.form === 'tablet' ? 'Android Tablet' : 'Android') : (d.form === 'tablet' ? 'iPad' : 'iPhone');
  return { d, Icon, label };
};

export default function TemplateShowcase() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-medium text-violet-600 mb-3">Templates</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#0B0B12]">Pick a look. Make it yours.</h2>
            <p className="text-[#0B0B12]/55 mt-3 max-w-md">Every template adapts to iPhone, iPad, Android phone & tablet — and Google Play feature graphics.</p>
          </div>
          <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0B0B12] hover:gap-3 transition-all">
            Browse all templates <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {SHOW.map(({ tpl, device }, i) => {
            const t = TEMPLATES.find((x) => x.id === tpl);
            const { d, Icon, label } = deviceMeta(device);
            return (
              <motion.div key={t.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}>
                <Link to="/projects" className="group block rounded-3xl overflow-hidden border border-black/5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)] hover:shadow-[0_40px_100px_-30px_rgba(124,58,237,0.35)] hover:-translate-y-1.5 transition-all duration-300">
                  <div className="relative flex gap-1.5 p-3 bg-[#0B0B12]">
                    {t.slides.map((s) => (
                      <div key={s.id} className="flex-1 min-w-0 relative overflow-hidden rounded-lg" style={{ aspectRatio: `${d.w} / ${d.h}` }}>
                        <ScaledSlide slide={s} device={d} />
                      </div>
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B12]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                      <span className="px-5 py-2.5 rounded-full bg-white text-[#0B0B12] text-sm font-semibold">Use this template</span>
                    </div>
                  </div>
                  <div className="px-5 py-4 flex items-center justify-between bg-white">
                    <div>
                      <span className="font-display font-semibold text-[#0B0B12]">{t.name}</span>
                      <span className="ml-2 text-[11px] text-violet-600 font-medium">{t.category}</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#0B0B12]/55"><Icon className="w-3.5 h-3.5" /> {label}</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}