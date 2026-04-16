"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ApplicationForm from "@/components/applications/ApplicationForm";
import { STORAGE_KEYS, getStorageItem, setStorageItem } from "@/lib/storage";

export default function ApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    setApplications(getStorageItem(STORAGE_KEYS.APPLICATIONS, []));
  }, []);

  const application = useMemo(
    () => applications.find((item) => item.id === params.id),
    [applications, params.id],
  );

  const handleUpdate = (payload) => {
    const next = applications.map((item) => (item.id === params.id ? { ...item, ...payload } : item));
    setApplications(next);
    setStorageItem(STORAGE_KEYS.APPLICATIONS, next);
    router.push("/applications");
  };

  const handleDelete = () => {
    const next = applications.filter((item) => item.id !== params.id);
    setApplications(next);
    setStorageItem(STORAGE_KEYS.APPLICATIONS, next);
    router.push("/applications");
  };

  if (!application) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-sm text-slate-600">Application not found.</p>
        <Link href="/applications" className="mt-3 inline-block text-sm font-semibold text-cyan-700">
          Back to applications
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{application.companyName}</h1>
          <p className="text-sm text-slate-500">Edit details, status, and notes.</p>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700"
        >
          Delete
        </button>
      </div>

      <ApplicationForm
        initialValues={application}
        onSubmit={handleUpdate}
        submitLabel="Update Application"
      />
    </div>
  );
}
