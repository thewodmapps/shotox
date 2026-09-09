import React from 'react';
import { LayoutTemplate, Type, Palette, ImagePlus, Smartphone } from 'lucide-react';

export const PANELS = [
  { id: 'templates', label: 'Templates', icon: LayoutTemplate },
  { id: 'text', label: 'Text', icon: Type },
  { id: 'background', label: 'Background', icon: Palette },
  { id: 'uploads', label: 'Uploads', icon: ImagePlus },
  { id: 'device', label: 'Device', icon: Smartphone },
];

export default function EditorRail({ active, onChange }) {
  return (
    <nav className="flex md:flex-col md:w-[72px] shrink-0 bg-[#0B0B12] border-t md:border-t-0 md:border-r border-white/10 text-white/60 md:py-3 order-last md:order-first">
      {PANELS.map((p) => (
        <button
          key={p.id}
          onClick={() => onChange(p.id)}
          className={`flex-1 md:flex-none flex flex-col items-center gap-1 py-3 text-[11px] transition-colors ${
            active === p.id ? 'text-white bg-white/10' : 'hover:text-white hover:bg-white/5'
          }`}
        >
          <p.icon className="w-5 h-5" />
          {p.label}
        </button>
      ))}
    </nav>
  );
}