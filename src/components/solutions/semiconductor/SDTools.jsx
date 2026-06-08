// SDTools.jsx — ASIC Page
// Tools ecosystem — unique floating logo wall + category filter
// Light palette, premium UX, no plain cards

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { C, FONT, EASE } from "./theme";

const CATEGORIES = ["All", "Simulation", "Formal", "Synthesis", "Physical Design", "Sign-Off", "DFT"];

const TOOLS = [
  // Simulation
  { name: "Synopsys VCS",      cat: "Simulation",      color: "#4f46e5", abbr: "VCS",  tier: "primary" },
  { name: "Cadence Xcelium",   cat: "Simulation",      color: "#4f46e5", abbr: "XCE",  tier: "primary" },
  { name: "Siemens Questa",    cat: "Simulation",      color: "#4f46e5", abbr: "QST",  tier: "primary" },
  { name: "Riviera-PRO",       cat: "Simulation",      color: "#4f46e5", abbr: "RIV",  tier: "secondary" },
  // Formal
  { name: "JasperGold",        cat: "Formal",          color: "#7c3aed", abbr: "JG",   tier: "primary" },
  { name: "VC Formal",         cat: "Formal",          color: "#7c3aed", abbr: "VCF",  tier: "primary" },
  { name: "SymbiYosys",        cat: "Formal",          color: "#7c3aed", abbr: "SYS",  tier: "secondary" },
  { name: "Conformal",         cat: "Formal",          color: "#7c3aed", abbr: "CNF",  tier: "secondary" },
  // Synthesis
  { name: "Synopsys DC",       cat: "Synthesis",       color: "#0891b2", abbr: "DC",   tier: "primary" },
  { name: "Cadence Genus",     cat: "Synthesis",       color: "#0891b2", abbr: "GNS",  tier: "primary" },
  { name: "Mentor Precision",  cat: "Synthesis",       color: "#0891b2", abbr: "PRE",  tier: "secondary" },
  // Physical Design
  { name: "Cadence Innovus",   cat: "Physical Design", color: "#059669", abbr: "INV",  tier: "primary" },
  { name: "Synopsys ICC2",     cat: "Physical Design", color: "#059669", abbr: "ICC2", tier: "primary" },
  { name: "Mentor Olympus",    cat: "Physical Design", color: "#059669", abbr: "OLY",  tier: "secondary" },
  // Sign-Off
  { name: "Synopsys PrimeTime",cat: "Sign-Off",        color: "#d97706", abbr: "PT",   tier: "primary" },
  { name: "Cadence Tempus",    cat: "Sign-Off",        color: "#d97706", abbr: "TMP",  tier: "primary" },
  { name: "Mentor Calibre",    cat: "Sign-Off",        color: "#d97706", abbr: "CAL",  tier: "primary" },
  { name: "Ansys RedHawk",     cat: "Sign-Off",        color: "#d97706", abbr: "RHK",  tier: "secondary" },
  { name: "Synopsys StarRC",   cat: "Sign-Off",        color: "#d97706", abbr: "SRC",  tier: "secondary" },
  // DFT
  { name: "Synopsys TetraMAX", cat: "DFT",             color: "#dc2626", abbr: "TMX",  tier: "primary" },
  { name: "Mentor Tessent",    cat: "DFT",             color: "#dc2626", abbr: "TSS",  tier: "primary" },
  { name: "Cadence vManager",  cat: "DFT",             color: "#dc2626", abbr: "VMG",  tier: "secondary" },
  // Debug
  { name: "Synopsys Verdi",    cat: "Simulation",      color: "#4f46e5", abbr: "VRD",  tier: "secondary" },
  { name: "Cadence SimVision", cat: "Simulation",      color: "#4f46e5", abbr: "SV",   tier: "secondary" },
];

const CATEGORY_META = {
  "Simulation":      { color: "#4f46e5", bg: "#eef2ff", count: 6 },
  "Formal":          { color: "#7c3aed", bg: "#f5f3ff", count: 4 },
  "Synthesis":       { color: "#0891b2", bg: "#ecfeff", count: 3 },
  "Physical Design": { color: "#059669", bg: "#ecfdf5", count: 3 },
  "Sign-Off":        { color: "#d97706", bg: "#fffbeb", count: 5 },
  "DFT":             { color: "#dc2626", bg: "#fef2f2", count: 3 },
};

