import React from 'react';
import MockScreen from './MockScreen';

const STYLES = {
  black: { frame: '#16161a', edge: '#3d3d44' },
  white: { frame: '#f5f5f7', edge: '#cfcfd6' },
  titanium: { frame: '#8e8e94', edge: '#d6d6db' },
};
// height/width ratio of the device frame
const RATIO = { phone: 2.1, tablet: 1.36 };

export default function DeviceFrame({ url, style = 'black', width = 232, form = 'phone' }) {
  if (form === 'feature' || form === 'none') return null;
  const s = STYLES[style] || STYLES.black;
  const ratio = RATIO[form] || 2.1;
  const h = width * ratio;
  const pad = width * (form === 'tablet' ? 0.025 : 0.03);
  const radius = width * (form === 'tablet' ? 0.06 : 0.16);
  return (
    <div
      className="relative"
      style={{
        width,
        height: h,
        borderRadius: radius,
        background: s.frame,
        padding: pad,
        boxShadow: `0 0 0 ${Math.max(1.5, width * 0.008)}px ${s.edge}, 0 40px 60px -24px rgba(0,0,0,0.55)`,
      }}
    >
      <div className="w-full h-full overflow-hidden bg-black relative" style={{ borderRadius: radius * 0.8 }}>
        {url ? (
          <img src={url} alt="App screenshot" crossOrigin="anonymous" className="w-full h-full object-cover" />
        ) : (
          <MockScreen />
        )}
        {form === 'phone' && (
          <div className="absolute left-1/2 -translate-x-1/2 bg-black rounded-full" style={{ top: width * 0.045, width: width * 0.3, height: width * 0.085 }} />
        )}
        {form === 'tablet' && (
          <div className="absolute left-1/2 -translate-x-1/2 top-[2.5px] w-1 h-1 rounded-full bg-black/40" />
        )}
      </div>
    </div>
  );
}