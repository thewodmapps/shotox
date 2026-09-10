import React, { forwardRef } from 'react';
import { BASE_W, slideHeight, getDevice, MOCK_TYPES } from '@/lib/templates';
import DeviceFrame from './DeviceFrame';

const WATERMARK_LOGO = 'https://media.base44.com/images/public/6aa0ad9172db932d1d29336b/da9615c18_shotox.png';

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

const bgStyle = (bg) =>
  bg.type === 'gradient'
    ? { background: `linear-gradient(${bg.angle}deg, ${bg.from}, ${bg.to})` }
    : { background: bg.color };

const isLight = (hex) => {
  const h = (hex || '').replace('#', '');
  if (!h) return false;
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return false;
  return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255 > 0.62;
};

const hexA = (hex, a) => {
  const h = (hex || '').replace('#', '');
  if (/^[0-9a-fA-F]{6}$/.test(h) || /^[0-9a-fA-F]{3}$/.test(h)) {
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const n = parseInt(full, 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  }
  return `rgba(255,255,255,${a})`;
};

const Sparkle = ({ size, color, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style} aria-hidden>
    <path d="M12 0c1.15 6.1 5.75 10.7 12 12-6.25 1.3-10.85 5.9-12 12-1.15-6.1-5.75-10.7-12-12C6.25 10.7 10.85 6.1 12 0z" />
  </svg>
);

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
          style={{ backgroundImage: `radial-gradient(${hexA(accent, 0.4)} 1.4px, transparent 1.4px)`, backgroundSize: '22px 22px', opacity: 0.55 }}
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

const SlideCanvas = forwardRef(function SlideCanvas({ slide, device, deviceId, width = BASE_W, className = '', watermark = false }, ref) {
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
  const hScale = slide.headingScale ?? 1;
  const sScale = slide.subScale ?? 1;
  const hFs = landscape ? 24 * hScale : 33 * k * hScale;
  const sFs = landscape ? 11.5 * sScale : 13.5 * k * sScale;
  const hAlign = slide.headingAlign || slide.align;
  const sAlign = slide.subAlign || slide.align;
  const ty = ((slide.textY || 0) / 100) * h;

  const renderText = (pos) => {
    const pad = pos === 'bottom' ? `0 26px ${28 * k}px` : pos === 'center' ? '0 26px' : `${34 * k}px 26px 0`;
    return (
      <div style={{ textAlign: hAlign, fontFamily: `'${slide.font}', sans-serif`, padding: pad }}>
        <h2 style={{ color: slide.headingColor, fontSize: hFs, lineHeight: 1.02, fontWeight: 800, letterSpacing: -1 }}>
          {slide.heading}
        </h2>
        {slide.subheading && (
          <p style={{ color: slide.subColor, fontSize: sFs, marginTop: 10 * k, lineHeight: 1.4, fontWeight: 500, maxWidth: landscape ? '100%' : '88%', textAlign: sAlign, marginInline: sAlign === 'center' ? 'auto' : '0' }}>
            {slide.subheading}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className={className} style={{ width, height: h * scale, flexShrink: 0 }}>
      <div
        ref={ref}
        className="relative overflow-hidden"
        style={{ width: BASE_W, height: h, transform: `scale(${scale})`, transformOrigin: 'top left', ...bgStyle(slide.bg) }}
      >
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
              <div className="absolute inset-y-0 flex items-center z-10" style={{ [L.text]: 0, width: `${L.textW * 100}%`, padding: textLeft ? '0 4% 0 8%' : '0 8% 0 4%', transform: `translateY(${ty}px)` }}>
                <div className="w-full" style={{ textAlign: hAlign || L.tAlign, fontFamily: `'${slide.font}', sans-serif` }}>
                  <h2 style={{ color: slide.headingColor, fontSize: 26 * lk * hScale, lineHeight: 1.02, fontWeight: 800, letterSpacing: -0.5 * lk }}>{slide.heading}</h2>
                  {slide.subheading && <p style={{ color: slide.subColor, fontSize: 12 * lk * sScale, marginTop: 8 * lk, lineHeight: 1.35, fontWeight: 500, textAlign: sAlign || L.tAlign }}>{slide.subheading}</p>}
                </div>
              </div>
              {slide.layout !== 'text-only' && (
                <div className="absolute z-[1]" style={{ [L.dev]: `${L.devEdge}%`, top: '50%', width: devW, transform: `translateY(-50%) rotate(${L.rot}deg)` }}>
                  <div style={{ transform: `translate(${(slide.phoneX || 0) / 100 * BASE_W}px, ${(slide.phoneY || 0) / 100 * h}px)` }}>
                    <DeviceFrame url={slide.screenshotUrl} style={slide.deviceStyle} mock={slide.mock} tint={slide.bg} width={devW} form="phone" platform={dev.platform} />
                  </div>
                </div>
              )}
            </div>
          );
        })() : (
          <>
            {slide.layout === 'text-only' ? (
              <div className="absolute inset-0 flex items-center" style={{ transform: `translateY(${ty}px)` }}>{renderText('center')}</div>
            ) : (
              <>
                <div className={`absolute inset-x-0 z-10 ${slide.layout === 'phone-top' ? 'bottom-0' : 'top-0'}`} style={{ transform: `translateY(${ty}px)` }}>
                  {renderText(slide.layout === 'phone-top' ? 'bottom' : 'top')}
                </div>
                <div className="absolute left-1/2 z-[1]" style={phonePos(slide.layout, pW, slide.pose, k)}>
                  <div style={{ display: 'inline-block', transform: `translate(${(slide.phoneX || 0) / 100 * BASE_W}px, ${(slide.phoneY || 0) / 100 * h}px)` }}>
                    <DeviceFrame url={slide.screenshotUrl} style={slide.deviceStyle} mock={slide.mock} tint={slide.bg} width={pW} form={form} platform={dev.platform} />
                  </div>
                </div>
              </>
            )}
          </>
        )}
        {watermark && (
          <div style={{ position: 'absolute', left: 0, bottom: 12, width: '100%', textAlign: 'center', zIndex: 30, pointerEvents: 'none' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 12px', borderRadius: 999, background: 'rgba(0,0,0,0.42)' }}>
              <img src={WATERMARK_LOGO} alt="" crossOrigin="anonymous" style={{ width: 18, height: 18, borderRadius: 5, objectFit: 'cover', display: 'block' }} />
              <span style={{ color: '#ffffff', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', fontFamily: 'Sora, Inter, sans-serif' }}>Shotox</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default SlideCanvas;