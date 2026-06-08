// src/components/solutions/semiconductor/SDHero.jsx
// ─────────────────────────────────────────────────
// Design: Exact match to DV HeroSection pattern
// Video : /videos/hero-1.mp4
// Requires: framer-motion, lucide-react

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, ChevronRight, CheckCircle2, Activity } from "lucide-react";

/* ── THEME (inline — no external import needed) ── */
const FONT = "'Inter', 'Sora', sans-serif";
const EASE = [0.22, 1, 0.36, 1];
const GRAD = "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)";

/* ═══════════════════════════════════════════════
   MAGNETIC BUTTON  (spring physics on hover)
═══════════════════════════════════════════════ */
function MagButton({ children, primary, href }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20 });
  const sy = useSpring(y, { stiffness: 260, damping: 20 });

  return (
    <motion.a
      ref={ref}
      href={href || "#"}
      onMouseMove={e => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width  / 2) * 0.28);
        y.set((e.clientY - r.top  - r.height / 2) * 0.28);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{
        x: sx, y: sy,
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "14px 32px",
        borderRadius: 50,
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: 14,
        cursor: "pointer",
        letterSpacing: "-0.01em",
        ...(primary
          ? {
              background: GRAD,
              color: "#fff",
              boxShadow: "0 8px 28px rgba(14,165,233,0.40)",
            }
          : {
              background: "rgba(255,255,255,0.10)",
              color: "#fff",
              border: "1.5px solid rgba(255,255,255,0.28)",
              backdropFilter: "blur(10px)",
            }),
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
}

/* ═══════════════════════════════════════════════
   PILL TAGS
═══════════════════════════════════════════════ */
const PILLS = [
  "ASIC Design",
  "FPGA Development",
  "SoC Architecture",
  "DFT & ATPG",
  "Physical Design (PNR)",
];

