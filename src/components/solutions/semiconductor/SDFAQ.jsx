// SDFAQ.jsx — ASIC Page
// Premium FAQ — unique split layout with animated accordion
// Light palette, no plain cards, rich UX

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { C, FONT, EASE } from "./theme";

const FAQS = [
  {
    id: 0,
    category: "Engagement",
    color: "#4f46e5",
    q: "What engagement models does AurowinX offer?",
    a: "We offer two flexible models: embedded on-site engineering resources — where our engineers work within your team — and full in-house project execution, where we own the entire flow end-to-end. Both models scale from block-level work to full-chip ASIC delivery.",
  },
  {
    id: 1,
    category: "Verification",
    color: "#7c3aed",
    q: "What verification methodologies do you follow?",
    a: "We follow industry-standard UVM methodology for all testbench development, combined with SystemVerilog assertions (SVA), constrained-random stimulus and formal property verification (FPV). Every engagement includes a structured verification plan, coverage model and sign-off criteria before any RTL is simulated.",
  },
  {
    id: 2,
    category: "Physical Design",
    color: "#0891b2",
    q: "Which process nodes and foundries do you support?",
    a: "We support TSMC, Samsung, GlobalFoundries, UMC and Intel foundries across nodes from 5nm FinFET down to 180nm. We handle both flat and hierarchical PNR flows, multi-patterning, flip chip and wire bond packaging, and low-power multi-voltage designs.",
  },
  {
    id: 3,
    category: "DFT",
    color: "#059669",
    q: "What fault coverage targets can you achieve for DFT?",
    a: "We consistently achieve 95%+ stuck-at and at-speed fault coverage using Synopsys TetraMAX and Mentor Tessent. Our DFT flow includes scan insertion, MBIST with hard repair, LBIST, BSCAN IEEE 1149.1, EDT compression and full ATE handoff with pattern correlation.",
  },
  {
    id: 4,
    category: "Timeline",
    color: "#d97706",
    q: "How quickly can your team ramp up on a new project?",
    a: "Our teams can ramp within 1–2 weeks for block-level engagements and 3–4 weeks for full-chip projects. We maintain a bench of pre-qualified senior engineers across DV, DFT, synthesis and physical design — no recruitment delay. We've started tape-out-critical engagements within 5 business days.",
  },
  {
    id: 5,
    category: "Quality",
    color: "#dc2626",
    q: "How do you ensure quality and prevent silicon escapes?",
    a: "Quality is enforced at every stage through structured review gates: verification plan review, testbench architecture review, coverage closure review and final DV sign-off. We use a layered approach — simulation, formal and emulation — with independent review at each milestone. Our silicon escape rate is zero across 180+ delivered projects.",
  },
  {
    id: 6,
    category: "Engagement",
    color: "#4f46e5",
    q: "Can AurowinX handle the full RTL-to-GDSII flow?",
    a: "Yes. We provide complete RTL-to-GDSII delivery — RTL design, functional verification, DFT, logic synthesis, physical design (PNR) and sign-off (STA, DRC/LVS, IR-drop). This unified team model eliminates handoff gaps and significantly reduces schedule risk compared to managing multiple vendors.",
  },
  {
    id: 7,
    category: "Support",
    color: "#7c3aed",
    q: "Do you provide post-silicon bring-up and validation support?",
    a: "Yes. Our post-silicon services include lab bring-up support, debug and failure analysis, ATE pattern correlation and characterization. We stay with the project through production ramp — ensuring the silicon that leaves our flow actually works in the lab and on the tester.",
  },
];

const CATEGORIES = ["All", "Engagement", "Verification", "Physical Design", "DFT", "Timeline", "Quality", "Support"];

