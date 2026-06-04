import { motion } from "framer-motion";
import { C, FONT, fadeUp, fadeLeft, fadeRight, EASE } from "././theme";

const billingModels = [
  {
    name: "T&M",
    full: "Time & Material",
    desc: "Flexible engagement where you pay for actual engineering time and resources used. Ideal for exploratory or evolving projects.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    color: "#4f46e5",
    bg: "rgba(79,70,229,0.06)",
    border: "rgba(79,70,229,0.14)",
    best: "Exploratory Projects",
  },
  {
    name: "Turnkey",
    full: "Turnkey Delivery",
    desc: "Fixed-scope, fixed-cost engagement. Aurowinx owns end-to-end execution and delivers a fully validated output.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      </svg>
    ),
    color: "#0891b2",
    bg: "rgba(8,145,178,0.06)",
    border: "rgba(8,145,178,0.14)",
    best: "Fixed-Scope Deliverables",
  },
  {
    name: "Milestone",
    full: "Milestone-Based",
    desc: "Structured payment tied to clearly defined project milestones — ensuring alignment, transparency, and shared accountability at every phase.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
    color: "#2563eb",
    bg: "rgba(37,99,235,0.06)",
    border: "rgba(37,99,235,0.14)",
    best: "Long-Term Programs",
  },
];

const clientModel = {
  label: "Client-Led Model",
  tagColor: "#4f46e5",
  tagBg: "rgba(79,70,229,0.08)",
  tagBorder: "rgba(79,70,229,0.2)",
  from: {
    title: "From Client",
    items: ["Tools", "Server", "Flows & Scripts", "Design Data"],
    color: "#4f46e5",
    bg: "rgba(79,70,229,0.06)",
    border: "rgba(79,70,229,0.14)",
  },
  from2: {
    title: "From Aurowinx",
    items: ["Engineering Resources (NRE)", "Project Management"],
    color: "#0891b2",
    bg: "rgba(8,145,178,0.06)",
    border: "rgba(8,145,178,0.14)",
  },
  output: "Project Delivery",
  note: "Remote-Login (Aurowinx Office)",
};

const aurowinxModel = {
  label: "Aurowinx-Led Model",
  tagColor: "#0891b2",
  tagBg: "rgba(8,145,178,0.08)",
  tagBorder: "rgba(8,145,178,0.2)",
  from: {
    title: "From Client",
    items: ["Spec & Design Data"],
    color: "#4f46e5",
    bg: "rgba(79,70,229,0.06)",
    border: "rgba(79,70,229,0.14)",
  },
  from2: {
    title: "From Aurowinx",
    items: [
      "Engineering Resources (NRE)",
      "Tools & Server (NRE + Infra)",
      "Flow & Scripts",
      "Project Management",
      "Risk Management",
    ],
    color: "#0891b2",
    bg: "rgba(8,145,178,0.06)",
    border: "rgba(8,145,178,0.14)",
  },
  output: "Project Delivery",
  note: "Aurowinx Office",
};

