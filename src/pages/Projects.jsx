import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { getTemplate, makeId, makeSlide, solid } from '@/lib/templates';
import ProjectsHeader from '@/components/projects/ProjectsHeader';
import CreateCards from '@/components/projects/CreateCards';
import TemplateGallery from '@/components/projects/TemplateGallery';
import SavedDesigns from '@/components/projects/SavedDesigns';

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [creating, setCreating] = useState(null);

  useEffect(() => { base44.entities.Project.list('-updated_date', 50).then(setProjects); }, []);

  const create = async (templateId, platform, scratch = false) => {
    setCreating(platform);
    const tpl = getTemplate(templateId);
    const slides = scratch
      ? [makeSlide({ bg: solid('#0B0B12') }), makeSlide({ bg: solid('#0B0B12'), layout: 'phone-top' })]
      : tpl.slides.map((s) => ({ ...s, id: makeId() }));
    const p = await base44.entities.Project.create({
      name: 'Untitled project',
      platform,
      device: platform === 'android' ? 'android-phone' : 'iphone-6.7',
      template_id: scratch ? '' : tpl.id,
      slides,
      uploads: [],
    });
    navigate(`/editor?id=${p.id}`);
  };

  const remove = async (id) => {
    await base44.entities.Project.delete(id);
    setProjects((ps) => ps.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F5F5F8] font-body">
      <ProjectsHeader />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">
        <CreateCards onCreate={create} creating={creating} />
        <SavedDesigns projects={projects} onDelete={remove} />
        <TemplateGallery onCreate={create} creating={creating} />
      </div>
    </div>
  );
}