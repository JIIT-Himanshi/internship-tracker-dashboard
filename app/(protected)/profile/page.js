"use client";

import { useEffect, useState } from "react";
import { STORAGE_KEYS, getStorageItem, setStorageItem } from "@/lib/storage";

const initialProfile = {
  name: "",
  college: "",
  branch: "",
  graduationYear: "",
  skills: "",
  resumeLink: "",
  linkedIn: "",
  github: "",
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existing = getStorageItem(STORAGE_KEYS.PROFILE, initialProfile);
    setProfile(existing);
  }, []);

  const handleSave = (event) => {
    event.preventDefault();
    setStorageItem(STORAGE_KEYS.PROFILE, profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Profile Settings</h1>
        <p className="text-sm text-slate-500">Keep your professional profile ready for quick applications.</p>
      </div>

      <form onSubmit={handleSave} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2">
        <input placeholder="Name" className="rounded-lg border border-slate-300 px-3 py-2" value={profile.name} onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))} />
        <input placeholder="College" className="rounded-lg border border-slate-300 px-3 py-2" value={profile.college} onChange={(e) => setProfile((prev) => ({ ...prev, college: e.target.value }))} />
        <input placeholder="Branch" className="rounded-lg border border-slate-300 px-3 py-2" value={profile.branch} onChange={(e) => setProfile((prev) => ({ ...prev, branch: e.target.value }))} />
        <input placeholder="Graduation Year" className="rounded-lg border border-slate-300 px-3 py-2" value={profile.graduationYear} onChange={(e) => setProfile((prev) => ({ ...prev, graduationYear: e.target.value }))} />
        <input placeholder="Skills (comma separated)" className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2" value={profile.skills} onChange={(e) => setProfile((prev) => ({ ...prev, skills: e.target.value }))} />
        <input placeholder="Resume Link" className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2" value={profile.resumeLink} onChange={(e) => setProfile((prev) => ({ ...prev, resumeLink: e.target.value }))} />
        <input placeholder="LinkedIn Link" className="rounded-lg border border-slate-300 px-3 py-2" value={profile.linkedIn} onChange={(e) => setProfile((prev) => ({ ...prev, linkedIn: e.target.value }))} />
        <input placeholder="GitHub Link" className="rounded-lg border border-slate-300 px-3 py-2" value={profile.github} onChange={(e) => setProfile((prev) => ({ ...prev, github: e.target.value }))} />

        <div className="md:col-span-2">
          <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Save Profile</button>
          {saved ? <span className="ml-3 text-sm font-medium text-emerald-700">Saved</span> : null}
        </div>
      </form>
    </div>
  );
}
