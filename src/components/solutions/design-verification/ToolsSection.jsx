// ToolsSection.jsx
// AurowinX — Tools & Capabilities
// Responsive: mobile carousel | tablet carousel+caps | laptop/TV side-by-side

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { C, FONT, EASE } from "./theme";

/* ─── useBreakpoint ─────────────────────────── */
function useBreakpoint() {
  const [bp, setBp] = useState("laptop");
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w <= 640)       setBp("mobile");
      else if (w <= 1024) setBp("tablet");
      else if (w >= 1600) setBp("tv");
      else                setBp("laptop");
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return bp;
}

/* ─── data ──────────────────────────────────── */
const TOOL_CATEGORIES = [
  {
    label: "Simulators",
    color: "#4f46e5", bg: "#eef2ff",
    glow: { base: "#4f46e5", ambient: "#4f46e5" },
    tools: ["Synopsys VCS", "Cadence Xcelium", "Siemens Questa", "Riviera-PRO", "Mentor VSim"],
  },
  {
    label: "Debug & Waveform",
    color: "#7c3aed", bg: "#f5f3ff",
    glow: { base: "#7c3aed", ambient: "#7c3aed" },
    tools: ["Verdi", "SimVision", "DVE", "GTKWave"],
  },
  {
    label: "Formal Verification",
    color: "#0891b2", bg: "#ecfeff",
    glow: { base: "#0891b2", ambient: "#0891b2" },
    tools: ["JasperGold", "SymbiYosys", "VC Formal", "Z01X", "ProofCore", "Conformal"],
  },
  {
    label: "Coverage & Closure",
    color: "#059669", bg: "#ecfdf5",
    glow: { base: "#059669", ambient: "#059669" },
    tools: ["Cadence vManager", "SpyGlass", "Synopsys Verdi Coverage"],
  },
  {
    label: "CDC / RDC",
    color: "#d97706", bg: "#fffbeb",
    glow: { base: "#d97706", ambient: "#d97706" },
    tools: ["SpyGlass CDC", "Questa CDC", "JasperGold CDC"],
  },
  {
    label: "Methodology",
    color: "#dc2626", bg: "#fef2f2",
    glow: { base: "#dc2626", ambient: "#dc2626" },
    tools: ["UVM 1.2", "OVM", "VMM", "SystemVerilog", "SVA"],
  },
];

const CAPABILITIES = [
  "UVM Testbench Development",
  "Constrained Random Verification",
  "Assertion Based Verification (SVA)",
  "Functional & Code Coverage",
  "Clock Domain Crossing (CDC)",
  "Formal Property Verification",
  "Gate-Level Simulation (GLS)",
  "Hardware Emulation & Prototyping",
  "Regression Management",
  "Co-Verification (HW/SW)",
];

const SPRING = { type: "spring", stiffness: 260, damping: 22 };

/* ─── ToolChip ───────────────────────────────── */
function ToolChip({ tool, i, inView, color, bg }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...SPRING, delay: 0.08 + i * 0.035 }}
      whileHover={{ scale: 1.07, y: -2, transition: { duration: 0.15 } }}
      style={{
        display: "inline-block",
        padding: "5px 12px",
        borderRadius: 50,
        background: bg,
        color,
        fontSize: 12,
        fontWeight: 600,
        border: `1px solid ${color}28`,
        cursor: "default",
        whiteSpace: "nowrap",
      }}
    >
      {tool}
    </motion.span>
  );
}

