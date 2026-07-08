// components/career/Didn'tfindrole.jsx
// Gradient CTA strip — "Didn't find your role?"
// mailto: careers@aurowinx.com

import { motion } from "framer-motion";
import { Mail, ArrowRight, Send } from "lucide-react";
import { C, FONT, EASE } from "././theme";

/* ─── Floating orb (decorative) ──────────────────────────────────────────── */
function Orb({ size, top, left, right, bottom, opacity, delay }) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.15, 1],
        opacity: [opacity, opacity * 0.6, opacity],
      }}
      transition={{ duration: 5, repeat: Infinity, delay, ease: "easeInOut" }}
      style={{
        position: "absolute",
        width: size, height: size,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.10)",
        top, left, right, bottom,
        pointerEvents: "none",
      }}
    />
  );
}

/* ─── DidntFindRole Component ─────────────────────────────────────────────── */
export default function DidntFindRole() {
  return (
    <section
      style={{
        background: C.bgLight,
        padding: "clamp(48px, 9vw, 80px) 24px",
        fontFamily: FONT,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: EASE }}
          style={{
            position: "relative",
            borderRadius: 28,
            overflow: "hidden",
            background: C.gradPrimary,
            padding: "clamp(40px, 8vw, 72px) clamp(24px, 6vw, 48px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            boxShadow: "0 24px 64px rgba(79,70,229,0.25)",
          }}
        >
          {/* ── Decorative orbs ─────────────────────────────────────── */}
          <Orb size="280px" top="-80px"  right="-80px" opacity={1} delay={0}   />
          <Orb size="180px" top="-40px"  right="-40px" opacity={1} delay={0.8} />
          <Orb size="200px" bottom="-60px" left="-60px" opacity={1} delay={1.4} />

          {/* Dot grid overlay */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }} />

          {/* ── Icon badge ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
            style={{
              width: 60, height: 60, borderRadius: 18,
              background: "rgba(255,255,255,0.15)",
              border: "1.5px solid rgba(255,255,255,0.25)",
              backdropFilter: "blur(12px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 28, position: "relative", zIndex: 1,
            }}
          >
            <Send style={{ width: 24, height: 24, color: "#fff" }} />
          </motion.div>

          {/* ── Heading ─────────────────────────────────────────────── */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.65, ease: EASE }}
            style={{
              fontFamily: FONT,
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 800, color: "#fff",
              margin: "0 0 16px",
              letterSpacing: "-0.03em", lineHeight: 1.1,
              position: "relative", zIndex: 1,
            }}
          >
            Didn't find the right role?
          </motion.h2>

          {/* ── Subtext ─────────────────────────────────────────────── */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
            style={{
              color: "rgba(255,255,255,0.78)",
              fontSize: "clamp(15px, 1.8vw, 17px)",
              lineHeight: 1.8,
              maxWidth: 480,
              margin: "0 auto 36px",
              position: "relative", zIndex: 1,
            }}
          >
            We're always looking for talented engineers. Send us your resume
            and we'll reach out when the right opportunity opens up.
          </motion.p>

          {/* ── CTA Buttons ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.55, ease: EASE }}
            style={{
              display: "flex", gap: 14,
              flexWrap: "wrap", justifyContent: "center",
              position: "relative", zIndex: 1,
            }}
          >
            {/* Primary — mailto */}
            <motion.a
              href="mailto:careers@aurowinx.com"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 32px", borderRadius: 50,
                background: "#fff", color: C.primary,
                fontSize: 14, fontWeight: 700,
                textDecoration: "none", fontFamily: FONT,
                boxShadow: "0 8px 28px rgba(0,0,0,0.14)",
                letterSpacing: "-0.01em",
                transition: "box-shadow 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,0.20)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.14)";
              }}
            >
              <Mail style={{ width: 16, height: 16 }} />
              Send Your Resume
              <ArrowRight style={{ width: 15, height: 15 }} />
            </motion.a>

            {/* Secondary — ghost */}
            <motion.a
              href="mailto:careers@aurowinx.com?subject=General Enquiry — AurowinX Careers"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 32px", borderRadius: 50,
                background: "rgba(255,255,255,0.12)",
                border: "1.5px solid rgba(255,255,255,0.30)",
                backdropFilter: "blur(10px)",
                color: "#fff",
                fontSize: 14, fontWeight: 700,
                textDecoration: "none", fontFamily: FONT,
                letterSpacing: "-0.01em",
              }}
            >
              General Enquiry
            </motion.a>
          </motion.div>

          {/* ── Email tag ───────────────────────────────────────────── */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 12, margin: "24px 0 0",
              position: "relative", zIndex: 1,
              letterSpacing: "0.02em",
            }}
          >
            or write to us directly at{" "}
            <a
              href="mailto:careers@aurowinx.com"
              style={{
                color: "rgba(255,255,255,0.70)",
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              careers@aurowinx.com
            </a>
          </motion.p>

        </motion.div>
      </div>
    </section>
  );
}