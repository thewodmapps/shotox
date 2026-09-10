import React, { useRef, useState, useCallback } from 'react';

// Touch-only pull-to-refresh. Desktop mouse input never triggers it (only
// touchstart/move/end are wired). Respects overscroll-behavior: contain and
// only activates when the page is already scrolled to the top, so it never
// fights a sticky header or native scroll.
const THRESHOLD = 70;

export default function PullToRefresh({ onRefresh, children }) {
  const [pull, setPull] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(0);
  const pulling = useRef(false);

  const onTouchStart = useCallback((e) => {
    if (refreshing || window.scrollY > 0) return;
    startY.current = e.touches[0].clientY;
    pulling.current = true;
  }, [refreshing]);

  const onTouchMove = useCallback((e) => {
    if (!pulling.current || refreshing) return;
    const dy = e.touches[0].clientY - startY.current;
    if (dy <= 0) {
      setPull(0);
      return;
    }
    // dampen the drag so it feels elastic
    setPull(Math.min(dy * 0.5, THRESHOLD * 1.4));
  }, [refreshing]);

  const onTouchEnd = useCallback(async () => {
    if (!pulling.current) return;
    pulling.current = false;
    if (pull >= THRESHOLD) {
      setRefreshing(true);
      setPull(THRESHOLD);
      try {
        await onRefresh?.();
      } finally {
        setRefreshing(false);
        setPull(0);
      }
    } else {
      setPull(0);
    }
  }, [pull, onRefresh]);

  return (
    <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} className="scroll-contain">
      <div className="flex items-center justify-center overflow-hidden" style={{ height: pull }}>
        <div className={`w-6 h-6 border-2 border-white/15 border-t-white rounded-full ${refreshing ? 'animate-spin' : ''}`} />
      </div>
      {children}
    </div>
  );
}