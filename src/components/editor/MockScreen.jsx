import React from 'react';

const norm = (hex) => {
  const h = (hex || '').replace('#', '');
  if (/^[0-9a-fA-F]{6}$/.test(h)) return h;
  if (/^[0-9a-fA-F]{3}$/.test(h)) return h.split('').map((c) => c + c).join('');
  return null;
};

const isLight = (hex) => {
  const h = norm(hex);
  if (!h) return false;
  const n = parseInt(h, 16);
  return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255 > 0.62;
};

const isColorful = (hex) => {
  const h = norm(hex);
  if (!h) return false;
  const n = parseInt(h, 16);
  const r = ((n >> 16) & 255) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const s = max === min ? 0 : (max - min) / (1 - Math.abs(2 * l - 1));
  return s > 0.12;
};

const build = (tint) => {
  const from = (tint && (tint.from || tint.color)) || '#7C3AED';
  const to = (tint && tint.to) || from;
  const dark = !isLight(from);
  const primary = isColorful(from) ? from : '#7C3AED';
  const secondary = isColorful(to) ? to : '#EC4899';
  return {
    dark,
    bg: dark ? '#0E0E16' : '#F6F5FB',
    card: dark ? 'rgba(255,255,255,0.06)' : '#FFFFFF',
    line: dark ? 'rgba(255,255,255,0.12)' : 'rgba(11,11,18,0.10)',
    text: dark ? '#FFFFFF' : '#0B0B12',
    sub: dark ? 'rgba(255,255,255,0.55)' : 'rgba(11,11,18,0.45)',
    primary,
    secondary,
    grad: `linear-gradient(135deg, ${primary}, ${secondary})`,
  };
};

const Bar = ({ p, w, h, op, color }) => (
  <div className="rounded-full" style={{ width: w, height: h, background: color || p.text, opacity: op }} />
);

const TopBar = ({ p }) => (
  <div className="flex items-center justify-between mt-[8%]">
    <div className="w-[38%] h-[5%] min-h-[6px] rounded-full" style={{ background: p.text, opacity: 0.85 }} />
    <div className="w-[12%] aspect-square rounded-full" style={{ background: p.grad }} />
  </div>
);

const CTA = ({ p }) => <div className="mt-auto w-full h-[9%] min-h-[14px] rounded-full" style={{ background: p.grad }} />;

const Hero = ({ p }) => (
  <div className="w-full h-full flex flex-col p-[7%] gap-[5%]" style={{ background: p.bg, color: p.text }}>
    <TopBar p={p} />
    <div className="w-full aspect-[16/10] rounded-[10%]" style={{ background: p.grad }} />
    <Bar p={p} w="72%" h="7%" min-h="9px" op={0.9} />
    <Bar p={p} w="55%" h="5%" min-h="6px" color={p.sub} />
    <CTA p={p} />
  </div>
);

const List = ({ p }) => (
  <div className="w-full h-full flex flex-col p-[7%] gap-[4%]" style={{ background: p.bg, color: p.text }}>
    <TopBar p={p} />
    {[0, 1, 2, 3, 4].map((i) => (
      <div key={i} className="flex items-center gap-[4%] rounded-[12%] p-[4%]" style={{ background: p.card }}>
        <div className="w-[12%] aspect-square rounded-[30%]" style={{ background: p.grad }} />
        <div className="flex-1 flex flex-col gap-[4%]">
          <div className="h-[5%] min-h-[6px] w-[70%] rounded-full" style={{ background: p.text, opacity: 0.7 }} />
          <div className="h-[4%] min-h-[5px] w-[45%] rounded-full" style={{ background: p.sub }} />
        </div>
        <div className="w-[5%] aspect-square rounded-full" style={{ background: p.line }} />
      </div>
    ))}
  </div>
);

const Detail = ({ p }) => (
  <div className="w-full h-full flex flex-col p-[7%] gap-[5%]" style={{ background: p.bg, color: p.text }}>
    <div className="flex items-center gap-[4%] mt-[8%]">
      <div className="w-[6%] aspect-square rounded-full" style={{ background: p.line }} />
      <div className="w-[34%] h-[5%] min-h-[6px] rounded-full" style={{ background: p.text, opacity: 0.8 }} />
    </div>
    <div className="w-full aspect-[4/3] rounded-[10%]" style={{ background: p.grad }} />
    <Bar p={p} w="80%" h="7%" min-h="9px" op={0.9} />
    <div className="flex flex-col gap-[3%]">
      <div className="w-full h-[4%] min-h-[5px] rounded-full" style={{ background: p.line }} />
      <div className="w-[92%] h-[4%] min-h-[5px] rounded-full" style={{ background: p.line }} />
      <div className="w-[70%] h-[4%] min-h-[5px] rounded-full" style={{ background: p.line }} />
    </div>
    <CTA p={p} />
  </div>
);

const Stats = ({ p }) => (
  <div className="w-full h-full flex flex-col p-[7%] gap-[5%]" style={{ background: p.bg, color: p.text }}>
    <TopBar p={p} />
    <div className="text-[7%] font-semibold" style={{ color: p.sub }}>This week</div>
    <Bar p={p} w="60%" h="10%" min-h="14px" color={p.primary} />
    <div className="flex items-end gap-[3%] h-[26%]">
      {[40, 70, 55, 90, 65, 80, 45].map((hgt, i) => (
        <div key={i} className="flex-1 rounded-t-[20%]" style={{ height: `${hgt}%`, background: i % 2 ? p.secondary : p.primary }} />
      ))}
    </div>
    <div className="grid grid-cols-3 gap-[5%]">
      {[0, 1, 2].map((i) => (
        <div key={i} className="rounded-[14%] p-[6%] flex flex-col gap-[8%]" style={{ background: p.card }}>
          <div className="w-[50%] h-[5%] min-h-[6px] rounded-full" style={{ background: p.primary }} />
          <div className="w-[80%] h-[7%] min-h-[8px] rounded-full" style={{ background: p.text, opacity: 0.8 }} />
        </div>
      ))}
    </div>
  </div>
);

