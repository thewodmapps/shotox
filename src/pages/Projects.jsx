import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { isPro } from '@/lib/entitlements';
import { getTemplate, makeId, makeSlide, solid } from '@/lib/templates';
import ProjectsHeader from '@/components/projects/ProjectsHeader';
import CreateCards from '@/components/projects/CreateCards';
import TemplateGallery from '@/components/projects/TemplateGallery';
import SavedDesigns from '@/components/projects/SavedDesigns';
import WelcomeModal from '@/components/projects/WelcomeModal';
import UpgradeModal from '@/components/editor/UpgradeModal';
import PullToRefresh from '@/components/PullToRefresh';

export default function Projects() {
  const navigate = useNavigate();
  const { user, checkUserAuth } = useAuth();
  const pro = isPro(user);
  const freeDevice = !pro ? user?.free_device || null : null;
  const [projects, setProjects] = useState([]);
  const [creating, setCreating] = useState(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(() => { base44.entities.Project.list('-updated_date', 50).then(setProjects); }, []);

  const reloadProjects = async () => {
    const list = await base44.entities.Project.list('-updated_date', 50);
    setProjects(list);
  };

  const create = async ({ templateId, platform = 'ios', device, customW, customH, scratch = false }) => {
    setCreating(platform);
    try {
      const tpl = getTemplate(templateId);
      const devId = device || (platform === 'android' ? 'android-phone' : 'iphone-6.7');
      const slides = scratch
        ? [makeSlide({ bg: solid('#0B0B12') }), makeSlide({ bg: solid('#0B0B12'), layout: 'phone-top' })]
        : tpl.slides.map((s) => ({ ...s, id: makeId() }));
      const p = await base44.entities.Project.create({
        name: 'Untitled project',
        platform: devId === 'feature-graphic' ? 'android' : platform,
        device: devId,
        template_id: scratch ? '' : tpl.id,
        slides,
        deviceSlides: { [devId]: slides },
        uploads: [],
        custom_w: devId === 'custom' ? customW : undefined,
        custom_h: devId === 'custom' ? customH : undefined,
      });
      // Lock in the free user's one chosen device on first project creation.
      if (!pro && !user?.free_device && devId !== 'custom') {
        try { await base44.auth.updateMe({ free_device: devId }); checkUserAuth(); } catch {}
      }
      navigate(`/editor?id=${p.id}`);
    } finally {
      setCreating(null);
    }
  };

  const remove = async (id) => {
    await base44.entities.Project.delete(id);
    setProjects((ps) => ps.filter((p) => p.id !== id));
  };

  const rename = (id, name) => setProjects((ps) => ps.map((p) => (p.id === id ? { ...p, name } : p)));

  return (
    <div className="min-h-screen bg-[#08080d] font-body text-white relative app-shell">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-24 w-[520px] h-[520px] rounded-full bg-violet-600/20 blur-[130px]" />
        <div className="absolute top-40 -right-24 w-[460px] h-[460px] rounded-full bg-pink-500/15 blur-[130px]" />
        <div className="absolute bottom-0 left-1/3 w-[380px] h-[380px] rounded-full bg-orange-500/10 blur-[130px]" />
      </div>
      <div className="relative z-10">
        <ProjectsHeader />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 pb-28 md:pb-16 space-y-16 scroll-contain">
          <CreateCards onCreate={create} creating={creating} isPro={pro} onLocked={() => setShowUpgrade(true)} freeDevice={freeDevice} />
          <SavedDesigns projects={projects} onDelete={remove} onRename={rename} />
          <TemplateGallery onCreate={create} creating={creating} isPro={pro} onLocked={() => setShowUpgrade(true)} />
        </div>
      </div>
      <PullToRefresh onRefresh={reloadProjects} />
      <UpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} onUpgrade={() => navigate('/#pricing')} />
      <WelcomeModal />
    </div>
  );
}