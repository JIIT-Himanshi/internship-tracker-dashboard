"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function AppShell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-amber-50/40">
      <div className="mx-auto flex max-w-[1440px]">
        <div className="hidden min-h-screen md:block">
          <Sidebar />
        </div>

        {menuOpen ? (
          <div className="fixed inset-0 z-30 md:hidden">
            <button
              type="button"
              aria-label="close menu"
              className="absolute inset-0 bg-slate-900/30"
              onClick={() => setMenuOpen(false)}
            />
            <div className="relative z-40 h-full w-72">
              <Sidebar closeMenu={() => setMenuOpen(false)} />
            </div>
          </div>
        ) : null}

        <main className="w-full p-4 sm:p-6">
          <Navbar onOpenMenu={() => setMenuOpen(true)} />
          <section className="mt-6">{children}</section>
        </main>
      </div>
    </div>
  );
}
