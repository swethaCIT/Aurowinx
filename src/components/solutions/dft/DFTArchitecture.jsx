// DFTArchitecture.jsx
// AurowinX — DFT Services
// Responsive: mobile carousel | tablet carousel | laptop/TV full layout

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Layers, Cpu, Shield, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
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
const SERVICES = [
  {
    num: "01",
    tag: "DFT Architecture",
    title: "Architecture & Planning",
    color: "#4f46e5",
    bg: "#eef2ff",
    Icon: Target,
    desc: "What you walk away with once planning closes — the reference documents design and DFT teams build against for the rest of the project.",
    points: [
      "DFT architecture specification document",
      "Fault-model coverage targets & test budget",
      "Test mode & sign-off criteria checklist",
      "Partitioning plan reviewed with design team",
    ],
  },
  {
    num: "02",
    tag: "Pre-Silicon",
    title: "Pre-Silicon Services",
    color: "#7c3aed",
    bg: "#f5f3ff",
    Icon: Layers,
    desc: "Deliverables handed off at tape-in — a scan-stitched netlist and simulated pattern sets ready for review, not just a checklist of steps we ran.",
    points: [
      "Scan-stitched, DRC-clean netlist",
      "Stuck-at & at-speed ATPG pattern sets",
      "Simulation-validated pattern sign-off report",
      "Compression ratio & area-overhead summary",
    ],
  },
  {
    num: "03",
    tag: "Techniques",
    title: "DFT Techniques",
    color: "#0891b2",
    bg: "#ecfeff",
    Icon: Cpu,
    desc: "The technique toolkit we draw from and tune to your memory mix, area budget and test-time target — not a one-size-fits-all recipe.",
    points: [
      "Boundary Scan (IEEE 1149.1 JTAG)",
      "MBIST — Memory Built-In Self Test",
      "Hard Repair for embedded memories",
      "LBIST — Logic Built-In Self Test",
      "Scan ATPG (Stuck-At & At-Speed)",
      "Compression (EDT / OPMISR)",
    ],
  },
  {
    num: "04",
    tag: "Post-Silicon",
    title: "Post-Silicon Services",
    color: "#059669",
    bg: "#ecfdf5",
    Icon: Shield,
    desc: "What ships to production test — ATE-formatted patterns and a correlation report, plus debug support if silicon doesn't match simulation.",
    points: [
      "ATE-formatted pattern handoff package",
      "Silicon-to-simulation correlation report",
      "Failure analysis & debug support",
      "Coverage sign-off documentation",
    ],
  },
];

/* ─── slide variants ─────────────────────────── */
const makeVariants = (dir) => ({
  enter:  { opacity: 0, x: dir > 0 ? 70 : -70, scale: 0.97 },
  center: { opacity: 1, x: 0, scale: 1 },
  exit:   { opacity: 0, x: dir > 0 ? -70 : 70, scale: 0.97 },
});

/* ─── ArrowButton ────────────────────────────── */
function ArrowBtn({ onClick, disabled, color, children, size = 38 }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.08 }}
      whileTap={disabled  ? {} : { scale: 0.92 }}
      style={{
        width: size, height: size, borderRadius: "50%",
        border: `1.5px solid ${disabled ? "#e2e8f0" : color + "60"}`,
        background: "#fff",
        color: disabled ? "#cbd5e1" : color,
        opacity: disabled ? 0.35 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, boxShadow: disabled ? "none" : C.shadowSm,
        transition: "border-color 0.2s, color 0.2s, opacity 0.2s",
      }}
    >
      {children}
    </motion.button>
  );
}

