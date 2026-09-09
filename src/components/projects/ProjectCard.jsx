import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Share2, Pencil, Check } from 'lucide-react';
import { format } from 'date-fns';
import { resolveDevice } from '@/lib/templates';
import ScaledSlide from '@/components/editor/ScaledSlide';

const ICON = 'w-4 h-4';
const BTN_BASE = 'grid place-items-center w-8 h-8 rounded-lg backdrop-blur transition-all text-white/60 opacity-70 hover:opacity-100 hover:text-white hover:bg-white/10';

export default function ProjectCard({ project, onDelete }) {
  const p = project;
  const navigate = useNavigate();
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);
  const copyTimer = useRef(null);

  useEffect(() => () => { clearTimeout(timer.current); clearTimeout(copyTimer.current); }, []);

  const edit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/editor?id=${p.id}`);
  };

  const share = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/editor?id=${p.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard unavailable */ }
  };

  const onTrash = (e) => {
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
      </Link>
      <div className="px-4 py-3.5 flex items-end justify-between gap-3">
        <Link to={`/editor?id=${p.id}`} className="min-w-0">
          <div className="font-semibold text-sm text-white truncate">{p.name}</div>
          <div className="text-xs text-white/40 mt-0.5">{(p.slides || []).length} slides · {format(new Date(p.updated_date), 'MMM d, yyyy')}</div>
        </Link>
        <div className="flex items-center gap-1.5 shrink-0">
          <button onClick={edit} aria-label="Edit design" className={BTN_BASE}>
            <Pencil className={ICON} />
          </button>
          <button onClick={share} aria-label="Share design" className={`${BTN_BASE} ${copied ? '!text-green-300 !bg-green-500/20 !opacity-100' : ''}`}>
            {copied ? <Check className={ICON} /> : <Share2 className={ICON} />}
          </button>
          <button
            onClick={onTrash}
            disabled={busy}
            aria-label={confirming ? 'Confirm delete' : 'Delete design'}
            className={`grid place-items-center w-8 h-8 rounded-lg backdrop-blur transition-all ${
              confirming ? 'bg-red-500 text-white opacity-100 scale-110' : BTN_BASE + ' hover:!bg-red-500/25 hover:!text-red-300'
            }`}
          >
            {confirming ? <Check className={ICON} /> : <Trash2 className={ICON} />}
          </button>
        </div>
      </div>
    </div>
  );
}