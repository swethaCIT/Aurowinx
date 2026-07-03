// FoundriesAndTools.jsx — Company Page
// AurowinX — Process Nodes & Foundry Support
// Desktop/TV: 4-col grid with image cards
// Mobile/Tablet: swipeable drag carousel + animated node chips accordion
// Capabilities strip stacks cleanly on all breakpoints

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CheckCircle2, Cpu, Zap, Shield, Layers, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { C, FONT, EASE } from "./theme";

const FOUNDRIES = [
  {
    name: "TSMC",
    color: "#4f46e5",
    bg: "#eef2ff",
    nodes: ["5nm", "7nm", "12nm", "16nm", "28nm", "40nm", "65nm"],
    desc: "Industry-leading foundry with advanced FinFET and 2.5D/3D integration support.",
    icon: <Cpu style={{ width: 20, height: 20 }} />,
    img: "https://images.unsplash.com/photo-1748002388689-c62b45d5c28b?w=600&q=80",
    highlight: "5nm FinFET",
  },
  {
    name: "Samsung",
    color: "#7c3aed",
    bg: "#f5f3ff",
    nodes: ["5nm", "8nm", "14nm", "28nm", "65nm"],
    desc: "Advanced GAA and FinFET processes with robust multi-patterning support.",
    icon: <Layers style={{ width: 20, height: 20 }} />,
    img: "https://images.unsplash.com/photo-1668600418844-5b3d2e381e10?w=600&q=80",
    highlight: "GAA 3nm",
  },
  {
    name: "GlobalFoundries",
    color: "#0891b2",
    bg: "#ecfeff",
    nodes: ["12nm", "14nm", "22nm", "28nm", "55nm", "130nm", "180nm"],
    desc: "Specialised in RF, embedded memory and automotive-grade processes.",
    icon: <Shield style={{ width: 20, height: 20 }} />,
    img: "https://images.unsplash.com/photo-1717962688747-7e13dfa31538?w=600&q=80",
    highlight: "22FDX FD-SOI",
  },
  {
    name: "UMC",
    color: "#059669",
    bg: "#ecfdf5",
    nodes: ["28nm", "40nm", "55nm", "65nm", "90nm", "130nm", "180nm"],
    desc: "Cost-effective mature nodes for IoT, consumer and industrial applications.",
    icon: <Zap style={{ width: 20, height: 20 }} />,
    img: "https://images.unsplash.com/photo-1561972465-05c968dc2c91?w=600&q=80",
    highlight: "28nm HPC+",
  },
];

const CAPABILITIES = [
  { label: "Flat PNR Flow",          color: "#4f46e5" },
  { label: "Hierarchical PNR Flow",  color: "#7c3aed" },
  { label: "Multi-Patterning",       color: "#0891b2" },
  { label: "Flip Chip",              color: "#059669" },
  { label: "Wire Bond",              color: "#d97706" },
  { label: "Low Power Design",       color: "#dc2626" },
  { label: "FinFET / GAA Support",   color: "#4f46e5" },
  { label: "2.5D / 3D Integration",  color: "#7c3aed" },
];

/* ─────────────────────────────────────────────
   RESPONSIVE HOOK
───────────────────────────────────────────── */
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
    isMobile: width < 640,
    isTablet: width >= 640 && width < 1024,
    isCompact: width < 1024,
    isTV: width >= 1600,
  };
}

/* ─────────────────────────────────────────────
   SLIDE VARIANTS
───────────────────────────────────────────── */
const slideVariants = {
  enter:  (dir) => ({ opacity: 0, x: dir > 0 ? 48 : -48 }),
  center: { opacity: 1, x: 0 },
  exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -48 : 48 }),
};

