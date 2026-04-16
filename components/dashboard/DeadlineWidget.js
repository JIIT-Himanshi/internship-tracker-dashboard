"use client";

import { getDeadlineBucket } from "@/lib/helpers";

function badgeStyle(tone) {
  if (tone === "overdue") return "bg-rose-100 text-rose-700";
  if (tone === "urgent") return "bg-red-100 text-red-700";
  if (tone === "upcoming") return "bg-amber-100 text-amber-700";
  return "bg-emerald-100 text-emerald-700";
}

export default function DeadlineWidget({ items = [] }) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
        No deadlines yet. Add applications with a deadline to track urgency.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.slice(0, 6).map((item) => {
        const bucket = getDeadlineBucket(item.deadline);
        return (
          <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">{item.companyName}</p>
                <p className="text-sm text-slate-500">{item.role}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${badgeStyle(bucket.tone)}`}>
                {bucket.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
