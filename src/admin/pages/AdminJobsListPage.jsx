import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";
import { supabase } from "../../lib/supabase";

const STATUS_STYLES = {
  open: "bg-green-100 text-green-700",
  draft: "bg-gray-100 text-gray-600",
  closed: "bg-red-100 text-red-600",
};

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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Job Listings</h2>
        <Link
          to="/admin/jobs/new"
          className="flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 transition-colors"
        >
          <Plus size={16} /> Add Job
        </Link>
      </div>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wide">
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium">Location</th>
              <th className="px-5 py-3 font-medium">Domain</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Created</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-gray-400">
                  Loading jobs...
                </td>
              </tr>
            ) : jobs.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-gray-400">
                  No jobs yet. Click "Add Job" to create one.
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id} className="border-t border-gray-100">
                  <td className="px-5 py-3 font-medium text-gray-900">{job.job_title}</td>
                  <td className="px-5 py-3 text-gray-600">{job.location}</td>
                  <td className="px-5 py-3 text-gray-600">{job.domain}</td>
                  <td className="px-5 py-3">
                    <select
                      value={job.status || "draft"}
                      onChange={(e) => handleStatusChange(job, e.target.value)}
                      className={`rounded-full text-xs font-semibold px-2.5 py-1 border-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        STATUS_STYLES[job.status] || STATUS_STYLES.draft
                      }`}
                    >
                      <option value="draft">Draft</option>
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td className="px-5 py-3 text-gray-500">
                    {job.created_at ? new Date(job.created_at).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/jobs/${job.id}/edit`}
                        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-indigo-600"
                        aria-label="Edit"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(job)}
                        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-red-600"
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
  );
}
