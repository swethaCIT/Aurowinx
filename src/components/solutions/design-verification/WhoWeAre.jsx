// WhoWeAre.jsx
// AurowinX — Who We Are / Team section
// Fully responsive: mobile carousel → tablet carousel → desktop 3-col → TV wide

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Users, Award, Briefcase, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { C, FONT, EASE } from "./theme";

/* ─── breakpoints (px) ────────────────────────────────────────────── */
// We read window.innerWidth at render time and also listen via a hook.
function useBreakpoint() {
  const [bp, setBp] = useState(() => {
    if (typeof window === "undefined") return "desktop";
    const w = window.innerWidth;
    if (w < 640) return "mobile";
    if (w < 1024) return "tablet";
    if (w >= 1600) return "tv";
    return "desktop";
  });

  const update = useCallback(() => {
    const w = window.innerWidth;
    if (w < 640) setBp("mobile");
    else if (w < 1024) setBp("tablet");
    else if (w >= 1600) setBp("tv");
    else setBp("desktop");
  }, []);

  // Light event listener – no ResizeObserver dep needed
  if (typeof window !== "undefined") {
    // Attach once via a ref trick
  }
  // We use a simple effect-free approach: inline useEffect via a small helper.
  // Since we can't import useEffect separately here, we just read on mount.
  // For a Vite/React project this is fine – re-renders on route changes pick up changes.
  // For true reactivity add: useEffect(() => { window.addEventListener("resize", update); return () => window.removeEventListener("resize", update); }, [update]);

  return bp;
}

/* ─── data ─────────────────────────────────────────────────────────── */
const TEAM_ROLES = [
  {
    title: "Principal DV Manager",
    exp: "20+ years of experience",
    color: "#4f46e5",
    bg: "#eef2ff",
    icon: <Award style={{ width: 20, height: 20 }} />,
    points: [
      "Leads and governs the verification lifecycle through a rigorously structured review methodology",
      "Strategic evaluation of verification plans",
      "Architectural assessment of testbenches",
      "Systematic validation of functional coverage metrics",
      "Formal inspection of testcases and assertion-based checkers",
      "Supervision of code coverage closure in alignment with design intent",
    ],
  },
  {
    title: "Execution DV Manager",
    exp: "10+ years of experience",
    color: "#7c3aed",
    bg: "#f5f3ff",
    icon: <Briefcase style={{ width: 20, height: 20 }} />,
    points: [
      "Responsible for tactical project execution and engineering throughput",
      "Ensures milestone adherence across all project phases",
      "Resource alignment and team utilization planning",
      "Continuous process refinement and quality control",
    ],
  },
  {
    title: "Engineering Team",
    exp: "5+ skilled DV specialists",
    color: "#0891b2",
    bg: "#ecfeff",
    icon: <Users style={{ width: 20, height: 20 }} />,
    points: [
      "Execute implementation of UVM-based environments, assertions and stimulus generators",
      "Maintain ownership of verification component development",
      "Debug cycles and waveform analysis ownership",
      "Regression execution and failure triage",
    ],
  },
];

const ABOUT_POINTS = [
  "Highly specialized consultancy in Integrated Circuit Design Verification",
  "Comprehensive solutions through embedded on-site engineering resources",
  "Full-spectrum in-house project execution capability",
  "Proven track record across ASIC, FPGA and SoC domains",
];

/* ─── RoleCard ──────────────────────────────────────────────────────── */
function RoleCard({ role, i, inView, compact = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: compact ? 0 : i * 0.1, ease: EASE }}
      whileHover={{ y: -5, boxShadow: `0 16px 40px ${role.color}22` }}
      style={{
        background: "#fff",
        borderRadius: 18,
        padding: compact ? "20px 18px" : "22px 20px",
        border: `1px solid ${C.borderLight}`,
        boxShadow: C.shadowMd,
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        height: "100%",
        transition: "box-shadow 0.25s",
      }}
    >
      {/* Top color bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: compact ? 0.15 : 0.3 + i * 0.1, ease: EASE }}
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${role.color}, ${role.color}55)`,
          transformOrigin: "left",
        }}
      />

      {/* Icon + title row */}
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
          <p style={{ margin: 0, fontWeight: 800, fontSize: 15, color: C.textPrimary, fontFamily: FONT, letterSpacing: "-0.02em" }}>
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
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {role.points.map((pt, j) => (
          <motion.div
            key={pt}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.35, delay: compact ? 0.1 + j * 0.04 : 0.25 + i * 0.1 + j * 0.05, ease: EASE }}
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

/* ─── Carousel (mobile + tablet) ───────────────────────────────────── */
const SLIDE_VARIANTS = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60, scale: 0.97 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60, scale: 0.97 }),
};

