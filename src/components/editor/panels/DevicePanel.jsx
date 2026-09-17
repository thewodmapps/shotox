import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { DEVICES, LAYOUTS, DEVICE_STYLES } from '@/lib/templates';

const Option = ({ active, onClick, children }) => (
  <button onClick={onClick} className={`h-9 px-3 rounded-lg text-sm border text-left transition-colors flex items-center gap-2 ${active ? 'bg-white text-[#0B0B12] border-white' : 'border-white/10 text-white/70 hover:bg-white/5'}`}>
    <span className="flex-1 min-w-0">{children}</span>
  </button>
);

const GROUPS = [
  { label: 'iPhone', items: DEVICES.filter((d) => d.platform === 'ios' && d.form === 'phone') },
  { label: 'iPad', items: DEVICES.filter((d) => d.form === 'tablet' && d.platform === 'ios') },
  { label: 'Android Phone', items: DEVICES.filter((d) => d.platform === 'android' && d.form === 'phone') },
  { label: 'Android Tablet', items: DEVICES.filter((d) => d.form === 'tablet' && d.platform === 'android') },
  { label: 'Feature Graphic', items: DEVICES.filter((d) => d.form === 'feature') },
];

export default function DevicePanel({ slide, updateSlide, project, updateProject, switchDevice }) {
  const isCustom = project.device === 'custom';
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        {GROUPS.map((g) => (
          <div key={g.label} className="space-y-1.5">
            <Label className="text-white/60 text-sm uppercase tracking-wide">{g.label}</Label>
            <div className="grid gap-1.5">
              {g.items.map((d) => (
                <Option key={d.id} active={project.device === d.id} onClick={() => switchDevice(d.id, d.platform)}>
                  <span className="flex justify-between gap-2"><span className="truncate">{d.name}</span><span className="opacity-50 shrink-0">{d.w}×{d.h}</span></span>
                </Option>
              ))}
            </div>
          </div>
        ))}
        <div className="space-y-1.5">
          <Label className="text-white/60 text-sm uppercase tracking-wide">Custom</Label>
          <Option active={isCustom} onClick={() => switchDevice('custom')}>Custom size</Option>
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
          <div className="space-y-2">
            <Label className="text-white/70 text-sm">Phone size · small ↔ large · {Math.round((slide.phoneScale ?? 1) * 100)}%</Label>
            <Slider value={[(slide.phoneScale ?? 1) * 100]} min={60} max={140} step={5} onValueChange={([v]) => updateSlide({ phoneScale: v / 100 })} />
          </div>
        </div>
      )}
    </div>
  );
}