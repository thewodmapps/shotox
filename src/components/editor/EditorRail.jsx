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

export default function EditorRail({ active, mobileOpen, onChange, isFeature }) {
  // Templates & AI operate on the phone slide set — hide them in feature mode
  // so nothing in the feature graphic editor can touch the phone screenshots.
  const panels = isFeature ? PANELS.filter((p) => p.id !== 'templates' && p.id !== 'ai') : PANELS;
  return (
    <nav className="shrink-0 bg-[#0B0B12] border-t md:border-t-0 md:border-r border-white/10 text-white/60 z-10 safe-bottom no-callout h-14 w-full md:h-auto md:w-[76px] md:py-3 flex md:flex-col order-last md:order-first">
      {panels.map((p) => {
        const isActive = active === p.id;
        return (
          <button
            key={p.id}
            onClick={() => onChange(p.id)}
            className={`flex-1 md:flex-none min-w-0 flex flex-col items-center justify-center gap-1 py-2 md:py-3 transition-colors ${
              isActive && mobileOpen ? 'text-white bg-white/10' : isActive ? 'text-white' : 'hover:text-white hover:bg-white/5'
            }`}
          >
            <p.icon className="w-5 h-5 shrink-0" />
            <span className="text-[10px] leading-none whitespace-nowrap">{p.label}</span>
          </button>
        );
      })}
    </nav>
  );
}