/* ─── CategoryCard ───────────────────────────── */
function CategoryCard({ cat, ci, inView, compact = false }) {
  const { color, bg, glow, label, tools } = cat;
  return (
    <motion.div
      initial={{ opacity: 0, y: compact ? 0 : 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...SPRING, delay: compact ? 0 : ci * 0.08 }}
      whileHover="glowing"
      style={{ position: "relative", height: "100%" }}
    >
      {/* Glow ring */}
      <motion.div
        variants={{ glowing: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute", inset: 0, borderRadius: 14,
          pointerEvents: "none",
          boxShadow: `0 0 0 1.5px ${glow.base}, 0 0 28px 4px ${glow.ambient}44, 0 0 56px 10px ${glow.ambient}1a`,
          zIndex: 0,
        }}
      />
      {/* Ambient blob */}
      <div style={{
        position: "absolute", top: -30, right: -30,
        width: 90, height: 90, borderRadius: "50%",
        background: `${color}12`, filter: "blur(22px)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <motion.div
        variants={{ glowing: { y: -4, transition: { ...SPRING } } }}
        style={{
          background: "#fff", borderRadius: 14,
          padding: compact ? "18px 16px" : "16px 18px",
          border: `1px solid ${C.borderLight}`, boxShadow: C.shadowSm,
          position: "relative", zIndex: 1, overflow: "hidden",
          height: "100%", boxSizing: "border-box",
        }}
      >
        {/* Accent bar */}
        <motion.div
          variants={{ glowing: { scaleY: 1, opacity: 1 } }}
          initial={{ scaleY: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: "absolute", left: 0, top: "20%", bottom: "20%",
            width: 3, borderRadius: "0 3px 3px 0",
            background: `linear-gradient(180deg, ${color}, ${color}66)`,
            transformOrigin: "top",
          }}
        />
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <motion.div
            variants={{ glowing: { scale: 1.3, boxShadow: `0 0 8px 2px ${color}55` } }}
            style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }}
          />
          <span style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {label}
          </span>
        </div>
        {/* Chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {tools.map((tool, ti) => (
            <ToolChip key={tool} tool={tool} i={compact ? ti : ci * 6 + ti} inView={inView} color={color} bg={bg} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── CapabilityRow ──────────────────────────── */
function CapabilityRow({ cap, i, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...SPRING, delay: 0.1 + i * 0.07 }}
      whileHover={{ x: 5, transition: { duration: 0.15 } }}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "9px 12px", borderRadius: 10,
        background: i % 2 === 0 ? C.bgAccent : "#fff",
        border: `1px solid ${C.borderLight}`,
        cursor: "default",
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ ...SPRING, delay: 0.18 + i * 0.07 }}
      >
        <CheckCircle2 style={{ width: 14, height: 14, color: C.primary, flexShrink: 0, display: "block" }} />
      </motion.div>
      <span style={{ fontSize: 13, color: C.textPrimary, fontWeight: 600 }}>{cap}</span>
    </motion.div>
  );
}

/* ─── CapabilitiesPanel ──────────────────────── */
function CapabilitiesPanel({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...SPRING, delay: 0.05 }}
      style={{
        background: "#fff", borderRadius: 20, padding: "24px 20px",
        border: `1px solid ${C.borderLight}`, boxShadow: C.shadowMd,
        display: "flex", flexDirection: "column",
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <div style={{ width: 20, height: 2, background: C.primary, borderRadius: 1 }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: C.primary, letterSpacing: "0.16em", textTransform: "uppercase" }}>What We Do</span>
        </div>
        <h3 style={{ fontSize: 17, fontWeight: 900, color: C.textPrimary, margin: 0, letterSpacing: "-0.03em", fontFamily: FONT }}>
          Verification Capabilities
        </h3>
      </div>

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, gap: 0 }}>
        {CAPABILITIES.map((cap, i) => (
          <CapabilityRow key={cap} cap={cap} i={i} inView={inView} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ ...SPRING, delay: 0.1 + CAPABILITIES.length * 0.07 }}
        style={{ display: "flex", gap: 8, marginTop: 14 }}
      >
        {["16+ Tools", "10+ Capabilities"].map((label) => (
          <span key={label} style={{
            flex: 1, textAlign: "center",
            padding: "8px 0", borderRadius: 10,
            background: C.gradPrimary,
            fontSize: 12, fontWeight: 700, color: "#fff",
            letterSpacing: "0.02em",
          }}>{label}</span>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ─── ToolsCarousel ──────────────────────────── */
const SLIDE_VARIANTS = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 64 : -64, scale: 0.97 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit:  (dir) => ({ opacity: 0, x: dir > 0 ? -64 : 64, scale: 0.97 }),
};

function ToolsCarousel({ inView }) {
  const [[page, dir], setPage] = useState([0, 0]);
  const total = TOOL_CATEGORIES.length;
  const touchStart = useRef(null);

  const paginate = (newDir) => setPage(([p]) => [(p + newDir + total) % total, newDir]);

  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStart.current === null) return;
    const delta = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) paginate(delta > 0 ? 1 : -1);
    touchStart.current = null;
  };

  const cat = TOOL_CATEGORIES[page];

  return (
    <div>
      {/* Slide window */}
      <div
        style={{ position: "relative", overflow: "hidden", minHeight: 180, touchAction: "pan-y" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence initial={false} custom={dir} mode="wait">
          <motion.div
            key={page}
            custom={dir}
            variants={SLIDE_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.36, ease: [0.32, 0.72, 0, 1] }}
            style={{ width: "100%" }}
          >
            <CategoryCard cat={cat} ci={page} inView={inView} compact />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 14, marginTop: 18,
      }}>
        {/* Prev */}
        <motion.button
          onClick={() => paginate(-1)}
          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
          style={{
            width: 36, height: 36, borderRadius: "50%",
            border: `1.5px solid ${C.borderLight}`,
            background: "#fff", color: C.textPrimary,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: C.shadowSm,
          }}
        >
          <ChevronLeft style={{ width: 15, height: 15 }} />
        </motion.button>

        {/* Pill dots */}
        <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
          {TOOL_CATEGORIES.map((c, i) => (
            <motion.button
              key={i}
              onClick={() => setPage([i, i > page ? 1 : -1])}
              animate={{
                width: i === page ? 20 : 7,
                background: i === page ? c.color : "#cbd5e1",
              }}
              transition={{ duration: 0.28, ease: EASE }}
              style={{
                height: 7, borderRadius: 50,
                border: "none", cursor: "pointer", padding: 0,
              }}
            />
          ))}
        </div>

        {/* Next */}
        <motion.button
          onClick={() => paginate(1)}
          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
          style={{
            width: 36, height: 36, borderRadius: "50%",
            border: `1.5px solid ${C.borderLight}`,
            background: "#fff", color: C.textPrimary,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: C.shadowSm,
          }}
        >
          <ChevronRight style={{ width: 15, height: 15 }} />
        </motion.button>
      </div>

      {/* Counter + label */}
      <p style={{
        textAlign: "center", marginTop: 8,
        fontSize: 11, color: C.textMuted, fontWeight: 600,
        letterSpacing: "0.1em", textTransform: "uppercase",
      }}>
        {page + 1} / {total} — {cat.label}
      </p>
    </div>
  );
}

