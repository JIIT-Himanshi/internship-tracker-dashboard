"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ApplicationCard from "@/components/applications/ApplicationCard";
import FilterBar from "@/components/applications/FilterBar";
import { STORAGE_KEYS, getStorageItem, setStorageItem } from "@/lib/storage";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [filters, setFilters] = useState({
    query: "",
    status: "all",
    company: "all",
    role: "all",
    sortBy: "latest",
  });

  useEffect(() => {
    setApplications(getStorageItem(STORAGE_KEYS.APPLICATIONS, []));
  }, []);

  const companyOptions = useMemo(
    () => [...new Set(applications.map((item) => item.companyName).filter(Boolean))],
    [applications],
  );
  const roleOptions = useMemo(
    () => [...new Set(applications.map((item) => item.role).filter(Boolean))],
    [applications],
  );

  const filtered = useMemo(() => {
    const searched = applications.filter((item) => {
      const query = filters.query.toLowerCase();
      const queryMatch =
        !query ||
        item.companyName?.toLowerCase().includes(query) ||
        item.role?.toLowerCase().includes(query);
      const statusMatch = filters.status === "all" || item.status === filters.status;
      const companyMatch = filters.company === "all" || item.companyName === filters.company;
      const roleMatch = filters.role === "all" || item.role === filters.role;
      return queryMatch && statusMatch && companyMatch && roleMatch;
    });

    return searched.sort((a, b) => {
      if (filters.sortBy === "deadline") {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline) - new Date(b.deadline);
      }
      if (filters.sortBy === "company") {
        return (a.companyName || "").localeCompare(b.companyName || "");
      }
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  }, [applications, filters]);

  const handleDelete = (id) => {
    const next = applications.filter((item) => item.id !== id);
    setApplications(next);
    setStorageItem(STORAGE_KEYS.APPLICATIONS, next);
  };

  const handleStatusChange = (id, status) => {
    const next = applications.map((item) => (item.id === id ? { ...item, status } : item));
    setApplications(next);
    setStorageItem(STORAGE_KEYS.APPLICATIONS, next);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Applications</h1>
          <p className="text-sm text-slate-500">Search, filter, sort, and update your pipeline.</p>
        </div>
        <Link href="/applications/add" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
          Add New
        </Link>
      </div>

      <FilterBar
        query={filters.query}
        status={filters.status}
        company={filters.company}
        role={filters.role}
        sortBy={filters.sortBy}
        companyOptions={companyOptions}
        roleOptions={roleOptions}
        onChange={(field, value) => setFilters((prev) => ({ ...prev, [field]: value }))}
      />

      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Deadline</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-t border-slate-100">
                <td className="px-4 py-3">{item.companyName}</td>
                <td className="px-4 py-3">{item.role}</td>
                <td className="px-4 py-3">
                  <select
                    className="rounded border border-slate-300 px-2 py-1"
                    value={item.status}
                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                  >
                    {["Saved", "Applied", "Interview", "Rejected", "Selected", "Offer Accepted"].map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">{item.deadline || "NA"}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link href={`/applications/${item.id}`} className="rounded bg-slate-900 px-2 py-1 text-xs text-white">
                      View
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="rounded bg-rose-50 px-2 py-1 text-xs text-rose-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 lg:hidden">
        {filtered.map((item) => (
          <ApplicationCard
            key={item.id}
            application={item}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

      {!filtered.length ? <p className="text-sm text-slate-500">No matching applications found.</p> : null}
    </div>
  );
}
