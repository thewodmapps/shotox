import React from 'react';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { FONTS } from '@/lib/templates';
import ColorField from './ColorField';

export default function TextPanel({ slide, updateSlide, updateTextStyle }) {
  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <Label className="text-white/70 text-xs">Headline</Label>
        <Input value={slide.heading} onChange={(e) => updateSlide({ heading: e.target.value })} className="bg-white/5 border-white/10 text-white" />
      </div>
      <div className="space-y-1.5">
        <Label className="text-white/70 text-xs">Subheadline</Label>
        <Textarea rows={2} value={slide.subheading} onChange={(e) => updateSlide({ subheading: e.target.value })} className="bg-white/5 border-white/10 text-white resize-none" />
      </div>
      <div className="space-y-1.5">
        <Label className="text-white/70 text-xs">Font</Label>
        <Select value={slide.font} onValueChange={(font) => updateSlide({ font })}>
          <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
          <SelectContent>
            {FONTS.map((f) => <SelectItem key={f} value={f} style={{ fontFamily: f }}>{f}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label className="text-white/70 text-xs">Headline alignment</Label>
        <div className="grid grid-cols-3 gap-2">
          {[['left', AlignLeft], ['center', AlignCenter], ['right', AlignRight]].map(([a, Icon]) => (
            <button key={a} onClick={() => updateSlide({ headingAlign: a })} className={`flex items-center justify-center gap-1.5 h-9 rounded-lg text-xs border transition-colors ${(slide.headingAlign || slide.align) === a ? 'bg-white text-[#0B0B12] border-white' : 'border-white/10 text-white/70 hover:bg-white/5'}`}>
              <Icon className="w-4 h-4" /> {a === 'left' ? 'Left' : a === 'center' ? 'Center' : 'Right'}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className="text-white/70 text-xs">Subheadline alignment</Label>
        <div className="grid grid-cols-3 gap-2">
          {[['left', AlignLeft], ['center', AlignCenter], ['right', AlignRight]].map(([a, Icon]) => (
            <button key={a} onClick={() => updateSlide({ subAlign: a })} className={`flex items-center justify-center gap-1.5 h-9 rounded-lg text-xs border transition-colors ${(slide.subAlign || slide.align) === a ? 'bg-white text-[#0B0B12] border-white' : 'border-white/10 text-white/70 hover:bg-white/5'}`}>
              <Icon className="w-4 h-4" /> {a === 'left' ? 'Left' : a === 'center' ? 'Center' : 'Right'}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-white/70 text-xs">Text position Y · {slide.textY ?? 0}</Label>
        <Slider value={[slide.textY ?? 0]} min={-30} max={30} step={1} onValueChange={([v]) => updateSlide({ textY: v })} />
      </div>
      <div className="space-y-2">
        <Label className="text-white/70 text-xs">Text position X · {slide.textX ?? 0}</Label>
        <Slider value={[slide.textX ?? 0]} min={-40} max={40} step={1} onValueChange={([v]) => updateSlide({ textX: v })} />
      </div>
      <div className="space-y-2">
        <Label className="text-white/70 text-xs">Headline size · {Math.round((slide.headingScale ?? 1) * 100)}%</Label>
        <Slider value={[Math.round((slide.headingScale ?? 1) * 100)]} min={50} max={200} step={5} onValueChange={([v]) => updateSlide({ headingScale: v / 100 })} />
      </div>
      <div className="space-y-2">
        <Label className="text-white/70 text-xs">Subheadline size · {Math.round((slide.subScale ?? 1) * 100)}%</Label>
        <Slider value={[Math.round((slide.subScale ?? 1) * 100)]} min={50} max={200} step={5} onValueChange={([v]) => updateSlide({ subScale: v / 100 })} />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-white/70 text-xs">Text shadow</Label>
          <Switch checked={!!slide.shadow} onCheckedChange={(v) => updateSlide({ shadow: v })} />
        </div>
        {slide.shadow && (
          <div className="space-y-2 pt-1">
            <Label className="text-white/70 text-xs">Shadow blur · {slide.shadowBlur ?? 8}</Label>
            <Slider value={[slide.shadowBlur ?? 8]} min={2} max={30} step={1} onValueChange={([v]) => updateSlide({ shadowBlur: v })} />
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <ColorField label="Headline color" value={slide.headingColor} onChange={(headingColor) => updateSlide({ headingColor })} />
        <ColorField label="Subline color" value={slide.subColor} onChange={(subColor) => updateSlide({ subColor })} />
      </div>
    </div>
  );
}