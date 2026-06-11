import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, CheckCircle2, AlertCircle, Loader2, FileText } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { C, FONT } from "./theme";

const EASE_OUT = [0.22, 1, 0.36, 1];

/* ── Floating Label Input ── */
function FloatingField({ label, type = "text", placeholder, value, onChange, onBlurValidate, error }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ position: "relative" }}>
        <label style={{
          position: "absolute",
          left: 14,
          top: active ? 8 : "50%",
          transform: active ? "none" : "translateY(-50%)",
          fontSize: active ? 10 : 14,
          fontWeight: active ? 700 : 400,
          color: error ? "#ef4444" : focused ? C.primary : active ? C.textMuted : "#9ca3af",
          letterSpacing: active ? "0.06em" : "0",
          textTransform: active ? "uppercase" : "none",
          transition: "all 0.18s ease",
          pointerEvents: "none",
          zIndex: 1,
          fontFamily: FONT,
        }}>
          {label}
        </label>

        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); onBlurValidate?.(); }}
          placeholder={focused ? placeholder : ""}
          style={{
            width: "100%",
            padding: active ? "22px 14px 8px" : "15px 14px",
            borderRadius: 12,
            border: `1.5px solid ${error ? "#ef4444" : focused ? C.primary : C.border}`,
            background: error ? "#fff5f5" : focused ? "#fafbff" : "#f9fafb",
            color: C.textPrimary,
            fontSize: 14,
            fontFamily: FONT,
            outline: "none",
            boxSizing: "border-box",
            transition: "all 0.18s ease",
            boxShadow: error
              ? "0 0 0 3px rgba(239,68,68,0.1)"
              : focused ? `0 0 0 3px ${C.primary}18` : "none",
          }}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            style={{
              fontSize: 11, color: "#ef4444",
              display: "flex", alignItems: "center", gap: 4,
              paddingLeft: 4,
            }}
          >
            <AlertCircle style={{ width: 11, height: 11 }} />
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main Modal ── */
export default function ApplicationModal({ job, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [resume, setResume] = useState(null);
  const [resumeError, setResumeError] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const fileRef = useRef();

  const setField = (key, val) => {
    setForm(p => ({ ...p, [key]: val }));
    if (val.trim()) setErrors(p => ({ ...p, [key]: "" }));
  };

  const blurValidate = (key) => {
    const val = form[key];
    const msgs = { name: "Full name is required", email: "Email address is required", phone: "Phone number is required" };
    if (!val.trim()) {
      setErrors(p => ({ ...p, [key]: msgs[key] }));
    } else if (key === "email" && !/\S+@\S+\.\S+/.test(val)) {
      setErrors(p => ({ ...p, email: "Enter a valid email address" }));
    } else {
      setErrors(p => ({ ...p, [key]: "" }));
    }
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Full name is required";
    if (!form.email.trim()) e.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!resume) setResumeError("Please attach your resume");
    setErrors(e);
    return Object.keys(e).length === 0 && !!resume;
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setResumeError("File must be under 5MB"); return; }
    if (!["application/pdf", "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ].includes(file.type)) { setResumeError("Only PDF or DOC/DOCX allowed"); return; }
    setResume(file);
    setResumeError("");
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setStatus("uploading");
    try {
      const ext = resume.name.split(".").pop();
      const fileName = `${Date.now()}_${form.name.replace(/\s+/g, "_")}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("resumes").upload(fileName, resume, { contentType: resume.type });
      if (uploadError) throw new Error("Resume upload failed: " + uploadError.message);

      const { data: urlData } = supabase.storage.from("resumes").getPublicUrl(fileName);
      const resumeUrl = urlData.publicUrl;

      const { error: dbError } = await supabase.from("job_applications").insert({
        job_id: job.id, full_name: form.name,
        email: form.email, phone: form.phone, resume_url: resumeUrl,
      });
      if (dbError) throw new Error("DB insert failed: " + dbError.message);

      const { error: fnError } = await supabase.functions.invoke("send-application-email", {
        body: {
          applicantName: form.name, applicantEmail: form.email,
          applicantPhone: form.phone, jobTitle: job.job_title, resumeUrl,
        },
      });
      if (fnError) throw new Error("Email send failed: " + fnError.message);

      setStatus("success");
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(15,10,40,0.55)",
          backdropFilter: "blur(6px)",
          zIndex: 1000,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "20px",
        }}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.94, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 28 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          onClick={e => e.stopPropagation()}
          style={{
            background: "#fff",
            borderRadius: 24,
            width: "100%", maxWidth: 500,
            maxHeight: "92vh",
            overflowY: "auto",
            boxShadow: "0 32px 100px rgba(79,70,229,0.18), 0 8px 32px rgba(0,0,0,0.12)",
            fontFamily: FONT,
          }}
        >
          {/* ── Success ── */}
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ padding: "60px 40px", textAlign: "center" }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 220, delay: 0.1 }}
                style={{
                  width: 80, height: 80, borderRadius: "50%",
                  background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 28px",
                  boxShadow: "0 8px 24px rgba(16,185,129,0.2)",
                }}
              >
                <CheckCircle2 style={{ width: 40, height: 40, color: "#059669" }} />
              </motion.div>
              <h3 style={{
                fontSize: 24, fontWeight: 800,
                color: C.textPrimary, margin: "0 0 12px",
                letterSpacing: "-0.02em",
              }}>
                Application Submitted!
              </h3>
              <p style={{
                fontSize: 14, color: C.textMuted,
                lineHeight: 1.75, marginBottom: 36,
                maxWidth: 320, margin: "0 auto 36px",
              }}>
                Thanks <strong style={{ color: C.textPrimary }}>{form.name}</strong>! Your application for{" "}
                <strong style={{ color: C.primary }}>{job.job_title}</strong> has been received.
                Check your inbox for a confirmation email.
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                style={{
                  padding: "13px 40px", borderRadius: 12,
                  background: C.gradPrimary, color: "#fff",
                  border: "none", fontSize: 14, fontWeight: 700,
                  cursor: "pointer", fontFamily: FONT,
                  boxShadow: "0 6px 20px rgba(79,70,229,0.3)",
                }}
              >
                Done
              </motion.button>
            </motion.div>
          ) : (
            <>
              {/* ── Header ── */}
              <div style={{
                padding: "28px 28px 0",
                display: "flex", alignItems: "flex-start",
                justifyContent: "space-between", gap: 12,
              }}>
                <div>
                  <span style={{
                    display: "inline-block",
                    fontSize: 10, fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: C.primary, background: C.accentSoft,
                    padding: "3px 10px", borderRadius: 100,
                    marginBottom: 10,
                  }}>
                    {job.domain}
                  </span>
                  <h2 style={{
                    fontSize: 18, fontWeight: 800,
                    color: C.textPrimary, margin: 0,
                    lineHeight: 1.3, letterSpacing: "-0.02em",
                    maxWidth: 340,
                  }}>
                    {job.job_title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  style={{
                    background: "#f3f4f6", border: "none", borderRadius: 10,
                    width: 34, height: 34, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", marginTop: 4,
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#e5e7eb"}
                  onMouseLeave={e => e.currentTarget.style.background = "#f3f4f6"}
                >
                  <X style={{ width: 16, height: 16, color: "#6b7280" }} />
                </button>
              </div>

              <div style={{ height: 1, background: C.border, margin: "20px 0 0" }} />

              {/* ── Form ── */}
              <div style={{ padding: "24px 28px 28px", display: "flex", flexDirection: "column", gap: 16 }}>

                <FloatingField
                  label="Full Name *"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={v => setField("name", v)}
                  onBlurValidate={() => blurValidate("name")}
                  error={errors.name}
                />
                <FloatingField
                  label="Email Address *"
                  type="email"
                  placeholder="Enter your company email address"
                  value={form.email}
                  onChange={v => setField("email", v)}
                  onBlurValidate={() => blurValidate("email")}
                  error={errors.email}
                />
                <FloatingField
                  label="Phone Number *"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={form.phone}
                  onChange={v => setField("phone", v)}
                  onBlurValidate={() => blurValidate("phone")}
                  error={errors.phone}
                />

                {/* Resume Upload */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700,
                    color: C.textMuted, textTransform: "uppercase",
                    letterSpacing: "0.06em", paddingLeft: 2,
                  }}>
                    Resume / CV *
                  </span>
                  <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFile} style={{ display: "none" }} />
                  <motion.div
                    onClick={() => fileRef.current.click()}
                    whileHover={{ borderColor: C.primary }}
                    style={{
                      border: `2px dashed ${resumeError ? "#ef4444" : resume ? C.primary : "#d1d5db"}`,
                      borderRadius: 14,
                      padding: resume ? "16px 20px" : "28px 20px",
                      textAlign: "center",
                      cursor: "pointer",
                      background: resume ? C.accentSoft : "#fafafa",
                      transition: "all 0.2s",
                    }}
                  >
                    {resume ? (
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{
                            width: 36, height: 36, borderRadius: 8,
                            background: C.gradPrimary,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            <FileText style={{ width: 16, height: 16, color: "#fff" }} />
                          </div>
                          <div style={{ textAlign: "left" }}>
                            <p style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary, margin: 0 }}>{resume.name}</p>
                            <p style={{ fontSize: 11, color: C.textMuted, margin: 0 }}>{(resume.size / 1024).toFixed(0)} KB</p>
                          </div>
                        </div>
                        <span style={{ fontSize: 11, color: C.primary, fontWeight: 600 }}>Change</span>
                      </div>
                    ) : (
                      <>
                        <div style={{
                          width: 44, height: 44, borderRadius: 12,
                          background: C.accentSoft,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          margin: "0 auto 12px",
                        }}>
                          <Upload style={{ width: 20, height: 20, color: C.primary }} />
                        </div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary, margin: "0 0 4px" }}>
                          Upload your Resume
                        </p>
                        <p style={{ fontSize: 12, color: C.textMuted, margin: 0 }}>
                          PDF or DOC/DOCX · Max 5MB
                        </p>
                      </>
                    )}
                  </motion.div>
                  {resumeError && (
                    <span style={{ fontSize: 11, color: "#ef4444", display: "flex", alignItems: "center", gap: 4, paddingLeft: 4 }}>
                      <AlertCircle style={{ width: 11, height: 11 }} />{resumeError}
                    </span>
                  )}
                </div>

                {/* Error banner */}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "12px 16px", borderRadius: 12,
                      background: "#fef2f2", border: "1px solid #fecaca",
                    }}
                  >
                    <AlertCircle style={{ width: 15, height: 15, color: "#ef4444", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "#dc2626" }}>{errorMsg}</span>
                  </motion.div>
                )}

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: status === "uploading" ? 1 : 1.02 }}
                  whileTap={{ scale: status === "uploading" ? 1 : 0.97 }}
                  onClick={handleSubmit}
                  disabled={status === "uploading"}
                  style={{
                    width: "100%", padding: "15px",
                    borderRadius: 13,
                    background: status === "uploading" ? "#f3f4f6" : C.gradPrimary,
                    color: status === "uploading" ? C.textMuted : "#fff",
                    border: "none", fontSize: 15, fontWeight: 700,
                    cursor: status === "uploading" ? "not-allowed" : "pointer",
                    fontFamily: FONT,
                    display: "flex", alignItems: "center",
                    justifyContent: "center", gap: 8,
                    boxShadow: status === "uploading" ? "none" : "0 6px 24px rgba(79,70,229,0.28)",
                    transition: "all 0.2s",
                    marginTop: 4,
                  }}
                >
                  {status === "uploading" ? (
                    <>
                      <Loader2 style={{ width: 17, height: 17, animation: "spin 1s linear infinite" }} />
                      Submitting Application...
                    </>
                  ) : "Submit Application"}
                </motion.button>

                <p style={{ fontSize: 11, color: C.textMuted, textAlign: "center", margin: 0 }}>
                  By submitting, you agree to our privacy policy. Your data is handled securely.
                </p>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </AnimatePresence>
  );
}