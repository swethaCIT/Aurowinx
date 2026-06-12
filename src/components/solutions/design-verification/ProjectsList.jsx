// ProjectsList.jsx
// AurowinX Design Verification — Verified Projects
// Responsive: carousel on mobile/tablet | 4-col grid on laptop | 4-col on TV
// Filter tabs scroll horizontally on mobile

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence, useAnimation } from "framer-motion";
import { ChevronRight, ChevronLeft, Cpu, GitBranch, Layers, Zap, Radio, Shield, ArrowRight } from "lucide-react";
import { C, FONT, EASE } from "./theme";

const CATEGORIES = ["All", "AMBA", "Protocol", "IP Core", "Processor", "Memory"];

const PROJECTS = [
  { title: "AMBA-AXI Verification",         cat: "AMBA",     icon: <Layers style={{ width: 18, height: 18 }} />,    color: "#4f46e5", desc: "Full UVM testbench for AXI4 master/slave with outstanding transaction tracking and protocol compliance." },
  { title: "AMBA-Bridge Verification",      cat: "AMBA",     icon: <GitBranch style={{ width: 18, height: 18 }} />, color: "#7c3aed", desc: "AHB-to-APB bridge verification with constrained-random stimulus and functional coverage closure." },
  { title: "DDR Protocol Verification",     cat: "Protocol", icon: <Zap style={{ width: 18, height: 18 }} />,       color: "#0891b2", desc: "DDR4/LPDDR4 memory controller verification — timing, refresh, and command sequencing checks." },
  { title: "Ethernet Protocol Verification",cat: "Protocol", icon: <Radio style={{ width: 18, height: 18 }} />,     color: "#0284c7", desc: "10G/25G Ethernet MAC verification with frame integrity, flow control and error injection tests." },
  { title: "RTC IP Verification",           cat: "IP Core",  icon: <Shield style={{ width: 18, height: 18 }} />,   color: "#059669", desc: "Real-time clock IP functional verification including alarm, calendar and power-on reset scenarios." },
  { title: "RAM 4096 Verification",         cat: "Memory",   icon: <Cpu style={{ width: 18, height: 18 }} />,      color: "#d97706", desc: "4096-entry SRAM verification with March algorithms, retention tests and ECC error injection." },
  { title: "ARM Cortex-M0 Verification",    cat: "Processor",icon: <Cpu style={{ width: 18, height: 18 }} />,      color: "#dc2626", desc: "Cortex-M0 processor subsystem verification — instruction set, interrupt, bus matrix and debug." },
  { title: "I2C, GPIO, UART, SPI",          cat: "Protocol", icon: <Radio style={{ width: 18, height: 18 }} />,    color: "#7c3aed", desc: "Peripheral IP verification bundle — full protocol compliance, edge cases and back-to-back transfers." },
];

/* ── useBreakpoint ── */
function useBreakpoint() {
  const [bp, setBp] = useState("laptop");
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w <= 640)       setBp("mobile");
      else if (w <= 1024) setBp("tablet");
      else if (w >= 1600) setBp("tv");
      else                setBp("laptop");
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return bp;
}

