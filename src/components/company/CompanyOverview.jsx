import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { C, FONT, fadeUp, EASE } from "././theme";
import { ChevronDown } from "lucide-react";

const stats = [
  { value: "2020", label: "Established" },
  { value: "Chennai", label: "Headquarters" },
  { value: "3nm", label: "Lowest Node" },
  { value: "Tier 1", label: "Clients Served" },
];

const cards = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    tag: "Why Us",
    title: "Domain Expertise & Proven Delivery",
    description:
      "Domain expertise, established workflows, and automation backed by an experienced team with a strong track record of silicon success stories across advanced technology nodes.",
    iconBg: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
    iconGlow: "rgba(79,70,229,0.15)",
    accentLine: "linear-gradient(90deg, #4f46e5, #6366f1)",
    color: "#4f46e5",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    tag: "What We Do",
    title: "Build Silicon Products & Systems",
    description:
      "We engage with customers to build their silicon products and systems through our expertise and innovation — serving as an extended engineering arm for product companies.",
    iconBg: "linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)",
    iconGlow: "rgba(8,145,178,0.15)",
    accentLine: "linear-gradient(90deg, #0891b2, #06b6d4)",
    color: "#0891b2",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18" />
      </svg>
    ),
    tag: "How We Do",
    title: "Spec2GDSII & Spec2Systems",
    description:
      "Through various business models — T&M, Turnkey, and Milestone-based — we provide Spec2GDSII services and evolve toward full Spec2Systems delivery with secured infrastructure.",
    iconBg: "linear-gradient(135deg, #2563eb 0%, #0891b2 100%)",
    iconGlow: "rgba(37,99,235,0.15)",
    accentLine: "linear-gradient(90deg, #2563eb, #0891b2)",
    color: "#2563eb",
  },
];

const floatingChips = [
  { top: "8%", right: "3%", size: 52, delay: 0, rotate: 12 },
  { bottom: "10%", left: "2%", size: 38, delay: 1.4, rotate: -8 },
  { top: "50%", right: "1.5%", size: 30, delay: 0.8, rotate: 6 },
];

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
   MOBILE/TABLET — CARD CAROUSEL with accordion desc
───────────────────────────────────────────── */
const slideVariants = {
  enter:  (dir) => ({ opacity: 0, x: dir > 0 ? 36 : -36 }),
  center: { opacity: 1, x: 0 },
  exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -36 : 36 }),
};

