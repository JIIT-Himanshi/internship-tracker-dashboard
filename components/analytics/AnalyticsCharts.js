"use client";

export default function AnalyticsCharts({ statusData = [], trendData = [] }) {
  const totalStatus = statusData.reduce((sum, item) => sum + item.value, 0) || 1;
  const maxTrend = Math.max(...trendData.map((item) => item.count), 1);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Applications by Status</h3>
        <div className="mt-4 space-y-3">
          {statusData.map((item) => {
            const width = `${(item.value / totalStatus) * 100}%`;
            return (
              <div key={item.label}>
                <div className="mb-1 flex justify-between text-xs text-slate-500">
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100">
                  <div className="h-3 rounded-full bg-cyan-500" style={{ width }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Monthly Application Trend</h3>
        <div className="mt-4 flex h-40 items-end gap-3">
          {trendData.length ? (
            trendData.map((item) => (
              <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-amber-500/90"
                  style={{ height: `${Math.max((item.count / maxTrend) * 100, 10)}%` }}
                />
                <p className="text-[11px] text-slate-500">{item.month.slice(5)}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">No monthly trend yet. Add applications first.</p>
          )}
        </div>
      </section>
    </div>
  );
}
