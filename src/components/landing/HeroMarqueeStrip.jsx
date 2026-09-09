import React from 'react';
import { Link } from 'react-router-dom';
import { TEMPLATES, getDevice } from '@/lib/templates';
import { useAuth } from '@/lib/AuthContext';
import ScaledSlide from '@/components/editor/ScaledSlide';

// A thin, 3D-perspective auto-scrolling strip of template thumbnails — acts as
// a modern divider between the hero and the features section. Conveys breadth
// (100 templates) early without crowding the hero. Pauses on hover.
const DEVICE = getDevice('iphone-6.7');

export default function HeroMarqueeStrip() {
  const { isAuthenticated } = useAuth();
  const dest = isAuthenticated ? '/projects' : `/login?returnTo=${encodeURIComponent('/projects')}`;
  const items = TEMPLATES.slice(10, 28);
  const row = [...items, ...items];

  return (
    <section className="relative bg-[#0B0B12] pt-2 pb-10 overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[700px] h-[260px] rounded-full bg-violet-600/20 blur-[120px] pointer-events-none" />
      <p className="relative text-center text-xs font-medium text-white/40 mb-5 tracking-wide uppercase">
        100 designer templates — one click away
      </p>
      <div className="relative [perspective:1400px]">
        <div className="relative overflow-hidden mask-marquee [transform:rotateX(14deg)] origin-center">
          <div className="flex gap-3 w-max marquee-track py-4">
            {row.map((tpl, idx) => (
              <Link
                key={`${tpl.id}-${idx}`}
                to={dest}
                className="group block w-28 shrink-0 rounded-xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-violet-400/60 hover:scale-[1.06] transition-all duration-300 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)]"
              >
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: `${DEVICE.w} / ${DEVICE.h}` }}>
                  <ScaledSlide slide={tpl.slides[0]} device={DEVICE} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}