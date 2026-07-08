import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const STATUS_STYLES = {
  new: "bg-blue-100 text-blue-700",
  reviewed: "bg-amber-100 text-amber-700",
  rejected: "bg-red-100 text-red-600",
  hired: "bg-green-100 text-green-700",
};

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
      <h2 className="text-lg font-bold text-gray-900 mb-6">Applications</h2>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wide">
              <th className="px-5 py-3 font-medium">Applicant</th>
              <th className="px-5 py-3 font-medium">Contact</th>
              <th className="px-5 py-3 font-medium">Job</th>
              <th className="px-5 py-3 font-medium">Resume</th>
              <th className="px-5 py-3 font-medium">Applied</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-gray-400">
                  Loading applications...
                </td>
              </tr>
            ) : applications.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-gray-400">
                  No applications yet.
                </td>
              </tr>
            ) : (
              applications.map((application) => (
                <tr key={application.id} className="border-t border-gray-100">
                  <td className="px-5 py-3 font-medium text-gray-900">{application.full_name}</td>
                  <td className="px-5 py-3 text-gray-600">
                    <div>{application.email}</div>
                    <div className="text-gray-400">{application.phone}</div>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{application.jobs?.job_title || "-"}</td>
                  <td className="px-5 py-3">
                    <a
                      href={application.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      View
                    </a>
                  </td>
                  <td className="px-5 py-3 text-gray-500">
                    {application.created_at ? new Date(application.created_at).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-5 py-3">
                    <select
                      value={application.status || "new"}
                      onChange={(e) => handleStatusChange(application, e.target.value)}
                      className={`rounded-full text-xs font-semibold px-2.5 py-1 border-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
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
  );
}
