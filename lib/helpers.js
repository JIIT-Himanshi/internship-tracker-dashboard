"use client";

export const APPLICATION_STATUS = [
  "Saved",
  "Applied",
  "Interview",
  "Rejected",
  "Selected",
  "Offer Accepted",
];

export const LOCATION_TYPES = ["Remote", "Hybrid", "Onsite"];

export function getDeadlineBucket(deadline) {
  if (!deadline) return { tone: "safe", label: "No deadline" };

  const now = new Date();
  const end = new Date(deadline);
  const oneDay = 1000 * 60 * 60 * 24;
  const diffDays = Math.ceil((end - now) / oneDay);

  if (diffDays < 0) return { tone: "overdue", label: `${Math.abs(diffDays)}d overdue` };
  if (diffDays <= 2) return { tone: "urgent", label: `${diffDays}d left` };
  if (diffDays <= 7) return { tone: "upcoming", label: `${diffDays}d left` };
  return { tone: "safe", label: `${diffDays}d left` };
}

export function calculateDashboardStats(applications = [], saved = [], bullets = []) {
  const total = applications.length;
  const applied = applications.filter((item) => item.status === "Applied").length;
  const interview = applications.filter((item) => item.status === "Interview").length;
  const rejected = applications.filter((item) => item.status === "Rejected").length;
  const selected = applications.filter(
    (item) => item.status === "Selected" || item.status === "Offer Accepted",
  ).length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingDeadlines = applications.filter((item) => {
    if (!item.deadline) return false;
    const deadline = new Date(item.deadline);
    deadline.setHours(0, 0, 0, 0);
    const diff = (deadline - today) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 7;
  }).length;

  return {
    total,
    applied,
    interview,
    rejected,
    selected,
    upcomingDeadlines,
    savedCount: saved.length,
    bulletCount: bullets.length,
  };
}

export function getMonthlyTrend(applications = []) {
  const map = {};
  applications.forEach((item) => {
    if (!item.dateApplied) return;
    const d = new Date(item.dateApplied);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    map[key] = (map[key] || 0) + 1;
  });

  return Object.entries(map)
    .sort(([a], [b]) => (a > b ? 1 : -1))
    .slice(-6)
    .map(([month, count]) => ({ month, count }));
}
