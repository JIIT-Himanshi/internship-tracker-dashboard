"use client";

import { useEffect, useState } from "react";
import { STORAGE_KEYS, generateId, getStorageItem, setStorageItem } from "@/lib/storage";

const initialForm = {
  companyName: "",
  role: "",
  link: "",
  deadline: "",
  locationType: "Remote",
  notes: "",
};

export default function SavedPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    setItems(getStorageItem(STORAGE_KEYS.SAVED, []));
  }, []);

  const persist = (next) => {
    setItems(next);
    setStorageItem(STORAGE_KEYS.SAVED, next);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.companyName.trim() || !form.role.trim()) return;

    if (editingId) {
      const next = items.map((item) => (item.id === editingId ? { ...item, ...form } : item));
      persist(next);
    } else {
      const next = [{ id: generateId("saved"), ...form, createdAt: new Date().toISOString() }, ...items];
      persist(next);
    }

    setEditingId(null);
    setForm(initialForm);
  };

  const handleDelete = (id) => {
    persist(items.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm(item);
  };

  const moveToApplications = (item) => {
    const apps = getStorageItem(STORAGE_KEYS.APPLICATIONS, []);
    const nextApps = [
      {
        id: generateId("app"),
        companyName: item.companyName,
        role: item.role,
        internshipType: "",
        applyLink: item.link,
        dateApplied: "",
        deadline: item.deadline,
        locationType: item.locationType,
        stipend: "",
        source: "Saved Opportunity",
        status: "Saved",
        notes: item.notes,
        createdAt: new Date().toISOString(),
      },
      ...apps,
    ];

    setStorageItem(STORAGE_KEYS.APPLICATIONS, nextApps);
    handleDelete(item.id);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Saved Opportunities</h1>
        <p className="text-sm text-slate-500">Store opportunities first, then convert to applications.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-2">
        <input required placeholder="Company" className="rounded-lg border border-slate-300 px-3 py-2" value={form.companyName} onChange={(e) => setForm((prev) => ({ ...prev, companyName: e.target.value }))} />
        <input required placeholder="Role" className="rounded-lg border border-slate-300 px-3 py-2" value={form.role} onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))} />
        <input placeholder="Opportunity Link" className="rounded-lg border border-slate-300 px-3 py-2" value={form.link} onChange={(e) => setForm((prev) => ({ ...prev, link: e.target.value }))} />
        <input type="date" className="rounded-lg border border-slate-300 px-3 py-2" value={form.deadline} onChange={(e) => setForm((prev) => ({ ...prev, deadline: e.target.value }))} />
        <select className="rounded-lg border border-slate-300 px-3 py-2" value={form.locationType} onChange={(e) => setForm((prev) => ({ ...prev, locationType: e.target.value }))}>
          <option>Remote</option>
          <option>Hybrid</option>
          <option>Onsite</option>
        </select>
        <input placeholder="Notes" className="rounded-lg border border-slate-300 px-3 py-2" value={form.notes} onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))} />

        <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white md:col-span-2">
          {editingId ? "Update Opportunity" : "Save Opportunity"}
        </button>
      </form>

      <div className="space-y-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{item.companyName}</h3>
                <p className="text-sm text-slate-600">{item.role}</p>
                <p className="mt-2 text-xs text-slate-500">{item.notes || "No notes"}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">{item.locationType}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" onClick={() => handleEdit(item)} className="rounded-lg border border-slate-300 px-3 py-1 text-sm">
                Edit
              </button>
              <button type="button" onClick={() => handleDelete(item.id)} className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1 text-sm text-rose-700">
                Delete
              </button>
              <button type="button" onClick={() => moveToApplications(item)} className="rounded-lg bg-cyan-700 px-3 py-1 text-sm font-semibold text-white">
                Convert to Application
              </button>
            </div>
          </article>
        ))}
        {!items.length ? <p className="text-sm text-slate-500">No saved opportunities yet.</p> : null}
      </div>
    </div>
  );
}
