// DFTProjectsTools.jsx — Design for Test Page
// Design language: Numbered full-bleed accordion panels (projects) +
//   horizontal flow pipeline (tools) on desktop / accordion stack on mobile
//   — completely distinct from PD page.
// Typography: Clash Display / Sora / DM Sans (theme.js)
// Tokens: exact C.* from theme.js

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ChevronDown, Cpu, Shield, Zap,
  GitMerge, Activity, Layers, FlaskConical,
} from "lucide-react";
import { C, EASE } from "./theme";

/* ─────────────────────────────────────────
   TYPOGRAPHY CONSTANTS
───────────────────────────────────────── */
const DISPLAY = "'Clash Display', 'Sora', 'DM Sans', system-ui, sans-serif";
const BODY    = "'Sora', 'DM Sans', system-ui, sans-serif";
const UI      = "'DM Sans', system-ui, sans-serif";

/* ─────────────────────────────────────────
   DFT PROJECTS DATA
───────────────────────────────────────── */
const DFT_CATS = ["All", "Scan", "MBIST", "Boundary Scan", "Automotive", "SoC"];

const DFT_PROJECTS = [
  {
    index: "01",
    title: "Full-Chip Scan Compression",
    cat: "Scan",
    color: "#4f46e5",
    accentBg: "#eef2ff",
    icon: <Layers size={16} />,
    node: "7nm TSMC",
    tag: "Scan Architecture",
    coverage: "99.2%",
    patterns: "48K",
    desc: "Designed and implemented full-chip scan compression with EDT logic for a 6-core SoC. Achieved 99.2% stuck-at fault coverage with 48K compressed patterns, reducing test time by 72%.",
    highlights: ["EDT Compression 72x", "ATPG Automation", "DRC-clean Insertion", "SI-aware Scan"],
  },
  {
    index: "02",
    title: "Hierarchical MBIST Architecture",
    cat: "MBIST",
    color: "#7c3aed",
    accentBg: "#f5f3ff",
    icon: <Activity size={16} />,
    node: "12nm GF",
    tag: "Memory Test",
    coverage: "100%",
    patterns: "32 Algorithms",
    desc: "Full hierarchical MBIST implementation across 120+ embedded memories — SRAM, ROM, register files — with March algorithm library and repair integration for automotive-grade reliability.",
    highlights: ["120+ Memory Instances", "March Algorithm Suite", "Redundancy Repair", "LBIST Integration"],
  },
  {
    index: "03",
    title: "IEEE 1149.1 Boundary Scan",
    cat: "Boundary Scan",
    color: "#0891b2",
    accentBg: "#ecfeff",
    icon: <GitMerge size={16} />,
    node: "16nm TSMC",
    tag: "JTAG / BScan",
    coverage: "98.8%",
    patterns: "Board-Level",
    desc: "Full JTAG TAP controller design and boundary scan cell insertion for a multi-die SoC. Includes IEEE 1149.6 AC-coupled testing for high-speed I/O and board-level interconnect validation.",
    highlights: ["IEEE 1149.6 AC Test", "Multi-Die JTAG", "TAP Controller RTL", "BSDL Generation"],
  },
  {
    index: "04",
    title: "Automotive DFT Sign-Off",
    cat: "Automotive",
    color: "#059669",
    accentBg: "#ecfdf5",
    icon: <Shield size={16} />,
    node: "28nm UMC",
    tag: "ISO 26262",
    coverage: "99.9%",
    patterns: "FMEA + ATPG",
    desc: "End-to-end DFT implementation for AEC-Q100 Grade 1 automotive SoC — ISO 26262 ASIL-D compliance, LBIST for in-field self-test, and silicon-proven stuck-at/transition fault coverage.",
    highlights: ["ASIL-D Compliant", "LBIST In-field", "Transition Faults", "Safety Island Test"],
  },
  {
    index: "05",
    title: "Low-Power ATPG Optimization",
    cat: "Scan",
    color: "#d97706",
    accentBg: "#fffbeb",
    icon: <Zap size={16} />,
    node: "22nm FDX",
    tag: "ULP Test",
    coverage: "98.5%",
    patterns: "Low-Power",
    desc: "Low-power ATPG pattern generation with X-masking and toggle-rate limiting for an IoT chip. Reduced peak scan power by 65% while maintaining coverage targets, enabling safe ATE testing.",
    highlights: ["65% Peak Power ↓", "X-Masking", "Toggle-Rate Limiting", "Scan Segmentation"],
  },
  {
    index: "06",
    title: "SoC DFT Integration & Closure",
    cat: "SoC",
    color: "#dc2626",
    accentBg: "#fef2f2",
    icon: <FlaskConical size={16} />,
    node: "5nm TSMC",
    tag: "Full DFT",
    coverage: "99.5%",
    patterns: "Multi-Mode",
    desc: "Full DFT integration across 8 IP blocks — scan stitching, OCC insertion, test mode control, and top-level ATPG for a PCIe Gen5 SoC at 5nm with multi-mode, multi-corner timing closure.",
    highlights: ["8-Block Integration", "OCC Insertion", "Multi-Mode ATPG", "ATE Bring-Up"],
  },
];

