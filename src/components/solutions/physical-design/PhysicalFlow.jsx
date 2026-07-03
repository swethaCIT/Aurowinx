// PhysicalFlow.jsx — Physical Design Flow
// Responsive: Mobile/Tablet carousel + accordion, Desktop/TV grid layout
// Unique design: floating phase cards, animated connectors, image panels

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Layers, Cpu, Zap, CheckCircle2, ArrowRight, ChevronRight,
  ChevronDown, ChevronLeft,
} from "lucide-react";
import { C, FONT, EASE } from "./theme";

const PHASES = [
  {
    id: 0,
    tag: "Phase 01",
    title: "Synthesis",
    subtitle: "RTL → Gate-Level Netlist",
    color: "#4f46e5",
    bg: "#eef2ff",
    icon: <Layers style={{ width: 24, height: 24 }} />,
    img: "https://images.unsplash.com/photo-1759661881353-5b9cc55e1cf4?w=600&q=80",
    desc: "Transform RTL descriptions into optimized gate-level netlists with full DFT insertion, targeting area, timing and power constraints.",
    points: [
      { label: "Flat Synthesis",        sub: "Single-block full-chip netlist" },
      { label: "Hierarchical Synthesis", sub: "Block-level with top integration" },
      { label: "Logical Synthesis",     sub: "Technology-independent optimization" },
      { label: "Physical Synthesis",    sub: "Placement-aware netlist optimization" },
      { label: "DFT Insertion",         sub: "Scan chain & ATPG hooks" },
    ],
    outputs: ["Generic Netlist", "Low Power Netlist"],
  },
  {
    id: 1,
    tag: "Phase 02",
    title: "Place & Route",
    subtitle: "Netlist → Routed Layout",
    color: "#7c3aed",
    bg: "#f5f3ff",
    icon: <Cpu style={{ width: 24, height: 24 }} />,
    img: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=600&q=80",
    desc: "Full physical implementation from floorplanning through detailed routing — optimized for timing closure, power and signal integrity.",
    points: [
      { label: "Floorplanning & Power Planning", sub: "PDN, macro placement, voltage domains" },
      { label: "Placement Optimization",         sub: "Timing-driven & congestion-aware" },
      { label: "Clock Tree Synthesis",           sub: "CTS with skew optimization" },
      { label: "Routing (Global & Detailed)",    sub: "DRC-clean, SI-aware routing" },
      { label: "Timing Optimization & ECO",      sub: "Hold/setup closure, engineering change orders" },
      { label: "SI/PI & DRC/LVS Clean",          sub: "Signal/power integrity sign-off" },
    ],
    outputs: ["Flat PNR", "Hierarchical PNR"],
  },
  {
    id: 2,
    tag: "Phase 03",
    title: "Sign-Off",
    subtitle: "Layout → Tape-Out",
    color: "#0891b2",
    bg: "#ecfeff",
    icon: <Zap style={{ width: 24, height: 24 }} />,
    img: "https://images.unsplash.com/photo-1754039985001-ccafee437736?w=600&q=80",
    desc: "Comprehensive sign-off analysis covering timing, power, reliability and physical verification — ensuring first-pass tape-out success.",
    points: [
      { label: "STA Sign-Off",         sub: "Multi-corner multi-mode timing closure" },
      { label: "IR Drop & EM/INRUSH",  sub: "Power integrity and electromigration" },
      { label: "LEC / FV",             sub: "Logic equivalence checking" },
      { label: "PAFV & CLP",           sub: "Power-aware formal verification" },
      { label: "DRC / LVS / PV",       sub: "Physical rule checks, layout vs schematic" },
      { label: "Extraction & GDSII",   sub: "RC extraction, tape-out package" },
    ],
    outputs: ["Flat Sign-Off", "Hierarchical Sign-Off"],
  },
];

/* ── Responsive breakpoint hook ── */
function useViewport() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );
  useEffect(() => {
    let raf;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setWidth(window.innerWidth));
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);
  return {
    width,
    isMobile: width < 640,
    isTablet: width >= 640 && width < 1024,
    isCompact: width < 1024,
    isTV: width >= 1600,
  };
}

