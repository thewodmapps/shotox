import React from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';

export default function ConfirmDeleteModal({ open, name, onConfirm, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#15101c] p-6 shadow-2xl text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-14 h-14 mx-auto rounded-2xl bg-red-500/15 border border-red-500/25 grid place-items-center mb-4">
          <AlertTriangle className="w-6 h-6 text-red-300" />
        </div>
        <h3 className="font-display text-lg font-bold text-white mb-1.5">Delete this design?</h3>
        <p className="text-sm text-white/50 mb-5">
          <span className="text-white/80 font-medium truncate block max-w-full">{name || 'Untitled project'}</span>
          This can't be undone.
        </p>
        <div className="flex gap-2.5">
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-xl bg-white/10 text-white text-sm font-semibold hover:bg-white/20 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 h-11 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition inline-flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}