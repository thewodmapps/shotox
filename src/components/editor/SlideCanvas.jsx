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

const Sparkle = ({ size, color, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style} aria-hidden>
    <path d="M12 0c1.15 6.1 5.75 10.7 12 12-6.25 1.3-10.85 5.9-12 12-1.15-6.1-5.75-10.7-12-12C6.25 10.7 10.85 6.1 12 0z" />
  </svg>
);

const Swoosh = ({ color }) => (
  <svg
    className="absolute pointer-events-none"
    style={{ left: '50%', top: '52%', transform: 'translate(-50%,-50%) rotate(-12deg)' }}
    width="460"
    height="260"
    viewBox="0 0 460 260"
    fill="none"
    aria-hidden
  >
    <path
      d="M-20 150 C 80 40, 220 18, 360 120 C 400 152, 470 168, 520 150"
      stroke={color}
      strokeWidth="64"
      strokeLinecap="round"
      style={{ opacity: 0.16 }}
    />
  </svg>
);

const phonePos = (layout, phoneW) => {
  const base = { width: phoneW, marginLeft: -phoneW / 2 };
  if (layout === 'phone-top') return { ...base, top: -90 };
  if (layout === 'tilted') return { ...base, top: 192, transform: 'rotate(-8deg) translateX(8px)' };
  return { ...base, top: 176 };
};

const SlideCanvas = forwardRef(function SlideCanvas({ slide, device, deviceId, width = BASE_W, className = '' }, ref) {
  const dev = device || getDevice(deviceId);
  const h = slideHeight(dev);
  const scale = width / BASE_W;
  const landscape = dev.w > dev.h;
  const form = dev.form || 'phone';
  const phoneW = landscape ? (h * 0.82) / 2.1 : PHONE_W[form] || 252;

  const accent = isLight(slide.headingColor) ? 'rgba(255,255,255,0.85)' : slide.headingColor;
  const lightText = isLight(slide.bg.from || slide.bg.color);

  const renderText = (pad) => (
    <div style={{ textAlign: slide.align, fontFamily: `'${slide.font}', sans-serif`, padding: pad ? '34px 26px 0' : 0 }}>
      <h2
        style={{
          color: slide.headingColor,
          fontSize: landscape ? 24 : 33,
          lineHeight: 1.02,
          fontWeight: 800,
          letterSpacing: -1,
        }}
      >
        {slide.heading}
      </h2>
      {slide.subheading && (
        <p
          style={{
            color: slide.subColor,
            fontSize: landscape ? 11.5 : 13.5,
            marginTop: 10,
            lineHeight: 1.4,
            fontWeight: 500,
            maxWidth: landscape ? '100%' : '88%',
          }}
        >
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
        {slide.layout !== 'text-only' && <Swoosh color={accent} />}
        {slide.layout !== 'text-only' && (
          <Sparkle size={26} color={accent} style={{ position: 'absolute', top: 22, right: slide.align === 'left' ? 24 : undefined, left: slide.align === 'right' ? 24 : undefined, opacity: 0.55 }} />
        )}
        {slide.layout !== 'text-only' && (
          <Sparkle size={15} color={accent} style={{ position: 'absolute', top: 60, right: 64, opacity: 0.4 }} />
        )}

        {landscape ? (
          <div className="flex h-full relative">
            <div className="flex flex-col justify-center relative z-10" style={{ width: '58%', paddingLeft: '8%', paddingRight: '4%' }}>
              {renderText(false)}
            </div>
            <div className="relative flex items-center justify-center" style={{ width: '42%' }}>
              {slide.layout !== 'text-only' && <DeviceFrame url={slide.screenshotUrl} style={slide.deviceStyle} width={phoneW} form="phone" platform={dev.platform} />}
            </div>
          </div>
        ) : (
          <>
            {slide.layout === 'text-only' && <div className="absolute inset-0 flex items-center">{renderText(true)}</div>}
            {(slide.layout === 'phone-bottom' || slide.layout === 'tilted') && (
              <div className="absolute inset-x-0 top-0 z-10">{renderText(true)}</div>
            )}
            {slide.layout !== 'text-only' && (
              <div className="absolute left-1/2 z-0" style={phonePos(slide.layout, phoneW)}>
                <DeviceFrame url={slide.screenshotUrl} style={slide.deviceStyle} width={phoneW} form={form} platform={dev.platform} />
              </div>
            )}
            {slide.layout === 'phone-top' && <div className="absolute inset-x-0 bottom-0 z-10 pb-7">{renderText(true)}</div>}
          </>
        )}
      </div>
    </div>
  );
});

export default SlideCanvas;