import React from 'react';

export default function BlogPagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-4 h-10 rounded-xl border border-[#e5e7eb] text-sm font-medium text-[#111827] disabled:opacity-40 hover:bg-[#f9fafb] transition-colors"
      >
        Prev
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${
            p === page
              ? 'bg-[#7C3AED] text-white border border-[#7C3AED]'
              : 'bg-white text-[#111827] border border-[#e5e7eb] hover:bg-[#f9fafb]'
          }`}
        >
          {p}
        </button>
      ))}
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