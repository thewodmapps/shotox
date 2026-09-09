import React from 'react';
import MockScreen from './MockScreen';

const STYLES = {
  black: { frame: '#16161a', edge: '#3d3d44' },
  white: { frame: '#f5f5f7', edge: '#cfcfd6' },
  titanium: { frame: '#8e8e94', edge: '#d6d6db' },
};
// height/width ratio of the device frame
const RATIO = { phone: 2.1, tablet: 1.36 };

const hexToRgb = (hex) => {
  const h = (hex || '').replace('#', '');
  const f = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = /^[0-9a-fA-F]{6}$/.test(f) ? parseInt(f, 16) : NaN;
  if (Number.isNaN(n)) return { r: 200, g: 200, b: 210 };
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
};
const mix = (hex, target, amt) => {
  const a = hexToRgb(hex), b = hexToRgb(target);
  return `rgb(${Math.round(a.r + (b.r - a.r) * amt)},${Math.round(a.g + (b.g - a.g) * amt)},${Math.round(a.b + (b.b - a.b) * amt)})`;
};
const rgba = (hex, a) => { const { r, g, b } = hexToRgb(hex); return `rgba(${r},${g},${b},${a})`; };

export default function DeviceFrame({ url, style = 'black', width = 232, form = 'phone', platform = 'ios', mock, tint }) {
  if (form === 'feature' || form === 'none') return null;
  const s = STYLES[style] || STYLES.black;
  const ratio = RATIO[form] || 2.1;
  const h = width * ratio;
  const pad = width * (form === 'tablet' ? 0.022 : 0.03);
  const radius = width * (form === 'tablet' ? 0.05 : platform === 'android' ? 0.1 : 0.16);
  // Neon edge light derived from the slide tint so the chrome frame picks up the
  // template's palette.
  const accent = (tint && (tint.to || tint.from || tint.color)) || '#7C3AED';
  const glow = width * 0.18;
  // Metallic chrome sheen across the frame band.
  const sheen = `linear-gradient(150deg, ${mix(s.frame, '#ffffff', 0.4)} 0%, ${s.frame} 32%, ${mix(s.frame, '#000000', 0.35)} 100%)`;
  return (
    <div
      className="relative"
      style={{
        width,
        height: h,
        borderRadius: radius,
        background: sheen,
        padding: pad,
        boxShadow: `0 0 0 ${Math.max(1.5, width * 0.008)}px ${s.edge}, 0 0 ${glow}px ${rgba(accent, 0.5)}, 0 44px 70px -26px rgba(0,0,0,0.6)`,
      }}
    >
      <div className="w-full h-full overflow-hidden bg-black relative" style={{ borderRadius: radius * 0.82 }}>
        {url ? (
          <img src={url} alt="App screenshot" crossOrigin="anonymous" className="w-full h-full object-cover" />
        ) : (
          <MockScreen variant={mock} tint={tint} />
        )}
        {/* glossy reflection streak across the screen */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(125deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 28%, rgba(255,255,255,0) 100%)' }} />
        {/* iPhone — dynamic island */}
        {form === 'phone' && platform === 'ios' && (
          <div className="absolute left-1/2 -translate-x-1/2 bg-black rounded-full" style={{ top: width * 0.045, width: width * 0.3, height: width * 0.085 }} />
        )}
        {/* Android phone — hole-punch camera */}
        {form === 'phone' && platform === 'android' && (
          <div className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black" style={{ top: width * 0.03, width: width * 0.05, height: width * 0.05, boxShadow: '0 0 0 1px rgba(255,255,255,0.06)' }} />
        )}
        {/* iPad — camera dot on top bezel */}
        {form === 'tablet' && platform === 'ios' && (
          <div className="absolute left-1/2 -translate-x-1/2 top-[1.5px] w-1 h-1 rounded-full bg-black/50" />
        )}
        {/* Android tablet — hole-punch on top bezel */}
        {form === 'tablet' && platform === 'android' && (
          <div className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black/70" style={{ top: width * 0.012, width: width * 0.028, height: width * 0.028 }} />
        )}
      </div>
    </div>
  );
}