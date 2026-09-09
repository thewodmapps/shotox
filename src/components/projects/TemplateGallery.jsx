import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TEMPLATES, TEMPLATE_TAGS, CATEGORIES } from '@/lib/templates';
import TemplateBlock from '@/components/landing/TemplateBlock';

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
      <div className="space-y-2 mb-6">
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
        <div className="grid gap-6 lg:grid-cols-2">
          {list.map((tpl) => (
            <TemplateBlock
              key={tpl.id}
              template={tpl}
              ctaLabel="Use template"
              onOpen={() => onCreate({ templateId: tpl.id, platform: 'ios' })}
            />
          ))}
        </div>
      )}
    </section>
  );
}