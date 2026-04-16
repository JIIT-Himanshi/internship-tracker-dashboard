"use client";

import { useEffect, useMemo, useState } from "react";
import AnalyticsCharts from "@/components/analytics/AnalyticsCharts";
import { getMonthlyTrend } from "@/lib/helpers";
import { STORAGE_KEYS, getStorageItem } from "@/lib/storage";

export default function AnalyticsPage() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    setApplications(getStorageItem(STORAGE_KEYS.APPLICATIONS, []));
  }, []);

  const metrics = useMemo(() => {
    const total = applications.length;
    const interview = applications.filter((item) => item.status === "Interview").length;
    const rejected = applications.filter((item) => item.status === "Rejected").length;
    const selected = applications.filter(
      (item) => item.status === "Selected" || item.status === "Offer Accepted",
    ).length;

    return {
      total,
      interview,
      rejected,
      selected,
      interviewRatio: total ? ((interview / total) * 100).toFixed(1) : 0,
    };
  }, [applications]);

  const statusData = useMemo(
    () => [
      "Saved",
      "Applied",
      "Interview",
      "Rejected",
      "Selected",
      "Offer Accepted",
    ].map((label) => ({ label, value: applications.filter((item) => item.status === label).length })),
    [applications],
  );

  const trendData = useMemo(() => getMonthlyTrend(applications), [applications]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Progress Analytics</h1>
        <p className="text-sm text-slate-500">Track your conversion pipeline and monthly effort.</p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Applications</p>
          <p className="text-3xl font-bold text-slate-900">{metrics.total}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Interview Ratio</p>
          <p className="text-3xl font-bold text-slate-900">{metrics.interviewRatio}%</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Rejected</p>
          <p className="text-3xl font-bold text-slate-900">{metrics.rejected}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Selected</p>
          <p className="text-3xl font-bold text-slate-900">{metrics.selected}</p>
        </div>
      </section>

      <AnalyticsCharts statusData={statusData} trendData={trendData} />
    </div>
  );
}
