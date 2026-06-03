// WhoWeAre.jsx — Physical Design Page
// AurowinX — Physical Design Team & About
// Light & professional, indigo accent, tight spacing

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Award, Briefcase, CheckCircle2, ChevronRight } from "lucide-react";
import { C, FONT, EASE } from "./theme";

const TEAM_ROLES = [
  {
    title: "Principal Physical Design Manager",
    exp: "15+ years of experience",
    color: "#4f46e5",
    bg: "#eef2ff",
    icon: <Award style={{ width: 20, height: 20 }} />,
    points: [
      "Leads full RTL-to-GDSII physical design flow for complex SoC designs",
      "Defines floorplan strategy, power grid architecture and timing budgets",
      "Oversees multi-corner multi-mode STA and sign-off closure",
      "Drives DRC/LVS clean sign-off across advanced process nodes",
      "Collaborates with front-end and DFT teams for seamless integration",
      "Manages tape-out readiness and foundry interface coordination",
    ],
  },
  {
    title: "Execution PD Manager",
    exp: "10+ years of experience",
    color: "#7c3aed",
    bg: "#f5f3ff",
    icon: <Briefcase style={{ width: 20, height: 20 }} />,
    points: [
      "Responsible for day-to-day physical design execution and block ownership",
      "Ensures on-time delivery of placement, routing and ECO closure",
      "Resource planning and continuous flow refinement",
      "Coordinates with verification and timing teams for convergence",
    ],
  },
  {
    title: "Engineering Team",
    exp: "5+ skilled PD specialists",
    color: "#0891b2",
    bg: "#ecfeff",
    icon: <Users style={{ width: 20, height: 20 }} />,
    points: [
      "Execute floorplanning, placement, CTS and detailed routing",
      "Run SI/PI analysis, IR-drop optimization and ECO implementation",
      "Perform DRC/LVS physical verification and extraction",
      "Support GDSII generation and tape-out deliverables",
    ],
  },
];

const ABOUT_POINTS = [
  "Specialized in full RTL-to-GDSII physical design implementation",
  "Embedded on-site engineering & in-house project execution",
  "Expertise across TSMC, Samsung, GlobalFoundries, UMC nodes",
  "Proven flat and hierarchical PNR flows down to 5nm",
];

const DOMAIN_STATS = [
  { val: "5nm+",  label: "Advanced Nodes", color: "#4f46e5" },
  { val: "15+",   label: "Years Active",   color: "#7c3aed" },
  { val: "150+",  label: "Tape-outs Done", color: "#0891b2" },
];

function RoleCard({ role, i, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
      whileHover={{ y: -5, boxShadow: `0 16px 40px ${role.color}16` }}
      style={{
        background: "#fff", borderRadius: 18, padding: "22px 20px",
        border: `1px solid ${C.borderLight}`, boxShadow: C.shadowMd,
        position: "relative", overflow: "hidden", cursor: "default",
        transition: "box-shadow 0.25s",
      }}
    >
      {/* Top color bar */}
      <motion.div
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: EASE }}
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${role.color}, ${role.color}55)`,
          transformOrigin: "left",
        }}
      />

      {/* Icon + title */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          background: role.bg, color: role.color,
          border: `1px solid ${role.color}25`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {role.icon}
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: 800, fontSize: 14, color: C.textPrimary, fontFamily: FONT, letterSpacing: "-0.02em" }}>
            {role.title}
          </p>
          <span style={{
            display: "inline-block", marginTop: 4,
            padding: "2px 10px", borderRadius: 50,
            background: role.bg, color: role.color,
            fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            border: `1px solid ${role.color}20`,
          }}>
            {role.exp}
          </span>
        </div>
      </div>

      {/* Points */}
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {role.points.map((pt, j) => (
          <motion.div
            key={pt}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.35, delay: 0.25 + i * 0.1 + j * 0.05, ease: EASE }}
            style={{ display: "flex", alignItems: "flex-start", gap: 8 }}
          >
            <ChevronRight style={{ width: 13, height: 13, color: role.color, flexShrink: 0, marginTop: 2 }} />
            <span style={{ fontSize: 12.5, color: C.textSecondary, lineHeight: 1.65 }}>{pt}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function WhoWeAre() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      style={{
        background: "#fff",
        padding: "64px 48px 56px",
        position: "relative", overflow: "hidden", fontFamily: FONT,
      }}
    >
      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(79,70,229,0.05) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Top intro — 2 col */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 44, alignItems: "center" }}>

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
              <span style={{ color: C.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Who We Are</span>
            </div>
            <h2 style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900,
              color: C.textPrimary, margin: "0 0 14px",
              letterSpacing: "-0.04em", fontFamily: FONT, lineHeight: 1.05,
            }}>
              Your Dedicated<br />
              <span style={{
                background: C.gradPrimary,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Physical Design Partner
              </span>
            </h2>
            <p style={{ color: C.textSecondary, fontSize: 14, lineHeight: 1.8, margin: "0 0 20px", maxWidth: 420 }}>
              A highly specialized consultancy in Physical Design implementation, offering comprehensive RTL-to-GDSII solutions through both embedded on-site engineering resources and full-spectrum in-house project execution.
            </p>
            <motion.a
              href="/contact" whileHover={{ x: 4 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                color: C.primary, fontWeight: 700, fontSize: 13, textDecoration: "none",
              }}
            >
              Work with us <ChevronRight style={{ width: 15, height: 15 }} />
            </motion.a>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            {/* About points */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {ABOUT_POINTS.map((pt, i) => (
                <motion.div
                  key={pt}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.07, ease: EASE }}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 10,
                    padding: "10px 14px", borderRadius: 10,
                    background: C.bgAccent, border: `1px solid ${C.borderLight}`,
                    boxShadow: C.shadowSm,
                  }}
                >
                  <CheckCircle2 style={{ width: 15, height: 15, color: "#22c55e", flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 13, color: C.textPrimary, fontWeight: 600, lineHeight: 1.5 }}>{pt}</span>
                </motion.div>
              ))}
            </div>

            {/* Mini stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {DOMAIN_STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, ease: EASE }}
                  style={{
                    padding: "14px 12px", borderRadius: 12, textAlign: "center",
                    background: "#fff", border: `1px solid ${C.borderLight}`,
                    boxShadow: C.shadowSm,
                  }}
                >
                  <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: 900, color: s.color, letterSpacing: "-0.04em", fontFamily: FONT }}>{s.val}</p>
                  <p style={{ margin: "3px 0 0", fontSize: 11, color: C.textMuted, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          style={{
            height: 1, background: `linear-gradient(90deg, transparent, ${C.border}, transparent)`,
            marginBottom: 36, transformOrigin: "left",
          }}
        />

        {/* Team label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.35, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 28 }}
        >
          <h3 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 900, color: C.textPrimary, margin: 0, letterSpacing: "-0.03em", fontFamily: FONT }}>
            Our Team Structure
          </h3>
          <p style={{ color: C.textSecondary, fontSize: 13, margin: "6px 0 0" }}>
            Three-tier leadership ensuring physical design quality at every stage.
          </p>
        </motion.div>

        {/* Role cards — 3 cols */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {TEAM_ROLES.map((role, i) => (
            <RoleCard key={role.title} role={role} i={i} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  );
}