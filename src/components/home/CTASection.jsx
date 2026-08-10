// src/components/home/CTASection.jsx
// Requires: framer-motion

import { useRef, useEffect, useState, useCallback, lazy, Suspense } from "react";
import {
  motion, useInView,
  useMotionValue, useSpring,
} from "framer-motion";
import Footer from "./Footer";

// The 3D chip scene pulls in three.js — the single heaviest dependency in
// the app — so it's lazy-loaded into its own chunk rather than shipped
// with every page that renders CTASection.
const ChipScene = lazy(() => import("./ChipScene"));

/* ════════════════════════════════════════════════════════
   MAGNETIC BUTTON
════════════════════════════════════════════════════════ */
function MagneticBtn({ children, href, style: s }) {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 18 });
  const sy = useSpring(y, { stiffness: 300, damping: 18 });
  const onMove = useCallback((e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width  / 2) * 0.38);
    y.set((e.clientY - r.top  - r.height / 2) * 0.38);
  }, [x, y]);
  return (
    <motion.a ref={ref} href={href} onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: sx, y: sy, ...s }}
      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
    >{children}</motion.a>
  );
}

/* ════════════════════════════════════════════════════════
   GLITCH TEXT
════════════════════════════════════════════════════════ */
function GlitchText({ children, style }) {
  const [g, setG] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setG(true);
      setTimeout(() => setG(false), 180);
    }, 3800 + Math.random() * 2500);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{ position: "relative", display: "inline-block", ...style }}>
      {children}
      {g && <>
        <span aria-hidden style={{ position: "absolute", inset: 0, color: "#06b6d4",
          clipPath: "polygon(0 28%,100% 28%,100% 48%,0 48%)",
          transform: "translateX(-3px)", opacity: 0.7 }}>{children}</span>
        <span aria-hidden style={{ position: "absolute", inset: 0, color: "#8b5cf6",
          clipPath: "polygon(0 62%,100% 62%,100% 76%,0 76%)",
          transform: "translateX(3px)", opacity: 0.7 }}>{children}</span>
      </>}
    </span>
  );
}

