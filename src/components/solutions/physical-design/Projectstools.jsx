// ProjectsTools.jsx — Physical Design Page
// Redesigned: Timeline projects + accordion tool matrix
// Typography: Clash Display / Sora / DM Sans (from theme.js)
// Tokens: exact C.* values from theme.js

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Cpu, Layers, Zap, GitBranch, Radio, Shield,
  ArrowUpRight, CheckCircle2,
} from "lucide-react";
import { C, FONT, EASE } from "./theme";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const PROJ_CATS = ["All", "ASIC", "SoC", "Low Power", "Automotive", "FPGA"];

const PROJECTS = [
  {
    title: "Multi-Core SoC PNR",
    cat: "SoC",
    color: "#4f46e5",
    tag: "Full Chip",
    icon: <Layers size={13} />,
    node: "7nm TSMC",
    desc: "Complete RTL-to-GDSII for a 6-core SoC — hierarchical PNR, CTS, SI/PI sign-off across 14 power domains.",
  },
  {
    title: "ARM Cortex-A55 PNR",
    cat: "ASIC",
    color: "#7c3aed",
    tag: "Processor",
    icon: <Cpu size={13} />,
    node: "12nm GF",
    desc: "Placement, CTS and detailed routing with timing closure for ARM Cortex-A55 cluster.",
  },
  {
    title: "DDR5 Controller Layout",
    cat: "ASIC",
    color: "#0891b2",
    tag: "Memory",
    icon: <GitBranch size={13} />,
    node: "16nm TSMC",
    desc: "Flat PNR with IR-drop and EM sign-off for DDR5 memory controller.",
  },
  {
    title: "Automotive SoC Sign-Off",
    cat: "Automotive",
    color: "#059669",
    tag: "AEC-Q100",
    icon: <Shield size={13} />,
    node: "28nm UMC",
    desc: "Full sign-off STA, DRC/LVS, IR-drop and EM for AEC-Q100 Grade 2 automotive SoC.",
  },
  {
    title: "IoT Low Power Design",
    cat: "Low Power",
    color: "#d97706",
    tag: "ULP",
    icon: <Zap size={13} />,
    node: "22nm FDX",
    desc: "Multi-voltage domain PNR with power gating and retention flops for ultra-low-power IoT chip.",
  },
  {
    title: "PCIe Gen5 PHY Layout",
    cat: "ASIC",
    color: "#dc2626",
    tag: "Protocol",
    icon: <Radio size={13} />,
    node: "5nm TSMC",
    desc: "Custom analog-mixed signal layout and PNR for PCIe Gen5 PHY.",
  },
];

const TOOL_GROUPS = [
  {
    label: "Place & Route",
    color: "#4f46e5",
    bg: "#eef2ff",
    tools: ["Cadence Innovus", "Synopsys ICC2", "Mentor Olympus"],
  },
  {
    label: "Synthesis",
    color: "#7c3aed",
    bg: "#f5f3ff",
    tools: ["Synopsys DC", "Cadence Genus", "Mentor Precision"],
  },
  {
    label: "Static Timing",
    color: "#0891b2",
    bg: "#ecfeff",
    tools: ["Synopsys PrimeTime", "Cadence Tempus", "Ansys PathFinder"],
  },
  {
    label: "Physical Verification",
    color: "#059669",
    bg: "#ecfdf5",
    tools: ["Mentor Calibre", "Synopsys IC Validator", "Cadence PVS"],
  },
  {
    label: "Power Integrity",
    color: "#d97706",
    bg: "#fffbeb",
    tools: ["Ansys RedHawk", "Cadence Voltus", "Synopsys PrimeRail"],
  },
  {
    label: "Extraction",
    color: "#dc2626",
    bg: "#fef2f2",
    tools: ["Mentor xACT", "Synopsys StarRC", "Cadence QRC"],
  },
];

const CAPABILITIES = [
  "Flat PNR", "Hierarchical PNR", "Multi-Patterning",
  "Flip Chip", "Wire Bond", "Low Power",
  "FinFET / GAA", "2.5D / 3D Integration", "MCMM STA", "SI/PI Analysis",
];

const STATS = [
  { val: "18+", label: "EDA Tools" },
  { val: "6",   label: "Categories" },
  { val: "5nm+",label: "Advanced Nodes" },
  { val: "10+",  label: "Tapeouts" },
];

/* ─────────────────────────────────────────
   SHARED STYLES (inline token constants)
───────────────────────────────────────── */
const DISPLAY_FONT = "'Clash Display', 'Sora', 'DM Sans', system-ui, sans-serif";
const BODY_FONT    = "'Sora', 'DM Sans', system-ui, sans-serif";
const UI_FONT      = "'DM Sans', system-ui, sans-serif";

