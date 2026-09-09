import React from 'react';
import { Star, Sparkles } from 'lucide-react';
import DeviceFrame from '@/components/editor/DeviceFrame';

const lum = (hex) => {
  const c = (hex || '#000000').replace('#', '');
  const r = parseInt(c.substr(0, 2), 16) / 255;
  const g = parseInt(c.substr(2, 2), 16) / 255;
  const b = parseInt(c.substr(4, 2), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const brandOf = (tpl) => {
  const bg = tpl.slides[0]?.bg || {};
  return bg.from || bg.color || '#7C3AED';
};

const TESTIMONIALS = [
  { q: 'Super easy to use and the results look genuinely premium.', a: '— Sarah' },
  { q: 'Designed my whole store page in under ten minutes.', a: '— David' },
];

export default function TemplateShowcaseCard({ template: tpl, onClick, disabled }) {
  const brand = brandOf(tpl);
  const light = lum(brand) > 0.62;
  const text = light ? '#0B0B12' : '#FFFFFF';
  const sub = light ? 'rgba(11,11,18,0.62)' : 'rgba(255,255,255,0.72)';
  const faint = light ? 'rgba(11,11,18,0.14)' : 'rgba(255,255,255,0.16)';
  const panels = tpl.slides.slice(0, 3);

  return (
    <div
      onClick={disabled ? undefined : onClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      className={`group relative rounded-[28px] overflow-hidden shadow-[0_40px_90px_-50px_rgba(0,0,0,0.55)] transition-transform duration-300 ${disabled ? 'opacity-60' : 'cursor-pointer hover:-translate-y-1.5'}`}
      style={{ background: brand }}
    >
      <div className="absolute top-5 right-6 z-10 pointer-events-none">
        <Sparkles className="w-4 h-4" style={{ color: faint }} />
      </div>
      <div className="flex items-stretch overflow-x-auto snap-x">
        {/* Panel 1 — branding */}
        <div className="w-[230px] sm:w-[270px] shrink-0 snap-start p-7 flex flex-col justify-between relative" style={{ borderRight: `1px solid ${faint}` }}>
          <svg className="absolute -bottom-6 -left-6 w-44 h-44 opacity-30 pointer-events-none" viewBox="0 0 200 200" fill="none">
            <path d="M10 120 C 60 10, 120 10, 190 120" stroke={text} strokeWidth="3" strokeLinecap="round" />
            <path d="M10 150 C 60 40, 120 40, 190 150" stroke={text} strokeWidth="3" strokeLinecap="round" />
          </svg>
          <div className="relative">
            <span className="inline-flex items-center gap-2 font-display text-xl font-bold tracking-tight" style={{ color: text }}>
              <span className="w-6 h-6 rounded-md grid place-items-center" style={{ background: text, color: brand }}>{tpl.name[0]}</span>
              {tpl.name}.
            </span>
          </div>
          <div className="relative">
            <h3 className="font-display text-2xl sm:text-3xl font-bold leading-[1.05]" style={{ color: text }}>{tpl.slides[0].heading}</h3>
            <p className="mt-2.5 text-sm leading-relaxed max-w-[18rem]" style={{ color: sub }}>{tpl.slides[0].subheading}</p>
          </div>
          <div className="relative">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] mb-2" style={{ color: sub }}>As featured in</div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold" style={{ color: sub }}>GQ · Forbes · ELLE · Vogue</div>
          </div>
        </div>

        {/* Panels 2–4 — tilted device mockups */}
        {panels.map((s, i) => (
          <div key={s.id} className="flex-1 min-w-[150px] snap-start p-5 flex flex-col relative" style={{ borderRight: i < panels.length - 1 ? `1px solid ${faint}` : 'none' }}>
            <p className="text-[13px] font-semibold leading-snug max-w-[12rem]" style={{ color: text }}>{s.heading}</p>
            <div className="mt-auto flex justify-center pt-6">
              <div style={{ transform: `rotate(${i % 2 ? 7 : -7}deg)` }} className="transition-transform duration-300 group-hover:rotate-0">
                <DeviceFrame url={s.screenshotUrl} style={s.deviceStyle} width={128} form="phone" platform="ios" />
              </div>
            </div>
          </div>
        ))}

        {/* Panel 5 — rating & testimonials */}
        <div className="w-[230px] sm:w-[270px] shrink-0 snap-start p-7 flex flex-col justify-center gap-4 relative">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[0, 1, 2, 3, 4].map((k) => <Star key={k} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
            </div>
            <span className="text-sm font-bold" style={{ color: text }}>4.8</span>
          </div>
          <div className="flex flex-col gap-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={i}>
                <p className="text-[12px] leading-relaxed" style={{ color: sub }}>"{t.q}"</p>
                <p className="text-[11px] mt-1 font-medium" style={{ color: text }}>{t.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-1 inline-flex items-center gap-2 self-start rounded-full px-3 py-1.5 text-[11px] font-semibold" style={{ background: light ? 'rgba(11,11,18,0.08)' : 'rgba(255,255,255,0.12)', color: text }}>
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: text }} />
            4.8 Rating on app store
          </div>
        </div>
      </div>
    </div>
  );
}