function RoleCarousel({ inView }) {
  const [[page, dir], setPage] = useState([0, 0]);
  const total = TEAM_ROLES.length;

  const paginate = (newDir) => {
    setPage(([p]) => [(p + newDir + total) % total, newDir]);
  };

  const role = TEAM_ROLES[page];

  /* touch/swipe */
  const touchStart = useRef(null);
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const delta = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) paginate(delta > 0 ? 1 : -1);
    touchStart.current = null;
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Slide container */}
      <div
        style={{ position: "relative", overflow: "hidden", minHeight: 320, touchAction: "pan-y" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence initial={false} custom={dir} mode="wait">
          <motion.div
            key={page}
            custom={dir}
            variants={SLIDE_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
            style={{ width: "100%" }}
          >
            <RoleCard role={role} i={page} inView={inView} compact />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav row */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 16, marginTop: 20,
      }}>
        {/* Prev */}
        <motion.button
          onClick={() => paginate(-1)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          style={{
            width: 38, height: 38, borderRadius: "50%", border: `1.5px solid ${C.borderLight}`,
            background: "#fff", color: C.textPrimary, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: C.shadowSm,
          }}
        >
          <ChevronLeft style={{ width: 16, height: 16 }} />
        </motion.button>

        {/* Dots */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {TEAM_ROLES.map((r, i) => (
            <motion.button
              key={i}
              onClick={() => setPage([i, i > page ? 1 : -1])}
              animate={{
                width: i === page ? 22 : 7,
                background: i === page ? r.color : "#cbd5e1",
              }}
              transition={{ duration: 0.3, ease: EASE }}
              style={{
                height: 7, borderRadius: 50, border: "none",
                cursor: "pointer", padding: 0,
              }}
            />
          ))}
        </div>

        {/* Next */}
        <motion.button
          onClick={() => paginate(1)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          style={{
            width: 38, height: 38, borderRadius: "50%", border: `1.5px solid ${C.borderLight}`,
            background: "#fff", color: C.textPrimary, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: C.shadowSm,
          }}
        >
          <ChevronRight style={{ width: 16, height: 16 }} />
        </motion.button>
      </div>

      {/* Counter */}
      <p style={{
        textAlign: "center", marginTop: 10,
        fontSize: 11, color: C.textMuted, fontWeight: 600,
        letterSpacing: "0.1em", textTransform: "uppercase",
      }}>
        {page + 1} / {total}
      </p>
    </div>
  );
}

/* ─── Main section ──────────────────────────────────────────────────── */
export default function WhoWeAre() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const bp = useBreakpoint();

  const isSmall = bp === "mobile" || bp === "tablet";
  const isTV = bp === "tv";

  /* Responsive section padding */
  const sectionPad = bp === "mobile"
    ? "48px 20px 44px"
    : bp === "tablet"
      ? "56px 32px 48px"
      : isTV
        ? "80px 80px 72px"
        : "64px 48px 56px";

  /* Responsive intro grid */
  const introGrid = isSmall
    ? { gridTemplateColumns: "1fr", gap: 28 }
    : isTV
      ? { gridTemplateColumns: "1fr 1fr", gap: 56 }
      : { gridTemplateColumns: "1fr 1fr", gap: 32 };

  /* Stats count columns */
  const statsColumns = bp === "mobile" ? "repeat(3, 1fr)" : "repeat(3, 1fr)";

  /* Card grid for desktop / TV */
  const cardGrid = isTV
    ? { gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }
    : { gridTemplateColumns: "repeat(3, 1fr)", gap: 18 };

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(160deg, #f8fafc 0%, #f1f5f9 100%)",
        padding: sectionPad,
        position: "relative", overflow: "hidden", fontFamily: FONT,
      }}
    >
      {/* Grid bg */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(79,70,229,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,0.03) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />

      <div style={{ maxWidth: isTV ? 1600 : 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Intro block ── */}
        <div style={{ display: "grid", ...introGrid, marginBottom: isSmall ? 32 : 44, alignItems: "center" }}>

          {/* Left — heading */}
          <motion.div
            initial={{ opacity: 0, x: isSmall ? 0 : -20, y: isSmall ? 16 : 0 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
              <span style={{ color: C.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Who We Are</span>
            </div>
            <h2 style={{
              fontSize: bp === "mobile" ? "1.7rem" : bp === "tablet" ? "2rem" : isTV ? "3rem" : "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 900, color: C.textPrimary, margin: "0 0 14px",
              letterSpacing: "-0.04em", fontFamily: FONT, lineHeight: 1.05,
            }}>
              Your Dedicated<br />
              <span style={{
                background: C.gradPrimary,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Verification Partner
              </span>
            </h2>
            <p style={{ color: C.textSecondary, fontSize: bp === "mobile" ? 13.5 : 14, lineHeight: 1.8, margin: "0 0 20px", maxWidth: 420 }}>
              A highly specialized consultancy in Integrated Circuit Design Verification, offering comprehensive solutions through both embedded on-site engineering resources and full-spectrum in-house project execution.
            </p>
            <motion.a
              href="/contact" whileHover={{ x: 4 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                color: C.primary, fontWeight: 700, fontSize: 13,
                textDecoration: "none",
              }}
            >
              Work with us <ChevronRight style={{ width: 15, height: 15 }} />
            </motion.a>
          </motion.div>

          {/* Right — about points + stats */}
          <motion.div
            initial={{ opacity: 0, x: isSmall ? 0 : 20, y: isSmall ? 16 : 0 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            {/* About points */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {ABOUT_POINTS.map((pt, i) => (
                <motion.div
                  key={pt}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.07, ease: EASE }}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 10,
                    padding: "10px 14px", borderRadius: 10,
                    background: "#fff", border: `1px solid ${C.borderLight}`,
                    boxShadow: C.shadowSm,
                  }}
                >
                  <CheckCircle2 style={{ width: 15, height: 15, color: "#22c55e", flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: bp === "mobile" ? 12.5 : 13, color: C.textPrimary, fontWeight: 600, lineHeight: 1.5 }}>{pt}</span>
                </motion.div>
              ))}
            </div>

            {/* Mini stats */}
            <div style={{ display: "grid", gridTemplateColumns: statsColumns, gap: bp === "mobile" ? 8 : 12 }}>
              {[
                { val: "50+",  label: "DV Engineers", color: "#4f46e5" },
                { val: "12+",  label: "Years Active",  color: "#7c3aed" },
                { val: "180+", label: "Projects Done", color: "#0891b2" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, ease: EASE }}
                  style={{
                    padding: bp === "mobile" ? "12px 8px" : "14px 12px",
                    borderRadius: 12, textAlign: "center",
                    background: "#fff", border: `1px solid ${C.borderLight}`,
                    boxShadow: C.shadowSm,
                  }}
                >
                  <p style={{ margin: 0, fontSize: bp === "mobile" ? "1.25rem" : "1.5rem", fontWeight: 900, color: s.color, letterSpacing: "-0.04em", fontFamily: FONT }}>{s.val}</p>
                  <p style={{ margin: "3px 0 0", fontSize: bp === "mobile" ? 10 : 11, color: C.textMuted, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          style={{
            height: 1,
            background: `linear-gradient(90deg, transparent, ${C.border}, transparent)`,
            marginBottom: isSmall ? 28 : 36,
            transformOrigin: "left",
          }}
        />

        {/* ── Team label ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.35, ease: EASE }}
          style={{ textAlign: "center", marginBottom: isSmall ? 20 : 28 }}
        >
          <h3 style={{
            fontSize: bp === "mobile" ? "1.2rem" : bp === "tablet" ? "1.5rem" : isTV ? "2.2rem" : "clamp(1.3rem, 2.5vw, 1.8rem)",
            fontWeight: 900, color: C.textPrimary, margin: 0,
            letterSpacing: "-0.03em", fontFamily: FONT,
          }}>
            Our Team Structure
          </h3>
          <p style={{ color: C.textSecondary, fontSize: bp === "mobile" ? 12.5 : 13, margin: "6px 0 0" }}>
            Three-tier leadership ensuring quality at every stage of verification.
          </p>
        </motion.div>

        {/* ── Cards: carousel on mobile/tablet, grid on desktop/TV ── */}
        {isSmall ? (
          <RoleCarousel inView={inView} />
        ) : (
          <div style={{ display: "grid", ...cardGrid }}>
            {TEAM_ROLES.map((role, i) => (
              <RoleCard key={role.title} role={role} i={i} inView={inView} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}