/* ─────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────── */

/** Section eyebrow label */
function Eyebrow({ text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
      <div style={{
        height: 1, width: 26,
        background: `linear-gradient(90deg, transparent, ${C.primary})`,
      }} />
      <span style={{
        fontFamily: UI_FONT, fontSize: 10, fontWeight: 600,
        letterSpacing: "0.22em", textTransform: "uppercase", color: C.primary,
      }}>
        {text}
      </span>
    </div>
  );
}

/** Gradient display heading */
function DisplayTitle({ children }) {
  return (
    <h2 style={{
      fontFamily: DISPLAY_FONT,
      fontSize: "clamp(1.9rem, 4vw, 2.9rem)",
      fontWeight: 700,
      letterSpacing: "-0.04em",
      lineHeight: 1.06,
      color: C.textPrimary,
      margin: "0 0 8px",
    }}>
      {children}
    </h2>
  );
}

/** Gradient text span — wraps any word you want highlighted */
function GradText({ children }) {
  return (
    <span style={{
      background: C.gradPrimary,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}>
      {children}
    </span>
  );
}

/* ── PROJECT ROW (timeline) ── */
function ProjectRow({ project, i, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "64px 1fr",
        cursor: "pointer",
        color: project.color,
      }}
    >
      {/* Left — dot + node label */}
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", paddingTop: 28, gap: 6,
      }}>
        <motion.div
          animate={{
            scale: hovered ? 1.55 : 1,
            boxShadow: hovered
              ? `0 0 0 5px ${project.color}22`
              : "0 0 0 0px transparent",
          }}
          transition={{ duration: 0.25, ease: EASE }}
          style={{
            width: 11, height: 11, borderRadius: "50%",
            border: `2px solid ${project.color}`,
            background: C.bgWhite,
            position: "relative", zIndex: 2,
          }}
        />
        <span style={{
          fontFamily: UI_FONT, fontSize: 8.5, fontWeight: 600,
          letterSpacing: "0.06em", color: C.textMuted, textAlign: "center",
          lineHeight: 1.3,
        }}>
          {project.node}
        </span>
      </div>

      {/* Right — content */}
      <div style={{
        borderTop: `1px solid ${hovered ? project.color + "55" : C.borderLight}`,
        padding: "24px 0 24px 20px",
        transition: "border-color 0.25s",
        background: hovered
          ? `linear-gradient(90deg, ${project.color}06, transparent)`
          : "transparent",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", gap: 12,
        }}>
          {/* Main copy */}
          <div>
            {/* Category badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              fontFamily: UI_FONT, fontSize: 9, fontWeight: 700,
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: project.color, marginBottom: 9,
            }}>
              <span style={{
                display: "block", width: 5, height: 5,
                borderRadius: "50%", background: project.color,
              }} />
              {project.cat}
            </div>

            {/* Title */}
            <p style={{
              fontFamily: DISPLAY_FONT,
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              fontWeight: 600, letterSpacing: "-0.03em",
              color: hovered ? project.color : C.textPrimary,
              margin: "0 0 6px", lineHeight: 1.2,
              transition: "color 0.2s",
            }}>
              {project.title}
            </p>

            {/* Description */}
            <p style={{
              fontFamily: BODY_FONT, fontSize: 12, fontWeight: 300,
              color: C.textSecondary, lineHeight: 1.75,
              margin: 0, maxWidth: 340,
            }}>
              {project.desc}
            </p>
          </div>

          {/* Meta aside */}
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "flex-end", gap: 8, flexShrink: 0, paddingTop: 2,
          }}>
            {/* Node chip */}
            <motion.span
              animate={{
                background: hovered ? project.color : C.bgAccent,
                color: hovered ? "#fff" : C.primary,
                borderColor: hovered ? "transparent" : C.borderLight,
              }}
              transition={{ duration: 0.2 }}
              style={{
                fontFamily: UI_FONT, fontSize: 10, fontWeight: 500,
                padding: "3px 10px", borderRadius: 4,
                border: `1px solid ${C.borderLight}`,
                display: "inline-block",
              }}
            >
              {project.node}
            </motion.span>

            {/* Tag */}
            <div style={{
              display: "flex", alignItems: "center", gap: 5,
              fontFamily: UI_FONT, fontSize: 9.5, fontWeight: 600,
              color: C.textMuted, letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}>
              {project.icon}
              {project.tag}
            </div>

            {/* View link */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: "flex", alignItems: "center", gap: 4,
                    color: project.color,
                    fontFamily: UI_FONT, fontSize: 9.5, fontWeight: 700,
                    letterSpacing: "0.08em", textTransform: "uppercase",
                  }}
                >
                  View Project <ArrowUpRight size={11} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── TOOL ROW ── */
