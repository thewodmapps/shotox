import React from 'react';

const P = (variant) => variant || 'productivity';

const Productivity = () => (
  <div className="w-full h-full bg-[#F6F5FB] flex flex-col p-[6%] gap-[5%] text-[#0B0B12]">
    <div className="flex items-center justify-between mt-[9%]">
      <div className="w-[34%] h-[5%] min-h-[6px] rounded-full bg-[#0B0B12]/80" />
      <div className="w-[11%] aspect-square rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
    </div>
    <div className="w-[70%] h-[6%] min-h-[8px] rounded-full bg-[#0B0B12]/70" />
    {['Review Q3 report', 'Call with design team', 'Reply to investor', 'Plan launch day'].map((t, i) => (
      <div key={i} className="flex items-center gap-[4%] bg-white rounded-[10%] p-[4%] shadow-sm">
        <div className={`w-[8%] aspect-square rounded-[30%] border-2 ${i < 2 ? 'bg-violet-500 border-violet-500' : 'border-black/20'}`} />
        <div className="flex-1 h-[4%] min-h-[6px] rounded-full bg-[#0B0B12]/15" />
      </div>
    ))}
    <div className="mt-auto w-full h-[8%] min-h-[12px] rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500" />
  </div>
);

const Finance = () => (
  <div className="w-full h-full bg-[#0B0F1A] flex flex-col p-[6%] gap-[5%] text-white">
    <div className="flex items-center justify-between mt-[9%]">
      <div className="w-[40%] h-[5%] min-h-[6px] rounded-full bg-white/70" />
      <div className="w-[11%] aspect-square rounded-full bg-lime-400" />
    </div>
    <div className="text-[8%] opacity-70">Total balance</div>
    <div className="w-[55%] h-[9%] min-h-[12px] rounded-full bg-white" />
    <svg viewBox="0 0 100 40" className="w-full h-[24%]" preserveAspectRatio="none">
      <polyline points="0,32 18,24 34,28 50,12 66,18 82,6 100,14" fill="none" stroke="#A3E635" strokeWidth="2.5" />
      <polyline points="0,32 18,24 34,28 50,12 66,18 82,6 100,14 100,40 0,40" fill="url(#g)" opacity="0.25" />
      <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#A3E635" /><stop offset="1" stopColor="#A3E635" stopOpacity="0" /></linearGradient></defs>
    </svg>
    {['BTC', 'ETH', 'SOL'].map((c) => (
      <div key={c} className="flex items-center justify-between bg-white/5 rounded-[12%] p-[4%]">
        <div className="w-[10%] aspect-square rounded-full bg-white/20" />
        <div className="flex-1 ml-[4%] h-[4%] min-h-[5px] rounded-full bg-white/25" />
        <div className="w-[18%] h-[4%] min-h-[5px] rounded-full bg-lime-400/80" />
      </div>
    ))}
  </div>
);

const Beauty = () => (
  <div className="w-full h-full bg-[#FDF2F8] flex flex-col p-[6%] gap-[5%] text-[#4C1D95]">
    <div className="flex items-center justify-between mt-[9%]">
      <div className="w-[38%] h-[5%] min-h-[6px] rounded-full bg-[#4C1D95]/80" />
      <div className="w-[11%] aspect-square rounded-full bg-gradient-to-br from-pink-300 to-violet-300" />
    </div>
    <div className="w-[60%] h-[6%] min-h-[8px] rounded-full bg-[#4C1D95]/70" />
    <div className="grid grid-cols-2 gap-[5%]">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="aspect-[3/4] rounded-[14%] bg-gradient-to-br from-pink-200 to-violet-200 shadow-sm flex flex-col justify-end p-[8%] gap-[6%]">
          <div className="w-[70%] h-[4%] min-h-[5px] rounded-full bg-[#4C1D95]/50" />
          <div className="w-[40%] h-[5%] min-h-[6px] rounded-full bg-[#4C1D95]" />
        </div>
      ))}
    </div>
    <div className="mt-auto w-full h-[8%] min-h-[12px] rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500" />
  </div>
);

