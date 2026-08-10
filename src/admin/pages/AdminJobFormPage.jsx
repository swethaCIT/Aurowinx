import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";
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

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10";
const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700";

function FormSection({ title, subtitle, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="mb-5">
        <h3 className="text-sm font-bold text-slate-900">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

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

  if (loading) return <p className="text-sm text-slate-400">Loading...</p>;

  return (
    <div className="max-w-2xl">
      <button
        type="button"
        onClick={() => navigate("/admin/jobs")}
        className="mb-4 flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-indigo-600"
      >
        <ArrowLeft size={15} /> Back to Jobs
      </button>

      <h2 className="mb-6 text-xl font-bold text-slate-900">{isEdit ? "Edit Job" : "Add Job"}</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <FormSection title="Basic Information" subtitle="What the role is and where it lives.">
          <div>
            <label className={labelClass}>Job Title</label>
            <input
              type="text"
              required
              value={job.job_title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              URL Slug <span className="font-normal text-slate-400">(used in /careers/&lt;slug&gt;)</span>
            </label>
            <input
              type="text"
              required
              value={job.slug}
              onChange={(e) => {
                setSlugTouched(true);
                updateField("slug", slugify(e.target.value));
              }}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Location</label>
              <input
                type="text"
                required
                value={job.location}
                onChange={(e) => updateField("location", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Domain</label>
              <input
                type="text"
                required
                value={job.domain}
                onChange={(e) => updateField("domain", e.target.value)}
                placeholder="e.g. DFT, Verification, Physical Design"
                className={inputClass}
              />
            </div>
          </div>
        </FormSection>

        <FormSection title="Role Details" subtitle="Employment type, experience band, and visibility.">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Employment Type</label>
              <input
                type="text"
                required
                value={job.employment_type}
                onChange={(e) => updateField("employment_type", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Min Exp (yrs)</label>
              <input
                type="number"
                min="0"
                value={job.experience_min}
                onChange={(e) => updateField("experience_min", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Max Exp (yrs)</label>
              <input
                type="number"
                min="0"
                value={job.experience_max}
                onChange={(e) => updateField("experience_max", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Status</label>
            <select value={job.status} onChange={(e) => updateField("status", e.target.value)} className={inputClass}>
              <option value="draft">Draft (hidden from public site)</option>
              <option value="open">Open (visible on public site)</option>
              <option value="closed">Closed (hidden from public site)</option>
            </select>
          </div>
        </FormSection>

        <FormSection title="Description" subtitle="A short overview shown at the top of the job page.">
          <textarea
            rows={4}
            value={job.description}
            onChange={(e) => updateField("description", e.target.value)}
            className={inputClass}
          />
        </FormSection>

        <FormSection title="Requirements" subtitle="Press Enter after each item to add it as a tag.">
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
        </FormSection>

        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle size={15} className="shrink-0" />
            {error}
          </div>
        )}

        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-shadow hover:shadow-indigo-600/35 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Job"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/jobs")}
            className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
