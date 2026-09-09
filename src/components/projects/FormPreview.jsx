import React from 'react';

const RATIO = { phone: 2.1, tablet: 1.36, feature: 2.048 };

const FRAME = {
  black: ['#2a2a32', '#0d0d12'],
  titanium: ['#b4b4c0', '#5a5a66'],
  white: ['#f4f4f8', '#c8c8d2'],
};

/* ── iOS phone: status bar, hero, list rows, bottom tab bar ── */
const IosPhoneScreen = ({ tint }) => {
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

/* ── Android phone: material app bar, elevated cards, gesture pill ── */
const AndroidPhoneScreen = ({ tint }) => {
  const [from, to] = tint;
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between px-[7%] pt-[7%]" style={{ height: '8%' }}>
        <div className="w-[16%] h-[42%] rounded-full bg-white/50" />
        <div className="flex items-center gap-[3%]">
          <div className="w-[5%] h-[42%] rounded-full bg-white/35" />
          <div className="w-[9%] h-[55%] rounded-[2px] border border-white/50" />
        </div>
      </div>
      <div className="px-[7%] flex items-center gap-[6%]" style={{ height: '13%', background: `linear-gradient(125deg, ${from}, ${to})` }}>
        <div className="w-[9%] h-[45%] rounded-full bg-white/75" />
        <div className="h-[42%] w-[42%] rounded-full bg-white/65" />
        <div className="ml-auto w-[9%] h-[45%] rounded-full bg-white/55" />
      </div>
      <div className="flex flex-col gap-[5%] px-[6%] mt-[6%] flex-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg bg-white/[0.07] flex items-center gap-[6%] px-[5%]" style={{ height: '27%', boxShadow: '0 2px 6px -2px rgba(0,0,0,0.5)' }}>
            <div className="rounded-md shrink-0" style={{ width: '15%', height: '60%', background: `linear-gradient(135deg, ${from}, ${to})` }} />
            <div className="flex-1 flex flex-col gap-[24%] justify-center">
              <div className="h-[40%] w-[72%] rounded-full bg-white/45" />
              <div className="h-[30%] w-[44%] rounded-full bg-white/20" />
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto mb-[6%] rounded-full bg-white/50" style={{ width: '26%', height: '4%' }} />
    </div>
  );
};

/* ── iPad: sidebar nav + content grid ── */
const IosTabletScreen = ({ tint }) => {
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

/* ── Android tablet: search bar + app grid (home screen) ── */
const AndroidTabletScreen = ({ tint }) => {
  const [from, to] = tint;
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between px-[6%] pt-[6%]" style={{ height: '8%' }}>
        <div className="w-[12%] h-[45%] rounded-full bg-white/50" />
        <div className="flex items-center gap-[3%]">
          <div className="w-[4%] h-[45%] rounded-full bg-white/35" />
          <div className="w-[8%] h-[55%] rounded-[2px] border border-white/50" />
        </div>
      </div>
      <div className="mx-[6%] mt-[3%] rounded-full bg-white/[0.08] flex items-center px-[5%] gap-[5%]" style={{ height: '11%' }}>
        <div className="w-[6%] h-[45%] rounded-full bg-white/45" />
        <div className="h-[35%] w-[55%] rounded-full bg-white/25" />
      </div>
      <div className="grid grid-cols-4 gap-x-[7%] gap-y-[12%] px-[7%] mt-[7%] flex-1">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="rounded-xl" style={{ aspectRatio: '1 / 1', background: `linear-gradient(135deg, ${from}, ${to})`, opacity: i % 2 ? 0.65 : 1 }} />
        ))}
      </div>
    </div>
  );
};

/* ── Feature graphic: app icon + title + tagline + CTA (landscape banner) ── */
const FeatureScreen = ({ tint }) => {
  const [from, to] = tint;
  return (
    <div className="w-full h-full flex items-center gap-[9%] px-[9%]">
      <div className="rounded-[24%] shrink-0" style={{ width: '34%', aspectRatio: '1 / 1', background: `linear-gradient(135deg, ${from}, ${to})`, boxShadow: '0 8px 18px -6px rgba(0,0,0,0.55)' }} />
      <div className="flex-1 flex flex-col gap-[15%] min-w-0">
        <div className="h-[30%] w-[90%] rounded-[3px] bg-white/90" />
        <div className="h-[16%] w-[62%] rounded-[2px] bg-white/40" />
        <div className="inline-flex items-center gap-[14%] rounded-full bg-white/[0.12] border border-white/15 px-[10%] self-start" style={{ height: '26%' }}>
          <div className="rounded-full" style={{ height: '60%', aspectRatio: '1 / 1', background: `linear-gradient(135deg, ${from}, ${to})` }} />
          <div className="rounded-full bg-white/70" style={{ height: '45%', aspectRatio: '5 / 1' }} />
        </div>
      </div>
    </div>
  );
};

export default function FormPreview({ form, platform, style, tint }) {
  if (form === 'custom') {
    return (
      <div className="w-20 h-24 rounded-2xl border-2 border-dashed border-white/30 grid place-items-center bg-white/[0.02]">
        <span className="text-3xl font-light text-white/45 leading-none">?</span>
      </div>
    );
  }

  const isAndroid = platform === 'android';
  const resolvedTint = tint || (isAndroid ? ['#6366F1', '#22D3EE'] : ['#8B5CF6', '#F472B6']);
  const frameStyle = style || (isAndroid ? 'titanium' : 'black');
  const w = form === 'tablet' ? 80 : form === 'feature' ? 144 : 62;
  const ratio = RATIO[form] || 2.1;
  const h = Math.round(w * ratio);
  const radius = form === 'feature' ? w * 0.05 : isAndroid ? w * 0.135 : w * 0.19;
  const [light, dark] = FRAME[frameStyle] || FRAME.black;
  const bezel = Math.max(2, w * (form === 'tablet' ? 0.04 : form === 'feature' ? 0.025 : 0.045));

  const Screen = form === 'tablet'
    ? (isAndroid ? AndroidTabletScreen : IosTabletScreen)
    : form === 'feature'
      ? FeatureScreen
      : (isAndroid ? AndroidPhoneScreen : IosPhoneScreen);

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
        <div className="w-full h-full overflow-hidden relative bg-[#0b0b10]" style={{ borderRadius: radius * 0.78 }}>
          <Screen tint={resolvedTint} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(155deg, rgba(255,255,255,0.12) 0%, transparent 30%)' }} />
          {form === 'phone' && isAndroid && (
            <div className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black" style={{ top: h * 0.03, width: w * 0.06, height: w * 0.06, boxShadow: '0 0 0 1px rgba(255,255,255,0.06)' }} />
          )}
          {form === 'phone' && !isAndroid && (
            <div className="absolute left-1/2 -translate-x-1/2 bg-black rounded-full" style={{ top: h * 0.025, width: w * 0.3, height: w * 0.082 }} />
          )}
          {form === 'tablet' && isAndroid && (
            <div className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black" style={{ top: 2, width: w * 0.03, height: w * 0.03 }} />
          )}
          {form === 'tablet' && !isAndroid && (
            <div className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black/60" style={{ top: 2, width: w * 0.022, height: w * 0.022 }} />
          )}
        </div>
      </div>
    </div>
  );
}