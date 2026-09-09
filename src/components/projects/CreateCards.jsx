import React, { useState } from 'react';
import { Apple, Play, Tablet, ImagePlus, Settings, ArrowRight, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FormPreview from './FormPreview';

const OPTIONS = [
  { key: 'ios-phone', title: 'App Store', sub: 'iPhone 6.7" · 1290×2796', form: 'phone', platform: 'ios', device: 'iphone-6.7', icon: Apple, tpl: 'aurora' },
  { key: 'android-phone', title: 'Google Play', sub: 'Phone · 1080×1920', form: 'phone', platform: 'android', device: 'android-phone', icon: Play, tpl: 'ocean' },
  { key: 'ipad', title: 'iPad', sub: '13" · 2064×2752', form: 'tablet', platform: 'ios', device: 'ipad-13', icon: Tablet, tpl: 'editorial' },
  { key: 'android-tab', title: 'Android Tablet', sub: '10" · 1200×1920', form: 'tablet', platform: 'android', device: 'android-tab-10', icon: Tablet, tpl: 'mint' },
  { key: 'feature', title: 'Feature Graphic', sub: 'Banner · 1024×500', form: 'feature', platform: 'android', device: 'feature-graphic', icon: ImagePlus, tpl: 'coral' },
  { key: 'custom', title: 'Custom Size', sub: 'Any dimensions', form: 'custom', platform: 'ios', device: 'custom', icon: Settings, tpl: 'aurora' },
];

export default function CreateCards({ onCreate, creating }) {
  const [customOpen, setCustomOpen] = useState(false);
  const [custom, setCustom] = useState({ w: 1080, h: 1920 });

  return (
    <section className="rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-violet-200 via-pink-200 to-orange-100">
      <h2 className="font-display text-2xl font-bold text-[#0B0B12] mb-5">Create a design</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {OPTIONS.map((o) => (
          <button
            key={o.key}
            disabled={!!creating && creating !== o.platform}
            onClick={() => (o.form === 'custom' ? setCustomOpen((v) => !v) : onCreate({ templateId: o.tpl, platform: o.platform, device: o.device }))}
            className={`group text-left rounded-2xl bg-white/80 backdrop-blur border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden disabled:opacity-60 ${
              o.form === 'custom' && customOpen ? 'border-violet-400 ring-2 ring-violet-300' : 'border-white'
            }`}
          >
            <div className="h-24 grid place-items-center bg-[#0B0B12] relative">
              <FormPreview form={o.form} />
              {creating === o.platform && <Loader2 className="w-4 h-4 animate-spin text-white absolute top-2 right-2" />}
            </div>
            <div className="p-3.5 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#0B0B12] text-white grid place-items-center shrink-0">
                <o.icon className="w-4 h-4" />
              </span>
              <div className="min-w-0">
                <div className="font-semibold text-[#0B0B12] text-sm truncate">{o.title}</div>
                <div className="text-[11px] text-[#0B0B12]/55 truncate">{o.sub}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {customOpen && (
        <div className="mt-4 rounded-2xl bg-white/80 backdrop-blur border border-white p-4 flex flex-wrap items-end gap-3">
          <span className="text-sm font-medium text-[#0B0B12] mr-2">Custom size</span>
          <div className="space-y-1">
            <Label className="text-xs text-[#0B0B12]/60">Width (px)</Label>
            <Input type="number" value={custom.w} onChange={(e) => setCustom((c) => ({ ...c, w: parseInt(e.target.value) || 1080 }))} className="w-28 bg-white border-black/10" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-[#0B0B12]/60">Height (px)</Label>
            <Input type="number" value={custom.h} onChange={(e) => setCustom((c) => ({ ...c, h: parseInt(e.target.value) || 1920 }))} className="w-28 bg-white border-black/10" />
          </div>
          <Button
            onClick={() => onCreate({ templateId: 'aurora', platform: custom.w > custom.h ? 'android' : 'ios', device: 'custom', customW: custom.w, customH: custom.h })}
            className="bg-[#0B0B12] hover:bg-[#0B0B12]/85 text-white rounded-xl"
          >
            Create <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      )}
    </section>
  );
}