/* ─────────────────────────────────────────
   DFT TOOLS DATA
───────────────────────────────────────── */
const TOOL_STACK = [
  { tool: "Synopsys TestMAX", tag: "Planning" },
  { tool: "Mentor Tessent Shell", tag: "Planning" },
  { tool: "Cadence Modus", tag: "Planning" },
  { tool: "Synopsys DFT Compiler", tag: "Scan Insertion" },
  { tool: "Mentor Tessent Scan", tag: "Scan Insertion" },
  { tool: "Cadence Encounter Test", tag: "Scan Insertion" },
  { tool: "Synopsys TetraMAX", tag: "ATPG" },
  { tool: "Mentor Tessent ATPG", tag: "ATPG" },
  { tool: "Cadence Modus ATPG", tag: "ATPG" },
  { tool: "Synopsys MemoryBIST", tag: "MBIST / LBIST" },
  { tool: "Mentor Tessent MemoryBIST", tag: "MBIST / LBIST" },
  { tool: "Cadence MBIST Architect", tag: "MBIST / LBIST" },
  { tool: "Synopsys BSD Compiler", tag: "Boundary Scan" },
  { tool: "Mentor Tessent BSCAN", tag: "Boundary Scan" },
  { tool: "XJTAG", tag: "Boundary Scan" },
  { tool: "Synopsys PrimeSim", tag: "Sign-Off & ATE" },
  { tool: "Advantest SmarTest", tag: "Sign-Off & ATE" },
  { tool: "Teradyne UltraFLEX", tag: "Sign-Off & ATE" },
];

const CAPABILITIES = [
  "Stuck-At Fault", "Transition Delay", "Path-Delay ATPG", "Bridge Fault",
  "Cell-Aware Test", "IEEE 1149.1", "IEEE 1149.6", "ISO 26262 ASIL-D",
  "LBIST", "MBIST", "Scan Compression", "EDT Logic",
];