/* ─────────────────────────────────────────────
   DESKTOP/TV — FOUNDRY CARD (image header + nodes)
───────────────────────────────────────────── */
function FoundryCard({ f, i, inView, isTV }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
      whileHover={{ y: -6, boxShadow: `0 20px 52px ${f.color}18` }}
      style={{
        background: "#fff", borderRadius: 20, overflow: "hidden",
        border: `1px solid ${C.borderLight}`, boxShadow: C.shadowMd,
        cursor: "default", transition: "box-shadow 0.3s",
      }}
    >
      {/* Image header */}
      <div style={{ position: "relative", height: isTV ? 170 : 140, overflow: "hidden" }}>
        <motion.img
          src={f.img} alt={f.name}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.5 }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, ${f.color}60 0%, rgba(0,0,0,0.40) 100%)`,
        }} />
        <div style={{ position: "absolute", bottom: 14, left: 16, right: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <p style={{ margin: 0, fontSize: isTV ? 26 : 22, fontWeight: 900, color: "#fff", fontFamily: FONT, letterSpacing: "-0.04em" }}>
            {f.name}
          </p>
          <span style={{
            padding: "4px 12px", borderRadius: 50,
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(10px)",
            color: "#fff", fontSize: 10, fontWeight: 700,
            border: "1px solid rgba(255,255,255,0.25)",
            letterSpacing: "0.08em",
          }}>
            {f.highlight}
          </span>
        </div>
        <motion.div
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: EASE }}
          style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, ${f.color}, ${f.color}60)`,
            transformOrigin: "left",
          }}
        />
      </div>

      <div style={{ padding: isTV ? "22px 22px 24px" : "18px 18px 20px" }}>
        <p style={{ fontSize: isTV ? 13.5 : 12.5, color: C.textSecondary, lineHeight: 1.75, margin: "0 0 16px" }}>
          {f.desc}
        </p>
        <p style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 10px" }}>
          Supported Nodes
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {f.nodes.map((node, j) => (
            <motion.span
              key={node}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.35 + i * 0.08 + j * 0.04, ease: EASE }}
              whileHover={{ scale: 1.08, y: -2 }}
              style={{
                padding: "4px 11px", borderRadius: 50,
                background: f.bg, color: f.color,
                fontSize: 11, fontWeight: 700,
                border: `1px solid ${f.color}25`,
                cursor: "default",
              }}
            >
              {node}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MOBILE/TABLET — CAROUSEL CARD
───────────────────────────────────────────── */
function FoundryCarousel({ isMobile }) {
  const [active, setActive]     = useState(0);
  const [direction, setDirection] = useState(1);
  const [nodesOpen, setNodesOpen] = useState(true);

  const f = FOUNDRIES[active];

  const go = (i) => {
    if (i < 0 || i >= FOUNDRIES.length) return;
    setDirection(i > active ? 1 : -1);
    setActive(i);
  };

  return (
    <div>
      {/* Slide */}
      <div style={{ position: "relative", overflow: "hidden", borderRadius: 20 }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.34, ease: EASE }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(active + 1);
              else if (info.offset.x > 60) go(active - 1);
            }}
            style={{ touchAction: "pan-y", borderRadius: 20, overflow: "hidden", background: "#fff", border: `1px solid ${C.borderLight}`, boxShadow: C.shadowMd }}
          >
            {/* Image header — shorter on mobile */}
            <div style={{ position: "relative", height: isMobile ? 160 : 200, overflow: "hidden" }}>
              <img
                src={f.img} alt={f.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(135deg, ${f.color}70 0%, rgba(0,0,0,0.45) 100%)`,
              }} />
              {/* Top color bar */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${f.color}, ${f.color}60)`,
              }} />

              {/* Name + badge */}
              <div style={{ position: "absolute", bottom: 16, left: 18, right: 18, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <p style={{ margin: 0, fontSize: isMobile ? 24 : 28, fontWeight: 900, color: "#fff", fontFamily: FONT, letterSpacing: "-0.04em" }}>
                  {f.name}
                </p>
                <span style={{
                  padding: "4px 12px", borderRadius: 50,
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                  color: "#fff", fontSize: 10, fontWeight: 700,
                  border: "1px solid rgba(255,255,255,0.28)",
                  letterSpacing: "0.08em",
                }}>
                  {f.highlight}
                </span>
              </div>

              {/* Slide counter */}
              <div style={{
                position: "absolute", top: 14, right: 16,
                fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.7)",
                letterSpacing: "0.12em",
              }}>
                {String(active + 1).padStart(2, "0")} / {String(FOUNDRIES.length).padStart(2, "0")}
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: isMobile ? "18px 18px 20px" : "22px 24px 24px" }}>
              <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.78, margin: "0 0 16px" }}>
                {f.desc}
              </p>

              {/* Nodes accordion */}
              <button
                onClick={() => setNodesOpen((o) => !o)}
                style={{
                  width: "100%",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: nodesOpen ? f.bg : C.bgSoft ?? "#f8fafc",
                  border: `1px solid ${nodesOpen ? f.color + "30" : C.borderLight}`,
                  borderRadius: 10,
                  padding: "10px 14px",
                  cursor: "pointer",
                  fontFamily: FONT,
                  marginBottom: nodesOpen ? 0 : 0,
                  transition: "background 0.25s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: 6,
                    background: f.color, color: "#fff",
                    fontSize: 10, fontWeight: 800,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {f.nodes.length}
                  </span>
                  <span style={{ fontSize: 12.5, fontWeight: 800, color: C.textPrimary, letterSpacing: "-0.01em" }}>
                    Supported Nodes
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: nodesOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  style={{ color: f.color, display: "flex" }}
                >
                  <ChevronDown style={{ width: 16, height: 16 }} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {nodesOpen && (
                  <motion.div
                    key="nodes"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{
                      display: "flex", flexWrap: "wrap", gap: 7,
                      padding: "12px 0 4px",
                    }}>
                      {f.nodes.map((node, j) => (
                        <motion.span
                          key={node}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: j * 0.04, ease: EASE }}
                          style={{
                            padding: "5px 13px", borderRadius: 50,
                            background: f.bg, color: f.color,
                            fontSize: 12, fontWeight: 700,
                            border: `1px solid ${f.color}25`,
                          }}
                        >
                          {node}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots + arrows */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 18 }}>
        <button
          onClick={() => go(active - 1)}
          disabled={active === 0}
          style={{
            width: 32, height: 32, borderRadius: 8,
            border: `1px solid ${C.borderLight}`,
            background: active === 0 ? "transparent" : "#fff",
            cursor: active === 0 ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: active === 0 ? 0.3 : 1,
          }}
        >
          <ChevronLeft style={{ width: 14, height: 14, color: C.textSecondary }} />
        </button>

        <div style={{ display: "flex", gap: 7 }}>
          {FOUNDRIES.map((ff, i) => (
            <button
              key={ff.name}
              onClick={() => go(i)}
              style={{ border: "none", background: "transparent", padding: 4, cursor: "pointer" }}
            >
              <motion.span
                animate={{
                  width: i === active ? (isMobile ? 20 : 24) : 6,
                  background: i === active ? f.color : C.border,
                }}
                transition={{ duration: 0.3, ease: EASE }}
                style={{ display: "block", height: 6, borderRadius: 3 }}
              />
            </button>
          ))}
        </div>

        <button
          onClick={() => go(active + 1)}
          disabled={active === FOUNDRIES.length - 1}
          style={{
            width: 32, height: 32, borderRadius: 8,
            border: `1px solid ${C.borderLight}`,
            background: active === FOUNDRIES.length - 1 ? "transparent" : "#fff",
            cursor: active === FOUNDRIES.length - 1 ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: active === FOUNDRIES.length - 1 ? 0.3 : 1,
          }}
        >
          <ChevronRight style={{ width: 14, height: 14, color: C.textSecondary }} />
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MOBILE/TABLET — CAPABILITIES ACCORDION
───────────────────────────────────────────── */
function CapabilitiesAccordion() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      background: "#fff", borderRadius: 18,
      border: `1px solid ${C.borderLight}`, boxShadow: C.shadowMd,
      overflow: "hidden",
    }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%", padding: "16px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: open ? C.bgAccent ?? "#f8fafc" : "#fff",
          border: "none", cursor: "pointer", fontFamily: FONT,
          transition: "background 0.25s ease",
        }}
      >
        <div>
          <p style={{ margin: 0, fontWeight: 900, fontSize: 14.5, color: C.textPrimary, letterSpacing: "-0.02em", textAlign: "left" }}>
            PNR Capabilities
          </p>
          <p style={{ margin: "2px 0 0", fontSize: 11.5, color: C.textMuted, textAlign: "left" }}>
            {CAPABILITIES.length} supported flows & techniques
          </p>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          style={{ color: C.primary, display: "flex", flexShrink: 0 }}
        >
          <ChevronDown style={{ width: 18, height: 18 }} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="caps"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "12px 20px 20px", display: "flex", flexWrap: "wrap", gap: 8 }}>
              {CAPABILITIES.map((cap, i) => (
                <motion.div
                  key={cap.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04, ease: EASE }}
                  style={{
                    display: "flex", alignItems: "center", gap: 7,
                    padding: "7px 14px", borderRadius: 50,
                    background: C.bgAccent ?? "#f8fafc",
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <CheckCircle2 style={{ width: 12, height: 12, color: cap.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: C.textSecondary, fontWeight: 600 }}>{cap.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ROOT COMPONENT
───────────────────────────────────────────── */
export default function TechNodes() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { isMobile, isTablet, isCompact, isTV } = useViewport();

  const horizPad = isMobile ? "16px" : isTablet ? "24px" : "48px";
  const maxW = isTV ? 1500 : 1280;

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(160deg, #f8fafc 0%, #f1f5f9 100%)",
        padding: isMobile
          ? "52px 0 48px"
          : isTablet
          ? "64px 0 56px"
          : isTV
          ? "110px 0 100px"
          : "64px 0 56px",
        position: "relative", overflow: "hidden", fontFamily: FONT,
      }}
    >
      {/* Grid bg */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(79,70,229,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,0.03) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />

      {/* Glow orbs */}
      <div style={{ position: "absolute", width: 500, height: 300, top: "-5%", right: "5%", background: "radial-gradient(ellipse, rgba(79,70,229,0.07) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 400, height: 250, bottom: "0%", left: "0%", background: "radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: maxW, margin: "0 auto", padding: `0 ${horizPad}`, position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ textAlign: "center", marginBottom: isMobile ? 28 : 44 }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
            <span style={{ color: C.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Foundry Support</span>
            <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, ${C.primary}, transparent)` }} />
          </div>
          <h2 style={{
            fontSize: isTV ? "clamp(2.2rem, 3.5vw, 3.2rem)" : "clamp(1.6rem, 3.5vw, 2.6rem)",
            fontWeight: 900, color: C.textPrimary,
            margin: "0 0 10px", letterSpacing: "-0.04em", fontFamily: FONT,
          }}>
            Process Nodes & Foundries
          </h2>
          <p style={{ color: C.textSecondary, fontSize: isTV ? 15 : 14, maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>
            Silicon-proven physical design across leading foundries — from advanced 5nm FinFET down to mature 180nm nodes.
          </p>
        </motion.div>

        {/* ── DESKTOP/TV: 4-col grid ── */}
        {!isCompact && (
          <div style={{
            display: "grid",
            gridTemplateColumns: isTV ? "repeat(4, 1fr)" : "repeat(4, 1fr)",
            gap: isTV ? 22 : 18,
            marginBottom: 36,
          }}>
            {FOUNDRIES.map((f, i) => (
              <FoundryCard key={f.name} f={f} i={i} inView={inView} isTV={isTV} />
            ))}
          </div>
        )}

        {/* ── MOBILE/TABLET: carousel ── */}
        {isCompact && (
          <div style={{ marginBottom: 24 }}>
            <FoundryCarousel isMobile={isMobile} />
          </div>
        )}

        {/* ── DESKTOP/TV: capabilities strip ── */}
        {!isCompact && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            style={{
              background: "#fff", borderRadius: 18, padding: isTV ? "26px 36px" : "22px 28px",
              border: `1px solid ${C.borderLight}`, boxShadow: C.shadowMd,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
              <div style={{ flexShrink: 0 }}>
                <p style={{ margin: 0, fontWeight: 900, fontSize: isTV ? 17 : 15, color: C.textPrimary, fontFamily: FONT }}>
                  PNR Capabilities
                </p>
                <p style={{ margin: "3px 0 0", fontSize: 12, color: C.textMuted }}>
                  Supported flows & techniques
                </p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, flex: 1, justifyContent: "flex-end" }}>
                {CAPABILITIES.map((cap, i) => (
                  <motion.div
                    key={cap.label}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.55 + i * 0.05, ease: EASE }}
                    whileHover={{ scale: 1.06, y: -2 }}
                    style={{
                      display: "flex", alignItems: "center", gap: 7,
                      padding: "7px 14px", borderRadius: 50,
                      background: C.bgAccent ?? "#f8fafc",
                      border: `1px solid ${C.border}`,
                      cursor: "default",
                    }}
                  >
                    <CheckCircle2 style={{ width: 12, height: 12, color: cap.color, flexShrink: 0 }} />
                    <span style={{ fontSize: isTV ? 13 : 12, color: C.textSecondary, fontWeight: 600 }}>{cap.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── MOBILE/TABLET: capabilities accordion ── */}
        {isCompact && <CapabilitiesAccordion />}

      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}