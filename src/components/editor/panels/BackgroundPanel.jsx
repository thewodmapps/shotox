import React, { useRef, useState } from 'react';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { SOLID_COLORS, GRADIENTS, solid, grad } from '@/lib/templates';
import { base44 } from '@/api/base44Client';
import ColorField from './ColorField';

const TYPES = ['solid', 'gradient', 'image'];

export default function BackgroundPanel({ slide, updateSlide }) {
  const bg = slide.bg;
  const setBg = (patch) => updateSlide({ bg: { ...bg, ...patch } });
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const pick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      updateSlide({ bg: { type: 'image', image: file_url, color: bg.color || '#0B0B12', from: bg.from || '#0B0B12', to: bg.to || '#0B0B12', angle: bg.angle || 135 } });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-1 p-1 rounded-lg bg-white/5">
        {TYPES.map((type) => (
          <button key={type} onClick={() => setBg({ type })} className={`h-8 rounded-md text-xs capitalize transition-colors ${bg.type === type ? 'bg-white text-[#0B0B12]' : 'text-white/70 hover:bg-white/5'}`}>
            {type}
          </button>
        ))}
      </div>

      {bg.type === 'solid' && (
        <>
          <div className="grid grid-cols-6 gap-2">
            {SOLID_COLORS.map((c) => (
              <button key={c} onClick={() => updateSlide({ bg: solid(c) })} className={`aspect-square rounded-lg border transition-transform hover:scale-110 ${bg.color === c ? 'ring-2 ring-violet-400 border-transparent' : 'border-white/10'}`} style={{ background: c }} aria-label={c} />
            ))}
          </div>
          <ColorField label="Custom color" value={bg.color} onChange={(color) => setBg({ color })} />
        </>
      )}

      {bg.type === 'gradient' && (
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

      {bg.type === 'image' && (
        <>
          {bg.image ? (
            <div className="space-y-3">
              <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-[4/3]">
                <img src={bg.image} alt="Background" className="w-full h-full object-cover" />
                <button
                  onClick={() => updateSlide({ bg: solid(bg.color || '#0B0B12') })}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/80 transition"
                  aria-label="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full h-9 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition"
              >
                Replace image
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="w-full rounded-xl border border-dashed border-white/20 hover:border-violet-400 hover:bg-violet-500/10 text-white/70 hover:text-white py-8 flex flex-col items-center gap-2 transition-colors disabled:opacity-60"
            >
              {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImagePlus className="w-5 h-5" />}
              <span className="text-xs">{uploading ? 'Uploading…' : 'Upload image'}</span>
            </button>
          )}
          <div className="space-y-2">
            <Label className="text-white/70 text-xs">Fit</Label>
            <div className="grid grid-cols-2 gap-1 p-1 rounded-lg bg-white/5">
              <button onClick={() => setBg({ imageFit: 'cover' })} className={`h-8 rounded-md text-xs transition-colors ${bg.imageFit !== 'fit' ? 'bg-white text-[#0B0B12]' : 'text-white/70 hover:bg-white/5'}`}>Cover (crop)</button>
              <button onClick={() => setBg({ imageFit: 'fit' })} className={`h-8 rounded-md text-xs transition-colors ${bg.imageFit === 'fit' ? 'bg-white text-[#0B0B12]' : 'text-white/70 hover:bg-white/5'}`}>Fit (whole)</button>
            </div>
          </div>

          {bg.imageFit !== 'fit' && (
            <>
              <div className="space-y-2">
                <Label className="text-white/70 text-xs">Position · X {bg.imageX ?? 50}%</Label>
                <Slider value={[bg.imageX ?? 50]} min={0} max={100} step={1} onValueChange={([imageX]) => setBg({ imageX })} />
              </div>
              <div className="space-y-2">
                <Label className="text-white/70 text-xs">Position · Y {bg.imageY ?? 50}%</Label>
                <Slider value={[bg.imageY ?? 50]} min={0} max={100} step={1} onValueChange={([imageY]) => setBg({ imageY })} />
              </div>
            </>
          )}

          <ColorField label="Fallback color" value={bg.color} onChange={(color) => setBg({ color })} />
          <p className="text-[11px] text-white/40 leading-relaxed">Cover crops the image to fill the slide — use the position sliders to reframe. Fit shows the whole image with the fallback color around it.</p>
        </>
      )}

      <input ref={fileRef} type="file" accept="image/*" onChange={pick} className="hidden" />
    </div>
  );
}