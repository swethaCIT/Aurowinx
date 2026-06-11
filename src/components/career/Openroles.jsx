// components/career/Openroles.jsx
// Live Supabase fetch — filters + job cards + skeleton + empty state
// Navigates to /career/[slug] on card click

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Briefcase, SlidersHorizontal, X, ArrowRight } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { C, FONT, EASE } from "././theme";

/* ─── Filter config ───────────────────────────────────────────────────────── */
const FILTER_CONFIG = [
  {
    key: "location",
    label: "Location",
    options: [
      { v: "", l: "All Locations" },
      { v: "India",  l: "India"  },
      { v: "Remote", l: "Remote" },
    ],
  },
  {
    key: "domain",
    label: "Domain",
    options: [
      { v: "",                l: "All Domains"     },
      { v: "DFT",             l: "DFT"             },
      { v: "Verification",    l: "Verification"    },
      { v: "Physical Design", l: "Physical Design" },
    ],
  },
  {
    key: "employment_type",
    label: "Type",
    options: [
      { v: "",          l: "All Types" },
      { v: "Full Time", l: "Full Time" },
    ],
  },
];

/* ─── Domain badge colours ────────────────────────────────────────────────── */
const domainStyle = (domain) => {
  const map = {
    "DFT":            { bg: "#eef2ff", text: "#4338ca", dot: C.primary   },
    "Verification":   { bg: "#f5f3ff", text: "#6d28d9", dot: C.secondary },
    "Physical Design":{ bg: "#ede9fe", text: "#5b21b6", dot: C.accent    },
  };
  return map[domain] || { bg: C.bgAccent, text: C.primary, dot: C.accent };
};

/* ─── Skeleton card ───────────────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div style={{
      background: C.bgWhite, borderRadius: 20,
      border: `1px solid ${C.border}`, padding: 28,
    }}>
      {[["60%","12px"], ["40%","8px"], ["55%","8px"], ["45%","8px"]].map(([w, h], i) => (
        <div key={i} style={{
          height: h, width: w,
          background: i === 0 ? C.accentSoft : C.bgSoft,
          borderRadius: 6, marginBottom: i < 3 ? 12 : 24,
          animation: "skeletonPulse 1.5s ease-in-out infinite",
          animationDelay: `${i * 0.1}s`,
        }} />
      ))}
      <div style={{
        height: 40, background: C.accentSoft, borderRadius: 10,
        animation: "skeletonPulse 1.5s ease-in-out infinite",
      }} />
    </div>
  );
}

/* ─── Select dropdown ─────────────────────────────────────────────────────── */
function FilterSelect({ label, value, onChange, options }) {
  const active = !!value;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{
        fontSize: 11, fontWeight: 700,
        color: C.textMuted,
        textTransform: "uppercase", letterSpacing: "0.08em",
      }}>
        {label}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          padding: "10px 36px 10px 14px",
          borderRadius: 10,
          border: `1.5px solid ${active ? C.accent : C.border}`,
          background: C.bgWhite,
          color: active ? C.primary : C.textSecondary,
          fontSize: 14, fontFamily: FONT,
          fontWeight: active ? 600 : 400,
          outline: "none", cursor: "pointer",
          appearance: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236366f1' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "calc(100% - 12px) center",
          transition: "border-color 0.2s",
        }}
      >
        {options.map(o => (
          <option key={o.v} value={o.v}>{o.l}</option>
        ))}
      </select>
    </div>
  );
}

/* ─── Experience number input ─────────────────────────────────────────────── */
function ExpInput({ label, placeholder, value, onChange }) {
  const active = !!value;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{
        fontSize: 11, fontWeight: 700,
        color: C.textMuted,
        textTransform: "uppercase", letterSpacing: "0.08em",
      }}>
        {label}
      </label>
      <input
        type="number" min={0} max={30}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          padding: "10px 14px", borderRadius: 10,
          border: `1.5px solid ${active ? C.accent : C.border}`,
          background: C.bgWhite,
          color: C.textPrimary,
          fontSize: 14, fontFamily: FONT,
          outline: "none",
          transition: "border-color 0.2s",
        }}
      />
    </div>
  );
}