const Food = () => (
  <div className="w-full h-full bg-[#FFF7ED] flex flex-col p-[6%] gap-[5%] text-[#7C2D12]">
    <div className="flex items-center justify-between mt-[9%]">
      <div className="w-[40%] h-[5%] min-h-[6px] rounded-full bg-[#7C2D12]/80" />
      <div className="w-[11%] aspect-square rounded-full bg-orange-500" />
    </div>
    {[0, 1, 2].map((i) => (
      <div key={i} className="flex gap-[4%] bg-white rounded-[12%] p-[4%] shadow-sm">
        <div className="w-[26%] aspect-square rounded-[14%] bg-gradient-to-br from-orange-300 to-rose-400" />
        <div className="flex-1 flex flex-col gap-[5%] justify-center">
          <div className="w-[70%] h-[5%] min-h-[6px] rounded-full bg-[#7C2D12]/60" />
          <div className="w-[50%] h-[4%] min-h-[5px] rounded-full bg-[#7C2D12]/30" />
          <div className="flex gap-[3%] items-center">
            <div className="w-[6%] aspect-square rounded-full bg-amber-400" />
            <div className="w-[24%] h-[3%] min-h-[4px] rounded-full bg-[#7C2D12]/40" />
          </div>
        </div>
      </div>
    ))}
    <div className="mt-auto w-full h-[8%] min-h-[12px] rounded-full bg-gradient-to-r from-orange-500 to-rose-500" />
  </div>
);

const Travel = () => (
  <div className="w-full h-full bg-[#0C1840] flex flex-col p-[6%] gap-[5%] text-white">
    <div className="flex items-center justify-between mt-[9%]">
      <div className="w-[38%] h-[5%] min-h-[6px] rounded-full bg-white/80" />
      <div className="w-[11%] aspect-square rounded-full bg-sky-400" />
    </div>
    <div className="w-[62%] h-[6%] min-h-[8px] rounded-full bg-white/70" />
    <div className="w-full aspect-[16/10] rounded-[12%] bg-gradient-to-br from-sky-400 via-cyan-300 to-indigo-500 flex flex-col justify-end p-[7%] gap-[5%]">
      <div className="w-[50%] h-[6%] min-h-[7px] rounded-full bg-white" />
      <div className="w-[34%] h-[4%] min-h-[5px] rounded-full bg-white/60" />
    </div>
    <div className="flex gap-[4%]">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex-1 aspect-square rounded-[16%] bg-gradient-to-br from-indigo-400 to-sky-300" />
      ))}
    </div>
    <div className="mt-auto w-full h-[8%] min-h-[12px] rounded-full bg-gradient-to-r from-sky-400 to-indigo-500" />
  </div>
);

const Fitness = () => (
  <div className="w-full h-full bg-[#0B1410] flex flex-col items-center p-[6%] gap-[5%] text-white">
    <div className="flex items-center justify-between w-full mt-[9%]">
      <div className="w-[34%] h-[5%] min-h-[6px] rounded-full bg-white/70" />
      <div className="w-[11%] aspect-square rounded-full bg-lime-400" />
    </div>
    <svg viewBox="0 0 100 100" className="w-[42%] aspect-square">
      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="9" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="#4ADE80" strokeWidth="9" strokeLinecap="round" strokeDasharray="220 264" transform="rotate(-90 50 50)" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="7" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="#22D3EE" strokeWidth="7" strokeLinecap="round" strokeDasharray="120 188" transform="rotate(-90 50 50)" />
    </svg>
    <div className="w-full grid grid-cols-3 gap-[6%]">
      {['Steps', 'BPM', 'Kcal'].map((l) => (
        <div key={l} className="bg-white/5 rounded-[14%] p-[6%] flex flex-col gap-[8%]">
          <div className="w-[60%] h-[5%] min-h-[6px] rounded-full bg-lime-400/70" />
          <div className="w-[80%] h-[7%] min-h-[8px] rounded-full bg-white/80" />
        </div>
      ))}
    </div>
    <div className="mt-auto w-full h-[8%] min-h-[12px] rounded-full bg-gradient-to-r from-lime-400 to-emerald-500" />
  </div>
);

