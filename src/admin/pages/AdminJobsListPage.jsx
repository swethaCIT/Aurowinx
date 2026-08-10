import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus, Briefcase, AlertCircle } from "lucide-react";
import { supabase } from "../../lib/supabase";

const STATUS_STYLES = {
  open: "bg-emerald-50 text-emerald-700",
  draft: "bg-slate-100 text-slate-600",
  closed: "bg-red-50 text-red-600",
};

function StatCard({ label, value, accent }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <p className={`mt-1.5 text-2xl font-bold ${accent}`}>{value}</p>
    </div>
  );
}

export default function AdminJobsListPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false });
      if (fetchError) setError(fetchError.message);
      else setJobs(data || []);
      setLoading(false);
    };
    run();
  }, []);

  const stats = useMemo(
    () => ({
      total: jobs.length,
      open: jobs.filter((j) => j.status === "open").length,
      draft: jobs.filter((j) => j.status === "draft").length,
      closed: jobs.filter((j) => j.status === "closed").length,
    }),
    [jobs]
  );

  const handleDelete = async (job) => {
    if (!window.confirm(`Delete "${job.job_title}"? This cannot be undone.`)) return;
    const { error: deleteError } = await supabase.from("jobs").delete().eq("id", job.id);
    if (deleteError) {
      window.alert("Failed to delete: " + deleteError.message);
      return;
    }
    setJobs((prev) => prev.filter((j) => j.id !== job.id));
  };

  const handleStatusChange = async (job, status) => {
    const { error: updateError } = await supabase.from("jobs").update({ status }).eq("id", job.id);
    if (updateError) {
      window.alert("Failed to update status: " + updateError.message);
      return;
    }
    setJobs((prev) => prev.map((j) => (j.id === job.id ? { ...j, status } : j)));
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Job Listings</h2>
          <p className="mt-0.5 text-sm text-slate-500">Manage the roles shown on the public careers page.</p>
        </div>
        <Link
          to="/admin/jobs/new"
          className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-shadow hover:shadow-indigo-600/35"
        >
          <Plus size={16} /> Add Job
        </Link>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total" value={stats.total} accent="text-slate-900" />
        <StatCard label="Open" value={stats.open} accent="text-emerald-600" />
        <StatCard label="Draft" value={stats.draft} accent="text-slate-500" />
        <StatCard label="Closed" value={stats.closed} accent="text-red-600" />
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={15} className="shrink-0" />
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Location</th>
                <th className="px-5 py-3">Domain</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Created</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-14 text-center text-sm text-slate-400">
                    Loading jobs...
                  </td>
                </tr>
              ) : jobs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-14 text-center">
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <Briefcase size={28} strokeWidth={1.5} />
                      <p className="text-sm">No jobs yet. Click "Add Job" to create one.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job.id} className="border-t border-slate-100 transition-colors hover:bg-slate-50/60">
                    <td className="px-5 py-3.5 font-semibold text-slate-900">{job.job_title}</td>
                    <td className="px-5 py-3.5 text-slate-600">{job.location}</td>
                    <td className="px-5 py-3.5 text-slate-600">{job.domain}</td>
                    <td className="px-5 py-3.5">
                      <select
                        value={job.status || "draft"}
                        onChange={(e) => handleStatusChange(job, e.target.value)}
                        className={`rounded-full border-0 px-2.5 py-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          STATUS_STYLES[job.status] || STATUS_STYLES.draft
                        }`}
                      >
                        <option value="draft">Draft</option>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">
                      {job.created_at ? new Date(job.created_at).toLocaleDateString() : "-"}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/admin/jobs/${job.id}/edit`}
                          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                          aria-label="Edit"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(job)}
                          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                          aria-label="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
