import React, { useState } from 'react';
import { Plus, Lock } from 'lucide-react';
import { TEMPLATES, TEMPLATE_TAGS, CATEGORIES } from '@/lib/templates';
import { FREE_TEMPLATE_IDS } from '@/lib/entitlements';
import ScaledSlide from '@/components/editor/ScaledSlide';

export default function TemplateGallery({ onCreate, creating, isPro, onLocked }) {
  const [cat, setCat] = useState('All');
  const [tag, setTag] = useState('All');
  const list = TEMPLATES.filter(
    (t) => (cat === 'All' || t.category === cat) && (tag === 'All' || t.tags.includes(tag))
  );

  const Pill = ({ active, onClick, children }) => (
    <button onClick={onClick} className={`px-3.5 h-8 rounded-full text-sm font-medium border whitespace-nowrap transition-colors ${active ? 'bg-white text-[#0B0B12] border-white' : 'bg-white/[0.03] border-white/10 text-white/65 hover:border-white/25 hover:text-white'}`}>{children}</button>
  );

  return (
    <section id="templates-gallery">
      <h2 className="font-display text-xl font-bold text-white mb-4">Browse templates</h2>
      <div className="space-y-2 mb-5">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-white/60 mr-1">Category</span>
          {CATEGORIES.map((c) => <Pill key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Pill>)}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-white/60 mr-1">Style</span>
          {TEMPLATE_TAGS.map((t) => <Pill key={t} active={tag === t} onClick={() => setTag(t)}>{t}</Pill>)}
          <button onClick={() => onCreate({ templateId: 'editorial', platform: 'ios', scratch: true })} disabled={!!creating} className="ml-auto inline-flex items-center gap-1.5 px-3.5 h-8 rounded-full text-sm font-medium bg-white text-[#0B0B12] hover:opacity-90 transition-opacity">
            <Plus className="w-3.5 h-3.5" /> Start from scratch
          </button>
        </div>
      </div>
      {list.length === 0 ? (
        <p className="text-sm text-white/60 rounded-2xl border border-dashed border-white/15 p-6 text-center">No templates match this filter — try another category or style.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((tpl) => {
            const locked = !isPro && !FREE_TEMPLATE_IDS.includes(tpl.id);
            return (
            <button key={tpl.id} disabled={!!creating} onClick={() => (locked ? onLocked?.() : onCreate({ templateId: tpl.id, platform: 'ios' }))} className={`group relative text-left rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] transition-all disabled:opacity-60 ${locked ? 'opacity-70' : 'hover:border-white/25 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/10'}`}>
              {locked && (
                <div className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-black/60 border border-white/20 grid place-items-center">
                  <Lock className="w-3.5 h-3.5 text-white" />
                </div>
              )}
              <div className={`flex gap-1.5 p-2.5 bg-[#0B0B12] ${locked ? 'opacity-40' : ''}`}>
                {tpl.slides.slice(0, 4).map((s) => (
                  <div key={s.id} className="flex-1 aspect-[1290/2796] relative overflow-hidden rounded-lg"><ScaledSlide slide={s} /></div>
                ))}
              </div>
              <div className="px-4 py-3.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-white">{tpl.name}</span>
                  <span className="text-sm text-violet-300 font-medium">{locked ? 'Pro' : tpl.category}</span>
                </div>
                <div className="text-sm text-white/60 mt-0.5">{tpl.tags.join(' · ')}</div>
              </div>
            </button>
            );
          })}
        </div>
      )}
    </section>
  );
}