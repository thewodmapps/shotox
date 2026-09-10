import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, ArrowLeft, ArrowRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { resolveDevice } from '@/lib/templates';
import AppNavbar from '@/components/AppNavbar';
import ScaledSlide from '@/components/editor/ScaledSlide';

export default function SharedDesign() {
  const id = new URLSearchParams(window.location.search).get('p');
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return setError('no_id');
    base44.functions
      .invoke('getSharedProject', { id })
      .then((res) => setProject(res.data))
      .catch(() => setError('load_failed'));
  }, [id]);

  if (error === 'no_id') {
    return <CenteredNote title="Invalid link" body="This share link is missing a project reference." />;
  }
  if (error) {
    return <CenteredNote title="Design unavailable" body="This shared design could not be loaded. It may have been deleted or the link is invalid." />;
  }
  if (!project) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#08080d]">
        <Loader2 className="w-6 h-6 text-white/60 animate-spin" />
      </div>
    );
  }

  const device = resolveDevice(project);
  const count = (project.slides || []).length;

  return (
    <div className="min-h-screen bg-[#08080d] text-white flex flex-col">
      <AppNavbar />

      <main className="flex-1 px-5 pt-28 pb-8 max-w-6xl mx-auto w-full">
        <div className="mb-6 text-center">
          <h1 className="font-display text-2xl sm:text-3xl font-bold">{project.name || 'Shared design'}</h1>
          <p className="text-white/50 text-sm mt-1">{count} slide{count === 1 ? '' : 's'}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(project.slides || []).map((s) => (
            <div key={s.id} className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] shadow-xl">
              <div className="aspect-[1290/2796] relative">
                <ScaledSlide slide={s} device={device} />
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="px-5 pt-6 pb-24 md:pb-6 text-center text-white/40 text-xs border-t border-white/10">
        Made with <span className="shotox-gradient-text font-semibold">Shotox</span>
      </footer>
    </div>
  );
}

function CenteredNote({ title, body }) {
  return (
    <div className="min-h-screen grid place-items-center bg-[#08080d] text-white text-center p-6">
      <div>
        <h1 className="text-xl font-display font-bold mb-2">{title}</h1>
        <p className="text-white/50 max-w-sm mx-auto mb-5">{body}</p>
        <Link to="/" className="inline-block px-4 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition text-sm font-semibold">
          Go to Shotox
        </Link>
      </div>
    </div>
  );
}