import React, { forwardRef } from 'react';
import { BASE_W, slideHeight, getDevice } from '@/lib/templates';
import DeviceFrame from './DeviceFrame';

const PHONE_W = 236;

const bgStyle = (bg) =>
  bg.type === 'gradient'
    ? { background: `linear-gradient(${bg.angle}deg, ${bg.from}, ${bg.to})` }
    : { background: bg.color };

const phonePos = (layout) => {
  const base = { width: PHONE_W, marginLeft: -PHONE_W / 2 };
  if (layout === 'phone-top') return { ...base, top: -80 };
  if (layout === 'tilted') return { ...base, top: 170, transform: 'rotate(-9deg) translateX(10px)' };
  return { ...base, top: 155 };
};

const SlideCanvas = forwardRef(function SlideCanvas({ slide, deviceId, width = BASE_W, className = '' }, ref) {
  const device = getDevice(deviceId);
  const h = slideHeight(device);
  const scale = width / BASE_W;
  const text = (
    <div style={{ textAlign: slide.align, fontFamily: `'${slide.font}', sans-serif` }} className="px-6 py-7">
      <h2 style={{ color: slide.headingColor, fontSize: 27, lineHeight: 1.1, fontWeight: 700, letterSpacing: -0.6 }}>
        {slide.heading}
      </h2>
      {slide.subheading && (
        <p style={{ color: slide.subColor, fontSize: 13, marginTop: 8, lineHeight: 1.45 }}>{slide.subheading}</p>
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
        {slide.layout === 'text-only' && <div className="absolute inset-0 flex items-center">{text}</div>}
        {(slide.layout === 'phone-bottom' || slide.layout === 'tilted') && <div className="absolute inset-x-0 top-0">{text}</div>}
        {slide.layout !== 'text-only' && (
          <div className="absolute left-1/2" style={phonePos(slide.layout)}>
            <DeviceFrame url={slide.screenshotUrl} style={slide.deviceStyle} width={PHONE_W} />
          </div>
        )}
        {slide.layout === 'phone-top' && <div className="absolute inset-x-0 bottom-0">{text}</div>}
      </div>
    </div>
  );
});

export default SlideCanvas;