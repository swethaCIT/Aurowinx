import { motion } from "framer-motion";
import { C, FONT, fadeUp, fadeLeft, fadeRight, EASE } from "././theme";

const reasons = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Outcome-Driven Partnerships",
    description:
      "We go beyond resource provisioning. Our expert teams take ownership to deliver measurable results that accelerate your silicon roadmap and enhance product quality.",
    stat: "100%",
    statLabel: "Delivery Accountability",
    color: "#4f46e5",
    bg: "rgba(79,70,229,0.06)",
    border: "rgba(79,70,229,0.14)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Tool-Agnostic & Flow-Ready",
    description:
      "Deep expertise across Synopsys, Cadence, and Siemens EDA tools with seamless integration into your existing ASIC/SoC flows — no ramp-up friction.",
    stat: "3+",
    statLabel: "EDA Tool Ecosystems",
    color: "#0891b2",
    bg: "rgba(8,145,178,0.06)",
    border: "rgba(8,145,178,0.14)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
      </svg>
    ),
    title: "Flexible Global Delivery",
    description:
      "Onsite, offshore, or hybrid teams tailored to your time zones, budgets, and project priorities — ensuring cost-efficiency without compromising accountability.",
    stat: "3x",
    statLabel: "Delivery Models",
    color: "#2563eb",
    bg: "rgba(37,99,235,0.06)",
    border: "rgba(37,99,235,0.14)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
    title: "Milestone-Based Execution",
    description:
      "Structured delivery with clearly defined phases, proactive reporting, and tight alignment with your engineering milestones — zero ambiguity at every stage.",
    stat: "0",
    statLabel: "Missed Milestones",
    color: "#0284c7",
    bg: "rgba(2,132,199,0.06)",
    border: "rgba(2,132,199,0.14)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Proven Track Record",
    description:
      "Trusted by leading semiconductor companies for delivering high-performance designs across 7nm, 5nm, and below — with first silicon success across domains.",
    stat: "9+",
    statLabel: "Tech Nodes Delivered",
    color: "#4f46e5",
    bg: "rgba(79,70,229,0.06)",
    border: "rgba(79,70,229,0.14)",
  },
];

const floatingOrbs = [
  { top: "15%", left: "5%", size: 180, color: "rgba(79,70,229,0.04)" },
  { bottom: "10%", right: "4%", size: 220, color: "rgba(8,145,178,0.04)" },
];

