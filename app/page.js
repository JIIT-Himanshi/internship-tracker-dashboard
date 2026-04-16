import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_10%_10%,#bfdbfe,transparent_35%),radial-gradient(circle_at_90%_10%,#fde68a,transparent_35%),#f8fafc] px-4 py-20">
      <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-cyan-300/25 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-56 w-56 rounded-full bg-amber-300/25 blur-3xl" />

      <section className="relative w-full max-w-4xl rounded-3xl border border-white/60 bg-white/80 p-8 shadow-2xl backdrop-blur sm:p-12">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-700">InternTrack</p>
        <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
          Track internships, deadlines, notes, and resume bullets in one clean dashboard.
        </h1>
        <p className="mt-5 max-w-2xl text-base text-slate-600 sm:text-lg">
          Built for students who want a better system than scattered spreadsheets and sticky notes.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/signup" className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700">
            Create Account
          </Link>
          <Link href="/login" className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Login
          </Link>
        </div>

        <div className="mt-8 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-3">Application tracking with status pipeline</div>
          <div className="rounded-xl bg-slate-50 p-3">Deadline urgency and interview planning</div>
          <div className="rounded-xl bg-slate-50 p-3">Resume bullet generation and storage</div>
        </div>
      </section>
    </main>
  );
}
