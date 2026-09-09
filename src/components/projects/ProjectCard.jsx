import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Check } from 'lucide-react';
import { format } from 'date-fns';
import { resolveDevice } from '@/lib/templates';
import ScaledSlide from '@/components/editor/ScaledSlide';

export default function ProjectCard({ project, onDelete }) {
  const p = project;
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (busy) return;
    if (confirming) {
      setBusy(true);
      onDelete(p.id);
      return;
    }
    setConfirming(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setConfirming(false), 3000);
  };

  return (
    <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-white/25 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/10 transition-all">
      <Link to={`/editor?id=${p.id}`} className="block">
        <div className="flex gap-1 p-2 bg-[#0B0B12]">
          {(p.slides || []).slice(0, 3).map((s) => (
            <div key={s.id} className="flex-1 aspect-[1290/2796] relative overflow-hidden rounded-md">
              <ScaledSlide slide={s} device={resolveDevice(p)} />
            </div>
          ))}
        </div>
        <div className="px-4 py-3.5">
          <div className="font-semibold text-sm text-white truncate">{p.name}</div>
          <div className="text-xs text-white/40 mt-0.5">{(p.slides || []).length} slides · {format(new Date(p.updated_date), 'MMM d, yyyy')}</div>
        </div>
      </Link>
      <button
        onClick={onClick}
        disabled={busy}
        aria-label={confirming ? 'Confirm delete' : 'Delete design'}
        className={`absolute top-3 right-3 grid place-items-center w-9 h-9 rounded-lg backdrop-blur transition-all ${
          confirming
            ? 'bg-red-500 text-white opacity-100 scale-110'
            : 'bg-black/50 text-white/60 opacity-70 hover:opacity-100 hover:bg-red-500/25 hover:text-red-300'
        }`}
      >
        {confirming ? <Check className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
      </button>
    </div>
  );
}