/* ═══════════════════════════════════════════════
   HERO SECTION — main export
═══════════════════════════════════════════════ */
export default function SDHero() {
  return (
    <section
      id="sd-hero"
      className="sol-hero-section"
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT,
        paddingBottom: 110, // space for stat strip
      }}
    >

      {/* ── VIDEO BACKGROUND ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0, left: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src="/videos/hero-1.mp4" type="video/mp4" />
      </video>

      {/* ── DARK OVERLAY ── */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 1,
        background:
          "linear-gradient(160deg, rgba(5,12,26,0.80) 0%, rgba(8,14,30,0.72) 50%, rgba(4,10,22,0.82) 100%)",
      }} />

      {/* ── DOT GRID ── */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 2,
        pointerEvents: "none",
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      {/* ══════════════════════════════════════
          MAIN CONTENT  — z-index 3
      ══════════════════════════════════════ */}
      <div style={{
        position: "relative",
        zIndex: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "80px 24px 0",
        maxWidth: 860,
        width: "100%",
      }}>

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 24,
            fontSize: 12,
            color: "rgba(255,255,255,0.40)",
          }}
        >
          <a href="/"          style={{ color: "inherit", textDecoration: "none" }}>Home</a>
          <ChevronRight style={{ width: 12, height: 12 }} />
          <a href="/solutions" style={{ color: "inherit", textDecoration: "none" }}>Solutions</a>
          <ChevronRight style={{ width: 12, height: 12 }} />
          <span style={{ color: "rgba(56,189,248,0.90)", fontWeight: 600 }}>
            Semiconductor Design
          </span>
        </motion.div>

        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "7px 18px",
            borderRadius: 50,
            marginBottom: 28,
            border: "1.5px solid rgba(56,189,248,0.40)",
            background: "rgba(56,189,248,0.10)",
            backdropFilter: "blur(12px)",
          }}
        >
          <motion.span
            animate={{ scale: [1, 1.8, 1], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: 7, height: 7,
              borderRadius: "50%",
              background: "#38bdf8",
              display: "inline-block",
            }}
          />
          <span style={{
            color: "#67e8f9",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}>
            Semiconductor Design Services
          </span>
        </motion.div>

        {/* ── MAIN HEADING ── */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
          style={{
            fontSize: "clamp(3rem, 7vw, 5.6rem)",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.05em",
            margin: "0 0 24px",
            fontFamily: FONT,
            color: "#fff",
          }}
        >
          From RTL.
          <br />
          <span style={{
            background:
              "linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #06b6d4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            to GDSII.
          </span>
        </motion.h1>

        {/* ── SUBHEADING ── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28 }}
          style={{
            color: "rgba(203,213,225,0.80)",
            fontSize: "clamp(1rem, 1.8vw, 1.1rem)",
            lineHeight: 1.85,
            maxWidth: 620,
            margin: "0 0 36px",
          }}
        >
          Silicon-proven teams delivering end-to-end ASIC, FPGA, and SoC design
          across TSMC, Samsung, and GlobalFoundries nodes — from architecture
          and RTL through DFT, physical design, and GDSII tapeout.
        </motion.p>

        {/* ── PILL TAGS ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          {PILLS.map((p, i) => (
            <motion.span
              key={p}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.42 + i * 0.07, ease: EASE }}
              style={{
                padding: "6px 14px",
                borderRadius: 50,
                fontSize: 11,
                fontWeight: 600,
                background: "rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.75)",
                border: "1px solid rgba(255,255,255,0.14)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <CheckCircle2 style={{ width: 11, height: 11, color: "#38bdf8" }} />
              {p}
            </motion.span>
          ))}
        </motion.div>

        {/* ── CTA BUTTONS ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52 }}
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: 28,
          }}
        >
          <MagButton primary href="/contact">
            Start a Project <ArrowRight style={{ width: 16, height: 16 }} />
          </MagButton>
          <MagButton href="/contact">
            Talk to an Engineer
          </MagButton>
        </motion.div>

        {/* ── TRUST LINE ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          style={{
            color: "rgba(148,163,184,0.45)",
            fontSize: 12,
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: 6,
            justifyContent: "center",
            flexWrap: "wrap",
            textAlign: "center",
          }}
        >
          <Activity style={{ width: 13, height: 13, color: "#4ade80" }} />
          <span>Trusted by Qualcomm · TI · ISRO · MediaTek · Samsung · Marvell</span>
        </motion.p>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        style={{
          position: "relative",
          zIndex: 3,
          marginTop: 36,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span style={{
          color: "rgba(148,163,184,0.30)",
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}>
          Scroll
        </span>
        <div style={{
          width: 1,
          height: 32,
          background: "linear-gradient(180deg, rgba(56,189,248,0.5), transparent)",
        }} />
      </motion.div>

      {/* ══════════════════════════════════════
          BOTTOM STAT STRIP  — pinned to bottom
      ══════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.70 }}
        className="sol-hero-stats"
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          zIndex: 3,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          background: "rgba(0,0,0,0.48)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {[
          { value: "200+", label: "Tape-outs Delivered"  },
          { value: "28nm", label: "Advanced Process Node" },
          { value: "12+",  label: "Years of Expertise"   },
          { value: "E2E",  label: "Full Ownership"        },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.78 + i * 0.08 }}
            className="sol-hero-stat-item"
            style={{
              padding: "22px 16px",
              textAlign: "center",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}
          >
            <p style={{
              margin: 0,
              fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
              fontWeight: 900,
              color: "#fff",
              letterSpacing: "-0.04em",
              fontFamily: FONT,
            }}>
              {s.value}
            </p>
            <p style={{
              margin: "4px 0 0",
              fontSize: 11,
              color: "rgba(148,163,184,0.50)",
              fontWeight: 600,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
            }}>
              {s.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        @media (max-width: 960px) {
          .sol-hero-section {
            padding-bottom: 0px !important;
            min-height: auto !important;
            padding-top: 80px !important;
          }
          .sol-hero-stats {
            grid-template-columns: repeat(2, 1fr) !important;
            position: relative !important;
            margin-top: 40px;
          }
          .sol-hero-stat-item {
            border-bottom: 1px solid rgba(255,255,255,0.06);
            padding: 16px 12px !important;
          }
          .sol-hero-stat-item:nth-child(even) {
            border-right: none !important;
          }
          .sol-hero-stat-item:nth-child(3), .sol-hero-stat-item:nth-child(4) {
            border-bottom: none !important;
          }
        }
        @media (max-width: 480px) {
          .sol-hero-stats {
            grid-template-columns: 1fr !important;
          }
          .sol-hero-stat-item {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.06) !important;
          }
          .sol-hero-stat-item:last-child {
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  );
}