/* ── Single FAQ item ── */
function FAQItem({ faq, isOpen, onToggle, i, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
      style={{
        borderRadius: 16, overflow: "hidden",
        border: `1.5px solid ${isOpen ? faq.color + "35" : C.borderLight}`,
        background: isOpen ? "#fff" : "#fff",
        boxShadow: isOpen ? `0 8px 32px ${faq.color}12` : C.shadowSm,
        transition: "border 0.25s, box-shadow 0.25s",
      }}
    >
      {/* Question row */}
      <button
        onClick={onToggle}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 16,
          padding: "16px 20px", background: "transparent",
          border: "none", cursor: "pointer", textAlign: "left",
          fontFamily: FONT,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
          {/* Category dot */}
          <motion.div
            animate={{ background: isOpen ? faq.color : C.border }}
            style={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0 }}
          />
          <span style={{
            fontWeight: 700, fontSize: 14, color: C.textPrimary,
            lineHeight: 1.4, letterSpacing: "-0.01em",
          }}>
            {faq.q}
          </span>
        </div>

        {/* Toggle icon */}
        <motion.div
          animate={{
            background: isOpen ? faq.color : C.bgSoft,
            rotate: isOpen ? 0 : 0,
          }}
          style={{
            width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: isOpen ? "#fff" : C.textMuted,
            border: `1px solid ${isOpen ? faq.color : C.borderLight}`,
            transition: "all 0.25s",
          }}
        >
          {isOpen
            ? <Minus style={{ width: 14, height: 14 }} />
            : <Plus style={{ width: 14, height: 14 }} />
          }
        </motion.div>
      </button>

      {/* Answer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div style={{ padding: "0 20px 18px 40px" }}>
              {/* Accent line */}
              <div style={{ height: 2, width: 40, background: faq.color, borderRadius: 1, marginBottom: 12 }} />
              <p style={{ fontSize: 13.5, color: C.textSecondary, lineHeight: 1.85, margin: 0 }}>
                {faq.a}
              </p>
              {/* Category tag */}
              <span style={{
                display: "inline-block", marginTop: 12,
                padding: "3px 10px", borderRadius: 50,
                background: `${faq.color}12`, color: faq.color,
                fontSize: 10, fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
                border: `1px solid ${faq.color}20`,
              }}>
                {faq.category}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SDFAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [openId, setOpenId] = useState(0);
  const [activeCat, setActiveCat] = useState("All");

  const filtered = activeCat === "All" ? FAQS : FAQS.filter(f => f.category === activeCat);

  return (
    <section
      ref={ref}
      className="sd-faq-section"
      style={{
        background: "linear-gradient(160deg, #f8fafc 0%, #f1f5f9 100%)",
        position: "relative", overflow: "hidden", fontFamily: FONT,
      }}
    >
      {/* Grid bg */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(79,70,229,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,0.03) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />
      <div style={{ position: "absolute", width: 500, height: 350, top: "-5%", right: "-5%", background: "radial-gradient(ellipse, rgba(79,70,229,0.07) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 980, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 40 }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ height: 1, width: 36, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
            <span style={{ color: C.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>FAQ</span>
            <div style={{ height: 1, width: 36, background: `linear-gradient(90deg, ${C.primary}, transparent)` }} />
          </div>
          <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 900, color: C.textPrimary, margin: "0 0 10px", letterSpacing: "-0.04em", fontFamily: FONT }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: C.textSecondary, fontSize: 15, maxWidth: 460, margin: "0 auto", lineHeight: 1.75 }}>
            Everything you need to know about working with AurowinX.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, ease: EASE }}
          className="sd-faq-cats"
          style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 32 }}
        >
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat}
              onClick={() => { setActiveCat(cat); setOpenId(null); }}
              whileHover={{ y: -2 }}
              style={{
                padding: "7px 18px", borderRadius: 50, border: "none",
                background: activeCat === cat ? C.primary : "#fff",
                color: activeCat === cat ? "#fff" : C.textSecondary,
                fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: FONT,
                boxShadow: activeCat === cat ? `0 4px 16px rgba(79,70,229,0.28)` : C.shadowSm,
                border: `1px solid ${activeCat === cat ? C.primary : C.borderLight}`,
                transition: "all 0.2s",
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ single-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24, alignItems: "start", maxWidth: 920, margin: "0 auto" }}>

          {/* FAQ accordion */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCat}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {filtered.map((faq, i) => (
                  <FAQItem
                    key={faq.id} faq={faq}
                    isOpen={openId === faq.id}
                    onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
                    i={i} inView={inView}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>

      <style>{`
        .sd-faq-section {
          padding: 72px 48px 64px;
        }
        @media (max-width: 960px) {
          .sd-faq-section {
            padding: 48px 24px 52px !important;
          }
        }
        @media (max-width: 768px) {
          .sd-faq-section {
            padding: 40px 16px 44px !important;
          }
          .sd-faq-cats {
            flex-wrap: nowrap !important;
            justify-content: flex-start !important;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            margin-left: -16px;
            margin-right: -16px;
            padding: 0 16px 4px;
          }
          .sd-faq-cats::-webkit-scrollbar { display: none; }
          .sd-faq-cats > button {
            flex-shrink: 0;
            scroll-snap-align: start;
            padding: 6px 14px !important;
            font-size: 11px !important;
          }
        }
      `}</style>
    </section>
  );
}