// DFTFlow.jsx — DFT Process Flow
// Responsive: mobile carousel | tablet carousel | laptop/TV alternating timeline

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
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
const STEPS = [
  {
    num: "01", tag: "DFT Planning",
    title: "Architecture & Planning",
    color: "#4f46e5", bg: "#eef2ff",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80",
    desc: "Define DFT architecture aligned with design complexity, test coverage goals, ATE constraints and silicon cost targets.",
    points: ["DFT architecture and SoC partitioning", "Test mode & control signal planning", "DFT rule definition & sign-off criteria", "Early-stage feasibility analysis"],
  },
  {
    num: "02", tag: "Scan Insertion",
    title: "DFT IP Insertion & Scan Stitching",
    color: "#7c3aed", bg: "#f5f3ff",
    img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=700&q=80",
    desc: "Automated scan chain insertion, stitching and compression targeting maximum structural coverage with minimal area overhead.",
    points: ["Scan chain insertion & optimization", "EDT / OPMISR compression", "BSCAN IEEE 1149.1 JTAG", "Scan chain verification & simulation"],
  },
  {
    num: "03", tag: "Memory BIST",
    title: "MBIST & Hard Repair",
    color: "#0891b2", bg: "#ecfeff",
    img: "https://images.unsplash.com/photo-1601132359864-c974e79890ac?w=700&q=80",
    desc: "Memory Built-In Self Test implementation with hard repair logic for embedded SRAM, ROM and custom memory macros.",
    points: ["MBIST controller insertion", "March algorithm implementation", "Hard repair logic synthesis", "Memory retention & ECC testing"],
  },
  {
    num: "04", tag: "ATPG",
    title: "Pattern Generation & Simulation",
    color: "#059669", bg: "#ecfdf5",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=80",
    desc: "ATPG pattern generation for stuck-at and at-speed faults with full simulation validation and fault coverage optimization.",
    points: ["Stuck-At & At-Speed ATPG", "Pattern simulation & validation", "Fault coverage optimization", "LBIST — Logic Built-In Self Test"],
  },
  {
    num: "05", tag: "Post-Silicon",
    title: "ATE Handoff & Validation",
    color: "#d97706", bg: "#fffbeb",
    img: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=700&q=80",
    desc: "Complete ATE pattern translation, correlation and post-silicon validation ensuring production test accuracy and coverage sign-off.",
    points: ["ATE handoff & pattern translation", "Post-silicon validation", "Silicon debug & failure analysis", "Test coverage sign-off report"],
  },
];

/* ─── BgOrbs ─────────────────────────────────── */
function BgOrbs() {
  return (
    <>
      {[
        { color: "rgba(79,70,229,0.08)",  size: 500, top: "5%",   left: "-8%"  },
        { color: "rgba(124,58,237,0.07)", size: 400, top: "40%",  right: "-6%" },
        { color: "rgba(8,145,178,0.07)",  size: 350, bottom: "10%", left: "20%" },
      ].map((o, i) => (
        <motion.div key={i}
          style={{
            position: "absolute", width: o.size, height: o.size * 0.6,
            borderRadius: "50%", pointerEvents: "none",
            background: `radial-gradient(ellipse, ${o.color} 0%, transparent 70%)`,
            filter: "blur(60px)",
            top: o.top, left: o.left, right: o.right, bottom: o.bottom,
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </>
  );
}

/* ─── VertConnector (desktop only) ──────────── */
function VertConnector({ color, inView, delay }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, position: "relative", zIndex: 2, margin: "-2px 0" }}>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={inView ? { height: 60, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay, ease: EASE }}
        style={{ width: 2, background: `linear-gradient(180deg, ${color}, ${color}40)` }}
      />
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: delay + 0.2 }}
        style={{ color }}
      >
        <ArrowDown style={{ width: 18, height: 18 }} />
      </motion.div>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={inView ? { height: 40, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: delay + 0.3, ease: EASE }}
        style={{ width: 2, background: `linear-gradient(180deg, ${color}40, transparent)` }}
      />
    </div>
  );
}

/* ─── NumBadge ───────────────────────────────── */
function NumBadge({ num, color, inView, delay, size = 56 }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] }}
      style={{
        width: size, height: size, borderRadius: "50%",
        background: color, color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 900, fontSize: size * 0.32, fontFamily: FONT,
        boxShadow: `0 8px 28px ${color}50`,
        zIndex: 10, border: "3px solid #fff",
        flexShrink: 0,
      }}
    >
      {num}
    </motion.div>
  );
}

