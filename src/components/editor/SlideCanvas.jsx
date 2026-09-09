import React, { forwardRef } from 'react';
import { BASE_W, slideHeight, getDevice, MOCK_TYPES } from '@/lib/templates';
import DeviceFrame from './DeviceFrame';

// Reference canvas height the pose constants were tuned against. Every layout
// value is scaled by k = h / H_REF so a template composes identically on any
// device — phone or tablet — regardless of aspect ratio.
const H_REF = 650;
const DEVICE_FILL = 0.81;
const RATIO = { phone: 2.1, tablet: 1.36 };

// Per-template landscape (feature graphic) compositions. Each pose index maps to
// a distinct mockup position/scale/tilt so feature graphics vary by template.
const LAND = [
  { text: 'left',  textW: 0.56, tAlign: 'left',   dev: 'right', devEdge: 4, rot: 6,   scale: 0.9 },
  { text: 'right', textW: 0.56, tAlign: 'right',  dev: 'left',  devEdge: 4, rot: -6,  scale: 0.9 },
  { text: 'left',  textW: 0.50, tAlign: 'left',   dev: 'right', devEdge: 6, rot: 10,  scale: 0.86 },
  { text: 'left',  textW: 0.62, tAlign: 'left',   dev: 'right', devEdge: 8, rot: -6,  scale: 0.82 },
  { text: 'left',  textW: 0.52, tAlign: 'center', dev: 'right', devEdge: 4, rot: 8,   scale: 0.9 },
  { text: 'right', textW: 0.52, tAlign: 'right',  dev: 'left',  devEdge: 6, rot: -10, scale: 0.86 },
  { text: 'left',  textW: 0.58, tAlign: 'left',   dev: 'right', devEdge: 6, rot: 0,   scale: 0.92 },
  { text: 'left',  textW: 0.54, tAlign: 'left',   dev: 'right', devEdge: 6, rot: 12,  scale: 0.85 },
];

const hexToRgb = (hex) => {
  const h = (hex || '').replace('#', '');
  const f = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = /^[0-9a-fA-F]{6}$/.test(f) ? parseInt(f, 16) : NaN;
  if (Number.isNaN(n)) return { r: 255, g: 255, b: 255 };
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
};
const luminance = (hex) => { const { r, g, b } = hexToRgb(hex); return (0.299 * r + 0.587 * g + 0.114 * b) / 255; };
const isLight = (hex) => luminance(hex) > 0.62;
const mixHex = (hex, target, amt) => {
  const a = hexToRgb(hex), b = hexToRgb(target);
  return `rgb(${Math.round(a.r + (b.r - a.r) * amt)},${Math.round(a.g + (b.g - a.g) * amt)},${Math.round(a.b + (b.b - a.b) * amt)})`;
};
const hexA = (hex, a) => {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
};

// Neo-gradient mesh background: base gradient washed with soft radial highlights
// so every backdrop feels volumetric instead of flat. Pure CSS gradients — exports
// cleanly through html2canvas.
const meshBg = (bg) => {
  const c1 = bg.from || bg.color;
  const c2 = bg.to || c1;
  const base = bg.type === 'gradient' ? `linear-gradient(${bg.angle}deg, ${c1}, ${c2})` : c1;
  return {
    background: `radial-gradient(circle at 14% 16%, ${hexA(c2, 0.55)} 0%, transparent 42%), radial-gradient(circle at 86% 84%, ${hexA(c1, 0.5)} 0%, transparent 46%), radial-gradient(circle at 82% 10%, ${hexA(c2, 0.22)} 0%, transparent 38%), ${base}`,
  };
};

const Sparkle = ({ size, color, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style} aria-hidden>
    <path d="M12 0c1.15 6.1 5.75 10.7 12 12-6.25 1.3-10.85 5.9-12 12-1.15-6.1-5.75-10.7-12-12C6.25 10.7 10.85 6.1 12 0z" />
  </svg>
);

