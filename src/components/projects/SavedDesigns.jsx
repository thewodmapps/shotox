import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, FolderOpen } from 'lucide-react';
import { format } from 'date-fns';
import { resolveDevice } from '@/lib/templates';
import ScaledSlide from '@/components/editor/ScaledSlide';

export default function SavedDesigns({ projects, onDelete }) {
  return (
    <section>
      <h2 className="font-display text-xl font-bold text-[#0B0B12] mb-4 flex items-center gap-2"><FolderOpen className="w-5 h-5" /> My saved designs</h2>
      {projects.length === 0 ? (
        <p className="text-sm text-[#0B0B12]/50 rounded-2xl border border-dashed border-black/10 p-6 text-center">No designs yet — pick a template above to create your first one.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <div key={p.id} className="group relative rounded-2xl overflow-hidden border border-black/5 bg-white hover:shadow-lg transition-shadow">
              <Link to={`/editor?id=${p.id}`} className="block">
                <div className="flex gap-1 p-2 bg-[#0B0B12]">
                  {(p.slides || []).slice(0, 3).map((s) => (
                    <div key={s.id} className="flex-1 aspect-[1290/2796] relative overflow-hidden rounded-md"><ScaledSlide slide={s} device={resolveDevice(p)} /></div>
                  ))}
                </div>
                <div className="px-4 py-3">
                  <div className="font-semibold text-sm text-[#0B0B12] truncate">{p.name}</div>
                  <div className="text-xs text-[#0B0B12]/50">{(p.slides || []).length} slides · {format(new Date(p.updated_date), 'MMM d, yyyy')}</div>
                </div>
              </Link>
              <button onClick={() => onDelete(p.id)} aria-label="Delete design" className="absolute top-3 right-3 p-2 rounded-lg bg-white/90 text-[#0B0B12] opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}