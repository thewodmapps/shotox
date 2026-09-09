import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Apple, Play, Tablet } from 'lucide-react';
import { getTemplate, getDevice } from '@/lib/templates';
import { useAuth } from '@/lib/AuthContext';
import FeaturedTemplateCard from './FeaturedTemplateCard';
import TemplateMarquee from './TemplateMarquee';

// Curated, high-impact set: light + bold + dark-neon + vibrant across four
// device form factors and four categories — the most conversion-representative
// looks in the library. Each `glow` is a vivid accent tuned to read on dark.
const SHOW = [
  { id: 'lotus', device: 'iphone-6.7', label: 'iPhone 6.7"', icon: Apple, category: 'Health', glow: '#FDBA74' },
  { id: 'sprint', device: 'android-phone', label: 'Google Play', icon: Play, category: 'Productivity', glow: '#F97316' },
  { id: 'galaxy', device: 'ipad-11', label: 'iPad 11"', icon: Tablet, category: 'Social', glow: '#A855F7' },
  { id: 'magnolia', device: 'android-tab-10', label: 'Android Tablet', icon: Tablet, category: 'Beauty', glow: '#EC4899' },
];

export default function TemplateShowcase() {
  const { isAuthenticated } = useAuth();
  const dest = isAuthenticated ? '/projects' : `/login?returnTo=${encodeURIComponent('/projects')}`;
  return (
    <section id="templates" className="py-24 px-6 bg-[#0B0B12] text-white relative overflow-hidden scroll-mt-24">
      <div className="absolute -top-40 -left-24 w-[520px] h-[520px] rounded-full bg-violet-600/30 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-24 w-[520px] h-[520px] rounded-full bg-pink-500/25 blur-[140px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <p className="text-sm font-medium text-pink-400 mb-3">Templates</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">Pick a look. <span className="shotox-gradient-text">Make it yours.</span></h2>
            <p className="mt-3 text-white/55 max-w-md">100 designer templates across iPhone, iPad and Android — every device, every category.</p>
          </div>
          <Link to={dest} className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:gap-3 transition-all whitespace-nowrap">
            Browse all templates <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {SHOW.map((s, idx) => (
            <FeaturedTemplateCard
              key={s.id}
              template={getTemplate(s.id)}
              device={getDevice(s.device)}
              label={s.label}
              Icon={s.icon}
              category={s.category}
              glow={s.glow}
              to={dest}
              index={idx}
            />
          ))}
        </div>
        <TemplateMarquee />
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