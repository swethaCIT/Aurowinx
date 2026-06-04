// ProjectsTools.jsx — Physical Design Page
// ProjectsList + ToolsSection combined in one light section
// Light palette, indigo/purple accent, tight spacing, rich animations

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowUpRight, Cpu, Layers, Zap, GitBranch, Radio, Shield } from "lucide-react";
import { C, FONT, EASE } from "./theme";

/* ══════════ PROJECTS DATA ══════════ */
const PROJ_CATS = ["All", "ASIC", "SoC", "Low Power", "Automotive", "FPGA"];

const PROJECTS = [
  {
    title: "Multi-Core SoC PNR",
    cat: "SoC",
    color: "#4f46e5",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    tag: "Full Chip",
    icon: <Layers style={{ width: 15, height: 15 }} />,
    node: "7nm TSMC",
    desc: "Complete RTL-to-GDSII for a 6-core SoC — hierarchical PNR, CTS, SI/PI sign-off across 14 power domains.",
    size: "large",
  },
  {
    title: "ARM Cortex-A55 PNR",
    cat: "ASIC",
    color: "#7c3aed",
    img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
    tag: "Processor",
    icon: <Cpu style={{ width: 15, height: 15 }} />,
    node: "12nm GF",
    desc: "Placement, CTS and detailed routing with timing closure for ARM Cortex-A55 cluster.",
    size: "small",
  },
  {
    title: "DDR5 Controller Layout",
    cat: "ASIC",
    color: "#0891b2",
    img: "https://images.unsplash.com/photo-1601132359864-c974e79890ac?w=600&q=80",
    tag: "Memory",
    icon: <GitBranch style={{ width: 15, height: 15 }} />,
    node: "16nm TSMC",
    desc: "Flat PNR with IR-drop and EM sign-off for DDR5 memory controller.",
    size: "small",
  },
  {
    title: "Automotive SoC Sign-Off",
    cat: "Automotive",
    color: "#059669",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    tag: "AEC-Q100",
    icon: <Shield style={{ width: 15, height: 15 }} />,
    node: "28nm UMC",
    desc: "Full sign-off STA, DRC/LVS, IR-drop and EM for AEC-Q100 Grade 2 automotive SoC.",
    size: "large",
  },
  {
    title: "IoT Low Power Design",
    cat: "Low Power",
    color: "#d97706",
    img: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=600&q=80",
    tag: "ULP",
    icon: <Zap style={{ width: 15, height: 15 }} />,
    node: "22nm FDX",
    desc: "Multi-voltage domain PNR with power gating and retention flops for ultra-low-power IoT chip.",
    size: "small",
  },
  {
    title: "PCIe Gen5 PHY Layout",
    cat: "ASIC",
    color: "#dc2626",
    img: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&q=80",
    tag: "Protocol",
    icon: <Radio style={{ width: 15, height: 15 }} />,
    node: "5nm TSMC",
    desc: "Custom analog-mixed signal layout and PNR for PCIe Gen5 PHY at 5nm.",
    size: "small",
  },
];

/* ══════════ TOOLS DATA ══════════ */
const TOOL_GROUPS = [
  {
    label: "Place & Route",
    color: "#4f46e5", bg: "#eef2ff",
    tools: ["Cadence Innovus", "Synopsys ICC2", "Mentor Olympus"],
  },
  {
    label: "Synthesis",
    color: "#7c3aed", bg: "#f5f3ff",
    tools: ["Synopsys DC", "Cadence Genus", "Mentor Precision"],
  },
  {
    label: "Static Timing",
    color: "#0891b2", bg: "#ecfeff",
    tools: ["Synopsys PrimeTime", "Cadence Tempus", "Ansys PathFinder"],
  },
  {
    label: "Physical Verification",
    color: "#059669", bg: "#ecfdf5",
    tools: ["Mentor Calibre", "Synopsys IC Validator", "Cadence PVS"],
  },
  {
    label: "Power Integrity",
    color: "#d97706", bg: "#fffbeb",
    tools: ["Ansys RedHawk", "Cadence Voltus", "Synopsys PrimeRail"],
  },
  {
    label: "Extraction",
    color: "#dc2626", bg: "#fef2f2",
    tools: ["Mentor xACT", "Synopsys StarRC", "Cadence QRC"],
  },
];

