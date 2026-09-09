import React from 'react';
import { LayoutTemplate, Type, Palette, ImagePlus, Smartphone, Sparkles } from 'lucide-react';

export const PANELS = [
  { id: 'templates', label: 'Templates', icon: LayoutTemplate },
  { id: 'ai', label: 'AI', icon: Sparkles },
  { id: 'text', label: 'Text', icon: Type },
  { id: 'background', label: 'Background', icon: Palette },
  { id: 'uploads', label: 'Uploads', icon: ImagePlus },
  { id: 'device', label: 'Device', icon: Smartphone },
];

export default function EditorRail({ active, onChange }) {
  return (
    <nav className="w-16 md:w-[72px] shrink-0 flex flex-col bg-[#0B0B12] border-r border-white/10 text-white/60 py-2 md:py-3">
      {PANELS.map((p) => {
        const isActive = active === p.id;
        return (
          <button
            key={p.id}
            onClick={() => onChange(p.id)}
            className={`flex flex-col items-center gap-1 py-2 md:py-2.5 text-[9px] sm:text-[10px] md:text-[11px] transition-colors ${
              isActive ? 'text-white bg-white/10' : 'hover:text-white hover:bg-white/5'
            }`}
          >
            <p.icon className="w-5 h-5" />
            <span className="whitespace-nowrap leading-none">{p.label}</span>
          </button>
        );
      })}
    </nav>
  );
}