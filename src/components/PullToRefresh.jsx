import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader2, RefreshCw } from 'lucide-react';

const THRESHOLD = 70;

export default function PullToRefresh() {
  const [pull, setPull] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const pullRef = useRef(0);
  const startY = useRef(0);
  const active = useRef(false);
  const refreshingRef = useRef(false);
  const location = useLocation();

  useEffect(() => { refreshingRef.current = refreshing; }, [refreshing]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: coarse)').matches) return;
    // Don't intercept the editor — it's a full-height tool surface and a reload mid-edit is disruptive.
    if (location.pathname.startsWith('/editor')) return;

    const set = (v) => { pullRef.current = v; setPull(v); };

    const onStart = (e) => {
      if (refreshingRef.current) return;
      if (window.scrollY > 0) { active.current = false; return; }
      startY.current = e.touches[0].clientY;
      active.current = true;
    };
    const onMove = (e) => {
      if (!active.current || refreshingRef.current) return;
      const dy = e.touches[0].clientY - startY.current;
      if (window.scrollY <= 0 && dy > 0) {
        set(Math.min(dy * 0.5, 120));
      } else if (dy <= 0) {
        active.current = false;
        set(0);
      }
    };
    const onEnd = () => {
      if (!active.current) { set(0); return; }
      active.current = false;
      if (pullRef.current > THRESHOLD) {
        setRefreshing(true);
        set(THRESHOLD);
        setTimeout(() => window.location.reload(), 350);
      } else {
        set(0);
      }
    };

    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [location.pathname]);

  const progress = Math.min(pull / THRESHOLD, 1);
  const show = pull > 0 || refreshing;
  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 z-[60] pointer-events-none flex items-center justify-center transition-opacity duration-150"
      style={{ top: 10 + pull, opacity: show ? 1 : 0 }}
      aria-hidden={!show}
    >
      {refreshing ? (
        <Loader2 className="w-6 h-6 text-violet-500 animate-spin" />
      ) : (
        <RefreshCw className="w-6 h-6 text-violet-500" style={{ transform: `rotate(${progress * 360}deg)` }} />
      )}
    </div>
  );
}