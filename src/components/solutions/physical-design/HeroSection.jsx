// HeroSection.jsx — Physical Design Hero
// AurowinX Physical Design
// Fully responsive — matches DV/DFT hero pattern exactly

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, ChevronRight, CheckCircle2, Activity } from "lucide-react";
import { C, FONT, EASE } from "./theme";

/* ── Magnetic Button ── */
function MagButton({ children, primary, href }) {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20 });
  const sy = useSpring(y, { stiffness: 260, damping: 20 });
  return (
    <motion.a
      ref={ref} href={href || "#"}
      onMouseMove={e => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.28);
        y.set((e.clientY - r.top - r.height / 2) * 0.28);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{
        x: sx, y: sy, textDecoration: "none",
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "14px 32px", borderRadius: 50,
        fontFamily: FONT, fontWeight: 700, fontSize: 14,
        cursor: "pointer", letterSpacing: "-0.01em",
        ...(primary
          ? {
              background: C.gradPrimary,
              color: "#fff",
              boxShadow: "0 8px 28px rgba(79,70,229,0.45)",
            }
          : {
              background: "rgba(255,255,255,0.10)",
              color: "#fff",
              border: "1.5px solid rgba(255,255,255,0.30)",
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

const pills = [
  "RTL to GDSII",
  "Floorplanning",
  "Placement & Routing",
  "STA Sign-Off",
  "IR Drop Analysis",
  "DRC/LVS Clean",
];

const STATS = [
  { value: "GDSII", label: "Tape-out Ready"    },
  { value: "5nm+",  label: "Advanced Nodes"    },
  { value: "100%",  label: "DRC/LVS Clean"     },
  { value: "150+",  label: "Designs Delivered" },
];

export default function HeroSection() {
  return (
    <section
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
        paddingBottom: 110,
      }}
    >

      {/* ── VIDEO BACKGROUND — z-index 0 ── */}
      <video
        autoPlay loop muted playsInline
        style={{
          position: "absolute", top: 0, left: 0,
          width: "100%", height: "100%",
          objectFit: "cover", zIndex: 0,
        }}
      >
        <source src="/videos/PD.mp4" type="video/mp4" />
      </video>

      {/* ── DARK OVERLAY — z-index 1 ── */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 1,
        background: "linear-gradient(160deg, rgba(8,4,24,0.78) 0%, rgba(12,8,36,0.72) 50%, rgba(4,8,24,0.80) 100%)",
      }} />

      {/* ── DOT GRID — z-index 2 ── */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 2, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      {/* ── MAIN CONTENT — z-index 3 ── */}
      <div style={{
        position: "relative", zIndex: 3,
        display: "flex", flexDirection: "column",
        alignItems: "center", textAlign: "center",
        padding: "80px 24px 0",
        maxWidth: 860, width: "100%",
      }}>

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            marginBottom: 24, fontSize: 12,
            color: "rgba(255,255,255,0.45)",
          }}
        >
          <a href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</a>
          <ChevronRight style={{ width: 12, height: 12 }} />
          <a href="/solutions" style={{ color: "inherit", textDecoration: "none" }}>Solutions</a>
          <ChevronRight style={{ width: 12, height: 12 }} />
          <span style={{ color: "rgba(165,180,252,0.9)", fontWeight: 600 }}>Physical Design</span>
        </motion.div>

        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "7px 18px", borderRadius: 50, marginBottom: 28,
            border: "1.5px solid rgba(99,102,241,0.45)",
            background: "rgba(99,102,241,0.15)",
            backdropFilter: "blur(12px)",
          }}
        >
          <motion.span
            animate={{ scale: [1, 1.8, 1], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 7, height: 7, borderRadius: "50%", background: "#818cf8", display: "inline-block" }}
          />
          <span style={{ color: "#a5b4fc", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            Physical Design Services
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
          style={{
            fontSize: "clamp(3rem, 7vw, 5.6rem)",
            fontWeight: 900, lineHeight: 0.95,
            letterSpacing: "-0.05em",
            margin: "0 0 24px",
            fontFamily: FONT, color: "#fff",
          }}
        >
          RTL to GDSII.
          <br />
          <span style={{
            background: "linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #67e8f9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Precision at Every Layer.
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28 }}
          style={{
            color: "rgba(203,213,225,0.80)",
            fontSize: "clamp(1rem, 1.8vw, 1.1rem)",
            lineHeight: 1.85, maxWidth: 620,
            margin: "0 0 36px",
          }}
        >
          End-to-end physical design services from RTL synthesis and floorplanning
          through placement, routing, and sign-off — delivering DRC/LVS-clean,
          timing-closed GDSII across advanced process nodes.
        </motion.p>

        {/* Pill tags */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
          className="sol-hero-pills"
          style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 40 }}
        >
          {pills.map((p, i) => (
            <motion.span
              key={p}
              data-pill-index={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.42 + i * 0.07, ease: EASE }}
              style={{
                padding: "6px 14px", borderRadius: 50,
                fontSize: 11, fontWeight: 600,
                background: "rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.75)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                display: "flex", alignItems: "center", gap: 6,
              }}
            >
              <CheckCircle2 style={{ width: 11, height: 11, color: "#818cf8" }} />
              {p}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52 }}
          style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 28 }}
        >
          <MagButton primary href="/contact">
            Start Physical Design Project <ArrowRight style={{ width: 16, height: 16 }} />
          </MagButton>
          <MagButton href="/contact">
            Talk to a PD Engineer
          </MagButton>
        </motion.div>

        {/* Trust line — short on mobile, full on desktop */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          style={{
            color: "rgba(148,163,184,0.50)",
            fontSize: 12, margin: 0,
            display: "flex", alignItems: "center", gap: 6,
            justifyContent: "center", flexWrap: "wrap", textAlign: "center",
          }}
        >
          <Activity style={{ width: 13, height: 13, color: "#4ade80" }} />
          <span className="sol-hero-trust-line">Trusted by Tier-1 foundry partners worldwide</span>
          <span className="sol-hero-trust-full">TSMC · Samsung · GlobalFoundries · UMC — down to 5nm</span>
        </motion.p>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        className="sol-hero-scroll-cue"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        style={{
          position: "relative", zIndex: 3,
          marginTop: 36,
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 6,
        }}
      >
        <span style={{ color: "rgba(148,163,184,0.35)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: 1, height: 32, background: "linear-gradient(180deg, rgba(99,102,241,0.5), transparent)" }} />
      </motion.div>

      {/* ── BOTTOM STAT STRIP (desktop grid) — pinned to bottom ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="sol-hero-stats sol-hero-stats-grid"
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          zIndex: 3,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.75 + i * 0.08 }}
            className="sol-hero-stat-item"
            style={{
              padding: "22px 16px", textAlign: "center",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}
          >
            <p style={{
              margin: 0,
              fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
              fontWeight: 900, color: "#fff",
              letterSpacing: "-0.04em", fontFamily: FONT,
            }}>{s.value}</p>
            <p style={{
              margin: "4px 0 0", fontSize: 11,
              color: "rgba(148,163,184,0.55)",
              fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase",
            }}>{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── RESPONSIVE STYLES ── */}
      <style>{`
        .sol-hero-trust-line { display: none; }
        .sol-hero-trust-full { display: inline; }

        @media (max-width: 960px) {
          .sol-hero-section {
            padding-bottom: 0px !important;
            min-height: auto !important;
            padding-top: 80px !important;
          }
          .sol-hero-scroll-cue {
            display: none !important;
          }
          .sol-hero-trust-line { display: inline; }
          .sol-hero-trust-full { display: none; }
          .sol-hero-pills [data-pill-index="3"],
          .sol-hero-pills [data-pill-index="4"],
          .sol-hero-pills [data-pill-index="5"] {
            display: none;
          }
          .sol-hero-stats-grid {
            display: none !important;
          }
          .sol-hero-stats-scroll {
            display: flex !important;
          }
        }
        @media (max-width: 480px) {
          .sol-hero-pills [data-pill-index="2"] {
            display: none;
          }
        }
      `}</style>

      {/* ── MOBILE: horizontal swipe stat strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="sol-hero-stats sol-hero-stats-scroll"
        style={{
          display: "none",
          position: "relative",
          zIndex: 3,
          marginTop: 32,
          width: "100%",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          gap: 10,
          padding: "0 16px 4px",
        }}
      >
        {STATS.map((s) => (
          <div
            key={s.label}
            className="sol-hero-stat-item"
            style={{
              flex: "0 0 72%",
              scrollSnapAlign: "start",
              padding: "18px 16px",
              textAlign: "center",
              background: "rgba(0,0,0,0.48)",
              backdropFilter: "blur(20px)",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <p style={{
              margin: 0,
              fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
              fontWeight: 900, color: "#fff",
              letterSpacing: "-0.04em", fontFamily: FONT,
            }}>{s.value}</p>
            <p style={{
              margin: "4px 0 0", fontSize: 11,
              color: "rgba(148,163,184,0.55)",
              fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase",
            }}>{s.label}</p>
          </div>
        ))}
      </motion.div>

    </section>
  );
}