/* ─── Job Card ────────────────────────────────────────────────────────────── */
function JobCard({ job, index }) {
  const navigate = useNavigate();
  const dc = domainStyle(job.domain);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: EASE }}
      whileHover={{ y: -5 }}
      style={{
        background: C.bgWhite, borderRadius: 20,
        border: `1px solid ${C.border}`,
        padding: 28,
        display: "flex", flexDirection: "column", gap: 16,
        transition: "border-color 0.25s, box-shadow 0.25s",
        cursor: "default",
      }}
      onHoverStart={e => {
        e.target.style.borderColor = dc.dot;
        e.target.style.boxShadow = `0 12px 40px rgba(79,70,229,0.12)`;
      }}
      onHoverEnd={e => {
        e.target.style.borderColor = C.border;
        e.target.style.boxShadow = "none";
      }}
    >
      {/* Top row — domain badge + type */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{
          fontSize: 11, fontWeight: 700,
          letterSpacing: "0.05em",
          background: dc.bg, color: dc.text,
          padding: "4px 12px", borderRadius: 100,
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: dc.dot, display: "inline-block",
          }} />
          {job.domain}
        </span>
        <span style={{
          fontSize: 11, color: C.textMuted,
          fontWeight: 500, fontFamily: FONT,
        }}>
          {job.employment_type}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: FONT, fontSize: 15,
        fontWeight: 700, color: C.textPrimary,
        lineHeight: 1.35, margin: 0,
      }}>
        {job.job_title}
      </h3>

      {/* Meta */}
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {[
          { Icon: MapPin,    text: job.location },
          { Icon: Clock,     text: `${job.experience_min}–${job.experience_max} Years Experience` },
          { Icon: Briefcase, text: job.employment_type },
        ].map(({ Icon, text }) => (
          <div key={text} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon style={{ width: 13, height: 13, color: C.textMuted, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: C.textSecondary, fontWeight: 500 }}>
              {text}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <motion.button
        onClick={() => navigate(`/careers/${job.slug}`)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          marginTop: "auto",
          width: "100%", padding: "12px 20px",
          borderRadius: 12,
          border: `1.5px solid ${C.border}`,
          background: "transparent",
          color: C.primary, fontSize: 14,
          fontWeight: 600, cursor: "pointer",
          fontFamily: FONT,
          display: "flex", alignItems: "center",
          justifyContent: "center", gap: 8,
          transition: "all 0.22s",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = C.gradPrimary;
          e.currentTarget.style.color = "#fff";
          e.currentTarget.style.borderColor = "transparent";
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(79,70,229,0.28)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = C.primary;
          e.currentTarget.style.borderColor = C.border;
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        View Job Details
        <ArrowRight style={{ width: 15, height: 15 }} />
      </motion.button>
    </motion.div>
  );
}

/* ─── Empty State ─────────────────────────────────────────────────────────── */
function EmptyState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        textAlign: "center", padding: "80px 24px",
        background: C.bgLight, borderRadius: 20,
        border: `1px solid ${C.border}`,
      }}
    >
      <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
      <h3 style={{
        fontFamily: FONT, fontSize: 20,
        fontWeight: 700, color: C.textPrimary, marginBottom: 8,
      }}>
        No positions found
      </h3>
      <p style={{ color: C.textMuted, fontSize: 15, marginBottom: 24 }}>
        Try adjusting your filters or check back soon for new openings.
      </p>
      <motion.button
        onClick={onReset}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{
          padding: "11px 28px", borderRadius: 10,
          border: "none", background: C.gradPrimary,
          color: "#fff", fontSize: 14,
          fontWeight: 600, cursor: "pointer", fontFamily: FONT,
        }}
      >
        Clear All Filters
      </motion.button>
    </motion.div>
  );
}

