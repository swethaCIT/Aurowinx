// VerifFlow.jsx
// AurowinX Design Verification — 6-Step Verification Flow
// Responsive: carousel on mobile/tablet | 3-col grid on laptop | 4-col on TV

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useMotionValue, useAnimation, AnimatePresence } from "framer-motion";
import { Target, Layers, Code2, Activity, BarChart3, Shield, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { C, FONT, EASE } from "./theme";

const STEPS = [
  {
    num: "01",
    title: "Verification Planning",
    sub: "Spec analysis, verification plan, coverage goals, risk assessment and DV closure criteria definition.",
    color: "#4f46e5",
    bg: "#eef2ff",
    icon: <Target style={{ width: 22, height: 22 }} />,
  },
  {
    num: "02",
    title: "Testbench Architecture",
    sub: "UVM environment setup, UVCs, BFMs, scoreboards, reference models and coverage collectors.",
    color: "#7c3aed",
    bg: "#f5f3ff",
    icon: <Layers style={{ width: 22, height: 22 }} />,
  },
  {
    num: "03",
    title: "Test Development",
    sub: "Directed tests, constrained random stimulus, SystemVerilog assertions (SVA) and corner case coverage.",
    color: "#a855f7",
    bg: "#faf5ff",
    icon: <Code2 style={{ width: 22, height: 22 }} />,
  },
  {
    num: "04",
    title: "Simulation & Debug",
    sub: "VCS, Xcelium, Questa — regression runs, debug with Verdi/SimVision, triage automation pipelines.",
    color: "#0891b2",
    bg: "#ecfeff",
    icon: <Activity style={{ width: 22, height: 22 }} />,
  },
  {
    num: "05",
    title: "Coverage Closure",
    sub: "Functional, code, toggle, FSM coverage — merge and analysis, exclusion review, sign-off metrics.",
    color: "#0284c7",
    bg: "#f0f9ff",
    icon: <BarChart3 style={{ width: 22, height: 22 }} />,
  },
  {
    num: "06",
    title: "Formal Verification",
    sub: "Property checking, equivalence, JasperGold, SymbiYosys, CDC/RDC analysis and final sign-off.",
    color: "#059669",
    bg: "#ecfdf5",
    icon: <Shield style={{ width: 22, height: 22 }} />,
  },
];

/* ── useBreakpoint hook ── */
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

/* ── Single step card ── */
function StepCard({ step, i, inView, alwaysVisible = false }) {
  const shouldAnimate = alwaysVisible || inView;
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.08, ease: EASE }}
      whileHover={{ y: -6, boxShadow: `0 24px 56px ${step.color}18` }}
      style={{
        position: "relative",
        background: "#fff",
        borderRadius: 20,
        padding: "28px 24px 24px",
        border: `1px solid ${C.borderLight}`,
        boxShadow: C.shadowMd,
        cursor: "default",
        overflow: "hidden",
        height: "100%",
        boxSizing: "border-box",
        transition: "box-shadow 0.3s",
        userSelect: "none",
      }}
    >
      {/* Top color bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={shouldAnimate ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.3 + i * 0.08, ease: EASE }}
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${step.color}, ${step.color}60)`,
          transformOrigin: "left",
        }}
      />

      {/* Step number watermark */}
      <span style={{
        position: "absolute", bottom: -8, right: 12,
        fontSize: "5.5rem", fontWeight: 900,
        color: step.color, opacity: 0.06,
        letterSpacing: "-0.06em", lineHeight: 1,
        fontFamily: FONT, pointerEvents: "none",
        userSelect: "none",
      }}>
        {step.num}
      </span>

      {/* Header row */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-start", marginBottom: 18,
      }}>
        <div style={{
          width: 46, height: 46, borderRadius: 13,
          background: step.bg, color: step.color,
          border: `1px solid ${step.color}25`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          {step.icon}
        </div>
        <span style={{
          padding: "4px 10px", borderRadius: 50,
          background: step.bg, color: step.color,
          fontSize: 10, fontWeight: 700,
          letterSpacing: "0.12em", textTransform: "uppercase",
          border: `1px solid ${step.color}20`,
        }}>
          Step {step.num}
        </span>
      </div>

      <p style={{
        fontWeight: 800, fontSize: 15,
        color: C.textPrimary, margin: "0 0 10px",
        fontFamily: FONT, letterSpacing: "-0.02em",
      }}>
        {step.title}
      </p>

      <p style={{
        fontSize: 13, color: C.textSecondary,
        lineHeight: 1.75, margin: 0,
      }}>
        {step.sub}
      </p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   CAROUSEL  (mobile / tablet)
══════════════════════════════════════════ */
function Carousel({ inView, perView }) {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const trackRef = useRef(null);
  const total = STEPS.length;
  const maxIndex = total - perView;

  const GAP = 16;

  /* card width derived from track width */
  const [cardW, setCardW] = useState(300);
  useEffect(() => {
    function measure() {
      if (trackRef.current) {
        const tw = trackRef.current.offsetWidth;
        setCardW((tw - GAP * (perView - 1)) / perView);
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [perView]);

  const goTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(idx, maxIndex));
    setActive(clamped);
    controls.start({
      x: -(clamped * (cardW + GAP)),
      transition: { type: "spring", stiffness: 320, damping: 36 },
    });
  }, [cardW, maxIndex, controls]);

  /* keyboard nav */
  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowLeft")  goTo(active - 1);
      if (e.key === "ArrowRight") goTo(active + 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goTo]);

  function onDragEnd(_, info) {
    const threshold = cardW * 0.22;
    if (info.offset.x < -threshold)      goTo(active + 1);
    else if (info.offset.x > threshold)  goTo(active - 1);
    else                                  goTo(active);
    setDragging(false);
  }

  /* dot indices — show only window of 6 */
  const dots = Array.from({ length: maxIndex + 1 });

  return (
    <div style={{ position: "relative" }}>

      {/* Track overflow mask */}
      <div
        ref={trackRef}
        style={{ overflow: "hidden", borderRadius: 12, padding: "4px 2px 12px" }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: -(maxIndex * (cardW + GAP)), right: 0 }}
          dragElastic={0.12}
          dragMomentum={false}
          animate={controls}
          onDragStart={() => setDragging(true)}
          onDragEnd={onDragEnd}
          style={{
            display: "flex",
            gap: GAP,
            width: "max-content",
            cursor: dragging ? "grabbing" : "grab",
          }}
        >
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              style={{
                width: cardW,
                flexShrink: 0,
                transition: "opacity 0.3s, transform 0.3s",
                opacity: (i >= active && i < active + perView) ? 1 : 0.45,
                transform: (i >= active && i < active + perView) ? "scale(1)" : "scale(0.96)",
              }}
            >
              <StepCard step={step} i={0} inView={inView} alwaysVisible />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Controls row */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "center", gap: 20, marginTop: 4,
      }}>

        {/* Prev */}
        <motion.button
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
          style={{
            width: 38, height: 38, borderRadius: "50%",
            border: `1px solid ${C.border}`,
            background: active === 0 ? "#f8fafc" : "#fff",
            color: active === 0 ? C.textMuted : C.primary,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: active === 0 ? "not-allowed" : "pointer",
            boxShadow: C.shadowSm,
            opacity: active === 0 ? 0.45 : 1,
            transition: "opacity 0.2s",
          }}
        >
          <ChevronLeft style={{ width: 16, height: 16 }} />
        </motion.button>

        {/* Dots */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {dots.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              whileHover={{ scale: 1.3 }}
              animate={{
                width: active === i ? 22 : 7,
                background: active === i ? STEPS[i].color : "#cbd5e1",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              style={{
                height: 7, borderRadius: 50,
                border: "none", padding: 0, cursor: "pointer",
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        {/* Next */}
        <motion.button
          onClick={() => goTo(active + 1)}
          disabled={active === maxIndex}
          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
          style={{
            width: 38, height: 38, borderRadius: "50%",
            border: `1px solid ${C.border}`,
            background: active === maxIndex ? "#f8fafc" : "#fff",
            color: active === maxIndex ? C.textMuted : C.primary,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: active === maxIndex ? "not-allowed" : "pointer",
            boxShadow: C.shadowSm,
            opacity: active === maxIndex ? 0.45 : 1,
            transition: "opacity 0.2s",
          }}
        >
          <ChevronRight style={{ width: 16, height: 16 }} />
        </motion.button>
      </div>

      {/* Step counter */}
      <p style={{
        textAlign: "center", marginTop: 10,
        fontSize: 11, color: C.textMuted,
        letterSpacing: "0.1em", fontFamily: FONT,
      }}>
        {active + 1} — {Math.min(active + perView, total)} of {total}
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════
   GRID  (laptop / TV)
══════════════════════════════════════════ */
function Grid({ inView, cols }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: 20,
    }}>
      {STEPS.map((step, i) => (
        <StepCard key={step.num} step={step} i={i} inView={inView} />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════ */
export default function VerifFlow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const bp = useBreakpoint();

  const isCarousel = bp === "mobile" || bp === "tablet";
  const perView    = bp === "mobile" ? 1 : 2;
  const gridCols   = bp === "tv"     ? 4 : 3;

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(160deg, #f8fafc 0%, #f1f5f9 100%)",
        padding: bp === "mobile" ? "72px 20px" : bp === "tablet" ? "80px 32px" : bp === "tv" ? "120px 80px" : "100px 48px",
        position: "relative",
        overflow: "hidden",
        fontFamily: FONT,
      }}
    >
      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(79,70,229,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(79,70,229,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
      }} />

      {/* Glow orb */}
      <div style={{
        position: "absolute", width: 600, height: 400,
        top: "-10%", left: "30%",
        background: "radial-gradient(ellipse, rgba(79,70,229,0.06) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: bp === "tv" ? 1600 : 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ textAlign: "center", marginBottom: isCarousel ? 40 : 72 }}
        >
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "center", gap: 12, marginBottom: 16,
          }}>
            <div style={{ height: 1, width: 40, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
            <span style={{
              color: C.primary, fontSize: 11, fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
            }}>
              Our Process
            </span>
            <div style={{ height: 1, width: 40, background: `linear-gradient(90deg, ${C.primary}, transparent)` }} />
          </div>

          <h2 style={{
            fontSize: bp === "mobile" ? "clamp(1.8rem, 8vw, 2.4rem)" : "clamp(2rem, 4.5vw, 3.2rem)",
            fontWeight: 900, color: C.textPrimary,
            margin: "0 0 16px", letterSpacing: "-0.04em",
            fontFamily: FONT,
          }}>
            The Verification Flow
          </h2>
          <p style={{
            color: C.textSecondary,
            fontSize: bp === "mobile" ? 14 : 16,
            maxWidth: 520, margin: "0 auto", lineHeight: 1.75,
          }}>
            A structured, repeatable 6-phase flow that takes you from specification
            to silicon sign-off with zero gaps.
          </p>
        </motion.div>

        {/* ── Progress pill — hidden on mobile to save space ── */}
        {!isCarousel && (
          <div style={{
            position: "relative", marginBottom: 40,
            display: "flex", justifyContent: "center",
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 0,
              background: "#fff",
              border: `1px solid ${C.borderLight}`,
              borderRadius: 50, padding: "6px 8px",
              boxShadow: C.shadowSm,
            }}>
              {STEPS.map((step, i) => (
                <div key={step.num} style={{ display: "flex", alignItems: "center" }}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.2 + i * 0.08, ease: EASE }}
                    style={{
                      width: bp === "tv" ? 38 : 32,
                      height: bp === "tv" ? 38 : 32,
                      borderRadius: "50%",
                      background: step.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontSize: 10, fontWeight: 800,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {step.num}
                  </motion.div>
                  {i < STEPS.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: EASE }}
                      style={{
                        width: bp === "tv" ? 40 : 32, height: 2,
                        background: `linear-gradient(90deg, ${step.color}, ${STEPS[i + 1].color})`,
                        transformOrigin: "left",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Cards: carousel or grid ── */}
        {isCarousel
          ? <Carousel inView={inView} perView={perView} />
          : <Grid inView={inView} cols={gridCols} />
        }

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.75, ease: EASE }}
          style={{ textAlign: "center", marginTop: 52 }}
        >
          <div style={{
            display: "inline-flex",
            flexDirection: bp === "mobile" ? "column" : "row",
            alignItems: bp === "mobile" ? "flex-start" : "center",
            gap: bp === "mobile" ? 16 : 24,
            padding: bp === "mobile" ? "20px 24px" : "20px 36px",
            background: "#fff",
            borderRadius: 16,
            border: `1px solid ${C.borderLight}`,
            boxShadow: C.shadowMd,
            width: bp === "mobile" ? "100%" : "auto",
            boxSizing: "border-box",
            textAlign: "left",
          }}>
            <div>
              <p style={{ margin: 0, fontWeight: 800, fontSize: bp === "mobile" ? 14 : 15, color: C.textPrimary }}>
                Ready to start your verification project?
              </p>
              <p style={{ margin: "3px 0 0", fontSize: 13, color: C.textMuted }}>
                Our engineers follow this exact flow — every engagement, every time.
              </p>
            </div>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{
                textDecoration: "none", flexShrink: 0,
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 24px", borderRadius: 50,
                background: C.gradPrimary, color: "#fff",
                fontWeight: 700, fontSize: 13,
                boxShadow: "0 6px 20px rgba(79,70,229,0.30)",
                width: bp === "mobile" ? "100%" : "auto",
                justifyContent: "center",
              }}
            >
              Get Started <ArrowRight style={{ width: 15, height: 15 }} />
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}