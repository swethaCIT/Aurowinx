// src/components/home/ProductShowcase.jsx
// Dependencies: framer-motion
// Fonts: Add to index.html or global CSS:
// <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@1,700&display=swap" rel="stylesheet">

import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */
const PRODUCTS = [
  {
    id: "ev",
    num: "01",
    title: "EV Charging Solutions",
    subtitle: "Powering the Future of Mobility",
    c1: "#16a34a",
    c2: "#059669",
    pale: "#f0fdf4",
    soft: "rgba(22,163,74,.08)",
    border: "rgba(22,163,74,.22)",
    text: "#15803d",
    img: "https://images.unsplash.com/photo-1703860271509-b50f5679f2a0?w=800&q=85&fit=crop",
    feats: [
  { icon: "⚡", label: "AC & DC Charger Development" },
  { icon: "🧠", label: "Smart Charging Control" },
  { icon: "📡", label: "OCPP Communication" },
  { icon: "🛡", label: "Safety & Diagnostics" },
],
badges: ["Advanced Power Conversion", "Smart Connectivity", "Safety Protection"],
  },
  {
    id: "bldc",
    num: "02",
    title: "BLDC Fan Solutions",
    subtitle: "Smart · Efficient · Reliable",
    c1: "#2563eb",
    c2: "#0891b2",
    pale: "#eff6ff",
    soft: "rgba(37,99,235,.08)",
    border: "rgba(37,99,235,.22)",
    text: "#1d4ed8",
    img: "/images/BLDC.jpg",
    feats: [
  { icon: "🔄", label: "Sensorless FOC Control" },
  { icon: "⚡", label: "High Efficiency BLDC Drive" },
  { icon: "📡", label: "IoT Enabled Monitoring" },
  { icon: "🛡", label: "Compact Silent Design" },
],
badges: ["Precise Speed Control", "Silent Operation", "Energy Savings"],
  },
  {
    id: "solar",
    num: "03",
    title: "Solar Inverter Solutions",
    subtitle: "Harness Solar. Power the World.",
    c1: "#ea580c",
    c2: "#d97706",
    pale: "#fff7ed",
    soft: "rgba(234,88,12,.08)",
    border: "rgba(234,88,12,.22)",
    text: "#c2410c",
    img: "/images/SolarInvertor.jpg",
    feats: [
  { icon: "🔌", label: "Grid-Tied & Off-Grid" },
  { icon: "📈", label: "MPPT Based Control" },
  { icon: "📊", label: "Real-time Monitoring" },
  { icon: "🛡", label: "Robust & Future Ready" },
],
badges: ["Maximum Energy Harvest", "Smart Monitoring", "Uninterrupted Power"],
  },
];

/* ══════════════════════════════════════════════════════════════
   PARTICLE BACKGROUND
══════════════════════════════════════════════════════════════ */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    let animId = null;
    let pts = [];
    const COLS = [
      "rgba(22,163,74,",
      "rgba(37,99,235,",
      "rgba(234,88,12,",
      "rgba(148,163,184,",
    ];

    const resize = () => {
      cv.width  = cv.offsetWidth;
      cv.height = cv.offsetHeight;
      init();
    };

    const init = () => {
      pts = Array.from({ length: 70 }, (_, i) => ({
        x:  Math.random() * cv.width,
        y:  Math.random() * cv.height,
        r:  Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        c:  COLS[i % COLS.length],
        a:  Math.random() * 0.3 + 0.1,
        p:  Math.random() * Math.PI * 2,
        ps: Math.random() * 0.02 + 0.01,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);

      // connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(148,163,184,${0.06 * (1 - d / 100)})`;
            ctx.lineWidth   = 0.6;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      // dots
      pts.forEach((p) => {
        p.p += p.ps;
        const alpha = p.a * (0.6 + 0.4 * Math.sin(p.p));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c + alpha + ")";
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0)        p.x = cv.width;
        if (p.x > cv.width) p.x = 0;
        if (p.y < 0)        p.y = cv.height;
        if (p.y > cv.height) p.y = 0;
      });

      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    // Pause while scrolled off-screen — otherwise this keeps redrawing 70
    // points and their pairwise connections every frame long after the user
    // has scrolled past the section, adding to scroll-time main-thread load.
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      const nowVisible = entry.isIntersecting;
      if (nowVisible && !visible) { visible = true; if (animId === null) draw(); }
      else if (!nowVisible && visible) { visible = false; if (animId !== null) { cancelAnimationFrame(animId); animId = null; } }
    }, { threshold: 0 });
    io.observe(cv);

    return () => {
      if (animId !== null) cancelAnimationFrame(animId);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}

