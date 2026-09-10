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

export default function EditorRail({ active, mobileOpen, onChange }) {
  return (
    <nav className="min-h-14 md:h-auto flex md:flex-col md:w-[72px] shrink-0 bg-[#0B0B12] border-t md:border-t-0 md:border-r border-white/10 text-white/60 md:py-3 order-last md:order-first z-10 safe-bottom no-callout">
      {PANELS.map((p) => {
        const isActive = active === p.id;
        return (
          <button
            key={p.id}
            onClick={() => onChange(p.id)}
            className={`flex-1 md:flex-none flex flex-col items-center justify-center gap-1 md:py-3.5 text-sm transition-colors ${
              isActive && mobileOpen ? 'text-white bg-white/10' : isActive ? 'text-white' : 'hover:text-white hover:bg-white/5'
            }`}
          >
            <p.icon className="w-5 h-5" />
            <span className="whitespace-nowrap">{p.label}</span>
          </button>
        );
      })}
    </nav>
  );
}