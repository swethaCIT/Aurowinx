// WhyPartnerWithUs.jsx — Company Page
// AurowinX — Built For Silicon Success
//
// Mobile   : Swipeable 3D flip cards (tap to reveal stat on back)
//            Quote strip collapses to minimal blockquote
//
// Tablet   : Featured hero card (first item, full-width)
//            + 2×2 accordion cards below (tap to expand description)
//            Quote strip horizontal compact
//
// Desktop  : Original split — large feature left + 2×2 grid right
// TV       : Wider max-width, larger type, more padding

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { C, FONT, fadeUp, fadeLeft, EASE } from "././theme";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const reasons = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Outcome-Driven Partnerships",
    description: "We go beyond resource provisioning. Our expert teams take ownership to deliver measurable results that accelerate your silicon roadmap and enhance product quality.",
    stat: "100%",
    statLabel: "Delivery Accountability",
    color: "#4f46e5",
    bg: "rgba(79,70,229,0.06)",
    border: "rgba(79,70,229,0.14)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Tool-Agnostic & Flow-Ready",
    description: "Deep expertise across Synopsys, Cadence, and Siemens EDA tools with seamless integration into your existing ASIC/SoC flows — no ramp-up friction.",
    stat: "3+",
    statLabel: "EDA Tool Ecosystems",
    color: "#0891b2",
    bg: "rgba(8,145,178,0.06)",
    border: "rgba(8,145,178,0.14)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
      </svg>
    ),
    title: "Flexible Global Delivery",
    description: "Onsite, offshore, or hybrid teams tailored to your time zones, budgets, and project priorities — ensuring cost-efficiency without compromising accountability.",
    stat: "3x",
    statLabel: "Delivery Models",
    color: "#2563eb",
    bg: "rgba(37,99,235,0.06)",
    border: "rgba(37,99,235,0.14)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
    title: "Milestone-Based Execution",
    description: "Structured delivery with clearly defined phases, proactive reporting, and tight alignment with your engineering milestones — zero ambiguity at every stage.",
    stat: "0",
    statLabel: "Missed Milestones",
    color: "#0284c7",
    bg: "rgba(2,132,199,0.06)",
    border: "rgba(2,132,199,0.14)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Proven Track Record",
    description: "Trusted by leading semiconductor companies for delivering high-performance designs across 7nm, 5nm, and below — with first silicon success across domains.",
    stat: "9+",
    statLabel: "Tech Nodes Delivered",
    color: "#4f46e5",
    bg: "rgba(79,70,229,0.06)",
    border: "rgba(79,70,229,0.14)",
  },
];

const floatingOrbs = [
  { top: "15%", left: "5%",  size: 180, color: "rgba(79,70,229,0.04)" },
  { bottom: "10%", right: "4%", size: 220, color: "rgba(8,145,178,0.04)" },
];

