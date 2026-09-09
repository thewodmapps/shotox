import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TEMPLATES, TEMPLATE_TAGS, CATEGORIES } from '@/lib/templates';
import ScaledSlide from '@/components/editor/ScaledSlide';

export default function TemplateGallery({ onCreate, creating }) {
  const [cat, setCat] = useState('All');
  const [tag, setTag] = useState('All');
  const list = TEMPLATES.filter(
    (t) => (cat === 'All' || t.category === cat) && (tag === 'All' || t.tags.includes(tag))
  );

  const Pill = ({ active, onClick, children }) => (
    <button onClick={onClick} className={`px-3.5 h-8 rounded-full text-xs font-medium border whitespace-nowrap transition-colors ${active ? 'bg-[#0B0B12] text-white border-[#0B0B12]' : 'bg-white border-black/10 text-[#0B0B12]/70 hover:border-black/30'}`}>{children}</button>
  );

  return (
    <section>
      <h2 className="font-display text-xl font-bold text-[#0B0B12] mb-3">Templates</h2>
      <div className="space-y-2 mb-5">
        <div className="flex flex-wrap gap-2">
          <span className="text-[11px] text-[#0B0B12]/40 self-center mr-1">Category</span>
          {CATEGORIES.map((c) => <Pill key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Pill>)}
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-[11px] text-[#0B0B12]/40 self-center mr-1">Style</span>
          {TEMPLATE_TAGS.map((t) => <Pill key={t} active={tag === t} onClick={() => setTag(t)}>{t}</Pill>)}
          <button onClick={() => onCreate({ templateId: 'editorial', platform: 'ios', scratch: true })} disabled={!!creating} className="ml-auto inline-flex items-center gap-1.5 px-3.5 h-8 rounded-full text-xs font-medium bg-[#0B0B12] text-white hover:bg-[#0B0B12]/85">
            <Plus className="w-3.5 h-3.5" /> Start from scratch
          </button>
        </div>
      </div>
      {list.length === 0 ? (
        <p className="text-sm text-[#0B0B12]/50 rounded-2xl border border-dashed border-black/10 p-6 text-center">No templates match this filter — try another category or style.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((tpl) => (
            <button key={tpl.id} disabled={!!creating} onClick={() => onCreate({ templateId: tpl.id, platform: 'ios' })} className="text-left rounded-2xl overflow-hidden border border-black/5 bg-white hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] hover:-translate-y-1 transition-all disabled:opacity-60">
              <div className="flex gap-1.5 p-2.5 bg-[#0B0B12]">
                {tpl.slides.map((s) => (
                  <div key={s.id} className="flex-1 aspect-[1290/2796] relative overflow-hidden rounded-lg"><ScaledSlide slide={s} /></div>
                ))}
              </div>
              <div className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-[#0B0B12]">{tpl.name}</span>
                  <span className="text-[11px] text-violet-600 font-medium">{tpl.category}</span>
                </div>
                <div className="text-xs text-[#0B0B12]/50 mt-0.5">{tpl.tags.join(' · ')}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}