import React from 'react';

const RATIO = { phone: 2.1, tablet: 1.36, feature: 2.048 };

// Abstract app UI rendered inside each frame so the mockup reads as a real device.
const ScreenUI = ({ kind, tint }) => {
  const [from, to] = tint;
  if (kind === 'tablet') {
    return (
      <div className="w-full h-full flex">
        <div className="w-[30%] h-full bg-white/[0.05] border-r border-white/10 flex flex-col gap-[8%] p-[7%]">
          <div className="h-[7%] rounded-full" style={{ background: `linear-gradient(90deg, ${from}, ${to})` }} />
          <div className="h-[4%] rounded-full bg-white/15" />
          <div className="h-[4%] rounded-full bg-white/10" />
          <div className="h-[4%] rounded-full bg-white/10" />
          <div className="h-[4%] rounded-full bg-white/10" />
        </div>
        <div className="flex-1 p-[7%] flex flex-col gap-[8%]">
          <div className="h-[15%] rounded-md" style={{ background: `linear-gradient(120deg, ${from}, ${to})` }} />
          <div className="grid grid-cols-2 gap-[10%] flex-1">
            <div className="rounded-md bg-white/[0.08]" />
            <div className="rounded-md bg-white/[0.05]" />
            <div className="rounded-md bg-white/[0.05]" />
            <div className="rounded-md bg-white/[0.08]" />
          </div>
        </div>
      </div>
    );
  }
  if (kind === 'feature') {
    return (
      <div className="w-full h-full flex items-center gap-[7%] px-[7%]">
        <div className="flex-1 flex flex-col gap-[10%]">
          <div className="h-[20%] w-[82%] rounded-[2px] bg-white/85" />
          <div className="h-[12%] w-[58%] rounded-[2px] bg-white/35" />
          <div className="h-[8%] w-[42%] rounded-full mt-[3%]" style={{ background: `linear-gradient(90deg, ${from}, ${to})` }} />
        </div>
        <div className="w-[30%] h-[92%] rounded-md" style={{ background: `linear-gradient(150deg, ${from}, ${to})`, boxShadow: '0 8px 16px -5px rgba(0,0,0,0.55)' }} />
      </div>
    );
  }
  // phone
  return (
    <div className="w-full h-full flex flex-col p-[8%] gap-[6%]">
      <div className="flex items-center justify-between h-[6%]">
        <div className="w-[15%] h-full rounded-full bg-white/30" />
        <div className="w-[10%] h-[60%] rounded-full bg-white/25" />
      </div>
      <div className="h-[22%] rounded-md" style={{ background: `linear-gradient(125deg, ${from}, ${to})` }} />
      <div className="flex flex-col gap-[7%]">
        <div className="h-[3.5%] w-[72%] rounded-full bg-white/55" />
        <div className="h-[3.5%] w-[46%] rounded-full bg-white/25" />
      </div>
      <div className="grid grid-cols-3 gap-[7%] flex-1">
        <div className="rounded-sm bg-white/[0.09]" />
        <div className="rounded-sm bg-white/[0.05]" />
        <div className="rounded-sm bg-white/[0.09]" />
      </div>
      <div className="h-[7%] w-[48%] rounded-full self-center mt-auto" style={{ background: `linear-gradient(90deg, ${from}, ${to})` }} />
    </div>
  );
};

const FRAME = {
  black: ['#26262e', '#0d0d12'],
  titanium: ['#9a9aa6', '#4a4a55'],
  white: ['#f2f2f6', '#c8c8d2'],
};

export default function FormPreview({ form, style = 'black', tint = ['#8B5CF6', '#F472B6'] }) {
  if (form === 'custom') {
    return (
      <div className="w-16 h-20 rounded-2xl border-2 border-dashed border-white/30 grid place-items-center bg-white/[0.02]">
        <span className="text-2xl font-light text-white/45 leading-none">?</span>
      </div>
    );
  }

  const w = form === 'tablet' ? 54 : form === 'feature' ? 108 : 42;
  const ratio = RATIO[form] || 2.1;
  const h = Math.round(w * ratio);
  const radius = w * 0.2;
  const [light, dark] = FRAME[style] || FRAME.black;

  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: radius,
        padding: Math.max(1.5, w * 0.035),
        background: `linear-gradient(145deg, ${light}, ${dark} 42%, ${light} 72%, ${dark})`,
        boxShadow: '0 0 0 1px rgba(255,255,255,0.14), 0 18px 34px -14px rgba(0,0,0,0.75)',
      }}
    >
      <div className="w-full h-full overflow-hidden relative bg-[#0a0a0f]" style={{ borderRadius: radius * 0.76 }}>
        <ScreenUI kind={form} tint={tint} />
        {/* diagonal gloss */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(150deg, rgba(255,255,255,0.10) 0%, transparent 28%, transparent 100%)' }} />
        {form === 'phone' && (
          <div className="absolute left-1/2 -translate-x-1/2 bg-black rounded-full" style={{ top: h * 0.03, width: w * 0.3, height: w * 0.085 }} />
        )}
        {form === 'tablet' && (
          <div className="absolute left-1/2 -translate-x-1/2 bg-black/60 rounded-full" style={{ top: 1.5, width: w * 0.035, height: w * 0.035 }} />
        )}
      </div>
    </div>
  );
}