import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';

const toHex = (c) => {
  if (!c || c.startsWith('#')) return c || '#000000';
  const m = c.match(/\d+/g);
  if (!m) return '#000000';
  return '#' + m.slice(0, 3).map((n) => Number(n).toString(16).padStart(2, '0')).join('');
};

const isValidHex = (v) => /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v);

export default function ColorField({ label, value, onChange }) {
  const hex = toHex(value);
  const [text, setText] = useState(hex);
  useEffect(() => { setText(toHex(value)); }, [value]);

  return (
    <div className="space-y-1.5">
      <Label className="text-white/70 text-xs">{label}</Label>
      <div className="flex items-center gap-2 h-9 px-2 rounded-lg bg-white/5 border border-white/10">
        <input type="color" value={hex} onChange={(e) => onChange(e.target.value)} className="w-6 h-6 rounded border-0 bg-transparent cursor-pointer p-0 shrink-0" />
        <input
          type="text"
          value={text}
          onChange={(e) => {
            const v = e.target.value.startsWith('#') ? e.target.value : '#' + e.target.value;
            setText(v);
            if (isValidHex(v)) onChange(v);
          }}
          onBlur={() => { if (!isValidHex(text)) setText(hex); }}
          className="flex-1 min-w-0 bg-transparent text-xs text-white/90 font-mono outline-none uppercase"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}