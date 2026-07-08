import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import ListEditor from "../components/ListEditor";

const EMPTY_JOB = {
  job_title: "",
  slug: "",
  location: "",
  domain: "",
  employment_type: "Full Time",
  experience_min: "",
  experience_max: "",
  status: "draft",
  description: "",
  responsibilities: [],
  skills: [],
  preferred: [],
  tools: [],
};

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function AdminJobFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [job, setJob] = useState(EMPTY_JOB);
  const [slugTouched, setSlugTouched] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      const { data, error: fetchError } = await supabase.from("jobs").select("*").eq("id", id).single();
      if (fetchError) {
        setError(fetchError.message);
      } else {
        setJob({
          ...EMPTY_JOB,
          ...data,
          responsibilities: data.responsibilities || [],
          skills: data.skills || [],
          preferred: data.preferred || [],
          tools: data.tools || [],
        });
        setSlugTouched(true);
      }
      setLoading(false);
    })();
  }, [id, isEdit]);

  const updateField = (key, value) => setJob((prev) => ({ ...prev, [key]: value }));

  const handleTitleChange = (value) => {
    setJob((prev) => ({
      ...prev,
      job_title: value,
      slug: slugTouched ? prev.slug : slugify(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...job,
      experience_min: job.experience_min === "" ? null : Number(job.experience_min),
      experience_max: job.experience_max === "" ? null : Number(job.experience_max),
    };
    delete payload.id;
    delete payload.created_at;

    const query = isEdit
      ? supabase.from("jobs").update(payload).eq("id", id)
      : supabase.from("jobs").insert(payload);

    const { error: saveError } = await query;
    setSaving(false);

    if (saveError) {
      setError(
        saveError.message.includes("duplicate")
          ? "That slug is already in use by another job. Please change it."
          : saveError.message
      );
      return;
    }
    navigate("/admin/jobs");
  };

  if (loading) return <p className="text-gray-400">Loading...</p>;

  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-bold text-gray-900 mb-6">{isEdit ? "Edit Job" : "Add Job"}</h2>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input
            type="text"
            required
            value={job.job_title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL Slug <span className="text-gray-400 font-normal">(used in /careers/&lt;slug&gt;)</span>
          </label>
          <input
            type="text"
            required
            value={job.slug}
            onChange={(e) => {
              setSlugTouched(true);
              updateField("slug", slugify(e.target.value));
            }}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              required
              value={job.location}
              onChange={(e) => updateField("location", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Domain</label>
            <input
              type="text"
              required
              value={job.domain}
              onChange={(e) => updateField("domain", e.target.value)}
              placeholder="e.g. DFT, Verification, Physical Design"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
            <input
              type="text"
              required
              value={job.employment_type}
              onChange={(e) => updateField("employment_type", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Min Exp (yrs)</label>
            <input
              type="number"
              min="0"
              value={job.experience_min}
              onChange={(e) => updateField("experience_min", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Exp (yrs)</label>
            <input
              type="number"
              min="0"
              value={job.experience_max}
              onChange={(e) => updateField("experience_max", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={job.status}
            onChange={(e) => updateField("status", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="draft">Draft (hidden from public site)</option>
            <option value="open">Open (visible on public site)</option>
            <option value="closed">Closed (hidden from public site)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            rows={4}
            value={job.description}
            onChange={(e) => updateField("description", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <ListEditor
          label="Responsibilities"
          items={job.responsibilities}
          onChange={(items) => updateField("responsibilities", items)}
        />
        <ListEditor label="Required Skills" items={job.skills} onChange={(items) => updateField("skills", items)} />
        <ListEditor
          label="Preferred Qualifications"
          items={job.preferred}
          onChange={(items) => updateField("preferred", items)}
        />
        <ListEditor label="Tools & Technologies" items={job.tools} onChange={(items) => updateField("tools", items)} />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold px-5 py-2.5 text-sm transition-colors"
          >
            {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Job"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/jobs")}
            className="rounded-lg text-gray-600 hover:bg-gray-100 font-semibold px-5 py-2.5 text-sm transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
