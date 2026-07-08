import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, Phone, Building2, Cpu, Layers,
  Briefcase, FileText, Upload, X, Send,
  CheckCircle2, Clock, Shield,
  ChevronDown, ArrowRight,
} from "lucide-react";
import { C, FONT, EASE } from "././theme";

// ─── Context Config ───────────────────────────────────────────────────────────
const CONFIG = {
  general: {
    heading: "Let's Start a Conversation",
    subheading: "Whether you have a project in mind or just want to explore what's possible — we'd love to hear from you.",
    badge: "General Enquiry",
    serviceOptions: null, nodeOptions: null, roleOptions: null,
    experienceOptions: null, engagementOptions: null, requestOptions: null,
  },
  services: {
    heading: "Tell Us About Your Requirement",
    subheading: "Share your design challenge. Our engineering team will review and respond within 1 business day.",
    badge: "Engineering Services",
    serviceOptions: [
      "Design Verification (DV)", "Design for Testability (DFT)",
      "Physical Design & Implementation", "Full-cycle ASIC Design", "Multiple Services",
    ],
    nodeOptions: [
      "3nm", "5nm", "7nm", "12nm / 16nm",
      "22nm / 28nm", "40nm / 45nm", "65nm & above", "Not yet decided",
    ],
    roleOptions: null, experienceOptions: null, engagementOptions: null, requestOptions: null,
  },
  career: {
    heading: "Join the AurowinX Team",
    subheading: "We're always looking for sharp semiconductor engineers. Share your details and we'll be in touch.",
    badge: "Career Application",
    serviceOptions: null, nodeOptions: null,
    roleOptions: [
      "Design Verification Engineer", "DFT / ATPG Engineer",
      "Physical Design Engineer", "ASIC Design Engineer",
      "Analog / Mixed-Signal Designer", "CAD / EDA Infrastructure Engineer",
      "Project / Program Manager", "Other",
    ],
    experienceOptions: [
      "Fresher (0 – 1 yr)", "Junior (1 – 3 yrs)", "Mid-level (3 – 6 yrs)",
      "Senior (6 – 10 yrs)", "Principal / Lead (10+ yrs)",
    ],
    engagementOptions: null, requestOptions: null,
  },
  company: {
    heading: "Partnership & Corporate Relations",
    subheading: "Interested in collaborating with AurowinX? Let's explore how we can build something together.",
    badge: "Corporate Relations",
    serviceOptions: null, nodeOptions: null, roleOptions: null, experienceOptions: null,
    engagementOptions: [
      "Strategic Technology Partnership", "OEM / Foundry Collaboration",
      "Vendor / Supplier Engagement", "Investment & Business Development", "Media & Press Enquiry",
    ],
    requestOptions: null,
  },
  product: {
    heading: "Product Enquiry",
    subheading: "Interested in our products? Tell us what you need and our team will get back to you.",
    badge: "AurowinX Products",
    serviceOptions: null, nodeOptions: null, roleOptions: null,
    experienceOptions: null, engagementOptions: null,
    requestOptions: [
      "Product Evaluation & Demo", "Licensing & Commercial Terms",
      "Technical Integration Support", "Pricing & Volume Enquiry",
    ],
  },
};

const TRUST = [
  { icon: Clock,  label: "Response within 1 business day",  text: "Our engineering team reviews every enquiry" },
  { icon: Shield, label: "Strictly confidential",      text: "Your data is never shared with third parties" },
  { icon: User,   label: "Direct engineering access",  text: "You talk to engineers, not sales reps" },
];

// ─── Decorative SVG ───────────────────────────────────────────────────────────
const CircuitIllustration = () => (
  <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", maxWidth: 280, opacity: 0.55 }} aria-hidden="true">
    <line x1="40"  y1="100" x2="100" y2="100" stroke="#c7d2fe" strokeWidth="1.5"/>
    <line x1="100" y1="100" x2="100" y2="40"  stroke="#c7d2fe" strokeWidth="1.5"/>
    <line x1="100" y1="40"  x2="180" y2="40"  stroke="#c7d2fe" strokeWidth="1.5"/>
    <line x1="180" y1="40"  x2="180" y2="100" stroke="#c7d2fe" strokeWidth="1.5"/>
    <line x1="180" y1="100" x2="240" y2="100" stroke="#c7d2fe" strokeWidth="1.5"/>
    <line x1="100" y1="100" x2="100" y2="160" stroke="#c7d2fe" strokeWidth="1.5"/>
    <line x1="100" y1="160" x2="180" y2="160" stroke="#c7d2fe" strokeWidth="1.5"/>
    <line x1="180" y1="100" x2="180" y2="160" stroke="#c7d2fe" strokeWidth="1.5"/>
    <line x1="140" y1="40"  x2="140" y2="100" stroke="#e0e7ff" strokeWidth="1"/>
    <line x1="140" y1="100" x2="140" y2="160" stroke="#e0e7ff" strokeWidth="1"/>
    <rect x="112" y="72" width="56" height="56" rx="6" fill="#eef2ff" stroke="#c7d2fe" strokeWidth="1.5"/>
    <rect x="120" y="80" width="40" height="40" rx="4" fill="#4f46e5" opacity="0.12"/>
    <text x="140" y="104" textAnchor="middle" fontSize="9" fontWeight="600"
      fill="#4f46e5" fontFamily="monospace">ASIC</text>
    {[82,92,102,112].map(y => (
      <line key={`l${y}`} x1="112" y1={y} x2="104" y2={y} stroke="#a5b4fc" strokeWidth="1.5"/>
    ))}
    {[82,92,102,112].map(y => (
      <line key={`r${y}`} x1="168" y1={y} x2="176" y2={y} stroke="#a5b4fc" strokeWidth="1.5"/>
    ))}
    {[122,132,142,152].map(x => (
      <line key={`t${x}`} x1={x} y1="72" x2={x} y2="64" stroke="#a5b4fc" strokeWidth="1.5"/>
    ))}
    {[122,132,142,152].map(x => (
      <line key={`b${x}`} x1={x} y1="128" x2={x} y2="136" stroke="#a5b4fc" strokeWidth="1.5"/>
    ))}
    {[[40,100],[100,40],[180,40],[240,100],[100,160],[180,160],[140,100]].map(([cx,cy],i) => (
      <g key={i}>
        <circle cx={cx} cy={cy} r="5.5" fill="#eef2ff" stroke="#c7d2fe" strokeWidth="1.5"/>
        <circle cx={cx} cy={cy} r="2"   fill="#818cf8"/>
      </g>
    ))}
    <rect x="54"  y="95" width="20" height="10" rx="3" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="1"/>
    <rect x="208" y="95" width="20" height="10" rx="3" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="1"/>
  </svg>
);

