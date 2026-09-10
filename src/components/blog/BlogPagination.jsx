import React from 'react';

// Compact windowed pagination: shows at most 7 slots with ellipses,
// so it never overflows on narrow phone screens.
export default function BlogPagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const slots = buildWindow(page, totalPages);

  return (
    <nav className="flex items-center justify-center gap-2 mt-12 flex-wrap">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-4 h-10 rounded-xl border border-[#e5e7eb] text-sm font-medium text-[#111827] disabled:opacity-40 hover:bg-[#f9fafb] transition-colors"
      >
        Prev
      </button>
      {slots.map((slot, i) =>
        slot === '…' ? (
          <span key={`e${i}`} className="w-10 h-10 flex items-center justify-center text-[#9ca3af] text-sm">
            …
          </span>
        ) : (
          <button
            key={slot}
            onClick={() => onChange(slot)}
            className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${
              slot === page
                ? 'bg-[#7C3AED] text-white border border-[#7C3AED]'
                : 'bg-white text-[#111827] border border-[#e5e7eb] hover:bg-[#f9fafb]'
            }`}
          >
            {slot}
          </button>
        )
      )}
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="px-4 h-10 rounded-xl border border-[#e5e7eb] text-sm font-medium text-[#111827] disabled:opacity-40 hover:bg-[#f9fafb] transition-colors"
      >
        Next
      </button>
    </nav>
  );
}

// Build a max-7-slot window: first, last, current ±1, with ellipses as needed.
function buildWindow(page, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const slots = [];
  const add = (n) => slots.push(n);

  add(1);

  const left = Math.max(2, page - 2);
  const right = Math.min(total - 1, page + 2);

  if (left > 2) add('…');
  for (let p = left; p <= right; p++) add(p);
  if (right < total - 1) add('…');

  add(total);
  return slots;
}