/* ─── ServiceCard ────────────────────────────── */
function ServiceCard({ svc, N, compact = false }) {
  return (
    <motion.div
      style={{
        background: "#fff",
        borderRadius: compact ? 16 : 20,
        border: `1.5px solid ${svc.color}30`,
        padding: compact ? "20px 18px 18px" : "28px 28px 26px",
        boxShadow: `0 12px 40px ${svc.color}15, 0 2px 8px rgba(0,0,0,0.04)`,
        fontFamily: FONT,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Top accent bar */}
      <div style={{
        height: 3, borderRadius: 2,
        background: `linear-gradient(90deg, ${svc.color}, ${svc.color}40)`,
        marginBottom: compact ? 16 : 22,
      }} />

      {/* Icon + tag + title + counter */}
      <div style={{ display: "flex", alignItems: "center", gap: compact ? 12 : 16, marginBottom: compact ? 12 : 16 }}>
        <div style={{
          width: compact ? 42 : 50, height: compact ? 42 : 50,
          borderRadius: compact ? 12 : 14,
          background: svc.bg, color: svc.color,
          display: "flex", alignItems: "center", justifyContent: "center",
          border: `1px solid ${svc.color}20`, flexShrink: 0,
        }}>
          <svc.Icon size={compact ? 18 : 22} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{
            fontFamily: "monospace", fontSize: 9,
            textTransform: "uppercase", letterSpacing: "0.15em",
            padding: "2px 10px", borderRadius: 3,
            background: svc.bg, color: svc.color,
            display: "inline-block", marginBottom: 5,
          }}>
            {svc.tag}
          </span>
          <p style={{
            fontSize: compact ? 16 : 20, fontWeight: 900,
            color: C.textPrimary, margin: 0, letterSpacing: "-0.03em",
            lineHeight: 1.2,
          }}>
            {svc.title}
          </p>
        </div>
        <span style={{
          fontFamily: "monospace", fontSize: 11,
          color: C.textSecondary, letterSpacing: "0.1em",
          flexShrink: 0, alignSelf: "flex-start",
        }}>
          {svc.num} / 0{N}
        </span>
      </div>

      {/* Desc */}
      <p style={{
        fontSize: compact ? 13 : 13.5, color: C.textSecondary,
        lineHeight: 1.8, marginBottom: compact ? 14 : 22,
        maxWidth: 680,
      }}>
        {svc.desc}
      </p>

      {/* Points grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: compact ? "1fr" : "repeat(auto-fit, minmax(220px, 1fr))",
        gap: compact ? 8 : 10,
      }}>
        {svc.points.map((pt, j) => (
          <motion.div
            key={pt}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: j * 0.06, ease: EASE }}
            style={{
              display: "flex", alignItems: "flex-start", gap: 10,
              padding: compact ? "8px 12px" : "10px 14px",
              borderRadius: 10,
              background: j % 2 === 0 ? svc.bg : "#fff",
              border: `1px solid ${svc.color}15`,
            }}
          >
            <CheckCircle2 size={13} style={{ color: svc.color, flexShrink: 0, marginTop: 2 }} />
            <span style={{ fontSize: compact ? 12.5 : 13, color: C.textPrimary, fontWeight: 600, lineHeight: 1.5 }}>
              {pt}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── MobileTabletCarousel ───────────────────── */
function MobileTabletCarousel({ active, setActive, N }) {
  const [[page, dir], setPage] = useState([active, 0]);
  const touchStart = useRef(null);

  // sync when parent changes active (pill click)
  useEffect(() => {
    setPage(([prev]) => [active, active > prev ? 1 : -1]);
  }, [active]);

  const paginate = useCallback((newDir) => {
    const next = page + newDir;
    if (next < 0 || next >= N) return;
    setPage([next, newDir]);
    setActive(next);
  }, [page, N, setActive]);

  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStart.current === null) return;
    const delta = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) paginate(delta > 0 ? 1 : -1);
    touchStart.current = null;
  };

  const svc = SERVICES[page];

  return (
    <div>
      {/* Slide window */}
      <div
        style={{ position: "relative", overflow: "hidden", touchAction: "pan-y" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence initial={false} custom={dir} mode="wait">
          <motion.div
            key={page}
            initial={makeVariants(dir).enter}
            animate={makeVariants(dir).center}
            exit={makeVariants(dir).exit}
            transition={{ duration: 0.36, ease: [0.32, 0.72, 0, 1] }}
          >
            <ServiceCard svc={svc} N={N} compact />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav row */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "center", gap: 14, marginTop: 20,
      }}>
        <ArrowBtn onClick={() => paginate(-1)} disabled={page === 0} color={svc.color} size={36}>
          <ChevronLeft size={15} />
        </ArrowBtn>

        {/* Pill dots */}
        <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
          {SERVICES.map((s, i) => (
            <motion.button
              key={i}
              onClick={() => {
                const d = i > page ? 1 : -1;
                setPage([i, d]);
                setActive(i);
              }}
              animate={{ width: i === page ? 22 : 7, background: i === page ? s.color : "#cbd5e1" }}
              transition={{ duration: 0.28, ease: EASE }}
              style={{ height: 7, borderRadius: 50, border: "none", cursor: "pointer", padding: 0 }}
            />
          ))}
        </div>

        <ArrowBtn onClick={() => paginate(1)} disabled={page === N - 1} color={svc.color} size={36}>
          <ChevronRight size={15} />
        </ArrowBtn>
      </div>

      {/* Counter */}
      <p style={{
        textAlign: "center", marginTop: 8,
        fontSize: 11, color: C.textMuted, fontWeight: 600,
        letterSpacing: "0.1em", textTransform: "uppercase",
      }}>
        {page + 1} / {N} — {svc.tag}
      </p>
    </div>
  );
}

