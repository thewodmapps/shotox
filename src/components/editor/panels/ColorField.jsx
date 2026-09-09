import React from 'react';
import { Label } from '@/components/ui/label';

const toHex = (c) => {
  if (!c || c.startsWith('#')) return c || '#000000';
  const m = c.match(/\d+/g);
  if (!m) return '#000000';
  return '#' + m.slice(0, 3).map((n) => Number(n).toString(16).padStart(2, '0')).join('');
};

export default function ColorField({ label, value, onChange }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-white/70 text-xs">{label}</Label>
      <label className="flex items-center gap-2 h-9 px-2 rounded-lg bg-white/5 border border-white/10 cursor-pointer">
        <input type="color" value={toHex(value)} onChange={(e) => onChange(e.target.value)} className="w-6 h-6 rounded border-0 bg-transparent cursor-pointer p-0" />
        <span className="text-xs text-white/70 font-mono truncate">{toHex(value)}</span>
      </label>
    </div>
  );
}