/* ─── Desktop FlowStep (alternating) ────────── */
function FlowStep({ step, i, inView }) {
  const isEven = i % 2 === 0;
  const stepRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: stepRef, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.06, 1]);

  return (
    <div ref={stepRef} style={{ position: "relative" }}>
      <div style={{ position: "relative", height: 28, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          <NumBadge num={step.num} color={step.color} inView={inView} delay={0.1 + i * 0.12} />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: EASE }}
        style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 0, borderRadius: 24, overflow: "hidden",
          boxShadow: `0 20px 60px ${step.color}12, 0 4px 20px rgba(0,0,0,0.06)`,
          border: `1px solid ${step.color}18`,
          direction: isEven ? "ltr" : "rtl",
        }}
      >
        {/* Image */}
        <div style={{ overflow: "hidden", position: "relative", height: 320, direction: "ltr" }}>
          <motion.img
            src={step.img} alt={step.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", scale: imgScale }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(${isEven ? "135deg" : "225deg"}, ${step.color}55 0%, rgba(0,0,0,0.35) 100%)`,
          }} />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 + i * 0.1 }}
            style={{ position: "absolute", top: 20, ...(isEven ? { left: 20 } : { right: 20 }) }}
          >
            <span style={{
              padding: "5px 14px", borderRadius: 50,
              background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)",
              color: "#fff", fontSize: 10, fontWeight: 700,
              letterSpacing: "0.15em", textTransform: "uppercase",
              border: "1px solid rgba(255,255,255,0.25)",
            }}>{step.tag}</span>
          </motion.div>
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "40px 24px 24px",
            background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
            direction: "ltr",
          }}>
            <p style={{ margin: 0, fontSize: "1.35rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", fontFamily: FONT }}>
              {step.title}
            </p>
          </div>
        </div>
        {/* Content */}
        <div style={{ background: "#fff", padding: "28px", direction: "ltr", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.35 + i * 0.1, ease: EASE }}
            style={{ height: 3, background: `linear-gradient(90deg, ${step.color}, ${step.color}40)`, borderRadius: 2, marginBottom: 16, transformOrigin: "left", width: "40%" }}
          />
          <p style={{ fontSize: 13.5, color: C.textSecondary, lineHeight: 1.85, margin: "0 0 20px" }}>{step.desc}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {step.points.map((pt, j) => (
              <motion.div key={pt}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 + j * 0.07, ease: EASE }}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 12px", borderRadius: 10,
                  background: j % 2 === 0 ? step.bg : "#f8fafc",
                  border: `1px solid ${step.color}15`,
                }}
              >
                <CheckCircle2 style={{ width: 14, height: 14, color: step.color, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: C.textPrimary, fontWeight: 600 }}>{pt}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Mobile/Tablet Card ─────────────────────── */