/* ─── MAIN ───────────────────────────────────── */
export default function ToolsSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const bp     = useBreakpoint();

  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const isTV     = bp === "tv";
  const isSmall  = isMobile || isTablet;

  const sectionPad = isMobile
    ? "64px 20px 52px"
    : isTablet
    ? "72px 32px 60px"
    : isTV
    ? "100px 80px 80px"
    : "64px 48px 56px";

  return (
    <section
      ref={ref}
      style={{
        background: "#fff",
        padding: sectionPad,
        position: "relative",
        overflow: "hidden",
        fontFamily: FONT,
      }}
    >
      {/* Dot grid bg */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(79,70,229,0.05) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      <div style={{ maxWidth: isTV ? 1600 : 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...SPRING, delay: 0 }}
          style={{ textAlign: "center", marginBottom: isMobile ? 28 : 44 }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
            <span style={{ color: C.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Tool Ecosystem</span>
            <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, ${C.primary}, transparent)` }} />
          </div>
          <h2 style={{
            fontSize: isMobile ? "clamp(1.6rem, 7vw, 2rem)" : "clamp(1.8rem, 3.5vw, 2.6rem)",
            fontWeight: 900, color: C.textPrimary,
            margin: "0 0 10px", letterSpacing: "-0.04em", fontFamily: FONT,
          }}>
            Tools & Capabilities
          </h2>
          <p style={{ color: C.textSecondary, fontSize: isMobile ? 13 : 14, maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
            Industry-standard EDA tools combined with deep methodology expertise across every verification domain.
          </p>
        </motion.div>

        {/* ══════════════════════════════════════
            MOBILE — carousel + capabilities below
        ══════════════════════════════════════ */}
        {isMobile && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <ToolsCarousel inView={inView} />
            <CapabilitiesPanel inView={inView} />
          </div>
        )}

        {/* ══════════════════════════════════════
            TABLET — carousel left, capabilities right
        ══════════════════════════════════════ */}
        {isTablet && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            alignItems: "start",
          }}>
            <div>
              <ToolsCarousel inView={inView} />
            </div>
            <CapabilitiesPanel inView={inView} />
          </div>
        )}

        {/* ══════════════════════════════════════
            LAPTOP / TV — original side-by-side grid
        ══════════════════════════════════════ */}
        {!isSmall && (
          <div style={{
            display: "grid",
            gridTemplateColumns: isTV ? "1.5fr 1fr" : "1.4fr 1fr",
            gap: 24,
            alignItems: "stretch",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {TOOL_CATEGORIES.map((cat, ci) => (
                <CategoryCard key={cat.label} cat={cat} ci={ci} inView={inView} />
              ))}
            </div>
            <div style={{ alignSelf: "stretch", display: "flex", flexDirection: "column" }}>
              <CapabilitiesPanel inView={inView} />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}