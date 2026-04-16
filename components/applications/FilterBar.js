"use client";

export default function FilterBar({
  query,
  status,
  company,
  role,
  sortBy,
  companyOptions,
  roleOptions,
  onChange,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
        <input
          type="text"
          placeholder="Search company or role"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm xl:col-span-2"
          value={query}
          onChange={(e) => onChange("query", e.target.value)}
        />

        <select
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          value={status}
          onChange={(e) => onChange("status", e.target.value)}
        >
          <option value="all">All status</option>
          {["Saved", "Applied", "Interview", "Rejected", "Selected", "Offer Accepted"].map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          value={company}
          onChange={(e) => onChange("company", e.target.value)}
        >
          <option value="all">All companies</option>
          {companyOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          value={role}
          onChange={(e) => onChange("role", e.target.value)}
        >
          <option value="all">All roles</option>
          {roleOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          value={sortBy}
          onChange={(e) => onChange("sortBy", e.target.value)}
        >
          <option value="latest">Latest added</option>
          <option value="deadline">Nearest deadline</option>
          <option value="company">Company name</option>
        </select>
      </div>
    </div>
  );
}