const Education = () => (
  <div className="w-full h-full bg-[#FAF5EF] flex flex-col p-[6%] gap-[5%] text-[#1C1917]">
    <div className="flex items-center justify-between mt-[9%]">
      <div className="w-[40%] h-[5%] min-h-[6px] rounded-full bg-[#1C1917]/80" />
      <div className="w-[11%] aspect-square rounded-full bg-amber-700" />
    </div>
    <div className="w-full aspect-[16/10] rounded-[10%] bg-gradient-to-br from-amber-200 to-orange-300" />
    <div className="w-[80%] h-[7%] min-h-[9px] rounded-full bg-[#1C1917]/80" />
    <div className="flex flex-col gap-[4%]">
      <div className="w-full h-[4%] min-h-[5px] rounded-full bg-[#1C1917]/20" />
      <div className="w-[92%] h-[4%] min-h-[5px] rounded-full bg-[#1C1917]/20" />
      <div className="w-[70%] h-[4%] min-h-[5px] rounded-full bg-[#1C1917]/20" />
    </div>
    <div className="mt-auto w-full h-[8%] min-h-[12px] rounded-full bg-[#1C1917]" />
  </div>
);

const Social = () => (
  <div className="w-full h-full bg-[#0F0524] flex flex-col p-[6%] gap-[5%] text-white">
    <div className="flex items-center justify-between mt-[9%]">
      <div className="w-[36%] h-[5%] min-h-[6px] rounded-full bg-white/80" />
      <div className="w-[11%] aspect-square rounded-full bg-gradient-to-br from-violet-400 to-pink-400" />
    </div>
    <div className="flex items-center gap-[4%]">
      <div className="w-[14%] aspect-square rounded-full bg-gradient-to-br from-fuchsia-400 to-violet-400" />
      <div className="flex-1 h-[5%] min-h-[6px] rounded-full bg-white/30" />
    </div>
    <div className="w-full aspect-[4/3] rounded-[10%] bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400" />
    <div className="flex gap-[6%] items-center">
      <div className="w-[8%] aspect-square rounded-full bg-rose-400" />
      <div className="w-[8%] aspect-square rounded-full bg-sky-400" />
      <div className="w-[30%] h-[4%] min-h-[5px] rounded-full bg-white/25" />
    </div>
    <div className="mt-auto w-full h-[8%] min-h-[12px] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
  </div>
);

const AI = () => (
  <div className="w-full h-full bg-[#0B0B12] flex flex-col p-[6%] gap-[6%] text-white">
    <div className="flex items-center justify-between mt-[9%]">
      <div className="w-[40%] h-[5%] min-h-[6px] rounded-full bg-white/80" />
      <div className="w-[11%] aspect-square rounded-full bg-lime-300" />
    </div>
    <div className="self-start max-w-[72%] bg-white/10 rounded-[16%] rounded-bl-[4%] p-[5%] flex flex-col gap-[6%]">
      <div className="w-[80%] h-[4%] min-h-[5px] rounded-full bg-white/50" />
      <div className="w-[60%] h-[4%] min-h-[5px] rounded-full bg-white/50" />
    </div>
    <div className="self-end max-w-[72%] bg-lime-300 text-black rounded-[16%] rounded-br-[4%] p-[5%] flex flex-col gap-[6%]">
      <div className="w-[70%] h-[4%] min-h-[5px] rounded-full bg-black/40" />
      <div className="w-[50%] h-[4%] min-h-[5px] rounded-full bg-black/40" />
    </div>
    <div className="self-start max-w-[60%] bg-white/10 rounded-[16%] p-[5%]">
      <div className="w-full h-[5%] min-h-[6px] rounded-full bg-white/50" />
    </div>
    <div className="mt-auto w-full h-[8%] min-h-[12px] rounded-full bg-lime-300" />
  </div>
);