// ─── Floating Label Input ─────────────────────────────────────────────────────
const FloatingInput = ({ id, label, icon: Icon, type = "text", value, onChange, error, autoComplete, required }) => {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value?.length > 0;
  return (
    <div className={`fi3${error ? " fi3-err" : ""}${focused ? " fi3-focus" : ""}`}>
      {Icon && (
        <div className="fi3-icon-zone" aria-hidden="true">
          <Icon size={15} />
        </div>
      )}
      <input
        id={id} type={type} value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete={autoComplete}
        className={`fi3-input${Icon ? "" : " fi3-input-noicon"}`}
        placeholder=""
        aria-required={required} aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
      />
      <label htmlFor={id} className={`fi3-label${Icon ? "" : " fi3-label-noicon"}${lifted ? " fi3-label-up" : ""}`}>
        {label}{required && <span className="fi3-req"> *</span>}
      </label>
    </div>
  );
};

// ─── Floating Label Select ────────────────────────────────────────────────────
const FloatingSelect = ({ id, label, icon: Icon, value, onChange, options, error, required }) => {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value?.length > 0;
  return (
    <div className={`fi3${error ? " fi3-err" : ""}${focused ? " fi3-focus" : ""}`}>
      {Icon && (
        <div className="fi3-icon-zone" aria-hidden="true">
          <Icon size={15} />
        </div>
      )}
      <select
        id={id} value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`fi3-input fi3-select${Icon ? "" : " fi3-input-noicon"}`}
        aria-required={required} aria-invalid={!!error}
      >
        <option value="" disabled />
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <label htmlFor={id} className={`fi3-label${Icon ? "" : " fi3-label-noicon"}${lifted ? " fi3-label-up" : ""}`}>
        {label}{required && <span className="fi3-req"> *</span>}
      </label>
      <ChevronDown size={14} className="fi3-chev" aria-hidden="true" />
    </div>
  );
};

// ─── Floating Label Textarea ──────────────────────────────────────────────────
const FloatingTextarea = ({ id, label, value, onChange, error, rows = 4, required }) => {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value?.length > 0;
  return (
    <div className={`fi3 fi3-ta-wrap${error ? " fi3-err" : ""}${focused ? " fi3-focus" : ""}`}>
      <textarea
        id={id} value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={rows}
        className="fi3-input fi3-ta"
        placeholder=""
        aria-required={required} aria-invalid={!!error}
      />
      <label htmlFor={id} className={`fi3-label fi3-label-noicon fi3-label-ta${lifted ? " fi3-label-ta-up" : ""}`}>
        {label}{required && <span className="fi3-req"> *</span>}
      </label>
    </div>
  );
};