// Soft volumetric color washes — the "3D blob" depth layer.
const Blob = ({ color, style }) => (
  <div className="absolute pointer-events-none" style={{ background: `radial-gradient(circle at 38% 38%, ${hexA(color, 0.4)} 0%, transparent 66%)`, ...style }} />
);

// Glossy 3D sphere with a neon halo — the Neo signature element.
const Orb = ({ size, color, style }) => (
  <div
    className="absolute pointer-events-none"
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: `radial-gradient(circle at 32% 28%, #ffffff 0%, ${color} 40%, ${mixHex(color, '#000000', 0.5)} 100%)`,
      boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.28), inset -4px -6px 12px rgba(0,0,0,0.35), 0 0 ${size * 0.55}px ${size * 0.14}px ${hexA(color, 0.55)}, 0 18px 40px -12px rgba(0,0,0,0.5)`,
      ...style,
    }}
  />
);

const orbColor = (slide) => {
  const hc = slide.headingColor || '#C4B5FD';
  const lum = luminance(hc);
  const bgLight = isLight(slide.bg.from || slide.bg.color);
  if (lum > 0.92 || lum < 0.1) return bgLight ? '#7C3AED' : '#C4B5FD';
  return hc;
};

const Decor = ({ style, accent }) => {
  switch (style) {
    case 'spotlight':
      return (
        <div
          className="absolute pointer-events-none"
          style={{ left: '50%', top: '46%', transform: 'translate(-50%,-50%)', width: '78%', height: '64%', background: `radial-gradient(circle, ${hexA(accent, 0.3)} 0%, transparent 68%)` }}
        />
      );
    case 'split':
      return (
        <div
          className="absolute pointer-events-none inset-0"
          style={{ background: `linear-gradient(118deg, transparent 36%, ${hexA(accent, 0.24)} 36%, ${hexA(accent, 0.05)} 100%)` }}
        />
      );
    case 'grid':
      return (
        <div
          className="absolute pointer-events-none inset-0"
          style={{ backgroundImage: `radial-gradient(${hexA(accent, 0.4)} 1.4px, transparent 1.4px)`, backgroundSize: '22px 22px', opacity: 0.5 }}
        />
      );
    case 'brush':
      return (
        <svg className="absolute pointer-events-none" style={{ left: '50%', top: '52%', transform: 'translate(-50%,-50%) rotate(-10deg)' }} width="480" height="280" viewBox="0 0 480 280" fill="none" aria-hidden>
          <path d="M-30 150 C 70 40, 230 22, 380 140" stroke={accent} strokeWidth="58" strokeLinecap="round" style={{ opacity: 0.16 }} />
          <path d="M30 210 C 140 110, 300 110, 440 200" stroke={accent} strokeWidth="34" strokeLinecap="round" style={{ opacity: 0.12 }} />
        </svg>
      );
    case 'orbs':
      return (
        <>
          <div className="absolute pointer-events-none" style={{ left: '2%', top: '10%', width: '44%', height: '44%', background: `radial-gradient(circle, ${hexA(accent, 0.3)} 0%, transparent 70%)` }} />
          <div className="absolute pointer-events-none" style={{ right: '0%', bottom: '6%', width: '48%', height: '48%', background: `radial-gradient(circle, ${hexA(accent, 0.22)} 0%, transparent 70%)` }} />
        </>
      );
    case 'neon':
      return (
        <>
          <div className="absolute pointer-events-none" style={{ left: '50%', top: '42%', transform: 'translate(-50%,-50%)', width: '74%', height: '74%', borderRadius: '50%', border: `1.5px solid ${hexA(accent, 0.32)}` }} />
          <div className="absolute pointer-events-none" style={{ left: '50%', top: '42%', transform: 'translate(-50%,-50%)', width: '54%', height: '54%', borderRadius: '50%', border: `1.5px solid ${hexA(accent, 0.2)}` }} />
        </>
      );
    case 'minimal':
      return null;
    case 'swipe':
    default:
      return (
        <>
          <svg className="absolute pointer-events-none" style={{ left: '50%', top: '52%', transform: 'translate(-50%,-50%) rotate(-12deg)' }} width="460" height="260" viewBox="0 0 460 260" fill="none" aria-hidden>
            <path d="M-20 150 C 80 40, 220 18, 360 120 C 400 152, 470 168, 520 150" stroke={accent} strokeWidth="64" strokeLinecap="round" style={{ opacity: 0.16 }} />
          </svg>
          <Sparkle size={26} color={accent} style={{ position: 'absolute', top: 22, right: 24, opacity: 0.6 }} />
          <Sparkle size={15} color={accent} style={{ position: 'absolute', top: 64, right: 70, opacity: 0.4 }} />
        </>
      );
  }
};

// Scaled per-template pose. Same template → same composition on every device.
const phonePos = (layout, pW, off, k) => {
  let top, rot = 0, x = 0;
  if (layout === 'phone-top') top = -90 * k;
  else if (layout === 'tilted') { top = 192 * k; rot = -8; x = 8; }
  else top = 176 * k;
  if (off) {
    x += off.x;
    rot += off.rot;
    if (layout !== 'phone-top') top += (off.topDelta || 0) * k;
  }
  return { marginLeft: -pW / 2 + (x / 100) * BASE_W, top, transform: `rotate(${rot}deg)` };
};

// Where the floating 3D orb sits for a given portrait layout.
const orbPosFor = (layout, size) => {
  if (layout === 'phone-top') return { right: '5%', top: '6%' };
  if (layout === 'tilted') return { left: '6%', top: '50%', transform: 'translateY(-50%)' };
  if (layout === 'text-only') return { right: '9%', top: '40%' };
  return { right: '4%', top: '49%' };
};

const SlideCanvas = forwardRef(function SlideCanvas({ slide, device, deviceId, width = BASE_W, className = '' }, ref) {
  const dev = device || getDevice(deviceId);
  const h = slideHeight(dev);
  const scale = width / BASE_W;
  const landscape = dev.w > dev.h;
  const form = dev.form || 'phone';
  const ratio = RATIO[form] || 2.1;
  const k = h / H_REF;
  const pScale = slide.pose?.scale ?? 1;
  const phoneW = landscape ? (h * 0.82) / 2.1 : (DEVICE_FILL * h) / ratio;
  const pW = landscape ? phoneW : phoneW * pScale;

  const accent = slide.headingColor && slide.headingColor.startsWith('#') ? slide.headingColor : (isLight(slide.bg.from || slide.bg.color) ? '#0B0B12' : '#FFFFFF');
  const theme = slide.style || 'swipe';
  const hFs = landscape ? 24 : 33 * k;
  const sFs = landscape ? 11.5 : 13.5 * k;
  const lightBg = isLight(slide.bg.from || slide.bg.color);
  const headShadow = lightBg ? '0 1px 2px rgba(0,0,0,0.06)' : '0 2px 22px rgba(0,0,0,0.4)';

  const renderText = (pos) => {
    const pad = pos === 'bottom' ? `0 26px ${28 * k}px` : pos === 'center' ? '0 26px' : `${34 * k}px 26px 0`;
    return (
      <div style={{ textAlign: slide.align, fontFamily: `'${slide.font}', sans-serif`, padding: pad }}>
        <h2 style={{ color: slide.headingColor, fontSize: hFs, lineHeight: 1.02, fontWeight: 800, letterSpacing: -1, textShadow: headShadow }}>
          {slide.heading}
        </h2>
        {slide.subheading && (
          <p style={{ color: slide.subColor, fontSize: sFs, marginTop: 10 * k, lineHeight: 1.4, fontWeight: 500, maxWidth: landscape ? '100%' : '88%', textShadow: lightBg ? 'none' : '0 1px 12px rgba(0,0,0,0.3)' }}>
            {slide.subheading}
          </p>
        )}
      </div>
    );
  };

  const c1 = slide.bg.from || slide.bg.color;
  const c2 = slide.bg.to || c1;
  const oColor = orbColor(slide);
  const orbSize = landscape ? h * 0.2 : Math.min(BASE_W * 0.26, h * 0.16);

  return (
    <div className={className} style={{ width, height: h * scale, flexShrink: 0 }}>
      <div
        ref={ref}
        className="relative overflow-hidden"
        style={{ width: BASE_W, height: h, transform: `scale(${scale})`, transformOrigin: 'top left', ...meshBg(slide.bg) }}
      >
        {/* 3D blob depth layer */}
        {slide.layout !== 'text-only' && (
          <>
            <Blob color={c1} style={{ left: '-12%', top: '-10%', width: '52%', height: '36%' }} />
            <Blob color={c2} style={{ right: '-14%', bottom: '-12%', width: '56%', height: '40%' }} />
          </>
        )}

        {slide.layout !== 'text-only' && <Decor style={theme} accent={accent} />}

        {landscape ? (() => {
          const pi = Math.max(0, MOCK_TYPES.indexOf(slide.mock));
          const L = LAND[pi % LAND.length];
          const lk = h / 146;
          const devH = h * L.scale;
          const devW = devH / 2.1;
          const textLeft = L.text === 'left';
          return (
            <div className="relative w-full h-full">
              <Blob color={c2} style={{ [L.dev === 'right' ? 'left' : 'right']: '-8%', top: '8%', width: '40%', height: '60%' }} />
              <Orb size={orbSize} color={oColor} style={L.dev === 'right' ? { left: '5%', top: '16%' } : { right: '5%', top: '16%' }} />
              <div className="absolute inset-y-0 flex items-center z-10" style={{ [L.text]: 0, width: `${L.textW * 100}%`, padding: textLeft ? '0 4% 0 8%' : '0 8% 0 4%' }}>
                <div className="w-full" style={{ textAlign: L.tAlign, fontFamily: `'${slide.font}', sans-serif` }}>
                  <h2 style={{ color: slide.headingColor, fontSize: 26 * lk, lineHeight: 1.02, fontWeight: 800, letterSpacing: -0.5 * lk, textShadow: headShadow }}>{slide.heading}</h2>
                  {slide.subheading && <p style={{ color: slide.subColor, fontSize: 12 * lk, marginTop: 8 * lk, lineHeight: 1.35, fontWeight: 500, textShadow: lightBg ? 'none' : '0 1px 10px rgba(0,0,0,0.3)' }}>{slide.subheading}</p>}
                </div>
              </div>
              {slide.layout !== 'text-only' && (
                <div className="absolute z-[1]" style={{ [L.dev]: `${L.devEdge}%`, top: '50%', width: devW, transform: `translateY(-50%) rotate(${L.rot}deg)` }}>
                  <DeviceFrame url={slide.screenshotUrl} style={slide.deviceStyle} mock={slide.mock} tint={slide.bg} width={devW} form="phone" platform={dev.platform} />
                </div>
              )}
            </div>
          );
        })() : (
          <>
            {slide.layout === 'text-only' ? (
              <>
                <Blob color={c2} style={{ right: '-10%', top: '-8%', width: '46%', height: '32%' }} />
                <Orb size={orbSize} color={oColor} style={orbPosFor('text-only', orbSize)} />
                <div className="absolute inset-0 flex items-center">{renderText('center')}</div>
              </>
            ) : (
              <>
                <Orb size={orbSize} color={oColor} style={orbPosFor(slide.layout, orbSize)} />
                <div className={`absolute inset-x-0 z-10 ${slide.layout === 'phone-top' ? 'bottom-0' : 'top-0'}`}>
                  {renderText(slide.layout === 'phone-top' ? 'bottom' : 'top')}
                </div>
                <div className="absolute left-1/2 z-[1]" style={phonePos(slide.layout, pW, slide.pose, k)}>
                  <DeviceFrame url={slide.screenshotUrl} style={slide.deviceStyle} mock={slide.mock} tint={slide.bg} width={pW} form={form} platform={dev.platform} />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
});

export default SlideCanvas;