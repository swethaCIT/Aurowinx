// CapabilitiesSection.jsx — Analog IP
// Design: Full-width horizontal tab selector + large split panel
// Left: oversized label + tagline + animated specs list
// Right: big highlight stat + technical detail grid
// No cards. No pills. Luxury editorial layout.

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { C, FONT, EASE, fadeUp } from "../../company/theme";
import { Activity, Zap, Radio, Clock, ArrowUpRight, MoveRight } from "lucide-react";

const IPS = [
  {
    id: "adc",
    icon: Activity,
    label: "A/D Converter IP",
    short: "ADC / DAC",
    tagline: "Precision conversion bridging the analog world and digital silicon — from sensor front-ends to high-speed data acquisition systems.",
    color: C.primary,        // indigo-600
    accent: C.accentSoft,    // indigo-100
    highlight: { value: "1 GSPS", label: "Max Sampling Rate" },
    specs: [
      { name: "Resolution",      value: "8 – 24 bit"           },
      { name: "Architecture",    value: "SAR / ΣΔ / Pipeline"  },
      { name: "SNR",             value: "> 70 dB @ Nyquist"    },
      { name: "Supply",          value: "1.8 V / 3.3 V"        },
      { name: "Interface",       value: "SPI, I²C, Parallel"   },
      { name: "Foundry Support", value: "TSMC · Samsung · GF"  },
    ],
    detail: "Delivered with behavioral models, SPICE netlists, layout GDS, and characterisation report across SS/TT/FF corners.",
  },
  {
    id: "serdes",
    icon: Zap,
    label: "SERDES IP",
    short: "SERDES",
    tagline: "Multi-gigabit serialiser/deserialiser cores engineered for chip-to-chip and long-reach links in data-intensive SoCs.",
    color: C.secondary,      // violet-600
    accent: "#f5f3ff",
    highlight: { value: "56 Gbps", label: "Max Data Rate" },
    specs: [
      { name: "Data Rate",       value: "1 – 56 Gbps"           },
      { name: "Jitter",          value: "< 1 ps RMS"            },
      { name: "Protocols",       value: "PCIe · USB · MIPI · LVDS" },
      { name: "Equalisation",    value: "CTLE + DFE adaptive"   },
      { name: "Clock Recovery",  value: "Integrated CDR"        },
      { name: "Test Mode",       value: "On-chip loopback"      },
    ],
    detail: "Includes IBIS-AMI models for system-level simulation and a silicon-validated reference layout at 16nm.",
  },
  {
    id: "clock",
    icon: Clock,
    label: "Clock & Power IP",
    short: "CLK / PWR",
    tagline: "Rock-solid PLL, LDO, and BGR blocks that keep every rail stable and every clock edge precise across all operating conditions.",
    color: "#0891b2",
    accent: "#ecfeff",
    highlight: { value: "6 GHz", label: "PLL Lock Range" },
    specs: [
      { name: "PLL Range",       value: "10 MHz – 6 GHz"       },
      { name: "Freq Accuracy",   value: "< 0.1% (BGR-trimmed)" },
      { name: "LDO PSRR",        value: "> 60 dB @ 1 MHz"      },
      { name: "Settling Time",   value: "< 200 ns power-up"    },
      { name: "EMI Option",      value: "Spread-spectrum SSC"  },
      { name: "Compensation",    value: "Full PVT tracking"     },
    ],
    detail: "Available as a configurable macro with trim bits for post-silicon adjustment and an integrated BIST controller.",
  },
  {
    id: "rf",
    icon: Radio,
    label: "Sub-GHz Transceiver",
    short: "Sub-GHz RF",
    tagline: "Ultra-low-power RF front-end purpose-built for IoT edge nodes, wireless sensors, and always-on wearable applications.",
    color: "#059669",
    accent: "#ecfdf5",
    highlight: { value: "–120 dBm", label: "RX Sensitivity" },
    specs: [
      { name: "Frequency",       value: "169 – 960 MHz"        },
      { name: "TX Power",        value: "–20 to +20 dBm"       },
      { name: "Modulation",      value: "FSK / GFSK / OOK"     },
      { name: "RX Current",      value: "< 5 mA @ 3.3 V"       },
      { name: "Standby",         value: "< 1 µA wake-on-radio" },
      { name: "Standards",       value: "IEEE 802.15.4g ready" },
    ],
    detail: "Includes a complete RF test bench and pre-compliance test vectors for FCC / ETSI certification support.",
  },
];

/* ── Animated number on mount ── */
function BigStat({ value, label, color }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.55, ease: EASE }}
      style={{ textAlign: "center" }}
    >
      <div style={{
        fontSize: "clamp(3rem, 6vw, 5rem)",
        fontWeight: 900,
        color,
        letterSpacing: "-0.06em",
        lineHeight: 1,
        fontFamily: FONT,
      }}>{value}</div>
      <div style={{
        marginTop: 8,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: C.textMuted,
        fontFamily: FONT,
      }}>{label}</div>
    </motion.div>
  );
}

