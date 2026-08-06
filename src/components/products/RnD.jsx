// src/components/products/RnD.jsx
// R&D — completely distinct from Engineering Services: a dark, glowing
// process timeline (Consulting -> Feasibility -> PoC -> Prototyping -> Validation)
// instead of the light rail+spotlight pattern used elsewhere on this page.
// Horizontal with connecting arrows on desktop, stacked vertical list on mobile/tablet.

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Zap, PackageCheck, Compass, FlaskConical, MessageSquare, ArrowRight,
} from "lucide-react";
import { FONT, EASE } from "./theme";
import OrbitalCanvas from "./OrbitalCanvas";

const ACCENT = "#a78bfa";
const ACCENT_SOFT = "rgba(167,139,250,0.14)";
const ACCENT_BORDER = "rgba(167,139,250,0.30)";

const FEATURES = [
  { icon: MessageSquare, title: "Technology Consulting",        body: "Expert guidance to scope, de-risk, and plan new product initiatives from day one." },
  { icon: Compass,       title: "Feasibility Studies",          body: "Technical and commercial feasibility assessments before committing to full development." },
  { icon: FlaskConical,  title: "Proof-of-Concept Development", body: "Early-stage builds that validate core ideas and technical approach before investment scales." },
  { icon: Zap,           title: "Rapid Prototyping",            body: "Fast prototype development and iterative design validation to accelerate time-to-market." },
  { icon: PackageCheck,  title: "Product Validation",           body: "Comprehensive functional, environmental, reliability, and compliance testing." },
];

const STATS = [
  { val: "PoC", label: "to Product" },
  { val: "5", label: "R&D Stages" },
  { val: "Fast", label: "Iteration" },
];

function TimelineNode({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.div
      className="rnd-node"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.5), ease: EASE }}
    >
      <div className="rnd-node-badge">
        <Icon style={{ width: 20, height: 20, color: ACCENT }} strokeWidth={1.7} />
      </div>
      <div className="rnd-node-content">
        <span className="rnd-node-index">{String(index + 1).padStart(2, "0")}</span>
        <h4 className="rnd-node-title">{item.title}</h4>
        <p className="rnd-node-body">{item.body}</p>
      </div>
    </motion.div>
  );
}

export default function RnD() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="rnd"
      ref={sectionRef}
      className="rnd3-section"
      style={{
        position: "relative", overflow: "hidden", fontFamily: FONT,
        padding: "clamp(72px,10vh,110px) 0 clamp(64px,8vh,96px)",
        background: "linear-gradient(160deg,#0b0716 0%,#140b28 50%,#0a0714 100%)",
      }}
    >
      <OrbitalCanvas colors={["#a78bfa", "#c4b5fd", "#7c3aed"]} opacity={0.6} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "radial-gradient(circle,rgba(167,139,250,0.12) 1px,transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      <div className="rnd3-wrap" style={{
        position: "relative", zIndex: 1, width: "100%", maxWidth: 1280,
        margin: "0 auto", padding: "0 clamp(20px,4vw,48px)",
      }}>

        {/* Header */}
        <div className="rnd3-header" style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          gap: 24, flexWrap: "wrap", marginBottom: "clamp(44px,6vw,68px)",
        }}>
          <div style={{ maxWidth: 620 }}>
            <motion.p initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, ease: EASE }}
              style={{
                margin: "0 0 8px", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em",
                textTransform: "uppercase", color: ACCENT, display: "flex", alignItems: "center", gap: 10,
              }}>
              <span style={{ width: 22, height: 1, background: ACCENT, opacity: 0.7 }} />
              R&amp;D
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
              style={{
                margin: "0 0 12px", fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 900,
                lineHeight: 1.02, letterSpacing: "-0.03em", color: "#f8fafc",
              }}>
              Explore First.{" "}
              <span style={{
                background: "linear-gradient(135deg,#a78bfa 0%,#c4b5fd 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Scale Fast.
              </span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
              style={{ margin: 0, fontSize: "clamp(0.9rem,1.2vw,1.02rem)", lineHeight: 1.7, color: "rgba(226,232,240,0.62)" }}>
              Technology consulting, feasibility studies, proof-of-concept development, rapid prototyping, testing, and engineering innovation.
            </motion.p>
          </div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            {STATS.map((s) => (
              <div key={s.label} style={{
                textAlign: "center", padding: "10px 14px", borderRadius: 12,
                background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)",
                border: `1px solid ${ACCENT_BORDER}`, minWidth: 74,
              }}>
                <p style={{ margin: 0, fontSize: 17, fontWeight: 900, color: ACCENT, letterSpacing: "-0.02em" }}>{s.val}</p>
                <p style={{ margin: "2px 0 0", fontSize: 9, fontWeight: 600, color: "rgba(226,232,240,0.45)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Process timeline */}
        <div className="rnd3-timeline">
          {FEATURES.map((item, i) => (
            <div className="rnd3-step" key={item.title}>
              <TimelineNode item={item} index={i} />
              {i < FEATURES.length - 1 && (
                <div className="rnd3-arrow">
                  <ArrowRight style={{ width: 16, height: 16 }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .rnd3-timeline { display: flex; flex-direction: column; }
        .rnd3-step { display: flex; flex-direction: column; }
        .rnd-node { display: flex; align-items: flex-start; gap: 16px; padding: 18px 0; }
        .rnd-node-badge {
          width: 46px; height: 46px; border-radius: 14px; flex-shrink: 0;
          background: ${ACCENT_SOFT}; border: 1px solid ${ACCENT_BORDER};
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 20px rgba(167,139,250,0.20);
        }
        .rnd-node-content { flex: 1; min-width: 0; }
        .rnd-node-index { display: block; font-size: 10.5px; font-weight: 700; color: ${ACCENT}; opacity: 0.7; letter-spacing: 0.06em; margin-bottom: 4px; }
        .rnd-node-title { margin: 0 0 6px; font-size: 16px; font-weight: 800; color: #f8fafc; font-family: ${FONT}; }
        .rnd-node-body { margin: 0; font-size: 13px; line-height: 1.65; color: rgba(226,232,240,0.55); font-family: ${FONT}; max-width: 460px; }
        .rnd3-arrow { display: none; }

        @media (min-width: 1024px) {
          .rnd3-timeline { flex-direction: row; align-items: flex-start; }
          .rnd3-step { flex: 1; flex-direction: row; align-items: flex-start; }
          .rnd-node { flex-direction: column; align-items: flex-start; padding: 0; gap: 0; }
          .rnd-node-badge { margin-bottom: 16px; }
          .rnd-node-body { max-width: none; }
          .rnd3-arrow {
            display: flex; align-items: center; justify-content: center;
            width: 32px; flex-shrink: 0; margin-top: 15px;
            color: ${ACCENT}; opacity: 0.35;
          }
        }
        @media (max-width: 640px) {
          .rnd3-header { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </section>
  );
}
