import React from 'react';

const RATIO = { phone: 2.1, tablet: 1.36, feature: 0.49 };

export default function FormPreview({ form, style = 'black' }) {
  const frame = style === 'white' ? '#e5e5ea' : style === 'titanium' ? '#9ca3af' : '#1a1a22';
  if (form === 'custom') {
    return <div className="w-14 h-16 rounded-lg border-2 border-dashed border-white/40 grid place-items-center text-white/50 text-lg font-light">?</div>;
  }
  const ratio = RATIO[form] || 2.1;
  const w = form === 'tablet' ? 46 : form === 'feature' ? 92 : 30;
  const h = Math.round(w * ratio);
  return (
    <div style={{ width: w, height: h, borderRadius: w * 0.16, background: frame, padding: w * 0.03, boxShadow: '0 0 0 1.5px rgba(255,255,255,0.12), 0 12px 24px -10px rgba(0,0,0,0.6)' }}>
      <div className="w-full h-full rounded-[20%] bg-gradient-to-br from-violet-500 via-pink-500 to-orange-400" />
    </div>
  );
}