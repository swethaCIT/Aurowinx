import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { C, FONT, fadeUp, EASE } from "././theme";
import { Target } from "lucide-react";

const cards = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    tag: "Why Us",
    title: "Domain Expertise & Proven Delivery",
    description:
      "Domain expertise, established workflows, and automation backed by an experienced team with a strong track record of silicon success stories across advanced technology nodes.",
    iconBg: "rgba(79,70,229,0.08)",
    accentLine: "linear-gradient(90deg, #4f46e5, #6366f1)",
    color: "#4f46e5",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    tag: "What We Do",
    title: "Build Silicon Products & Systems",
    description:
      "We engage with customers to build their silicon products and systems through our expertise and innovation — serving as an extended engineering arm for product companies.",
    iconBg: "rgba(8,145,178,0.08)",
    accentLine: "linear-gradient(90deg, #0891b2, #06b6d4)",
    color: "#0891b2",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18" />
      </svg>
    ),
    tag: "How We Do",
    title: "Spec2GDSII & Spec2Systems",
    description:
      "Through various business models — T&M, Turnkey, and Milestone-based — we provide Spec2GDSII services and evolve toward full Spec2Systems delivery with secured infrastructure.",
    iconBg: "rgba(37,99,235,0.08)",
    accentLine: "linear-gradient(90deg, #2563eb, #0891b2)",
    color: "#2563eb",
  },
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
   PILLAR CARD — shared look for grid + carousel
───────────────────────────────────────────── */
function PillarCard({ card, index, size = "md" }) {
  const [hovered, setHovered] = useState(false);
  const big = size === "lg";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        borderRadius: 18,
        padding: big ? "34px 30px" : "28px 24px",
        borderWidth: 1, borderStyle: "solid",
        borderColor: hovered ? card.color + "40" : "#eef2ff",
        boxShadow: hovered
          ? `0 16px 36px ${card.color}1a, 0 2px 8px rgba(15,23,42,0.04)`
          : "0 1px 3px rgba(15,23,42,0.04)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "border-color .3s ease, box-shadow .3s ease, transform .3s ease",
        position: "relative", overflow: "hidden", height: "100%", boxSizing: "border-box",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2.5,
        background: card.accentLine, opacity: hovered ? 1 : 0.5,
        transition: "opacity .3s ease",
      }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{
          width: big ? 50 : 44, height: big ? 50 : 44, borderRadius: 12,
          background: card.iconBg, display: "flex",
          alignItems: "center", justifyContent: "center", color: card.color,
          flexShrink: 0,
        }}>
          {card.icon}
        </div>
        <span style={{
          fontSize: 11, fontWeight: 700, color: "#cbd5e1",
          letterSpacing: "0.02em", fontVariantNumeric: "tabular-nums",
        }}>
          0{index + 1}
        </span>
      </div>

      <div style={{
        fontSize: 10.5, fontWeight: 700, letterSpacing: "0.16em",
        textTransform: "uppercase", color: card.color, marginBottom: 10,
      }}>
        {card.tag}
      </div>

      <h3 style={{
        fontSize: big ? 18 : 16.5, fontWeight: 700, color: "#0f172a",
        marginBottom: 10, letterSpacing: "-0.02em", lineHeight: 1.32,
      }}>
        {card.title}
      </h3>

      <p style={{ fontSize: big ? 14 : 13.5, color: "#64748b", lineHeight: 1.72, margin: 0 }}>
        {card.description}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MOBILE/TABLET — CARD CAROUSEL
───────────────────────────────────────────── */
const slideVariants = {
  enter:  (dir) => ({ opacity: 0, x: dir > 0 ? 36 : -36 }),
  center: { opacity: 1, x: 0 },
  exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -36 : 36 }),
};