function CardCarousel({ isMobile }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [expanded, setExpanded] = useState(true);

  const card = cards[active];

  const go = (i) => {
    if (i < 0 || i >= cards.length) return;
    setDirection(i > active ? 1 : -1);
    setActive(i);
  };

  return (
    <div>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active}
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
              background: "white",
              borderRadius: 20,
              padding: isMobile ? "28px 22px" : "32px 28px",
              border: "1px solid #f1f5f9",
              boxShadow: "0 2px 16px rgba(15,23,42,0.06), 0 1px 4px rgba(15,23,42,0.04)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{
              position: "absolute", top: -50, right: -50,
              width: 150, height: 150, borderRadius: "50%",
              background: `radial-gradient(circle, ${card.iconGlow} 0%, transparent 70%)`,
              pointerEvents: "none",
            }} />

            <span style={{
              display: "inline-block", fontSize: 10, fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "#4f46e5", background: "#eef2ff",
              border: "1px solid #c7d2fe",
              borderRadius: 9999, padding: "4px 14px", marginBottom: 20,
            }}>
              {card.tag}
            </span>

            <div style={{
              width: 48, height: 48, borderRadius: 13,
              background: card.iconBg, display: "flex",
              alignItems: "center", justifyContent: "center",
              marginBottom: 18, color: "white",
              boxShadow: `0 6px 20px ${card.iconGlow}`,
            }}>
              {card.icon}
            </div>

            <h3 style={{
              fontSize: 16.5, fontWeight: 700, color: "#0f172a",
              marginBottom: 10, letterSpacing: "-0.02em", lineHeight: 1.35,
            }}>
              {card.title}
            </h3>

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
                color: card.color,
              }}>
                {expanded ? "Hide details" : "Show details"}
              </span>
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                style={{ color: card.color, display: "flex" }}
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
                  <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.78, margin: 0 }}>
                    {card.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
              background: card.accentLine,
              borderRadius: "0 0 20px 20px", opacity: 0.6,
            }} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 8, marginTop: 18,
      }}>
        {cards.map((c, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to card ${i + 1}`}
            style={{ border: "none", background: "transparent", padding: 4, cursor: "pointer" }}
          >
            <motion.span
              animate={{
                width: i === active ? (isMobile ? 20 : 24) : 6,
                background: i === active ? card.color : "#e2e8f0",
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

export default function CompanyOverview() {
  const { isMobile, isTablet, isCompact, isTV } = useViewport();
  const horizPad = isMobile ? "20px" : isTablet ? "28px" : "24px";
  const maxW = isTV ? 1500 : 1200;

  return (
    <section
      style={{
        background: "#f8fafc",
        fontFamily: FONT,
        position: "relative",
        overflow: "hidden",
        padding: isMobile ? "64px 0 72px" : isTablet ? "80px 0 88px" : isTV ? "130px 0 140px" : "100px 0 110px",
      }}
    >
      {/* ── BG BLOBS ── */}
      <div style={{
        position: "absolute", top: -140, left: -140, width: 480, height: 480,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(79,70,229,0.05) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -80, right: -80, width: 400, height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(8,145,178,0.05) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* ── FLOATING CHIPS — hidden on mobile to reduce clutter ── */}
      {!isMobile && floatingChips.map((chip, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            top: chip.top, bottom: chip.bottom,
            left: chip.left, right: chip.right,
            width: chip.size, height: chip.size,
            border: "1.5px solid rgba(79,70,229,0.12)",
            borderRadius: 8,
            pointerEvents: "none",
            zIndex: 0,
          }}
          animate={{ y: [0, -12, 0], rotate: [chip.rotate, chip.rotate + 4, chip.rotate], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: chip.delay }}
        >
          {[0, 1, 2].map((p) => (
            <div key={p} style={{ position: "absolute", left: -6, top: chip.size * 0.2 + p * (chip.size * 0.22), width: 5, height: 2, background: "rgba(79,70,229,0.25)", borderRadius: 1 }} />
          ))}
          {[0, 1, 2].map((p) => (
            <div key={p} style={{ position: "absolute", right: -6, top: chip.size * 0.2 + p * (chip.size * 0.22), width: 5, height: 2, background: "rgba(79,70,229,0.25)", borderRadius: 1 }} />
          ))}
        </motion.div>
      ))}

      <div style={{ maxWidth: maxW, margin: "0 auto", padding: `0 ${horizPad}`, position: "relative", zIndex: 1 }}>

        {/* ── LABEL ── */}
        <motion.div {...fadeUp} transition={{ duration: 0.7, ease: EASE }} style={{ textAlign: "center", marginBottom: 16 }}>
          <span style={{
            display: "inline-block", padding: "6px 20px", borderRadius: 9999,
            border: "1px solid #c7d2fe", background: "#eef2ff",
            fontSize: 11, fontWeight: 700, letterSpacing: "0.22em",
            textTransform: "uppercase", color: C.primary,
          }}>
            Company Profile
          </span>
        </motion.div>

        {/* ── HEADING ── */}
        <motion.h2
          {...fadeUp} transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{
            textAlign: "center",
            fontSize: isTV ? "clamp(2.6rem, 4vw, 3.8rem)" : "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 700, color: C.textPrimary, letterSpacing: "-0.03em",
            lineHeight: 1.1, marginBottom: 16,
          }}
        >
          Who Is{" "}
          <span style={{
            background: "linear-gradient(135deg, #4f46e5 0%, #0891b2 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Aurowinx
          </span>
          ?
        </motion.h2>

        {/* ── SUBTEXT ── */}
        <motion.p
          {...fadeUp} transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
          style={{
            textAlign: "center", fontSize: isTV ? 17 : 15, color: C.textSecondary,
            maxWidth: 620, margin: isMobile ? "0 auto 40px" : "0 auto 64px", lineHeight: 1.75,
            padding: isMobile ? "0 4px" : 0,
          }}
        >
          A privately owned semiconductor engineering company headquartered in
          Chennai, delivering customized engineering excellence since January 2020.
        </motion.p>

        {/* ── STATS ── */}
        <motion.div
          {...fadeUp} transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: isMobile ? 0 : 0,
            justifyContent: "center",
            marginBottom: isMobile ? 44 : 72,
            borderRadius: isMobile ? 16 : 0,
            background: isMobile ? "#fff" : "transparent",
            border: isMobile ? "1px solid #eef2ff" : "none",
            overflow: "hidden",
          }}
        >
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: isMobile ? "18px 12px" : "22px 44px",
              textAlign: "center",
              borderRight: !isMobile && i < stats.length - 1 ? "1px solid #e0e7ff" : (isMobile && i % 2 === 0 ? "1px solid #eef2ff" : "none"),
              borderBottom: isMobile && i < 2 ? "1px solid #eef2ff" : "none",
              minWidth: isMobile ? 0 : 130,
            }}>
              <div style={{
                fontSize: isTV ? "clamp(1.8rem, 3vw, 2.4rem)" : "clamp(1.3rem, 3vw, 2.1rem)",
                fontWeight: 800,
                background: "linear-gradient(135deg, #4f46e5 0%, #0891b2 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text", letterSpacing: "-0.02em",
                lineHeight: 1, marginBottom: 6,
              }}>
                {s.value}
              </div>
              <div style={{
                fontSize: isMobile ? 9.5 : 11, fontWeight: 600, letterSpacing: "0.16em",
                textTransform: "uppercase", color: "#94a3b8",
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── CARDS — desktop/TV grid, mobile/tablet carousel ── */}
        {isCompact ? (
          <CardCarousel isMobile={isMobile} />
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: isTV ? "repeat(3, 1fr)" : "repeat(auto-fit, minmax(300px, 1fr))",
            gap: isTV ? 28 : 24,
          }}>
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: i * 0.12, ease: EASE }}
                whileHover={{ y: -5, transition: { duration: 0.28 } }}
                style={{
                  background: "white", borderRadius: 20,
                  padding: isTV ? "42px 38px" : "36px 32px",
                  border: "1px solid #f1f5f9",
                  boxShadow: "0 2px 16px rgba(15,23,42,0.06), 0 1px 4px rgba(15,23,42,0.04)",
                  position: "relative", overflow: "hidden", cursor: "default",
                }}
              >
                <div style={{
                  position: "absolute", top: -50, right: -50,
                  width: 150, height: 150, borderRadius: "50%",
                  background: `radial-gradient(circle, ${card.iconGlow} 0%, transparent 70%)`,
                  pointerEvents: "none",
                }} />

                <span style={{
                  display: "inline-block", fontSize: 10, fontWeight: 700,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "#4f46e5", background: "#eef2ff",
                  border: "1px solid #c7d2fe",
                  borderRadius: 9999, padding: "4px 14px", marginBottom: 22,
                }}>
                  {card.tag}
                </span>

                <div style={{
                  width: isTV ? 58 : 52, height: isTV ? 58 : 52, borderRadius: 13,
                  background: card.iconBg, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  marginBottom: 20, color: "white",
                  boxShadow: `0 6px 20px ${card.iconGlow}`,
                }}>
                  {card.icon}
                </div>

                <h3 style={{
                  fontSize: isTV ? 19 : 17, fontWeight: 700, color: "#0f172a",
                  marginBottom: 11, letterSpacing: "-0.02em", lineHeight: 1.35,
                }}>
                  {card.title}
                </h3>

                <p style={{ fontSize: isTV ? 15 : 14, color: "#475569", lineHeight: 1.78, margin: 0 }}>
                  {card.description}
                </p>

                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
                  background: card.accentLine,
                  borderRadius: "0 0 20px 20px", opacity: 0.6,
                }} />
              </motion.div>
            ))}
          </div>
        )}

        {/* ── MISSION STRIP ── */}
        <motion.div
          {...fadeUp} transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          style={{
            marginTop: isMobile ? 36 : 60,
            borderRadius: 20,
            background: "linear-gradient(135deg, #4f46e5 0%, #2563eb 50%, #0891b2 100%)",
            padding: isMobile ? "28px 24px" : "38px 48px",
            display: "flex",
            flexDirection: isCompact ? "column" : "row",
            alignItems: isCompact ? "flex-start" : "center",
            justifyContent: "space-between",
            gap: isMobile ? 18 : 24,
            flexWrap: "wrap",
            position: "relative", overflow: "hidden",
            boxShadow: "0 12px 40px rgba(79,70,229,0.20), 0 4px 12px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{
            position: "absolute", top: -60, right: -60,
            width: 280, height: 280, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 65%)",
            pointerEvents: "none",
          }} />
          <div>
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.24em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 10,
            }}>
              Our Mission
            </div>
            <p style={{
              fontSize: isTV ? "clamp(1.05rem, 2vw, 1.3rem)" : "clamp(0.92rem, 2vw, 1.15rem)",
              fontWeight: 600,
              color: "white", maxWidth: 660, lineHeight: 1.6,
              margin: 0, letterSpacing: "-0.01em",
            }}>
              To serve as an extended arm for product companies by consistently
              delivering excellence in innovative, customized engineering solutions
              and quality customer support.
            </p>
          </div>
          <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.45)" }} />
            <div style={{
              fontSize: 13, fontWeight: 700,
              color: "rgba(255,255,255,0.85)", letterSpacing: "0.05em", whiteSpace: "nowrap",
            }}>
              "Enlightening Tech World"
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}