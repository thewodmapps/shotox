import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { resolveDevice } from '@/lib/templates';
import SlideCanvas from './SlideCanvas';
import SlideToolbar from './SlideToolbar';

export default function EditorStage({ project, selected, onSelect, onAdd, onDuplicate, onDelete, onMove }) {
  const device = resolveDevice(project);
  return (
    <main className="flex-1 min-w-0 overflow-auto bg-[#08080d] bg-grid">
      <div className="min-h-full flex items-center px-6 sm:px-10 py-12">
        <div className="flex items-start gap-3 mx-auto">
          {project.slides.map((slide, i) => (
            <motion.div key={slide.id} layout className="relative group" onClick={() => onSelect(i)}>
              <SlideCanvas
                slide={slide}
                device={device}
                width={260}
                className={`rounded-xl overflow-hidden cursor-pointer transition-shadow ${
                  selected === i ? 'ring-2 ring-violet-400 shadow-[0_0_0_6px_rgba(139,92,246,0.15)]' : 'ring-1 ring-white/10 hover:ring-white/30'
                }`}
              />
              <div className={`absolute -bottom-12 left-1/2 -translate-x-1/2 transition-opacity ${selected === i ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <SlideToolbar index={i} count={project.slides.length} onDuplicate={onDuplicate} onDelete={onDelete} onMove={onMove} />
              </div>
              <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full bg-black/50 text-white/80">{i + 1}</span>
            </motion.div>
          ))}
          <button
            onClick={onAdd}
            className="w-24 shrink-0 self-stretch min-h-[200px] rounded-xl border border-dashed border-white/20 hover:border-violet-400 hover:bg-violet-500/10 text-white/50 hover:text-white flex flex-col items-center justify-center gap-2 transition-colors"
          >
            <Plus className="w-6 h-6" />
            <span className="text-xs">Add slide</span>
          </button>
        </div>
      </div>
    </main>
  );
}