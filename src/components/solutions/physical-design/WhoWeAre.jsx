// WhoWeAre.jsx — Physical Design Page
// AurowinX — Physical Design Team & About
// Light & professional, indigo accent, tight spacing
// Responsive: mobile/tablet carousel + accordion, desktop/TV grid

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Users, Award, Briefcase, CheckCircle2, ChevronRight,
  ChevronDown, ChevronLeft,
} from "lucide-react";
import { C, FONT, EASE } from "./theme";

const TEAM_ROLES = [
  {
    title: "Principal Physical Design Manager",
    exp: "15+ years of experience",
    color: "#4f46e5",
    bg: "#eef2ff",
    icon: <Award style={{ width: 20, height: 20 }} />,
    points: [
      "Leads full RTL-to-GDSII physical design flow for complex SoC designs",
      "Defines floorplan strategy, power grid architecture and timing budgets",
      "Oversees multi-corner multi-mode STA and sign-off closure",
      "Drives DRC/LVS clean sign-off across advanced process nodes",
      "Collaborates with front-end and DFT teams for seamless integration",
      "Manages tape-out readiness and foundry interface coordination",
    ],
  },
  {
    title: "Execution PD Manager",
    exp: "10+ years of experience",
    color: "#7c3aed",
    bg: "#f5f3ff",
    icon: <Briefcase style={{ width: 20, height: 20 }} />,
    points: [
      "Responsible for day-to-day physical design execution and block ownership",
      "Ensures on-time delivery of placement, routing and ECO closure",
      "Resource planning and continuous flow refinement",
      "Coordinates with verification and timing teams for convergence",
    ],
  },
  {
    title: "Engineering Team",
    exp: "5+ skilled PD specialists",
    color: "#0891b2",
    bg: "#ecfeff",
    icon: <Users style={{ width: 20, height: 20 }} />,
    points: [
      "Execute floorplanning, placement, CTS and detailed routing",
      "Run SI/PI analysis, IR-drop optimization and ECO implementation",
      "Perform DRC/LVS physical verification and extraction",
      "Support GDSII generation and tape-out deliverables",
    ],
  },
];

const ABOUT_POINTS = [
  "Specialized in full RTL-to-GDSII physical design implementation",
  "Embedded on-site engineering & in-house project execution",
  "Expertise across TSMC, Samsung, GlobalFoundries, UMC nodes",
  "Proven flat and hierarchical PNR flows down to 5nm",
];

