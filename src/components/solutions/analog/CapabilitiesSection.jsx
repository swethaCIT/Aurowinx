// CapabilitiesSection.jsx — Analog IP
// Design: Full-width horizontal tab selector + large split panel
// Responsive: mobile/tablet carousel tabs + accordion specs, desktop/TV editorial split
// No cards. No pills. Luxury editorial layout.

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { C, FONT, EASE, fadeUp } from "../../company/theme";
import {
  Activity, Zap, Radio, Clock, ArrowUpRight, MoveRight, ChevronDown,
} from "lucide-react";

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

/* ── Animated number on mount ── */
function BigStat({ value, label, color, compact }) {
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
        fontSize: compact ? "clamp(2.4rem, 12vw, 3.4rem)" : "clamp(3rem, 6vw, 5rem)",
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

/* ── Animated pagination dots ── */
function Dots({ count, active, onSelect, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Go to IP ${i + 1}`}
          style={{ border: "none", cursor: "pointer", padding: 0, background: "transparent" }}
        >
          <motion.div
            animate={{
              width: active === i ? 28 : 8,
              background: active === i ? color : C.border,
            }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{ height: 8, borderRadius: 4 }}
          />
        </motion.button>
      ))}
    </div>
  );
}

/* ── Collapsible spec list (mobile/tablet) ── */
function SpecsAccordion({ ip, open, onToggle }) {
  return (
    <div style={{
      borderRadius: 14, overflow: "hidden",
      border: `1px solid ${ip.color}25`, background: C.bgWhite,
      marginBottom: 24,
    }}>
      <motion.button
        onClick={onToggle}
        whileTap={{ scale: 0.99 }}
        style={{
          width: "100%", border: "none", cursor: "pointer",
          background: open ? ip.accent : C.bgWhite,
          padding: "14px 18px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          fontFamily: FONT, transition: "background 0.25s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 24, height: 24, borderRadius: 7,
            background: ip.color, color: "#fff", fontSize: 11, fontWeight: 800,
          }}>
            {ip.specs.length}
          </span>
          <span style={{ fontSize: 13.5, fontWeight: 800, color: C.textPrimary, letterSpacing: "-0.01em" }}>
            Full Specifications
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          style={{ color: ip.color, display: "flex" }}
        >
          <ChevronDown style={{ width: 18, height: 18 }} />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "4px 18px 16px" }}>
              {ip.specs.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3, ease: EASE }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "120px 1fr",
                    gap: 12,
                    padding: "11px 0",
                    borderBottom: i < ip.specs.length - 1 ? `1px solid ${C.borderLight}` : "none",
                    alignItems: "center",
                  }}
                >
                  <span style={{
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: C.textMuted,
                  }}>{s.name}</span>
                  <span style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: C.textPrimary,
                    fontFamily: FONT,
                  }}>{s.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CapabilitiesSection() {
  const [active, setActive] = useState(0);
  const [specsOpen, setSpecsOpen] = useState({});
  const { isMobile, isTablet, isCompact, isTV } = useViewport();
  const ip = IPS[active];

  const tabRef = useRef(null);
  const scrollTimeout = useRef(null);

  // Default spec accordion state per breakpoint
  useEffect(() => {
    if (isTablet) {
      setSpecsOpen({ [active]: true });
    } else if (isMobile) {
      setSpecsOpen((prev) => (prev[active] ? prev : {}));
    }
  }, [isTablet, isMobile, active]);

  const toggleSpecs = () => {
    setSpecsOpen((prev) => ({ ...prev, [active]: !prev[active] }));
  };

  // Smooth-center the active tab in the carousel (mobile)
  const scrollTabIntoView = (index) => {
    const container = tabRef.current;
    if (!container) return;
    const tab = container.children[index];
    if (!tab) return;
    const target = tab.offsetLeft - (container.offsetWidth - tab.offsetWidth) / 2;
    container.scrollTo({ left: target, behavior: "smooth" });
  };

  useEffect(() => {
    if (isMobile) scrollTabIntoView(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, isMobile]);

  const handleTabScroll = () => {
    if (!isMobile) return;
    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      const container = tabRef.current;
      if (!container) return;
      let closest = 0, minDist = Infinity;
      Array.from(container.children).forEach((child, i) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const containerCenter = container.scrollLeft + container.offsetWidth / 2;
        const dist = Math.abs(childCenter - containerCenter);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setActive((prev) => (prev === closest ? prev : closest));
    }, 80);
  };

  const horizPad = isMobile ? "20px" : isTablet ? "28px" : "clamp(24px, 6vw, 80px)";
  const maxW = isTV ? 1760 : 1320;

  return (
    <section style={{
      position: "relative",
      background: C.bgWhite,
      overflow: "hidden",
      fontFamily: FONT,
    }}>

      {/* ── Large background number watermark ── */}
      {!isMobile && (
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
      )}

      {/* ── Section label ── */}
      <div style={{
        borderBottom: `1px solid ${C.borderLight}`,
        padding: `0 ${horizPad}`,
      }}>
        <div style={{
          maxWidth: maxW,
          margin: "0 auto",
          paddingTop: isMobile ? 48 : isTablet ? 60 : 80,
          paddingBottom: isMobile ? 32 : 48,
          display: "flex",
          flexDirection: isCompact ? "column" : "row",
          alignItems: isCompact ? "flex-start" : "flex-end",
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
              fontSize: "clamp(1.9rem, 5vw, 3.4rem)",
              fontWeight: 900,
              color: C.textPrimary,
              letterSpacing: "-0.05em",
              lineHeight: 1.08,
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
              maxWidth: isCompact ? "100%" : 380,
              margin: 0,
              fontSize: 13.5,
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
        padding: `0 ${horizPad}`,
        position: "sticky",
        top: 0,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        zIndex: 10,
      }}>
        <style>{`.ip-tabs::-webkit-scrollbar { display: none; }`}</style>
        <div
          ref={tabRef}
          onScroll={handleTabScroll}
          className="ip-tabs"
          style={{
            maxWidth: maxW,
            margin: "0 auto",
            display: "flex",
            overflowX: "auto",
            scrollbarWidth: "none",
            scrollSnapType: isMobile ? "x mandatory" : "none",
            WebkitOverflowScrolling: "touch",
            gap: 0,
            paddingLeft: isMobile ? "30%" : 0,
            paddingRight: isMobile ? "30%" : 0,
          }}
        >
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
                  padding: isMobile ? "18px 20px" : "22px 28px",
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
                  scrollSnapAlign: isMobile ? "center" : "none",
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
        padding: `0 ${horizPad}`,
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.42, ease: EASE }}
              style={{
                display: "grid",
                gridTemplateColumns: isCompact ? "1fr" : "1fr 1fr",
                gap: isMobile ? "32px" : isTablet ? "48px" : "clamp(40px, 6vw, 100px)",
                paddingTop: isMobile ? "32px" : isTablet ? "48px" : "clamp(48px, 6vw, 80px)",
                paddingBottom: isMobile ? "44px" : isTablet ? "60px" : "clamp(64px, 8vw, 110px)",
                alignItems: "start",
              }}
            >

              {/* ── On compact: stat first for immediate visual payoff ── */}
              {isCompact && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  style={{
                    padding: isMobile ? "32px 24px" : "40px 36px",
                    borderRadius: 22,
                    background: ip.accent,
                    border: `1.5px solid ${ip.color}30`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    order: -1,
                  }}
                >
                  <div style={{
                    position: "absolute",
                    bottom: -16, right: -16,
                    opacity: 0.06,
                    transform: "scale(3)",
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
                    compact
                  />
                </motion.div>
              )}

              {/* ── LEFT: label + tagline + specs ── */}
              <div>
                {/* IP number + name */}
                <div style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 16,
                  marginBottom: isMobile ? 16 : 24,
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
                  margin: isMobile ? "0 0 14px" : "0 0 20px",
                  fontSize: "clamp(1.6rem, 5vw, 2.8rem)",
                  fontWeight: 900,
                  color: C.textPrimary,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.08,
                  fontFamily: FONT,
                }}>
                  {ip.label}
                </h3>

                <p style={{
                  margin: isMobile ? "0 0 28px" : "0 0 36px",
                  fontSize: "clamp(0.92rem, 1.6vw, 1.05rem)",
                  lineHeight: 1.85,
                  color: C.textSecondary,
                  maxWidth: isCompact ? "100%" : 460,
                }}>
                  {ip.tagline}
                </p>

                {/* ── DESKTOP/TV: raw spec list ── */}
                {!isCompact && (
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
                )}

                {/* ── MOBILE/TABLET: spec accordion ── */}
                {isCompact && (
                  <SpecsAccordion
                    ip={ip}
                    open={!!specsOpen[active]}
                    onToggle={toggleSpecs}
                  />
                )}

                {/* Delivery note */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  style={{
                    padding: "16px 20px",
                    borderLeft: `3px solid ${ip.color}`,
                    background: ip.accent,
                    borderRadius: "0 10px 10px 0",
                    marginBottom: isMobile ? 24 : 36,
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

                {/* CTA + dots row */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 16,
                }}>
                  <motion.a
                    href="/contact"
                    whileHover={{ gap: 12 }}
                    whileTap={{ scale: 0.97 }}
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

                  {/* Dots — visible on compact for swipe-style nav */}
                  {isCompact && (
                    <Dots count={IPS.length} active={active} onSelect={setActive} color={ip.color} />
                  )}
                </div>
              </div>

              {/* ── RIGHT (desktop/TV) / continuation (compact): big stat + metric grid ── */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? 24 : 40,
                paddingTop: isCompact ? 0 : 8,
              }}>

                {/* Giant stat centrepiece — desktop/TV only (mobile/tablet shows it up top) */}
                {!isCompact && (
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
                )}

                {/* Mini metric grid — 2 cols always */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
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
                        padding: isMobile ? "14px 14px" : "18px 20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 5,
                      }}
                    >
                      <span style={{
                        fontSize: 9.5,
                        fontWeight: 700,
                        letterSpacing: "0.10em",
                        textTransform: "uppercase",
                        color: C.textMuted,
                      }}>{s.name}</span>
                      <span style={{
                        fontSize: isMobile ? 12 : 13,
                        fontWeight: 700,
                        color: C.textPrimary,
                        fontFamily: FONT,
                        letterSpacing: "-0.01em",
                        lineHeight: 1.3,
                      }}>{s.value}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Navigation dots — desktop/TV only (compact has dots in left col) */}
                {!isCompact && (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}>
                    <Dots count={IPS.length} active={active} onSelect={setActive} color={ip.color} />
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Bottom custom IP banner ── */}
      <div style={{
        borderTop: `1px solid ${C.borderLight}`,
        padding: `${isMobile ? "28px" : "clamp(32px, 4vw, 52px)"} ${horizPad}`,
        background: C.bgSoft,
      }}>
        <div style={{
          maxWidth: maxW,
          margin: "0 auto",
          display: "flex",
          alignItems: isCompact ? "flex-start" : "center",
          flexDirection: isCompact ? "column" : "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
        }}>
          <div>
            <p style={{
              margin: "0 0 6px",
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
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
              alignSelf: isCompact ? "stretch" : "auto",
              justifyContent: "center",
            }}
          >
            Discuss Custom IP
            <ArrowUpRight style={{ width: 15, height: 15 }} />
          </motion.a>
        </div>
      </div>
    </section>
  );
}