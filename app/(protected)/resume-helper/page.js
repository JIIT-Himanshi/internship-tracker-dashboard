"use client";

import { useEffect, useState } from "react";
import ResumeBulletGenerator from "@/components/ResumeBulletGenerator";
import { STORAGE_KEYS, generateId, getStorageItem, setStorageItem } from "@/lib/storage";

export default function ResumeHelperPage() {
  const [bullets, setBullets] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    setBullets(getStorageItem(STORAGE_KEYS.BULLETS, []));
  }, []);

  const persist = (next) => {
    setBullets(next);
    setStorageItem(STORAGE_KEYS.BULLETS, next);
  };

  const addBullet = (text) => {
    const next = [{ id: generateId("bullet"), text, createdAt: new Date().toISOString() }, ...bullets];
    persist(next);
  };

  const removeBullet = (id) => {
    persist(bullets.filter((item) => item.id !== id));
  };

  const saveEdit = () => {
    const next = bullets.map((item) => (item.id === editId ? { ...item, text: editText } : item));
    persist(next);
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Resume Helper</h1>
        <p className="text-sm text-slate-500">Generate and maintain resume-ready achievement bullets.</p>
      </div>

      <ResumeBulletGenerator onSave={addBullet} />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Saved Bullets</h2>
        <div className="mt-4 space-y-3">
          {bullets.map((item) => (
            <article key={item.id} className="rounded-xl border border-slate-200 p-3">
              {editId === item.id ? (
                <div className="space-y-2">
                  <textarea
                    rows={3}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button type="button" onClick={saveEdit} className="rounded bg-slate-900 px-3 py-1 text-xs text-white">
                      Save
                    </button>
                    <button type="button" onClick={() => setEditId(null)} className="rounded border border-slate-300 px-3 py-1 text-xs">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm text-slate-700">• {item.text}</p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(item.text)}
                      className="rounded border border-slate-300 px-2 py-1 text-xs"
                    >
                      Copy
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditId(item.id);
                        setEditText(item.text);
                      }}
                      className="rounded border border-slate-300 px-2 py-1 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => removeBullet(item.id)}
                      className="rounded border border-rose-200 bg-rose-50 px-2 py-1 text-xs text-rose-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </article>
          ))}
          {!bullets.length ? <p className="text-sm text-slate-500">No bullets saved yet.</p> : null}
        </div>
      </section>
    </div>
  );
}