const DOMAIN_STATS = [
  { val: "5nm+",  label: "Advanced Nodes", color: "#4f46e5" },
  { val: "15+",   label: "Team Experience", color: "#7c3aed" },
  { val: "150+",  label: "Tape-outs Done", color: "#0891b2" },
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

/* ── Animated pagination dots ── */
function Dots({ count, active, onSelect, color }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Go to role ${i + 1}`}
          style={{ border: "none", cursor: "pointer", padding: 0, background: "transparent" }}
        >
          <motion.div
            animate={{
              width: active === i ? 26 : 7,
              background: active === i ? color : C.borderLight,
            }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{ height: 7, borderRadius: 4 }}
          />
        </motion.button>
      ))}
    </div>
  );
}

/* ── Collapsible points dropdown (mobile/tablet) ── */
function PointsAccordion({ role, open, onToggle }) {
  return (
    <div style={{
      borderRadius: 12, overflow: "hidden",
      border: `1px solid ${role.color}25`, background: "#fff",
    }}>
      <motion.button
        onClick={onToggle}
        whileTap={{ scale: 0.98 }}
        style={{
          width: "100%", border: "none", cursor: "pointer",
          background: open ? role.bg : "#fff",
          padding: "11px 14px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          fontFamily: FONT, transition: "background 0.25s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 22, height: 22, borderRadius: 7,
            background: role.color, color: "#fff", fontSize: 10.5, fontWeight: 800,
          }}>
            {role.points.length}
          </span>
          <span style={{ fontSize: 12.5, fontWeight: 800, color: C.textPrimary, letterSpacing: "-0.01em" }}>
            Responsibilities
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          style={{ color: role.color, display: "flex" }}
        >
          <ChevronDown style={{ width: 17, height: 17 }} />
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
            <div style={{ padding: "6px 14px 14px", display: "flex", flexDirection: "column", gap: 7 }}>
              {role.points.map((pt, j) => (
                <motion.div
                  key={pt}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: j * 0.04, ease: EASE }}
                  style={{ display: "flex", alignItems: "flex-start", gap: 8 }}
                >
                  <ChevronRight style={{ width: 13, height: 13, color: role.color, flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 12.5, color: C.textSecondary, lineHeight: 1.65 }}>{pt}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Role card — desktop/TV (static grid) ── */
function RoleCard({ role, i, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
      whileHover={{ y: -5, boxShadow: `0 16px 40px ${role.color}16` }}
      style={{
        background: "#fff", borderRadius: 18, padding: "22px 20px",
        border: `1px solid ${C.borderLight}`, boxShadow: C.shadowMd,
        position: "relative", overflow: "hidden", cursor: "default",
        transition: "box-shadow 0.25s", height: "100%",
      }}
    >
      {/* Top color bar */}
      <motion.div
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: EASE }}
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${role.color}, ${role.color}55)`,
          transformOrigin: "left",
        }}
      />

      {/* Icon + title */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          background: role.bg, color: role.color,
          border: `1px solid ${role.color}25`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {role.icon}
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: 800, fontSize: 14, color: C.textPrimary, fontFamily: FONT, letterSpacing: "-0.02em" }}>
            {role.title}
          </p>
          <span style={{
            display: "inline-block", marginTop: 4,
            padding: "2px 10px", borderRadius: 50,
            background: role.bg, color: role.color,
            fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            border: `1px solid ${role.color}20`,
          }}>
            {role.exp}
          </span>
        </div>
      </div>

      {/* Points */}
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {role.points.map((pt, j) => (
          <motion.div
            key={pt}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.35, delay: 0.25 + i * 0.1 + j * 0.05, ease: EASE }}
            style={{ display: "flex", alignItems: "flex-start", gap: 8 }}
          >
            <ChevronRight style={{ width: 13, height: 13, color: role.color, flexShrink: 0, marginTop: 2 }} />
            <span style={{ fontSize: 12.5, color: C.textSecondary, lineHeight: 1.65 }}>{pt}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Role card — mobile/tablet (carousel) ── */
function RoleCardCompact({ role, isMobile, isTablet, open, onToggle }) {
  return (
    <div style={{
      scrollSnapAlign: "center",
      flex: isMobile ? "0 0 84%" : "0 0 47%",
      minWidth: isMobile ? "84%" : "47%",
    }}>
      <div style={{
        background: "#fff", borderRadius: 18, padding: "20px 18px",
        border: `1px solid ${C.borderLight}`, boxShadow: C.shadowMd,
        position: "relative", overflow: "hidden", height: "100%",
        display: "flex", flexDirection: "column", gap: 14,
      }}>
        {/* Top color bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${role.color}, ${role.color}55)`,
        }} />

        {/* Icon + title */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: role.bg, color: role.color,
            border: `1px solid ${role.color}25`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {role.icon}
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 800, fontSize: 14, color: C.textPrimary, fontFamily: FONT, letterSpacing: "-0.02em" }}>
              {role.title}
            </p>
            <span style={{
              display: "inline-block", marginTop: 4,
              padding: "2px 10px", borderRadius: 50,
              background: role.bg, color: role.color,
              fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
              border: `1px solid ${role.color}20`,
            }}>
              {role.exp}
            </span>
          </div>
        </div>

        {/* Dropdown of responsibilities */}
        <PointsAccordion role={role} open={open} onToggle={onToggle} />
      </div>
    </div>
  );
}