/* ─── MAIN ───────────────────────────────────── */
export default function DFTArchitecture() {
  const [active, setActive] = useState(0);
  const N  = SERVICES.length;
  const bp = useBreakpoint();

  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const isTV     = bp === "tv";
  const isSmall  = isMobile || isTablet;

  const svc = SERVICES[active];

  const sectionPad = isMobile
    ? "48px 18px 52px"
    : isTablet
    ? "56px 28px 60px"
    : isTV
    ? "100px 80px 80px"
    : "64px 48px 72px";

  return (
    <section
      style={{
        background: "linear-gradient(160deg, #f8fafc 0%, #f1f5f9 100%)",
        padding: sectionPad,
        position: "relative",
        overflow: "hidden",
        fontFamily: FONT,
      }}
    >
      {/* Grid bg */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(79,70,229,0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(79,70,229,0.03) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />

      <div style={{ maxWidth: isTV ? 1600 : 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? 24 : 32 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
            <span style={{
              color: C.primary, fontSize: 11, fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "monospace",
            }}>
              DFT Services
            </span>
            <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, ${C.primary}, transparent)` }} />
          </div>
          <h2 style={{
            fontSize: isMobile ? "clamp(1.6rem, 7vw, 2rem)" : isTV ? "3rem" : "clamp(1.8rem, 3.5vw, 2.6rem)",
            fontWeight: 900, color: C.textPrimary,
            margin: "0 0 10px", letterSpacing: "-0.04em",
          }}>
            DFT Expertise &amp; Services
          </h2>
          <p style={{ color: C.textSecondary, fontSize: isMobile ? 13 : 14, maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>
            Full-spectrum DFT from early architecture to post-silicon sign-off — maximising fault coverage at every stage.
          </p>
        </div>

        {/* ── Pills ── */}
        <div style={{
          display: "flex", gap: isMobile ? 6 : 8,
          justifyContent: "center", flexWrap: "wrap",
          marginBottom: isMobile ? 20 : 28,
        }}>
          {SERVICES.map((s, i) => (
            <motion.button
              key={s.num}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                fontFamily: "monospace",
                fontSize: isMobile ? 9 : 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: isMobile ? "6px 12px" : "7px 18px",
                borderRadius: 100,
                border: `1.5px solid ${active === i ? s.color : "#e2e8f0"}`,
                background: active === i ? s.color : "#fff",
                color: active === i ? "#fff" : C.textSecondary,
                cursor: "pointer",
                transition: "all 0.22s",
                whiteSpace: "nowrap",
              }}
            >
              {isMobile ? s.tag : `${s.num} — ${s.tag}`}
            </motion.button>
          ))}
        </div>

        {/* ══════════════════════════════════════
            MOBILE / TABLET — carousel
        ══════════════════════════════════════ */}
        {isSmall && (
          <MobileTabletCarousel active={active} setActive={setActive} N={N} />
        )}

        {/* ══════════════════════════════════════
            LAPTOP / TV — arrows outside card
        ══════════════════════════════════════ */}
        {!isSmall && (
          <div style={{ display: "flex", alignItems: "center", gap: isTV ? 20 : 16 }}>

            <ArrowBtn
              onClick={() => setActive(a => Math.max(0, a - 1))}
              disabled={active === 0}
              color={svc.color}
              size={isTV ? 44 : 38}
            >
              <ChevronLeft size={isTV ? 20 : 18} />
            </ArrowBtn>

            {/* Card */}
            <div style={{ flex: 1, overflow: "hidden", borderRadius: 20 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <ServiceCard svc={svc} N={N} compact={false} />
                </motion.div>
              </AnimatePresence>
            </div>

            <ArrowBtn
              onClick={() => setActive(a => Math.min(N - 1, a + 1))}
              disabled={active === N - 1}
              color={svc.color}
              size={isTV ? 44 : 38}
            >
              <ChevronRight size={isTV ? 20 : 18} />
            </ArrowBtn>

          </div>
        )}

      </div>
    </section>
  );
}