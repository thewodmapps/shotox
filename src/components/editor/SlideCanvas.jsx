import React, { forwardRef } from 'react';
import { BASE_W, slideHeight, getDevice } from '@/lib/templates';
import DeviceFrame from './DeviceFrame';

const PHONE_W = { phone: 252, tablet: 268 };

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

// Form-aware device placement. Phones bleed out the bottom under the text;
// tablets are shorter, so the device is sized to the canvas and seated below
// the text to avoid any overlap.
const phonePos = (layout, pW, off, isTab, h) => {
  let top, rot = 0, x = 0;
  if (isTab) {
    if (layout === 'phone-top') top = -h * 0.12;
    else if (layout === 'tilted') { top = h * 0.33; rot = -6; x = 6; }
    else top = h * 0.33;
  } else {
    if (layout === 'phone-top') top = -90;
    else if (layout === 'tilted') { top = 192; rot = -8; x = 8; }
    else top = 176;
  }
  if (off) {
    x += off.x;
    rot += off.rot;
    if (!isTab && layout !== 'phone-top') top += off.topDelta;
  }
  return { marginLeft: -pW / 2 + (x / 100) * BASE_W, top, transform: `rotate(${rot}deg)` };
};

const SlideCanvas = forwardRef(function SlideCanvas({ slide, device, deviceId, width = BASE_W, className = '' }, ref) {
  const dev = device || getDevice(deviceId);
  const h = slideHeight(dev);
  const scale = width / BASE_W;
  const landscape = dev.w > dev.h;
  const form = dev.form || 'phone';
  const isTab = form === 'tablet';
  const phoneW = landscape ? (h * 0.82) / 2.1 : PHONE_W[form] || 252;
  const pScale = slide.pose?.scale ?? 1;
  const pW = isTab ? (h * 0.78) / 1.36 : phoneW * pScale;

  const accent = slide.headingColor && slide.headingColor.startsWith('#') ? slide.headingColor : (isLight(slide.bg.from || slide.bg.color) ? '#0B0B12' : '#FFFFFF');
  const theme = slide.style || 'swipe';
  const hFs = landscape ? 24 : isTab ? 27 : 33;
  const sFs = landscape ? 11.5 : isTab ? 12.5 : 13.5;

  const renderText = (pad) => (
    <div style={{ textAlign: slide.align, fontFamily: `'${slide.font}', sans-serif`, padding: pad ? `${isTab ? 30 : 34}px 26px 0` : 0 }}>
      <h2 style={{ color: slide.headingColor, fontSize: hFs, lineHeight: 1.02, fontWeight: 800, letterSpacing: -1 }}>
        {slide.heading}
      </h2>
      {slide.subheading && (
        <p style={{ color: slide.subColor, fontSize: sFs, marginTop: 10, lineHeight: 1.4, fontWeight: 500, maxWidth: landscape ? '100%' : '88%' }}>
          {slide.subheading}
        </p>
      )}
    </div>
  );

  return (
    <div className={className} style={{ width, height: h * scale, flexShrink: 0 }}>
      <div
        ref={ref}
        className="relative overflow-hidden"
        style={{ width: BASE_W, height: h, transform: `scale(${scale})`, transformOrigin: 'top left', ...bgStyle(slide.bg) }}
      >
        {slide.layout !== 'text-only' && <Decor style={theme} accent={accent} />}

        {landscape ? (
          <div className="flex h-full relative">
            <div className="flex flex-col justify-center relative z-10" style={{ width: '58%', paddingLeft: '8%', paddingRight: '4%' }}>
              {renderText(false)}
            </div>
            <div className="relative flex items-center justify-center z-[1]" style={{ width: '42%' }}>
              {slide.layout !== 'text-only' && <DeviceFrame url={slide.screenshotUrl} style={slide.deviceStyle} mock={slide.mock} tint={slide.bg} width={phoneW} form="phone" platform={dev.platform} />}
            </div>
          </div>
        ) : (
          <>
            {slide.layout === 'text-only' ? (
              <div className="absolute inset-0 flex items-center">{renderText(true)}</div>
            ) : (
              <>
                <div className={`absolute inset-x-0 z-10 ${slide.layout === 'phone-top' ? 'bottom-0 pb-7' : 'top-0'}`}>{renderText(true)}</div>
                <div className="absolute left-1/2 z-[1]" style={phonePos(slide.layout, pW, slide.pose, isTab, h)}>
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