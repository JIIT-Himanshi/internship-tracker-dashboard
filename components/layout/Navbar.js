"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar({ onOpenMenu }) {
  const { currentUser, logout } = useAuth();
  const { toggleTheme } = useTheme();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const handleLogout = () => {
    setBusy(true);
    logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 shadow-sm backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm md:hidden"
          onClick={onOpenMenu}
        >
          Menu
        </button>
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-slate-400">Welcome back</p>
          <h2 className="text-lg font-semibold text-slate-900">{currentUser?.fullName || "Student"}</h2>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Toggle dark mode"
          title="Toggle theme"
          onClick={toggleTheme}
          className="theme-toggle inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700"
        >
          <span className="theme-icon-sun" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2.5M12 19.5V22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2 12h2.5M19.5 12H22M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
            </svg>
          </span>
          <span className="theme-icon-moon" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7.1 7.1 0 0 0 9.8 9.8z" />
            </svg>
          </span>
        </button>

        <button
          type="button"
          onClick={handleLogout}
          disabled={busy}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:opacity-50"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
