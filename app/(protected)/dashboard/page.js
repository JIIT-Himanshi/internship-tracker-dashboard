"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SummaryCard from "@/components/dashboard/SummaryCard";
import DeadlineWidget from "@/components/dashboard/DeadlineWidget";
import { calculateDashboardStats } from "@/lib/helpers";
import { STORAGE_KEYS, getStorageItem } from "@/lib/storage";

export default function DashboardPage() {
  const [applications, setApplications] = useState([]);
  const [saved, setSaved] = useState([]);
  const [bullets, setBullets] = useState([]);

  useEffect(() => {
    setApplications(getStorageItem(STORAGE_KEYS.APPLICATIONS, []));
    setSaved(getStorageItem(STORAGE_KEYS.SAVED, []));
    setBullets(getStorageItem(STORAGE_KEYS.BULLETS, []));
  }, []);

  const stats = useMemo(
    () => calculateDashboardStats(applications, saved, bullets),
    [applications, saved, bullets],
  );

  const sortedByDeadline = [...applications]
    .filter((item) => item.deadline)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  const recent = [...applications]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">Your complete internship search control center.</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <SummaryCard label="Total Applications" value={stats.total} tone="slate" />
        <SummaryCard label="Applied" value={stats.applied} tone="cyan" />
        <SummaryCard label="Interview" value={stats.interview} tone="amber" />
        <SummaryCard label="Rejected" value={stats.rejected} tone="rose" />
        <SummaryCard label="Selected" value={stats.selected} tone="emerald" />
        <SummaryCard label="Upcoming Deadlines" value={stats.upcomingDeadlines} tone="cyan" />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Resume Bullets</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{stats.bulletCount}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Saved Opportunities</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{stats.savedCount}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Quick Actions</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href="/applications/add" className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white">
              Add Application
            </Link>
            <Link href="/saved" className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700">
              Add Saved
            </Link>
            <Link href="/resume-helper" className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700">
              Write Bullets
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Recent Applications</h2>
          <div className="mt-4 space-y-3">
            {recent.length ? (
              recent.map((item) => (
                <div key={item.id} className="rounded-xl bg-slate-50 p-3">
                  <p className="font-medium text-slate-900">{item.companyName}</p>
                  <p className="text-sm text-slate-600">{item.role}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No applications yet.</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">Upcoming Deadlines</h2>
          <DeadlineWidget items={sortedByDeadline} />
        </div>
      </section>
    </div>
  );
}