export default function CapabilitiesSection() {
  const [active, setActive] = useState(0);
  const ip = IPS[active];

  return (
    <section style={{
      position: "relative",
      background: C.bgWhite,
      overflow: "hidden",
      fontFamily: FONT,
    }}>

      {/* ── Large background number watermark ── */}
      <div style={{
        position: "absolute",
        right: "-2%",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "clamp(180px, 22vw, 320px)",
        fontWeight: 900,
        color: C.bgSoft,
        letterSpacing: "-0.08em",
        lineHeight: 1,
        pointerEvents: "none",
        userSelect: "none",
        fontFamily: FONT,
        zIndex: 0,
      }}>
        {String(active + 1).padStart(2, "0")}
      </div>

      {/* ── Section label ── */}
      <div style={{
        borderBottom: `1px solid ${C.borderLight}`,
        padding: "0 clamp(24px, 6vw, 80px)",
      }}>
        <div style={{
          maxWidth: 1320,
          margin: "0 auto",
          paddingTop: 80,
          paddingBottom: 48,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 24,
        }}>
          <motion.div {...fadeUp} transition={{ duration: 0.55 }}>
            <div style={{
              fontSize: 11, fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: C.primary, marginBottom: 12,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{
                width: 24, height: 1.5,
                background: C.primary,
                display: "inline-block",
              }} />
              IP Capabilities
            </div>
            <h2 style={{
              margin: 0,
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              fontWeight: 900,
              color: C.textPrimary,
              letterSpacing: "-0.05em",
              lineHeight: 1.05,
            }}>
              What We{" "}
              <span style={{
                background: C.gradPrimary,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Build & Deliver</span>
            </h2>
          </motion.div>
          <motion.p
            {...fadeUp}
            transition={{ delay: 0.15, duration: 0.55 }}
            style={{
              maxWidth: 380,
              margin: 0,
              fontSize: 14,
              lineHeight: 1.8,
              color: C.textSecondary,
            }}
          >
            Silicon-proven analog IP blocks characterised across PVT corners — delivered with datasheets, SPICE models and full integration support.
          </motion.p>
        </div>
      </div>

      {/* ── Tab selector row ── */}
      <div style={{
        borderBottom: `1px solid ${C.borderLight}`,
        padding: "0 clamp(24px, 6vw, 80px)",
        position: "sticky",
        top: 0,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        zIndex: 10,
      }}>
        <div style={{
          maxWidth: 1320,
          margin: "0 auto",
          display: "flex",
          overflowX: "auto",
          scrollbarWidth: "none",
          gap: 0,
        }}>
          {IPS.map((item, i) => {
            const Icon = item.icon;
            const isActive = active === i;
            return (
              <button
                key={item.id}
                onClick={() => setActive(i)}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "22px 28px",
                  background: "none",
                  border: "none",
                  borderBottom: `2.5px solid ${isActive ? item.color : "transparent"}`,
                  cursor: "pointer",
                  fontFamily: FONT,
                  fontSize: 13,
                  fontWeight: isActive ? 800 : 600,
                  color: isActive ? item.color : C.textMuted,
                  whiteSpace: "nowrap",
                  transition: "color 0.2s, border-color 0.2s",
                  outline: "none",
                  flexShrink: 0,
                }}
              >
                <Icon style={{
                  width: 15, height: 15,
                  opacity: isActive ? 1 : 0.5,
                  transition: "opacity 0.2s",
                }} />
                {item.short}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main content panel ── */}
      <div style={{
        padding: "0 clamp(24px, 6vw, 80px)",
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.42, ease: EASE }}
              style={{
                display: "grid",
                gridTemplateColumns: "var(--caps-cols, 1fr 1fr)",
                gap: "clamp(40px, 6vw, 100px)",
                paddingTop: "clamp(48px, 6vw, 80px)",
                paddingBottom: "clamp(64px, 8vw, 110px)",
                alignItems: "start",
              }}
            >

              {/* ── LEFT: label + tagline + specs ── */}
              <div>
                {/* IP number + name */}
                <div style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 16,
                  marginBottom: 24,
                }}>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: ip.color,
                    fontFamily: FONT,
                  }}>
                    {String(active + 1).padStart(2, "0")} / {String(IPS.length).padStart(2, "0")}
                  </span>
                  <span style={{
                    width: 32, height: 1.5,
                    background: ip.color,
                    display: "inline-block",
                    flexShrink: 0,
                  }} />
                </div>

                <h3 style={{
                  margin: "0 0 20px",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 900,
                  color: C.textPrimary,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.05,
                  fontFamily: FONT,
                }}>
                  {ip.label}
                </h3>

                <p style={{
                  margin: "0 0 44px",
                  fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)",
                  lineHeight: 1.85,
                  color: C.textSecondary,
                  maxWidth: 460,
                }}>
                  {ip.tagline}
                </p>

                {/* Spec table — no card, raw layout */}
                <div style={{ marginBottom: 40 }}>
                  {ip.specs.map((s, i) => (
                    <motion.div
                      key={s.name}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.07, duration: 0.38, ease: EASE }}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "160px 1fr",
                        gap: 16,
                        padding: "13px 0",
                        borderBottom: `1px solid ${C.borderLight}`,
                        alignItems: "center",
                      }}
                    >
                      <span style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.10em",
                        textTransform: "uppercase",
                        color: C.textMuted,
                      }}>{s.name}</span>
                      <span style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: C.textPrimary,
                        fontFamily: FONT,
                      }}>{s.value}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Delivery note */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55, duration: 0.4 }}
                  style={{
                    padding: "16px 20px",
                    borderLeft: `3px solid ${ip.color}`,
                    background: ip.accent,
                    borderRadius: "0 10px 10px 0",
                    marginBottom: 36,
                  }}
                >
                  <p style={{
                    margin: 0,
                    fontSize: 13,
                    lineHeight: 1.7,
                    color: C.textSecondary,
                    fontStyle: "italic",
                  }}>{ip.detail}</p>
                </motion.div>

                {/* CTA */}
                <motion.a
                  href="/contact"
                  whileHover={{ gap: 12 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 14,
                    fontWeight: 800,
                    color: ip.color,
                    textDecoration: "none",
                    fontFamily: FONT,
                    letterSpacing: "-0.01em",
                    transition: "gap 0.2s",
                  }}
                >
                  Request {ip.short} IP
                  <MoveRight style={{ width: 16, height: 16 }} />
                </motion.a>
              </div>

              {/* ── RIGHT: big stat + decorative detail grid ── */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: 40,
                paddingTop: 8,
              }}>

                {/* Giant stat centrepiece */}
                <div style={{
                  padding: "clamp(40px, 5vw, 64px) clamp(32px, 4vw, 56px)",
                  borderRadius: 24,
                  background: ip.accent,
                  border: `1.5px solid ${ip.color}30`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                  minHeight: 200,
                }}>
                  {/* Background icon watermark */}
                  <div style={{
                    position: "absolute",
                    bottom: -20, right: -20,
                    opacity: 0.06,
                    transform: "scale(4)",
                    transformOrigin: "bottom right",
                    color: ip.color,
                    pointerEvents: "none",
                  }}>
                    {(() => { const Icon = ip.icon; return <Icon style={{ width: 60, height: 60, color: ip.color }} />; })()}
                  </div>

                  <BigStat
                    value={ip.highlight.value}
                    label={ip.highlight.label}
                    color={ip.color}
                  />
                </div>

                {/* 2×3 mini metric grid */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "var(--caps-cols, 1fr 1fr)",
                  gap: 1,
                  background: C.borderLight,
                  borderRadius: 16,
                  overflow: "hidden",
                  border: `1px solid ${C.borderLight}`,
                }}>
                  {ip.specs.map((s, i) => (
                    <motion.div
                      key={s.name + "-mini"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 + i * 0.06, duration: 0.35 }}
                      style={{
                        background: C.bgWhite,
                        padding: "18px 20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 5,
                      }}
                    >
                      <span style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: C.textMuted,
                      }}>{s.name}</span>
                      <span style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: C.textPrimary,
                        fontFamily: FONT,
                        letterSpacing: "-0.01em",
                        lineHeight: 1.3,
                      }}>{s.value}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Navigation arrows */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  justifyContent: "flex-end",
                }}>
                  {IPS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      style={{
                        width: active === i ? 28 : 8,
                        height: 8,
                        borderRadius: 4,
                        background: active === i ? ip.color : C.border,
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        transition: "width 0.3s, background 0.3s",
                        outline: "none",
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Bottom custom IP banner ── */}
      <div style={{
        borderTop: `1px solid ${C.borderLight}`,
        padding: "clamp(32px, 4vw, 52px) clamp(24px, 6vw, 80px)",
        background: C.bgSoft,
      }}>
        <div style={{
          maxWidth: 1320,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 24,
        }}>
          <div>
            <p style={{
              margin: "0 0 6px",
              fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
              fontWeight: 800,
              color: C.textPrimary,
              letterSpacing: "-0.03em",
              fontFamily: FONT,
            }}>
              Need a custom analog IP?
            </p>
            <p style={{
              margin: 0,
              fontSize: 13,
              color: C.textSecondary,
              lineHeight: 1.6,
            }}>
              We design bespoke analog blocks to your exact specification — concept to GDSII.
            </p>
          </div>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.03, boxShadow: C.shadowLg }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "13px 28px", borderRadius: 50,
              background: C.gradPrimary,
              color: "#fff",
              fontSize: 13, fontWeight: 800,
              textDecoration: "none",
              fontFamily: FONT,
              boxShadow: C.shadowMd,
              letterSpacing: "-0.01em",
              transition: "box-shadow 0.2s",
            }}
          >
            Discuss Custom IP
            <ArrowUpRight style={{ width: 15, height: 15 }} />
          </motion.a>
        </div>
      </div>

      {/* ── Responsive styles ── */}
      <style>{`
        @media (max-width: 768px) {
          @media (max-width: 768px) { :root { --caps-cols: 1fr; } }
        }
      `}</style>
    </section>
  );
}