function ToolRow({ group, i, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -14 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.15 + i * 0.06, ease: EASE }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "180px 1fr",
        alignItems: "stretch",
        borderBottom: `1px solid ${C.borderLight}`,
        background: hovered ? `${group.bg}` : C.bgWhite,
        transition: "background 0.2s",
      }}
    >
      {/* Label col */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "14px 18px",
        borderRight: `1px solid ${C.borderLight}`,
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: group.color, flexShrink: 0,
        }} />
        <span style={{
          fontFamily: DISPLAY_FONT, fontSize: 11.5, fontWeight: 600,
          letterSpacing: "-0.01em", color: C.textPrimary,
        }}>
          {group.label}
        </span>
      </div>

      {/* Tools col */}
      <div style={{
        display: "flex", alignItems: "center", flexWrap: "wrap",
        gap: 0, padding: "14px 18px",
      }}>
        {group.tools.map((tool, j) => (
          <motion.span
            key={tool}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 + i * 0.06 + j * 0.05 }}
            style={{
              fontFamily: BODY_FONT, fontSize: 12, fontWeight: 500,
              color: hovered ? C.textPrimary : C.textSecondary,
              paddingRight: j < group.tools.length - 1 ? 14 : 0,
              marginRight: j < group.tools.length - 1 ? 14 : 0,
              borderRight: j < group.tools.length - 1
                ? `1px solid ${C.borderLight}`
                : "none",
              transition: "color 0.2s",
            }}
          >
            {tool}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

/* ── STAT BOX ── */
function StatBox({ val, label, i, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.1 + i * 0.07, ease: EASE }}
      style={{
        flex: 1, padding: "20px 22px",
        borderRight: i < STATS.length - 1 ? `1px solid ${C.borderLight}` : "none",
        background: C.bgWhite,
      }}
    >
      <p style={{
        fontFamily: DISPLAY_FONT, fontSize: "2rem", fontWeight: 700,
        letterSpacing: "-0.05em", lineHeight: 1, margin: "0 0 5px",
        background: C.gradPrimary,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}>
        {val}
      </p>
      <p style={{
        fontFamily: UI_FONT, fontSize: 10, fontWeight: 600,
        letterSpacing: "0.14em", textTransform: "uppercase",
        color: C.textMuted, margin: 0,
      }}>
        {label}
      </p>
    </motion.div>
  );
}

