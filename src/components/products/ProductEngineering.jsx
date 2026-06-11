// src/components/products/ProductEngineering.jsx
// ─────────────────────────────────────────────────────────────────
// Section 1 — Product Engineering
// Design: Cinematic split — Three.js animated PCB particle field
// on the right, rich content reveal on the left. Dark slate base
// with electric sky-blue accent. Coming Soon badge prominent.
// Mobile/Tablet: stacked with horizontal feature carousel.
// ─────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import {
  ArrowRight, Cpu, Layers, Zap, Shield,
  PackageCheck, ChevronLeft, ChevronRight,
} from "lucide-react";

/* ── TOKENS ── */
const FONT   = "'Inter', 'Sora', sans-serif";
const EASE   = [0.22, 1, 0.36, 1];
const ACCENT = "#0ea5e9";   // sky-500
const GLOW   = "rgba(14,165,233,0.35)";
const GRAD   = "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)";

/* ── FEATURE DATA ── */
const FEATURES = [
  {
    icon: Layers,
    title: "System Architecture",
    body: "Full hardware stack design from concept — block diagrams, BOM strategy, and architecture reviews before a single component is sourced.",
  },
  {
    icon: Cpu,
    title: "EVT / DVT / PVT Cycles",
    body: "Structured validation cycles that catch failures early — engineering, design, and production verification tightly managed.",
  },
  {
    icon: Zap,
    title: "Rapid Prototyping",
    body: "From sketch to functional prototype in weeks, not months. In-house fabrication pipeline cuts iteration time drastically.",
  },
  {
    icon: Shield,
    title: "Compliance & Certification",
    body: "CE, FCC, BIS readiness baked in from day one — not bolted on at the end. Reduces re-spin risk significantly.",
  },
  {
    icon: PackageCheck,
    title: "Mass Production Readiness",
    body: "DFM analysis, supplier qualification, and yield optimisation ensuring seamless transition from proto to high-volume manufacturing.",
  },
];

/* ══════════════════════════════════════════════════
   THREE.JS CANVAS — floating PCB / circuit particle
══════════════════════════════════════════════════ */
function PCBCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth;
    const H = el.clientHeight;

    /* Scene */
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    /* ── PARTICLE GRID — PCB trace feel ── */
    const COUNT  = 1800;
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);
    const sizes     = new Float32Array(COUNT);

    const c1 = new THREE.Color(ACCENT);
    const c2 = new THREE.Color("#2563eb");
    const c3 = new THREE.Color("#ffffff");

    for (let i = 0; i < COUNT; i++) {
      // Distribute on a slight curved plane
      positions[i * 3]     = (Math.random() - 0.5) * 9;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;

      const t   = Math.random();
      const col = t < 0.5 ? c1.clone().lerp(c2, t * 2)
                           : c2.clone().lerp(c3, (t - 0.5) * 2);
      colors[i * 3]     = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      sizes[i] = Math.random() * 3 + 1;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size",     new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    /* ── CONNECTING LINES — trace network ── */
    const lineMat = new THREE.LineBasicMaterial({
      color: ACCENT,
      transparent: true,
      opacity: 0.08,
    });

    for (let i = 0; i < 60; i++) {
      const lineGeo = new THREE.BufferGeometry();
      const x1 = (Math.random() - 0.5) * 8;
      const y1 = (Math.random() - 0.5) * 8;
      const x2 = x1 + (Math.random() - 0.5) * 2;
      const y2 = y1 + (Math.random() - 0.5) * 2;
      lineGeo.setAttribute("position", new THREE.BufferAttribute(
        new Float32Array([x1, y1, 0, x2, y2, 0]), 3
      ));
      scene.add(new THREE.Line(lineGeo, lineMat));
    }

    /* ── GLOWING CORE SPHERE ── */
    const sphereGeo = new THREE.SphereGeometry(0.55, 32, 32);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: ACCENT,
      transparent: true,
      opacity: 0.12,
      wireframe: true,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    const outerGeo = new THREE.SphereGeometry(0.9, 16, 16);
    const outerMat = new THREE.MeshBasicMaterial({
      color: "#2563eb",
      transparent: true,
      opacity: 0.05,
      wireframe: true,
    });
    const outer = new THREE.Mesh(outerGeo, outerMat);
    scene.add(outer);

    /* ── ANIMATION LOOP ── */
    let frame;
    let t = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      t += 0.004;

      points.rotation.y = t * 0.12;
      points.rotation.x = Math.sin(t * 0.3) * 0.08;

      sphere.rotation.y = t * 0.6;
      sphere.rotation.x = t * 0.3;
      outer.rotation.y  = -t * 0.4;
      outer.rotation.z  = t * 0.2;

      // Pulse opacity
      mat.opacity = 0.6 + Math.sin(t * 1.2) * 0.15;

      renderer.render(scene, camera);
    };
    animate();

    /* ── RESIZE ── */
    const onResize = () => {
      const W2 = el.clientWidth;
      const H2 = el.clientHeight;
      camera.aspect = W2 / H2;
      camera.updateProjectionMatrix();
      renderer.setSize(W2, H2);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
    />
  );
}

