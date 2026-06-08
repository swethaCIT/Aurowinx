// UseCasesSection.jsx — Analog IP
// Design: Full-bleed bento-style asymmetric grid — no gaps, no gutters.
// 6 use cases in a tight mosaic. Hover reveals IP tags + detail.
// Zero images. Pure typography + color blocks + animated overlays.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { C, FONT, EASE, fadeUp } from "../../company/theme";
import { Wifi, Car, Radio, Heart, Factory, Cpu, ArrowUpRight } from "lucide-react";

const CASES = [
  {
    id: "iot",
    icon: Wifi,
    industry: "IoT & Smart Sensors",
    headline: "Always-on sensing at the edge",
    body: "Sub-GHz transceivers and precision ADCs power the front-ends of smart meters, environmental sensors, and industrial IoT nodes — delivering µA-level standby with instant wake response.",
    ips: ["Sub-GHz Transceiver IP", "A/D Converter IP"],
    color: C.primary,
    bg: C.accentSoft,
    size: "large", // spans 2 cols
  },
  {
    id: "auto",
    icon: Car,
    industry: "Automotive",
    headline: "AEC-Q100 grade reliability",
    body: "Clock & Power IP and high-resolution ADCs enable ADAS sensor fusion, battery management, and in-vehicle networking — qualified across the full automotive temperature range.",
    ips: ["Clock & Power IP", "A/D Converter IP", "SERDES IP"],
    color: "#b45309",
    bg: "#fffbeb",
    size: "large",
  },
  {
    id: "telecom",
    icon: Radio,
    industry: "Telecom & Networking",
    headline: "Multi-Gbps line card silicon",
    body: "56 Gbps SERDES cores and ultra-low-jitter PLLs drive the high-speed backplanes and optical transport ASICs powering next-generation network infrastructure.",
    ips: ["SERDES IP", "Clock & Power IP"],
    color: C.secondary,
    bg: "#f5f3ff",
    size: "tall", // spans 2 rows
  },
  {
    id: "wearable",
    icon: Heart,
    industry: "Consumer Wearables",
    headline: "Miniature, miserly, mighty",
    body: "Sub-GHz RF and nano-power LDOs extend battery life in hearables, smartwatches, and fitness bands without compromising signal integrity or RF range.",
    ips: ["Sub-GHz Transceiver IP", "Clock & Power IP"],
    color: "#be185d",
    bg: "#fdf2f8",
    size: "normal",
  },
  {
    id: "industrial",
    icon: Factory,
    industry: "Industrial Automation",
    headline: "Noise-immune precision sensing",
    body: "24-bit Sigma-Delta ADCs and robust power management sustain accuracy in noisy factory environments — from motor control feedback to process instrumentation.",
    ips: ["A/D Converter IP", "Clock & Power IP"],
    color: "#0891b2",
    bg: "#ecfeff",
    size: "normal",
  },
  {
    id: "medical",
    icon: Cpu,
    industry: "Medical Devices",
    headline: "Signal clarity where it matters most",
    body: "High-SNR ADCs and ultra-clean LDOs capture bio-potential signals in portable diagnostics, implantables, and point-of-care devices with the precision clinical accuracy demands.",
    ips: ["A/D Converter IP", "Sub-GHz Transceiver IP"],
    color: "#059669",
    bg: "#ecfdf5",
    size: "normal",
  },
];

// Bento grid layout map — 12-col grid, 2-row segments
// Each entry: [colStart, colEnd, rowStart, rowEnd]
const LAYOUT = {
  iot:        { col: "1 / 5",  row: "1 / 2" },  // wide top-left
  auto:       { col: "5 / 9",  row: "1 / 2" },  // wide top-right
  telecom:    { col: "9 / 13", row: "1 / 3" },  // tall right
  wearable:   { col: "1 / 4",  row: "2 / 3" },  // normal bottom-left
  industrial: { col: "4 / 7",  row: "2 / 3" },  // normal bottom-mid
  medical:    { col: "7 / 9",  row: "2 / 3" },  // normal bottom
};

