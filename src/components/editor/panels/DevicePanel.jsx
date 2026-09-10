import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { DEVICES, LAYOUTS, DEVICE_STYLES } from '@/lib/templates';
import { Lock } from 'lucide-react';
import { FREE_DEVICE_IDS } from '@/lib/entitlements';

const Option = ({ active, onClick, children, locked }) => (
  <button onClick={onClick} className={`h-11 px-3 rounded-lg text-sm border text-left transition-colors flex items-center gap-2 ${locked ? 'border-white/10 text-white/35' : active ? 'bg-white text-[#0B0B12] border-white' : 'border-white/10 text-white/70 hover:bg-white/5'}`}>
    <span className="flex-1 min-w-0">{children}</span>
    {locked && <Lock className="w-3 h-3 shrink-0 opacity-70" />}
  </button>
);

const GROUPS = [
  { label: 'iPhone', items: DEVICES.filter((d) => d.platform === 'ios' && d.form === 'phone') },
  { label: 'iPad', items: DEVICES.filter((d) => d.form === 'tablet' && d.platform === 'ios') },
  { label: 'Android Phone', items: DEVICES.filter((d) => d.platform === 'android' && d.form === 'phone') },
  { label: 'Android Tablet', items: DEVICES.filter((d) => d.form === 'tablet' && d.platform === 'android') },
  { label: 'Feature Graphic', items: DEVICES.filter((d) => d.form === 'feature') },
];

export default function DevicePanel({ slide, updateSlide, project, updateProject, isPro, onLocked }) {
  const isCustom = project.device === 'custom';
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        {GROUPS.map((g) => (
          <div key={g.label} className="space-y-1.5">
            <Label className="text-white/60 text-sm uppercase tracking-wide">{g.label}</Label>
            <div className="grid gap-1.5">
              {g.items.map((d) => {
                const locked = !isPro && !FREE_DEVICE_IDS.includes(d.id);
                return (
                <Option key={d.id} active={project.device === d.id} locked={locked} onClick={locked ? onLocked : () => updateProject({ device: d.id, platform: d.platform })}>
                  <span className="flex justify-between gap-2"><span className="truncate">{d.name}</span><span className="opacity-50 shrink-0">{d.w}×{d.h}</span></span>
                </Option>
                );
              })}
            </div>
          </div>
        ))}
        <div className="space-y-1.5">
          <Label className="text-white/60 text-sm uppercase tracking-wide">Custom</Label>
          <Option active={isCustom} locked={!isPro} onClick={!isPro ? onLocked : () => updateProject({ device: 'custom' })}>Custom size</Option>
          {isCustom && (
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="space-y-1">
                <Label className="text-white/60 text-sm">Width</Label>
                <Input type="number" value={project.custom_w || 1080} onChange={(e) => updateProject({ custom_w: parseInt(e.target.value) || 1080 })} className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="space-y-1">
                <Label className="text-white/60 text-sm">Height</Label>
                <Input type="number" value={project.custom_h || 1920} onChange={(e) => updateProject({ custom_h: parseInt(e.target.value) || 1920 })} className="bg-white/5 border-white/10 text-white" />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-white/70 text-sm">Layout</Label>
        <div className="grid grid-cols-2 gap-2">
          {LAYOUTS.map((l) => <Option key={l.id} active={slide.layout === l.id} onClick={() => updateSlide({ layout: l.id })}>{l.name}</Option>)}
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-white/70 text-sm">Frame finish</Label>
        <div className="grid grid-cols-3 gap-2">
          {DEVICE_STYLES.map((s) => <Option key={s.id} active={slide.deviceStyle === s.id} onClick={() => updateSlide({ deviceStyle: s.id })}>{s.name}</Option>)}
        </div>
      </div>
      {slide.layout !== 'text-only' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white/70 text-sm">Phone position · left ↔ right · {slide.phoneX ?? 0}</Label>
            <Slider value={[slide.phoneX ?? 0]} min={-30} max={30} step={1} onValueChange={([v]) => updateSlide({ phoneX: v })} />
          </div>
          <div className="space-y-2">
            <Label className="text-white/70 text-sm">Phone position · up ↕ down · {slide.phoneY ?? 0}</Label>
            <Slider value={[slide.phoneY ?? 0]} min={-30} max={30} step={1} onValueChange={([v]) => updateSlide({ phoneY: v })} />
          </div>
        </div>
      )}
    </div>
  );
}