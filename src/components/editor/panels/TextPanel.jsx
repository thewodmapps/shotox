import React from 'react';
import { AlignLeft, AlignCenter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
        <Select value={slide.font} onValueChange={(font) => updateTextStyle({ font })}>
          <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
          <SelectContent>
            {FONTS.map((f) => <SelectItem key={f} value={f} style={{ fontFamily: f }}>{f}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label className="text-white/70 text-xs">Alignment</Label>
        <div className="grid grid-cols-2 gap-2">
          {[['left', AlignLeft], ['center', AlignCenter]].map(([a, Icon]) => (
            <button key={a} onClick={() => updateTextStyle({ align: a })} className={`flex items-center justify-center gap-2 h-9 rounded-lg text-xs border transition-colors ${slide.align === a ? 'bg-white text-[#0B0B12] border-white' : 'border-white/10 text-white/70 hover:bg-white/5'}`}>
              <Icon className="w-4 h-4" /> {a === 'left' ? 'Left' : 'Center'}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <ColorField label="Headline color" value={slide.headingColor} onChange={(headingColor) => updateTextStyle({ headingColor })} />
        <ColorField label="Subline color" value={slide.subColor} onChange={(subColor) => updateTextStyle({ subColor })} />
      </div>
    </div>
  );
}