/* ── Single project card ── */
function ProjectCard({ project, i, inView, alwaysVisible = false }) {
  const [hovered, setHovered] = useState(false);
  const shouldAnimate = alwaysVisible || inView;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -5 }}
      style={{
        background: "#fff", borderRadius: 16,
        padding: "20px 20px 18px",
        border: `1px solid ${hovered ? project.color + "40" : C.borderLight}`,
        boxShadow: hovered ? `0 12px 36px ${project.color}14` : C.shadowSm,
        cursor: "default", overflow: "hidden",
        position: "relative",
        height: "100%", boxSizing: "border-box",
        transition: "border 0.25s, box-shadow 0.25s",
        userSelect: "none",
      }}
    >
      {/* Left accent bar */}
      <motion.div
        animate={{ height: hovered ? "100%" : "40%" }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute", left: 0, top: 0,
          width: 3, background: project.color,
          borderRadius: "0 2px 2px 0",
        }}
      />

      {/* Icon + category */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: `${project.color}12`, color: project.color,
          border: `1px solid ${project.color}20`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {project.icon}
        </div>
        <span style={{
          padding: "3px 10px", borderRadius: 50,
          background: `${project.color}10`, color: project.color,
          fontSize: 10, fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase",
          border: `1px solid ${project.color}20`,
        }}>
          {project.cat}
        </span>
      </div>

      {/* Title */}
      <p style={{
        fontWeight: 800, fontSize: 14, color: C.textPrimary,
        margin: "0 0 7px", fontFamily: FONT, letterSpacing: "-0.02em",
      }}>
        {project.title}
      </p>

      {/* Desc */}
      <p style={{ fontSize: 12.5, color: C.textSecondary, lineHeight: 1.7, margin: "0 0 14px" }}>
        {project.desc}
      </p>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <motion.div
          animate={{ width: hovered ? 16 : 8 }}
          style={{ height: 2, background: project.color, borderRadius: 1 }}
        />
        <span style={{ fontSize: 11, color: project.color, fontWeight: 700, letterSpacing: "0.06em" }}>
          VIEW DETAILS
        </span>
        <ChevronRight style={{ width: 12, height: 12, color: project.color }} />
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   CAROUSEL  (mobile / tablet)
══════════════════════════════════════════ */
function Carousel({ items, inView, perView }) {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const controls = useAnimation();
  const trackRef = useRef(null);
  const total = items.length;
  const maxIndex = Math.max(0, total - perView);
  const GAP = 14;

  const [cardW, setCardW] = useState(280);
  useEffect(() => {
    function measure() {
      if (trackRef.current) {
        const tw = trackRef.current.offsetWidth;
        setCardW((tw - GAP * (perView - 1)) / perView);
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [perView]);

  /* clamp active when items list shrinks (filter change) */
  useEffect(() => {
    const clamped = Math.min(active, Math.max(0, items.length - perView));
    if (clamped !== active) {
      setActive(clamped);
      controls.start({
        x: -(clamped * (cardW + GAP)),
        transition: { type: "spring", stiffness: 320, damping: 36 },
      });
    }
  }, [items.length]);

  const goTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(idx, maxIndex));
    setActive(clamped);
    controls.start({
      x: -(clamped * (cardW + GAP)),
      transition: { type: "spring", stiffness: 320, damping: 36 },
    });
  }, [cardW, maxIndex, controls]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowLeft")  goTo(active - 1);
      if (e.key === "ArrowRight") goTo(active + 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goTo]);

  function onDragEnd(_, info) {
    const threshold = cardW * 0.22;
    if (info.offset.x < -threshold)     goTo(active + 1);
    else if (info.offset.x > threshold) goTo(active - 1);
    else                                goTo(active);
    setDragging(false);
  }

  const dots = Array.from({ length: maxIndex + 1 });

  if (total === 0) return (
    <p style={{ textAlign: "center", color: C.textMuted, fontSize: 13, padding: "32px 0" }}>
      No projects in this category yet.
    </p>
  );

  return (
    <div style={{ position: "relative" }}>
      <div ref={trackRef} style={{ overflow: "hidden", borderRadius: 12, padding: "4px 2px 12px" }}>
        <motion.div
          drag="x"
          dragConstraints={{ left: -(maxIndex * (cardW + GAP)), right: 0 }}
          dragElastic={0.12}
          dragMomentum={false}
          animate={controls}
          onDragStart={() => setDragging(true)}
          onDragEnd={onDragEnd}
          style={{
            display: "flex", gap: GAP,
            width: "max-content",
            cursor: dragging ? "grabbing" : "grab",
          }}
        >
          {items.map((project, i) => (
            <div
              key={project.title}
              style={{
                width: cardW, flexShrink: 0,
                transition: "opacity 0.3s, transform 0.3s",
                opacity: (i >= active && i < active + perView) ? 1 : 0.42,
                transform: (i >= active && i < active + perView) ? "scale(1)" : "scale(0.96)",
              }}
            >
              <ProjectCard project={project} i={0} inView={inView} alwaysVisible />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 4 }}>
        <motion.button
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
          style={{
            width: 38, height: 38, borderRadius: "50%",
            border: `1px solid ${C.border}`,
            background: active === 0 ? "#f8fafc" : "#fff",
            color: active === 0 ? C.textMuted : C.primary,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: active === 0 ? "not-allowed" : "pointer",
            boxShadow: C.shadowSm,
            opacity: active === 0 ? 0.45 : 1,
            transition: "opacity 0.2s",
          }}
        >
          <ChevronLeft style={{ width: 16, height: 16 }} />
        </motion.button>

        {/* Dots */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {dots.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              whileHover={{ scale: 1.3 }}
              animate={{
                width: active === i ? 22 : 7,
                background: active === i ? (items[i]?.color || C.primary) : "#cbd5e1",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              style={{
                height: 7, borderRadius: 50,
                border: "none", padding: 0,
                cursor: "pointer", flexShrink: 0,
              }}
            />
          ))}
        </div>

        <motion.button
          onClick={() => goTo(active + 1)}
          disabled={active === maxIndex}
          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
          style={{
            width: 38, height: 38, borderRadius: "50%",
            border: `1px solid ${C.border}`,
            background: active === maxIndex ? "#f8fafc" : "#fff",
            color: active === maxIndex ? C.textMuted : C.primary,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: active === maxIndex ? "not-allowed" : "pointer",
            boxShadow: C.shadowSm,
            opacity: active === maxIndex ? 0.45 : 1,
            transition: "opacity 0.2s",
          }}
        >
          <ChevronRight style={{ width: 16, height: 16 }} />
        </motion.button>
      </div>

      {/* Counter */}
      <p style={{
        textAlign: "center", marginTop: 10,
        fontSize: 11, color: C.textMuted,
        letterSpacing: "0.1em", fontFamily: FONT,
      }}>
        {active + 1} — {Math.min(active + perView, total)} of {total}
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════ */
export default function ProjectsList() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState("All");
  const bp = useBreakpoint();

  const isCarousel = bp === "mobile" || bp === "tablet";
  const perView = bp === "mobile" ? 1 : 2;
  const gridCols = bp === "tv" ? 4 : bp === "laptop" ? 4 : 2;

  const filtered = active === "All" ? PROJECTS : PROJECTS.filter(p => p.cat === active);

  const sectionPad = bp === "mobile"
    ? "64px 20px 52px"
    : bp === "tablet"
    ? "64px 32px 52px"
    : bp === "tv"
    ? "100px 80px 80px"
    : "64px 48px 56px";

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

      <div style={{ maxWidth: bp === "tv" ? 1600 : 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ marginBottom: 28 }}
        >
          <div style={{
            display: "flex",
            alignItems: bp === "mobile" ? "flex-start" : "flex-end",
            justifyContent: "space-between",
            flexDirection: bp === "mobile" ? "column" : "row",
            flexWrap: "wrap", gap: 16,
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, transparent, ${C.primary})` }} />
                <span style={{ color: C.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  Our Projects
                </span>
              </div>
              <h2 style={{
                fontSize: bp === "mobile" ? "clamp(1.6rem, 7vw, 2rem)" : "clamp(1.8rem, 3.5vw, 2.6rem)",
                fontWeight: 900, color: C.textPrimary,
                margin: "0 0 8px", letterSpacing: "-0.04em", fontFamily: FONT,
              }}>
                What We've Verified
              </h2>
              <p style={{ color: C.textSecondary, fontSize: bp === "mobile" ? 13 : 14, margin: 0, lineHeight: 1.7, maxWidth: 460 }}>
                A cross-section of protocols, IPs and processors our team has taken to sign-off.
              </p>
            </div>

            <motion.a
              href="/projects" whileHover={{ x: 4 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                color: C.primary, fontWeight: 700, fontSize: 13,
                textDecoration: "none", flexShrink: 0,
              }}
            >
              View All Projects <ArrowRight style={{ width: 15, height: 15 }} />
            </motion.a>
          </div>
        </motion.div>

        {/* ── Filter tabs — horizontal scroll on mobile ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
          style={{
            display: "flex", gap: 8,
            flexWrap: isCarousel ? "nowrap" : "wrap",
            overflowX: isCarousel ? "auto" : "visible",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
            marginBottom: 24,
            paddingBottom: isCarousel ? 4 : 0,
          }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: "7px 18px", borderRadius: 50,
                border: active === cat ? `1.5px solid ${C.primary}` : `1px solid ${C.borderLight}`,
                background: active === cat ? C.primary : "#fff",
                color: active === cat ? "#fff" : C.textSecondary,
                fontWeight: 700, fontSize: 12,
                cursor: "pointer", fontFamily: FONT,
                boxShadow: active === cat ? `0 4px 14px rgba(79,70,229,0.25)` : C.shadowSm,
                transition: "all 0.2s",
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Cards: carousel or grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
          >
            {isCarousel ? (
              <Carousel items={filtered} inView={inView} perView={perView} />
            ) : (
              <div style={{
                display: "grid",
                gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                gap: 16,
              }}>
                {filtered.length > 0 ? (
                  filtered.map((project, i) => (
                    <ProjectCard key={project.title} project={project} i={i} inView={inView} />
                  ))
                ) : (
                  <p style={{ gridColumn: "1 / -1", textAlign: "center", color: C.textMuted, fontSize: 13, padding: "32px 0" }}>
                    No projects in this category yet.
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom count — desktop only ── */}
        {!isCarousel && (
          <motion.div
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            style={{
              marginTop: 28, display: "flex", alignItems: "center",
              justifyContent: "center", gap: 10,
            }}
          >
            <div style={{ height: 1, flex: 1, maxWidth: 120, background: `linear-gradient(90deg, transparent, ${C.border})` }} />
            <span style={{ fontSize: 12, color: C.textMuted, fontWeight: 600 }}>
              Showing {filtered.length} of {PROJECTS.length} projects
            </span>
            <div style={{ height: 1, flex: 1, maxWidth: 120, background: `linear-gradient(90deg, ${C.border}, transparent)` }} />
          </motion.div>
        )}

      </div>
    </section>
  );
}