import React from 'react';
import { Copy, Trash2, ChevronLeft, ChevronRight, Undo2, Redo2 } from 'lucide-react';

const Btn = ({ onClick, disabled, label, children }) => (
  <button onClick={onClick} disabled={disabled} aria-label={label} title={label} className="p-1.5 rounded-md hover:bg-white/15 disabled:opacity-30 transition-colors">
    {children}
  </button>
);

export default function SlideToolbar({ index, count, onDuplicate, onDelete, onMove, onUndo, onRedo, canUndo, canRedo }) {
  return (
    <div className="flex items-center gap-0.5 px-1.5 py-1 rounded-full bg-[#0B0B12]/90 text-white shadow-lg border border-white/10">
      <Btn onClick={onUndo} disabled={!canUndo} label="Undo"><Undo2 className="w-3.5 h-3.5" /></Btn>
      <Btn onClick={onRedo} disabled={!canRedo} label="Redo"><Redo2 className="w-3.5 h-3.5" /></Btn>
      <div className="w-px h-4 bg-white/15 mx-0.5" />
      <Btn onClick={() => onMove(index, index - 1)} disabled={index === 0} label="Move left"><ChevronLeft className="w-3.5 h-3.5" /></Btn>
      <Btn onClick={() => onDuplicate(index)} label="Duplicate slide"><Copy className="w-3.5 h-3.5" /></Btn>
      <Btn onClick={() => onDelete(index)} disabled={count <= 1} label="Delete slide"><Trash2 className="w-3.5 h-3.5" /></Btn>
      <Btn onClick={() => onMove(index, index + 1)} disabled={index === count - 1} label="Move right"><ChevronRight className="w-3.5 h-3.5" /></Btn>
    </div>
  );
}