/* ══════════════════════════════════════════════════
   FEATURE CAROUSEL — mobile / tablet
══════════════════════════════════════════════════ */
function FeatureCarousel() {
  const [idx, setIdx] = useState(0);
  const total = FEATURES.length;

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  const item = FEATURES[idx];
  const Icon = item.icon;

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35, ease: EASE }}
          style={{
            background: "rgba(14,165,233,0.07)",
            border: "1px solid rgba(14,165,233,0.18)",
            borderRadius: 20,
            padding: "28px 24px",
          }}
        >
          <div style={{
            width: 44, height: 44,
            borderRadius: 12,
            background: "rgba(14,165,233,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 16,
            boxShadow: `0 0 20px ${GLOW}`,
          }}>
            <Icon style={{ width: 20, height: 20, color: ACCENT }} strokeWidth={1.8} />
          </div>
          <h4 style={{
            margin: "0 0 10px",
            fontSize: 17,
            fontWeight: 700,
            color: "#fff",
            fontFamily: FONT,
          }}>
            {item.title}
          </h4>
          <p style={{
            margin: 0,
            fontSize: 14,
            lineHeight: 1.75,
            color: "rgba(203,213,225,0.70)",
            fontFamily: FONT,
          }}>
            {item.body}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20,
      }}>
        {/* Dots */}
        <div style={{ display: "flex", gap: 6 }}>
          {FEATURES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              style={{
                width: i === idx ? 20 : 6,
                height: 6,
                borderRadius: 3,
                border: "none",
                cursor: "pointer",
                background: i === idx ? ACCENT : "rgba(255,255,255,0.18)",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
        {/* Arrows */}
        <div style={{ display: "flex", gap: 8 }}>
          {[{ icon: ChevronLeft, fn: prev }, { icon: ChevronRight, fn: next }].map(({ icon: Ic, fn }, i) => (
            <button
              key={i}
              onClick={fn}
              style={{
                width: 36, height: 36,
                borderRadius: "50%",
                border: "1px solid rgba(14,165,233,0.30)",
                background: "rgba(14,165,233,0.08)",
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: ACCENT,
              }}
            >
              <Ic style={{ width: 16, height: 16 }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════ */
export default function ProductEngineering() {
  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-80px" });

  /* Parallax tilt on desktop */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(my, { stiffness: 80, damping: 18 });
  const ry = useSpring(mx, { stiffness: 80, damping: 18 });

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    mx.set(((e.clientX - cx) / rect.width)  *  8);
    my.set(((e.clientY - cy) / rect.height) * -8);
  };
  const handleMouseLeave = () => { mx.set(0); my.set(0); };

  return (
    <section
      id="product-engineering"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "linear-gradient(160deg, #020817 0%, #050d1f 50%, #030a18 100%)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        fontFamily: FONT,
      }}
    >

      {/* ── BG GRID ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "radial-gradient(circle, rgba(14,165,233,0.04) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      {/* ── AMBIENT GLOW ── */}
      <div style={{
        position: "absolute", top: "20%", left: "48%",
        width: "45vw", height: "45vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(14,165,233,0.10) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* ══ INNER LAYOUT ══ */}
      <div
        className="pe-inner"
        style={{
          position: "relative", zIndex: 1,
          width: "100%", maxWidth: 1280,
          margin: "0 auto",
          padding: "100px 48px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
        }}
      >

        {/* ══ LEFT — CONTENT ══ */}
        <div>

          {/* Coming Soon badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 16px", borderRadius: 50, marginBottom: 28,
              border: "1.5px solid rgba(14,165,233,0.35)",
              background: "rgba(14,165,233,0.08)",
              backdropFilter: "blur(10px)",
            }}
          >
            <motion.span
              animate={{ scale: [1, 1.7, 1], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              style={{
                width: 7, height: 7, borderRadius: "50%",
                background: ACCENT, display: "inline-block",
              }}
            />
            <span style={{
              color: "#7dd3fc", fontSize: 11, fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
            }}>
              Coming Soon — AUROWINX
            </span>
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
            style={{
              margin: "0 0 12px",
              fontSize: 11, fontWeight: 700,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: "rgba(14,165,233,0.65)",
              display: "flex", alignItems: "center", gap: 10,
            }}
          >
            <span style={{ width: 28, height: 1, background: ACCENT, opacity: 0.5 }} />
            Product Engineering
          </motion.p>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.14, ease: EASE }}
            style={{
              margin: "0 0 20px",
              fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
              fontWeight: 900, lineHeight: 1.0,
              letterSpacing: "-0.04em",
              color: "#fff",
            }}
          >
            Concept to
            <br />
            <span style={{
              background: GRAD,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Production.
            </span>
          </motion.h2>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.22 }}
            style={{
              margin: "0 0 40px",
              fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
              lineHeight: 1.85,
              color: "rgba(203,213,225,0.72)",
              maxWidth: 480,
            }}
          >
            End-to-end hardware product lifecycle management — from the first
            block diagram to mass-production handoff. AUROWINX handles
            architecture, prototyping, validation cycles, and manufacturing
            readiness so your product ships right, the first time.
          </motion.p>

          {/* Desktop feature list */}
          <motion.div
            className="pe-features-desktop"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.30 }}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.34 + i * 0.08, ease: EASE }}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 14,
                    padding: "14px 18px",
                    borderRadius: 14,
                    background: "rgba(14,165,233,0.05)",
                    border: "1px solid rgba(14,165,233,0.10)",
                    transition: "border-color 0.25s, background 0.25s",
                    cursor: "default",
                  }}
                  whileHover={{
                    background: "rgba(14,165,233,0.10)",
                    borderColor: "rgba(14,165,233,0.28)",
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: "rgba(14,165,233,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon style={{ width: 16, height: 16, color: ACCENT }} strokeWidth={1.8} />
                  </div>
                  <div>
                    <p style={{ margin: "0 0 3px", fontSize: 13.5, fontWeight: 700, color: "#e2e8f0" }}>
                      {f.title}
                    </p>
                    <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.65, color: "rgba(148,163,184,0.70)" }}>
                      {f.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Mobile carousel */}
          <div className="pe-features-mobile" style={{ display: "none" }}>
            <FeatureCarousel />
          </div>

          {/* Notify strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.72 }}
            style={{
              marginTop: 36,
              padding: "14px 20px",
              borderRadius: 14,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              display: "flex", alignItems: "center",
              justifyContent: "space-between", gap: 12,
              flexWrap: "wrap",
            }}
          >
            <p style={{ margin: 0, fontSize: 13, color: "rgba(148,163,184,0.55)" }}>
              Hardware PLM · EVT/DVT/PVT · DFM · Mass Production
            </p>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              fontSize: 12, fontWeight: 700,
              color: ACCENT, letterSpacing: "0.06em",
            }}>
              <motion.span
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#4ade80", display: "inline-block",
                }}
              />
              In Development
            </div>
          </motion.div>
        </div>

        {/* ══ RIGHT — THREE.JS VISUAL ══ */}
        <motion.div
          style={{
            rotateX: rx, rotateY: ry,
            perspective: 1000,
          }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.18, ease: EASE }}
        >
          <div
            className="pe-canvas-wrap"
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "1 / 1",
              borderRadius: 28,
              overflow: "hidden",
              border: "1px solid rgba(14,165,233,0.14)",
              boxShadow: `0 0 80px rgba(14,165,233,0.12), 0 32px 64px rgba(0,0,0,0.5)`,
              background: "linear-gradient(135deg, #020c1b 0%, #050d20 100%)",
            }}
          >
            <PCBCanvas />

            {/* Overlay label */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "40px 28px 28px",
              background: "linear-gradient(0deg, rgba(2,8,23,0.92) 0%, transparent 100%)",
              zIndex: 2,
            }}>
              <p style={{
                margin: "0 0 4px",
                fontSize: 11, fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "rgba(14,165,233,0.55)",
              }}>
                End-to-End Hardware PLM
              </p>
              <p style={{
                margin: 0, fontSize: 22, fontWeight: 900,
                color: "#fff", letterSpacing: "-0.03em",
              }}>
                From Sketch to Ship
              </p>
            </div>

            {/* Corner accent */}
            <div style={{
              position: "absolute", top: 20, right: 20, zIndex: 2,
              padding: "5px 12px", borderRadius: 50,
              background: "rgba(14,165,233,0.12)",
              border: "1px solid rgba(14,165,233,0.28)",
              fontSize: 10, fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "#7dd3fc",
            }}>
              Product Eng.
            </div>
          </div>

          {/* Below-canvas stat row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55 }}
            style={{
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12, marginTop: 16,
            }}
          >
            {[
              { val: "E2E",   label: "Ownership"     },
              { val: "3×",    label: "Faster Cycles"  },
              { val: "DFM",   label: "Ready"          },
            ].map((s, i) => (
              <div key={i} style={{
                textAlign: "center",
                padding: "14px 8px",
                borderRadius: 14,
                background: "rgba(14,165,233,0.05)",
                border: "1px solid rgba(14,165,233,0.10)",
              }}>
                <p style={{
                  margin: 0, fontSize: 20, fontWeight: 900,
                  color: "#fff", letterSpacing: "-0.03em",
                }}>
                  {s.val}
                </p>
                <p style={{
                  margin: "3px 0 0", fontSize: 10, fontWeight: 600,
                  color: "rgba(148,163,184,0.50)",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                }}>
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── RESPONSIVE STYLES ── */}
      <style>{`
        @media (max-width: 1024px) {
          .pe-inner {
            grid-template-columns: 1fr !important;
            padding: 80px 32px !important;
            gap: 48px !important;
          }
          .pe-canvas-wrap {
            aspect-ratio: 16/9 !important;
            max-height: 360px;
          }
        }
        @media (max-width: 768px) {
          .pe-inner {
            padding: 72px 20px !important;
            gap: 40px !important;
          }
          .pe-features-desktop { display: none !important; }
          .pe-features-mobile  { display: block !important; }
          .pe-canvas-wrap {
            aspect-ratio: 4/3 !important;
          }
        }
        @media (max-width: 480px) {
          .pe-inner {
            padding: 64px 16px !important;
          }
        }
        @media (min-width: 1920px) {
          .pe-inner {
            max-width: 1600px !important;
            padding: 120px 80px !important;
          }
        }
      `}</style>
    </section>
  );
}