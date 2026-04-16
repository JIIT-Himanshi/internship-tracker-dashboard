"use client";

import { useRouter } from "next/navigation";
import ApplicationForm from "@/components/applications/ApplicationForm";
import { STORAGE_KEYS, generateId, getStorageItem, setStorageItem } from "@/lib/storage";

export default function AddApplicationPage() {
  const router = useRouter();

  const handleSubmit = (payload) => {
    const list = getStorageItem(STORAGE_KEYS.APPLICATIONS, []);
    const next = [
      {
        id: generateId("app"),
        ...payload,
        createdAt: new Date().toISOString(),
      },
      ...list,
    ];

    setStorageItem(STORAGE_KEYS.APPLICATIONS, next);
    router.push("/applications");
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Add Application</h1>
        <p className="text-sm text-slate-500">Capture complete internship details in one place.</p>
      </div>
      <ApplicationForm onSubmit={handleSubmit} submitLabel="Add Application" />
    </div>
  );
}