const Entertainment = () => (
  <div className="w-full h-full bg-[#0B0B12] flex flex-col p-[6%] gap-[5%] text-white">
    <div className="flex items-center justify-between mt-[9%]">
      <div className="w-[38%] h-[5%] min-h-[6px] rounded-full bg-white/80" />
      <div className="w-[11%] aspect-square rounded-full bg-violet-500" />
    </div>
    <div className="w-full aspect-video rounded-[10%] bg-gradient-to-br from-violet-700 via-fuchsia-600 to-rose-500 flex items-center justify-center">
      <div className="w-0 h-0 border-y-[7%] border-y-transparent border-l-[12%] border-l-white ml-[3%]" style={{ borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: '18px solid white' }} />
    </div>
    <div className="w-[70%] h-[6%] min-h-[8px] rounded-full bg-white/70" />
    <div className="grid grid-cols-3 gap-[5%]">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="aspect-[3/4] rounded-[12%] bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
      ))}
    </div>
  </div>
);

const Games = () => (
  <div className="w-full h-full bg-[#0B0B12] flex flex-col p-[6%] gap-[5%] text-white">
    <div className="flex items-center justify-between mt-[9%]">
      <div className="w-[38%] h-[5%] min-h-[6px] rounded-full bg-white/80" />
      <div className="w-[11%] aspect-square rounded-full bg-gradient-to-br from-violet-500 to-cyan-400" />
    </div>
    <div className="w-full aspect-[16/10] rounded-[12%] bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 flex items-center justify-center">
      <div className="w-[22%] aspect-square rounded-full bg-white/90 flex items-center justify-center">
        <div className="w-0 h-0" style={{ borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '12px solid #0B0B12' }} />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-[5%]">
      {[0, 1].map((i) => (
        <div key={i} className="aspect-[2/1] rounded-[14%] bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center px-[8%]">
          <div className="flex-1 h-[5%] min-h-[6px] rounded-full bg-white/70" />
        </div>
      ))}
    </div>
    <div className="mt-auto w-full h-[8%] min-h-[12px] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
  </div>
);

const Health = () => (
  <div className="w-full h-full bg-[#F0FDF4] flex flex-col items-center p-[6%] gap-[5%] text-[#14532D]">
    <div className="flex items-center justify-between w-full mt-[9%]">
      <div className="w-[36%] h-[5%] min-h-[6px] rounded-full bg-[#14532D]/80" />
      <div className="w-[11%] aspect-square rounded-full bg-emerald-400" />
    </div>
    <svg viewBox="0 0 100 100" className="w-[46%] aspect-square">
      <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(20,83,45,0.12)" strokeWidth="6" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#10B981" strokeWidth="6" strokeLinecap="round" strokeDasharray="200 252" transform="rotate(-90 50 50)" />
      <circle cx="50" cy="50" r="26" fill="none" stroke="rgba(20,83,45,0.12)" strokeWidth="5" />
      <circle cx="50" cy="50" r="26" fill="none" stroke="#34D399" strokeWidth="5" strokeLinecap="round" strokeDasharray="110 164" transform="rotate(-90 50 50)" />
    </svg>
    <div className="w-[60%] h-[7%] min-h-[9px] rounded-full bg-[#14532D]/70" />
    <div className="w-full grid grid-cols-2 gap-[6%]">
      {['Mood', 'Sleep'].map((l) => (
        <div key={l} className="bg-white rounded-[14%] p-[6%] flex flex-col gap-[8%]">
          <div className="w-[50%] h-[5%] min-h-[6px] rounded-full bg-emerald-400/70" />
          <div className="w-[70%] h-[6%] min-h-[7px] rounded-full bg-[#14532D]/70" />
        </div>
      ))}
    </div>
    <div className="mt-auto w-full h-[8%] min-h-[12px] rounded-full bg-gradient-to-r from-emerald-400 to-teal-500" />
  </div>
);

const MAP = {
  productivity: Productivity,
  finance: Finance,
  beauty: Beauty,
  food: Food,
  travel: Travel,
  fitness: Fitness,
  education: Education,
  social: Social,
  ai: AI,
  entertainment: Entertainment,
  games: Games,
  health: Health,
};

export default function MockScreen({ variant }) {
  const C = MAP[P((variant || '').toLowerCase())] || Productivity;
  return <C />;
}