function ModelCard({ model, gradient, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay, ease: EASE }}
      style={{
        background: "white",
        borderRadius: 22,
        overflow: "hidden",
        border: "1px solid #e0e7ff",
        boxShadow: "0 4px 24px rgba(15,23,42,0.07)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* card header */}
      <div style={{
        background: gradient,
        padding: "28px 32px 24px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -40, right: -40,
          width: 180, height: 180, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <span style={{
          display: "inline-block",
          fontSize: 10, fontWeight: 700, letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.75)",
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 9999, padding: "4px 14px",
          marginBottom: 12, backdropFilter: "blur(8px)",
        }}>
          {model.label}
        </span>
        <h3 style={{
          fontSize: 20, fontWeight: 700, color: "white",
          margin: 0, letterSpacing: "-0.025em",
        }}>
          {model.label === "Client-Led Model"
            ? "You drive, we execute"
            : "We own it end-to-end"}
        </h3>
      </div>

      {/* card body */}
      <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: 18, flex: 1 }}>

        {/* from client box */}
        <div style={{
          borderRadius: 12, padding: "16px 18px",
          background: model.from.bg, border: `1px solid ${model.from.border}`,
        }}>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.16em",
            textTransform: "uppercase", color: model.from.color, marginBottom: 10,
          }}>
            {model.from.title}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {model.from.items.map((item, i) => (
              <span key={i} style={{
                fontSize: 12, fontWeight: 600, color: "#475569",
                background: "white", border: "1px solid #e2e8f0",
                borderRadius: 7, padding: "4px 10px",
              }}>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* arrow */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <div style={{ flex: 1, height: 1, background: "#e0e7ff" }} />
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: "linear-gradient(135deg, #4f46e5, #0891b2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(79,70,229,0.2)",
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </div>
          <div style={{ flex: 1, height: 1, background: "#e0e7ff" }} />
        </div>

        {/* from aurowinx box */}
        <div style={{
          borderRadius: 12, padding: "16px 18px",
          background: model.from2.bg, border: `1px solid ${model.from2.border}`,
        }}>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.16em",
            textTransform: "uppercase", color: model.from2.color, marginBottom: 10,
          }}>
            {model.from2.title}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {model.from2.items.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 5, height: 5, borderRadius: "50%",
                  background: model.from2.color, flexShrink: 0,
                }} />
                <span style={{ fontSize: 13, color: "#475569", fontWeight: 500 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* arrow */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <div style={{ flex: 1, height: 1, background: "#e0e7ff" }} />
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: "linear-gradient(135deg, #4f46e5, #0891b2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(79,70,229,0.2)",
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </div>
          <div style={{ flex: 1, height: 1, background: "#e0e7ff" }} />
        </div>

        {/* output */}
        <motion.div
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          style={{
            borderRadius: 12, padding: "18px",
            background: "linear-gradient(135deg, #4f46e5, #0891b2)",
            display: "flex", alignItems: "center",
            justifyContent: "center", gap: 10,
            boxShadow: "0 6px 20px rgba(79,70,229,0.2)",
            cursor: "default",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span style={{
            fontSize: 14, fontWeight: 700, color: "white",
            letterSpacing: "-0.01em",
          }}>
            {model.output}
          </span>
        </motion.div>

        {/* note */}
        <div style={{
          textAlign: "center", fontSize: 11, color: C.textMuted,
          fontWeight: 600, letterSpacing: "0.08em",
        }}>
          {model.note}
        </div>
      </div>
    </motion.div>
  );
}

export default function BusinessModel() {
  return (
    <section
      style={{
        background: "#ffffff",
        fontFamily: FONT,
        position: "relative",
        overflow: "hidden",
        padding: "100px 0 110px",
      }}
    >
      {/* ── SUBTLE GRID ── */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.018,
        backgroundImage:
          "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
        backgroundSize: "52px 52px",
        pointerEvents: "none",
      }} />

      {/* ── BG GLOWS ── */}
      <div style={{
        position: "absolute", top: -80, left: -60, width: 420, height: 420,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(79,70,229,0.05) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -80, right: -60, width: 380, height: 380,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(8,145,178,0.05) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        {/* ── LABEL ── */}
        <motion.div {...fadeUp} transition={{ duration: 0.7, ease: EASE }} style={{ textAlign: "center", marginBottom: 16 }}>
          <span style={{
            display: "inline-block", padding: "6px 20px", borderRadius: 9999,
            border: "1px solid #c7d2fe", background: "#eef2ff",
            fontSize: 11, fontWeight: 700, letterSpacing: "0.22em",
            textTransform: "uppercase", color: C.primary,
          }}>
            Engagement Models
          </span>
        </motion.div>

        {/* ── HEADING ── */}
        <motion.h2
          {...fadeUp} transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{
            textAlign: "center", fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700, color: C.textPrimary,
            letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16,
          }}
        >
          How We{" "}
          <span style={{
            background: "linear-gradient(135deg, #4f46e5 0%, #0891b2 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Work With You
          </span>
        </motion.h2>

        {/* ── SUBTEXT ── */}
        <motion.p
          {...fadeUp} transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
          style={{
            textAlign: "center", fontSize: 16, color: C.textSecondary,
            maxWidth: 580, margin: "0 auto 72px", lineHeight: 1.75,
          }}
        >
          Flexible engagement models designed to match your project needs —
          from resource augmentation to full end-to-end delivery ownership.
        </motion.p>

        {/* ── BILLING MODEL PILLS ── */}
        <motion.div
          {...fadeUp} transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          style={{
            display: "flex", justifyContent: "center",
            gap: 16, marginBottom: 64, flexWrap: "wrap",
          }}
        >
          {billingModels.map((b, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -3, transition: { duration: 0.22 } }}
              style={{
                background: "white", borderRadius: 16,
                padding: "22px 24px", minWidth: 240, flex: 1, maxWidth: 320,
                border: `1px solid ${b.border}`,
                boxShadow: "0 2px 12px rgba(15,23,42,0.05)",
                cursor: "default", position: "relative", overflow: "hidden",
              }}
            >
              {/* top accent */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${b.color}, transparent)`,
                borderRadius: "16px 16px 0 0", opacity: 0.7,
              }} />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: b.bg, border: `1px solid ${b.border}`,
                  display: "flex", alignItems: "center",
                  justifyContent: "center", color: b.color,
                }}>
                  {b.icon}
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 700,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: b.color, background: b.bg,
                  border: `1px solid ${b.border}`,
                  borderRadius: 9999, padding: "3px 10px",
                }}>
                  {b.best}
                </span>
              </div>

              <div style={{
                fontSize: 18, fontWeight: 800, color: b.color,
                letterSpacing: "-0.02em", marginBottom: 4,
              }}>
                {b.name}
              </div>
              <div style={{
                fontSize: 11, fontWeight: 600, color: C.textMuted,
                letterSpacing: "0.08em", marginBottom: 10,
                textTransform: "uppercase",
              }}>
                {b.full}
              </div>
              <p style={{
                fontSize: 13.5, color: C.textSecondary,
                lineHeight: 1.7, margin: 0,
              }}>
                {b.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── TWO MODEL CARDS ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 28,
            marginBottom: 56,
          }}
          className="business-model-grid"
        >
          <ModelCard
            model={clientModel}
            gradient="linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)"
            delay={0.1}
          />
          <ModelCard
            model={aurowinxModel}
            gradient="linear-gradient(135deg, #2563eb 0%, #0891b2 100%)"
            delay={0.2}
          />
        </div>

        {/* ── BOTTOM COMPARISON TABLE ── */}
        <motion.div
          {...fadeUp} transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
          style={{
            background: "#f8fafc", borderRadius: 20,
            border: "1px solid #e0e7ff", overflow: "hidden",
          }}
        >
          {/* table header */}
          <div style={{
            display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr",
            background: "linear-gradient(135deg, #4f46e5, #0891b2)",
            padding: "16px 28px",
          }}>
            {["What's Included", "Client-Led", "Aurowinx-Led"].map((h, i) => (
              <div key={i} style={{
                fontSize: 11, fontWeight: 700, letterSpacing: "0.16em",
                textTransform: "uppercase", color: "rgba(255,255,255,0.85)",
                textAlign: i === 0 ? "left" : "center",
              }}>
                {h}
              </div>
            ))}
          </div>

          {/* table rows */}
          {[
            { item: "Engineering Resources", client: true, aurowinx: true },
            { item: "Project Management", client: false, aurowinx: true },
            { item: "Tools & Server", client: true, aurowinx: true },
            { item: "Flows & Scripts", client: true, aurowinx: true },
            { item: "Risk Management", client: false, aurowinx: true },
            { item: "Infrastructure Setup", client: false, aurowinx: true },
          ].map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              style={{
                display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr",
                padding: "14px 28px",
                borderBottom: i < 5 ? "1px solid #e0e7ff" : "none",
                background: i % 2 === 0 ? "white" : "#f8fafc",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 13.5, fontWeight: 600, color: C.textPrimary }}>
                {row.item}
              </span>
              {[row.client, row.aurowinx].map((val, vi) => (
                <div key={vi} style={{ textAlign: "center" }}>
                  {val ? (
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%",
                      background: vi === 0 ? "rgba(79,70,229,0.1)" : "rgba(8,145,178,0.1)",
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                        stroke={vi === 0 ? "#4f46e5" : "#0891b2"}
                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  ) : (
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%",
                      background: "rgba(148,163,184,0.1)",
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                        stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          ))}
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .business-model-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}