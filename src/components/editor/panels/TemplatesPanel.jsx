import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { TEMPLATES, makeId, resolveDevice, CATEGORIES } from '@/lib/templates';
import { FREE_TEMPLATE_IDS } from '@/lib/entitlements';
import SlideCanvas from '@/components/editor/SlideCanvas';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const hexToRgb = (hex) => {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
};
const luminance = (hex) => {
  const { r, g, b } = hexToRgb(hex);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};
const textColorFor = (hex) => (luminance(hex) > 0.62 ? '#0B0B12' : '#FFFFFF');

const bgOf = (slide) => (slide.bg && slide.bg.color) || (slide.bg && slide.bg.from) || '#7C3AED';

export default function TemplatesPanel({ project, updateProject, isPro, onLocked }) {
  const apply = (tpl) => {
    const slides = tpl.slides.map((s, i) => ({
      ...s,
      id: makeId(),
      screenshotUrl: project.slides[i]?.screenshotUrl || '',
    }));
    updateProject({ slides, template_id: tpl.id });
  };

  const device = resolveDevice(project);
  const [cat, setCat] = useState('All');
  const list = cat === 'All' ? TEMPLATES : TEMPLATES.filter((t) => t.category === cat);
  return (
    <div className="space-y-3">
      <p className="text-sm text-white/60">Applying a template keeps your uploaded screenshots.</p>
      <Select value={cat} onValueChange={setCat}>
        <SelectTrigger className="bg-white/5 border-white/10 text-white h-11">
          <SelectValue placeholder="All categories" />
        </SelectTrigger>
        <SelectContent>
          {CATEGORIES.map((c) => (
            <SelectItem key={c} value={c}>{c === 'All' ? 'All categories' : c}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {list.map((tpl) => {
        const bg = bgOf(tpl.slides[0]);
        const fg = textColorFor(bg);
        const sub = `${fg === '#FFFFFF' ? 'rgba(255,255,255,0.78)' : 'rgba(11,11,18,0.65)'}`;
        const active = project.template_id === tpl.id;
        const locked = !isPro && !FREE_TEMPLATE_IDS.includes(tpl.id);
        return (
          <button
            key={tpl.id}
            onClick={() => (locked ? onLocked?.() : apply(tpl))}
            style={{ background: bg, color: fg }}
            className={`group block w-full text-left rounded-2xl overflow-hidden transition-all ${
              active ? 'ring-2 ring-white/70 ring-offset-2 ring-offset-[#111118]' : 'ring-1 ring-black/5'
            } ${locked ? 'opacity-80' : 'hover:-translate-y-0.5 hover:shadow-2xl'}`}
          >
            <div className="p-4 relative">
              {locked && (
                <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-black/55 text-white backdrop-blur-sm">
                  <Lock className="w-3 h-3" /> Pro
                </span>
              )}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-lg leading-tight tracking-tight truncate">{tpl.name}</h3>
                  <p className="text-sm mt-0.5 truncate" style={{ color: sub }}>
                    {tpl.slides[0].subheading}
                  </p>
                </div>
                <span
                  className="shrink-0 text-sm font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{ background: fg === '#FFFFFF' ? 'rgba(255,255,255,0.18)' : 'rgba(11,11,18,0.12)' }}
                >
                  {tpl.category}
                </span>
              </div>

              <div className="flex gap-1.5 mt-3 overflow-x-auto pb-1 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {tpl.slides.map((s) => (
                  <SlideCanvas
                    key={s.id}
                    slide={s}
                    device={device}
                    width={56}
                    className="rounded-md overflow-hidden shrink-0 shadow-lg shadow-black/20"
                  />
                ))}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}