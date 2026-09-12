import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Share2, Edit3 } from 'lucide-react';
import { format } from 'date-fns';
import { base44 } from '@/api/base44Client';
import { resolveDevice } from '@/lib/templates';
import ScaledSlide from '@/components/editor/ScaledSlide';
import ShareModal from './ShareModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const ICON = 'w-4 h-4';
const BTN_BASE = 'grid place-items-center w-11 h-11 rounded-lg backdrop-blur transition-all text-white/60 hover:opacity-100 hover:text-white hover:bg-white/10';

export default function ProjectCard({ project, onDelete, onRename }) {
  const p = project;
  const device = resolveDevice(p);
  const navigate = useNavigate();
  const [shareOpen, setShareOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [nameValue, setNameValue] = useState(p.name);
  const inputRef = useRef(null);

  useEffect(() => { setNameValue(p.name); }, [p.name]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const shareUrl = `${window.location.origin}/editor?id=${p.id}`;

  const startEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setNameValue(p.name);
    setEditing(true);
  };

  const commitName = async () => {
    const trimmed = nameValue.trim();
    setEditing(false);
    if (!trimmed || trimmed === p.name) { setNameValue(p.name); return; }
    try {
      await base44.entities.Project.update(p.id, { name: trimmed });
      onRename?.(p.id, trimmed);
    } catch {}
  };

  const cancelEdit = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setEditing(false);
    setNameValue(p.name);
  };

  const share = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShareOpen(true);
  };

  const onTrash = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    setDeleteOpen(false);
    onDelete(p.id);
  };

  return (
    <>
      <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-white/25 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/10 transition-all">
        <Link to={`/editor?id=${p.id}`} className="block">
          <div className="flex gap-1 p-2 bg-[#0B0B12]">
            {(p.slides || []).slice(0, 3).map((s) => (
              <div key={s.id} className="flex-1 relative overflow-hidden rounded-md" style={{ aspectRatio: `${device.w} / ${device.h}` }}>
                <ScaledSlide slide={s} device={device} />
              </div>
            ))}
          </div>
        </Link>
        <div className="px-4 py-3.5 flex items-end justify-between gap-3">
          <div className="min-w-0 flex-1">
            {editing ? (
              <div className="flex items-center gap-1.5" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                <input
                  ref={inputRef}
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') commitName();
                    if (e.key === 'Escape') cancelEdit(e);
                  }}
                  onBlur={commitName}
                  className="font-semibold text-sm text-white bg-white/10 border border-violet-400/50 rounded-lg px-2 py-1 outline-none w-full"
                />
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Link to={`/editor?id=${p.id}`} className="min-w-0">
                  <div className="font-semibold text-sm text-white truncate">{p.name}</div>
                </Link>
                <button onClick={startEdit} aria-label="Rename project" className="shrink-0 text-white/40 hover:text-violet-300 transition-colors p-0.5">
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            <div className="text-sm text-white/60 mt-0.5">{(p.slides || []).length} slides · {format(new Date(p.updated_date), 'MMM d, yyyy')}</div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button onClick={share} aria-label="Share design" className={BTN_BASE}>
              <Share2 className={ICON} />
            </button>
            <button
              onClick={onTrash}
              aria-label="Delete design"
              className={`${BTN_BASE} hover:!bg-red-500/25 hover:!text-red-300`}
            >
              <Trash2 className={ICON} />
            </button>
          </div>
        </div>
      </div>
      <ShareModal open={shareOpen} url={shareUrl} title={p.name} projectId={p.id} onClose={() => setShareOpen(false)} />
      <ConfirmDeleteModal open={deleteOpen} name={p.name} onConfirm={confirmDelete} onClose={() => setDeleteOpen(false)} />
    </>
  );
}