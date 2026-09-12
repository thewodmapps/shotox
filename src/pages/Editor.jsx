import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { makeId, resolveDevice, getTemplate, makeSlide, solid, DEVICES } from '@/lib/templates';
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
  const exportTarget = useRef(0);
  const undoTimer = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const history = useRef([]);
  const hPtr = useRef(-1);
  const histTimer = useRef(null);
  const pendingRef = useRef(null);

  const syncFlags = () => {
    setCanUndo(hPtr.current >= 0);
    setCanRedo(hPtr.current < history.current.length - 1);
  };

  const flushPending = () => {
    clearTimeout(histTimer.current);
    const entry = pendingRef.current;
    pendingRef.current = null;
    if (!entry) return;
    if (JSON.stringify(entry.before) === JSON.stringify(entry.after)) { syncFlags(); return; }
    history.current = history.current.slice(0, hPtr.current + 1);
    history.current.push(entry);
    if (history.current.length > 60) history.current.shift();
    hPtr.current = history.current.length - 1;
    syncFlags();
  };

  // Debounced, per-target history. Rapid edits to the same slide merge into
  // one undo step (first before → last after). Switching to a different slide
  // or a structural change flushes the pending entry immediately.
  const queueHistory = (entry) => {
    if (pendingRef.current) {
      const sameSlide = entry.type === 'slide' && pendingRef.current.type === 'slide' && entry.idx === pendingRef.current.idx;
      const sameAll = entry.type === 'all' && pendingRef.current.type === 'all';
      if (sameSlide || sameAll) {
        pendingRef.current = { ...pendingRef.current, after: entry.after };
      } else {
        flushPending();
        pendingRef.current = entry;
      }
    } else {
      pendingRef.current = entry;
    }
    setCanUndo(true);
    setCanRedo(false);
    clearTimeout(histTimer.current);
    histTimer.current = setTimeout(flushPending, 400);
  };

  const undoEdit = () => {
    flushPending();
    if (hPtr.current < 0) return;
    const entry = history.current[hPtr.current];
    if (entry.type === 'slide') {
      setProject((p) => ({ ...p, slides: p.slides.map((s, i) => (i === entry.idx ? entry.before : s)) }));
      setSel(entry.idx);
    } else {
      setProject((p) => ({ ...p, slides: entry.before }));
    }
    hPtr.current--;
    syncFlags();
    dirty.current = true;
  };

  const redoEdit = () => {
    flushPending();
    if (hPtr.current >= history.current.length - 1) return;
    hPtr.current++;
    const entry = history.current[hPtr.current];
    if (entry.type === 'slide') {
      setProject((p) => ({ ...p, slides: p.slides.map((s, i) => (i === entry.idx ? entry.after : s)) }));
      setSel(entry.idx);
    } else {
      setProject((p) => ({ ...p, slides: entry.after }));
    }
    syncFlags();
    dirty.current = true;
  };

  useEffect(() => {
    if (!id) return setMissing(true);
    base44.entities.Project.get(id).then((p) => {
      if (!p) return setMissing(true);
      // Per-device slide store. `slides` is the authoritative state of the
      // currently-active device; deviceSlides holds the other devices. On
      // load we refresh the active device's entry from `slides` so it never
      // goes stale, and generate a fresh template set for any empty device.
      const ds = { ...(p.deviceSlides || {}) };
      let active = (p.slides && p.slides.length)
        ? p.slides
        : (ds[p.device] && ds[p.device].length ? ds[p.device] : freshSlidesFor(p));
      ds[p.device] = active;
      setProject({ ...p, deviceSlides: ds, slides: active });
      history.current = [];
      hPtr.current = -1;
      pendingRef.current = null;
      setCanUndo(false);
      setCanRedo(false);
    });
  }, [id]);

  useEffect(() => {
    if (!project || !dirty.current) return;
    setStatus('dirty');
    const tm = setTimeout(async () => {
      setStatus('saving');
      const { name, platform, device, template_id, slides, uploads, custom_w, custom_h, deviceSlides } = project;
      try {
        await base44.entities.Project.update(project.id, { name, platform, device, template_id, slides, uploads, custom_w, custom_h, deviceSlides: { ...deviceSlides, [device]: slides } });
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
    const { name, platform, device, template_id, slides, uploads, custom_w, custom_h, deviceSlides } = project;
    try {
      await base44.entities.Project.update(project.id, { name, platform, device, template_id, slides, uploads, custom_w, custom_h, deviceSlides: { ...deviceSlides, [device]: slides } });
      setStatus('saved');
    } catch (e) {
      setStatus('error');
    }
  };

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
  const updateSlide = (patch) => {
    const before = project.slides[sel];
    const after = { ...before, ...patch };
    queueHistory({ type: 'slide', idx: sel, before, after });
    updateProject({ slides: project.slides.map((s, i) => (i === sel ? after : s)) });
  };
  // Typography (font, alignment, text colors) is project-wide so every slide stays consistent.
  const updateTextStyle = (patch) => {
    const before = project.slides;
    const after = project.slides.map((s) => ({ ...s, ...patch }));
    queueHistory({ type: 'all', before, after });
    updateProject({ slides: after });
  };

  // Fresh, unedited slide set from the project's template — used when the user
  // opens a device they haven't customized yet. Each device is an independent
  // editing session, so a new device starts from the template, never a copy of
  // another device's edits.
  const freshSlidesFor = (p) => {
    if (p.template_id) {
      const tpl = getTemplate(p.template_id);
      return tpl.slides.map((s) => ({ ...s, id: makeId() }));
    }
    return [makeSlide({ bg: solid('#0B0B12') }), makeSlide({ bg: solid('#0B0B12'), layout: 'phone-top' })];
  };

  // Switching device is a full context switch: park the current device's slides
  // under their key in deviceSlides, then load (or create) the target device's
  // own slide set. Undo history is reset so undo never crosses devices.
  const switchDevice = (newDevice, platform) => {
    setProject((p) => {
      if (newDevice === p.device) return p;
      const ds = { ...(p.deviceSlides || {}) };
      ds[p.device] = p.slides;
      let next = ds[newDevice];
      if (!next || !next.length) {
        next = freshSlidesFor(p);
        ds[newDevice] = next;
      }
      return { ...p, device: newDevice, platform: platform ?? p.platform, slides: next, deviceSlides: ds };
    });
    setSel(0);
    dirty.current = true;
    history.current = [];
    hPtr.current = -1;
    pendingRef.current = null;
    setCanUndo(false);
    setCanRedo(false);
  };

  // AI copy is common across devices: generating copy writes the headlines to
  // every device's slides (visited or not), so all devices share the same copy
  // while keeping their own layout, screenshot and color edits.
  const applyAICopy = (copySlides) => {
    const apply = (arr) => (arr || []).map((s, i) => ({
      ...s,
      heading: copySlides[i]?.heading || s.heading,
      subheading: copySlides[i]?.subheading || s.subheading,
    }));
    setProject((p) => {
      const newSlides = apply(p.slides);
      const ds = { ...(p.deviceSlides || {}) };
      ds[p.device] = newSlides;
      Object.keys(ds).forEach((k) => { if (k !== p.device) ds[k] = apply(ds[k]); });
      DEVICES.forEach((d) => { if (!ds[d.id]) ds[d.id] = apply(freshSlidesFor(p)); });
      if (!ds['custom']) ds['custom'] = apply(freshSlidesFor(p));
      return { ...p, slides: newSlides, deviceSlides: ds };
    });
    dirty.current = true;
  };
  const addSlide = () => {
    const before = project.slides;
    const after = [...project.slides, { ...project.slides[sel], id: makeId(), screenshotUrl: '' }];
    queueHistory({ type: 'all', before, after });
    updateProject({ slides: after });
    setSel(project.slides.length);
  };
  const duplicate = (i) => {
    const before = project.slides;
    const s = [...before]; s.splice(i + 1, 0, { ...s[i], id: makeId() });
    queueHistory({ type: 'all', before, after: s });
    updateProject({ slides: s });
    setSel(i + 1);
  };

  const remove = (i) => {
    const removed = project.slides[i];
    const before = project.slides;
    const s = before.filter((_, k) => k !== i);
    queueHistory({ type: 'all', before, after: s });
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

  const move = (from, to) => {
    const before = project.slides;
    const s = [...before]; const [m] = s.splice(from, 1); s.splice(to, 0, m);
    queueHistory({ type: 'all', before, after: s });
    updateProject({ slides: s });
    setSel(to);
  };

  const onExport = async (which, format) => {
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

  const device = resolveDevice(project);
  const slide = project.slides[sel] || project.slides[0];
  const panelProps = { slide, updateSlide, updateTextStyle, project, updateProject, switchDevice, applyAICopy, isPro: pro, onLocked: () => setShowUpgrade(true), freeDevice: !pro ? user?.free_device || null : null };
  return (
    <div className="h-screen flex flex-col bg-[#08080d]">
      <EditorTopbar project={project} status={status} exporting={exporting} onRename={(name) => updateProject({ name })} onExport={onExport} onShare={() => setShowShare(true)} onRetry={retrySave} />
      <div className="flex-1 min-h-0 flex flex-col md:flex-row relative">
        <EditorRail
          active={panel}
          mobileOpen={mobileOpen}
          onChange={(id) => {
            if (id === panel && mobileOpen) setMobileOpen(false);
            else { setPanel(id); setMobileOpen(true); }
          }}
        />
        <EditorPanel active={panel} mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} {...panelProps} />
        <EditorStage project={project} selected={sel} onSelect={setSel} onAdd={addSlide} onDuplicate={duplicate} onDelete={remove} onMove={move} watermark={!pro} onUndo={undoEdit} onRedo={redoEdit} canUndo={canUndo} canRedo={canRedo} />
      </div>
      <UndoBar undo={undo} onUndo={restoreSlide} />
      <div className="fixed -left-[5000px] top-0 pointer-events-none" aria-hidden>
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