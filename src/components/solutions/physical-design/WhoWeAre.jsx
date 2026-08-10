// WhoWeAre.jsx — Physical Design Page
// AurowinX — Physical Design About
// Light & professional, indigo accent, tight spacing

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { C, FONT, EASE } from "./theme";

const ABOUT_POINTS = [
  "Specialized in full RTL-to-GDSII physical design implementation",
  "Embedded on-site engineering & in-house project execution",
  "Expertise across TSMC, Samsung, GlobalFoundries, UMC nodes",
  "Proven flat and hierarchical PNR flows down to 5nm",
];

const DOMAIN_STATS = [
  { title: "Advanced Nodes", desc: "Flows proven down to 5nm", color: "#4f46e5" },
  { title: "Multi-Foundry",  desc: "TSMC, Samsung, GlobalFoundries, UMC", color: "#7c3aed" },
  { title: "Flexible PNR",   desc: "Flat & hierarchical implementation", color: "#0891b2" },
];

/* ── Responsive hook (shared pattern) ── */
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

export default function WhoWeAre() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { isMobile, isTablet, isCompact, isTV } = useViewport();

  const sectionPad = isMobile
    ? "44px 16px 40px"
    : isTablet
    ? "52px 28px 48px"
    : "clamp(56px, 6vw, 88px) clamp(32px, 5vw, 80px) clamp(48px, 5vw, 72px)";

  const sectionMaxW = isTV ? 1760 : 1280;

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

      <div style={{ maxWidth: sectionMaxW, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Top intro */}
        <div style={{
          display: isCompact ? "flex" : "grid",
          flexDirection: isCompact ? "column" : undefined,
          gridTemplateColumns: isCompact ? undefined : "1fr 1fr",
          gap: isMobile ? 28 : isTablet ? 32 : 32,
          alignItems: isCompact ? "stretch" : "center",
        }}>

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: isCompact ? 0 : -20, y: isCompact ? 16 : 0 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
              <span style={{ color: C.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Who We Are</span>
            </div>
            <h2 style={{
              fontSize: "clamp(1.7rem, 4vw, 2.6rem)", fontWeight: 900,
              color: C.textPrimary, margin: "0 0 14px",
              letterSpacing: "-0.04em", fontFamily: FONT, lineHeight: 1.1,
            }}>
              Your Dedicated<br />
              <span style={{
                background: C.gradPrimary,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Physical Design Partner
              </span>
            </h2>
            <p style={{ color: C.textSecondary, fontSize: "clamp(13px, 1.4vw, 14px)", lineHeight: 1.8, margin: "0 0 20px", maxWidth: isCompact ? "100%" : 420 }}>
              Floorplanning decisions made in week one decide whether timing closes in week ten — our Physical Design team weighs hierarchical vs. flat PNR strategy and node-specific cell-library constraints upfront, so RTL-to-GDSII signoff doesn't stall on late-stage ECOs.
            </p>
            <motion.a
              href="/contact" whileHover={{ x: 4 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                color: C.primary, fontWeight: 700, fontSize: 13, textDecoration: "none",
              }}
            >
              Work with us <ChevronRight style={{ width: 15, height: 15 }} />
            </motion.a>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: isCompact ? 0 : 20, y: isCompact ? 16 : 0 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            {/* About points */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {ABOUT_POINTS.map((pt, i) => (
                <motion.div
                  key={pt}
                  initial={{ opacity: 0, x: isCompact ? 0 : 10, y: isCompact ? 8 : 0 }}
                  animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.07, ease: EASE }}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 10,
                    padding: "10px 14px", borderRadius: 10,
                    background: C.bgAccent, border: `1px solid ${C.borderLight}`,
                    boxShadow: C.shadowSm,
                  }}
                >
                  <CheckCircle2 style={{ width: 15, height: 15, color: "#22c55e", flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 13, color: C.textPrimary, fontWeight: 600, lineHeight: 1.5 }}>{pt}</span>
                </motion.div>
              ))}
            </div>

            {/* Mini stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: isMobile ? 8 : 12 }}>
              {DOMAIN_STATS.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, ease: EASE }}
                  style={{
                    padding: isMobile ? "12px 8px" : "14px 12px", borderRadius: 12, textAlign: "center",
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