const Grid = ({ p }) => (
  <div className="w-full h-full flex flex-col p-[7%] gap-[5%]" style={{ background: p.bg, color: p.text }}>
    <TopBar p={p} />
    <Bar p={p} w="60%" h="6%" min-h="8px" op={0.7} />
    <div className="grid grid-cols-2 gap-[5%] flex-1">
      {[0, 1, 2, 3].map((i) => {
        const grad = i % 2 === 0;
        return (
          <div key={i} className="rounded-[14%] flex flex-col justify-end p-[8%] gap-[8%]" style={{ background: grad ? p.grad : p.card }}>
            <div className="w-[60%] h-[5%] min-h-[6px] rounded-full" style={{ background: grad ? 'rgba(255,255,255,0.8)' : p.text, opacity: grad ? 1 : 0.7 }} />
            <div className="w-[40%] h-[6%] min-h-[7px] rounded-full" style={{ background: grad ? 'rgba(255,255,255,0.55)' : p.primary }} />
          </div>
        );
      })}
    </div>
  </div>
);

const Chat = ({ p }) => (
  <div className="w-full h-full flex flex-col p-[7%] gap-[6%]" style={{ background: p.bg, color: p.text }}>
    <div className="flex items-center gap-[4%] mt-[8%]">
      <div className="w-[11%] aspect-square rounded-full" style={{ background: p.grad }} />
      <div className="w-[34%] h-[5%] min-h-[6px] rounded-full" style={{ background: p.text, opacity: 0.8 }} />
    </div>
    <div className="self-start max-w-[72%] rounded-[16%] rounded-bl-[4%] p-[5%] flex flex-col gap-[5%]" style={{ background: p.card }}>
      <div className="w-[80%] h-[4%] min-h-[5px] rounded-full" style={{ background: p.sub }} />
      <div className="w-[60%] h-[4%] min-h-[5px] rounded-full" style={{ background: p.sub }} />
    </div>
    <div className="self-end max-w-[72%] rounded-[16%] rounded-br-[4%] p-[5%] flex flex-col gap-[5%]" style={{ background: p.grad }}>
      <div className="w-[70%] h-[4%] min-h-[5px] rounded-full" style={{ background: 'rgba(255,255,255,0.75)' }} />
      <div className="w-[50%] h-[4%] min-h-[5px] rounded-full" style={{ background: 'rgba(255,255,255,0.55)' }} />
    </div>
    <div className="self-start max-w-[60%] rounded-[16%] p-[5%]" style={{ background: p.card }}>
      <div className="w-full h-[5%] min-h-[6px] rounded-full" style={{ background: p.sub }} />
    </div>
    <CTA p={p} />
  </div>
);

const Profile = ({ p }) => (
  <div className="w-full h-full flex flex-col items-center p-[7%] gap-[5%]" style={{ background: p.bg, color: p.text }}>
    <div className="flex items-center justify-between w-full mt-[8%]">
      <div className="w-[38%] h-[5%] min-h-[6px] rounded-full" style={{ background: p.text, opacity: 0.85 }} />
      <div className="w-[11%] aspect-square rounded-full" style={{ background: p.grad }} />
    </div>
    <div className="w-[28%] aspect-square rounded-full mt-[3%]" style={{ background: p.grad }} />
    <Bar p={p} w="50%" h="6%" min-h="8px" op={0.8} />
    <Bar p={p} w="34%" h="4%" min-h="5px" color={p.sub} />
    <div className="grid grid-cols-3 gap-[6%] w-full">
      {[0, 1, 2].map((i) => (
        <div key={i} className="rounded-[14%] p-[7%] flex flex-col items-center gap-[10%]" style={{ background: p.card }}>
          <div className="w-[55%] h-[6%] min-h-[8px] rounded-full" style={{ background: p.primary }} />
          <div className="w-[80%] h-[4%] min-h-[5px] rounded-full" style={{ background: p.sub }} />
        </div>
      ))}
    </div>
    <CTA p={p} />
  </div>
);

const Success = ({ p }) => (
  <div className="w-full h-full flex flex-col items-center justify-center p-[7%] gap-[6%]" style={{ background: p.bg, color: p.text }}>
    <div className="w-[32%] aspect-square rounded-full flex items-center justify-center" style={{ background: p.grad }}>
      <svg viewBox="0 0 24 24" style={{ width: '48%', height: '48%' }} fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
    </div>
    <Bar p={p} w="60%" h="7%" min-h="9px" op={0.9} />
    <Bar p={p} w="44%" h="4%" min-h="5px" color={p.sub} />
    <div className="w-[70%] h-[9%] min-h-[14px] rounded-full" style={{ background: p.grad }} />
  </div>
);

const VARIANTS = { hero: Hero, list: List, detail: Detail, stats: Stats, grid: Grid, chat: Chat, profile: Profile, success: Success };

export default function MockScreen({ variant, tint }) {
  const p = build(tint);
  const C = VARIANTS[variant] || VARIANTS.hero;
  return <C p={p} />;
}