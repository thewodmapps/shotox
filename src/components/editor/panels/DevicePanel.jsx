import React from 'react';
import { Label } from '@/components/ui/label';
import { DEVICES, LAYOUTS, DEVICE_STYLES } from '@/lib/templates';

const Option = ({ active, onClick, children }) => (
  <button onClick={onClick} className={`h-9 px-3 rounded-lg text-xs border text-left transition-colors ${active ? 'bg-white text-[#0B0B12] border-white' : 'border-white/10 text-white/70 hover:bg-white/5'}`}>
    {children}
  </button>
);

export default function DevicePanel({ slide, updateSlide, project, updateProject }) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label className="text-white/70 text-xs">Store size (applies to all slides)</Label>
        <div className="grid gap-2">
          {DEVICES.map((d) => (
            <Option key={d.id} active={project.device === d.id} onClick={() => updateProject({ device: d.id, platform: d.platform })}>
              <span className="flex justify-between"><span>{d.name}</span><span className="opacity-60">{d.w}×{d.h}</span></span>
            </Option>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-white/70 text-xs">Layout</Label>
        <div className="grid grid-cols-2 gap-2">
          {LAYOUTS.map((l) => <Option key={l.id} active={slide.layout === l.id} onClick={() => updateSlide({ layout: l.id })}>{l.name}</Option>)}
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-white/70 text-xs">Frame finish</Label>
        <div className="grid grid-cols-3 gap-2">
          {DEVICE_STYLES.map((s) => <Option key={s.id} active={slide.deviceStyle === s.id} onClick={() => updateSlide({ deviceStyle: s.id })}>{s.name}</Option>)}
        </div>
      </div>
    </div>
  );
}