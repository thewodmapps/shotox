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
      className={`w-full md:w-72 shrink-0 bg-[#111118] text-white overflow-y-auto border-white/10
        md:block md:max-h-none md:static md:z-auto md:border-r md:border-b-0 md:border-t-0 md:rounded-none
        ${mobileOpen ? 'block max-h-[44vh] border-t' : 'hidden md:block'}`}
    >
      <div className="md:hidden sticky top-0 flex justify-center pt-2 pb-1 bg-[#111118]">
        <span className="h-1.5 w-10 rounded-full bg-white/20" />
      </div>
      <div className="px-4 pt-2 pb-2 text-sm font-semibold font-display flex items-center justify-between">
        <span>{meta?.label}</span>
        <button onClick={onCloseMobile} className="md:hidden p-1 -mr-1 text-white/50 hover:text-white" aria-label="Close panel">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="px-4 pb-6"><Panel {...props} /></div>
    </aside>
  );
}