/* ─────────────────────────────────────────────
   VIEWPORT HOOK
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
    return () => { window.removeEventListener("resize", onResize); cancelAnimationFrame(raf); };
  }, []);
  return {
    isMobile:  width < 640,
    isTablet:  width >= 640 && width < 1024,
    isCompact: width < 1024,
    isTV:      width >= 1600,
  };
}

/* ─────────────────────────────────────────────
   MOBILE — 3D FLIP CARD CAROUSEL
   Front: icon + title + stat | Back: description
───────────────────────────────────────────── */
const slideVariants = {
  enter:  (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

function FlipCard({ item }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped((f) => !f)}
      style={{
        width: "100%",
        perspective: 1000,
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: "relative",
          width: "100%",
          minHeight: 280,
          transformStyle: "preserve-3d",
        }}
      >
        {/* FRONT */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          background: "#fff",
          borderRadius: 20,
          border: `1.5px solid ${item.border}`,
          boxShadow: "0 4px 24px rgba(15,23,42,0.08)",
          padding: "32px 24px",
          display: "flex", flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          position: "absolute", inset: 0,
        }}>
          {/* Top accent */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, ${item.color}, transparent)`,
            borderRadius: "20px 20px 0 0", opacity: 0.7,
          }} />

          {/* Watermark number */}
          <div style={{
            position: "absolute", bottom: 12, right: 18,
            fontSize: 88, fontWeight: 900, color: item.color,
            opacity: 0.04, lineHeight: 1, letterSpacing: "-0.06em",
            userSelect: "none", pointerEvents: "none",
          }}>
            {item.stat}
          </div>

          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: item.bg, border: `1px solid ${item.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: item.color,
          }}>
            {item.icon}
          </div>

          <div>
            <div style={{
              fontSize: "clamp(2.6rem, 12vw, 3.2rem)",
              fontWeight: 900, color: item.color,
              letterSpacing: "-0.05em", lineHeight: 1, marginBottom: 4,
            }}>
              {item.stat}
            </div>
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.16em",
              textTransform: "uppercase", color: C.textMuted, marginBottom: 16,
            }}>
              {item.statLabel}
            </div>
            <h3 style={{
              fontSize: 16, fontWeight: 700, color: C.textPrimary,
              letterSpacing: "-0.02em", lineHeight: 1.25, margin: 0,
            }}>
              {item.title}
            </h3>
          </div>

          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 11, fontWeight: 700, color: item.color,
            letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            <span>Tap for details</span>
            <div style={{
              width: 20, height: 20, borderRadius: "50%",
              background: item.bg, border: `1px solid ${item.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10,
            }}>↩</div>
          </div>
        </div>

        {/* BACK */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          background: `linear-gradient(145deg, ${item.color} 0%, ${item.color}cc 100%)`,
          borderRadius: 20,
          padding: "32px 24px",
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          overflow: "hidden",
        }}>
          {/* glow */}
          <div style={{
            position: "absolute", top: -40, right: -40,
            width: 180, height: 180, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 65%)",
            pointerEvents: "none",
          }} />

          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: "rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff",
          }}>
            {item.icon}
          </div>

          <div>
            <h3 style={{
              fontSize: 17, fontWeight: 700, color: "#fff",
              letterSpacing: "-0.02em", lineHeight: 1.25, marginBottom: 12,
            }}>
              {item.title}
            </h3>
            <p style={{
              fontSize: 13.5, color: "rgba(255,255,255,0.82)",
              lineHeight: 1.8, margin: 0,
            }}>
              {item.description}
            </p>
          </div>

          <div style={{
            fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.6)",
            letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            Tap to flip back
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FlipCardCarousel() {
  const [active, setActive]       = useState(0);
  const [direction, setDirection] = useState(1);
  const item = reasons[active];

  const go = (i) => {
    if (i < 0 || i >= reasons.length) return;
    setDirection(i > active ? 1 : -1);
    setActive(i);
  };

  return (
    <div>
      {/* Counter */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: 14,
      }}>
        <span style={{
          fontSize: 11, fontWeight: 700, color: C.textMuted,
          letterSpacing: "0.12em", textTransform: "uppercase",
        }}>
          {String(active + 1).padStart(2,"0")} / {String(reasons.length).padStart(2,"0")}
        </span>
        <div style={{
          fontSize: 11, fontWeight: 700, color: item.color,
          letterSpacing: "0.08em", textTransform: "uppercase",
        }}>
          Swipe or tap dots
        </div>
      </div>

      {/* Slide */}
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
            dragElastic={0.16}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(active + 1);
              else if (info.offset.x > 60) go(active - 1);
            }}
            style={{ touchAction: "pan-y" }}
          >
            <FlipCard item={item} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginTop: 18 }}>
        {reasons.map((r, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            style={{ border: "none", background: "transparent", padding: 4, cursor: "pointer" }}
          >
            <motion.span
              animate={{ width: i === active ? 22 : 6, background: i === active ? item.color : "#e2e8f0" }}
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
   TABLET — Hero feature card + 2×2 accordion
───────────────────────────────────────────── */
function TabletHeroCard() {
  const item = reasons[0];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE }}
      style={{
        borderRadius: 20,
        padding: "36px 32px",
        position: "relative", overflow: "hidden",
        boxShadow: "0 16px 48px rgba(79,70,229,0.18), 0 4px 12px rgba(0,0,0,0.06)",
        marginBottom: 20,
        minHeight: 220,
        display: "flex", alignItems: "center", gap: 32,
        backgroundImage: `url("https://images.pexels.com/photos/3912477/pexels-photo-3912477.jpeg?auto=compress&cs=tinysrgb&w=800")`,
        backgroundSize: "cover", backgroundPosition: "center",
      }}
    >
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(145deg, rgba(79,70,229,0.88) 0%, rgba(8,145,178,0.78) 100%)",
        borderRadius: 20, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 65%)", pointerEvents: "none",
      }} />

      {/* Left: stat */}
      <div style={{ position: "relative", zIndex: 1, flexShrink: 0 }}>
        <div style={{ fontSize: "clamp(3rem, 7vw, 4rem)", fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-0.05em", marginBottom: 4 }}>
          {item.stat}
        </div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>
          {item.statLabel}
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: 1, alignSelf: "stretch", background: "rgba(255,255,255,0.2)", flexShrink: 0, position: "relative", zIndex: 1 }} />

      {/* Right: title + desc */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", marginBottom: 14 }}>
          {item.icon}
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 10, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
          {item.title}
        </h3>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.75, margin: 0 }}>
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

function TabletAccordionCard({ item, i }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
      style={{
        background: "#fff", borderRadius: 16,
        border: `1.5px solid ${open ? item.color + "45" : item.border}`,
        overflow: "hidden",
        boxShadow: open ? `0 8px 28px ${item.color}14` : "0 2px 10px rgba(15,23,42,0.05)",
        transition: "border-color 0.25s, box-shadow 0.25s",
        position: "relative",
      }}
    >
      {/* Top accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${item.color}, transparent)`,
        opacity: open ? 0.8 : 0.35, transition: "opacity 0.25s",
        borderRadius: "16px 16px 0 0",
      }} />

      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileTap={{ scale: 0.99 }}
        style={{
          width: "100%", background: open ? item.bg : "#fff",
          border: "none", padding: "16px 18px",
          cursor: "pointer", display: "flex", alignItems: "center", gap: 12,
          fontFamily: FONT, transition: "background 0.25s ease",
        }}
      >
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: open ? "#fff" : item.bg,
          border: `1px solid ${item.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: item.color, flexShrink: 0,
          transition: "background 0.25s",
        }}>
          {item.icon}
        </div>

        <div style={{ flex: 1, textAlign: "left" }}>
          <div style={{
            fontSize: 16, fontWeight: 900, color: item.color,
            letterSpacing: "-0.03em", lineHeight: 1,
          }}>
            {item.stat}
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.textMuted, marginLeft: 8, verticalAlign: "middle" }}>
              {item.statLabel}
            </span>
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary, letterSpacing: "-0.01em", marginTop: 3 }}>
            {item.title}
          </div>
        </div>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.32, ease: EASE }}
          style={{ color: item.color, flexShrink: 0 }}
        >
          <ChevronDown style={{ width: 17, height: 17 }} />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 18px 18px 18px" }}>
              <p style={{ margin: 0, fontSize: 13, color: C.textSecondary, lineHeight: 1.78 }}>
                {item.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   DESKTOP / TV — original split layout
───────────────────────────────────────────── */
function DesktopFeatureCard({ item, isTV }) {
  return (
    <motion.div
      {...fadeLeft}
      transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      style={{
        borderRadius: 24,
        padding: isTV ? "56px 48px" : "48px 40px",
        position: "relative", overflow: "hidden",
        boxShadow: "0 16px 48px rgba(79,70,229,0.18), 0 4px 12px rgba(0,0,0,0.06)",
        height: "100%", minHeight: 380,
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        cursor: "default",
        backgroundImage: `url("https://images.pexels.com/photos/3912477/pexels-photo-3912477.jpeg?auto=compress&cs=tinysrgb&w=800")`,
        backgroundSize: "cover", backgroundPosition: "center",
      }}
    >
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(145deg, rgba(79,70,229,0.82) 0%, rgba(8,145,178,0.72) 100%)",
        borderRadius: 24, pointerEvents: "none",
      }} />
      <div style={{ position: "absolute", top: -60, right: -60, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -40, left: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />
      {[...Array(4)].map((_, di) => (
        <motion.div key={di} style={{
          position: "absolute", width: di % 2 === 0 ? 5 : 3, height: di % 2 === 0 ? 5 : 3,
          borderRadius: "50%", background: "rgba(255,255,255,0.4)",
          top: `${20 + di * 18}%`, right: `${10 + di * 6}%`, pointerEvents: "none",
        }}
          animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.4, 1] }}
          transition={{ duration: 2 + di * 0.5, repeat: Infinity, ease: "easeInOut", delay: di * 0.4 }}
        />
      ))}
      <div style={{
        position: "absolute", top: 36, left: 40,
        width: 52, height: 52, borderRadius: 14,
        background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "white", backdropFilter: "blur(8px)", zIndex: 1,
      }}>
        {item.icon}
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: isTV ? "clamp(3.5rem, 6vw, 5rem)" : "clamp(3rem, 6vw, 4.5rem)", fontWeight: 900, color: "white", lineHeight: 1, letterSpacing: "-0.04em", marginBottom: 8, opacity: 0.95 }}>
          {item.stat}
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", marginBottom: 20 }}>
          {item.statLabel}
        </div>
        <h3 style={{ fontSize: isTV ? 24 : 22, fontWeight: 700, color: "white", marginBottom: 14, letterSpacing: "-0.025em", lineHeight: 1.25 }}>
          {item.title}
        </h3>
        <p style={{ fontSize: isTV ? 15.5 : 14.5, color: "rgba(255,255,255,0.8)", lineHeight: 1.75, margin: 0 }}>
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

function DesktopSmallCard({ item, i, isTV }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: EASE }}
      whileHover={{ y: -4, boxShadow: `0 12px 36px ${item.color}14`, transition: { duration: 0.25 } }}
      style={{
        background: "white", borderRadius: 18,
        padding: isTV ? "32px 28px" : "28px 24px",
        border: `1px solid ${item.border}`,
        boxShadow: "0 2px 12px rgba(15,23,42,0.05)",
        position: "relative", overflow: "hidden",
        cursor: "default", display: "flex", flexDirection: "column",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${item.color}, transparent)`,
        borderRadius: "18px 18px 0 0", opacity: 0.6,
      }} />
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: item.bg, border: `1px solid ${item.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: item.color, marginBottom: 14,
      }}>
        {item.icon}
      </div>
      <div style={{ fontSize: isTV ? "clamp(1.8rem, 2.5vw, 2.2rem)" : "clamp(1.6rem, 2.5vw, 2rem)", fontWeight: 900, color: item.color, lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 4 }}>
        {item.stat}
      </div>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: C.textMuted, marginBottom: 14 }}>
        {item.statLabel}
      </div>
      <h3 style={{ fontSize: isTV ? 15 : 14, fontWeight: 700, color: C.textPrimary, marginBottom: 8, letterSpacing: "-0.015em", lineHeight: 1.3 }}>
        {item.title}
      </h3>
      <p style={{ fontSize: isTV ? 13.5 : 12.5, color: C.textSecondary, lineHeight: 1.7, margin: 0 }}>
        {item.description}
      </p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   QUOTE STRIP VARIANTS
───────────────────────────────────────────── */
function QuoteStrip({ isMobile, isTablet, isTV }) {
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: EASE }}
        style={{
          borderRadius: 16,
          background: "#fff",
          border: "1px solid #e0e7ff",
          borderLeft: "4px solid #4f46e5",
          padding: "20px 18px",
          position: "relative", overflow: "hidden",
        }}
      >
        <div style={{
          fontSize: 28, fontWeight: 900, color: "#4f46e5",
          opacity: 0.12, lineHeight: 1,
          position: "absolute", top: 10, left: 14,
          fontFamily: "Georgia, serif",
        }}>"</div>
        <p style={{
          fontSize: 13.5, fontWeight: 600, color: C.textPrimary,
          lineHeight: 1.7, margin: "0 0 12px",
          letterSpacing: "-0.01em",
          paddingLeft: 18,
        }}>
          We don't just provide engineers — we take end-to-end ownership of your silicon success, from the first specification to the final GDSII tape-out.
        </p>
        <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", paddingLeft: 18 }}>
          Aurowinx Engineering
        </div>
      </motion.div>
    );
  }

  if (isTablet) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{
          borderRadius: 16,
          background: "#fff",
          border: "1px solid #e0e7ff",
          padding: "24px 28px",
          display: "flex", alignItems: "center", gap: 20,
          boxShadow: "0 2px 14px rgba(79,70,229,0.06)",
          position: "relative", overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute", top: 0, left: 0, bottom: 0, width: 4,
          background: "linear-gradient(180deg, #4f46e5, #0891b2)",
          borderRadius: "16px 0 0 16px",
        }} />
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          background: "linear-gradient(135deg, #4f46e5, #0891b2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", boxShadow: "0 6px 20px rgba(79,70,229,0.2)",
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        </div>
        <p style={{ fontSize: 13.5, fontWeight: 600, color: C.textPrimary, lineHeight: 1.65, margin: 0, flex: 1, letterSpacing: "-0.01em" }}>
          "We don't just provide engineers — we take end-to-end ownership of your silicon success."
        </p>
        <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", flexShrink: 0 }}>
          Aurowinx
        </div>
      </motion.div>
    );
  }

  // Desktop / TV
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
      style={{
        marginTop: 64,
        borderRadius: 18, background: "white",
        border: "1px solid #e0e7ff",
        padding: isTV ? "40px 56px" : "36px 48px",
        display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap",
        boxShadow: "0 2px 16px rgba(79,70,229,0.06)",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 4, background: "linear-gradient(180deg, #4f46e5, #0891b2)", borderRadius: "18px 0 0 18px" }} />
      <div style={{
        width: 48, height: 48, borderRadius: 12, flexShrink: 0,
        background: "linear-gradient(135deg, #4f46e5, #0891b2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "white", boxShadow: "0 6px 20px rgba(79,70,229,0.2)",
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      </div>
      <p style={{ fontSize: isTV ? "clamp(1rem, 1.8vw, 1.1rem)" : "clamp(0.9rem, 1.8vw, 1.05rem)", fontWeight: 600, color: C.textPrimary, lineHeight: 1.65, margin: 0, flex: 1, letterSpacing: "-0.01em" }}>
        "We don't just provide engineers — we take end-to-end ownership of your silicon success, from the first specification to the final GDSII tape-out."
      </p>
      <div style={{ fontSize: 12, color: C.textMuted, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", flexShrink: 0 }}>
        Aurowinx Engineering
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   ROOT
───────────────────────────────────────────── */
export default function WhyPartnerWithUs() {
  const { isMobile, isTablet, isCompact, isTV } = useViewport();
  const horizPad = isMobile ? "18px" : isTablet ? "28px" : "24px";
  const maxW = isTV ? 1500 : 1200;

  return (
    <section style={{
      background: "#f8fafc",
      fontFamily: FONT,
      position: "relative", overflow: "hidden",
      padding: isMobile ? "60px 0 68px" : isTablet ? "72px 0 80px" : isTV ? "130px 0 140px" : "100px 0 110px",
    }}>
      {floatingOrbs.map((orb, i) => (
        <div key={i} style={{
          position: "absolute", top: orb.top, bottom: orb.bottom, left: orb.left, right: orb.right,
          width: orb.size, height: orb.size, borderRadius: "50%",
          background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
      ))}

      <div style={{ maxWidth: maxW, margin: "0 auto", padding: `0 ${horizPad}`, position: "relative", zIndex: 1 }}>

        {/* Label */}
        <motion.div {...fadeUp} transition={{ duration: 0.7, ease: EASE }} style={{ textAlign: "center", marginBottom: 16 }}>
          <span style={{
            display: "inline-block", padding: "6px 20px", borderRadius: 9999,
            border: "1px solid #c7d2fe", background: "#eef2ff",
            fontSize: 11, fontWeight: 700, letterSpacing: "0.22em",
            textTransform: "uppercase", color: C.primary,
          }}>
            Why Partner With Us
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2 {...fadeUp} transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{
            textAlign: "center",
            fontSize: isTV ? "clamp(2.4rem, 4vw, 3.6rem)" : "clamp(1.9rem, 4vw, 3rem)",
            fontWeight: 700, color: C.textPrimary,
            letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16,
          }}
        >
          Built For{" "}
          <span style={{
            background: "linear-gradient(135deg, #4f46e5 0%, #0891b2 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Silicon Success
          </span>
        </motion.h2>

        {/* Subtext */}
        <motion.p {...fadeUp} transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
          style={{
            textAlign: "center", fontSize: isTV ? 17 : 15, color: C.textSecondary,
            maxWidth: 580, margin: isMobile ? "0 auto 36px" : "0 auto 64px", lineHeight: 1.75,
          }}
        >
          Five reasons why leading semiconductor companies trust Aurowinx to deliver, every time.
        </motion.p>

        {/* ── MOBILE: flip card carousel ── */}
        {isMobile && (
          <div style={{ marginBottom: 28 }}>
            <FlipCardCarousel />
          </div>
        )}

        {/* ── TABLET: hero card + 2×2 accordion ── */}
        {isTablet && (
          <div style={{ marginBottom: 28 }}>
            <TabletHeroCard />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {reasons.slice(1).map((item, i) => (
                <TabletAccordionCard key={i} item={item} i={i} />
              ))}
            </div>
          </div>
        )}

        {/* ── DESKTOP / TV: split layout ── */}
        {!isCompact && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, alignItems: "start" }}>
            <DesktopFeatureCard item={reasons[0]} isTV={isTV} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: isTV ? 22 : 20 }}>
              {reasons.slice(1).map((item, i) => (
                <DesktopSmallCard key={i} item={item} i={i} isTV={isTV} />
              ))}
            </div>
          </div>
        )}

        {/* Quote strip */}
        <div style={{ marginTop: isMobile || isTablet ? 0 : 0 }}>
          <QuoteStrip isMobile={isMobile} isTablet={isTablet} isTV={isTV} />
        </div>

      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </section>
  );
}