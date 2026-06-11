// src/components/contact/ContactHero.jsx
// ─── REDESIGN: "Signal Terminal" — dark editorial hero with Three.js PCB network ───

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { C, FONT, EASE } from "././theme";

// ─── Stats rendered as monospace data table ─────────────────────────────────
const STATS = [
  { value: "50+",  label: "Tape-outs delivered"     },
  { value: "10+",  label: "Years of VLSI expertise"  },
  { value: "3nm",  label: "→ 65nm node coverage"     },
  { value: "<24h", label: "Typical response time"     },
];

// ─── Three.js PCB trace network ─────────────────────────────────────────────
function usePCBCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = canvas.clientWidth  || 560;
    const H = canvas.clientHeight || 520;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    const scene  = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, 1, 1000);
    camera.position.z = 100;

    // ── Build PCB nodes (via-like dots on a loose grid) ──────────────────
    const cols = 9, rows = 8;
    const spacingX = W / (cols + 1);
    const spacingY = H / (rows + 1);

    const nodes = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Random offset to break grid rigidity — feels organic like real PCB routing
        const jitterX = (Math.random() - 0.5) * spacingX * 0.55;
        const jitterY = (Math.random() - 0.5) * spacingY * 0.55;
        nodes.push(new THREE.Vector3(
          -W / 2 + spacingX * (c + 1) + jitterX,
          -H / 2 + spacingY * (r + 1) + jitterY,
          0
        ));
      }
    }

    // ── Via dots ─────────────────────────────────────────────────────────
    const ringGeo   = new THREE.RingGeometry(2.5, 4.0, 16);
    const dotGeo    = new THREE.CircleGeometry(1.4, 12);
    const viaMat    = new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.55 });
    const dotMat    = new THREE.MeshBasicMaterial({ color: 0xc7d2fe, transparent: true, opacity: 0.70 });

    nodes.forEach(pos => {
      const ring = new THREE.Mesh(ringGeo, viaMat);
      const dot  = new THREE.Mesh(dotGeo,  dotMat);
      ring.position.copy(pos);
      dot.position.copy(pos);
      scene.add(ring, dot);
    });

    // ── Trace lines between nearby nodes (L-shaped PCB routing) ─────────
    const traceMat = new THREE.LineBasicMaterial({
      color: 0x4f46e5, transparent: true, opacity: 0.22, linewidth: 1
    });
    const traceMatBright = new THREE.LineBasicMaterial({
      color: 0x818cf8, transparent: true, opacity: 0.40, linewidth: 1
    });

    const connected = new Set();
    nodes.forEach((a, i) => {
      nodes.forEach((b, j) => {
        if (i >= j) return;
        const key = `${i}-${j}`;
        if (connected.has(key)) return;

        const dist = a.distanceTo(b);
        const threshold = spacingX * 1.45;
        if (dist > threshold) return;

        // L-shaped orthogonal trace (real PCB style — no diagonal routes)
        const mid = new THREE.Vector3(
          Math.random() > 0.5 ? a.x : b.x,
          Math.random() > 0.5 ? a.y : b.y,
          0
        );

        const pts = [a.clone(), mid, b.clone()];
        const geo  = new THREE.BufferGeometry().setFromPoints(pts);
        const mat  = Math.random() > 0.72 ? traceMatBright : traceMat;
        scene.add(new THREE.Line(geo, mat));
        connected.add(key);
      });
    });

    // ── Animated signal pulses travelling along traces ───────────────────
    const PULSE_COUNT = 14;
    const pulses = [];

    // Pick random edges to animate
    const edges = [];
    nodes.forEach((a, i) => {
      nodes.forEach((b, j) => {
        if (i >= j) return;
        if (a.distanceTo(b) < spacingX * 1.45) edges.push({ a, b });
      });
    });

    const pulseMat = new THREE.MeshBasicMaterial({ color: 0xa5b4fc, transparent: true, opacity: 0.0 });
    const pulseGeo = new THREE.CircleGeometry(3.5, 10);

    for (let p = 0; p < PULSE_COUNT; p++) {
      const edge   = edges[Math.floor(Math.random() * edges.length)];
      const mesh   = new THREE.Mesh(pulseGeo, pulseMat.clone());
      const delay  = Math.random() * 4.0;
      const speed  = 0.18 + Math.random() * 0.22; // 0 → 1 per second fraction
      scene.add(mesh);
      pulses.push({ mesh, edge, t: -delay * speed, speed, delay });
    }

    // ── Animate ──────────────────────────────────────────────────────────
    let rafId;
    let last = performance.now();

    function tick() {
      rafId = requestAnimationFrame(tick);
      const now = performance.now();
      const dt  = (now - last) / 1000;
      last = now;

      pulses.forEach(p => {
        p.t += dt * p.speed;
        if (p.t > 1.2) {
          // Reset to a new random edge
          p.edge = edges[Math.floor(Math.random() * edges.length)];
          p.t = 0;
          p.speed = 0.18 + Math.random() * 0.22;
        }

        const t = Math.max(0, Math.min(1, p.t));
        p.mesh.position.lerpVectors(p.edge.a, p.edge.b, t);

        // Fade in/out: bright at midpoint
        const fade = Math.sin(t * Math.PI);
        p.mesh.material.opacity = fade * 0.92;
      });

      renderer.render(scene, camera);
    }

    tick();

    // ── Resize ────────────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h);
      camera.left   = -w / 2; camera.right = w / 2;
      camera.top    =  h / 2; camera.bottom = -h / 2;
      camera.updateProjectionMatrix();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      renderer.dispose();
    };
  }, []);
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function ContactHero() {
  const canvasRef = useRef(null);
  usePCBCanvas(canvasRef);

  return (
    <>
      <style>{`
        /* ── Root ─────────────────────────────────────────────── */
        .ch2-root {
          position: relative;
          background: #080c14;
          overflow: hidden;
          min-height: 520px;
          display: flex;
          align-items: stretch;
        }

        /* ── Subtle noise texture overlay ────────────────────── */
        .ch2-root::before {
          content: '';
          position: absolute; inset: 0; z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.35;
          pointer-events: none;
        }

        /* ── Left edge accent bar ────────────────────────────── */
        .ch2-root::after {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, transparent 0%, #4f46e5 30%, #7c3aed 70%, transparent 100%);
          z-index: 2;
        }

        /* ── Grid ─────────────────────────────────────────────── */
        .ch2-grid {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background-image:
            linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        /* ── Layout ───────────────────────────────────────────── */
        .ch2-inner {
          position: relative; z-index: 2;
          width: 100%; max-width: 1280px;
          margin: 0 auto;
          padding: 72px 64px 72px 72px;
          display: grid;
          grid-template-columns: 1fr 480px;
          gap: 0;
          align-items: center;
        }

        /* ── LEFT: copy ───────────────────────────────────────── */
        .ch2-left {
          padding-right: 56px;
        }

        /* Overline */
        .ch2-overline {
          display: inline-flex; align-items: center; gap: 10px;
          margin-bottom: 28px;
        }
        .ch2-overline-line {
          width: 32px; height: 1.5px;
          background: linear-gradient(90deg, #4f46e5, #7c3aed);
        }
        .ch2-overline-text {
          font-family: 'DM Sans', 'Sora', system-ui, sans-serif;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: #818cf8;
        }

        /* Headline — split weight design */
        .ch2-heading {
          font-family: 'Clash Display', 'Sora', system-ui, sans-serif;
          margin: 0 0 24px;
          line-height: 1.05;
          letter-spacing: -0.03em;
        }
        .ch2-heading-thin {
          display: block;
          font-size: clamp(38px, 4.8vw, 66px);
          font-weight: 300;
          color: #e2e8f0;
          letter-spacing: -0.04em;
        }
        .ch2-heading-bold {
          display: block;
          font-size: clamp(38px, 4.8vw, 66px);
          font-weight: 700;
          background: linear-gradient(125deg, #a5b4fc 0%, #818cf8 40%, #c4b5fd 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Body */
        .ch2-body {
          font-family: 'DM Sans', 'Sora', system-ui, sans-serif;
          font-size: clamp(15px, 1.5vw, 17px);
          line-height: 1.8;
          color: #94a3b8;
          max-width: 460px;
          margin: 0 0 40px;
        }

        /* CTA row */
        .ch2-cta-row {
          display: flex; align-items: center; gap: 16px;
          flex-wrap: wrap;
        }
        .ch2-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 26px;
          border-radius: 6px;
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: #fff;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 14px; font-weight: 600;
          letter-spacing: 0.01em;
          border: none; cursor: pointer;
          box-shadow: 0 0 28px rgba(79,70,229,0.35);
          transition: all 0.22s ease;
          text-decoration: none;
        }
        .ch2-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 36px rgba(79,70,229,0.55);
        }
        .ch2-btn-secondary {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 12px 22px;
          border-radius: 6px;
          border: 1px solid rgba(99,102,241,0.35);
          color: #94a3b8;
          background: transparent;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 14px; font-weight: 500;
          cursor: pointer;
          transition: all 0.22s ease;
          text-decoration: none;
        }
        .ch2-btn-secondary:hover {
          border-color: rgba(99,102,241,0.65);
          color: #c7d2fe;
          background: rgba(99,102,241,0.06);
        }

        /* ── RIGHT: canvas + stats ─────────────────────────────── */
        .ch2-right {
          position: relative;
        }

        /* Three.js canvas */
        .ch2-canvas {
          display: block;
          width: 100%; height: 520px;
          border-radius: 4px;
          /* No border — the PCB itself is the visual */
        }

        /* Stat overlay — bottom-left of the canvas panel */
        .ch2-stats-overlay {
          position: absolute;
          bottom: 24px; left: 24px;
          background: rgba(8,12,20,0.82);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(99,102,241,0.22);
          border-radius: 8px;
          padding: 18px 22px;
          min-width: 240px;
        }

        /* Top accent rule */
        .ch2-stats-overlay::before {
          content: '';
          position: absolute; top: 0; left: 16px; right: 16px; height: 1px;
          background: linear-gradient(90deg, transparent, #4f46e5, #7c3aed, transparent);
        }

        .ch2-stats-label {
          font-family: 'DM Mono', 'JetBrains Mono', 'Courier New', monospace;
          font-size: 10px; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #475569;
          margin-bottom: 14px;
        }

        .ch2-stats-table {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px 24px;
        }

        .ch2-stat-item {}

        .ch2-stat-val {
          font-family: 'Clash Display', 'Sora', monospace;
          font-size: 22px; font-weight: 700;
          color: #e2e8f0;
          line-height: 1;
          letter-spacing: -0.03em;
          margin-bottom: 3px;
        }
        .ch2-stat-val span {
          background: linear-gradient(135deg, #818cf8, #c4b5fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ch2-stat-desc {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 10.5px;
          color: #475569;
          line-height: 1.4;
        }

        /* Online indicator */
        .ch2-status {
          display: flex; align-items: center; gap: 8px;
          margin-top: 14px;
          padding-top: 12px;
          border-top: 1px solid rgba(99,102,241,0.12);
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 11.5px;
          color: #475569;
        }
        .ch2-status-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 6px rgba(34,197,94,0.5);
          flex-shrink: 0;
        }

        /* ── Divider bottom ────────────────────────────────────── */
        .ch2-bottom-rule {
          position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.25) 30%, rgba(124,58,237,0.25) 70%, transparent);
        }

        /* ── Responsive ────────────────────────────────────────── */
        @media (max-width: 1024px) {
          .ch2-inner {
            grid-template-columns: 1fr;
            padding: 56px 40px;
            gap: 48px;
          }
          .ch2-left { padding-right: 0; }
          .ch2-canvas { height: 380px; }
        }

        @media (max-width: 680px) {
          .ch2-inner { padding: 44px 24px; }
          .ch2-canvas { height: 300px; }
          .ch2-stats-overlay { left: 16px; bottom: 16px; padding: 14px 16px; min-width: 0; right: 16px; }
          .ch2-stats-table { grid-template-columns: repeat(4, 1fr); gap: 10px 12px; }
          .ch2-stat-val { font-size: 18px; }
        }

        @media (max-width: 480px) {
          .ch2-stats-table { grid-template-columns: 1fr 1fr; }
          .ch2-cta-row { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <section className="ch2-root">
        <div className="ch2-grid" />

        <div className="ch2-inner">

          {/* ── LEFT: editorial copy ─────────────────────────────── */}
          <div className="ch2-left">

            <motion.div
              className="ch2-overline"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span className="ch2-overline-line" />
              <span className="ch2-overline-text">AurowinX Technologies — Contact</span>
            </motion.div>

            <motion.h1
              className="ch2-heading"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            >
              <span className="ch2-heading-thin">Your Next Silicon</span>
              <span className="ch2-heading-bold">Starts Here.</span>
            </motion.h1>

            <motion.p
              className="ch2-body"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.17 }}
            >
              Connect with our semiconductor engineering team — whether you're
              scoping a tape-out, exploring design partnerships, or building
              your next generation of silicon. We bring ASIC, FPGA, and
              embedded expertise from concept to silicon.
            </motion.p>

            <motion.div
              className="ch2-cta-row"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.26 }}
            >
              <a href="#contact-form" className="ch2-btn-primary">
                Start a Conversation
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="/solutions" className="ch2-btn-secondary">
                View Capabilities
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT: Three.js PCB canvas + stats ───────────────── */}
          <motion.div
            className="ch2-right"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            <canvas className="ch2-canvas" ref={canvasRef} />

            {/* Stats overlay panel */}
            <div className="ch2-stats-overlay">
              <div className="ch2-stats-label">Engineering Footprint</div>
              <div className="ch2-stats-table">
                {STATS.map(({ value, label }) => (
                  <div key={label} className="ch2-stat-item">
                    <div className="ch2-stat-val"><span>{value}</span></div>
                    <div className="ch2-stat-desc">{label}</div>
                  </div>
                ))}
              </div>
              <div className="ch2-status">
                <span className="ch2-status-dot" />
                Team available — typically responds within 1 business day
              </div>
            </div>
          </motion.div>

        </div>

        <div className="ch2-bottom-rule" />
      </section>
    </>
  );
}