"use client";

import { APPLICATION_STATUS, LOCATION_TYPES } from "@/lib/helpers";

const defaultForm = {
  companyName: "",
  role: "",
  internshipType: "",
  applyLink: "",
  dateApplied: "",
  deadline: "",
  locationType: "Remote",
  stipend: "",
  source: "",
  status: "Saved",
  notes: "",
};

export default function ApplicationForm({ initialValues, onSubmit, submitLabel = "Save Application" }) {
  const values = { ...defaultForm, ...initialValues };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.currentTarget).entries());
        onSubmit(data);
      }}
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm">
          <span className="font-medium text-slate-700">Company Name</span>
          <input name="companyName" defaultValue={values.companyName} required className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>

        <label className="space-y-1 text-sm">
          <span className="font-medium text-slate-700">Role</span>
          <input name="role" defaultValue={values.role} required className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>

        <label className="space-y-1 text-sm">
          <span className="font-medium text-slate-700">Internship Type</span>
          <input name="internshipType" defaultValue={values.internshipType} placeholder="SDE Intern, Product Intern" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>

        <label className="space-y-1 text-sm">
          <span className="font-medium text-slate-700">Apply Link</span>
          <input name="applyLink" defaultValue={values.applyLink} type="url" placeholder="https://..." className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>

        <label className="space-y-1 text-sm">
          <span className="font-medium text-slate-700">Date Applied</span>
          <input name="dateApplied" defaultValue={values.dateApplied} type="date" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>

        <label className="space-y-1 text-sm">
          <span className="font-medium text-slate-700">Deadline</span>
          <input name="deadline" defaultValue={values.deadline} type="date" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>

        <label className="space-y-1 text-sm">
          <span className="font-medium text-slate-700">Location Type</span>
          <select name="locationType" defaultValue={values.locationType} className="w-full rounded-lg border border-slate-300 px-3 py-2">
            {LOCATION_TYPES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1 text-sm">
          <span className="font-medium text-slate-700">Stipend (Optional)</span>
          <input name="stipend" defaultValue={values.stipend} placeholder="20000/month" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>

        <label className="space-y-1 text-sm">
          <span className="font-medium text-slate-700">Source</span>
          <input name="source" defaultValue={values.source} placeholder="LinkedIn, Referral" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>

        <label className="space-y-1 text-sm">
          <span className="font-medium text-slate-700">Status</span>
          <select name="status" defaultValue={values.status} className="w-full rounded-lg border border-slate-300 px-3 py-2">
            {APPLICATION_STATUS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="space-y-1 text-sm">
        <span className="font-medium text-slate-700">Notes</span>
        <textarea
          name="notes"
          defaultValue={values.notes}
          rows={4}
          placeholder="Interview prep notes, follow-up plan, resume tweaks"
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </label>

      <button
        type="submit"
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        {submitLabel}
      </button>
    </form>
  );
}