function BentoCell({ c, index }) {
  const [hovered, setHovered] = useState(false);
  const Icon = c.icon;
  const layout = LAYOUT[c.id];
  const isLarge = c.id === "iot" || c.id === "auto";
  const isTall = c.id === "telecom";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.07, duration: 0.55, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: layout.col,
        gridRow: layout.row,
        background: hovered ? c.color : c.bg,
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "background 0.4s",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: isLarge ? "36px 36px 32px" : isTall ? "36px 28px 32px" : "28px 24px 24px",
        minHeight: isLarge ? 220 : isTall ? 460 : 210,
      }}
    >
      {/* Top row: icon + industry label */}
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: 20,
      }}>
        <div style={{
          width: isLarge ? 44 : 38,
          height: isLarge ? 44 : 38,
          borderRadius: 12,
          background: hovered ? "rgba(255,255,255,0.18)" : "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.3s",
          flexShrink: 0,
          border: `1px solid ${hovered ? "rgba(255,255,255,0.2)" : c.color + "20"}`,
        }}>
          <Icon style={{
            width: isLarge ? 20 : 17,
            height: isLarge ? 20 : 17,
            color: hovered ? "#fff" : c.color,
            transition: "color 0.3s",
          }} />
        </div>

        <motion.div
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 6 }}
          transition={{ duration: 0.25 }}
        >
          <ArrowUpRight style={{
            width: 18, height: 18,
            color: "rgba(255,255,255,0.7)",
          }} />
        </motion.div>
      </div>

      {/* Middle: headline + body */}
      <div style={{ flex: 1 }}>
        <p style={{
          margin: "0 0 6px",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: hovered ? "rgba(255,255,255,0.6)" : c.color,
          fontFamily: FONT,
          transition: "color 0.3s",
        }}>{c.industry}</p>

        <h3 style={{
          margin: "0 0 12px",
          fontSize: isLarge ? "clamp(1.1rem, 2vw, 1.4rem)" : "clamp(1rem, 1.6vw, 1.15rem)",
          fontWeight: 900,
          color: hovered ? "#fff" : C.textPrimary,
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
          fontFamily: FONT,
          transition: "color 0.3s",
        }}>{c.headline}</h3>

        <AnimatePresence>
          {(hovered || isTall) && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.3 }}
              style={{
                margin: 0,
                fontSize: 13,
                lineHeight: 1.75,
                color: hovered ? "rgba(255,255,255,0.82)" : C.textSecondary,
                fontFamily: FONT,
              }}
            >
              {c.body}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom: IP tags as plain text */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "4px 12px",
        marginTop: 20,
        paddingTop: 16,
        borderTop: `1px solid ${hovered ? "rgba(255,255,255,0.15)" : c.color + "20"}`,
        transition: "border-color 0.3s",
      }}>
        {c.ips.map(ip => (
          <span key={ip} style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            color: hovered ? "rgba(255,255,255,0.65)" : C.textMuted,
            fontFamily: FONT,
            transition: "color 0.3s",
          }}>{ip}</span>
        ))}
      </div>

      {/* Hover glow blob */}
      <div style={{
        position: "absolute",
        bottom: -40, right: -40,
        width: 180, height: 180,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.06)",
        pointerEvents: "none",
        transition: "opacity 0.4s",
        opacity: hovered ? 1 : 0,
      }} />
    </motion.div>
  );
}

export default function UseCasesSection() {
  return (
    <section style={{
      position: "relative",
      background: C.bgSoft,
      fontFamily: FONT,
      overflow: "hidden",
    }}>

      {/* ── Section header — tight, flush ── */}
      <div style={{
        padding: "100px clamp(24px, 5vw, 60px) 56px",
        maxWidth: 1320,
        margin: "0 auto",
      }}>
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 24,
        }}>
          <div>
            <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
              <div style={{
                fontSize: 11, fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: C.primary, marginBottom: 12,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{ width: 24, height: 1.5, background: C.primary, display: "inline-block" }} />
                Industry Applications
              </div>
            </motion.div>

            <motion.h2
              {...fadeUp}
              transition={{ delay: 0.1, duration: 0.65, ease: EASE }}
              style={{
                margin: 0,
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 900,
                color: C.textPrimary,
                letterSpacing: "-0.05em",
                lineHeight: 1.05,
                fontFamily: FONT,
              }}
            >
              Where Our IPs{" "}
              <span style={{
                background: C.gradPrimary,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Go to Work
              </span>
            </motion.h2>
          </div>

          <motion.p
            {...fadeUp}
            transition={{ delay: 0.2, duration: 0.55 }}
            style={{
              maxWidth: 360,
              margin: 0,
              fontSize: 14,
              lineHeight: 1.8,
              color: C.textSecondary,
            }}
          >
            From nano-power IoT nodes to automotive-grade ASICs — our analog IP
            portfolio serves the full spectrum of silicon applications.
          </motion.p>
        </div>
      </div>

      {/* ── Bento grid — zero gap, edge to edge ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridTemplateRows: "auto auto",
        gap: 2,
        background: C.border,
        borderTop: `2px solid ${C.border}`,
        borderBottom: `2px solid ${C.border}`,
      }}>
        {CASES.map((c, i) => (
          <BentoCell key={c.id} c={c} index={i} />
        ))}
      </div>

      {/* ── Footer note ── */}
      <div style={{
        padding: "40px clamp(24px, 5vw, 60px) 100px",
        maxWidth: 1320,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16,
      }}>
        <p style={{
          margin: 0,
          fontSize: 13,
          color: C.textMuted,
          fontFamily: FONT,
        }}>
          Hover any tile to explore the use case in detail.
        </p>
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "11px 26px", borderRadius: 50,
            background: C.gradPrimary,
            color: "#fff",
            fontSize: 13, fontWeight: 800,
            textDecoration: "none",
            fontFamily: FONT,
            boxShadow: C.shadowMd,
            letterSpacing: "-0.01em",
          }}
        >
          Discuss Your Application
          <ArrowUpRight style={{ width: 14, height: 14 }} />
        </motion.a>
      </div>

      {/* Mobile: stack to single column */}
      <style>{`
        @media (max-width: 860px) {
          .uc-bento {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 560px) {
          .uc-bento {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}