/* ── Project card ── */
function ProjectCard({ project, i, inView }) {
  const [hovered, setHovered] = useState(false);
  const isLarge = project.size === "large";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: "relative", borderRadius: 18, overflow: "hidden",
        height: isLarge ? 300 : 210,
        gridColumn: isLarge ? "span 2" : "span 1",
        cursor: "pointer",
        boxShadow: hovered ? `0 20px 52px ${project.color}22` : C.shadowMd,
        transition: "box-shadow 0.3s",
        border: `1px solid ${hovered ? project.color + "40" : C.borderLight}`,
      }}
    >
      {/* Image */}
      <motion.img
        src={project.img} alt={project.title}
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />

      {/* Overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(5,5,20,0.88) 0%, rgba(5,5,20,0.25) 55%, transparent 100%)",
      }} />
      <motion.div
        animate={{ opacity: hovered ? 0.40 : 0 }} transition={{ duration: 0.3 }}
        style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${project.color}, transparent)` }}
      />

      {/* Top row */}
      <div style={{ position: "absolute", top: 14, left: 14, right: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          padding: "3px 10px", borderRadius: 50,
          background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)",
          color: "#fff", fontSize: 9, fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase",
          border: "1px solid rgba(255,255,255,0.2)",
        }}>
          {project.icon}{project.tag}
        </span>
        <motion.span
          animate={{ background: hovered ? project.color : "rgba(255,255,255,0.12)" }}
          transition={{ duration: 0.3 }}
          style={{
            padding: "3px 10px", borderRadius: 50, color: "#fff",
            fontSize: 10, fontWeight: 800,
            backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          {project.node}
        </motion.span>
      </div>

      {/* Bottom */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 16px 16px" }}>
        <span style={{
          display: "inline-block", marginBottom: 6,
          padding: "2px 9px", borderRadius: 50,
          background: project.color, color: "#fff",
          fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
        }}>{project.cat}</span>
        <p style={{ margin: "0 0 6px", fontSize: isLarge ? 18 : 14, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", fontFamily: FONT, lineHeight: 1.2 }}>
          {project.title}
        </p>
        <motion.p
          animate={{ height: hovered ? "auto" : 0, opacity: hovered ? 1 : 0, marginBottom: hovered ? 8 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ fontSize: 11, color: "rgba(255,255,255,0.72)", lineHeight: 1.6, margin: 0, overflow: "hidden" }}
        >
          {project.desc}
        </motion.p>
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.25 }}
          style={{ display: "flex", alignItems: "center", gap: 5 }}
        >
          <span style={{ fontSize: 10, color: "#fff", fontWeight: 700, letterSpacing: "0.08em" }}>VIEW PROJECT</span>
          <ArrowUpRight style={{ width: 12, height: 12, color: "#fff" }} />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ── Tool group row ── */
function ToolGroup({ group, i, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "12px 16px", borderRadius: 12,
        background: "#fff", border: `1px solid ${C.borderLight}`,
        boxShadow: C.shadowSm,
      }}
    >
      {/* Label */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8, minWidth: 140, flexShrink: 0,
      }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: group.color, flexShrink: 0 }} />
        <span style={{ fontSize: 11, fontWeight: 700, color: group.color, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {group.label}
        </span>
      </div>
      {/* Chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {group.tools.map((tool, j) => (
          <motion.span
            key={tool}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 + i * 0.07 + j * 0.05, ease: EASE }}
            whileHover={{ scale: 1.07, y: -2 }}
            style={{
              padding: "4px 12px", borderRadius: 50,
              background: group.bg, color: group.color,
              fontSize: 12, fontWeight: 600,
              border: `1px solid ${group.color}22`,
              cursor: "default",
            }}
          >
            {tool}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function ProjectsList() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter(p => p.cat === active);

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
      {/* Orbs */}
      <div style={{ position: "absolute", width: 500, height: 300, top: "0%", right: "-5%", background: "radial-gradient(ellipse, rgba(79,70,229,0.06) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 400, height: 250, bottom: "5%", left: "-5%", background: "radial-gradient(ellipse, rgba(124,58,237,0.05) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── PROJECTS PART ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ marginBottom: 28 }}
        >
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ height: 1, width: 28, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
                <span style={{ color: C.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Our Projects</span>
              </div>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, color: C.textPrimary, margin: "0 0 6px", letterSpacing: "-0.04em", fontFamily: FONT }}>
                What We've Taped Out
              </h2>
              <p style={{ color: C.textSecondary, fontSize: 13, margin: 0, lineHeight: 1.7 }}>
                Physical design deliverables across advanced nodes and foundries.
              </p>
            </div>
            {/* Filter tabs */}
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
              {PROJ_CATS.map(cat => (
                <button key={cat} onClick={() => setActive(cat)}
                  style={{
                    padding: "6px 16px", borderRadius: 50,
                    border: active === cat ? `1.5px solid ${C.primary}` : `1px solid ${C.borderLight}`,
                    background: active === cat ? C.primary : "#fff",
                    color: active === cat ? "#fff" : C.textSecondary,
                    fontWeight: 700, fontSize: 11, cursor: "pointer", fontFamily: FONT,
                    boxShadow: active === cat ? `0 4px 14px rgba(79,70,229,0.25)` : C.shadowSm,
                    transition: "all 0.2s",
                  }}
                >{cat}</button>
              ))}
            </div>
          </div>

          {/* Project grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }}
              style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}
            >
              {filtered.map((p, i) => (
                <ProjectCard key={p.title} project={p} i={i} inView={inView} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
          style={{
            height: 1, background: `linear-gradient(90deg, transparent, ${C.border}, transparent)`,
            margin: "36px 0", transformOrigin: "left",
          }}
        />

        {/* ── TOOLS PART ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
        >
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ height: 1, width: 28, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
                <span style={{ color: C.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Tool Ecosystem</span>
              </div>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, color: C.textPrimary, margin: "0 0 6px", letterSpacing: "-0.04em", fontFamily: FONT }}>
                EDA Tools We Use
              </h2>
              <p style={{ color: C.textSecondary, fontSize: 13, margin: 0, lineHeight: 1.7 }}>
                Industry-standard tools across every stage of the physical design flow.
              </p>
            </div>
            {/* Summary badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 }}
              style={{
                display: "flex", gap: 16, padding: "12px 20px",
                background: C.gradPrimary, borderRadius: 14,
                boxShadow: "0 8px 28px rgba(79,70,229,0.28)",
              }}
            >
              {[{ val: "18+", label: "EDA Tools" }, { val: "6", label: "Categories" }].map(s => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <p style={{ margin: 0, fontSize: "1.4rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", fontFamily: FONT }}>{s.val}</p>
                  <p style={{ margin: "2px 0 0", fontSize: 10, color: "rgba(255,255,255,0.72)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Tool groups */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {TOOL_GROUPS.map((group, i) => (
              <ToolGroup key={group.label} group={group} i={i} inView={inView} />
            ))}
          </div>

          {/* Capabilities pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, ease: EASE }}
            style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}
          >
            {["Flat PNR", "Hierarchical PNR", "Multi-Patterning", "Flip Chip", "Wire Bond", "Low Power", "FinFET / GAA", "2.5D / 3D Integration", "MCMM STA", "SI/PI Analysis"].map((cap, i) => (
              <motion.div
                key={cap}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.72 + i * 0.04, ease: EASE }}
                whileHover={{ scale: 1.06, y: -2 }}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "6px 14px", borderRadius: 50,
                  background: C.bgAccent, border: `1px solid ${C.border}`,
                  cursor: "default",
                }}
              >
                <CheckCircle2 style={{ width: 12, height: 12, color: C.primary, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: C.textSecondary, fontWeight: 600 }}>{cap}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}