import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Users, AlertCircle } from "lucide-react";
import { supabase } from "../../lib/supabase";

const STATUS_STYLES = {
  new: "bg-blue-50 text-blue-700",
  reviewed: "bg-amber-50 text-amber-700",
  rejected: "bg-red-50 text-red-600",
  hired: "bg-emerald-50 text-emerald-700",
};

function StatCard({ label, value, accent }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <p className={`mt-1.5 text-2xl font-bold ${accent}`}>{value}</p>
    </div>
  );
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from("job_applications")
        .select("*, jobs(job_title)")
        .order("created_at", { ascending: false });
      if (fetchError) setError(fetchError.message);
      else setApplications(data || []);
      setLoading(false);
    };
    run();
  }, []);

  const stats = useMemo(
    () => ({
      total: applications.length,
      new: applications.filter((a) => (a.status || "new") === "new").length,
      reviewed: applications.filter((a) => a.status === "reviewed").length,
      hired: applications.filter((a) => a.status === "hired").length,
    }),
    [applications]
  );

  const handleStatusChange = async (application, status) => {
    const { error: updateError } = await supabase
      .from("job_applications")
      .update({ status })
      .eq("id", application.id);
    if (updateError) {
      window.alert("Failed to update status: " + updateError.message);
      return;
    }
    setApplications((prev) => prev.map((a) => (a.id === application.id ? { ...a, status } : a)));
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">Applications</h2>
        <p className="mt-0.5 text-sm text-slate-500">Candidates who applied through the careers page.</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total" value={stats.total} accent="text-slate-900" />
        <StatCard label="New" value={stats.new} accent="text-blue-600" />
        <StatCard label="Reviewed" value={stats.reviewed} accent="text-amber-600" />
        <StatCard label="Hired" value={stats.hired} accent="text-emerald-600" />
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
                <th className="px-5 py-3">Applicant</th>
                <th className="px-5 py-3">Contact</th>
                <th className="px-5 py-3">Job</th>
                <th className="px-5 py-3">Resume</th>
                <th className="px-5 py-3">Applied</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-14 text-center text-sm text-slate-400">
                    Loading applications...
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-14 text-center">
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <Users size={28} strokeWidth={1.5} />
                      <p className="text-sm">No applications yet.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                applications.map((application) => (
                  <tr key={application.id} className="border-t border-slate-100 transition-colors hover:bg-slate-50/60">
                    <td className="px-5 py-3.5 font-semibold text-slate-900">{application.full_name}</td>
                    <td className="px-5 py-3.5 text-slate-600">
                      <div>{application.email}</div>
                      <div className="text-slate-400">{application.phone}</div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{application.jobs?.job_title || "-"}</td>
                    <td className="px-5 py-3.5">
                      <a
                        href={application.resume_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:underline"
                      >
                        View <ExternalLink size={12} />
                      </a>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">
                      {application.created_at ? new Date(application.created_at).toLocaleDateString() : "-"}
                    </td>
                    <td className="px-5 py-3.5">
                      <select
                        value={application.status || "new"}
                        onChange={(e) => handleStatusChange(application, e.target.value)}
                        className={`rounded-full border-0 px-2.5 py-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          STATUS_STYLES[application.status] || STATUS_STYLES.new
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="rejected">Rejected</option>
                        <option value="hired">Hired</option>
                      </select>
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
