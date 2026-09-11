import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw } from 'lucide-react';

const MAX_PULL = 92;
const THRESHOLD = 66;

// Attractive, branded pull-to-refresh for touch devices. Shows a gradient
// Shotox pill (violet → pink → amber) that scales & rotates as you pull, then
// spins while refreshing. Desktop is unaffected (no touch events fire).
export default function PullToRefresh({ onRefresh }) {
  const [pull, setPull] = useState(0);
  const [active, setActive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(null);

  const isTouch = typeof window !== 'undefined' && 'ontouchstart' in window;

  useEffect(() => {
    if (!isTouch) return;
    const atTop = () => window.scrollY <= 0;

    const onStart = (e) => {
      if (refreshing || !atTop()) return;
      startY.current = e.touches[0].clientY;
    };

    const onMove = (e) => {
      if (startY.current == null || refreshing) return;
      if (!atTop()) { startY.current = null; setActive(false); setPull(0); return; }
      const delta = e.touches[0].clientY - startY.current;
      if (delta <= 0) { setActive(false); setPull(0); return; }
      setActive(true);
      setPull(Math.min(MAX_PULL, delta * 0.5));
      if (e.cancelable && delta > 6) e.preventDefault();
    };

    const onEnd = async () => {
      if (startY.current == null) return;
      startY.current = null;
      setActive(false);
      if (pull >= THRESHOLD) {
        setRefreshing(true);
        setPull(56);
        try { await onRefresh?.(); } finally {
          setRefreshing(false);
          setPull(0);
        }
      } else {
        setPull(0);
      }
    };

    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
    window.addEventListener('touchcancel', onEnd);
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
      window.removeEventListener('touchcancel', onEnd);
    };
  }, [isTouch, pull, refreshing, onRefresh]);

  const progress = Math.min(1, pull / THRESHOLD);
  const visible = pull > 0 || refreshing;

  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center pointer-events-none select-none"
      style={{
        top: 'env(safe-area-inset-top, 0)',
        height: pull,
        transition: active ? 'none' : 'height 0.32s cubic-bezier(0.2,0.8,0.2,1)',
        opacity: visible ? 1 : 0,
      }}
    >
      <div
        className="mt-2 grid place-items-center rounded-full shadow-[0_10px_28px_-8px_rgba(236,72,153,0.55)]"
        style={{
          width: 46,
          height: 46,
          background: 'linear-gradient(135deg, #c4b5fd 0%, #f472b6 50%, #fdba74 100%)',
          transform: `scale(${0.72 + progress * 0.28})`,
          transition: active ? 'none' : 'transform 0.2s ease-out',
        }}
      >
        <RefreshCw
          className={`w-5 h-5 text-[#0B0B12] ${refreshing ? 'animate-spin' : ''}`}
          strokeWidth={2.5}
          style={{ transform: refreshing ? undefined : `rotate(${progress * 220}deg)`, transition: active ? 'none' : 'transform 0.15s ease-out' }}
        />
      </div>
      <span className="mt-1.5 text-[10px] font-semibold tracking-wide text-white/75">
        {refreshing ? 'Refreshing…' : pull >= THRESHOLD ? 'Release to refresh' : 'Pull to refresh'}
      </span>
    </div>
  );
}