function MobileStepCard({ step, isMobile }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 18,
      border: `1.5px solid ${step.color}25`,
      overflow: "hidden",
      boxShadow: `0 12px 40px ${step.color}12, 0 2px 8px rgba(0,0,0,0.04)`,
    }}>
      {/* Image banner */}
      <div style={{ position: "relative", height: isMobile ? 160 : 200, overflow: "hidden" }}>
        <img
          src={step.img} alt={step.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, ${step.color}66 0%, rgba(0,0,0,0.40) 100%)`,
        }} />
        {/* Tag badge */}
        <div style={{ position: "absolute", top: 14, left: 14 }}>
          <span style={{
            padding: "4px 12px", borderRadius: 50,
            background: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)",
            color: "#fff", fontSize: 9, fontWeight: 700,
            letterSpacing: "0.15em", textTransform: "uppercase",
            border: "1px solid rgba(255,255,255,0.28)",
          }}>{step.tag}</span>
        </div>
        {/* Step number */}
        <div style={{ position: "absolute", top: 10, right: 14 }}>
          <span style={{
            fontFamily: "monospace", fontSize: 11,
            color: "rgba(255,255,255,0.75)", fontWeight: 700,
            letterSpacing: "0.12em",
          }}>{step.num} / 05</span>
        </div>
        {/* Title on image */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "32px 18px 16px",
          background: "linear-gradient(to top, rgba(0,0,0,0.72), transparent)",
        }}>
          <p style={{ margin: 0, fontSize: isMobile ? "1.05rem" : "1.2rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", fontFamily: FONT }}>
            {step.title}
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: isMobile ? "16px 16px 18px" : "20px 20px 22px" }}>
        {/* Accent line */}
        <div style={{
          height: 2, width: 40, borderRadius: 2,
          background: `linear-gradient(90deg, ${step.color}, ${step.color}40)`,
          marginBottom: 12,
        }} />

        <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.8, margin: "0 0 14px" }}>
          {step.desc}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {step.points.map((pt, j) => (
            <div key={pt} style={{
              display: "flex", alignItems: "center", gap: 9,
              padding: "8px 11px", borderRadius: 9,
              background: j % 2 === 0 ? step.bg : "#f8fafc",
              border: `1px solid ${step.color}15`,
            }}>
              <CheckCircle2 style={{ width: 13, height: 13, color: step.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12.5, color: C.textPrimary, fontWeight: 600 }}>{pt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile/Tablet Carousel ─────────────────── */
const SLIDE_VARIANTS = {
  enter:  (d) => ({ opacity: 0, x: d > 0 ? 70 : -70, scale: 0.97 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit:   (d) => ({ opacity: 0, x: d > 0 ? -70 : 70, scale: 0.97 }),
};

function FlowCarousel({ inView, isMobile }) {
  const [[page, dir], setPage] = useState([0, 0]);
  const N = STEPS.length;
  const touchStart = useRef(null);

  const paginate = useCallback((d) => {
    setPage(([p]) => {
      const next = p + d;
      if (next < 0 || next >= N) return [p, d];
      return [next, d];
    });
  }, [N]);

  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStart.current === null) return;
    const delta = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) paginate(delta > 0 ? 1 : -1);
    touchStart.current = null;
  };

  const step = STEPS[page];

  return (
    <div>
      {/* Progress strip */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
        {STEPS.map((s, i) => (
          <motion.div
            key={i}
            animate={{ background: i <= page ? s.color : "#e2e8f0" }}
            transition={{ duration: 0.3 }}
            style={{ flex: 1, height: 3, borderRadius: 2, cursor: "pointer" }}
            onClick={() => setPage([i, i > page ? 1 : -1])}
          />
        ))}
      </div>

      {/* Slide window */}
      <div
        style={{ overflow: "hidden", touchAction: "pan-y", position: "relative" }}
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
            transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
          >
            <MobileStepCard step={step} isMobile={isMobile} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "center", gap: 14, marginTop: 20,
      }}>
        {/* Prev */}
        <motion.button
          onClick={() => paginate(-1)}
          disabled={page === 0}
          whileHover={page === 0 ? {} : { scale: 1.08 }}
          whileTap={page === 0 ? {} : { scale: 0.92 }}
          style={{
            width: 36, height: 36, borderRadius: "50%",
            border: `1.5px solid ${page === 0 ? "#e2e8f0" : step.color + "60"}`,
            background: "#fff",
            color: page === 0 ? "#cbd5e1" : step.color,
            opacity: page === 0 ? 0.35 : 1,
            cursor: page === 0 ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: C.shadowSm, flexShrink: 0,
          }}
        >
          <ChevronLeft size={15} />
        </motion.button>

        {/* Pill dots */}
        <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
          {STEPS.map((s, i) => (
            <motion.button
              key={i}
              onClick={() => setPage([i, i > page ? 1 : -1])}
              animate={{ width: i === page ? 22 : 7, background: i === page ? s.color : "#cbd5e1" }}
              transition={{ duration: 0.28, ease: EASE }}
              style={{ height: 7, borderRadius: 50, border: "none", cursor: "pointer", padding: 0 }}
            />
          ))}
        </div>

        {/* Next */}
        <motion.button
          onClick={() => paginate(1)}
          disabled={page === N - 1}
          whileHover={page === N - 1 ? {} : { scale: 1.08 }}
          whileTap={page === N - 1 ? {} : { scale: 0.92 }}
          style={{
            width: 36, height: 36, borderRadius: "50%",
            border: `1.5px solid ${page === N - 1 ? "#e2e8f0" : step.color + "60"}`,
            background: "#fff",
            color: page === N - 1 ? "#cbd5e1" : step.color,
            opacity: page === N - 1 ? 0.35 : 1,
            cursor: page === N - 1 ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: C.shadowSm, flexShrink: 0,
          }}
        >
          <ChevronRight size={15} />
        </motion.button>
      </div>

      {/* Label */}
      <p style={{
        textAlign: "center", marginTop: 8,
        fontSize: 11, color: C.textMuted, fontWeight: 600,
        letterSpacing: "0.1em", textTransform: "uppercase",
      }}>
        Step {page + 1} of {N} — {step.tag}
      </p>
    </div>
  );
}

/* ─── SignOff Badge ──────────────────────────── */
function SignOffBadge({ inView, compact = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
      style={{ textAlign: "center", marginTop: compact ? 28 : 48 }}
    >
      <div style={{
        display: "inline-flex", alignItems: "center", gap: compact ? 12 : 16,
        padding: compact ? "14px 22px" : "18px 32px", borderRadius: 16,
        background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
        boxShadow: "0 12px 40px rgba(79,70,229,0.30)",
      }}>
        <div style={{
          width: compact ? 36 : 42, height: compact ? 36 : 42, borderRadius: 12,
          background: "rgba(255,255,255,0.18)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <CheckCircle2 style={{ width: compact ? 18 : 22, height: compact ? 18 : 22, color: "#fff" }} />
        </div>
        <div style={{ textAlign: "left" }}>
          <p style={{ margin: 0, fontWeight: 900, fontSize: compact ? 13 : 15, color: "#fff", fontFamily: FONT }}>
            DFT Sign-Off Complete
          </p>
          <p style={{ margin: "3px 0 0", fontSize: compact ? 11 : 12, color: "rgba(255,255,255,0.72)" }}>
            95%+ fault coverage · ATE-ready · Production tested
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── MAIN ───────────────────────────────────── */
export default function DFTFlow() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const bp     = useBreakpoint();

  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const isTV     = bp === "tv";
  const isSmall  = isMobile || isTablet;

  const sectionPad = isMobile
    ? "48px 18px 44px"
    : isTablet
    ? "56px 28px 52px"
    : isTV
    ? "100px 80px 80px"
    : "64px 48px 56px";

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(160deg, #f8fafc 0%, #f1f5f9 100%)",
        padding: sectionPad,
        position: "relative", overflow: "hidden", fontFamily: FONT,
      }}
    >
      <BgOrbs />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(79,70,229,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,0.03) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />

      <div style={{ maxWidth: isTV ? 1400 : 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ textAlign: "center", marginBottom: isMobile ? 24 : isTablet ? 28 : 48 }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
            <span style={{ color: C.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>DFT Process</span>
            <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, ${C.primary}, transparent)` }} />
          </div>
          <h2 style={{
            fontSize: isMobile ? "clamp(1.6rem, 7vw, 2rem)" : isTV ? "3rem" : "clamp(1.8rem, 3.5vw, 2.6rem)",
            fontWeight: 900, color: C.textPrimary, margin: "0 0 10px", letterSpacing: "-0.04em", fontFamily: FONT,
          }}>
            Our DFT Flow
          </h2>
          <p style={{ color: C.textSecondary, fontSize: isMobile ? 13 : 14, maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>
            A structured 5-phase DFT implementation flow — from architecture planning to post-silicon sign-off.
          </p>
        </motion.div>

        {/* ══════════════════════════════════════
            MOBILE / TABLET — carousel
        ══════════════════════════════════════ */}
        {isSmall && (
          <>
            <FlowCarousel inView={inView} isMobile={isMobile} />
            <SignOffBadge inView={inView} compact />
          </>
        )}

        {/* ══════════════════════════════════════
            LAPTOP / TV — alternating timeline
        ══════════════════════════════════════ */}
        {!isSmall && (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {STEPS.map((step, i) => (
                <div key={step.num}>
                  <FlowStep step={step} i={i} inView={inView} />
                  {i < STEPS.length - 1 && (
                    <VertConnector color={STEPS[i + 1].color} inView={inView} delay={0.5 + i * 0.12} />
                  )}
                </div>
              ))}
            </div>
            <SignOffBadge inView={inView} compact={false} />
          </>
        )}

      </div>
    </section>
  );
}