/* ══════════════════════════════════════════════════════════════
   PRODUCT CARD
══════════════════════════════════════════════════════════════ */
function ProductCard({ p, index, inView }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95, rotateX: 5 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.55 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -12, scale: 1.02 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 28,
        border: `1px solid ${hovered ? "transparent" : "#e8edf3"}`,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        boxShadow: hovered
          ? "0 32px 72px -12px rgba(15,23,42,.15)"
          : "0 2px 12px rgba(15,23,42,.05)",
        transition: "box-shadow 0.4s ease, border-color 0.3s ease",
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      {/* Glow on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 50% -20%, ${p.c1}15, transparent 60%)`,
          pointerEvents: "none", zIndex: 10,
        }}
      />

      {/* ── PHOTO ZONE ── */}
      <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
        <motion.img
          src={p.img}
          alt={p.title}
          animate={{ scale: hovered ? 1.08 : 1, y: hovered ? 5 : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1717444308866-dcfc964bab23?w=800&q=80&fit=crop";
          }}
        />

        {/* color tint */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: p.c1,
            mixBlendMode: "multiply",
            opacity: 0.22,
            zIndex: 1,
          }}
        />

        {/* gradient overlay */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,.58) 100%)",
            zIndex: 2,
          }}
        />

        {/* number badge */}
        <div
          style={{
            position: "absolute", top: 14, left: 14, zIndex: 10,
            width: 36, height: 36, borderRadius: 11,
            background: `linear-gradient(135deg,${p.c1},${p.c2})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 900, color: "#fff",
          }}
        >
          {p.num}
        </div>

        {/* title on photo */}
        <div style={{ position: "absolute", bottom: 16, left: 16, zIndex: 10 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.1, textShadow: "0 2px 10px rgba(0,0,0,.4)" }}>
            {p.title}
          </h3>
          <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,.75)", letterSpacing: ".06em", textTransform: "uppercase", marginTop: 2 }}>
            {p.subtitle}
          </p>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ padding: "22px 24px 24px" }}>

        {/* features grid — 1 col on narrow screens */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))", gap: 7, marginBottom: 18 }}>
          {p.feats.map((f) => (
            <div
              key={f.label}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "8px 10px", borderRadius: 10,
                background: p.pale,
                fontSize: "clamp(10px, 2.8vw, 11.5px)", fontWeight: 500, color: "#1e293b",
                minWidth: 0,
              }}
            >
              <div
                style={{
                  width: 20, height: 20, borderRadius: 6,
                  background: p.soft,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, flexShrink: 0,
                }}
              >
                {f.icon}
              </div>
              {f.label}
            </div>
          ))}
        </div>

        {/* badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
          {p.badges.map((b) => (
            <span
              key={b}
              style={{
                padding: "5px 12px", borderRadius: 100,
                fontSize: 10.5, fontWeight: 700, letterSpacing: ".04em",
                background: p.soft,
                border: `1.5px solid ${p.border}`,
                color: p.text,
              }}
            >
              {b}
            </span>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02, filter: "brightness(1.07)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/products#electronics-dev")}
          style={{
            width: "100%", padding: "14px 20px", borderRadius: 16,
            fontSize: 13, fontWeight: 700, color: "#fff",
            border: "none", cursor: "pointer",
            background: `linear-gradient(135deg,${p.c1},${p.c2})`,
            boxShadow: `0 8px 24px ${p.c1}35`,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            fontFamily: "Outfit, sans-serif",
            letterSpacing: ".02em",
            position: "relative", overflow: "hidden",
          }}
        >
          View Product Details
          <motion.div
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.25 }}
            style={{
              width: 24, height: 24, borderRadius: 8,
              background: "rgba(255,255,255,.22)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MOBILE PRODUCT CAROUSEL
══════════════════════════════════════════════════════════════ */
function MobileProductCarousel({ inView }) {
  const [index, setIndex] = useState(0);
  const total = PRODUCTS.length;

  return (
    <div style={{ marginBottom: 32 }}>
      {/* Drag track */}
      <div style={{ overflow: "hidden", touchAction: "pan-y" }}>
        <motion.div
          drag="x"
          dragConstraints={{ left: -(total - 1) * 100 + "%", right: "0%" }}
          style={{ display: "flex", width: `${total * 100}%`, cursor: "grab" }}
          animate={{ x: `-${index * (100 / total)}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 35 }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50 && index < total - 1) setIndex(index + 1);
            else if (info.offset.x > 50 && index > 0) setIndex(index - 1);
          }}
        >
          {PRODUCTS.map((p, i) => (
            <div key={p.id} style={{ width: `${100 / total}%`, flexShrink: 0, padding: "0 6px" }}>
              <ProductCard p={p} index={i} inView={inView} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dot indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 18 }}>
        {PRODUCTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to product ${i + 1}`}
            style={{
              width: i === index ? 22 : 7, height: 7, borderRadius: 100, border: "none",
              background: i === index ? "#0f172a" : "#e2e8f0", cursor: "pointer",
              transition: "width 0.3s ease, background 0.3s ease", padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════ */
export default function ProductShowcase() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="products"
      style={{
        position: "relative",
        background: "linear-gradient(170deg,#f8fafc 0%,#ffffff 45%,#f0fdf4 100%)",
        padding: "clamp(3rem, 8vw, 5rem) 0 clamp(4rem, 10vw, 6.25rem)",
        overflow: "hidden",
        fontFamily: "'Outfit', sans-serif",
      }}
    >

      {/* ── ANIMATED BACKGROUND ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
        <ParticleCanvas />

        {/* moving gradient mesh */}
        <motion.div
          style={{
            position: "absolute", inset: "-50%",
            width: "200%", height: "200%",
            background: `
              radial-gradient(ellipse 40% 30% at 20% 20%, rgba(22,163,74,.09) 0%, transparent 60%),
              radial-gradient(ellipse 35% 35% at 80% 15%, rgba(37,99,235,.07) 0%, transparent 60%),
              radial-gradient(ellipse 30% 40% at 70% 80%, rgba(234,88,12,.07) 0%, transparent 60%),
              radial-gradient(ellipse 50% 25% at 10% 70%, rgba(22,163,74,.05) 0%, transparent 60%)
            `,
          }}
          animate={{ x: [0, "2%", "-2%", "1%", 0], y: [0, "3%", "-2%", "-3%", 0], scale: [1, 1.03, 0.98, 1.02, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* grid lines */}
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage:
              "linear-gradient(rgba(37,99,235,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            animation: "gridPan 25s linear infinite",
          }}
        />

        {/* ambient orbs */}
        {[
          { w: 500, top: "-100px", left: "-100px", bg: "rgba(22,163,74,.12)", dur: 14 },
          { w: 420, bottom: "-80px", right: "-60px", bg: "rgba(37,99,235,.1)", dur: 17 },
          { w: 300, top: "40%", right: "15%", bg: "rgba(234,88,12,.08)", dur: 20 },
        ].map((o, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute", borderRadius: "50%",
              filter: "blur(80px)", willChange: "transform", opacity: 0.6,
              width: o.w, height: o.w,
              top: o.top, bottom: o.bottom,
              left: o.left, right: o.right,
              background: `radial-gradient(circle,${o.bg},transparent 70%)`,
            }}
            animate={{ y: [0, -40, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: o.dur, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
          />
        ))}
      </div>

      <style>{`
        @keyframes gridPan { from { background-position: 0 0; } to { background-position: 64px 64px; } }
        @keyframes blink    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
        @keyframes gradShift{ 0%{background-position:0%} 100%{background-position:200%} }
        @media (min-width: 1280px) {
          .product-showcase-inner { max-width: 90rem; }
        }
      `}</style>

      <div className="product-showcase-inner" style={{ position: "relative", zIndex: 10, maxWidth: "min(1140px, 100%)", margin: "0 auto", padding: "0 clamp(1rem, 4vw, 1.75rem)" }}>

        {/* ── HEADER ── */}
        <motion.div
          style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "clamp(2.5rem, 6vw, 4rem)" }}
          initial={{ opacity: 0, y: 35, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {/* eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 16px", borderRadius: 100,
              background: "#fff", border: "1px solid #e2e8f0",
              fontSize: 11, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "#64748b",
              marginBottom: 20, boxShadow: "0 2px 8px rgba(0,0,0,.05)",
            }}
          >
            <span
              style={{
                width: 7, height: 7, borderRadius: "50%", background: "#16a34a",
                animation: "blink 2s ease-in-out infinite",
                display: "inline-block",
              }}
            />
            Electronics Products
          </motion.div>

          <h2
            style={{
              fontSize: "clamp(2.6rem,4.5vw,3.8rem)",
              fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.0,
              color: "#0f172a", marginBottom: 16,
            }}
          >
            Intelligent Products.{" "}
            <span
              style={{
                fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 700,
                background: "linear-gradient(120deg,#16a34a,#2563eb,#ea580c)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                backgroundSize: "200%",
                animation: "gradShift 5s ease infinite",
              }}
            >
              Real-World Impact.
            </span>
          </h2>

          <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.75, maxWidth: 520 }}>
            From EV charging infrastructure to BLDC motor control, solar energy systems,
            and battery management — precision-engineered, end-to-end power electronics.
          </p>
        </motion.div>

        {/* ── PRODUCT CARDS: mobile/tablet carousel, desktop grid ── */}

        {/* Mobile / tablet */}
        <div className="block lg:hidden">
          <MobileProductCarousel inView={inView} />
        </div>

        {/* Desktop grid */}
        <div
          className="hidden lg:grid"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            marginBottom: 32,
          }}
        >
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} p={p} index={i} inView={inView} />
          ))}
        </div>

      </div>

      {/* bottom separator */}
      <div style={{ height: 1, background: "linear-gradient(90deg,transparent,#e2e8f0,transparent)", marginTop: 0 }} />
    </section>
  );
}