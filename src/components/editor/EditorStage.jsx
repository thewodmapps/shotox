import React, { useEffect, useRef, useState } from 'react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { resolveDevice, slideHeight, BASE_W } from '@/lib/templates';
import SlideCanvas from './SlideCanvas';
import SlideToolbar from './SlideToolbar';

export default function EditorStage({ project, selected, onSelect, onAdd, onDuplicate, onDelete, onMove, watermark, onUndo, onRedo, canUndo, canRedo }) {
  const device = resolveDevice(project);
  const sH = slideHeight(device);
  const wrapRef = useRef(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const slide = project.slides[selected];
  // Slide width that fits the available mobile height (room for toolbar + counter).
  const fitByH = (box.h - 96) * (BASE_W / sH);
  const mobileW = Math.max(50, Math.min(box.w - 40, fitByH));

  return (
    <main className="flex-1 min-w-0 bg-[#08080d] bg-grid flex flex-col overflow-hidden md:overflow-auto">
      {/* Desktop: horizontal strip */}
      <div className="hidden md:flex flex-1 min-h-0 items-center overflow-x-auto px-10 py-12">
        <div className="flex items-start gap-3 mx-auto">
          {project.slides.map((sld, i) => (
            <motion.div key={sld.id} layout className="relative group" onClick={() => onSelect(i)}>
              <SlideCanvas
                slide={sld}
                device={device}
                width={260}
                watermark={watermark}
                className={`rounded-xl overflow-hidden cursor-pointer transition-shadow ${
                  selected === i ? 'ring-2 ring-violet-400 shadow-[0_0_0_6px_rgba(139,92,246,0.15)]' : 'ring-1 ring-white/10 hover:ring-white/30'
                }`}
              />
              <div className={`absolute -bottom-12 left-1/2 -translate-x-1/2 transition-opacity ${selected === i ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <SlideToolbar index={i} count={project.slides.length} onDuplicate={onDuplicate} onDelete={onDelete} onMove={onMove} onUndo={onUndo} onRedo={onRedo} canUndo={canUndo} canRedo={canRedo} />
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

      {/* Mobile: one slide at a time, scaled to fit */}
      <div ref={wrapRef} className="md:hidden flex-1 min-h-0 flex flex-col items-center justify-center px-4 py-3 gap-2">
        <div className="flex items-center justify-center w-full flex-1 min-h-0 relative">
          {selected > 0 && (
            <button onClick={() => onSelect(selected - 1)} className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 z-10" aria-label="Previous slide">
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {selected < project.slides.length - 1 && (
            <button onClick={() => onSelect(selected + 1)} className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 z-10" aria-label="Next slide">
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
          {slide && (
            <div className="relative">
              <SlideCanvas
                slide={slide}
                device={device}
                width={mobileW}
                watermark={watermark}
                className="rounded-xl overflow-hidden ring-2 ring-violet-400 shadow-[0_0_0_6px_rgba(139,92,246,0.15)]"
              />
              <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full bg-black/50 text-white/80">{selected + 1}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <SlideToolbar index={selected} count={project.slides.length} onDuplicate={onDuplicate} onDelete={onDelete} onMove={onMove} onUndo={onUndo} onRedo={onRedo} canUndo={canUndo} canRedo={canRedo} />
          <button onClick={onAdd} className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Add slide">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <span className="text-[11px] text-white/50">{selected + 1} / {project.slides.length}</span>
      </div>
    </main>
  );
}