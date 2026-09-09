import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { makeId, resolveDevice } from '@/lib/templates';
import { exportSlide, exportAllSlides, wait } from '@/lib/exportSlides';
import { useAuth } from '@/lib/AuthContext';
import { isPro, FREE_MAX_DOWNLOADS } from '@/lib/entitlements';
import ExportOverlay from '@/components/editor/ExportOverlay';
import EditorTopbar from '@/components/editor/EditorTopbar';
import EditorRail from '@/components/editor/EditorRail';
import EditorPanel from '@/components/editor/EditorPanel';
import EditorStage from '@/components/editor/EditorStage';
import SlideCanvas from '@/components/editor/SlideCanvas';
import UndoBar from '@/components/editor/UndoBar';

export default function Editor() {
  const id = new URLSearchParams(window.location.search).get('id');
  const navigate = useNavigate();
  const { user, checkUserAuth } = useAuth();
  const pro = isPro(user);
  const [project, setProject] = useState(null);
  const [missing, setMissing] = useState(false);
  const [sel, setSel] = useState(0);
  const [panel, setPanel] = useState('templates');
  const [status, setStatus] = useState('saved');
  const [exporting, setExporting] = useState(false);
  const [exportPct, setExportPct] = useState(0);
  const [undo, setUndo] = useState(null);
  const dirty = useRef(false);
  const exportRefs = useRef([]);
  const exportTarget = useRef(0);
  const undoTimer = useRef(null);

  useEffect(() => {
    if (!id) return setMissing(true);
    base44.entities.Project.get(id).then((p) => (p ? setProject(p) : setMissing(true)));
  }, [id]);

  useEffect(() => {
    if (!project || !dirty.current) return;
    setStatus('dirty');
    const tm = setTimeout(async () => {
      setStatus('saving');
      const { name, platform, device, template_id, slides, uploads, custom_w, custom_h } = project;
      await base44.entities.Project.update(project.id, { name, platform, device, template_id, slides, uploads, custom_w, custom_h });
      setStatus('saved');
    }, 1200);
    return () => clearTimeout(tm);
  }, [project]);

  useEffect(() => {
    if (!exporting) return;
    const id = setInterval(() => {
      setExportPct((cur) => {
        const t = exportTarget.current;
        if (cur >= t) return cur;
        const step = Math.max(1, (t - cur) * 0.18);
        return Math.min(cur + step, t);
      });
    }, 50);
    return () => clearInterval(id);
  }, [exporting]);

  const updateProject = (patch) => { dirty.current = true; setProject((p) => ({ ...p, ...patch })); };
  const updateSlide = (patch) => updateProject({ slides: project.slides.map((s, i) => (i === sel ? { ...s, ...patch } : s)) });
  // Typography (font, alignment, text colors) is project-wide so every slide stays consistent.
  const updateTextStyle = (patch) => updateProject({ slides: project.slides.map((s) => ({ ...s, ...patch })) });
  const addSlide = () => { updateProject({ slides: [...project.slides, { ...project.slides[sel], id: makeId(), screenshotUrl: '' }] }); setSel(project.slides.length); };
  const duplicate = (i) => { const s = [...project.slides]; s.splice(i + 1, 0, { ...s[i], id: makeId() }); updateProject({ slides: s }); setSel(i + 1); };

  const remove = (i) => {
    const removed = project.slides[i];
    const s = project.slides.filter((_, k) => k !== i);
    updateProject({ slides: s });
    setSel(Math.max(0, Math.min(sel, s.length - 1)));
    setUndo({ slide: removed, index: i });
    clearTimeout(undoTimer.current);
    undoTimer.current = setTimeout(() => setUndo(null), 6000);
  };

  const restoreSlide = () => {
    if (!undo) return;
    const s = [...project.slides];
    s.splice(undo.index, 0, undo.slide);
    updateProject({ slides: s });
    setSel(undo.index);
    setUndo(null);
    clearTimeout(undoTimer.current);
  };

  const move = (from, to) => { const s = [...project.slides]; const [m] = s.splice(from, 1); s.splice(to, 0, m); updateProject({ slides: s }); setSel(to); };

  const onExport = async (which, format) => {
    if (!pro && (user?.free_downloads || 0) >= FREE_MAX_DOWNLOADS) {
      alert('Free plan includes 1 download. Upgrade to Pro for unlimited exports.');
      navigate('/#pricing');
      return;
    }
    exportTarget.current = 0;
    setExportPct(0);
    setExporting(true);
    const onProgress = (p) => { exportTarget.current = p; };
    const device = resolveDevice(project);
    const base = project.name.replace(/\s+/g, '-');
    try {
      if (which === 'all') {
        const els = project.slides.map((_, i) => exportRefs.current[i]).filter(Boolean);
        await exportAllSlides(els, device, base, format, onProgress);
      } else {
        await exportSlide(exportRefs.current[sel], device, String(sel + 1), format, onProgress);
      }
      if (!pro) {
        await base44.auth.updateMe({ free_downloads: (user?.free_downloads || 0) + 1 });
        checkUserAuth();
      }
      exportTarget.current = 100;
      await wait(400);
    } finally {
      setExporting(false);
    }
  };

  if (missing) return (
    <div className="min-h-screen grid place-items-center bg-[#0B0B12] text-white text-center p-6">
      <div><p className="text-lg font-display">This project could not be found.</p><Link to="/projects" className="underline text-white/60 mt-2 inline-block">Back to projects</Link></div>
    </div>
  );
  if (!project) return <div className="min-h-screen grid place-items-center bg-[#0B0B12]"><Loader2 className="w-6 h-6 text-white/60 animate-spin" /></div>;

  const slide = project.slides[sel] || project.slides[0];
  const device = resolveDevice(project);
  const panelProps = { slide, updateSlide, updateTextStyle, project, updateProject };
  return (
    <div className="h-screen flex flex-col bg-[#08080d]">
      <EditorTopbar project={project} status={status} exporting={exporting} onRename={(name) => updateProject({ name })} onExport={onExport} />
      <div className="flex-1 min-h-0 flex flex-col md:flex-row">
        <EditorRail active={panel} onChange={setPanel} />
        <EditorPanel active={panel} {...panelProps} />
        <EditorStage project={project} selected={sel} onSelect={setSel} onAdd={addSlide} onDuplicate={duplicate} onDelete={remove} onMove={move} />
      </div>
      <UndoBar undo={undo} onUndo={restoreSlide} />
      <div className="fixed -left-[5000px] top-0 pointer-events-none" aria-hidden>
        {project.slides.map((s, i) => (
          <SlideCanvas key={s.id} slide={s} device={device} ref={(el) => (exportRefs.current[i] = el)} />
        ))}
      </div>
      {exporting && <ExportOverlay pct={exportPct} />}
    </div>
  );
}