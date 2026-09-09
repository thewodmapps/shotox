import React from 'react';

const RATIO = { phone: 2.1, tablet: 1.36, feature: 2.048 };

const FRAME = {
  black: ['#2a2a32', '#0d0d12'],
  titanium: ['#a8a8b4', '#4a4a55'],
  white: ['#f4f4f8', '#c8c8d2'],
};

const PhoneScreen = ({ tint }) => {
  const [from, to] = tint;
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between px-[8%] pt-[7%]" style={{ height: '9%' }}>
        <div className="w-[14%] h-[45%] rounded-full bg-white/55" />
        <div className="flex items-center gap-[4%]">
          <div className="w-[5%] h-[45%] rounded-full bg-white/40" />
          <div className="w-[9%] h-[55%] rounded-[2px] border border-white/50" />
        </div>
      </div>
      <div className="mx-[7%] rounded-md" style={{ height: '20%', background: `linear-gradient(125deg, ${from}, ${to})` }} />
      <div className="flex flex-col gap-[5%] px-[7%] mt-[6%] flex-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-[6%]" style={{ height: '15%' }}>
            <div className="rounded-md shrink-0" style={{ width: '15%', height: '100%', background: `linear-gradient(135deg, ${from}, ${to})` }} />
            <div className="flex-1 flex flex-col gap-[20%] justify-center">
              <div className="h-[35%] w-[72%] rounded-full bg-white/45" />
              <div className="h-[28%] w-[46%] rounded-full bg-white/20" />
            </div>
          </div>
        ))}
      </div>
      <div className="mx-[7%] mb-[7%] rounded-md bg-white/[0.06] flex items-center justify-around" style={{ height: '8%' }}>
        <div className="w-[6%] h-[55%] rounded-full bg-white/55" />
        <div className="w-[6%] h-[55%] rounded-full bg-white/25" />
        <div className="w-[6%] h-[55%] rounded-full bg-white/25" />
      </div>
    </div>
  );
};

const TabletScreen = ({ tint }) => {
  const [from, to] = tint;
  return (
    <div className="w-full h-full flex">
      <div className="w-[30%] h-full bg-white/[0.05] border-r border-white/10 flex flex-col gap-[10%] p-[8%]">
        <div className="h-[7%] rounded-full" style={{ background: `linear-gradient(90deg, ${from}, ${to})` }} />
        <div className="h-[5%] rounded-full bg-white/15" />
        <div className="h-[5%] rounded-full bg-white/10" />
        <div className="h-[5%] rounded-full bg-white/10" />
        <div className="h-[5%] rounded-full bg-white/10" />
      </div>
      <div className="flex-1 p-[7%] flex flex-col gap-[7%]">
        <div className="rounded-md" style={{ height: '24%', background: `linear-gradient(120deg, ${from}, ${to})` }} />
        <div className="grid grid-cols-2 gap-[10%] flex-1">
          <div className="rounded-md bg-white/[0.08]" />
          <div className="rounded-md bg-white/[0.05]" />
          <div className="rounded-md bg-white/[0.05]" />
          <div className="rounded-md bg-white/[0.08]" />
        </div>
      </div>
    </div>
  );
};

const FeatureScreen = ({ tint }) => {
  const [from, to] = tint;
  return (
    <div className="w-full h-full flex items-center gap-[6%] px-[7%]">
      <div className="flex-1 flex flex-col gap-[9%]">
        <div className="h-[26%] w-[80%] rounded-[3px] bg-white/85" />
        <div className="h-[14%] w-[58%] rounded-[2px] bg-white/35" />
        <div className="h-[10%] w-[44%] rounded-full mt-[3%]" style={{ background: `linear-gradient(90deg, ${from}, ${to})` }} />
      </div>
      <div className="w-[28%] h-[88%] rounded-md" style={{ background: `linear-gradient(150deg, ${from}, ${to})`, boxShadow: '0 8px 16px -5px rgba(0,0,0,0.55)' }} />
    </div>
  );
};

export default function FormPreview({ form, style = 'black', tint = ['#8B5CF6', '#F472B6'] }) {
  if (form === 'custom') {
    return (
      <div className="w-20 h-24 rounded-2xl border-2 border-dashed border-white/30 grid place-items-center bg-white/[0.02]">
        <span className="text-3xl font-light text-white/45 leading-none">?</span>
      </div>
    );
  }

  const w = form === 'tablet' ? 74 : form === 'feature' ? 150 : 60;
  const ratio = RATIO[form] || 2.1;
  const h = Math.round(w * ratio);
  const radius = w * 0.19;
  const [light, dark] = FRAME[style] || FRAME.black;
  const bezel = Math.max(2, w * 0.045);

  return (
    <div className="relative" style={{ width: w, height: h }}>
      {form === 'phone' && (
        <>
          <div className="absolute" style={{ right: -bezel * 0.45, top: h * 0.24, width: bezel * 0.55, height: h * 0.07, borderRadius: 2, background: dark }} />
          <div className="absolute" style={{ left: -bezel * 0.45, top: h * 0.19, width: bezel * 0.55, height: h * 0.05, borderRadius: 2, background: dark }} />
          <div className="absolute" style={{ left: -bezel * 0.45, top: h * 0.28, width: bezel * 0.55, height: h * 0.1, borderRadius: 2, background: dark }} />
        </>
      )}
      <div
        style={{
          width: w,
          height: h,
          borderRadius: radius,
          padding: bezel,
          background: `linear-gradient(150deg, ${light}, ${dark} 40%, ${light} 68%, ${dark})`,
          boxShadow: '0 0 0 1px rgba(255,255,255,0.18), 0 24px 44px -18px rgba(0,0,0,0.85)',
        }}
      >
        <div className="w-full h-full overflow-hidden relative bg-[#0b0b10]" style={{ borderRadius: radius * 0.74 }}>
          {form === 'tablet' ? <TabletScreen tint={tint} /> : form === 'feature' ? <FeatureScreen tint={tint} /> : <PhoneScreen tint={tint} />}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(155deg, rgba(255,255,255,0.12) 0%, transparent 30%)' }} />
          {form === 'phone' && (
            <div className="absolute left-1/2 -translate-x-1/2 bg-black rounded-full" style={{ top: h * 0.025, width: w * 0.3, height: w * 0.082 }} />
          )}
          {form === 'tablet' && (
            <div className="absolute left-1/2 -translate-x-1/2 bg-black/70 rounded-full" style={{ top: 2, width: w * 0.03, height: w * 0.03 }} />
          )}
        </div>
      </div>
    </div>
  );
}