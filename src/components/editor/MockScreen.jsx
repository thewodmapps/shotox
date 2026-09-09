import React from 'react';

export default function MockScreen() {
  return (
    <div className="w-full h-full bg-[#F4F4F7] flex flex-col p-[6%] gap-[5%] text-[#0B0B12]">
      <div className="flex items-center justify-between mt-[10%]">
        <div className="w-[38%] h-[5%] min-h-[6px] rounded-full bg-[#0B0B12]/80" />
        <div className="w-[12%] aspect-square rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
      </div>
      <div className="w-full aspect-[16/10] rounded-[10%] bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-400" />
      <div className="grid grid-cols-2 gap-[6%]">
        <div className="aspect-square rounded-[14%] bg-white shadow-sm" />
        <div className="aspect-square rounded-[14%] bg-white shadow-sm" />
      </div>
      <div className="flex flex-col gap-[4%] flex-1">
        <div className="w-[80%] h-[4%] min-h-[5px] rounded-full bg-[#0B0B12]/15" />
        <div className="w-[60%] h-[4%] min-h-[5px] rounded-full bg-[#0B0B12]/15" />
        <div className="w-[70%] h-[4%] min-h-[5px] rounded-full bg-[#0B0B12]/15" />
      </div>
      <div className="w-full h-[7%] min-h-[10px] rounded-full bg-[#0B0B12]" />
    </div>
  );
}