/* ── Floating tool bubble ── */
function ToolBubble({ tool, i, inView }) {
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);
  const isPrimary = tool.tier === "primary";
  const size = isPrimary ? 72 : 56;
  const showLabel = hovered || tapped;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => setTapped(v => !v)}
      animate={inView ? {
        opacity: 1, scale: 1,
        y: [0, -(4 + (i % 3) * 3), 0],
      } : { opacity: 0, scale: 0 }}
      transition={{
        opacity: { duration: 0.4, delay: i * 0.04 },
        scale: { duration: 0.45, delay: i * 0.04, ease: [0.34, 1.56, 0.64, 1] },
        y: { duration: 3 + (i % 4), delay: i * 0.15, repeat: Infinity, ease: "easeInOut" },
      }}
      style={{ position: "relative", cursor: "pointer", flexShrink: 0 }}
    >
      <motion.div
        animate={{
          boxShadow: hovered
            ? `0 12px 32px ${tool.color}35, 0 0 0 3px ${tool.color}30`
            : isPrimary
              ? `0 6px 20px ${tool.color}20`
              : `0 3px 10px rgba(0,0,0,0.06)`,
          scale: hovered ? 1.12 : 1,
        }}
        transition={{ duration: 0.25 }}
        style={{
          width: size, height: size, borderRadius: "50%",
          background: hovered ? tool.color : "#fff",
          border: `2px solid ${tool.color}${isPrimary ? "40" : "25"}`,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 2,
        }}
      >
        <span style={{
          fontSize: isPrimary ? 11 : 9, fontWeight: 900,
          color: hovered ? "#fff" : tool.color,
          fontFamily: FONT, letterSpacing: "-0.01em",
          transition: "color 0.25s",
        }}>
          {tool.abbr}
        </span>
      </motion.div>

      {/* Tooltip / tap label */}
      <AnimatePresence>
        {showLabel && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute", bottom: "110%", left: "50%",
              transform: "translateX(-50%)",
              background: C.textPrimary, color: "#fff",
              padding: "5px 10px", borderRadius: 8,
              fontSize: 11, fontWeight: 700, whiteSpace: "nowrap",
              boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
              zIndex: 10,
            }}
          >
            {tool.name}
            <div style={{
              position: "absolute", top: "100%", left: "50%",
              transform: "translateX(-50%)",
              width: 0, height: 0,
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: `5px solid ${C.textPrimary}`,
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile: persistent label below bubble */}
      <span className="sd-tool-mobile-label" style={{
        display: "none",
        position: "absolute",
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        marginTop: 6,
        fontSize: 9,
        fontWeight: 700,
        color: C.textMuted,
        whiteSpace: "nowrap",
        fontFamily: FONT,
      }}>
        {tool.abbr}
      </span>
    </motion.div>
  );
}

/* ── Category card ── */
function CategoryCard({ cat, meta, count, active, onClick, inView, i }) {
  const isActive = active === cat;
  return (
    <motion.button
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.07, ease: EASE }}
      onClick={onClick}
      whileHover={{ y: -3 }}
      style={{
        border: "none", cursor: "pointer", fontFamily: FONT,
        background: isActive ? meta.color : "#fff",
        borderRadius: 14, padding: "14px 16px",
        boxShadow: isActive ? `0 8px 24px ${meta.color}35` : C.shadowSm,
        border: `1.5px solid ${isActive ? meta.color : C.borderLight}`,
        textAlign: "left", transition: "all 0.25s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{
          fontSize: 10, fontWeight: 700,
          color: isActive ? "rgba(255,255,255,0.8)" : C.textMuted,
          letterSpacing: "0.12em", textTransform: "uppercase",
        }}>
          {cat}
        </span>
        <span style={{
          padding: "2px 8px", borderRadius: 50,
          background: isActive ? "rgba(255,255,255,0.2)" : meta.bg,
          color: isActive ? "#fff" : meta.color,
          fontSize: 10, fontWeight: 800,
        }}>
          {count}
        </span>
      </div>
      <div style={{ height: 3, borderRadius: 2, background: isActive ? "rgba(255,255,255,0.35)" : meta.bg, overflow: "hidden" }}>
        <motion.div
          animate={{ width: isActive ? "100%" : "60%" }}
          transition={{ duration: 0.5 }}
          style={{ height: "100%", background: isActive ? "#fff" : meta.color, borderRadius: 2 }}
        />
      </div>
    </motion.button>
  );
}

