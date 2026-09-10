import { useEffect, useRef, useState, useCallback } from 'react';

const THRESHOLD = 70;
const MAX = 120;
const DAMPING = 0.5;

/**
 * App-wide pull-to-refresh. Mount once near the root; on touch devices,
 * dragging down from the top of the page reveals a spinner and — past the
 * threshold — triggers `onRefresh` (defaults to reloading the page so every
 * route re-fetches its own data). Fixed-position elements (floating navbars)
 * are untouched: only the indicator moves, never the page content.
 */
export default function PullToRefresh({ onRefresh }) {
  const [pull, setPull] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(0);
  const pulling = useRef(false);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    setPull(THRESHOLD);
    try {
      if (onRefresh) await onRefresh();
      else window.location.reload();
    } finally {
      setRefreshing(false);
      setPull(0);
    }
  }, [onRefresh]);

  useEffect(() => {
    // Skip on non-touch / desktop environments.
    if (!('ontouchstart' in window) && !navigator.maxTouchPoints) return;

    const onTouchStart = (e) => {
      if (refreshing || window.scrollY > 0) return;
      startY.current = e.touches[0].clientY;
      pulling.current = true;
    };

    const onTouchMove = (e) => {
      if (!pulling.current || refreshing) return;
      if (window.scrollY > 0) {
        pulling.current = false;
        setPull(0);
        return;
      }
      const delta = e.touches[0].clientY - startY.current;
      if (delta <= 0) {
        setPull(0);
        return;
      }
      // Prevent native overscroll while we're pulling.
      if (e.cancelable) e.preventDefault();
      setPull(Math.min(MAX, delta * DAMPING));
    };

    const onTouchEnd = () => {
      if (!pulling.current) return;
      pulling.current = false;
      setPull((p) => {
        if (p >= THRESHOLD) refresh();
        return 0;
      });
    };

    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [refreshing, refresh]);

  const active = pull > 0 || refreshing;
  const progress = Math.min(1, pull / THRESHOLD);

  return (
    <div
      aria-hidden={!active}
      className="pointer-events-none fixed top-[calc(env(safe-area-inset-top)_+_14px)] left-1/2 z-[60] flex items-center justify-center transition-opacity"
      style={{
        transform: `translate(-50%, ${pull}px)`,
        opacity: active ? 1 : 0,
      }}
    >
      <div
        className="flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)] border border-black/5"
        style={{ transform: `rotate(${progress * 270}deg)` }}
      >
        <svg
          className={refreshing ? 'animate-spin' : ''}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0B0B12"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12a9 9 0 1 1-2.64-6.36" />
          <path d="M21 3v6h-6" />
        </svg>
      </div>
    </div>
  );
}