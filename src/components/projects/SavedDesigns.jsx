import React from 'react';
import { FolderOpen, Sparkles } from 'lucide-react';
import ProjectCard from './ProjectCard';

export default function SavedDesigns({ projects, onDelete, onRename }) {
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
            <ProjectCard key={p.id} project={p} onDelete={onDelete} onRename={onRename} />
          ))}
        </div>
      )}
    </section>
  );
}