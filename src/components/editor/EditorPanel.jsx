import React from 'react';
import { PANELS } from './EditorRail';
import TemplatesPanel from './panels/TemplatesPanel';
import TextPanel from './panels/TextPanel';
import BackgroundPanel from './panels/BackgroundPanel';
import UploadsPanel from './panels/UploadsPanel';
import DevicePanel from './panels/DevicePanel';

const MAP = { templates: TemplatesPanel, text: TextPanel, background: BackgroundPanel, uploads: UploadsPanel, device: DevicePanel };

export default function EditorPanel({ active, ...props }) {
  const Panel = MAP[active] || TemplatesPanel;
  const meta = PANELS.find((p) => p.id === active);
  return (
    <aside className="w-full md:w-72 shrink-0 bg-[#111118] border-b md:border-b-0 md:border-r border-white/10 text-white max-h-[40vh] md:max-h-none overflow-y-auto">
      <div className="px-4 pt-4 pb-2 text-sm font-semibold font-display">{meta?.label}</div>
      <div className="px-4 pb-6"><Panel {...props} /></div>
    </aside>
  );
}