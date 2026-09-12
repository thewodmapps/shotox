import React, { useEffect, useRef, useState } from 'react';
import SlideCanvas from '@/components/editor/SlideCanvas';
import { resolveSlide } from '@/lib/deviceOverrides';

// In-flow thumbnail: the slide defines its own height from its device aspect
// ratio (SlideCanvas renders at width × width·h/w), so the preview always fits
// exactly — no CSS aspect-ratio / flex-stretch interaction that can clip the
// content. Renders a clean, scaled-down copy of the editor slide.
export default function ProjectThumb({ slide, device }) {
  const ref = useRef(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className="w-full overflow-hidden rounded-md">
      {w > 0 && <SlideCanvas slide={resolveSlide(slide, device?.id)} device={device} width={w} />}
    </div>
  );
}