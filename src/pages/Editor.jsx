import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { makeId, makeFeatureSlide, getDevice, resolveDevice } from '@/lib/templates';

const FEATURE_DEVICE = getDevice('feature-graphic');
import { exportSlide, exportAllSlides, wait } from '@/lib/exportSlides';
import { useAuth } from '@/lib/AuthContext';
import { isPro } from '@/lib/entitlements';
import ExportOverlay from '@/components/editor/ExportOverlay';
import UpgradeModal from '@/components/editor/UpgradeModal';
import EditorTopbar from '@/components/editor/EditorTopbar';
import EditorRail from '@/components/editor/EditorRail';
import EditorPanel from '@/components/editor/EditorPanel';
import EditorStage from '@/components/editor/EditorStage';
import SlideCanvas from '@/components/editor/SlideCanvas';
import UndoBar from '@/components/editor/UndoBar';
import ShareModal from '@/components/projects/ShareModal';

export default function Editor() {
  const id = new URLSearchParams(window.location.search).get('id');
  const navigate = useNavigate();
  const { user } = useAuth();
  const pro = isPro(user);
  const [project, setProject] = useState(null);
  const [missing, setMissing] = useState(false);
  const [sel, setSel] = useState(0);
  const [panel, setPanel] = useState('templates');
  const [mobileOpen, setMobileOpen] = useState(true);
  const [status, setStatus] = useState('saved');
  const [exporting, setExporting] = useState(false);
  const [exportPct, setExportPct] = useState(0);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [undo, setUndo] = useState(null);
  const dirty = useRef(false);
  const exportRefs = useRef([]);
  const featureExportRef = useRef(null);
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
      const { name, platform, device, template_id, slides, feature, uploads, custom_w, custom_h } = project;
      try {
        await base44.entities.Project.update(project.id, { name, platform, device, template_id, slides, feature, uploads, custom_w, custom_h });
        setStatus('saved');
      } catch (e) {
        setStatus('error');
      }
    }, 1200);
    return () => clearTimeout(tm);
  }, [project]);

  const retrySave = async () => {
    if (!project) return;
    setStatus('saving');
    const { name, platform, device, template_id, slides, feature, uploads, custom_w, custom_h } = project;
    try {
      await base44.entities.Project.update(project.id, { name, platform, device, template_id, slides, feature, uploads, custom_w, custom_h });
      setStatus('saved');
    } catch (e) {
      setStatus('error');
    }
  };

  // The feature graphic is an independent slide, separate from the phone
  // `slides` array. Seed it from the first phone slide the first time the user
  // switches to a feature-graphic device, so it starts on-brand — then it stays
  // fully independent from the phone screenshots.
  useEffect(() => {
    if (!project) return;
    if (resolveDevice(project).form !== 'feature') return;
    if (project.feature) return;
    const src = project.slides[0];
    dirty.current = true;
    setProject((p) => (p.feature ? p : { ...p, feature: src ? { ...src, id: makeId() } : makeFeatureSlide() }));
  }, [project?.device]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const updateProject = (patch) => {
    dirty.current = true;
    setProject((p) => {
      const next = { ...p, ...patch };
      // Seed the independent feature slide the moment the resolved device is a
      // feature graphic, so panels never see an undefined slide.
      if (resolveDevice(next).form === 'feature' && !next.feature) {
        next.feature = p.slides[0] ? { ...p.slides[0], id: makeId() } : makeFeatureSlide();
      }
      return next;
    });
  };
  const isFeature = resolveDevice(project).form === 'feature';
  // Feature mode edits the independent `feature` slide; phone mode edits the
  // selected phone slide. The two never share data.
  const updateSlide = (patch) => {
    if (isFeature) updateProject({ feature: { ...(project.feature || makeFeatureSlide(project.slides[0] || {})), ...patch } });
    else updateProject({ slides: project.slides.map((s, i) => (i === sel ? { ...s, ...patch } : s)) });
  };
  // Typography (font, alignment, text colors) is project-wide across phone slides
  // so every screenshot stays consistent. In feature mode it only touches the
  // independent feature slide.
  const updateTextStyle = (patch) => {
    if (isFeature) updateProject({ feature: { ...project.feature, ...patch } });
    else updateProject({ slides: project.slides.map((s) => ({ ...s, ...patch })) });
  };
  const addSlide = () => { updateProject({ slides: [...project.slides, { ...project.slides[sel], id: makeId(), screenshotUrl: '' }] }); setSel(project.slides.length); };

  // Templates & AI are hidden in feature mode — drop them if active there.
  useEffect(() => {
    if (isFeature && (panel === 'templates' || panel === 'ai')) setPanel('text');
  }, [isFeature, panel]);
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
    exportTarget.current = 0;
    setExportPct(0);
    setExporting(true);
    const onProgress = (p) => { exportTarget.current = p; };
    const device = resolveDevice(project);
    const base = project.name.replace(/\s+/g, '-');
    try {
      if (isFeature) {
        await exportSlide(featureExportRef.current, device, base + '-feature-graphic', format, onProgress);
      } else if (which === 'all') {
        const els = project.slides.map((_, i) => exportRefs.current[i]).filter(Boolean);
        await exportAllSlides(els, device, base, format, onProgress);
      } else {
        await exportSlide(exportRefs.current[sel], device, String(sel + 1), format, onProgress);
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

  const slide = isFeature ? (project.feature || makeFeatureSlide(project.slides[0] || {})) : (project.slides[sel] || project.slides[0]);
  const device = resolveDevice(project);
  const panelProps = { slide, updateSlide, updateTextStyle, project, updateProject, isPro: pro, onLocked: () => setShowUpgrade(true), freeDevice: !pro ? user?.free_device || null : null };
  return (
    <div className="h-screen flex flex-col bg-[#08080d]">
      <EditorTopbar project={project} status={status} exporting={exporting} isFeature={isFeature} onRename={(name) => updateProject({ name })} onExport={onExport} onShare={() => setShowShare(true)} onRetry={retrySave} />
      <div className="flex-1 min-h-0 flex flex-col md:flex-row relative">
        <EditorRail
          active={panel}
          mobileOpen={mobileOpen}
          isFeature={isFeature}
          onChange={(id) => {
            if (id === panel && mobileOpen) setMobileOpen(false);
            else { setPanel(id); setMobileOpen(true); }
          }}
        />
        <EditorPanel active={panel} mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} {...panelProps} />
        <EditorStage project={project} selected={sel} onSelect={setSel} onAdd={addSlide} onDuplicate={duplicate} onDelete={remove} onMove={move} watermark={!pro} isFeature={isFeature} feature={project.feature} />
      </div>
      <UndoBar undo={undo} onUndo={restoreSlide} />
      <div className="fixed -left-[5000px] top-0 pointer-events-none" aria-hidden>
        {project.feature && (
          <SlideCanvas key="feature-export" slide={project.feature} device={FEATURE_DEVICE} watermark={!pro} width={FEATURE_DEVICE.w} ref={(el) => (featureExportRef.current = el)} />
        )}
        {project.slides.map((s, i) => (
          <SlideCanvas key={s.id} slide={s} device={device} watermark={!pro} width={device.w} ref={(el) => (exportRefs.current[i] = el)} />
        ))}
      </div>
      {exporting && <ExportOverlay pct={exportPct} />}
      <UpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} onUpgrade={() => navigate('/#pricing')} />
      <ShareModal open={showShare} title={project.name} projectId={project.id} onClose={() => setShowShare(false)} />
    </div>
  );
}