import React from 'react';
import { X } from 'lucide-react';
import { PANELS } from './EditorRail';
import TemplatesPanel from './panels/TemplatesPanel';
import AIPanel from './panels/AIPanel';
import TextPanel from './panels/TextPanel';
import BackgroundPanel from './panels/BackgroundPanel';
import UploadsPanel from './panels/UploadsPanel';
import DevicePanel from './panels/DevicePanel';

const MAP = { templates: TemplatesPanel, ai: AIPanel, text: TextPanel, background: BackgroundPanel, uploads: UploadsPanel, device: DevicePanel };

export default function EditorPanel({ active, mobileOpen, onCloseMobile, ...props }) {
  const Panel = MAP[active] || TemplatesPanel;
  const meta = PANELS.find((p) => p.id === active);
  return (
    <aside
      className={`w-72 shrink-0 bg-[#111118] text-white overflow-y-auto border-white/10
        md:static md:block md:translate-x-0 md:max-h-none md:z-auto md:border-r
        absolute inset-y-0 left-16 right-0 z-30 border-r transition-transform duration-200
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <span className="text-sm font-semibold font-display">{meta?.label}</span>
        <button onClick={onCloseMobile} className="md:hidden p-1 -mr-1 text-white/50 hover:text-white" aria-label="Close panel">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="px-4 pb-6"><Panel {...props} /></div>
    </aside>
  );
}