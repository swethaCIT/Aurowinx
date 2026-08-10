// WhoWeAre.jsx — DFT Page
// AurowinX — DFT About
// Fully responsive: mobile → tablet → desktop → TV wide

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, ChevronRight } from "lucide-react";
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
const ABOUT_POINTS = [
  "DFT architecture planned from day one, not bolted on late",
  "Full scan, MBIST, and ATPG implementation and validation",
  "ATE handoff and post-silicon test support",
  "Proven across ASIC, FPGA and SoC testability programs",
];

/* ─── MAIN ───────────────────────────────────── */
export default function WhoWeAre() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const bp     = useBreakpoint();

  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const isTV     = bp === "tv";
  const isSmall  = isMobile || isTablet;

  const sectionPad = isMobile
    ? "48px 20px 44px"
    : isTablet
    ? "56px 32px 48px"
    : isTV
    ? "80px 80px 72px"
    : "64px 48px 56px";

  const introGrid = isSmall
    ? { gridTemplateColumns: "1fr", gap: 28 }
    : isTV
    ? { gridTemplateColumns: "1fr 1fr", gap: 56 }
    : { gridTemplateColumns: "1fr 1fr", gap: 32 };

  return (
    <section
      ref={ref}
      style={{
        background: "#fff",
        padding: sectionPad,
        position: "relative", overflow: "hidden", fontFamily: FONT,
      }}
    >
      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(79,70,229,0.05) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      <div style={{ maxWidth: isTV ? 1600 : 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Intro block ── */}
        <div style={{ display: "grid", ...introGrid, alignItems: "center" }}>

          {/* Left — heading */}
          <motion.div
            initial={{ opacity: 0, x: isSmall ? 0 : -20, y: isSmall ? 16 : 0 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
              <span style={{ color: C.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Who We Are</span>
            </div>
            <h2 style={{
              fontSize: isMobile ? "1.7rem" : isTablet ? "2rem" : isTV ? "3rem" : "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 900, color: C.textPrimary, margin: "0 0 14px",
              letterSpacing: "-0.04em", fontFamily: FONT, lineHeight: 1.05,
            }}>
              Your Dedicated<br />
              <span style={{
                background: C.gradPrimary,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                DFT Partner
              </span>
            </h2>
            <p style={{ color: C.textSecondary, fontSize: isMobile ? 13.5 : 14, lineHeight: 1.8, margin: "0 0 20px", maxWidth: 420 }}>
              Testability isn't an afterthought — our DFT team architects scan, MBIST, and ATPG strategy from day one, so every design ships ATE-ready with fault coverage that holds up in production.
            </p>
            <motion.a
              href="/contact" whileHover={{ x: 4 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                color: C.primary, fontWeight: 700, fontSize: 13,
                textDecoration: "none",
              }}
            >
              Work with us <ChevronRight style={{ width: 15, height: 15 }} />
            </motion.a>
          </motion.div>

          {/* Right — about points + stats */}
          <motion.div
            initial={{ opacity: 0, x: isSmall ? 0 : 20, y: isSmall ? 16 : 0 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            {/* About points */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {ABOUT_POINTS.map((pt, i) => (
                <motion.div
                  key={pt}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.07, ease: EASE }}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 10,
                    padding: "10px 14px", borderRadius: 10,
                    background: C.bgAccent, border: `1px solid ${C.borderLight}`,
                    boxShadow: C.shadowSm,
                  }}
                >
                  <CheckCircle2 style={{ width: 15, height: 15, color: "#22c55e", flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: isMobile ? 12.5 : 13, color: C.textPrimary, fontWeight: 600, lineHeight: 1.5 }}>{pt}</span>
                </motion.div>
              ))}
            </div>

            {/* Capability highlights */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: isMobile ? 8 : 12 }}>
              {[
                { title: "Full DFT Flow",  desc: "Scan, MBIST & ATPG coverage", color: "#4f46e5" },
                { title: "Early Engagement", desc: "Architected from RTL, not bolted on", color: "#7c3aed" },
                { title: "ATE-Ready",      desc: "Silicon-proven test handoff", color: "#0891b2" },
              ].map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, ease: EASE }}
                  style={{
                    padding: isMobile ? "12px 8px" : "14px 12px",
                    borderRadius: 12, textAlign: "center",
                    background: "#fff", border: `1px solid ${C.borderLight}`,
                    boxShadow: C.shadowSm,
                  }}
                >
                  <p style={{ margin: 0, fontSize: isMobile ? 12 : 13, fontWeight: 800, color: s.color, letterSpacing: "-0.01em", fontFamily: FONT }}>{s.title}</p>
                  <p style={{ margin: "4px 0 0", fontSize: isMobile ? 9.5 : 10.5, color: C.textMuted, fontWeight: 600, lineHeight: 1.4 }}>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
