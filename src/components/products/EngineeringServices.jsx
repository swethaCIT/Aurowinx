// src/components/products/EngineeringServices.jsx
// Engineering Services — one-screen-fit section with ambient 3D background
// and a responsive capability carousel (mobile/tablet/desktop/TV).
//
// MOBILE/TABLET FIX PASS
// Root cause of "lots of empty space" + "3D motion huge": the section was
// forced to height:100dvh (min 560 / max 900) by default, and that was only
// relaxed to auto-height for desktop (>=1024px). On mobile/tablet the short
// content got vertically centered inside a full-viewport-height box, leaving
// dead space above/below, and the ambient canvas (which fills the section)
// read as oversized relative to the actual content.
//
// Fix: auto-height is now the default for every breakpoint (desktop's
// behavior didn't change — it was already auto). Header/tag breakpoints were
// also widened so tablets don't get squeezed, and the ambient canvas is
// dimmed slightly below 1024px so it reads as background texture.

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Layers, Cpu, CircuitBoard, Waves, Radio, Thermometer, ShieldCheck,
} from "lucide-react";
import { FONT, EASE } from "./theme";
import AmbientCanvas from "./AmbientCanvas";
import CapabilityCarousel from "./CapabilityCarousel";
import CapabilityShowcase from "./CapabilityShowcase";

const ACCENT = "#4f46e5";
const ACCENT_SOFT = "#e0e7ff";
const ACCENT_BORDER = "rgba(79,70,229,0.18)";

const FEATURES = [
  { icon: Layers,       title: "Product Architecture", body: "End-to-end system architecture design that optimizes performance, scalability, reliability, and cost." },
  { icon: Cpu,          title: "Hardware Design",       body: "Complete electronic hardware design, from concept to production, including analog, digital, mixed-signal, and power electronics." },
  { icon: CircuitBoard, title: "PCB Design",            body: "High-speed, high-power, multilayer PCB layout optimized for signal integrity, thermal performance, and manufacturability." },
  { icon: Waves,        title: "Simulation",            body: "Advanced circuit, magnetic, thermal, and system-level simulations to optimize design performance before prototyping." },
  { icon: Radio,        title: "EMI/EMC",               body: "Design and optimization for electromagnetic compatibility, ensuring regulatory compliance with minimal emissions." },
  { icon: Thermometer,  title: "Thermal Design",        body: "Thermal analysis and cooling solutions using simulation and practical design techniques to maximize reliability." },
  { icon: ShieldCheck,  title: "Compliance",            body: "Product development aligned with international safety, EMC, environmental, and industry-specific regulatory standards." },
];

const STATS = [
  { val: "E2E", label: "Ownership" },
  { val: "7", label: "Core Disciplines" },
  { val: "DFM", label: "Ready" },
];

