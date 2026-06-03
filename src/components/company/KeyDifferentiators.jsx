import { motion } from "framer-motion";
import { C, FONT, fadeUp, EASE } from "././theme";

const differentiators = [
  {
    number: "01",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "Deep Technical Expertise",
    description:
      "Engineers with 8–20 years of hands-on experience in complex SoC and ASIC projects, covering the full silicon lifecycle from RTL to GDSII.",
    highlight: "8–20 Yrs Experience",
    color: "#4f46e5",
    bg: "rgba(79,70,229,0.06)",
    border: "rgba(79,70,229,0.12)",
  },
  {
    number: "02",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    title: "Domain-Focused Engineering",
    description:
      "Specialists in functional verification, physical design, and DFT with domain knowledge across AI, 5G, automotive, networking, and consumer electronics.",
    highlight: "AI · 5G · Automotive",
    color: "#0891b2",
    bg: "rgba(8,145,178,0.06)",
    border: "rgba(8,145,178,0.12)",
  },
  {
    number: "03",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Proven Silicon Success",
    description:
      "Delivered multiple successful tapeouts at 7nm, 5nm, and advanced FinFET nodes. Achieved target test coverage and faster timing closure for Tier 1 clients.",
    highlight: "7nm · 5nm · 3nm",
    color: "#2563eb",
    bg: "rgba(37,99,235,0.06)",
    border: "rgba(37,99,235,0.12)",
  },
  {
    number: "04",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: "Scalable & Reliable Delivery",
    description:
      "Flexible team ramp-up and engagement models aligned with evolving project needs. Milestone-based tracking with clear deliverables and proactive reporting.",
    highlight: "Milestone-Based",
    color: "#0284c7",
    bg: "rgba(2,132,199,0.06)",
    border: "rgba(2,132,199,0.12)",
  },
  {
    number: "05",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Accelerated Time-to-Tapeout",
    description:
      "IP reuse strategies, pre-built verification environments, and tool automation to reduce cycle times and accelerate your silicon roadmap.",
    highlight: "IP Reuse · Automation",
    color: "#0891b2",
    bg: "rgba(8,145,178,0.06)",
    border: "rgba(8,145,178,0.12)",
  },
  {
    number: "06",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9h6M9 12h6M9 15h4" />
      </svg>
    ),
    title: "Structured Quality Governance",
    description:
      "Embedded verification governance with predefined quality gates, active surveillance, and early deviation detection — reducing rework and integration risk.",
    highlight: "Quality By Design",
    color: "#4f46e5",
    bg: "rgba(79,70,229,0.06)",
    border: "rgba(79,70,229,0.12)",
  },
];

export default function KeyDifferentiators() {
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
      {/* ── SUBTLE GRID BG ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.022,
          backgroundImage:
            "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      {/* ── BG GLOW TOP RIGHT ── */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(79,70,229,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      {/* ── BG GLOW BOTTOM LEFT ── */}
      <div
        style={{
          position: "absolute",
          bottom: -100,
          left: -80,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(8,145,178,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── LABEL ── */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 16 }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "6px 20px",
              borderRadius: 9999,
              border: "1px solid #c7d2fe",
              background: "#eef2ff",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: C.primary,
            }}
          >
            What Sets Us Apart
          </span>
        </motion.div>

        {/* ── HEADING ── */}
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{
            textAlign: "center",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            color: C.textPrimary,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Key{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, #4f46e5 0%, #0891b2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Differentiators
          </span>
        </motion.h2>

        {/* ── SUBTEXT ── */}
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
          style={{
            textAlign: "center",
            fontSize: 16,
            color: C.textSecondary,
            maxWidth: 580,
            margin: "0 auto 72px",
            lineHeight: 1.75,
          }}
        >
          What makes Aurowinx the right engineering partner — from first engagement
          to final tapeout.
        </motion.p>

        {/* ── CARDS GRID ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 24,
          }}
        >
          {differentiators.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.09, ease: EASE }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              style={{
                background: "#ffffff",
                borderRadius: 18,
                padding: "32px 30px",
                border: `1px solid`,
                borderColor: item.border,
                boxShadow:
                  "0 2px 12px rgba(15,23,42,0.05), 0 1px 3px rgba(15,23,42,0.04)",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              {/* number watermark */}
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  right: 20,
                  fontSize: 48,
                  fontWeight: 900,
                  color: item.color,
                  opacity: 0.06,
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  fontVariantNumeric: "tabular-nums",
                  userSelect: "none",
                }}
              >
                {item.number}
              </div>

              {/* icon + highlight row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                {/* icon box */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: item.bg,
                    border: `1px solid ${item.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: item.color,
                  }}
                >
                  {item.icon}
                </div>

                {/* highlight pill */}
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: item.color,
                    background: item.bg,
                    border: `1px solid ${item.border}`,
                    borderRadius: 9999,
                    padding: "4px 12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.highlight}
                </span>
              </div>

              {/* title */}
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: C.textPrimary,
                  marginBottom: 10,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.3,
                }}
              >
                {item.title}
              </h3>

              {/* description */}
              <p
                style={{
                  fontSize: 14,
                  color: C.textSecondary,
                  lineHeight: 1.78,
                  margin: 0,
                }}
              >
                {item.description}
              </p>

              {/* left accent bar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: 3,
                  background: `linear-gradient(180deg, ${item.color}, transparent)`,
                  borderRadius: "18px 0 0 18px",
                  opacity: 0.5,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* ── BOTTOM TRUST BAR ── */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          style={{
            marginTop: 64,
            borderRadius: 18,
            background: "#f8fafc",
            border: "1px solid #e0e7ff",
            padding: "32px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "End-to-End Ownership", sub: "Architecture to GDSII Tape-out" },
            { label: "Quality by Design", sub: "Built-in at every stage" },
            { label: "Silicon Proven", sub: "Designs across multiple nodes" },
            { label: "On-Time Delivery", sub: "With risk mitigation" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                padding: "8px 16px",
                borderRight:
                  i < 3 ? "1px solid #e0e7ff" : "none",
                minWidth: 160,
                flex: 1,
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: C.textPrimary,
                  marginBottom: 4,
                  letterSpacing: "-0.01em",
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: C.textMuted,
                  letterSpacing: "0.02em",
                }}
              >
                {item.sub}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}