/* ── CAPABILITY MARQUEE ── */
function CapMarquee({ inView }) {
  // Duplicate for seamless loop
  const doubled = [...CAPABILITIES, ...CAPABILITIES];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.6 }}
      style={{
        overflow: "hidden", position: "relative",
        marginTop: 20,
      }}
    >
      {/* fade edges */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 48,
        background: `linear-gradient(90deg, ${C.bgWhite}, transparent)`,
        zIndex: 2, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 48,
        background: `linear-gradient(270deg, ${C.bgWhite}, transparent)`,
        zIndex: 2, pointerEvents: "none",
      }} />

      <div style={{
        display: "flex", width: "max-content",
        animation: "marquee 22s linear infinite",
      }}>
        {doubled.map((cap, i) => (
          <div
            key={i}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "8px 20px",
              borderRight: `1px solid ${C.borderLight}`,
              whiteSpace: "nowrap",
              fontFamily: BODY_FONT, fontSize: 12, fontWeight: 500,
              color: C.textSecondary,
            }}
          >
            <CheckCircle2
              size={12}
              style={{ color: C.primary, flexShrink: 0 }}
            />
            {cap}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────── */
export default function ProjectsTools() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === active);

  return (
    <section
      ref={ref}
      style={{
        background: C.bgWhite,
        position: "relative",
        overflow: "hidden",
        fontFamily: BODY_FONT,
      }}
    >
      {/* ── Background dot grid ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `radial-gradient(circle, rgba(79,70,229,0.055) 1px, transparent 1px)`,
        backgroundSize: "26px 26px",
      }} />

      {/* ── Ambient orbs ── */}
      <div style={{
        position: "absolute", width: 520, height: 300,
        top: "-40px", right: "-60px",
        background: "radial-gradient(ellipse, rgba(79,70,229,0.07) 0%, transparent 70%)",
        filter: "blur(70px)", pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "absolute", width: 380, height: 240,
        bottom: "5%", left: "-80px",
        background: "radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)",
        filter: "blur(70px)", pointerEvents: "none", zIndex: 0,
      }} />

      {/* ════════════════════════════════
          PROJECTS
      ════════════════════════════════ */}
      <div style={{
        position: "relative", zIndex: 1,
        padding: "56px 44px 0",
        maxWidth: 1280, margin: "0 auto",
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ marginBottom: 24 }}
        >
          <Eyebrow text="Our Projects" />
          <DisplayTitle>
            What We've <GradText>Taped Out</GradText>
          </DisplayTitle>
          <p style={{
            fontFamily: BODY_FONT, fontSize: 13, fontWeight: 400,
            color: C.textSecondary, lineHeight: 1.75,
            margin: 0, maxWidth: 420,
          }}>
            Physical design deliverables across advanced nodes and foundries.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
          style={{
            display: "flex", gap: 6, flexWrap: "wrap",
            marginBottom: 0,
            paddingBottom: 20,
            borderBottom: `1px solid ${C.borderLight}`,
          }}
        >
          {PROJ_CATS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                fontFamily: UI_FONT, fontSize: 10.5, fontWeight: 600,
                letterSpacing: "0.07em", textTransform: "uppercase",
                padding: "5px 15px", borderRadius: 50,
                border: active === cat
                  ? `1.5px solid ${C.primary}`
                  : `1.5px solid ${C.borderLight}`,
                background: active === cat ? C.primary : "none",
                color: active === cat ? "#fff" : C.textSecondary,
                cursor: "pointer",
                boxShadow: active === cat
                  ? "0 4px 14px rgba(79,70,229,0.28)"
                  : "none",
                transition: "all 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Spine */}
          <div style={{
            position: "absolute", left: 0, top: 0, bottom: 0,
            width: 1,
            background: `linear-gradient(to bottom, ${C.primary}, ${C.secondary}, transparent)`,
            opacity: 0.15, pointerEvents: "none",
          }} />

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {filtered.map((p, i) => (
                <ProjectRow key={p.title} project={p} i={i} inView={inView} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ════════════════════════════════
          DIVIDER
      ════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.35 }}
        style={{
          display: "flex", alignItems: "center", gap: 18,
          margin: "44px 44px 0",
          position: "relative", zIndex: 1,
        }}
      >
        <div style={{
          flex: 1, height: 1,
          background: `linear-gradient(90deg, transparent, ${C.border}, transparent)`,
        }} />
        <span style={{
          fontFamily: UI_FONT, fontSize: 9, fontWeight: 700,
          letterSpacing: "0.15em", textTransform: "uppercase",
          padding: "5px 14px", borderRadius: 50,
          border: `1px solid ${C.border}`,
          color: C.textSecondary, background: C.bgWhite, whiteSpace: "nowrap",
        }}>
          Tool Ecosystem
        </span>
        <div style={{
          flex: 1, height: 1,
          background: `linear-gradient(90deg, ${C.border}, transparent)`,
        }} />
      </motion.div>

      {/* ════════════════════════════════
          TOOLS
      ════════════════════════════════ */}
      <div style={{
        position: "relative", zIndex: 1,
        padding: "40px 44px 0",
        maxWidth: 1280, margin: "0 auto",
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          style={{ marginBottom: 20 }}
        >
          <div style={{
            display: "flex", alignItems: "flex-end",
            justifyContent: "space-between", flexWrap: "wrap", gap: 16,
          }}>
            <div>
              <Eyebrow text="EDA Tools We Use" />
              <DisplayTitle>
                Industry-Standard <GradText>Stack</GradText>
              </DisplayTitle>
              <p style={{
                fontFamily: BODY_FONT, fontSize: 13, fontWeight: 400,
                color: C.textSecondary, lineHeight: 1.75,
                margin: 0, maxWidth: 380,
              }}>
                Every stage of the physical design flow, covered by best-in-class EDA tools.
              </p>
            </div>

            {/* Stats cluster */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 }}
              style={{
                display: "flex",
                border: `1px solid ${C.borderLight}`,
                borderRadius: 14,
                overflow: "hidden",
                boxShadow: C.shadowSm,
              }}
            >
              {STATS.map((s, i) => (
                <StatBox key={s.label} {...s} i={i} inView={inView} />
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Tool accordion rows */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
          style={{
            border: `1px solid ${C.borderLight}`,
            borderRadius: 14, overflow: "hidden",
            boxShadow: C.shadowSm,
          }}
        >
          {TOOL_GROUPS.map((g, i) => (
            <ToolRow key={g.label} group={g} i={i} inView={inView} />
          ))}
        </motion.div>
      </div>

      {/* ── Capability Marquee ── */}
      <div style={{
        position: "relative", zIndex: 1,
        padding: "0 44px 56px",
        maxWidth: 1280, margin: "0 auto",
      }}>
        <CapMarquee inView={inView} />
      </div>
    </section>
  );
}