export default function EngineeringServices() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="engineering-services"
      ref={sectionRef}
      className="es2-section"
      style={{
        position: "relative",
        overflow: "hidden", display: "flex", flexDirection: "column",
        justifyContent: "center", fontFamily: FONT,
      }}
    >
      <div className="es2-ambient-wrap" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <AmbientCanvas colors={["#4f46e5", "#7c3aed", "#6366f1"]} opacity={0.4} />
      </div>

      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "radial-gradient(circle,rgba(79,70,229,0.06) 1px,transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      <div className="es2-wrap" style={{
        position: "relative", zIndex: 1, width: "100%", maxWidth: 1280,
        margin: "0 auto", padding: "0 clamp(20px,4vw,48px)",
        display: "flex", flexDirection: "column", gap: "clamp(20px,4vh,40px)",
        justifyContent: "center", boxSizing: "border-box",
        paddingTop: "clamp(56px,8vh,80px)", paddingBottom: "clamp(40px,6vh,64px)",
      }}>

        {/* Header row */}
        <div className="es2-header" style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          gap: 24, flexWrap: "wrap",
        }}>
          <div className="es2-header-text" style={{ maxWidth: 620 }}>
            <motion.p className="es2-badge-row" initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, ease: EASE }}
              style={{
                margin: "0 0 8px", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em",
                textTransform: "uppercase", color: "#6366f1", display: "flex", alignItems: "center", gap: 10,
              }}>
              <span className="es2-badge-line" style={{ width: 22, height: 1, background: ACCENT, opacity: 0.6 }} />
              Engineering Services
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
              className="es2-heading"
              style={{
                margin: "0 0 8px", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900,
                lineHeight: 1.02, letterSpacing: "-0.03em", color: "#0f172a",
              }}>
              Concept to{" "}
              <span style={{
                background: "linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Production.
              </span>
            </motion.h2>
            <motion.p className="es2-desc" initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
              style={{ margin: 0, fontSize: "clamp(0.85rem,1.1vw,0.98rem)", lineHeight: 1.6, color: "#475569" }}>
              Complete electronic hardware design, from concept to production, including analog, digital, mixed-signal, and power electronics.
            </motion.p>
          </div>

          <motion.div className="es2-stats" initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            {STATS.map((s) => (
              <div key={s.label} style={{
                textAlign: "center", padding: "10px 14px", borderRadius: 12,
                background: "rgba(255,255,255,0.6)", backdropFilter: "blur(12px)",
                border: `1px solid ${ACCENT_BORDER}`, minWidth: 74,
              }}>
                <p style={{ margin: 0, fontSize: 17, fontWeight: 900, color: ACCENT, letterSpacing: "-0.02em" }}>{s.val}</p>
                <p style={{ margin: "2px 0 0", fontSize: 9, fontWeight: 600, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile/tablet carousel + desktop/TV showcase — CSS toggles between them */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.26, ease: EASE }}>
          <CapabilityCarousel items={FEATURES} accent={ACCENT} accentSoft={ACCENT_SOFT} accentBorder={ACCENT_BORDER} />
          <CapabilityShowcase items={FEATURES} accent={ACCENT} accentSoft={ACCENT_SOFT} accentBorder={ACCENT_BORDER} />
        </motion.div>

        {/* Discipline tags — desktop-only recap row (see .es2-tags rule below).
            On mobile/tablet the carousel/showcase already surfaces every title,
            so the tag row is redundant there and was adding extra height. */}
        <motion.div className="es2-tags" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.5 }}
          style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {FEATURES.map((f) => (
            <span key={f.title} style={{
              padding: "6px 14px", borderRadius: 50, fontSize: 11, fontWeight: 600,
              color: "#3730a3", background: "rgba(255,255,255,0.55)",
              border: `1px solid ${ACCENT_BORDER}`, backdropFilter: "blur(8px)",
            }}>
              {f.title}
            </span>
          ))}
        </motion.div>
      </div>

      <style>{`
        /* Auto-height by default for every breakpoint — this is the actual
           fix for the empty-space/oversized-3D complaint on mobile/tablet.
           Desktop's own rule below still applies (unchanged from before). */
        .es2-section { height: auto; min-height: 0; max-height: none; }
        .es2-wrap { height: auto; }

        /* Discipline tag recap row: desktop-only (was previously visible on
           tablet, adding unnecessary height there). */
        .es2-tags { display: none !important; }

        /* Dim the ambient 3D canvas below desktop so it reads as background
           texture instead of the dominant visual on short mobile sections. */
        @media (max-width: 1023px) {
          .es2-ambient-wrap { opacity: 0.6; }
        }

        @media (max-width: 900px) {
          .es2-header { flex-direction: column; align-items: center; text-align: center; }
          .es2-header-text { max-width: none !important; margin: 0 auto; }
          .es2-badge-row { justify-content: center !important; }
          .es2-badge-line { display: none; }
          .es2-stats { width: 100%; justify-content: center; }
          .es2-stats > div { flex: 1; }
        }
        @media (max-width: 640px) {
          .es2-desc { display: none; }
          .es2-heading { font-size: clamp(1.6rem, 8vw, 2.1rem) !important; }
        }

        /* Desktop/TV: give the section its previous generous top/bottom
           padding now that height is auto everywhere by default. Layout
           itself is unchanged from before. */
        @media (min-width: 1024px) {
          .es2-wrap { padding-top: clamp(100px,13vh,128px) !important; padding-bottom: clamp(56px,7vh,80px) !important; }
          .es2-tags { display: flex !important; }
          .es2-ambient-wrap { opacity: 1; }
        }
        @media (min-width: 1920px) {
          .es2-wrap { max-width: 1520px !important; }
        }
      `}</style>
    </section>
  );
}