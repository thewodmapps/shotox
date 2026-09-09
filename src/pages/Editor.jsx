import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { makeId, getDevice } from '@/lib/templates';
import { exportSlide, wait } from '@/lib/exportSlides';
import EditorTopbar from '@/components/editor/EditorTopbar';
import EditorRail from '@/components/editor/EditorRail';
import EditorPanel from '@/components/editor/EditorPanel';
import EditorStage from '@/components/editor/EditorStage';
import SlideCanvas from '@/components/editor/SlideCanvas';

export default function Editor() {
  const id = new URLSearchParams(window.location.search).get('id');
  const [project, setProject] = useState(null);
  const [missing, setMissing] = useState(false);
  const [sel, setSel] = useState(0);
  const [panel, setPanel] = useState('templates');
  const [status, setStatus] = useState('saved');
  const [exporting, setExporting] = useState(false);
  const dirty = useRef(false);
  const exportRefs = useRef([]);

  useEffect(() => {
    if (!id) return setMissing(true);
    base44.entities.Project.get(id).then((p) => (p ? setProject(p) : setMissing(true)));
  }, [id]);

  useEffect(() => {
    if (!project || !dirty.current) return;
    setStatus('dirty');
    const tm = setTimeout(async () => {
      setStatus('saving');
      const { name, platform, device, template_id, slides, uploads } = project;
      await base44.entities.Project.update(project.id, { name, platform, device, template_id, slides, uploads });
      setStatus('saved');
    }, 1200);
    return () => clearTimeout(tm);
  }, [project]);

  const updateProject = (patch) => { dirty.current = true; setProject((p) => ({ ...p, ...patch })); };
  const updateSlide = (patch) => updateProject({ slides: project.slides.map((s, i) => (i === sel ? { ...s, ...patch } : s)) });
  const addSlide = () => { updateProject({ slides: [...project.slides, { ...project.slides[sel], id: makeId(), screenshotUrl: '' }] }); setSel(project.slides.length); };
  const duplicate = (i) => { const s = [...project.slides]; s.splice(i + 1, 0, { ...s[i], id: makeId() }); updateProject({ slides: s }); setSel(i + 1); };
  const remove = (i) => { const s = project.slides.filter((_, k) => k !== i); updateProject({ slides: s }); setSel(Math.max(0, Math.min(sel, s.length - 1))); };
  const move = (from, to) => { const s = [...project.slides]; const [m] = s.splice(from, 1); s.splice(to, 0, m); updateProject({ slides: s }); setSel(to); };

  const onExport = async (which, format) => {
    setExporting(true);
    const device = getDevice(project.device);
    const idx = which === 'all' ? project.slides.map((_, i) => i) : [sel];
    for (const i of idx) {
      await exportSlide(exportRefs.current[i], device, `${project.name.replace(/\s+/g, '-')}-${i + 1}`, format);
      if (idx.length > 1) await wait(400);
    }
    setExporting(false);
  };

  if (missing) return (
    <div className="min-h-screen grid place-items-center bg-[#0B0B12] text-white text-center p-6">
      <div><p className="text-lg font-display">This project could not be found.</p><Link to="/projects" className="underline text-white/60 mt-2 inline-block">Back to projects</Link></div>
    </div>
  );
  if (!project) return <div className="min-h-screen grid place-items-center bg-[#0B0B12]"><Loader2 className="w-6 h-6 text-white/60 animate-spin" /></div>;

  const slide = project.slides[sel] || project.slides[0];
  const panelProps = { slide, updateSlide, project, updateProject };
  return (
    <div className="h-screen flex flex-col bg-[#08080d]">
      <EditorTopbar project={project} status={status} exporting={exporting} onRename={(name) => updateProject({ name })} onExport={onExport} />
      <div className="flex-1 min-h-0 flex flex-col md:flex-row">
        <EditorRail active={panel} onChange={setPanel} />
        <EditorPanel active={panel} {...panelProps} />
        <EditorStage project={project} selected={sel} onSelect={setSel} onAdd={addSlide} onDuplicate={duplicate} onDelete={remove} onMove={move} />
      </div>
      <div className="fixed -left-[5000px] top-0 pointer-events-none" aria-hidden>
        {project.slides.map((s, i) => (
          <SlideCanvas key={s.id} slide={s} deviceId={project.device} ref={(el) => (exportRefs.current[i] = el)} />
        ))}
      </div>
    </div>
  );
}