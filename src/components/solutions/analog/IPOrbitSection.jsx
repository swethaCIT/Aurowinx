// IPOrbitSection.jsx — Analog IP
// Light theme — uses AurowinX design tokens from theme.js

import { useState } from "react";
import { motion } from "framer-motion";
import { C, FONT, EASE, fadeUp } from "../../company/theme";

const IPS = [
  {
    label: "A/D Converter IP",
    desc: "High-resolution ADC & DAC blocks from 8-bit to 24-bit, optimised for speed and power.",
    angle: 315,
    color: C.primary,
    bg: C.accentSoft,
    border: C.border,
  },
  {
    label: "SERDES IP",
    desc: "Multi-Gbps serialiser/deserialiser cores with integrated PLL for high-speed interfaces.",
    angle: 45,
    color: C.secondary,
    bg: "#f5f3ff",
    border: "#ddd6fe",
  },
  {
    label: "Clock & Power IP",
    desc: "PLL, DLL, LDO, and BGR blocks with sub-1% accuracy across process corners.",
    angle: 135,
    color: "#0891b2",
    bg: "#ecfeff",
    border: "#a5f3fc",
  },
  {
    label: "Sub-GHz Transceiver IP",
    desc: "Low-power RF front-end for IoT and wireless sensor applications below 1 GHz.",
    angle: 225,
    color: "#059669",
    bg: "#ecfdf5",
    border: "#a7f3d0",
  },
];

function polarToXY(angleDeg, radius) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius };
}

/* ── Orbit Pill ── */
function OrbitPill({ ip, orbitRadius, index, active, onHover }) {
  const { x, y } = polarToXY(ip.angle, orbitRadius);
  const isActive = active === index;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.35 + index * 0.12, duration: 0.55, ease: EASE }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        zIndex: 4,
        cursor: "pointer",
      }}
    >
      {/* Dashed connector line */}
      <svg
        style={{
          position: "absolute", top: "50%", left: "50%",
          overflow: "visible", pointerEvents: "none", zIndex: 1,
        }}
        width="0" height="0"
      >
        <line
          x1={0} y1={0}
          x2={-x * 0.40} y2={-y * 0.40}
          stroke={ip.color}
          strokeWidth="1.2"
          strokeOpacity={isActive ? 0.7 : 0.25}
          strokeDasharray="4 3"
          style={{ transition: "stroke-opacity 0.3s" }}
        />
      </svg>

      {/* Pill */}
      <motion.div
        animate={{
          boxShadow: isActive
            ? `0 0 0 2px ${ip.color}, ${C.shadowMd}`
            : C.shadowSm,
          scale: isActive ? 1.06 : 1,
          background: isActive ? ip.bg : "#ffffff",
          borderColor: isActive ? ip.color : ip.border,
        }}
        transition={{ duration: 0.22 }}
        style={{
          padding: "10px 18px",
          borderRadius: 50,
          background: "#ffffff",
          border: `1.5px solid ${ip.border}`,
          boxShadow: C.shadowSm,
          fontFamily: FONT,
          fontSize: 13,
          fontWeight: 700,
          color: isActive ? ip.color : C.textPrimary,
          whiteSpace: "nowrap",
          letterSpacing: "-0.01em",
          display: "flex",
          alignItems: "center",
          gap: 8,
          position: "relative",
          zIndex: 2,
          transition: "color 0.22s",
        }}
      >
        <span style={{
          width: 8, height: 8, borderRadius: "50%",
          background: ip.color, flexShrink: 0,
          boxShadow: `0 0 6px ${ip.color}60`,
        }} />
        {ip.label}
      </motion.div>
    </motion.div>
  );
}

/* ── Detail tooltip ── */
function IPDetail({ ip }) {
  if (!ip) return null;
  return (
    <motion.div
      key={ip.label}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
      style={{
        position: "absolute",
        bottom: -88,
        left: "50%",
        transform: "translateX(-50%)",
        width: 300,
        padding: "14px 18px",
        borderRadius: 14,
        background: "#fff",
        border: `1.5px solid ${ip.border}`,
        boxShadow: C.shadowLg,
        fontFamily: FONT,
        textAlign: "center",
        zIndex: 10,
      }}
    >
      <p style={{
        margin: 0, fontSize: 12.5,
        lineHeight: 1.75,
        color: C.textSecondary,
      }}>{ip.desc}</p>
    </motion.div>
  );
}

