import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TEMPLATES, TEMPLATE_TAGS } from '@/lib/templates';
import ScaledSlide from '@/components/editor/ScaledSlide';

export default function TemplateGallery({ onCreate, creating }) {
  const [tag, setTag] = useState('All');
  const list = tag === 'All' ? TEMPLATES : TEMPLATES.filter((t) => t.tags.includes(tag));
  return (
    <section>
      <h2 className="font-display text-xl font-bold text-[#0B0B12] mb-4">Templates</h2>
      <div className="flex flex-wrap gap-2 mb-5">
        {TEMPLATE_TAGS.map((t) => (
          <button key={t} onClick={() => setTag(t)} className={`px-3.5 h-8 rounded-full text-xs font-medium border transition-colors ${tag === t ? 'bg-[#0B0B12] text-white border-[#0B0B12]' : 'bg-white border-black/10 text-[#0B0B12]/70 hover:border-black/30'}`}>{t}</button>
        ))}
        <button onClick={() => onCreate('editorial', 'ios', true)} disabled={!!creating} className="ml-auto inline-flex items-center gap-1.5 px-3.5 h-8 rounded-full text-xs font-medium bg-[#0B0B12] text-white hover:bg-[#0B0B12]/85">
          <Plus className="w-3.5 h-3.5" /> Start from scratch
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {list.map((tpl) => (
          <button key={tpl.id} disabled={!!creating} onClick={() => onCreate(tpl.id, 'ios')} className="text-left rounded-2xl overflow-hidden border border-black/5 bg-white hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] hover:-translate-y-1 transition-all disabled:opacity-60">
            <div className="flex gap-1.5 p-2.5 bg-[#0B0B12]">
              {tpl.slides.map((s) => (
                <div key={s.id} className="flex-1 aspect-[1290/2796] relative overflow-hidden rounded-lg"><ScaledSlide slide={s} /></div>
              ))}
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="font-semibold text-sm text-[#0B0B12]">{tpl.name}</span>
              <span className="text-xs text-[#0B0B12]/50">{tpl.tags.join(' · ')}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}