/* ════════════════════════════════════════════════════════
   HUD BRACKET
════════════════════════════════════════════════════════ */
function HUDBracket({ position }) {
  const isTop  = position.startsWith("top");
  const isLeft = position.endsWith("left");
  const s = { position: "absolute", width: 22, height: 22, zIndex: 10 };
  if (isTop)  s.top    = 10; else s.bottom = 10;
  if (isLeft) s.left   = 10; else s.right  = 10;
  return (
    <div style={s}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d={isTop && isLeft ? "M0 14L0 0L14 0"
            : isTop           ? "M8 0L22 0L22 14"
            : isLeft          ? "M0 8L0 22L14 22"
            :                   "M8 22L22 22L22 8"}
          stroke="rgba(59,130,246,0.5)" strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   RESPONSIVE STYLES
════════════════════════════════════════════════════════ */
const CSS = `
  .cta-wrap * { box-sizing: border-box; }
  .cta-wrap { overflow-x: clip; width: 100%; }

  .cta-inner { max-width: 1280px; margin: 0 auto; width: 100%; }

  .hero-grid {
    display: grid; grid-template-columns: 1fr;
    gap: clamp(1.75rem, 4vw, 3.5rem); align-items: center; min-height: unset;
  }
  .canvas-wrap  { position: relative; height: clamp(220px, 45vw, 480px); min-height: 220px; }
  .btn-row      { display: flex; gap: 12px; flex-wrap: wrap; }
  .btn-row a { max-width: 100%; }

  .sec-pad { padding: clamp(3rem, 8vw, 5.5rem) clamp(1rem, 4vw, 3rem) clamp(2.75rem, 6vw, 4.5rem); }
  .sec-pad-compact { padding: clamp(2rem, 5vw, 3rem) clamp(1rem, 4vw, 3rem) clamp(1.75rem, 4vw, 2.5rem); }

  /* ── Pill badge: tiny on mobile/tablet, normal on desktop ── */
  .status-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 40px;
    margin-bottom: 20px;
    border: 1px solid rgba(6,182,212,0.3);
    background: rgba(6,182,212,0.07);
  }
  .status-pill-dot {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #06b6d4;
    flex-shrink: 0;
  }
  .status-pill-text {
    color: #0891b2;
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  @media (min-width: 480px) {
    .btn-row { gap: 14px; }
  }

  @media (min-width: 640px) {
    .status-pill { padding: 5px 13px; gap: 7px; margin-bottom: 24px; }
    .status-pill-dot { width: 6px; height: 6px; }
    .status-pill-text { font-size: 9px; }
  }

  @media (min-width: 768px) {
    .btn-row      { flex-direction: row; }
  }

  @media (min-width: 1100px) {
    .hero-grid    { grid-template-columns: 1fr 1fr; min-height: 520px; }
    .canvas-wrap  { height: 480px; }
    .status-pill  { padding: 7px 16px; gap: 9px; margin-bottom: 30px; }
    .status-pill-dot { width: 7px; height: 7px; }
    .status-pill-text { font-size: 10px; letter-spacing: 0.2em; }
  }

  @media (min-width: 1536px) {
    .cta-inner { max-width: 90rem; }
  }

  /* ── HUD overlay cards inside chip canvas ── */
  .hud-card {
    position: absolute;
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(14px);
    border-radius: 5px;
    padding: 3px 6px;
    pointer-events: none;
  }
  .hud-card-label {
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin: 0;
    font-size: 5px;
  }
  .hud-card-value {
    font-weight: 700;
    margin: 0;
    font-family: 'JetBrains Mono', monospace;
    font-size: 7px;
  }
  .hud-bottom { bottom: 8px; left: 8px; border: 1px solid rgba(6,182,212,0.22); box-shadow: 0 2px 8px rgba(6,182,212,0.1); }
  .hud-top    { top: 8px; right: 8px; text-align: right; border: 1px solid rgba(139,92,246,0.2); box-shadow: 0 2px 8px rgba(139,92,246,0.08); }

  @media (min-width: 640px) {
    .hud-card { border-radius: 7px; padding: 4px 8px; }
    .hud-card-label { font-size: 6px; }
    .hud-card-value { font-size: 9px; }
    .hud-bottom { bottom: 12px; left: 10px; }
    .hud-top    { top: 12px; right: 10px; }
  }

  @media (min-width: 1100px) {
    .hud-card { border-radius: 10px; padding: 8px 14px; }
    .hud-card-label { font-size: 9px; margin-bottom: 2px; }
    .hud-card-value { font-size: 13px; }
    .hud-bottom { bottom: 22px; left: 14px; }
    .hud-top    { top: 22px; right: 14px; }
  }
`;

/* ════════════════════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════════════════════ */
export default function CTASection({ compact = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <>
      <style>{CSS}</style>
      <section ref={ref} className="cta-wrap" style={{
        fontFamily: "'Sora', sans-serif",
        background: "#f5f8ff",
        position: "relative", overflow: "hidden",
      }}>

        {/* Dot grid */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: "radial-gradient(rgba(59,130,246,0.13) 1px, transparent 1px)",
          backgroundSize: "28px 28px" }} />

        {/* Top glow */}
        <div style={{ position: "absolute", top: "0%", left: "40%", transform: "translateX(-50%)",
          width: 700, height: 400, borderRadius: "50%",
          background: "radial-gradient(ellipse,rgba(59,130,246,0.1) 0%,transparent 70%)",
          filter: "blur(50px)", willChange: "transform", pointerEvents: "none", zIndex: 0 }} />

        {/* Right violet glow */}
        <div style={{ position: "absolute", top: "30%", right: "-5%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(ellipse,rgba(139,92,246,0.08) 0%,transparent 70%)",
          filter: "blur(60px)", willChange: "transform", pointerEvents: "none", zIndex: 0 }} />

        {/* ════ HERO ════ */}
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 2 }} className={`cta-inner ${compact ? "sec-pad-compact" : "sec-pad"}`}>
          <div className="hero-grid">

            {/* LEFT */}
            <motion.div>
              {/* ── Status pill — now uses CSS classes for responsive sizing ── */}
              <motion.div
                className="status-pill"
                initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.55 }}
              >
                <motion.span
                  className="status-pill-dot"
                  animate={{ scale: [1, 1.7, 1], opacity: [1, 0.35, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                <span className="status-pill-text">Ready to Collaborate</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.82, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontSize: "clamp(2.4rem,5vw,4.5rem)", fontWeight: 800,
                  lineHeight: 0.96, letterSpacing: "-0.05em", color: "#0a0f2c", margin: "0 0 18px" }}
              >
                Engineer<br />Your Next<br />
                <GlitchText style={{
                  background: "linear-gradient(135deg,#2563eb,#06b6d4 40%,#7c3aed)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>Breakthrough</GlitchText>
              </motion.h2>

              <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.75, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
                style={{ height: 2, width: 220, borderRadius: 2, transformOrigin: "left", marginBottom: 24,
                  background: "linear-gradient(90deg,#3b82f6,#06b6d4,#8b5cf6)" }} />

              <motion.p initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.25 }}
                style={{ color: "#475569", fontSize: 16, lineHeight: 1.85, maxWidth: 420, margin: "0 0 38px" }}
              >
                Silicon-proven ASIC, embedded firmware, IoT automation &amp; certified power electronics —
                <strong style={{ color: "#1e293b", fontWeight: 700 }}> all under one roof.</strong>
              </motion.p>

              <motion.div className="btn-row"
                initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.36 }}>
                <MagneticBtn href="/contact" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "14px 28px", borderRadius: 12, fontSize: 14, fontWeight: 700,
                  textDecoration: "none", letterSpacing: "-0.01em",
                  background: "linear-gradient(135deg,#2563eb,#7c3aed)", color: "#fff",
                  boxShadow: "0 8px 28px rgba(37,99,235,0.35), inset 0 1px 0 rgba(255,255,255,0.18)",
                }}>
                  Start a Project
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>→</motion.span>
                </MagneticBtn>
                <MagneticBtn href="mailto:info@aurowinx.com" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "14px 28px", borderRadius: 12, fontSize: 14, fontWeight: 600,
                  textDecoration: "none", background: "#fff",
                  border: "1.5px solid #e2e8f0", color: "#1e293b",
                  boxShadow: "0 2px 10px rgba(15,23,42,0.07)",
                }}>✉ info@aurowinx.com</MagneticBtn>
              </motion.div>

            </motion.div>

            {/* RIGHT — chip canvas */}
            <div className="canvas-wrap">
              <div style={{ position: "absolute", inset: 0, borderRadius: 24,
                background: "linear-gradient(145deg,#e8f0fe 0%,#eef9ff 45%,#f0ecff 100%)",
                border: "1px solid rgba(59,130,246,0.12)",
                boxShadow: "0 24px 72px rgba(59,130,246,0.12), 0 0 0 1px rgba(59,130,246,0.06)" }} />
              <Suspense fallback={null}><ChipScene /></Suspense>
              {["top-left","top-right","bottom-left","bottom-right"].map(p => <HUDBracket key={p} position={p} />)}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: "absolute", inset: 0 }}
              >
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="hud-card hud-bottom">
                  <p className="hud-card-label" style={{ color: "#0891b2" }}>Status</p>
                  <p className="hud-card-value" style={{ color: "#0f172a" }}>Actively Engineering</p>
                </motion.div>
                <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="hud-card hud-top">
                  <p className="hud-card-label" style={{ color: "#7c3aed" }}>Turnaround</p>
                  <p className="hud-card-value" style={{ color: "#0f172a" }}>&lt; 24 hrs</p>
                </motion.div>
              </motion.div>
            </div>

          </div>
        </div>

        <Footer />

      </section>
    </>
  );
}