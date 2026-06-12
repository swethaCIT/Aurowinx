// UseCasesSection.jsx — Analog IP
// Desktop/TV: full-bleed bento-style asymmetric grid, hover reveals detail.
// Mobile/Tablet: swipeable carousel — tap to expand detail (accordion-style),
// smooth drag transitions, animated dot pagination. No long-scroll stacking.

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { C, FONT, EASE, fadeUp } from "../../company/theme";
import { Wifi, Car, Radio, Heart, Factory, Cpu, ArrowUpRight, ChevronDown } from "lucide-react";

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
    size: "large",
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
    size: "tall",
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

// Bento grid layout map — 12-col grid, 2-row segments (desktop/TV)
const LAYOUT = {
  iot:        { col: "1 / 5",  row: "1 / 2" },
  auto:       { col: "5 / 9",  row: "1 / 2" },
  telecom:    { col: "9 / 13", row: "1 / 3" },
  wearable:   { col: "1 / 4",  row: "2 / 3" },
  industrial: { col: "4 / 7",  row: "2 / 3" },
  medical:    { col: "7 / 9",  row: "2 / 3" },
};

/* ─────────────────────────────────────────────
   RESPONSIVE HOOK
───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   DESKTOP/TV — BENTO CELL (hover reveal)
───────────────────────────────────────────── */
function BentoCell({ c, index, isTV }) {
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
        padding: isLarge
          ? (isTV ? "44px 44px 38px" : "36px 36px 32px")
          : isTall
          ? (isTV ? "44px 34px 38px" : "36px 28px 32px")
          : (isTV ? "34px 30px 28px" : "28px 24px 24px"),
        minHeight: isLarge ? (isTV ? 260 : 220) : isTall ? (isTV ? 540 : 460) : (isTV ? 250 : 210),
      }}
    >
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: 20,
      }}>
        <div style={{
          width: isLarge ? (isTV ? 50 : 44) : (isTV ? 44 : 38),
          height: isLarge ? (isTV ? 50 : 44) : (isTV ? 44 : 38),
          borderRadius: 12,
          background: hovered ? "rgba(255,255,255,0.18)" : "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.3s",
          flexShrink: 0,
          border: `1px solid ${hovered ? "rgba(255,255,255,0.2)" : c.color + "20"}`,
        }}>
          <Icon style={{
            width: isLarge ? (isTV ? 23 : 20) : (isTV ? 19 : 17),
            height: isLarge ? (isTV ? 23 : 20) : (isTV ? 19 : 17),
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
          fontSize: isLarge
            ? (isTV ? "clamp(1.3rem, 2vw, 1.7rem)" : "clamp(1.1rem, 2vw, 1.4rem)")
            : (isTV ? "clamp(1.1rem, 1.6vw, 1.35rem)" : "clamp(1rem, 1.6vw, 1.15rem)"),
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
                fontSize: isTV ? 14.5 : 13,
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

/* ─────────────────────────────────────────────
   MOBILE / TABLET — SWIPEABLE CAROUSEL
───────────────────────────────────────────── */
const slideVariants = {
  enter:  (dir) => ({ opacity: 0, x: dir > 0 ? 36 : -36 }),
  center: { opacity: 1, x: 0 },
  exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -36 : 36 }),
};