function CardCarousel({ isMobile }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

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
            transition={{ duration: 0.32, ease: EASE }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(e, info) => {
              const threshold = 60;
              if (info.offset.x < -threshold) go(active + 1);
              else if (info.offset.x > threshold) go(active - 1);
            }}
            style={{ touchAction: "pan-y" }}
          >
            <PillarCard card={card} index={active} size={isMobile ? "md" : "lg"} />
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
        background: "#ffffff",
        fontFamily: FONT,
        position: "relative",
        overflow: "hidden",
        padding: isMobile ? "64px 0 72px" : isTablet ? "80px 0 88px" : isTV ? "130px 0 140px" : "100px 0 110px",
      }}
    >
      {/* ── BACKDROP — soft grid + single glow ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 0%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 0%, transparent 75%)",
        opacity: 0.025,
      }} />
      <div style={{
        position: "absolute", top: -160, left: "50%", transform: "translateX(-50%)",
        width: 720, height: 420, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: maxW, margin: "0 auto", padding: `0 ${horizPad}`, position: "relative", zIndex: 1 }}>

        {/* ── LABEL ── */}
        <motion.div {...fadeUp} transition={{ duration: 0.7, ease: EASE }} style={{ textAlign: "center", marginBottom: 18 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "7px 18px 7px 14px", borderRadius: 9999,
            background: C.bgAccent,
            fontSize: 11, fontWeight: 700, letterSpacing: "0.2em",
            textTransform: "uppercase", color: C.primary,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.primary }} />
            Company Profile
          </span>
        </motion.div>

        {/* ── HEADING ── */}
        <motion.h2
          {...fadeUp} transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{
            textAlign: "center",
            fontSize: isTV ? "clamp(2.6rem, 4vw, 3.8rem)" : "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 800, color: C.textPrimary, letterSpacing: "-0.035em",
            lineHeight: 1.08, marginBottom: 18,
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
            textAlign: "center", fontSize: isTV ? 17 : 15.5, color: C.textSecondary,
            maxWidth: 620, margin: isMobile ? "0 auto 40px" : "0 auto 64px", lineHeight: 1.75,
            padding: isMobile ? "0 4px" : 0,
          }}
        >
          A technology-driven engineering company delivering innovative solutions
          across Semiconductor Design, Embedded Systems, IoT Automation, and
          Electronics Product Development — transforming ideas into intelligent,
          scalable systems that bridge hardware and software ecosystems.
        </motion.p>

        {/* ── CARDS — desktop/TV grid, mobile/tablet carousel ── */}
        {isCompact ? (
          <CardCarousel isMobile={isMobile} />
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: isTV ? "repeat(3, 1fr)" : "repeat(auto-fit, minmax(300px, 1fr))",
            gap: isTV ? 24 : 20,
          }}>
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              >
                <PillarCard card={card} index={i} size={isTV ? "lg" : "md"} />
              </motion.div>
            ))}
          </div>
        )}

        {/* ── MISSION STRIP ── */}
        <motion.div
          {...fadeUp} transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          style={{
            marginTop: isMobile ? 32 : 52,
            borderRadius: 20,
            background: "linear-gradient(135deg, #4f46e5 0%, #2563eb 50%, #0891b2 100%)",
            padding: isMobile ? "28px 24px" : "36px 44px",
            display: "flex",
            flexDirection: isCompact ? "column" : "row",
            alignItems: isCompact ? "flex-start" : "center",
            justifyContent: "space-between",
            gap: isMobile ? 20 : 24,
            flexWrap: "wrap",
            position: "relative", overflow: "hidden",
            boxShadow: "0 16px 40px rgba(79,70,229,0.22), 0 4px 12px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{
            position: "absolute", top: -70, right: -70,
            width: 280, height: 280, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.09) 0%, transparent 65%)",
            pointerEvents: "none",
          }} />
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10, flexShrink: 0,
              background: "rgba(255,255,255,0.14)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginTop: 2,
            }}>
              <Target style={{ width: 18, height: 18, color: "white" }} strokeWidth={1.8} />
            </div>
            <div>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.24em",
                textTransform: "uppercase", color: "rgba(255,255,255,0.62)", marginBottom: 8,
              }}>
                Our Mission
              </div>
              <p style={{
                fontSize: isTV ? "clamp(1.05rem, 2vw, 1.3rem)" : "clamp(0.92rem, 2vw, 1.15rem)",
                fontWeight: 600,
                color: "white", maxWidth: 640, lineHeight: 1.6,
                margin: 0, letterSpacing: "-0.01em",
              }}>
                To serve as an extended arm for product companies by consistently
                delivering excellence in innovative, customized engineering solutions
                and quality customer support.
              </p>
            </div>
          </div>
          <div style={{
            flexShrink: 0, display: "flex", alignItems: "center", gap: 10,
            padding: "8px 16px", borderRadius: 9999,
            background: "rgba(255,255,255,0.1)",
            marginLeft: isCompact ? 54 : 0,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.7)" }} />
            <div style={{
              fontSize: 12.5, fontWeight: 700,
              color: "rgba(255,255,255,0.9)", letterSpacing: "0.03em", whiteSpace: "nowrap",
            }}>
              Engineered for Certainty.
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
