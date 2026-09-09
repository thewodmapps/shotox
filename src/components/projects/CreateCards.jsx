import React from 'react';
import { Apple, Play, Loader2 } from 'lucide-react';
import { TEMPLATES } from '@/lib/templates';
import ScaledSlide from '@/components/editor/ScaledSlide';

const CARDS = [
  { platform: 'ios', title: 'App Store Screenshots', sub: 'iPhone 6.7", 6.5", 5.5"', icon: Apple, tpl: TEMPLATES[0] },
  { platform: 'android', title: 'Google Play Screenshots', sub: '1080 × 1920 phone', icon: Play, tpl: TEMPLATES[5] },
];

export default function CreateCards({ onCreate, creating }) {
  return (
    <section className="rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-violet-200 via-pink-200 to-orange-100">
      <h2 className="font-display text-2xl font-bold text-[#0B0B12] mb-5">Create a design</h2>
      <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
        {CARDS.map((c) => (
          <button key={c.platform} disabled={!!creating} onClick={() => onCreate(c.tpl.id, c.platform)} className="group text-left rounded-2xl bg-white/80 backdrop-blur border border-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden disabled:opacity-60">
            <div className="flex gap-1 p-2 bg-[#0B0B12]">
              {c.tpl.slides.map((s) => (
                <div key={s.id} className="flex-1 aspect-[1290/2796] relative overflow-hidden rounded-md"><ScaledSlide slide={s} /></div>
              ))}
            </div>
            <div className="p-4 flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-[#0B0B12] text-white grid place-items-center">
                {creating === c.platform ? <Loader2 className="w-4 h-4 animate-spin" /> : <c.icon className="w-4 h-4" />}
              </span>
              <div><div className="font-semibold text-[#0B0B12] text-sm">{c.title}</div><div className="text-xs text-[#0B0B12]/55">{c.sub}</div></div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}