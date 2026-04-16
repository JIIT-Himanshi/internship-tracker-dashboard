"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/applications", label: "Applications" },
  { href: "/saved", label: "Saved" },
  { href: "/resume-helper", label: "Resume Helper" },
  { href: "/analytics", label: "Analytics" },
  { href: "/profile", label: "Profile" },
];

export default function Sidebar({ closeMenu }) {
  const pathname = usePathname();

  return (
    <aside className="h-full w-72 rounded-r-3xl bg-slate-950 p-6 text-slate-100">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">InternTrack</p>
        <h1 className="mt-2 text-2xl font-bold">Student Suite</h1>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                active ? "bg-cyan-400/20 text-cyan-200" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
