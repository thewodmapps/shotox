import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { SOLID_COLORS, GRADIENTS, solid, grad } from '@/lib/templates';
import ColorField from './ColorField';

export default function BackgroundPanel({ slide, updateSlide }) {
  const bg = slide.bg;
  const setBg = (patch) => updateSlide({ bg: { ...bg, ...patch } });
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-1 p-1 rounded-lg bg-white/5">
        {['solid', 'gradient'].map((type) => (
          <button key={type} onClick={() => setBg({ type })} className={`h-8 rounded-md text-xs capitalize transition-colors ${bg.type === type ? 'bg-white text-[#0B0B12]' : 'text-white/70 hover:bg-white/5'}`}>
            {type}
          </button>
        ))}
      </div>
      {bg.type === 'solid' ? (
        <>
          <div className="grid grid-cols-6 gap-2">
            {SOLID_COLORS.map((c) => (
              <button key={c} onClick={() => updateSlide({ bg: solid(c) })} className={`aspect-square rounded-lg border transition-transform hover:scale-110 ${bg.color === c ? 'ring-2 ring-violet-400 border-transparent' : 'border-white/10'}`} style={{ background: c }} aria-label={c} />
            ))}
          </div>
          <ColorField label="Custom color" value={bg.color} onChange={(color) => setBg({ color })} />
        </>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-2">
            {GRADIENTS.map(([from, to]) => (
              <button key={from + to} onClick={() => updateSlide({ bg: grad(from, to, bg.angle) })} className={`aspect-square rounded-lg border transition-transform hover:scale-110 ${bg.from === from && bg.to === to ? 'ring-2 ring-violet-400 border-transparent' : 'border-white/10'}`} style={{ background: `linear-gradient(135deg, ${from}, ${to})` }} aria-label={`${from} to ${to}`} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <ColorField label="From" value={bg.from} onChange={(from) => setBg({ from })} />
            <ColorField label="To" value={bg.to} onChange={(to) => setBg({ to })} />
          </div>
          <div className="space-y-2">
            <Label className="text-white/70 text-xs">Angle · {bg.angle}°</Label>
            <Slider value={[bg.angle]} min={0} max={360} step={5} onValueChange={([angle]) => setBg({ angle })} />
          </div>
        </>
      )}
    </div>
  );
}