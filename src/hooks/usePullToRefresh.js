import { useEffect, useRef, useState } from 'react';

// Native-style pull-to-refresh for touch devices only.
// Activates only when the scroll container (window) is at the very top, animates a
// small spinner while pulling, and invokes `onRefresh` on release past the threshold.
// Completely inert for mouse input — mouse events never fire touchstart/touchmove.
const THRESHOLD = 70;

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  (('ontouchstart' in window) || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches));

export function usePullToRefresh({ onRefresh, enabled = true }) {
  const [pull, setPull] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const startY = useRef(0);
  const pulling = useRef(false);
  const dist = useRef(0);
  const refreshingRef = useRef(false);
  const cbRef = useRef(onRefresh);

  useEffect(() => { cbRef.current = onRefresh; });

  useEffect(() => {
    if (!enabled || !isTouchDevice()) return;

    const onStart = (e) => {
      if (window.scrollY > 0 || refreshingRef.current) return;
      startY.current = e.touches[0].clientY;
      pulling.current = true;
      dist.current = 0;
    };

    const onMove = (e) => {
      if (!pulling.current || refreshingRef.current) return;
      const dy = e.touches[0].clientY - startY.current;
      if (dy <= 0) {
        if (dist.current !== 0) { dist.current = 0; setPull(0); }
        return;
      }
      // Apply resistance so the pull feels elastic and caps the travel.
      const resisted = Math.min(THRESHOLD * 1.6, dy * 0.5);
      dist.current = resisted;
      setPull(resisted);
      if (resisted > 4 && window.scrollY <= 0) e.preventDefault();
    };

    const onEnd = async () => {
      if (!pulling.current) return;
      pulling.current = false;
      const d = dist.current;
      if (d >= THRESHOLD) {
        setRefreshing(true);
        refreshingRef.current = true;
        setPull(THRESHOLD);
        try { await cbRef.current?.(); } finally {
          setRefreshing(false);
          refreshingRef.current = false;
          setPull(0);
        }
      } else {
        setPull(0);
      }
      dist.current = 0;
    };

    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [enabled]);

  return { pull, refreshing, threshold: THRESHOLD };
}