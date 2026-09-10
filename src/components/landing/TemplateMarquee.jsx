import React from 'react';
import { Link } from 'react-router-dom';
import { TEMPLATES, getDevice } from '@/lib/templates';
import { useAuth } from '@/lib/AuthContext';
import ScaledSlide from '@/components/editor/ScaledSlide';

// An auto-scrolling strip of template thumbnails — conveys the sheer breadth
// of the library (100 templates, every category) at a glance. Pauses on hover.
const DEVICE = getDevice('iphone-6.7');

export default function TemplateMarquee() {
  const { isAuthenticated } = useAuth();
  const dest = isAuthenticated ? '/projects' : `/login?returnTo=${encodeURIComponent('/projects')}`;
  const items = TEMPLATES.slice(0, 18);
  const row = [...items, ...items];

  return (
    <div className="relative mt-10 overflow-hidden mask-marquee">
      <div className="flex gap-3 w-max marquee-track">
        {row.map((tpl, idx) => (
          <Link
            key={`${tpl.id}-${idx}`}
            to={dest}
            className="group block w-36 shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-violet-400/60 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: `${DEVICE.w} / ${DEVICE.h}` }}>
              <ScaledSlide slide={tpl.slides[0]} device={DEVICE} />
            </div>
            <div className="px-2.5 py-2">
              <span className="block text-xs font-medium text-white/80 truncate">{tpl.name}</span>
              <span className="block text-[10px] text-white/40 truncate">{tpl.category}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}