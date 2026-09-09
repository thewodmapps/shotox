import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, FolderOpen, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { resolveDevice } from '@/lib/templates';
import ScaledSlide from '@/components/editor/ScaledSlide';

export default function SavedDesigns({ projects, onDelete }) {
  return (
    <section>
      <h2 className="font-display text-xl font-bold text-white mb-5 flex items-center gap-2.5">
        <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500/25 to-pink-500/25 border border-white/10 grid place-items-center">
          <FolderOpen className="w-4 h-4 text-violet-200" />
        </span>
        My saved designs
        {projects.length > 0 && <span className="text-sm font-normal text-white/40 ml-1">· {projects.length}</span>}
      </h2>
      {projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-10 text-center">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 border border-white/10 grid place-items-center mb-3">
            <Sparkles className="w-5 h-5 text-violet-200" />
          </div>
          <p className="text-sm text-white/60">No designs yet — pick a canvas above to create your first set of screenshots.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <div key={p.id} className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-white/25 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/10 transition-all">
              <Link to={`/editor?id=${p.id}`} className="block">
                <div className="flex gap-1 p-2 bg-[#0B0B12]">
                  {(p.slides || []).slice(0, 3).map((s) => (
                    <div key={s.id} className="flex-1 aspect-[1290/2796] relative overflow-hidden rounded-md"><ScaledSlide slide={s} device={resolveDevice(p)} /></div>
                  ))}
                </div>
                <div className="px-4 py-3.5">
                  <div className="font-semibold text-sm text-white truncate">{p.name}</div>
                  <div className="text-xs text-white/40 mt-0.5">{(p.slides || []).length} slides · {format(new Date(p.updated_date), 'MMM d, yyyy')}</div>
                </div>
              </Link>
              <button onClick={() => onDelete(p.id)} aria-label="Delete design" className="absolute top-3 right-3 p-2 rounded-lg bg-black/60 backdrop-blur text-white opacity-0 group-hover:opacity-100 hover:bg-red-500/25 hover:text-red-300 transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}