/* ── Rotating ring ── */
function OrbitRing({ size }) {
  return (
    <motion.svg
      width={size} height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ position: "absolute", top: 0, left: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
    >
      <circle
        cx={size / 2} cy={size / 2} r={size / 2 - 2}
        fill="none"
        stroke={C.border}
        strokeWidth="1"
        strokeDasharray="6 9"
      />
      <circle
        cx={size / 2} cy={size / 2} r={size / 2 - 14}
        fill="none"
        stroke={C.borderLight}
        strokeWidth="1"
      />
    </motion.svg>
  );
}

export default function IPOrbitSection() {
  const [active, setActive] = useState(null);
  const ORBIT_RADIUS = 210;
  const RING_SIZE = ORBIT_RADIUS * 2 + 24;

  return (
    <section style={{
      position: "relative",
      background: C.bgLight,
      overflow: "hidden",
      paddingTop: 110,
      paddingBottom: 140,
      fontFamily: FONT,
    }}>

      {/* Subtle grid pattern */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `radial-gradient(circle, ${C.border} 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
        opacity: 0.5,
      }} />

      {/* Soft accent blob */}
      <div style={{
        position: "absolute", top: "10%", left: "50%",
        transform: "translateX(-50%)",
        width: 700, height: 500,
        borderRadius: "50%",
        background: `radial-gradient(ellipse, ${C.bgAccent} 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* ── Section header ── */}
      <div style={{ textAlign: "center", marginBottom: 72, padding: "0 24px", position: "relative", zIndex: 2 }}>

        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 16px", borderRadius: 50, marginBottom: 20,
            border: `1.5px solid ${C.border}`,
            background: C.bgAccent,
            color: C.primary, fontSize: 11, fontWeight: 700,
            letterSpacing: "0.16em", textTransform: "uppercase",
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: C.primary, display: "inline-block",
            }} />
            IP Portfolio
          </span>
        </motion.div>

        <motion.h2
          {...fadeUp}
          transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
          style={{
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
            fontWeight: 900,
            color: C.textPrimary,
            letterSpacing: "-0.04em",
            lineHeight: 1.08,
            margin: "0 0 16px",
          }}
        >
          Analog IPs We{" "}
          <span style={{
            background: C.gradPrimary,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Deliver & Support
          </span>
        </motion.h2>

        <motion.p
          {...fadeUp}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            color: C.textSecondary,
            fontSize: "clamp(0.95rem, 1.6vw, 1.05rem)",
            maxWidth: 480, margin: "0 auto",
            lineHeight: 1.8,
          }}
        >
          Each block in orbit below is a drop-in macro — hover to see how it
          plugs directly into your SoC.
        </motion.p>
      </div>

      {/* ── Orbit diagram ── */}
      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", justifyContent: "center", alignItems: "center",
      }}>
        <div style={{
          position: "relative",
          width: RING_SIZE,
          height: RING_SIZE,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <OrbitRing size={RING_SIZE} />

          {/* Center chip image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: EASE }}
            style={{
              width: 196, height: 196,
              borderRadius: "50%",
              overflow: "hidden",
              position: "relative",
              zIndex: 3,
              border: `3px solid ${C.bgWhite}`,
              boxShadow: `0 0 0 6px ${C.accentSoft}, ${C.shadowXl}`,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1675602488512-bdd631490fcb?w=400&q=80"
              alt="Semiconductor chip"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading="lazy"
            />
            {/* Light vignette for depth */}
            <div style={{
              position: "absolute", inset: 0,
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, transparent 50%, rgba(79,70,229,0.12) 100%)",
            }} />
          </motion.div>

          {/* Orbit pills */}
          {IPS.map((ip, i) => (
            <OrbitPill
              key={ip.label}
              ip={ip}
              orbitRadius={ORBIT_RADIUS}
              index={i}
              active={active}
              onHover={setActive}
            />
          ))}

          {/* Tooltip */}
          {active !== null && <IPDetail ip={IPS[active]} />}
        </div>
      </div>

      {/* ── Supporting line ── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, delay: 0.25 }}
        style={{
          maxWidth: 640,
          margin: "88px auto 0",
          padding: "22px 28px",
          background: C.bgWhite,
          borderRadius: 16,
          border: `1px solid ${C.border}`,
          boxShadow: C.shadowMd,
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <p style={{
          margin: 0,
          fontSize: 13.5,
          lineHeight: 1.7,
          fontWeight: 500,
          color: C.textSecondary,
        }}>
          No re-spins, no re-characterisation — pick the macro your SoC needs
          and integrate it as-is.
        </p>
      </motion.div>

    </section>
  );
}