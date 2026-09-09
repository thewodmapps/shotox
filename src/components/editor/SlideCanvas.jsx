import React, { forwardRef } from 'react';
import { BASE_W, slideHeight, getDevice } from '@/lib/templates';
import DeviceFrame from './DeviceFrame';

const PHONE_W = { phone: 236, tablet: 250 };

const bgStyle = (bg) =>
  bg.type === 'gradient'
    ? { background: `linear-gradient(${bg.angle}deg, ${bg.from}, ${bg.to})` }
    : { background: bg.color };

const phonePos = (layout, phoneW) => {
  const base = { width: phoneW, marginLeft: -phoneW / 2 };
  if (layout === 'phone-top') return { ...base, top: -80 };
  if (layout === 'tilted') return { ...base, top: 170, transform: 'rotate(-9deg) translateX(10px)' };
  return { ...base, top: 155 };
};

const SlideCanvas = forwardRef(function SlideCanvas({ slide, device, deviceId, width = BASE_W, className = '' }, ref) {
  const dev = device || getDevice(deviceId);
  const h = slideHeight(dev);
  const scale = width / BASE_W;
  const landscape = dev.w > dev.h;
  const form = dev.form || 'phone';
  const phoneW = landscape ? (h * 0.8) / 2.1 : PHONE_W[form] || 236;

  const renderText = (pad) => (
    <div style={{ textAlign: slide.align, fontFamily: `'${slide.font}', sans-serif`, padding: pad ? '28px 24px' : 0 }}>
      <h2 style={{ color: slide.headingColor, fontSize: landscape ? 22 : 27, lineHeight: 1.1, fontWeight: 700, letterSpacing: -0.6 }}>
        {slide.heading}
      </h2>
      {slide.subheading && (
        <p style={{ color: slide.subColor, fontSize: landscape ? 11 : 13, marginTop: 8, lineHeight: 1.45 }}>{slide.subheading}</p>
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
        {landscape ? (
          <div className="flex h-full">
            <div className="flex flex-col justify-center" style={{ width: '58%', paddingLeft: '8%', paddingRight: '4%' }}>
              {renderText(false)}
            </div>
            <div className="relative flex items-center justify-center" style={{ width: '42%' }}>
              {slide.layout !== 'text-only' && <DeviceFrame url={slide.screenshotUrl} style={slide.deviceStyle} width={phoneW} form="phone" />}
            </div>
          </div>
        ) : (
          <>
            {slide.layout === 'text-only' && <div className="absolute inset-0 flex items-center">{renderText(true)}</div>}
            {(slide.layout === 'phone-bottom' || slide.layout === 'tilted') && <div className="absolute inset-x-0 top-0">{renderText(true)}</div>}
            {slide.layout !== 'text-only' && (
              <div className="absolute left-1/2" style={phonePos(slide.layout, phoneW)}>
                <DeviceFrame url={slide.screenshotUrl} style={slide.deviceStyle} width={phoneW} form={form} />
              </div>
            )}
            {slide.layout === 'phone-top' && <div className="absolute inset-x-0 bottom-0">{renderText(true)}</div>}
          </>
        )}
      </div>
    </div>
  );
});

export default SlideCanvas;