export default function WhoWeAre() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { isMobile, isTablet, isCompact, isTV } = useViewport();

  const [active, setActive] = useState(0);
  const [openRoles, setOpenRoles] = useState({}); // per-card accordion state

  const carouselRef = useRef(null);
  const scrollTimeout = useRef(null);

  // Default-open accordion on tablet, closed on mobile, reset per breakpoint
  useEffect(() => {
    if (isTablet) {
      setOpenRoles({ 0: true, 1: true, 2: true });
    } else {
      setOpenRoles({});
    }
  }, [isTablet, isMobile]);

  const toggleRole = (i) => {
    setOpenRoles((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  const scrollToIndex = (index) => {
    const container = carouselRef.current;
    if (!container) return;
    const card = container.children[index];
    if (!card) return;
    const target = card.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2;
    container.scrollTo({ left: target, behavior: "smooth" });
  };

  useEffect(() => {
    if (isCompact) scrollToIndex(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, isCompact]);

  const handleScroll = () => {
    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      const container = carouselRef.current;
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

  const goPrev = () => setActive((a) => Math.max(0, a - 1));
  const goNext = () => setActive((a) => Math.min(TEAM_ROLES.length - 1, a + 1));

  const sectionPad = isMobile
    ? "44px 16px 40px"
    : isTablet
    ? "52px 28px 48px"
    : "clamp(56px, 6vw, 88px) clamp(32px, 5vw, 80px) clamp(48px, 5vw, 72px)";

  const sectionMaxW = isTV ? 1760 : 1280;

  return (
    <section
      ref={ref}
      style={{
        background: "#fff",
        padding: sectionPad,
        position: "relative", overflow: "hidden", fontFamily: FONT,
      }}
    >
      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(79,70,229,0.05) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      <div style={{ maxWidth: sectionMaxW, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Top intro */}
        <div style={{
          display: isCompact ? "flex" : "grid",
          flexDirection: isCompact ? "column" : undefined,
          gridTemplateColumns: isCompact ? undefined : "1fr 1fr",
          gap: isMobile ? 28 : isTablet ? 32 : 32,
          marginBottom: isMobile ? 32 : 44,
          alignItems: isCompact ? "stretch" : "center",
        }}>

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: isCompact ? 0 : -20, y: isCompact ? 16 : 0 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
              <span style={{ color: C.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Who We Are</span>
            </div>
            <h2 style={{
              fontSize: "clamp(1.7rem, 4vw, 2.6rem)", fontWeight: 900,
              color: C.textPrimary, margin: "0 0 14px",
              letterSpacing: "-0.04em", fontFamily: FONT, lineHeight: 1.1,
            }}>
              Your Dedicated<br />
              <span style={{
                background: C.gradPrimary,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Physical Design Partner
              </span>
            </h2>
            <p style={{ color: C.textSecondary, fontSize: "clamp(13px, 1.4vw, 14px)", lineHeight: 1.8, margin: "0 0 20px", maxWidth: isCompact ? "100%" : 420 }}>
              Floorplanning decisions made in week one decide whether timing closes in week ten — our Physical Design team weighs hierarchical vs. flat PNR strategy and node-specific cell-library constraints upfront, so RTL-to-GDSII signoff doesn't stall on late-stage ECOs.
            </p>
            <motion.a
              href="/contact" whileHover={{ x: 4 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                color: C.primary, fontWeight: 700, fontSize: 13, textDecoration: "none",
              }}
            >
              Work with us <ChevronRight style={{ width: 15, height: 15 }} />
            </motion.a>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: isCompact ? 0 : 20, y: isCompact ? 16 : 0 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            {/* About points */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {ABOUT_POINTS.map((pt, i) => (
                <motion.div
                  key={pt}
                  initial={{ opacity: 0, x: isCompact ? 0 : 10, y: isCompact ? 8 : 0 }}
                  animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.07, ease: EASE }}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 10,
                    padding: "10px 14px", borderRadius: 10,
                    background: C.bgAccent, border: `1px solid ${C.borderLight}`,
                    boxShadow: C.shadowSm,
                  }}
                >
                  <CheckCircle2 style={{ width: 15, height: 15, color: "#22c55e", flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 13, color: C.textPrimary, fontWeight: 600, lineHeight: 1.5 }}>{pt}</span>
                </motion.div>
              ))}
            </div>

            {/* Mini stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: isMobile ? 8 : 12 }}>
              {DOMAIN_STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, ease: EASE }}
                  style={{
                    padding: isMobile ? "12px 8px" : "14px 12px", borderRadius: 12, textAlign: "center",
                    background: "#fff", border: `1px solid ${C.borderLight}`,
                    boxShadow: C.shadowSm,
                  }}
                >
                  <p style={{ margin: 0, fontSize: isMobile ? "1.25rem" : "1.5rem", fontWeight: 900, color: s.color, letterSpacing: "-0.04em", fontFamily: FONT }}>{s.val}</p>
                  <p style={{ margin: "3px 0 0", fontSize: isMobile ? 9.5 : 11, color: C.textMuted, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          style={{
            height: 1, background: `linear-gradient(90deg, transparent, ${C.border}, transparent)`,
            marginBottom: isMobile ? 28 : 36, transformOrigin: "left",
          }}
        />

        {/* Team label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.35, ease: EASE }}
          style={{ textAlign: "center", marginBottom: isMobile ? 20 : 28 }}
        >
          <h3 style={{ fontSize: "clamp(1.25rem, 3vw, 1.8rem)", fontWeight: 900, color: C.textPrimary, margin: 0, letterSpacing: "-0.03em", fontFamily: FONT }}>
            Our Team Structure
          </h3>
          <p style={{ color: C.textSecondary, fontSize: 13, margin: "6px 0 0" }}>
            {isCompact
              ? "Swipe to explore our three-tier leadership structure."
              : "Three-tier leadership ensuring physical design quality at every stage."}
          </p>
        </motion.div>

        {/* ── DESKTOP/TV: 3-col grid ── */}
        {!isCompact && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            {TEAM_ROLES.map((role, i) => (
              <RoleCard key={role.title} role={role} i={i} inView={inView} />
            ))}
          </div>
        )}

        {/* ── MOBILE/TABLET: carousel ── */}
{isCompact && (
  <div>
    {/* move global style here, OUTSIDE the scroll container */}
    <style>{`
      .wwa-carousel::-webkit-scrollbar { display: none; }
    `}</style>

    <div style={{ position: "relative" }}>
      {isTablet && (
        <>
          <button onClick={goPrev} /* ... unchanged ... */ >
            <ChevronLeft style={{ width: 18, height: 18, color: C.textPrimary }} />
          </button>
          <button onClick={goNext} /* ... unchanged ... */ >
            <ChevronRight style={{ width: 18, height: 18, color: C.textPrimary }} />
          </button>
        </>
      )}

      <div
        ref={carouselRef}
        onScroll={handleScroll}
        className="wwa-carousel"
        style={{
          display: "flex", gap: 12, alignItems: "stretch",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          paddingBottom: 4,
          paddingLeft: isMobile ? "8%" : 0,
          paddingRight: isMobile ? "8%" : 0,
        }}
      >
        {TEAM_ROLES.map((role, i) => (
          <RoleCardCompact
            key={role.title}
            role={role}
            isMobile={isMobile}
            isTablet={isTablet}
            open={!!openRoles[i]}
            onToggle={() => toggleRole(i)}
          />
        ))}
      </div>
    </div>

    <Dots count={TEAM_ROLES.length} active={active} onSelect={setActive} color={TEAM_ROLES[active]?.color} />
  </div>
)}

      </div>
    </section>
  );
}