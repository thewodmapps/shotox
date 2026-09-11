import React, { useState } from 'react';
import { Smartphone, Tablet, ImagePlus, Settings, ArrowRight, Loader2, Lock } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FormPreview from './FormPreview';

const OPTIONS = [
  { key: 'ios-phone', title: 'App Store', sub: 'iPhone 6.7" · 1290×2796', form: 'phone', platform: 'ios', device: 'iphone-6.7', icon: Smartphone, tpl: 'aurora' },
  { key: 'android-phone', title: 'Google Play', sub: 'Phone · 1080×1920', form: 'phone', platform: 'android', device: 'android-phone', icon: Smartphone, tpl: 'ocean' },
  { key: 'ipad', title: 'iPad', sub: '13" · 2064×2752', form: 'tablet', platform: 'ios', device: 'ipad-13', icon: Tablet, tpl: 'editorial' },
  { key: 'android-tab', title: 'Android Tablet', sub: '10" · 1200×1920', form: 'tablet', platform: 'android', device: 'android-tab-10', icon: Tablet, tpl: 'mint' },
  { key: 'feature', title: 'Feature Graphic', sub: 'Banner · 1024×500', form: 'feature', platform: 'android', device: 'feature-graphic', icon: ImagePlus, tpl: 'feature-banner' },
  { key: 'custom', title: 'Custom Size', sub: 'Any dimensions', form: 'custom', platform: 'ios', device: 'custom', icon: Settings, tpl: 'aurora' },
];

export default function CreateCards({ onCreate, creating, isPro, onLocked, freeDevice }) {
  const [customOpen, setCustomOpen] = useState(false);
  const [custom, setCustom] = useState({ w: 1080, h: 1920 });

  return (
    <section>
      <div className="mb-6">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">Create a design</h2>
        <p className="text-sm text-white/50 mt-1.5">Choose a canvas and start crafting store-ready screenshots.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {OPTIONS.map((o) => {
          const locked = !isPro && !!freeDevice && freeDevice !== o.device;
          const handle = () => {
            if (locked) return onLocked?.();
            o.form === 'custom' ? setCustomOpen((v) => !v) : onCreate({ templateId: o.tpl, platform: o.platform, device: o.device });
          };
          return (
          <button
            key={o.key}
            disabled={!!creating && creating !== o.platform}
            onClick={handle}
            className={`group relative text-left rounded-2xl bg-white/[0.04] border backdrop-blur-sm hover:bg-white/[0.07] hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/10 transition-all overflow-hidden disabled:opacity-60 disabled:hover:translate-y-0 ${
              o.form === 'custom' && customOpen ? 'border-violet-400/60 ring-2 ring-violet-500/30' : 'border-white/10 hover:border-white/20'
            } ${locked ? 'opacity-60' : ''}`}
          >
            <div className="h-44 grid place-items-center bg-gradient-to-br from-[#16161e] to-[#0b0b10] relative overflow-hidden">
              <div className="absolute w-48 h-48 rounded-full" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)' }} />
              <div className="relative z-10"><FormPreview form={o.form} platform={o.platform} /></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-violet-500/15 via-transparent to-pink-500/15" />
              {creating === o.platform && <Loader2 className="w-4 h-4 animate-spin text-white absolute top-2.5 right-2.5 z-10" />}
              {locked && (
                <div className="absolute top-2.5 right-2.5 z-10 grid place-items-center w-7 h-7 rounded-lg bg-black/50 border border-white/15 text-white/80">
                  <Lock className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
            <div className="p-4 flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500/25 to-pink-500/25 border border-white/10 text-white grid place-items-center shrink-0">
                <o.icon className="w-4 h-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-white text-sm truncate">{o.title}</div>
                <div className="text-[11px] text-white/45 truncate">{o.sub}</div>
              </div>
            </div>
          </button>
          );
        })}
      </div>

      {customOpen && (
        <div className="mt-4 rounded-2xl bg-white/[0.04] backdrop-blur border border-white/10 p-5 flex flex-wrap items-end gap-3">
          <span className="text-sm font-medium text-white mr-2">Custom size</span>
          <div className="space-y-1">
            <Label className="text-xs text-white/50">Width (px)</Label>
            <Input type="number" value={custom.w} onChange={(e) => setCustom((c) => ({ ...c, w: parseInt(e.target.value) || 1080 }))} className="w-28 bg-white/5 border-white/10 text-white" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-white/50">Height (px)</Label>
            <Input type="number" value={custom.h} onChange={(e) => setCustom((c) => ({ ...c, h: parseInt(e.target.value) || 1920 }))} className="w-28 bg-white/5 border-white/10 text-white" />
          </div>
          <Button
            onClick={() => onCreate({ templateId: 'aurora', platform: custom.w > custom.h ? 'android' : 'ios', device: 'custom', customW: custom.w, customH: custom.h })}
            className="bg-gradient-to-r from-violet-500 to-pink-500 hover:opacity-90 text-white rounded-xl border-0"
          >
            Create <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      )}
    </section>
  );
}