// ─── Resume Upload ────────────────────────────────────────────────────────────
const ResumeUpload = ({ value, onChange }) => {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);
  return (
    <div
      className={`ru3${value ? " ru3-filled" : ""}${dragging ? " ru3-drag" : ""}`}
      onClick={() => ref.current?.click()}
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={e => {
        e.preventDefault(); setDragging(false);
        const f = e.dataTransfer.files[0]; if (f) onChange(f);
      }}
      role="button" tabIndex={0}
      onKeyDown={e => e.key === "Enter" && ref.current?.click()}
      aria-label="Upload resume or CV"
    >
      <input type="file" accept=".pdf,.doc,.docx" hidden ref={ref}
        onChange={e => { if (e.target.files[0]) onChange(e.target.files[0]); }} />
      {value ? (
        <div className="ru3-row">
          <div className="ru3-file-ic"><FileText size={16} /></div>
          <div className="ru3-meta">
            <span className="ru3-name">{value.name}</span>
            <span className="ru3-size">{(value.size / 1024).toFixed(0)} KB</span>
          </div>
          <button type="button" className="ru3-remove"
            onClick={e => { e.stopPropagation(); onChange(null); }} aria-label="Remove file">
            <X size={13} />
          </button>
        </div>
      ) : (
        <div className="ru3-empty">
          <div className="ru3-icon-box"><Upload size={17} /></div>
          <div>
            <span className="ru3-cta">{dragging ? "Drop to attach" : "Upload Resume / CV"}</span>
            <span className="ru3-hint">PDF or Word · Max 5 MB · Drag & drop supported</span>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const ErrMsg = ({ id, msg }) => (
  <AnimatePresence>
    {msg && (
      <motion.p id={id} className="cf3-err-msg" role="alert"
        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }} transition={{ duration: 0.14 }}>
        {msg}
      </motion.p>
    )}
  </AnimatePresence>
);

const SectionHead = ({ label }) => (
  <div className="cf3-sec-head">
    <span className="cf3-sec-pill">{label}</span>
    <div className="cf3-sec-rule" aria-hidden="true" />
  </div>
);

// ─── Validation ───────────────────────────────────────────────────────────────
const validate = (form, context) => {
  const e = {};
  if (!form.name.trim())    e.name    = "Full name is required";
  if (!form.email.trim())   e.email   = "Business email is required";
  else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email address";
  if (!form.message.trim()) e.message = "Please describe your requirement";
  if (context === "services" && !form.serviceRequired) e.serviceRequired = "Please select a service";
  if (context === "career") {
    if (!form.roleApplying) e.roleApplying = "Please select a role";
    if (!form.experience)   e.experience   = "Please select your experience level";
  }
  if (context === "company" && !form.engagementType)  e.engagementType  = "Please select an engagement type";
  if (context === "product" && !form.requestType)     e.requestType     = "Please select a request type";
  return e;
};

// ─── Success Screen ───────────────────────────────────────────────────────────
const SuccessScreen = ({ onReset, context }) => (
  <motion.div className="cf3-succ"
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.45, ease: EASE }}>
    <div className="cf3-succ-icon-wrap">
      <motion.div
        className="cf3-succ-ring"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [1, 1.25, 1.5], opacity: [0.6, 0.3, 0] }}
        transition={{ duration: 1.6, ease: "easeOut", repeat: Infinity, repeatDelay: 0.4 }}
      />
      <motion.div
        className="cf3-succ-icon"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}>
        <CheckCircle2 size={32} strokeWidth={1.5} />
      </motion.div>
    </div>
    <h3 className="cf3-succ-h">
      {context === "career" ? "Application Submitted" : "Enquiry Received"}
    </h3>
    <p className="cf3-succ-p">
      {context === "career"
        ? "Our talent team will review your application and reach out within 5–7 business days."
        : "Our engineering team will review your requirement and respond within 1 business day."}
    </p>
    <p className="cf3-succ-note">
      A confirmation has been sent to your registered email address.
    </p>
    <button className="cf3-succ-btn" onClick={onReset}>
      Submit Another Enquiry
      <ArrowRight size={13} />
    </button>
  </motion.div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const BLANK = {
  name: "", email: "", phone: "", company: "",
  serviceRequired: "", technologyNode: "",
  roleApplying: "", experience: "", resume: null,
  engagementType: "", productInterest: "", requestType: "",
  message: "",
};

