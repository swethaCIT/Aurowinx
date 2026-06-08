import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Shield, Zap, TrendingUp, Users, Award, Clock,
  CheckCircle2, ArrowRight, Star, ChevronRight
} from "lucide-react";
import { C, FONT, EASE } from "./theme";

const REASONS = [
  {
    id: 0,
    title: "Zero-Escape Philosophy",
    color: "#4f46e5", bg: "#eef2ff",
    icon: <Shield style={{ width: 22, height: 22 }} />,
    stat: { value: "99%+", label: "Bug Detection Rate" },
    desc: "We don't ship bugs to silicon. Every engagement follows a layered verification strategy — simulation, formal, emulation — ensuring zero functional escapes before tape-out.",
    proof: ["Layered sim + formal + emulation", "SVA assertions on every block", "100% coverage before sign-off", "Independent verification review"],
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80",
  },
  {
    id: 1,
    title: "Silicon-Proven Track Record",
    color: "#7c3aed", bg: "#f5f3ff",
    icon: <Award style={{ width: 22, height: 22 }} />,
    stat: { value: "180+", label: "Successful Tape-Outs" },
    desc: "Over 180 designs successfully taped out across TSMC, Samsung, GlobalFoundries and UMC — from 5nm FinFET to 180nm mature nodes.",
    proof: ["5nm to 180nm node expertise", "TSMC · Samsung · GF · UMC", "First-pass silicon success", "AEC-Q100 automotive grade"],
    img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=700&q=80",
  },
  {
    id: 2,
    title: "Full-Stack ASIC Team",
    color: "#0891b2", bg: "#ecfeff",
    icon: <Users style={{ width: 22, height: 22 }} />,
    stat: { value: "50+", label: "Senior Engineers" },
    desc: "One team. Every domain. RTL, DV, DFT, Synthesis and Physical Design specialists working in a unified flow — no handoff gaps, no delays.",
    proof: ["RTL + DV + DFT + PD unified", "Senior 10–20yr engineers", "No third-party subcontracting", "Dedicated project manager"],
    img: "https://images.unsplash.com/photo-1601132359864-c974e79890ac?w=700&q=80",
  },
  {
    id: 3,
    title: "Speed Without Compromise",
    color: "#059669", bg: "#ecfdf5",
    icon: <Zap style={{ width: 22, height: 22 }} />,
    stat: { value: "40%", label: "Faster Closure" },
    desc: "Automated regression, parallel simulation farms and reusable UVM IP libraries slash schedule time — without cutting corners on quality.",
    proof: ["24/7 simulation farms", "Reusable UVM component library", "Automated coverage closure", "Parallel formal + simulation"],
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=80",
  },
  {
    id: 4,
    title: "Flexible Engagement Models",
    color: "#d97706", bg: "#fffbeb",
    icon: <TrendingUp style={{ width: 22, height: 22 }} />,
    stat: { value: "2", label: "Engagement Models" },
    desc: "Whether you need embedded engineers on-site or a full in-house project team, we match our model to your workflow and timeline.",
    proof: ["On-site embedded resources", "Full in-house execution", "Block-level to full chip", "Flexible ramp up/down"],
    img: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=700&q=80",
  },
  {
    id: 5,
    title: "12+ Years of Expertise",
    color: "#dc2626", bg: "#fef2f2",
    icon: <Clock style={{ width: 22, height: 22 }} />,
    stat: { value: "2012", label: "Established" },
    desc: "Over a decade of continuous ASIC delivery means deep institutional knowledge, proven processes and a team that has seen — and solved — every edge case.",
    proof: ["Est. 2012 — 12+ years active", "Domain expertise across all verticals", "Continuous process refinement", "Long-term client partnerships"],
    img: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=700&q=80",
  },
];

