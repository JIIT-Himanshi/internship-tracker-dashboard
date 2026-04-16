"use client";

export default function SummaryCard({ label, value, hint, tone = "slate" }) {
  const tones = {
    slate: "from-slate-900 to-slate-700 text-white",
    cyan: "from-cyan-700 to-cyan-500 text-white",
    amber: "from-amber-500 to-orange-500 text-white",
    emerald: "from-emerald-600 to-emerald-500 text-white",
    rose: "from-rose-600 to-rose-500 text-white",
  };

  return (
    <article className={`rounded-2xl bg-gradient-to-br p-4 shadow-sm ${tones[tone] || tones.slate}`}>
      <p className="text-sm opacity-90">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      {hint ? <p className="mt-2 text-xs opacity-80">{hint}</p> : null}
    </article>
  );
}
