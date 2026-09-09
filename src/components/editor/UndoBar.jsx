import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Undo2 } from 'lucide-react';

export default function UndoBar({ undo, onUndo }) {
  return (
    <AnimatePresence>
      {undo && (
        <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#1a1a22] text-white shadow-2xl border border-white/10">
            <span className="text-sm">Slide deleted</span>
            <button onClick={onUndo} className="inline-flex items-center gap-1 text-sm font-semibold text-violet-300 hover:text-violet-200 transition-colors">
              <Undo2 className="w-4 h-4" /> Undo
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}