/* ── Reason selector tab ── */
function ReasonTab({ reason, active, onClick, i, inView }) {
  const isActive = active === reason.id;
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
      onClick={onClick}
      style={{
        width: "100%", border: "none", cursor: "pointer",
        background: "transparent", fontFamily: FONT, textAlign: "left",
        padding: 0,
      }}
    >
      <motion.div
        animate={{
          background: isActive ? "#fff" : "transparent",
          boxShadow: isActive ? C.shadowMd : "none",
          x: isActive ? 4 : 0,
        }}
        transition={{ duration: 0.25 }}
        style={{
          display: "flex", alignItems: "center", gap: 14,
          padding: "13px 16px", borderRadius: 14,
          border: `1px solid ${isActive ? reason.color + "30" : "transparent"}`,
          position: "relative", overflow: "hidden",
        }}
      >
        {/* Active left bar */}
        {isActive && (
          <motion.div
            layoutId="activeBar"
            style={{
              position: "absolute", left: 0, top: 0, bottom: 0,
              width: 3, background: reason.color, borderRadius: "0 2px 2px 0",
            }}
          />
        )}
        {/* Icon */}
        <div style={{
          width: 38, height: 38, borderRadius: 10, flexShrink: 0,
          background: isActive ? reason.bg : C.bgSoft,
          color: isActive ? reason.color : C.textMuted,
          border: `1px solid ${isActive ? reason.color + "25" : "transparent"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.25s",
        }}>
          {reason.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            margin: 0, fontWeight: 800, fontSize: 13,
            color: isActive ? C.textPrimary : C.textSecondary,
            fontFamily: FONT, letterSpacing: "-0.02em",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {reason.title}
          </p>
          <p style={{
            margin: "2px 0 0", fontSize: 11,
            color: isActive ? reason.color : C.textMuted, fontWeight: 700,
          }}>
            {reason.stat.value} {reason.stat.label}
          </p>
        </div>
        {isActive && (
          <ChevronRight style={{ width: 14, height: 14, color: reason.color, flexShrink: 0 }} />
        )}
      </motion.div>
    </motion.button>
  );
}

/* ── Detail panel ── */
function DetailView({ reason }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={reason.id}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.4, ease: EASE }}
        style={{
          borderRadius: 24, overflow: "hidden",
          border: `1px solid ${reason.color}25`,
          boxShadow: `0 24px 64px ${reason.color}16, 0 4px 20px rgba(0,0,0,0.06)`,
        }}
      >
        {/* Image header */}
        <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
          <motion.img
            src={reason.img} alt={reason.title}
            initial={{ scale: 1.06 }} animate={{ scale: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(135deg, ${reason.color}60 0%, rgba(0,0,0,0.55) 100%)`,
          }} />
          {/* Stat overlay */}
          <div style={{ position: "absolute", top: 20, right: 20 }}>
            <div style={{
              padding: "10px 18px", borderRadius: 14,
              background: "rgba(255,255,255,0.12)", backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.25)", textAlign: "center",
            }}>
              <p style={{ margin: 0, fontSize: 24, fontWeight: 900, color: "#fff", fontFamily: FONT, letterSpacing: "-0.04em" }}>
                {reason.stat.value}
              </p>
              <p style={{ margin: "2px 0 0", fontSize: 10, color: "rgba(255,255,255,0.75)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {reason.stat.label}
              </p>
            </div>
          </div>
          {/* Icon + title */}
          <div style={{ position: "absolute", bottom: 20, left: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)",
                color: "#fff", border: "1px solid rgba(255,255,255,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {reason.icon}
              </div>
              <p style={{ margin: 0, fontSize: 20, fontWeight: 900, color: "#fff", fontFamily: FONT, letterSpacing: "-0.04em" }}>
                {reason.title}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ background: "#fff", padding: "24px 26px" }}>
          {/* Accent bar */}
          <div style={{ height: 3, width: "30%", background: `linear-gradient(90deg, ${reason.color}, ${reason.color}40)`, borderRadius: 2, marginBottom: 16 }} />

          <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.85, margin: "0 0 20px" }}>
            {reason.desc}
          </p>

          {/* Proof points 2x2 grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {reason.proof.map((pt, j) => (
              <motion.div
                key={pt}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: j * 0.07, ease: EASE }}
                style={{
                  display: "flex", alignItems: "center", gap: 9,
                  padding: "9px 12px", borderRadius: 10,
                  background: j % 2 === 0 ? reason.bg : "#f8fafc",
                  border: `1px solid ${reason.color}15`,
                }}
              >
                <CheckCircle2 style={{ width: 13, height: 13, color: reason.color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: C.textPrimary, fontWeight: 600, lineHeight: 1.4 }}>{pt}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href="/contact" whileHover={{ x: 4 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              marginTop: 18, padding: "10px 20px", borderRadius: 50,
              background: reason.color, color: "#fff",
              fontWeight: 700, fontSize: 13, textDecoration: "none",
              boxShadow: `0 6px 20px ${reason.color}35`, fontFamily: FONT,
            }}
          >
            Learn More <ArrowRight style={{ width: 14, height: 14 }} />
          </motion.a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Floating review badge ── */
function ReviewBadge({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.8, ease: EASE }}
      style={{
        background: "#fff", borderRadius: 16, padding: "14px 18px",
        border: `1px solid ${C.borderLight}`, boxShadow: C.shadowLg,
        display: "flex", alignItems: "center", gap: 14,
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: C.gradPrimary,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <Star style={{ width: 20, height: 20, color: "#fff" }} />
      </div>
      <div>
        <div style={{ display: "flex", gap: 2, marginBottom: 4 }}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} style={{ width: 13, height: 13, fill: "#fbbf24", color: "#fbbf24" }} />
          ))}
        </div>
        <p style={{ margin: 0, fontWeight: 800, fontSize: 13, color: C.textPrimary }}>Trusted by 50+ Clients</p>
        <p style={{ margin: "2px 0 0", fontSize: 11, color: C.textMuted }}>Qualcomm · TI · ISRO · MediaTek</p>
      </div>
    </motion.div>
  );
}

