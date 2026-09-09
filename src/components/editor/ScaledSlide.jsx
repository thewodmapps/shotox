import React, { useEffect, useRef, useState } from 'react';
import SlideCanvas from './SlideCanvas';

// Renders a slide that fills its parent's width (parent must be positioned with an aspect ratio).
export default function ScaledSlide({ slide, deviceId = 'iphone-6.7' }) {
  const ref = useRef(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className="absolute inset-0">
      {w > 0 && <SlideCanvas slide={slide} deviceId={deviceId} width={w} />}
    </div>
  );
}