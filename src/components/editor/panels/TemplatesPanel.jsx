import React from 'react';
import { TEMPLATES, makeId } from '@/lib/templates';
import SlideCanvas from '@/components/editor/SlideCanvas';

export default function TemplatesPanel({ project, updateProject }) {
  const apply = (tpl) => {
    const slides = tpl.slides.map((s, i) => ({
      ...s,
      id: makeId(),
      screenshotUrl: project.slides[i]?.screenshotUrl || '',
    }));
    updateProject({ slides, template_id: tpl.id });
  };
  return (
    <div className="space-y-3">
      <p className="text-xs text-white/50">Applying a template keeps your uploaded screenshots.</p>
      {TEMPLATES.map((tpl) => (
        <button
          key={tpl.id}
          onClick={() => apply(tpl)}
          className={`w-full text-left rounded-xl overflow-hidden border transition-all hover:scale-[1.02] ${
            project.template_id === tpl.id ? 'border-violet-400 ring-2 ring-violet-400/40' : 'border-white/10 hover:border-white/30'
          }`}
        >
          <div className="flex gap-1 p-1.5 bg-black/40">
            {tpl.slides.map((s) => (
              <SlideCanvas key={s.id} slide={s} deviceId="iphone-6.7" width={78} className="rounded-md overflow-hidden" />
            ))}
          </div>
          <div className="px-3 py-2 text-xs font-medium text-white/80 bg-white/5">{tpl.name}</div>
        </button>
      ))}
    </div>
  );
}