export default function SDWhySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(0);

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(160deg, #eef2ff 0%, #f5f3ff 30%, #ffffff 70%, #f8fafc 100%)",
        padding: "72px 48px 64px",
        position: "relative", overflow: "hidden", fontFamily: FONT,
      }}
    >
      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(79,70,229,0.06) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />
      <div style={{ position: "absolute", width: 600, height: 400, top: "-5%", right: "-5%", background: "radial-gradient(ellipse, rgba(79,70,229,0.08) 0%, transparent 70%)", filter: "blur(64px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ height: 1, width: 36, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
            <span style={{ color: C.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Why AurowinX</span>
            <div style={{ height: 1, width: 36, background: `linear-gradient(90deg, ${C.primary}, transparent)` }} />
          </div>
          <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 900, color: C.textPrimary, margin: "0 0 10px", letterSpacing: "-0.04em", fontFamily: FONT }}>
            The AurowinX Difference
          </h2>
          <p style={{ color: C.textSecondary, fontSize: 15, maxWidth: 460, margin: "0 auto", lineHeight: 1.75 }}>
            Six reasons why engineering teams choose us — and stay with us.
          </p>
        </motion.div>

        {/* 3-col layout: tabs | detail | side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr 0.8fr", gap: 20, alignItems: "start" }}>

          {/* LEFT — Tab list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {REASONS.map((reason, i) => (
              <ReasonTab
                key={reason.id} reason={reason} active={active}
                onClick={() => setActive(reason.id)} i={i} inView={inView}
              />
            ))}
          </div>

          {/* MIDDLE — Detail view */}
          <DetailView reason={REASONS[active]} />

          {/* RIGHT — Side panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Review badge */}
            <ReviewBadge inView={inView} />

            {/* Quick stats */}
            {[
              { val: "99%+", label: "Client Retention",  color: "#4f46e5" },
              { val: "0",    label: "Silicon Escapes",   color: "#059669" },
              { val: "12+",  label: "Years Experience",  color: "#7c3aed" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1, ease: EASE }}
                style={{
                  background: "#fff", borderRadius: 14, padding: "14px 16px",
                  border: `1px solid ${C.borderLight}`, boxShadow: C.shadowSm,
                  display: "flex", alignItems: "center", gap: 14,
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: `${s.color}10`, color: s.color,
                  border: `1px solid ${s.color}20`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, fontSize: 15, fontFamily: FONT,
                }}>
                  {s.val}
                </div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: C.textPrimary }}>{s.label}</p>
              </motion.div>
            ))}

            {/* Bottom gradient CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.85, ease: EASE }}
              style={{
                padding: "20px 18px", borderRadius: 16,
                background: C.gradPrimary,
                boxShadow: "0 8px 28px rgba(79,70,229,0.28)",
              }}
            >
              <p style={{ margin: "0 0 6px", fontWeight: 900, fontSize: 15, color: "#fff", fontFamily: FONT }}>
                Ready to Start?
              </p>
              <p style={{ margin: "0 0 14px", fontSize: 12, color: "rgba(255,255,255,0.75)" }}>
                Let's discuss your ASIC requirements.
              </p>
              <motion.a
                href="/contact" whileHover={{ scale: 1.04 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  padding: "9px 18px", borderRadius: 50,
                  background: "#fff", color: C.primary,
                  fontWeight: 700, fontSize: 12, textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.12)", fontFamily: FONT,
                }}
              >
                Talk to Us <ArrowRight style={{ width: 13, height: 13 }} />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}