export default function SDTools() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? TOOLS : TOOLS.filter(t => t.cat === active);

  return (
    <section
      ref={ref}
      className="sd-tools-section"
      style={{
        background: "linear-gradient(160deg, #f8fafc 0%, #f1f5f9 100%)",
        position: "relative", overflow: "hidden", fontFamily: FONT,
      }}
    >
      {/* Grid bg */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(79,70,229,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,0.03) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />
      <div style={{ position: "absolute", width: 500, height: 350, top: "-5%", right: "-5%", background: "radial-gradient(ellipse, rgba(79,70,229,0.07) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 44 }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ height: 1, width: 36, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
            <span style={{ color: C.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Tool Ecosystem</span>
            <div style={{ height: 1, width: 36, background: `linear-gradient(90deg, ${C.primary}, transparent)` }} />
          </div>
          <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 900, color: C.textPrimary, margin: "0 0 10px", letterSpacing: "-0.04em", fontFamily: FONT }}>
            Industry-Standard EDA Tools
          </h2>
          <p style={{ color: C.textSecondary, fontSize: 15, maxWidth: 460, margin: "0 auto", lineHeight: 1.75 }}>
            24+ tools across simulation, formal, synthesis, physical design, sign-off and DFT.
          </p>
        </motion.div>

        {/* Category cards — horizontal scroll on mobile */}
        <div
          className="sd-tools-cats-scroll"
          style={{ marginBottom: 36 }}
        >
          <div
            className="sd-tools-cats-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}
          >
            {Object.entries(CATEGORY_META).map(([cat, meta], i) => (
              <CategoryCard
                key={cat} cat={cat} meta={meta}
                count={meta.count} active={active}
                onClick={() => setActive(active === cat ? "All" : cat)}
                inView={inView} i={i}
              />
            ))}
          </div>
        </div>

        {/* Tools bubble wall */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            background: "#fff", borderRadius: 24, padding: "40px 32px",
            border: `1px solid ${C.borderLight}`, boxShadow: C.shadowMd,
            position: "relative", overflow: "hidden",
            minHeight: 220,
          }}
        >
          {/* Subtle radial bg */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse at center, rgba(79,70,229,0.03) 0%, transparent 70%)",
          }} />

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                display: "flex", flexWrap: "wrap",
                gap: 16, alignItems: "center", justifyContent: "center",
                position: "relative", zIndex: 1,
              }}
              className="sd-tools-bubble-wall"
            >
              {filtered.map((tool, i) => (
                <ToolBubble key={tool.name} tool={tool} i={i} inView={inView} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Count badge */}
          <div style={{
            position: "absolute", bottom: 16, right: 20,
            display: "flex", alignItems: "center", gap: 8,
            padding: "6px 14px", borderRadius: 50,
            background: C.bgAccent, border: `1px solid ${C.border}`,
          }}>
            <CheckCircle2 style={{ width: 12, height: 12, color: C.primary }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: C.primary }}>
              {filtered.length} tools shown
            </span>
          </div>
        </motion.div>

        {/* Bottom methodology strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, ease: EASE }}
          className="sd-tools-method-strip"
          style={{
            marginTop: 20, display: "flex", flexWrap: "wrap",
            gap: 8, justifyContent: "center",
          }}
        >
          {["UVM 1.2", "SystemVerilog", "VHDL", "UPF / CPF", "SDC Constraints", "SPEF / SPICE", "GDS-II", "OA Database", "Tcl Scripting"].map((m, i) => (
            <motion.span
              key={m}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.62 + i * 0.04, ease: EASE }}
              whileHover={{ scale: 1.07, y: -2 }}
              style={{
                padding: "6px 15px", borderRadius: 50,
                background: "#fff", border: `1px solid ${C.border}`,
                fontSize: 12, color: C.textSecondary, fontWeight: 600,
                boxShadow: C.shadowSm, cursor: "default",
              }}
            >
              {m}
            </motion.span>
          ))}
        </motion.div>

      </div>

      <style>{`
        .sd-tools-section {
          padding: 72px 48px 64px;
        }
        @media (max-width: 900px) {
          .sd-tools-section {
            padding: 48px 24px 52px !important;
          }
          .sd-tools-cats-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .sd-tools-section {
            padding: 40px 16px 44px !important;
          }
          .sd-tools-cats-scroll {
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            margin-left: -16px;
            margin-right: -16px;
            padding: 0 16px 4px;
          }
          .sd-tools-cats-scroll::-webkit-scrollbar { display: none; }
          .sd-tools-cats-grid {
            display: flex !important;
            flex-wrap: nowrap !important;
            gap: 8px !important;
            min-width: min-content;
          }
          .sd-tools-cats-grid > button {
            flex: 0 0 140px;
            scroll-snap-align: start;
          }
          .sd-tools-bubble-wall {
            flex-wrap: nowrap !important;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            justify-content: flex-start !important;
            padding: 8px 4px 28px;
            gap: 20px !important;
          }
          .sd-tools-bubble-wall::-webkit-scrollbar { display: none; }
          .sd-tools-bubble-wall > div {
            scroll-snap-align: center;
          }
          .sd-tool-mobile-label {
            display: block !important;
          }
          .sd-tools-method-strip {
            flex-wrap: nowrap !important;
            overflow-x: auto;
            justify-content: flex-start !important;
            scrollbar-width: none;
            margin-left: -16px;
            margin-right: -16px;
            padding: 0 16px;
          }
          .sd-tools-method-strip::-webkit-scrollbar { display: none; }
          .sd-tools-method-strip > span {
            flex-shrink: 0;
          }
        }
      `}</style>
    </section>
  );
}