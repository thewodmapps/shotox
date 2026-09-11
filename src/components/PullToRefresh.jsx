import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw } from 'lucide-react';

const MAX_PULL = 92;
const THRESHOLD = 66;

// Attractive, branded pull-to-refresh for touch devices. Shows a gradient
// Shotox pill (violet → pink → amber) that scales & rotates as you pull, then
// spins while refreshing. Desktop is unaffected (no touch events fire).
export default function PullToRefresh({ onRefresh, tone = 'dark' }) {
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

  const SIZE = 56;
  const R = 24;
  const C = 2 * Math.PI * R;
  const ringProgress = refreshing ? 1 : progress;
  const dashOffset = C * (1 - ringProgress);
  const trackColor = tone === 'light' ? 'rgba(11,11,18,0.09)' : 'rgba(255,255,255,0.12)';
  const labelColor = tone === 'light' ? 'text-[#0B0B12]/55' : 'text-white/75';

  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center pointer-events-none select-none"
      style={{
        top: 'env(safe-area-inset-top, 0)',
        height: pull,
        transition: active ? 'none' : 'height 0.34s cubic-bezier(0.2,0.8,0.2,1)',
        opacity: visible ? 1 : 0,
      }}
    >
      <div
        className="relative mt-1"
        style={{
          width: SIZE,
          height: SIZE,
          transform: `scale(${0.82 + progress * 0.18})`,
          transition: active ? 'none' : 'transform 0.2s ease-out',
        }}
      >
        {/* soft brand glow */}
        <div
          className="absolute inset-0 rounded-full blur-xl"
          style={{
            background: 'linear-gradient(135deg, #c4b5fd 0%, #f472b6 50%, #fdba74 100%)',
            opacity: 0.18 + progress * 0.4,
            transition: active ? 'none' : 'opacity 0.2s ease-out',
          }}
        />
        <div className={refreshing ? 'animate-spin' : ''} style={{ width: SIZE, height: SIZE, position: 'relative' }}>
          <svg width={SIZE} height={SIZE} className="relative block">
            <defs>
              <linearGradient id="shotox-ptr-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#c4b5fd" />
                <stop offset="50%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#fdba74" />
              </linearGradient>
            </defs>
            <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke={trackColor} strokeWidth="4" />
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill="none"
              stroke="url(#shotox-ptr-grad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={dashOffset}
              transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
              style={{ transition: active ? 'none' : 'stroke-dashoffset 0.12s linear' }}
            />
          </svg>
          {/* center hub */}
          <div className="absolute inset-0 grid place-items-center">
            <div
              className="grid place-items-center rounded-full shadow-[0_6px_18px_-4px_rgba(236,72,153,0.65)]"
              style={{ width: 24, height: 24, background: 'linear-gradient(135deg, #c4b5fd 0%, #f472b6 50%, #fdba74 100%)' }}
            >
              <RefreshCw
                className="w-3.5 h-3.5 text-white"
                strokeWidth={2.75}
                style={{ transform: refreshing ? undefined : `rotate(${progress * 240}deg)`, transition: active ? 'none' : 'transform 0.12s ease-out' }}
              />
            </div>
          </div>
        </div>
      </div>
      <span className={`mt-1.5 text-[10px] font-semibold tracking-wide ${labelColor}`}>
        {refreshing ? 'Refreshing…' : pull >= THRESHOLD ? 'Release to refresh' : 'Pull to refresh'}
      </span>
    </div>
  );
}