/* ─────────────────────────────────────────
   SHARED PRIMITIVES
───────────────────────────────────────── */
function Eyebrow({ text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
      <div style={{ height: 1, width: 26, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
      <span style={{
        fontFamily: UI, fontSize: 10, fontWeight: 600,
        letterSpacing: "0.22em", textTransform: "uppercase", color: C.primary,
      }}>
        {text}
      </span>
    </div>
  );
}

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

/* ─────────────────────────────────────────
   ACCORDION PROJECT PANEL
───────────────────────────────────────── */
function ProjectPanel({ project, i, inView, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
      style={{
        borderBottom: `1px solid ${C.borderLight}`,
        overflow: "hidden",
      }}
    >
      {/* ── Header row — always visible ── */}
      <button
        onClick={onToggle}
        style={{
          width: "100%", background: "none", border: "none",
          cursor: "pointer", padding: 0, textAlign: "left",
        }}
      >
        <div
          className="dft-project-header-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "72px 1fr auto auto auto",
            alignItems: "center",
            gap: 16,
            padding: "20px 0",
            background: isOpen
              ? `linear-gradient(90deg, ${project.color}07, transparent)`
              : "transparent",
            transition: "background 0.3s",
          }}
        >
          {/* Index number */}
          <span style={{
            fontFamily: DISPLAY, fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
            fontWeight: 700, letterSpacing: "-0.05em",
            color: isOpen ? project.color : C.textMuted,
            transition: "color 0.25s",
            lineHeight: 1,
          }}>
            {project.index}
          </span>

          {/* Title + category */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              fontFamily: UI, fontSize: 9, fontWeight: 700,
              letterSpacing: "0.16em", textTransform: "uppercase",
              color: project.color, marginBottom: 5,
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: "50%",
                background: project.color, display: "inline-block",
              }} />
              {project.cat}
            </div>
            <p style={{
              fontFamily: DISPLAY,
              fontSize: "clamp(0.95rem, 2vw, 1.2rem)",
              fontWeight: 600, letterSpacing: "-0.03em",
              color: isOpen ? project.color : C.textPrimary,
              margin: 0, lineHeight: 1.2,
              transition: "color 0.25s",
            }}>
              {project.title}
            </p>
          </div>

          {/* Coverage badge */}
          <div style={{
            textAlign: "center",
            display: "flex", flexDirection: "column", gap: 2,
            padding: "6px 14px",
            background: isOpen ? project.color : C.bgAccent,
            borderRadius: 8,
            transition: "background 0.25s",
          }}>
            <span style={{
              fontFamily: DISPLAY, fontSize: "1.05rem", fontWeight: 700,
              letterSpacing: "-0.04em",
              color: isOpen ? "#fff" : project.color,
              transition: "color 0.25s", lineHeight: 1,
            }}>
              {project.coverage}
            </span>
            <span style={{
              fontFamily: UI, fontSize: 8, fontWeight: 600,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: isOpen ? "rgba(255,255,255,0.7)" : C.textMuted,
              transition: "color 0.25s",
            }}>
              Coverage
            </span>
          </div>

          {/* Node chip */}
          <span style={{
            fontFamily: UI, fontSize: 10, fontWeight: 500,
            padding: "4px 10px", borderRadius: 4,
            border: `1px solid ${isOpen ? project.color : C.borderLight}`,
            color: isOpen ? project.color : C.textSecondary,
            background: isOpen ? project.accentBg : "transparent",
            transition: "all 0.25s",
            whiteSpace: "nowrap",
          }}>
            {project.node}
          </span>

          {/* Chevron */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ color: isOpen ? project.color : C.textMuted, display: "flex" }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </div>
      </button>

      {/* ── Expanded body ── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="dft-project-body-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "72px 1fr 220px",
                gap: 16,
                paddingBottom: 28,
              }}
            >
              {/* Left accent bar */}
              <div style={{
                display: "flex", justifyContent: "flex-end", paddingTop: 2,
              }}>
                <div style={{
                  width: 2, height: "100%",
                  background: `linear-gradient(to bottom, ${project.color}, ${project.color}00)`,
                  borderRadius: 2,
                }} />
              </div>

              {/* Description */}
              <div style={{ paddingLeft: 16 }}>
                <p style={{
                  fontFamily: BODY, fontSize: 13, fontWeight: 300,
                  color: C.textSecondary, lineHeight: 1.8,
                  margin: "0 0 18px",
                }}>
                  {project.desc}
                </p>

                {/* Highlights — horizontal rule list */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 28px" }}>
                  {project.highlights.map((h, hi) => (
                    <motion.div
                      key={h}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: hi * 0.06, ease: EASE }}
                      style={{
                        display: "flex", alignItems: "center", gap: 8,
                        fontFamily: UI, fontSize: 11.5, fontWeight: 600,
                        color: C.textSecondary,
                      }}
                    >
                      <span style={{
                        display: "block", width: 16, height: 1.5,
                        background: project.color, borderRadius: 2, flexShrink: 0,
                      }} />
                      {h}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right meta panel */}
              <div style={{
                background: project.accentBg,
                border: `1px solid ${project.color}22`,
                borderRadius: 12,
                padding: "16px 18px",
                display: "flex", flexDirection: "column", gap: 14,
              }}>
                <div>
                  <p style={{
                    fontFamily: UI, fontSize: 8.5, fontWeight: 700,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    color: project.color, margin: "0 0 4px",
                  }}>
                    Patterns
                  </p>
                  <p style={{
                    fontFamily: DISPLAY, fontSize: "1.1rem", fontWeight: 600,
                    letterSpacing: "-0.03em", color: C.textPrimary, margin: 0,
                  }}>
                    {project.patterns}
                  </p>
                </div>
                <div style={{ height: 1, background: `${project.color}20` }} />
                <div>
                  <p style={{
                    fontFamily: UI, fontSize: 8.5, fontWeight: 700,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    color: project.color, margin: "0 0 4px",
                  }}>
                    Tag
                  </p>
                  <p style={{
                    fontFamily: BODY, fontSize: 12, fontWeight: 500,
                    color: C.textSecondary, margin: 0,
                  }}>
                    {project.tag}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


/* ─────────────────────────────────────────
   CAPABILITY GRID
───────────────────────────────────────── */
function CapGrid({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.65, ease: EASE }}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        gap: 1,
        border: `1px solid ${C.borderLight}`,
        borderRadius: 12,
        overflow: "hidden",
        marginTop: 20,
        boxShadow: C.shadowSm,
      }}
    >
      {CAPABILITIES.map((cap, i) => (
        <motion.div
          key={cap}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 + i * 0.04, ease: EASE }}
          whileHover={{ background: C.bgAccent, color: C.primary }}
          style={{
            padding: "13px 16px",
            background: C.bgWhite,
            fontFamily: BODY, fontSize: 11.5, fontWeight: 500,
            color: C.textSecondary,
            display: "flex", alignItems: "center", gap: 8,
            borderRight: `1px solid ${C.borderLight}`,
            borderBottom: `1px solid ${C.borderLight}`,
            transition: "all 0.2s",
            cursor: "default",
          }}
        >
          <span style={{
            width: 4, height: 4, borderRadius: "50%",
            background: C.primary, flexShrink: 0, opacity: 0.5,
          }} />
          {cap}
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────── */
export default function ProjectsList() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [activeFilter, setActiveFilter] = useState("All");
  const [openPanel, setOpenPanel] = useState(0); // first open by default

  const filtered =
    activeFilter === "All"
      ? DFT_PROJECTS
      : DFT_PROJECTS.filter((p) => p.cat === activeFilter);

  const handleToggle = (i) => {
    setOpenPanel(openPanel === i ? null : i);
  };

  return (
    <section
      ref={ref}
      style={{
        background: C.bgLight,
        position: "relative",
        overflow: "hidden",
        fontFamily: BODY,
      }}
    >
      {/* ── Background texture ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: [
          `linear-gradient(${C.borderLight} 1px, transparent 1px)`,
          `linear-gradient(90deg, ${C.borderLight} 1px, transparent 1px)`,
        ].join(", "),
        backgroundSize: "40px 40px",
        opacity: 0.5,
      }} />

      {/* ── Ambient orbs ── */}
      <div style={{
        position: "absolute", width: 480, height: 320,
        top: "-60px", left: "-80px",
        background: "radial-gradient(ellipse, rgba(79,70,229,0.07) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "absolute", width: 360, height: 260,
        bottom: "8%", right: "-60px",
        background: "radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: 1280, margin: "0 auto",
      }}>

        {/* ════════════════════════════
            PROJECTS SECTION
        ════════════════════════════ */}
        <div style={{ padding: "clamp(32px, 6vw, 60px) clamp(20px, 5vw, 44px) 0" }}>

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              display: "flex", alignItems: "flex-end",
              justifyContent: "space-between", flexWrap: "wrap",
              gap: 20, marginBottom: 32,
            }}
          >
            <div>
              <Eyebrow text="DFT Projects" />
              <h2 style={{
                fontFamily: DISPLAY,
                fontSize: "clamp(1.9rem, 4vw, 2.9rem)",
                fontWeight: 700, letterSpacing: "-0.04em",
                lineHeight: 1.06, color: C.textPrimary, margin: "0 0 8px",
              }}>
                Test Coverage <GradText>We've Delivered</GradText>
              </h2>
              <p style={{
                fontFamily: BODY, fontSize: 13, fontWeight: 400,
                color: C.textSecondary, lineHeight: 1.75, margin: 0, maxWidth: 400,
              }}>
                Silicon-proven DFT implementations across nodes, methodologies, and automotive-grade standards.
              </p>
            </div>

            {/* Stat cluster */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 }}
              style={{
                display: "flex", gap: 0,
                border: `1px solid ${C.borderLight}`,
                borderRadius: 12, overflow: "hidden",
                boxShadow: C.shadowSm, background: C.bgWhite,
              }}
            >
              {[
                { val: "99.9%", label: "Peak Coverage" },
                { val: "6+",    label: "Tapeouts" },
                { val: "ASIL-D",label: "Automotive" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    padding: "16px 20px", textAlign: "center",
                    borderRight: i < 2 ? `1px solid ${C.borderLight}` : "none",
                  }}
                >
                  <p style={{
                    fontFamily: DISPLAY, fontSize: "1.4rem", fontWeight: 700,
                    letterSpacing: "-0.04em", margin: "0 0 4px",
                    background: C.gradPrimary,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                    {s.val}
                  </p>
                  <p style={{
                    fontFamily: UI, fontSize: 9, fontWeight: 600,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    color: C.textMuted, margin: 0,
                  }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
            style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 0 }}
          >
            {DFT_CATS.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveFilter(cat); setOpenPanel(0); }}
                style={{
                  fontFamily: UI, fontSize: 10.5, fontWeight: 600,
                  letterSpacing: "0.07em", textTransform: "uppercase",
                  padding: "5px 15px", borderRadius: 50,
                  border: activeFilter === cat
                    ? `1.5px solid ${C.primary}`
                    : `1.5px solid ${C.borderLight}`,
                  background: activeFilter === cat ? C.primary : "transparent",
                  color: activeFilter === cat ? "#fff" : C.textSecondary,
                  cursor: "pointer",
                  boxShadow: activeFilter === cat
                    ? "0 4px 14px rgba(79,70,229,0.28)"
                    : "none",
                  transition: "all 0.2s",
                }}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* ── Accordion panel list ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              style={{
                background: C.bgWhite,
                border: `1px solid ${C.borderLight}`,
                borderRadius: 16,
                padding: "0 24px",
                marginTop: 20,
                boxShadow: C.shadowSm,
              }}
            >
              {filtered.map((project, i) => (
                <ProjectPanel
                  key={project.title}
                  project={project}
                  i={i}
                  inView={inView}
                  isOpen={openPanel === i}
                  onToggle={() => handleToggle(i)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ════════════════════════════
            DIVIDER
        ════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          style={{
            display: "flex", alignItems: "center", gap: 18,
            margin: "48px 44px 0",
          }}
        >
          <div style={{
            flex: 1, height: 1,
            background: `linear-gradient(90deg, transparent, ${C.border}, transparent)`,
          }} />
          <span style={{
            fontFamily: UI, fontSize: 9, fontWeight: 700,
            letterSpacing: "0.15em", textTransform: "uppercase",
            padding: "5px 14px", borderRadius: 50,
            border: `1px solid ${C.border}`,
            color: C.textSecondary, background: C.bgLight, whiteSpace: "nowrap",
          }}>
            DFT Tools
          </span>
          <div style={{
            flex: 1, height: 1,
            background: `linear-gradient(90deg, ${C.border}, transparent)`,
          }} />
        </motion.div>

        {/* ════════════════════════════
            TOOLS SECTION
        ════════════════════════════ */}
        <div style={{ padding: "clamp(24px, 5vw, 40px) clamp(20px, 5vw, 44px) 0" }}>

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            style={{ marginBottom: 24 }}
          >
            <Eyebrow text="EDA Toolchain" />
            <h2 style={{
              fontFamily: DISPLAY,
              fontSize: "clamp(1.9rem, 4vw, 2.9rem)",
              fontWeight: 700, letterSpacing: "-0.04em",
              lineHeight: 1.06, color: C.textPrimary, margin: "0 0 8px",
            }}>
              Tools <GradText>We Use</GradText>
            </h2>
            <p style={{
              fontFamily: BODY, fontSize: 13, fontWeight: 400,
              color: C.textSecondary, lineHeight: 1.75, margin: 0, maxWidth: 440,
            }}>
              The Synopsys, Mentor, Cadence, and ATE platforms our engineers run day to day.
            </p>
          </motion.div>

          {/* Flat tool roster — name + stage tag, no re-narration of the flow */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 10,
          }}>
            {TOOL_STACK.map((t, i) => (
              <motion.div
                key={t.tool}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.03, ease: EASE }}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "9px 14px", borderRadius: 10,
                  border: `1px solid ${C.borderLight}`,
                  background: C.bgWhite, boxShadow: C.shadowSm,
                }}
              >
                <span style={{
                  fontFamily: BODY, fontSize: 12, fontWeight: 600,
                  color: C.textPrimary,
                }}>
                  {t.tool}
                </span>
                <span style={{
                  fontFamily: UI, fontSize: 9, fontWeight: 600,
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  color: C.primary, background: C.bgAccent,
                  padding: "2px 8px", borderRadius: 50,
                }}>
                  {t.tag}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Capabilities grid */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, ease: EASE }}
            style={{ marginTop: 36 }}
          >
            <div style={{
              display: "flex", alignItems: "center", gap: 10, marginBottom: 14,
            }}>
              <div style={{ height: 1, width: 26, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
              <span style={{
                fontFamily: UI, fontSize: 10, fontWeight: 600,
                letterSpacing: "0.22em", textTransform: "uppercase", color: C.primary,
              }}>
                Fault Coverage Capabilities
              </span>
            </div>
            <CapGrid inView={inView} />
          </motion.div>
        </div>

        {/* Bottom padding */}
        <div style={{ height: 60 }} />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .dft-project-header-grid {
            display: flex !important;
            flex-wrap: wrap !important;
            align-items: center !important;
            gap: 12px !important;
            padding: 16px 8px !important;
          }
          .dft-project-header-grid > span:first-child {
            font-size: 1.4rem !important;
          }
          .dft-project-header-grid > div:nth-child(2) {
            flex: 1 1 auto !important;
            min-width: 150px;
          }
          .dft-project-header-grid > div:nth-child(3) {
            flex-direction: row !important;
            padding: 4px 10px !important;
            align-items: center !important;
            gap: 6px !important;
          }
          .dft-project-header-grid > span:nth-child(4) {
            padding: 4px 10px !important;
          }
          .dft-project-header-grid > div:last-child {
            margin-left: auto !important;
          }

          .dft-project-body-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            padding: 0 16px 20px !important;
          }
          .dft-project-body-grid > div:first-child {
            display: none !important;
          }
          .dft-project-body-grid > div:nth-child(2) {
            padding-left: 0 !important;
          }
          .dft-project-body-grid > div:nth-child(3) {
            width: 100% !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>
    </section>
  );
}