/* ── Floating background particles ── */
function Particles() {
  const pts = Array.from({ length: 20 }, (_, i) => ({
    x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    dur: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {pts.map((p, i) => (
        <motion.div key={i}
          style={{
            position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size, borderRadius: "50%",
            background: "rgba(79,70,229,0.25)",
          }}
          animate={{ y: [-12, 12, -12], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ── Phase tab button (desktop/TV row) ── */
function PhaseTab({ phase, active, onClick, i, inView }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
      onClick={onClick}
      style={{
        flex: 1, padding: "0", border: "none", cursor: "pointer",
        background: "transparent", fontFamily: FONT,
      }}
    >
      <motion.div
        animate={{
          background: active ? phase.color : "#fff",
          boxShadow: active ? `0 12px 40px ${phase.color}30` : C.shadowSm,
          y: active ? -4 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          borderRadius: 16, padding: "18px 20px",
          border: `1.5px solid ${active ? phase.color : C.borderLight}`,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          position: "relative", overflow: "hidden",
        }}
      >
        {active && (
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 2.5 }}
            style={{
              position: "absolute", width: 60, height: 60,
              borderRadius: "50%", background: "rgba(255,255,255,0.1)",
              pointerEvents: "none",
            }}
          />
        )}
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: active ? "rgba(255,255,255,0.18)" : phase.bg,
          color: active ? "#fff" : phase.color,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", zIndex: 1,
        }}>
          {phase.icon}
        </div>
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: active ? "rgba(255,255,255,0.7)" : C.textMuted }}>
            {phase.tag}
          </p>
          <p style={{ margin: "3px 0 0", fontSize: 15, fontWeight: 900, color: active ? "#fff" : C.textPrimary, letterSpacing: "-0.03em", fontFamily: FONT }}>
            {phase.title}
          </p>
          <p style={{ margin: "2px 0 0", fontSize: 11, color: active ? "rgba(255,255,255,0.65)" : C.textMuted, fontWeight: 500 }}>
            {phase.subtitle}
          </p>
        </div>
      </motion.div>
    </motion.button>
  );
}

/* ── Connector arrow (desktop/TV row) ── */
function Connector({ color, inView, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={inView ? { opacity: 1, scaleX: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
      style={{
        display: "flex", alignItems: "center",
        transformOrigin: "left", flexShrink: 0, marginTop: -8,
      }}
    >
      <div style={{ width: 32, height: 2, background: `linear-gradient(90deg, ${color}, #7c3aed)` }} />
      <ChevronRight style={{ width: 18, height: 18, color: "#7c3aed", marginLeft: -4 }} />
    </motion.div>
  );
}

/* ── Mobile / Tablet phase carousel card ── */
function PhaseCard({ phase, active, onClick, i, isMobile }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      style={{
        scrollSnapAlign: "center",
        flex: isMobile ? "0 0 78%" : "0 0 46%",
        minWidth: isMobile ? "78%" : "46%",
        border: "none", cursor: "pointer", background: "transparent",
        fontFamily: FONT, padding: 0,
      }}
    >
      <motion.div
        animate={{
          background: active ? phase.color : "#fff",
          boxShadow: active ? `0 16px 40px ${phase.color}35` : C.shadowSm,
          scale: active ? 1 : 0.96,
        }}
        transition={{ duration: 0.35, ease: EASE }}
        style={{
          borderRadius: 18, padding: "16px 16px",
          border: `1.5px solid ${active ? phase.color : C.borderLight}`,
          display: "flex", alignItems: "center", gap: 12,
          position: "relative", overflow: "hidden",
        }}
      >
        <div style={{
          width: 46, height: 46, borderRadius: 12, flexShrink: 0,
          background: active ? "rgba(255,255,255,0.18)" : phase.bg,
          color: active ? "#fff" : phase.color,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {phase.icon}
        </div>
        <div style={{ textAlign: "left" }}>
          <p style={{ margin: 0, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: active ? "rgba(255,255,255,0.7)" : C.textMuted }}>
            {phase.tag}
          </p>
          <p style={{ margin: "3px 0 0", fontSize: 16, fontWeight: 900, color: active ? "#fff" : C.textPrimary, letterSpacing: "-0.03em", fontFamily: FONT }}>
            {phase.title}
          </p>
          <p style={{ margin: "2px 0 0", fontSize: 11.5, color: active ? "rgba(255,255,255,0.65)" : C.textMuted, fontWeight: 500 }}>
            {phase.subtitle}
          </p>
        </div>
      </motion.div>
    </motion.button>
  );
}

/* ── Animated pagination dots ── */
function Dots({ count, active, onSelect, color }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Go to phase ${i + 1}`}
          style={{ border: "none", cursor: "pointer", padding: 0, background: "transparent" }}
        >
          <motion.div
            animate={{
              width: active === i ? 28 : 8,
              background: active === i ? color : C.borderLight,
            }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{ height: 8, borderRadius: 4 }}
          />
        </motion.button>
      ))}
    </div>
  );
}

/* ── Collapsible / dropdown section ── */
function CollapsibleSection({ title, color, bg, open, onToggle, children, count }) {
  return (
    <div style={{
      borderRadius: 14, overflow: "hidden",
      border: `1px solid ${color}25`, background: "#fff",
    }}>
      <motion.button
        onClick={onToggle}
        whileTap={{ scale: 0.98 }}
        style={{
          width: "100%", border: "none", cursor: "pointer",
          background: open ? bg : "#fff",
          padding: "14px 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          fontFamily: FONT, transition: "background 0.25s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 24, height: 24, borderRadius: 8,
            background: color, color: "#fff", fontSize: 11, fontWeight: 800,
          }}>
            {count}
          </span>
          <span style={{ fontSize: 13.5, fontWeight: 800, color: C.textPrimary, letterSpacing: "-0.01em" }}>
            {title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          style={{ color, display: "flex" }}
        >
          <ChevronDown style={{ width: 18, height: 18 }} />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "4px 12px 12px" }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Points list (shared) ── */
function PointsList({ points, color, bg }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
      {points.map((pt, j) => (
        <motion.div
          key={pt.label}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.04 * j, ease: EASE }}
          style={{
            display: "flex", alignItems: "flex-start", gap: 10,
            padding: "9px 12px", borderRadius: 10,
            background: j % 2 === 0 ? bg : "#fff",
            border: `1px solid ${color}15`,
          }}
        >
          <CheckCircle2 style={{ width: 14, height: 14, color, flexShrink: 0, marginTop: 1 }} />
          <div>
            <p style={{ margin: 0, fontSize: 12.5, fontWeight: 700, color: C.textPrimary }}>{pt.label}</p>
            <p style={{ margin: "1px 0 0", fontSize: 11, color: C.textMuted }}>{pt.sub}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Output chips (shared) ── */
function OutputChips({ outputs, color, bg }) {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      {outputs.map((out, i) => (
        <motion.div
          key={out}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 + i * 0.08 }}
          style={{
            flex: 1, padding: "12px 14px", borderRadius: 12,
            background: bg, border: `1.5px solid ${color}30`,
            textAlign: "center",
          }}
        >
          <ArrowRight style={{ width: 14, height: 14, color, marginBottom: 4 }} />
          <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color, letterSpacing: "-0.01em" }}>{out}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Desktop / TV detail panel (side-by-side) ── */
function DetailPanel({ phase }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={phase.id}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.45, ease: EASE }}
        style={{
          display: "grid", gridTemplateColumns: "1fr 1.1fr",
          gap: 24, alignItems: "stretch",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{
            borderRadius: 20, overflow: "hidden", position: "relative",
            flex: 1, minHeight: 300,
            boxShadow: `0 16px 48px ${phase.color}20`,
          }}>
            <img src={phase.img} alt={phase.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(135deg, ${phase.color}40 0%, rgba(0,0,0,0.45) 100%)`,
            }} />
            <div style={{ position: "absolute", top: 16, left: 16 }}>
              <span style={{
                padding: "5px 14px", borderRadius: 50,
                background: phase.color, color: "#fff",
                fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
              }}>
                {phase.tag}
              </span>
            </div>
            <div style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
              <p style={{ margin: 0, fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", fontFamily: FONT }}>
                {phase.title}
              </p>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                {phase.subtitle}
              </p>
            </div>
          </div>

          <div style={{ marginTop: 14, flexShrink: 0 }}>
            <OutputChips outputs={phase.outputs} color={phase.color} bg={phase.bg} />
          </div>
        </div>

        <div style={{
          background: "#fff", borderRadius: 20, padding: "24px 22px",
          border: `1px solid ${C.borderLight}`, boxShadow: C.shadowMd,
        }}>
          <div style={{ height: 3, background: `linear-gradient(90deg, ${phase.color}, ${phase.color}40)`, borderRadius: 2, marginBottom: 18 }} />
          <p style={{ fontSize: 13.5, color: C.textSecondary, lineHeight: 1.85, margin: "0 0 20px" }}>
            {phase.desc}
          </p>
          <PointsList points={phase.points} color={phase.color} bg={phase.bg} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Mobile / Tablet detail panel (stacked + accordion) ── */
function CompactDetailPanel({ phase, isTablet }) {
  const [open, setOpen] = useState(isTablet); // open by default on tablet, closed on mobile

  // Re-evaluate default open state per phase + breakpoint
  useEffect(() => {
    setOpen(isTablet);
  }, [phase.id, isTablet]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={phase.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.4, ease: EASE }}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        {/* Image */}
        <div style={{
          borderRadius: 18, overflow: "hidden", position: "relative",
          height: isTablet ? 220 : 180,
          boxShadow: `0 12px 36px ${phase.color}20`,
        }}>
          <img src={phase.img} alt={phase.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(135deg, ${phase.color}40 0%, rgba(0,0,0,0.45) 100%)`,
          }} />
          <div style={{ position: "absolute", top: 14, left: 14 }}>
            <span style={{
              padding: "5px 12px", borderRadius: 50,
              background: phase.color, color: "#fff",
              fontSize: 9.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
            }}>
              {phase.tag}
            </span>
          </div>
          <div style={{ position: "absolute", bottom: 14, left: 14, right: 14 }}>
            <p style={{ margin: 0, fontSize: 19, fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", fontFamily: FONT }}>
              {phase.title}
            </p>
            <p style={{ margin: "3px 0 0", fontSize: 11.5, color: "rgba(255,255,255,0.7)" }}>
              {phase.subtitle}
            </p>
          </div>
        </div>

        {/* Output chips */}
        <OutputChips outputs={phase.outputs} color={phase.color} bg={phase.bg} />

        {/* Description card */}
        <div style={{
          background: "#fff", borderRadius: 16, padding: "16px 16px",
          border: `1px solid ${C.borderLight}`, boxShadow: C.shadowSm,
        }}>
          <div style={{ height: 3, width: 36, background: phase.color, borderRadius: 2, marginBottom: 10 }} />
          <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.75, margin: 0 }}>
            {phase.desc}
          </p>
        </div>

        {/* Dropdown / accordion for implementation points */}
        <CollapsibleSection
          title="Implementation Details"
          color={phase.color}
          bg={phase.bg}
          open={open}
          onToggle={() => setOpen((o) => !o)}
          count={phase.points.length}
        >
          <PointsList points={phase.points} color={phase.color} bg={phase.bg} />
        </CollapsibleSection>
      </motion.div>
    </AnimatePresence>
  );
}

export default function PhysicalFlow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(0);
  const { isMobile, isTablet, isCompact, isTV } = useViewport();

  const carouselRef = useRef(null);
  const scrollTimeout = useRef(null);

  // Scroll carousel to the active card (snap-center)
  const scrollToIndex = (index) => {
    const container = carouselRef.current;
    if (!container) return;
    const card = container.children[index];
    if (!card) return;
    const target = card.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2;
    container.scrollTo({ left: target, behavior: "smooth" });
  };

  useEffect(() => {
    if (isCompact) scrollToIndex(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, isCompact]);

  // Detect active card from manual scroll/swipe
  const handleScroll = () => {
    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      const container = carouselRef.current;
      if (!container) return;
      let closest = 0, minDist = Infinity;
      Array.from(container.children).forEach((child, i) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const containerCenter = container.scrollLeft + container.offsetWidth / 2;
        const dist = Math.abs(childCenter - containerCenter);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setActive((prev) => (prev === closest ? prev : closest));
    }, 80);
  };

  const goPrev = () => setActive((a) => Math.max(0, a - 1));
  const goNext = () => setActive((a) => Math.min(PHASES.length - 1, a + 1));

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(160deg, #f8fafc 0%, #f1f5f9 100%)",
        padding: isMobile
          ? "40px 16px 40px"
          : isTablet
          ? "52px 28px 48px"
          : "clamp(56px, 6vw, 88px) clamp(32px, 5vw, 80px) clamp(48px, 5vw, 72px)",
        position: "relative", overflow: "hidden", fontFamily: FONT,
      }}
    >
      {/* Bg particles */}
      <Particles />

      {/* Grid bg */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(79,70,229,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,0.03) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />

      <div style={{
        maxWidth: isTV ? 1760 : 1280,
        margin: "0 auto", position: "relative", zIndex: 1,
      }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ textAlign: "center", marginBottom: isMobile ? 28 : 40 }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
            <span style={{ color: C.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Our Flow</span>
            <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, ${C.primary}, transparent)` }} />
          </div>
          <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)", fontWeight: 900, color: C.textPrimary, margin: "0 0 10px", letterSpacing: "-0.04em", fontFamily: FONT }}>
            Physical Design Expertise
          </h2>
          <p style={{ color: C.textSecondary, fontSize: "clamp(13px, 1.4vw, 16px)", maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>
            Three-phase flow from RTL to GDSII — {isCompact ? "swipe to explore each phase." : "click each phase to explore what we deliver."}
          </p>
        </motion.div>

        {isCompact ? (
          <>
            {/* Mobile / Tablet carousel */}
            <div style={{ position: "relative", marginBottom: 6 }}>
              {isTablet && (
                <>
                  <button
                    onClick={goPrev}
                    disabled={active === 0}
                    aria-label="Previous phase"
                    style={{
                      position: "absolute", left: -6, top: "50%", transform: "translateY(-50%)",
                      zIndex: 2, width: 36, height: 36, borderRadius: "50%",
                      border: `1px solid ${C.borderLight}`, background: "#fff",
                      boxShadow: C.shadowSm, display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: active === 0 ? "default" : "pointer",
                      opacity: active === 0 ? 0.4 : 1,
                    }}
                  >
                    <ChevronLeft style={{ width: 18, height: 18, color: C.textPrimary }} />
                  </button>
                  <button
                    onClick={goNext}
                    disabled={active === PHASES.length - 1}
                    aria-label="Next phase"
                    style={{
                      position: "absolute", right: -6, top: "50%", transform: "translateY(-50%)",
                      zIndex: 2, width: 36, height: 36, borderRadius: "50%",
                      border: `1px solid ${C.borderLight}`, background: "#fff",
                      boxShadow: C.shadowSm, display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: active === PHASES.length - 1 ? "default" : "pointer",
                      opacity: active === PHASES.length - 1 ? 0.4 : 1,
                    }}
                  >
                    <ChevronRight style={{ width: 18, height: 18, color: C.textPrimary }} />
                  </button>
                </>
              )}

              <div
                ref={carouselRef}
                onScroll={handleScroll}
                style={{
                  display: "flex", gap: 12,
                  overflowX: "auto",
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "none",
                  paddingBottom: 4,
                  paddingLeft: isMobile ? "11%" : 0,
                  paddingRight: isMobile ? "11%" : 0,
                }}
              >
                <style>{`
                  div::-webkit-scrollbar { display: none; }
                `}</style>
                {PHASES.map((phase, i) => (
                  <PhaseCard
                    key={phase.id}
                    phase={phase}
                    active={active === i}
                    onClick={() => setActive(i)}
                    i={i}
                    isMobile={isMobile}
                  />
                ))}
              </div>
            </div>

            <Dots count={PHASES.length} active={active} onSelect={setActive} color={PHASES[active].color} />

            {/* Detail content */}
            <div style={{ marginTop: 22 }}>
              <CompactDetailPanel phase={PHASES[active]} isTablet={isTablet} />
            </div>
          </>
        ) : (
          <>
            {/* Desktop / TV phase tabs with connectors */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
              {PHASES.map((phase, i) => (
                <div key={phase.id} style={{ display: "flex", alignItems: "center", flex: "1 1 0", gap: 8 }}>
                  <PhaseTab phase={phase} active={active === i} onClick={() => setActive(i)} i={i} inView={inView} />
                  {i < PHASES.length - 1 && (
                    <Connector color={phase.color} inView={inView} delay={0.4 + i * 0.15} />
                  )}
                </div>
              ))}
            </div>

            {/* Detail panel */}
            <DetailPanel phase={PHASES[active]} />
          </>
        )}
      </div>
    </section>
  );
}