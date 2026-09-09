import React from 'react';
import MockScreen from './MockScreen';

const STYLES = {
  black: { frame: '#16161a', edge: '#3d3d44' },
  white: { frame: '#f5f5f7', edge: '#cfcfd6' },
  titanium: { frame: '#8e8e94', edge: '#d6d6db' },
};

export default function DeviceFrame({ url, style = 'black', width = 232 }) {
  const s = STYLES[style] || STYLES.black;
  return (
    <div
      className="relative"
      style={{
        width,
        height: width * 2.1,
        borderRadius: width * 0.16,
        background: s.frame,
        padding: width * 0.03,
        boxShadow: `0 0 0 ${Math.max(1.5, width * 0.008)}px ${s.edge}, 0 40px 60px -24px rgba(0,0,0,0.55)`,
      }}
    >
      <div className="w-full h-full overflow-hidden bg-black relative" style={{ borderRadius: width * 0.13 }}>
        {url ? (
          <img src={url} alt="App screenshot" crossOrigin="anonymous" className="w-full h-full object-cover" />
        ) : (
          <MockScreen />
        )}
        <div
          className="absolute left-1/2 -translate-x-1/2 bg-black rounded-full"
          style={{ top: width * 0.035, width: width * 0.3, height: width * 0.085 }}
        />
      </div>
    </div>
  );
}