export default function ContactForm({ context = "general", sourcePage = "", className = "" }) {
  const cfg = CONFIG[context] || CONFIG.general;
  const [form, setFormState] = useState({ ...BLANK });
  const [errors, setErrors]  = useState({});
  const [submitting, setSub] = useState(false);
  const [submitted, setDone] = useState(false);

  const set = (k, v) => {
    setFormState(p => ({ ...p, [k]: v }));
    setErrors(p => { const n = { ...p }; delete n[k]; return n; });
  };

  const submit = async () => {
    const e = validate(form, context);
    if (Object.keys(e).length) { setErrors(e); return; }
    setSub(true);
    try {
      await new Promise(r => setTimeout(r, 1400));
      setDone(true);
    } finally { setSub(false); }
  };

  const reset = () => { setDone(false); setFormState({ ...BLANK }); setErrors({}); };

  return (
    <>
      <style>{`
        /* ── Section shell ──────────────────────────────────── */
        .cf3-shell {
          background: linear-gradient(160deg, #eef2ff 0%, #f5f3ff 45%, #faf5ff 100%);
          padding: 80px 0 96px;
          position: relative;
          overflow: hidden;
        }
        .cf3-blob {
          position: absolute; border-radius: 50%;
          filter: blur(88px); pointer-events: none; opacity: 0.5;
        }
        .cf3-blob-a {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #c7d2fe 0%, transparent 70%);
          top: -140px; right: -100px;
        }
        .cf3-blob-b {
          width: 360px; height: 360px;
          background: radial-gradient(circle, #ede9fe 0%, transparent 70%);
          bottom: -80px; left: -80px;
        }
        .cf3-container {
          max-width: 1160px; margin: 0 auto;
          padding: 0 48px;
          position: relative; z-index: 1;
          box-sizing: border-box;
        }

        /* ── Two-col card ────────────────────────────────────── */
        .cf3-card {
          display: grid;
          grid-template-columns: 320px 1fr;
          border-radius: 20px;
          overflow: hidden;
          box-shadow:
            0 24px 64px rgba(79,70,229,0.10),
            0 8px 24px rgba(0,0,0,0.06),
            0 0 0 1px rgba(79,70,229,0.07);
        }

        /* ── LEFT panel ──────────────────────────────────────── */
        .cf3-left {
          background: #ffffff;
          border-right: 1px solid #e0e7ff;
          padding: 48px 36px;
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
          overflow: hidden;
          min-width: 0;
        }
        .cf3-left::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, #4f46e5, #7c3aed, #a855f7);
        }
        .cf3-badge {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 5px 13px; border-radius: 999px;
          background: #eef2ff; border: 1px solid #c7d2fe;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #4f46e5; width: fit-content; margin-bottom: 22px;
        }
        .cf3-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #4f46e5;
          animation: cf3bdot 2.4s ease-in-out infinite;
        }
        @keyframes cf3bdot {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.35; transform: scale(0.7); }
        }
        .cf3-left-h {
          font-family: 'Clash Display', 'Sora', system-ui, sans-serif;
          font-size: clamp(20px, 2vw, 26px); font-weight: 700;
          color: #0f172a; letter-spacing: -0.03em; line-height: 1.2;
          margin: 0 0 10px;
        }
        .cf3-left-h em {
          font-style: normal;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .cf3-left-sub {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 13px; color: #64748b; line-height: 1.75; margin: 0 0 28px;
        }
        .cf3-illustration { margin: 0 -8px 24px; }
        .cf3-trust { display: flex; flex-direction: column; gap: 8px; flex: 1; }
        .cf3-trust-item {
          display: flex; align-items: flex-start; gap: 11px;
          padding: 12px 14px; border-radius: 10px;
          background: #f8fafc; border: 1px solid #f1f5f9;
          transition: border-color 0.18s, background 0.18s; min-width: 0;
        }
        .cf3-trust-item:hover { border-color: #e0e7ff; background: #fff; }
        .cf3-trust-icon {
          width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0;
          background: #eef2ff; border: 1px solid #c7d2fe;
          display: flex; align-items: center; justify-content: center;
          color: #4f46e5; margin-top: 1px;
        }
        .cf3-trust-label {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 12px; font-weight: 600; color: #0f172a;
          display: block; margin-bottom: 1px;
        }
        .cf3-trust-text {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 11px; color: #94a3b8; display: block; line-height: 1.45;
        }
        .cf3-contact-strip { margin-top: 24px; padding-top: 20px; border-top: 1px solid #f1f5f9; }
        .cf3-strip-lbl {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 9.5px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: #cbd5e1; margin-bottom: 10px; display: block;
        }
        .cf3-clink {
          display: flex; align-items: center; gap: 8px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 12px; color: #64748b; text-decoration: none;
          margin-bottom: 6px; transition: color 0.15s;
        }
        .cf3-clink:last-child { margin-bottom: 0; }
        .cf3-clink:hover { color: #4f46e5; }
        .cf3-clink svg { flex-shrink: 0; color: #c7d2fe; }

        /* ── RIGHT panel ─────────────────────────────────────── */
        .cf3-right {
          background: #ffffff;
          padding: 48px 52px 56px;
          overflow-y: auto; min-width: 0;
        }
        .cf3-rh { margin-bottom: 32px; }
        .cf3-eyebrow {
          display: inline-block;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.11em;
          text-transform: uppercase; color: #4f46e5;
          background: #eef2ff; border: 1px solid #c7d2fe;
          border-radius: 999px; padding: 4px 12px; margin-bottom: 12px;
        }
        .cf3-rtitle {
          font-family: 'Clash Display', 'Sora', system-ui, sans-serif;
          font-size: clamp(20px, 2.2vw, 26px); font-weight: 700;
          color: #0f172a; letter-spacing: -0.025em; line-height: 1.2; margin: 0 0 8px;
        }
        .cf3-rsub {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 13.5px; color: #64748b; line-height: 1.75; margin: 0;
        }

        /* ── Form sections ───────────────────────────────────── */
        .cf3-form { display: flex; flex-direction: column; }
        .cf3-sec { padding: 24px 0; border-bottom: 1px solid #f1f5f9; }
        .cf3-sec:last-of-type { border-bottom: none; padding-bottom: 0; }
        .cf3-sec-head { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
        .cf3-sec-pill {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          color: #4f46e5; background: #eef2ff; border: 1px solid #c7d2fe;
          border-radius: 999px; padding: 3px 11px; white-space: nowrap; flex-shrink: 0;
        }
        .cf3-sec-rule { flex: 1; height: 1px; background: #f1f5f9; }

        /* ── Field grids ─────────────────────────────────────────
           KEY FIX: spacing is controlled ONLY by the grid gap.
           .cf3-f has NO margin — it is purely a flex column wrapper
           for the input + error message pair.
        ──────────────────────────────────────────────────────── */
        .cf3-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 14px;
        }
        .cf3-row:last-child { margin-bottom: 0; }

        .cf3-row1 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
          margin-bottom: 14px;
        }
        .cf3-row1:last-child { margin-bottom: 0; }

        /* NO margin-bottom on .cf3-f — grid gap handles all spacing */
        .cf3-f {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
        }

        .cf3-err-msg {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 11.5px; color: #dc2626; margin: 2px 0 0 2px;
        }

        /* ── Floating input ──────────────────────────────────── */
        .fi3 {
          position: relative; min-height: 56px;
          background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px;
          transition: border-color 0.18s, background 0.18s, box-shadow 0.18s;
          display: flex; align-items: center; min-width: 0;
        }
        .fi3:hover { border-color: #c7d2fe; background: #fff; }
        .fi3-focus {
          border-color: #4f46e5 !important; background: #fff !important;
          box-shadow: 0 0 0 3.5px rgba(79,70,229,0.10);
        }
        .fi3-err { border-color: #fca5a5 !important; }
        .fi3-err.fi3-focus { box-shadow: 0 0 0 3.5px rgba(220,38,38,0.09) !important; }
        .fi3-icon-zone {
          width: 44px; height: 100%; min-height: 54px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: #94a3b8;
          border-right: 1px solid #f1f5f9; background: #f1f5f9;
          border-radius: 10px 0 0 10px;
          transition: color 0.18s, background 0.18s, border-color 0.18s;
          position: relative; z-index: 2;
        }
        .fi3-focus .fi3-icon-zone { color: #4f46e5; background: #eef2ff; border-color: transparent; }
        .fi3-input {
          position: relative; z-index: 1;
          width: 100%; height: 56px;
          padding: 20px 14px 8px 14px;
          background: transparent; border: none; outline: none;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 13.5px; font-weight: 400; color: #0f172a;
          box-sizing: border-box; min-width: 0;
        }
        .fi3-input::placeholder { color: transparent; }
        .fi3-input-noicon { padding-left: 14px; }
        .fi3-select { cursor: pointer; appearance: none; -webkit-appearance: none; padding-right: 36px; }
        .fi3-select option { background: #fff; color: #0f172a; }
        .fi3-chev {
          position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
          pointer-events: none; z-index: 3; color: #94a3b8; transition: color 0.18s;
        }
        .fi3-focus .fi3-chev { color: #4f46e5; }
        .fi3-label {
          position: absolute; left: 58px; top: 50%; transform: translateY(-50%);
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 13.5px; color: #94a3b8;
          pointer-events: none; z-index: 2;
          transition: all 0.17s ease; transform-origin: left center;
          white-space: nowrap; max-width: calc(100% - 78px);
          overflow: hidden; text-overflow: ellipsis;
        }
        .fi3-label-noicon { left: 14px; max-width: calc(100% - 28px); }
        .fi3-label-up {
          top: 17px; transform: translateY(-50%) scale(0.76);
          color: #4f46e5; max-width: calc((100% - 78px) / 0.76);
        }
        .fi3-label-noicon.fi3-label-up { max-width: calc((100% - 28px) / 0.76); }
        .fi3-req { color: #dc2626; }
        .fi3-ta-wrap { min-height: unset; align-items: flex-start; }
        .fi3-ta { height: auto; min-height: 120px; padding: 28px 14px 12px; resize: vertical; line-height: 1.7; }
        .fi3-label-ta { top: 26px; transform: none; left: 14px; }
        .fi3-label-ta-up { top: 10px; transform: scale(0.76); transform-origin: left top; color: #4f46e5; }

        /* ── Resume upload ────────────────────────────────────── */
        .ru3 {
          border: 1.5px dashed #c7d2fe; border-radius: 12px; padding: 16px 18px;
          cursor: pointer; background: #f8fafc; transition: all 0.18s; outline: none;
        }
        .ru3:hover, .ru3:focus-visible { border-color: #4f46e5; background: #eef2ff; }
        .ru3-filled { border-style: solid; border-color: #818cf8; background: #eef2ff; }
        .ru3-drag { border-color: #4f46e5; background: #eef2ff; box-shadow: 0 0 0 3px rgba(79,70,229,0.10); }
        .ru3-empty { display: flex; align-items: center; gap: 14px; }
        .ru3-icon-box {
          width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
          background: #eef2ff; border: 1px solid #c7d2fe;
          display: flex; align-items: center; justify-content: center; color: #4f46e5;
        }
        .ru3-cta { display: block; font-family: 'DM Sans', system-ui, sans-serif; font-size: 13px; font-weight: 500; color: #0f172a; }
        .ru3-hint { display: block; font-family: 'DM Sans', system-ui, sans-serif; font-size: 11.5px; color: #94a3b8; margin-top: 2px; }
        .ru3-row { display: flex; align-items: center; gap: 10px; }
        .ru3-file-ic {
          width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0;
          background: #eef2ff; border: 1px solid #c7d2fe;
          display: flex; align-items: center; justify-content: center; color: #4f46e5;
        }
        .ru3-meta { flex: 1; overflow: hidden; min-width: 0; }
        .ru3-name { display: block; font-family: 'DM Sans', system-ui, sans-serif; font-size: 13px; font-weight: 500; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .ru3-size { display: block; font-family: 'DM Sans', system-ui, sans-serif; font-size: 11px; color: #94a3b8; margin-top: 1px; }
        .ru3-remove {
          background: none; border: 1px solid #e2e8f0; border-radius: 7px;
          cursor: pointer; color: #94a3b8; padding: 5px;
          display: flex; align-items: center; flex-shrink: 0; transition: all 0.14s;
        }
        .ru3-remove:hover { background: #fee2e2; border-color: #fca5a5; color: #dc2626; }

        /* ── Submit row ──────────────────────────────────────── */
        .cf3-submit-row {
          display: flex; align-items: center;
          justify-content: space-between;
          padding-top: 28px; gap: 16px; flex-wrap: wrap;
        }
        .cf3-submit-note {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 11.5px; color: #94a3b8; line-height: 1.65; max-width: 230px;
        }
        .cf3-btn {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 14px 32px; border-radius: 11px; border: none;
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: #fff;
          font-family: 'Clash Display', 'Sora', system-ui, sans-serif;
          font-size: 14px; font-weight: 600; letter-spacing: 0.01em;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(79,70,229,0.30), 0 0 0 1px rgba(79,70,229,0.15);
          transition: all 0.2s; white-space: nowrap;
          position: relative; overflow: hidden; flex-shrink: 0;
        }
        .cf3-btn::after {
          content: ''; position: absolute; inset: 0; border-radius: inherit;
          background: linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, transparent 55%);
          pointer-events: none;
        }
        .cf3-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(79,70,229,0.38), 0 0 0 1px rgba(79,70,229,0.20); }
        .cf3-btn:active { transform: none; }
        .cf3-btn:disabled { opacity: 0.58; cursor: not-allowed; transform: none; box-shadow: none; }
        .cf3-dots { display: flex; align-items: center; gap: 4px; }
        .cf3-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: rgba(255,255,255,0.9);
          animation: cf3dotb 1.2s ease-in-out infinite;
        }
        .cf3-dot:nth-child(2) { animation-delay: 0.15s; }
        .cf3-dot:nth-child(3) { animation-delay: 0.30s; }
        @keyframes cf3dotb {
          0%,60%,100% { transform: translateY(0); opacity: 0.3; }
          30%          { transform: translateY(-5px); opacity: 1; }
        }

        /* ── Success ─────────────────────────────────────────── */
        .cf3-succ { display: flex; flex-direction: column; align-items: flex-start; gap: 16px; padding: 8px 0; }
        .cf3-succ-icon-wrap { position: relative; width: 64px; height: 64px; flex-shrink: 0; }
        .cf3-succ-ring { position: absolute; inset: 0; border-radius: 50%; border: 1.5px solid rgba(79,70,229,0.3); }
        .cf3-succ-icon {
          position: absolute; inset: 0; border-radius: 14px;
          background: #eef2ff; border: 1.5px solid #c7d2fe;
          display: flex; align-items: center; justify-content: center; color: #4f46e5;
        }
        .cf3-succ-h { font-family: 'Clash Display', 'Sora', system-ui, sans-serif; font-size: 22px; font-weight: 700; color: #0f172a; letter-spacing: -0.025em; margin: 0; }
        .cf3-succ-p { font-family: 'DM Sans', system-ui, sans-serif; font-size: 13.5px; color: #475569; line-height: 1.75; margin: 0; }
        .cf3-succ-note { font-family: 'DM Sans', system-ui, sans-serif; font-size: 12px; color: #94a3b8; margin: 0; }
        .cf3-succ-btn {
          display: inline-flex; align-items: center; gap: 7px;
          margin-top: 6px; padding: 10px 20px; border-radius: 10px;
          border: 1.5px solid #c7d2fe; background: #eef2ff;
          font-family: 'DM Sans', system-ui, sans-serif; font-size: 13px; font-weight: 600;
          color: #4f46e5; cursor: pointer; transition: all 0.17s;
        }
        .cf3-succ-btn:hover { background: #e0e7ff; border-color: #818cf8; }

        /* ══════════════════════════════════════════════════════════
           RESPONSIVE
           ══════════════════════════════════════════════════════════ */
        @media (max-width: 1060px) {
          .cf3-container { padding: 0 32px; }
          .cf3-card { grid-template-columns: 280px 1fr; }
          .cf3-left { padding: 40px 28px; }
          .cf3-right { padding: 40px 36px 52px; }
        }
        @media (max-width: 860px) {
          .cf3-shell { padding: 56px 0 72px; }
          .cf3-container { padding: 0 24px; }
          .cf3-card { grid-template-columns: 1fr; border-radius: 16px; }
          .cf3-left { padding: 32px 28px 28px; border-right: none; border-bottom: 1px solid #e0e7ff; }
          .cf3-illustration { display: none; }
          .cf3-trust { flex-direction: row; flex-wrap: wrap; gap: 10px; }
          .cf3-trust-item { flex: 1 1 calc(50% - 5px); min-width: 150px; }
          .cf3-contact-strip { display: none; }
          .cf3-right { padding: 32px 28px 44px; }
          .cf3-rh { margin-bottom: 24px; }
        }
        @media (max-width: 700px) {
          .cf3-row { grid-template-columns: 1fr; }
          .cf3-trust-item { flex: 1 1 100%; min-width: 0; }
        }
        @media (max-width: 640px) {
          .cf3-shell { padding: 40px 0 56px; }
          .cf3-container { padding: 0 16px; }
          .cf3-card { border-radius: 14px; }
          .cf3-left { padding: 24px 18px 20px; }
          .cf3-badge { font-size: 10px; padding: 4px 11px; margin-bottom: 18px; }
          .cf3-left-h { font-size: clamp(18px, 5.5vw, 24px); margin-bottom: 8px; }
          .cf3-left-sub { font-size: 12.5px; margin-bottom: 18px; }
          .cf3-trust { gap: 8px; }
          .cf3-trust-item { padding: 10px 12px; }
          .cf3-trust-label { font-size: 11.5px; }
          .cf3-trust-text { font-size: 10.5px; }
          .cf3-right { padding: 24px 18px 36px; }
          .cf3-eyebrow { font-size: 10px; padding: 4px 11px; }
          .cf3-rtitle { font-size: clamp(18px, 5.5vw, 24px); }
          .cf3-rsub { font-size: 12.5px; }
          .cf3-sec { padding: 18px 0; }
          .cf3-sec-head { margin-bottom: 16px; gap: 10px; }
          .cf3-sec-pill { font-size: 9.5px; padding: 3px 10px; }
          .fi3 { min-height: 52px; }
          .fi3-input, .fi3-icon-zone { min-height: 50px; height: 52px; }
          .fi3-input { font-size: 14px; }
          .fi3-icon-zone { width: 40px; }
          .fi3-label { left: 52px; font-size: 13px; }
          .fi3-label-noicon { left: 12px; }
          .fi3-ta { min-height: 110px; }
          .ru3 { padding: 14px 14px; }
          .ru3-icon-box, .ru3-file-ic { width: 34px; height: 34px; }
          .cf3-submit-row { flex-direction: column; align-items: stretch; padding-top: 22px; gap: 14px; }
          .cf3-btn { justify-content: center; width: 100%; padding: 14px 24px; }
          .cf3-submit-note { max-width: 100%; order: 2; text-align: left; }
          .cf3-succ { gap: 14px; }
          .cf3-succ-h { font-size: 19px; }
          .cf3-succ-p { font-size: 13px; }
          .cf3-succ-btn { width: 100%; justify-content: center; }
        }
        @media (max-width: 400px) {
          .cf3-container { padding: 0 10px; }
          .cf3-card { border-radius: 12px; }
          .cf3-left { padding: 20px 14px 18px; }
          .cf3-right { padding: 20px 14px 32px; }
          .cf3-trust-item { padding: 9px 10px; gap: 8px; }
          .cf3-trust-icon { width: 26px; height: 26px; }
          .fi3-icon-zone { width: 36px; }
          .fi3-label { left: 48px; font-size: 12.5px; }
          .fi3-label-noicon { left: 10px; }
          .fi3-input { padding-left: 10px; padding-right: 10px; }
          .fi3-input-noicon { padding-left: 10px; }
          .fi3-select { padding-right: 30px; }
          .fi3-chev { right: 10px; }
          .cf3-btn { font-size: 13px; padding: 13px 18px; }
        }
        @media (max-width: 860px) and (orientation: landscape) {
          .cf3-shell { padding: 32px 0 40px; }
          .cf3-trust { flex-direction: row; flex-wrap: wrap; }
          .cf3-trust-item { flex: 1 1 calc(33.33% - 8px); min-width: 130px; }
        }
      `}</style>

      <section id="contact-form" className={`cf3-shell ${className}`} aria-labelledby="cf3-title">
        <div className="cf3-blob cf3-blob-a" aria-hidden="true" />
        <div className="cf3-blob cf3-blob-b" aria-hidden="true" />

        <div className="cf3-container">
          <div className="cf3-card">

            {/* ── LEFT ── */}
            <motion.aside
              className="cf3-left"
              aria-label="Contact context"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div className="cf3-badge">
                <span className="cf3-badge-dot" aria-hidden="true" />
                {cfg.badge}
              </div>
              <h2 className="cf3-left-h">
                {cfg.heading.split(" ").slice(0, -2).join(" ")}{" "}
                <em>{cfg.heading.split(" ").slice(-2).join(" ")}</em>
              </h2>
              <p className="cf3-left-sub">{cfg.subheading}</p>
              <div className="cf3-illustration">
                <CircuitIllustration />
              </div>
              <div className="cf3-trust" role="list">
                {TRUST.map(({ icon: Icon, label, text }, i) => (
                  <motion.div key={label} className="cf3-trust-item" role="listitem"
                    initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: EASE, delay: 0.15 + i * 0.08 }}>
                    <div className="cf3-trust-icon" aria-hidden="true"><Icon size={14} /></div>
                    <div>
                      <span className="cf3-trust-label">{label}</span>
                      <span className="cf3-trust-text">{text}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="cf3-contact-strip">
                <span className="cf3-strip-lbl">Or reach us directly</span>
                <a href="mailto:contact@aurowinx.com" className="cf3-clink">
                  <Mail size={13} aria-hidden="true" />contact@aurowinx.com
                </a>
                <a href="tel:+914412345678" className="cf3-clink">
                  <Phone size={13} aria-hidden="true" />+91 44 XXXX XXXX
                </a>
              </div>
            </motion.aside>

            {/* ── RIGHT ── */}
            <motion.main
              className="cf3-right"
              aria-label="Contact form"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            >
              <div className="cf3-rh">
                <span className="cf3-eyebrow">{cfg.badge}</span>
                <h1 id="cf3-title" className="cf3-rtitle">{cfg.heading}</h1>
                <p className="cf3-rsub">{cfg.subheading}</p>
              </div>

              {submitted ? (
                <SuccessScreen context={context} onReset={reset} />
              ) : (
                <div className="cf3-form">

                  {/* Personal Details */}
                  <motion.div className="cf3-sec"
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.45, ease: EASE }}>
                    <SectionHead label="Personal Details" />
                    <div className="cf3-row">
                      <div className="cf3-f">
                        <FloatingInput id="cf3-name" label="Full Name" icon={User}
                          value={form.name} onChange={v => set("name", v)}
                          autoComplete="name" required error={errors.name} />
                        <ErrMsg id="cf3-name-err" msg={errors.name} />
                      </div>
                      <div className="cf3-f">
                        <FloatingInput id="cf3-email" label="Business Email" icon={Mail}
                          type="email" value={form.email} onChange={v => set("email", v)}
                          autoComplete="email" required error={errors.email} />
                        <ErrMsg id="cf3-email-err" msg={errors.email} />
                      </div>
                    </div>
                    <div className="cf3-row">
                      <div className="cf3-f">
                        <FloatingInput id="cf3-phone" label="Phone Number (optional)" icon={Phone}
                          type="tel" value={form.phone} onChange={v => set("phone", v)}
                          autoComplete="tel" />
                      </div>
                      <div className="cf3-f">
                        <FloatingInput id="cf3-co" label="Company / Organisation (optional)" icon={Building2}
                          value={form.company} onChange={v => set("company", v)}
                          autoComplete="organization" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Services */}
                  {context === "services" && (
                    <motion.div className="cf3-sec"
                      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.45, ease: EASE, delay: 0.05 }}>
                      <SectionHead label="Project Details" />
                      <div className="cf3-row">
                        <div className="cf3-f">
                          <FloatingSelect id="cf3-svc" label="Service Required" icon={Cpu}
                            value={form.serviceRequired} onChange={v => set("serviceRequired", v)}
                            options={cfg.serviceOptions} required error={errors.serviceRequired} />
                          <ErrMsg id="cf3-svc-err" msg={errors.serviceRequired} />
                        </div>
                        <div className="cf3-f">
                          <FloatingSelect id="cf3-node" label="Technology Node (optional)"
                            value={form.technologyNode} onChange={v => set("technologyNode", v)}
                            options={cfg.nodeOptions} />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Career */}
                  {context === "career" && (
                    <motion.div className="cf3-sec"
                      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.45, ease: EASE, delay: 0.05 }}>
                      <SectionHead label="Application Details" />
                      <div className="cf3-row">
                        <div className="cf3-f">
                          <FloatingSelect id="cf3-role" label="Role Applying For" icon={Briefcase}
                            value={form.roleApplying} onChange={v => set("roleApplying", v)}
                            options={cfg.roleOptions} required error={errors.roleApplying} />
                          <ErrMsg id="cf3-role-err" msg={errors.roleApplying} />
                        </div>
                        <div className="cf3-f">
                          <FloatingSelect id="cf3-exp" label="Years of Experience"
                            value={form.experience} onChange={v => set("experience", v)}
                            options={cfg.experienceOptions} required error={errors.experience} />
                          <ErrMsg id="cf3-exp-err" msg={errors.experience} />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Company */}
                  {context === "company" && (
                    <motion.div className="cf3-sec"
                      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.45, ease: EASE, delay: 0.05 }}>
                      <SectionHead label="Engagement Details" />
                      <div className="cf3-row1">
                        <div className="cf3-f">
                          <FloatingSelect id="cf3-eng" label="Type of Engagement"
                            value={form.engagementType} onChange={v => set("engagementType", v)}
                            options={cfg.engagementOptions} required error={errors.engagementType} />
                          <ErrMsg id="cf3-eng-err" msg={errors.engagementType} />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Product */}
                  {context === "product" && (
                    <motion.div className="cf3-sec"
                      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.45, ease: EASE, delay: 0.05 }}>
                      <SectionHead label="Product Details" />
                      <div className="cf3-row">
                        <div className="cf3-f">
                          <FloatingInput id="cf3-prod" label="Product of Interest (optional)" icon={Layers}
                            value={form.productInterest} onChange={v => set("productInterest", v)} />
                        </div>
                        <div className="cf3-f">
                          <FloatingSelect id="cf3-reqt" label="Type of Request"
                            value={form.requestType} onChange={v => set("requestType", v)}
                            options={cfg.requestOptions} required error={errors.requestType} />
                          <ErrMsg id="cf3-reqt-err" msg={errors.requestType} />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Message */}
                  <motion.div className="cf3-sec"
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.45, ease: EASE, delay: 0.08 }}>
                    <SectionHead label={context === "career" ? "Cover Note" : "Your Message"} />
                    <div className="cf3-row1">
                      <div className="cf3-f">
                        <FloatingTextarea id="cf3-msg"
                          label={context === "career"
                            ? "Professional Summary & Motivation"
                            : "Project / Requirement Brief"}
                          value={form.message} onChange={v => set("message", v)}
                          error={errors.message} required rows={4} />
                        <ErrMsg id="cf3-msg-err" msg={errors.message} />
                      </div>
                    </div>
                    {context === "career" && (
                      <div className="cf3-row1">
                        <div className="cf3-f">
                          <ResumeUpload value={form.resume} onChange={v => set("resume", v)} />
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Submit */}
                  <motion.div className="cf3-submit-row"
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, ease: EASE, delay: 0.12 }}>
                    <p className="cf3-submit-note">
                      Fields marked * are required.<br />
                      By submitting, you agree to be contacted about your enquiry.
                    </p>
                    <motion.button
                      className="cf3-btn" onClick={submit}
                      disabled={submitting} aria-busy={submitting}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                      {submitting ? (
                        <div className="cf3-dots" aria-label="Submitting">
                          <span className="cf3-dot"/><span className="cf3-dot"/><span className="cf3-dot"/>
                        </div>
                      ) : (
                        <>
                          <Send size={14} aria-hidden="true" />
                          {context === "career" ? "Submit Application" : "Submit Enquiry"}
                        </>
                      )}
                    </motion.button>
                  </motion.div>

                </div>
              )}
            </motion.main>

          </div>
        </div>
      </section>
    </>
  );
}