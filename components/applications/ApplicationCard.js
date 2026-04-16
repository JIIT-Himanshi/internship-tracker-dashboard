"use client";

import Link from "next/link";
import { getDeadlineBucket } from "@/lib/helpers";

function statusTone(status) {
  if (status === "Rejected") return "bg-rose-100 text-rose-700";
  if (status === "Interview") return "bg-amber-100 text-amber-700";
  if (status === "Selected" || status === "Offer Accepted") return "bg-emerald-100 text-emerald-700";
  if (status === "Applied") return "bg-cyan-100 text-cyan-700";
  return "bg-slate-100 text-slate-700";
}

function deadlineTone(bucket) {
  if (bucket.tone === "overdue") return "text-rose-600";
  if (bucket.tone === "urgent") return "text-red-600";
  if (bucket.tone === "upcoming") return "text-amber-600";
  return "text-emerald-600";
}

export default function ApplicationCard({ application, onDelete, onStatusChange }) {
  const bucket = getDeadlineBucket(application.deadline);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{application.companyName}</h3>
          <p className="text-sm text-slate-600">{application.role}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusTone(application.status)}`}>
          {application.status}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-500 sm:grid-cols-3">
        <p>Type: {application.internshipType || "NA"}</p>
        <p>Location: {application.locationType || "NA"}</p>
        <p>Source: {application.source || "NA"}</p>
      </div>

      <p className={`mt-3 text-sm font-medium ${deadlineTone(bucket)}`}>Deadline: {bucket.label}</p>

      {application.notes ? (
        <p className="mt-2 rounded-xl bg-slate-50 p-2 text-sm text-slate-600">{application.notes}</p>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <select
          className="rounded-lg border border-slate-300 px-2 py-1 text-sm"
          value={application.status}
          onChange={(event) => onStatusChange(application.id, event.target.value)}
        >
          {["Saved", "Applied", "Interview", "Rejected", "Selected", "Offer Accepted"].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <Link
          href={`/applications/${application.id}`}
          className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white"
        >
          View/Edit
        </Link>

        <button
          type="button"
          onClick={() => onDelete(application.id)}
          className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-700"
        >
          Delete
        </button>
      </div>
    </article>
  );
}