/* ─── Main OpenRoles Component ────────────────────────────────────────────── */
export default function OpenRoles() {
  const [filters, setFilters] = useState({
    location: "", domain: "", employment_type: "", minExp: "", maxExp: "",
  });
  const [jobs, setJobs]       = useState([]);
  const [loading, setLoading] = useState(true);

  const setFilter = (key, val) =>
    setFilters(prev => ({ ...prev, [key]: val }));

  const resetFilters = () =>
    setFilters({ location: "", domain: "", employment_type: "", minExp: "", maxExp: "" });

  const isFiltered = Object.values(filters).some(v => v !== "");

  /* ── Fetch ── */
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      let q = supabase.from("jobs").select("*").eq("status", "open");

      if (filters.location)        q = q.eq("location",        filters.location);
      if (filters.domain)          q = q.eq("domain",          filters.domain);
      if (filters.employment_type) q = q.eq("employment_type", filters.employment_type);
      if (filters.minExp)          q = q.lte("experience_min", Number(filters.minExp));
      if (filters.maxExp)          q = q.gte("experience_max", Number(filters.maxExp));

      const { data, error } = await q;
      if (!error) setJobs(data || []);
      setLoading(false);
    };
    fetch();
  }, [filters]);

  return (
    <section
      id="open-roles"
      style={{ background: C.bgWhite, padding: "100px 24px", fontFamily: FONT }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* ── Header ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <span style={{
            display: "inline-block", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: C.primary, marginBottom: 12,
          }}>
            Open Positions
          </span>
          <h2 style={{
            fontFamily: FONT,
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            fontWeight: 800, color: C.textPrimary,
            margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.1,
          }}>
            Explore Opportunities
          </h2>
          <p style={{
            color: C.textSecondary, fontSize: 17,
            maxWidth: 400, margin: "0 auto",
          }}>
            Join our engineering teams working on cutting-edge silicon technologies.
          </p>
        </motion.div>

        {/* ── Filter Panel ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
          style={{
            background: C.bgLight, borderRadius: 20,
            border: `1px solid ${C.border}`,
            padding: "24px 28px", marginBottom: 36,
          }}
        >
          {/* Filter panel header */}
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", marginBottom: 20,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 11,
                background: C.gradPrimary,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <SlidersHorizontal style={{ width: 17, height: 17, color: "#fff" }} />
              </div>
              <div>
                <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 15, color: C.textPrimary }}>
                  Find Your Role
                </div>
                <div style={{ fontSize: 12, color: C.textMuted }}>
                  Filter positions by your preferences
                </div>
              </div>
            </div>

            {/* Reset — only show when filters active */}
            <AnimatePresence>
              {isFiltered && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  onClick={resetFilters}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "8px 16px", borderRadius: 10,
                    border: `1px solid ${C.border}`, background: C.bgWhite,
                    color: C.primary, fontSize: 13, fontWeight: 600,
                    cursor: "pointer", fontFamily: FONT,
                  }}
                >
                  <X style={{ width: 13, height: 13 }} />
                  Reset
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Filter controls */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: 12,
          }}>
            {FILTER_CONFIG.map(f => (
              <FilterSelect
                key={f.key}
                label={f.label}
                value={filters[f.key]}
                onChange={val => setFilter(f.key, val)}
                options={f.options}
              />
            ))}
            <ExpInput
              label="Min Exp (yrs)"
              placeholder="e.g. 2"
              value={filters.minExp}
              onChange={val => setFilter("minExp", val)}
            />
            <ExpInput
              label="Max Exp (yrs)"
              placeholder="e.g. 10"
              value={filters.maxExp}
              onChange={val => setFilter("maxExp", val)}
            />
          </div>
        </motion.div>

        {/* ── Results count ────────────────────────────────────────────── */}
        <AnimatePresence>
          {!loading && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{
                marginBottom: 24,
                display: "flex", alignItems: "center", gap: 8,
              }}
            >
              <span style={{ fontSize: 14, color: C.textMuted }}>
                Showing{" "}
                <strong style={{ color: C.primary }}>{jobs.length}</strong>{" "}
                open position{jobs.length !== 1 ? "s" : ""}
              </span>
              {isFiltered && (
                <span style={{
                  fontSize: 11, background: C.accentSoft,
                  color: C.primary, padding: "3px 10px",
                  borderRadius: 100, fontWeight: 600,
                }}>
                  Filtered
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Job Cards / Skeleton / Empty ─────────────────────────────── */}
        {loading ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24,
          }}>
            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : jobs.length === 0 ? (
          <EmptyState onReset={resetFilters} />
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24,
          }}>
            <AnimatePresence>
              {jobs.map((job, i) => (
                <JobCard key={job.id} job={job} index={i} />
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>

      {/* ── Skeleton keyframes ───────────────────────────────────────── */}
      <style>{`
        @keyframes skeletonPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.45; }
        }
        @media (max-width: 640px) {
          #open-roles .filter-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}