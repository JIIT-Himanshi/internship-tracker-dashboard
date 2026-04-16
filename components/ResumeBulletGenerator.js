"use client";

import { useState } from "react";

function makeBullets({ title, build, tech, features, impact }) {
  const techLine = tech ? `using ${tech}` : "using modern tools";

  return [
    `Built ${title || "a project"} ${techLine}, focused on ${build || "delivering a practical solution"}.`,
    `Implemented ${features || "key functional modules"} to improve reliability and usability for end users.`,
    `Drove measurable outcomes by ${impact || "improving efficiency and reducing manual effort"}.`,
    `Collaborated through iterative development, testing, and documentation to maintain production-ready quality.`,
  ];
}

export default function ResumeBulletGenerator({ onSave }) {
  const [form, setForm] = useState({
    title: "",
    build: "",
    tech: "",
    features: "",
    impact: "",
  });
  const [generated, setGenerated] = useState([]);

  const handleGenerate = () => {
    setGenerated(makeBullets(form));
  };

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Resume Bullet Generator</h2>

      <div className="grid gap-3 md:grid-cols-2">
        <input className="rounded-lg border border-slate-300 px-3 py-2" placeholder="Project/Experience Title" value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} />
        <input className="rounded-lg border border-slate-300 px-3 py-2" placeholder="What did you build?" value={form.build} onChange={(e) => setForm((prev) => ({ ...prev, build: e.target.value }))} />
        <input className="rounded-lg border border-slate-300 px-3 py-2" placeholder="Technologies Used" value={form.tech} onChange={(e) => setForm((prev) => ({ ...prev, tech: e.target.value }))} />
        <input className="rounded-lg border border-slate-300 px-3 py-2" placeholder="Key Features" value={form.features} onChange={(e) => setForm((prev) => ({ ...prev, features: e.target.value }))} />
      </div>

      <textarea
        className="w-full rounded-lg border border-slate-300 px-3 py-2"
        rows={3}
        placeholder="Outcome / Impact"
        value={form.impact}
        onChange={(e) => setForm((prev) => ({ ...prev, impact: e.target.value }))}
      />

      <button
        type="button"
        onClick={handleGenerate}
        className="rounded-lg bg-cyan-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600"
      >
        Generate Bullets
      </button>

      {generated.length ? (
        <div className="space-y-3 rounded-xl bg-slate-50 p-4">
          {generated.map((item, index) => (
            <div key={`${item}-${index}`} className="flex items-start justify-between gap-2 rounded-lg bg-white p-3">
              <p className="text-sm text-slate-700">• {item}</p>
              <button
                type="button"
                onClick={() => onSave(item)}
                className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-700"
              >
                Save
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