export default function WhyPartnerWithUs() {
  return (
    <section
      style={{
        background: "#f8fafc",
        fontFamily: FONT,
        position: "relative",
        overflow: "hidden",
        padding: "100px 0 110px",
      }}
    >
      {/* ── BG ORBS ── */}
      {floatingOrbs.map((orb, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: orb.top,
            bottom: orb.bottom,
            left: orb.left,
            right: orb.right,
            width: orb.size,
            height: orb.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
      ))}

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
            Why Partner With Us
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
          Built For{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #4f46e5 0%, #0891b2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Silicon Success
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
            margin: "0 auto 80px",
            lineHeight: 1.75,
          }}
        >
          Five reasons why leading semiconductor companies trust Aurowinx to
          deliver, every time.
        </motion.p>

        {/* ── LAYOUT: LARGE FEATURE LEFT + GRID RIGHT ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 28,
            alignItems: "start",
          }}
          className="why-partner-grid"
        >
          {/* ── LEFT: FEATURED CARD (first item) ── */}
          <motion.div
            {...fadeLeft}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            style={{
              borderRadius: 24,
              padding: "48px 40px",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 16px 48px rgba(79,70,229,0.18), 0 4px 12px rgba(0,0,0,0.06)",
              height: "100%",
              minHeight: 380,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              cursor: "default",
              /* ── IMAGE BACKGROUND ── */
              backgroundImage: `url("https://images.pexels.com/photos/6755065/pexels-photo-6755065.jpeg?auto=compress&cs=tinysrgb&w=800")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* full-card dark gradient overlay so text stays readable */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(145deg, rgba(79,70,229,0.82) 0%, rgba(8,145,178,0.72) 100%)",
              borderRadius: 24,
              pointerEvents: "none",
            }} />

            {/* glow blob top-right */}
            <div style={{
              position: "absolute", top: -60, right: -60,
              width: 260, height: 260, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 65%)",
              pointerEvents: "none",
            }} />

            {/* glow blob bottom-left */}
            <div style={{
              position: "absolute", bottom: -40, left: -40,
              width: 200, height: 200, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 65%)",
              pointerEvents: "none",
            }} />

            {/* floating circuit dots on card */}
            {[...Array(4)].map((_, di) => (
              <motion.div
                key={di}
                style={{
                  position: "absolute",
                  width: di % 2 === 0 ? 5 : 3,
                  height: di % 2 === 0 ? 5 : 3,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.4)",
                  top: `${20 + di * 18}%`,
                  right: `${10 + di * 6}%`,
                  pointerEvents: "none",
                }}
                animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.4, 1] }}
                transition={{ duration: 2 + di * 0.5, repeat: Infinity, ease: "easeInOut", delay: di * 0.4 }}
              />
            ))}

            {/* icon */}
            <div style={{
              position: "absolute", top: 36, left: 40,
              width: 52, height: 52, borderRadius: 14,
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center",
              justifyContent: "center", color: "white",
              backdropFilter: "blur(8px)",
              zIndex: 1,
            }}>
              {reasons[0].icon}
            </div>

            {/* all content needs zIndex: 1 to sit above the overlay */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{
                fontSize: "clamp(3rem, 6vw, 4.5rem)",
                fontWeight: 900,
                color: "white",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                marginBottom: 8,
                opacity: 0.95,
              }}>
                {reasons[0].stat}
              </div>
              <div style={{
                fontSize: 11, fontWeight: 700,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.65)", marginBottom: 20,
              }}>
                {reasons[0].statLabel}
              </div>
              <h3 style={{
                fontSize: 22, fontWeight: 700,
                color: "white", marginBottom: 14,
                letterSpacing: "-0.025em", lineHeight: 1.25,
              }}>
                {reasons[0].title}
              </h3>
              <p style={{
                fontSize: 14.5, color: "rgba(255,255,255,0.8)",
                lineHeight: 1.75, margin: 0,
              }}>
                {reasons[0].description}
              </p>
            </div>
          </motion.div>

          {/* ── RIGHT: 2x2 GRID (remaining 4 items) ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {reasons.slice(1).map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: EASE }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                style={{
                  background: "white",
                  borderRadius: 18,
                  padding: "28px 24px",
                  border: `1px solid ${item.border}`,
                  boxShadow: "0 2px 12px rgba(15,23,42,0.05)",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "default",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* top accent */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: `linear-gradient(90deg, ${item.color}, transparent)`,
                  borderRadius: "18px 18px 0 0",
                  opacity: 0.6,
                }} />

                {/* icon */}
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: item.bg, border: `1px solid ${item.border}`,
                  display: "flex", alignItems: "center",
                  justifyContent: "center", color: item.color, marginBottom: 14,
                }}>
                  {item.icon}
                </div>

                {/* stat */}
                <div style={{
                  fontSize: "clamp(1.6rem, 2.5vw, 2rem)",
                  fontWeight: 900, color: item.color,
                  lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 4,
                }}>
                  {item.stat}
                </div>
                <div style={{
                  fontSize: 9, fontWeight: 700,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  color: C.textMuted, marginBottom: 14,
                }}>
                  {item.statLabel}
                </div>

                {/* title */}
                <h3 style={{
                  fontSize: 14, fontWeight: 700, color: C.textPrimary,
                  marginBottom: 8, letterSpacing: "-0.015em", lineHeight: 1.3,
                }}>
                  {item.title}
                </h3>

                {/* description */}
                <p style={{
                  fontSize: 12.5, color: C.textSecondary,
                  lineHeight: 1.7, margin: 0,
                }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM QUOTE STRIP ── */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
          style={{
            marginTop: 64,
            borderRadius: 18,
            background: "white",
            border: "1px solid #e0e7ff",
            padding: "36px 48px",
            display: "flex",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
            boxShadow: "0 2px 16px rgba(79,70,229,0.06)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* accent left border */}
          <div style={{
            position: "absolute", top: 0, left: 0, bottom: 0, width: 4,
            background: "linear-gradient(180deg, #4f46e5, #0891b2)",
            borderRadius: "18px 0 0 18px",
          }} />

          <div style={{
            width: 48, height: 48, borderRadius: 12, flexShrink: 0,
            background: "linear-gradient(135deg, #4f46e5, #0891b2)",
            display: "flex", alignItems: "center",
            justifyContent: "center", color: "white",
            boxShadow: "0 6px 20px rgba(79,70,229,0.2)",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          </div>

          <p style={{
            fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)",
            fontWeight: 600,
            color: C.textPrimary,
            lineHeight: 1.65,
            margin: 0,
            flex: 1,
            letterSpacing: "-0.01em",
          }}>
            "We don't just provide engineers — we take end-to-end ownership of your
            silicon success, from the first specification to the final GDSII tape-out."
          </p>

          <div style={{
            fontSize: 12, color: C.textMuted,
            fontWeight: 600, letterSpacing: "0.08em",
            textTransform: "uppercase", flexShrink: 0,
          }}>
            Aurowinx Engineering
          </div>
        </motion.div>
      </div>

      {/* ── RESPONSIVE STYLES ── */}
      <style>{`
        @media (max-width: 768px) {
          .why-partner-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .why-partner-grid > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}