function UseCaseCarousel({ isMobile }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [expanded, setExpanded] = useState(true);

  const c = CASES[active];
  const Icon = c.icon;

  const go = (i) => {
    if (i < 0 || i >= CASES.length) return;
    setDirection(i > active ? 1 : -1);
    setActive(i);
  };

  return (
    <div>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={c.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.34, ease: EASE }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(e, info) => {
              const threshold = 60;
              if (info.offset.x < -threshold) go(active + 1);
              else if (info.offset.x > threshold) go(active - 1);
            }}
            style={{
              touchAction: "pan-y",
              borderRadius: 18,
              overflow: "hidden",
              background: c.bg,
              border: `1px solid ${c.color}22`,
              position: "relative",
            }}
          >
            <div style={{
              position: "absolute",
              top: -50, right: -50,
              width: 160, height: 160,
              borderRadius: "50%",
              background: `${c.color}14`,
              pointerEvents: "none",
            }} />

            <div style={{ padding: isMobile ? "24px 20px" : "28px 26px", position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: "#fff",
                  border: `1px solid ${c.color}25`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Icon style={{ width: 18, height: 18, color: c.color }} />
                </div>
                <p style={{
                  margin: 0,
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: c.color,
                  fontFamily: FONT,
                }}>{c.industry}</p>
              </div>

              <h3 style={{
                margin: "0 0 10px",
                fontSize: "clamp(1.15rem, 5vw, 1.4rem)",
                fontWeight: 900,
                color: C.textPrimary,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                fontFamily: FONT,
              }}>{c.headline}</h3>

              <button
                onClick={() => setExpanded((e) => !e)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: "none", border: "none", cursor: "pointer",
                  padding: 0, marginBottom: expanded ? 8 : 0,
                  fontFamily: FONT,
                }}
              >
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  color: c.color,
                }}>
                  {expanded ? "Hide details" : "Show details"}
                </span>
                <motion.div
                  animate={{ rotate: expanded ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  style={{ color: c.color, display: "flex" }}
                >
                  <ChevronDown style={{ width: 14, height: 14 }} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    style={{ overflow: "hidden" }}
                  >
                    <p style={{
                      margin: "0 0 16px",
                      fontSize: 13,
                      lineHeight: 1.8,
                      color: C.textSecondary,
                      fontFamily: FONT,
                    }}>{c.body}</p>

                    <div style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "4px 12px",
                      paddingTop: 14,
                      borderTop: `1px solid ${c.color}20`,
                    }}>
                      {c.ips.map(ip => (
                        <span key={ip} style={{
                          fontSize: 9.5,
                          fontWeight: 700,
                          letterSpacing: "0.10em",
                          textTransform: "uppercase",
                          color: c.color,
                          fontFamily: FONT,
                        }}>{ip}</span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginTop: 18,
      }}>
        {CASES.map((cc, i) => (
          <button
            key={cc.id}
            onClick={() => go(i)}
            aria-label={`Go to ${cc.industry}`}
            style={{ border: "none", background: "transparent", padding: 4, cursor: "pointer" }}
          >
            <motion.span
              animate={{
                width: i === active ? (isMobile ? 20 : 24) : 6,
                background: i === active ? c.color : C.border,
              }}
              transition={{ duration: 0.3, ease: EASE }}
              style={{ display: "block", height: 6, borderRadius: 3 }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ROOT COMPONENT
───────────────────────────────────────────── */
export default function UseCasesSection() {
  const { isMobile, isTablet, isCompact, isTV } = useViewport();
  const horizPad = isMobile ? "20px" : isTablet ? "28px" : "clamp(24px, 5vw, 60px)";
  const maxW = isTV ? 1600 : 1320;

  return (
    <section style={{
      position: "relative",
      background: C.bgSoft,
      fontFamily: FONT,
      overflow: "hidden",
    }}>

      {/* ── Section header ── */}
      <div style={{
        padding: isMobile ? "56px 20px 36px" : `${isTV ? 120 : 100}px ${horizPad} 56px`,
        maxWidth: maxW,
        margin: "0 auto",
      }}>
        <div style={{
          display: "flex",
          alignItems: isCompact ? "flex-start" : "flex-end",
          flexDirection: isCompact ? "column" : "row",
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
                fontSize: isTV ? "clamp(2.6rem, 4vw, 4rem)" : "clamp(2rem, 4vw, 3.2rem)",
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
              maxWidth: isCompact ? "100%" : 360,
              margin: 0,
              fontSize: isTV ? 15 : 14,
              lineHeight: 1.8,
              color: C.textSecondary,
            }}
          >
            From nano-power IoT nodes to automotive-grade ASICs — our analog IP
            portfolio serves the full spectrum of silicon applications.
          </motion.p>
        </div>
      </div>

      {/* ── DESKTOP / TV: bento grid, edge to edge ── */}
      {!isCompact && (
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
            <BentoCell key={c.id} c={c} index={i} isTV={isTV} />
          ))}
        </div>
      )}

      {/* ── MOBILE / TABLET: carousel ── */}
      {isCompact && (
        <div style={{ padding: `0 ${horizPad} 8px`, maxWidth: maxW, margin: "0 auto" }}>
          <UseCaseCarousel isMobile={isMobile} />
        </div>
      )}

      {/* ── Footer note ── */}
      <div style={{
        padding: isMobile
          ? "32px 20px 64px"
          : `40px ${horizPad} ${isTV ? 120 : 100}px`,
        maxWidth: maxW,
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
          {isCompact ? "Swipe to explore each use case." : "Hover any tile to explore the use case in detail."}
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
            justifyContent: "center",
            alignSelf: isMobile ? "stretch" : "auto",
          }}
        >
          Discuss Your Application
          <ArrowUpRight style={{ width: 14, height: 14 }} />
        </motion.a>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}