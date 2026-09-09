import React from 'react';
import { Star, Sparkles, ArrowRight } from 'lucide-react';
import DeviceFrame from '@/components/editor/DeviceFrame';

export const CATEGORY_STYLE = {
  AI: { accent: '#4B2C70', dark: false },
  Beauty: { accent: '#6b3fa0', dark: false },
  Finance: { accent: '#D4E157', dark: true },
  Food: { accent: '#4C8C5A', dark: false },
  Travel: { accent: '#F97316', dark: false },
  Fitness: { accent: '#DC2626', dark: false },
  Education: { accent: '#1D4ED8', dark: false },
  Social: { accent: '#0F0524', dark: false },
  Entertainment: { accent: '#A52B75', dark: false },
  Games: { accent: '#6D28D9', dark: false },
  Health: { accent: '#0E7490', dark: false },
  Productivity: { accent: '#1E1B4B', dark: false },
};

const AWARD_BY_CAT = {
  AI: "Editor's Choice", Beauty: "Users' Choice #1", Finance: 'App of the Year', Food: 'Top Rated',
  Travel: "Editor's Choice", Fitness: 'App of the Year', Education: 'Top Rated', Social: "Editor's Choice",
  Entertainment: 'Top Rated', Games: 'App of the Year', Health: "Editor's Choice", Productivity: 'Top Rated',
};
const BRANDS_BY_CAT = {
  AI: ['Forbes', 'Wired', 'TechCrunch'], Beauty: ['GQ', 'Elle', 'Vogue'], Finance: ['Forbes', 'Economist', 'NYT'],
  Food: ['Eater', 'BuzzFeed', 'Vice'], Travel: ['Condé Nast', 'Travel+Leisure'], Fitness: ["Men's Health", "Runner's World"],
  Education: ['The Verge', 'EdSurge'], Social: ['Mashable', 'Wired'], Entertainment: ['Variety', 'Rolling Stone'],
  Games: ['IGN', 'Polygon'], Health: ['Self', 'Well+Good'], Productivity: ['The Verge', 'Product Hunt'],
};
const BRAND_BY_CAT = {
  AI: 'noora.', Beauty: 'Zyluxe.', Finance: 'CrypTix.', Food: 'feasto.', Travel: 'wander.',
  Fitness: 'pulse.', Education: 'lume.', Social: 'orbit.', Entertainment: 'Streamio.', Games: 'play.', Health: 'calm.', Productivity: 'aurora.',
};

const Stars = ({ className = '' }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`w-3 h-3 fill-current ${className}`} />
    ))}
  </div>
);

function MockStack({ dark }) {
  const phones = [
    { rot: -8, y: 4, w: 110, z: 10, m: '' },
    { rot: 2, y: -12, w: 118, z: 20, m: '-ml-[50px]' },
    { rot: 9, y: 8, w: 110, z: 10, m: '-ml-[60px]' },
  ];
  return (
    <div className="relative h-[300px] flex items-end justify-center">
      <div
        className="absolute w-56 h-56 rounded-full blur-2xl opacity-40"
        style={{ background: dark ? 'rgba(11,11,18,0.12)' : 'rgba(255,255,255,0.28)' }}
      />
      <div className="relative flex items-end">
        {phones.map((p, i) => (
          <div
            key={i}
            style={{ transform: `rotate(${p.rot}deg) translateY(${p.y}px)`, width: p.w, zIndex: p.z }}
            className={`relative ${p.m} drop-shadow-[0_26px_32px_rgba(0,0,0,0.45)]`}
          >
            <DeviceFrame width={p.w} form="phone" platform="ios" style={dark ? 'white' : 'black'} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TemplateBlock({ template, onOpen, ctaLabel = 'Use this template', className = '' }) {
  const style = CATEGORY_STYLE[template.category] || { accent: '#1E1B4B', dark: false };
  const slide = template.slides[0];
  const text = style.dark ? 'text-[#0B0B12]' : 'text-white';
  const sub = style.dark ? 'text-[#0B0B12]/70' : 'text-white/75';
  const chipBg = style.dark ? 'bg-[#0B0B12]/10' : 'bg-white/15';
  const star = style.dark ? 'text-[#0B0B12]' : 'text-amber-300';
  const award = AWARD_BY_CAT[template.category] || "Editor's Choice";
  const brands = BRANDS_BY_CAT[template.category] || [];
  const brand = BRAND_BY_CAT[template.category] || 'zubilo.';

  return (
    <div
      className={`group relative overflow-hidden rounded-[28px] p-6 sm:p-9 transition-transform duration-300 hover:-translate-y-1 ${className}`}
      style={{ background: style.accent }}
    >
      {/* decorative squiggle */}
      <svg className="absolute -right-8 top-4 w-44 h-44 opacity-25 pointer-events-none" viewBox="0 0 200 200" fill="none" stroke={style.dark ? '#0B0B12' : '#fff'} strokeWidth="3">
        <path d="M10 110 C 60 30, 120 170, 195 70" strokeLinecap="round" />
      </svg>
      <Sparkles className={`absolute right-6 bottom-6 w-8 h-8 opacity-30 ${text}`} />

      <div className="relative grid sm:grid-cols-2 gap-6 items-center">
        <div className="min-w-0">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold ${chipBg} ${text}`}>
            <Sparkles className="w-3 h-3" /> {award}
          </span>
          <h3 className={`mt-4 font-display font-bold tracking-tight text-3xl sm:text-[2.5rem] leading-[1.02] ${text}`}>{slide.heading}</h3>
          <p className={`mt-3 text-base ${sub} max-w-md`}>{slide.subheading}</p>

          <div className={`mt-5 inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full ${chipBg} ${text}`}>
            <Stars className={star} />
            <span className="text-xs font-semibold">4.8 · App Store rating</span>
          </div>

          {brands.length > 0 && (
            <p className={`mt-4 text-[11px] uppercase tracking-[0.15em] ${sub}`}>As seen in {brands.join(' · ')}</p>
          )}

          <div className="mt-6 flex items-center gap-4">
            {onOpen && (
              <button
                onClick={onOpen}
                className={`inline-flex items-center gap-1.5 rounded-full px-5 h-10 text-sm font-semibold transition-all group-hover:gap-2.5 ${style.dark ? 'bg-[#0B0B12] text-white' : 'bg-white text-[#0B0B12]'}`}
              >
                {ctaLabel} <ArrowRight className="w-4 h-4" />
              </button>
            )}
            <span className={`font-display font-bold text-lg ${text}`}>{brand}</span>
          </div>
        </div>

        <div className="relative">
          <MockStack dark={style.dark} />
        </div>
      </div>
    </div>
  );
}