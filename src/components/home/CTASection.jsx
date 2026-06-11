// src/components/home/CTASection.jsx
// Requires: framer-motion

import { useRef, useEffect, useState, useCallback } from "react";
import {
  motion, useInView, useScroll, useTransform,
  useMotionValue, useSpring,
} from "framer-motion";
import * as THREE from "three";

/* ════════════════════════════════════════════════════════
   THREE.JS — REAL CHIP / PCB 3D SCENE
   • Central flat chip die with bond-wire arcs
   • PCB substrate plane with circuit trace lines
   • Floating solder-ball BGA grid
   • Orbiting data-packet spheres
   • Particles
════════════════════════════════════════════════════════ */
function ChipScene() {
  const mountRef = useRef(null);
  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth, H = el.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.set(0, 3.5, 6);
    camera.lookAt(0, 0, 0);

    // ── Lighting ──
    scene.add(new THREE.AmbientLight(0xc8d8ff, 1.8));
    const keyLight = new THREE.DirectionalLight(0x6699ff, 3);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);
    const fillLight = new THREE.PointLight(0x00e5ff, 60, 18);
    fillLight.position.set(-4, 2, 3);
    scene.add(fillLight);
    const rimLight = new THREE.PointLight(0x9b5cf6, 40, 14);
    rimLight.position.set(2, -2, -3);
    scene.add(rimLight);
    const topLight = new THREE.PointLight(0xffffff, 20, 10);
    topLight.position.set(0, 8, 0);
    scene.add(topLight);

    const group = new THREE.Group();
    scene.add(group);

    // ── PCB Substrate (green board) ──
    const pcbGeo = new THREE.BoxGeometry(5.4, 0.12, 5.4);
    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x0d4a2a, metalness: 0.3, roughness: 0.55,
    });
    const pcb = new THREE.Mesh(pcbGeo, pcbMat);
    pcb.position.y = -0.9;
    pcb.receiveShadow = true;
    group.add(pcb);

    // PCB edge highlight lines (traces)
    const traceColor = 0xffd700;
    const addTrace = (x1, z1, x2, z2) => {
      const pts = [new THREE.Vector3(x1, -0.82, z1), new THREE.Vector3(x2, -0.82, z2)];
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({ color: traceColor, transparent: true, opacity: 0.45 });
      group.add(new THREE.Line(geo, mat));
    };
    // Horizontal traces
    for (let z = -2.4; z <= 2.4; z += 0.4) addTrace(-2.7, z, 2.7, z);
    // Vertical traces
    for (let x = -2.4; x <= 2.4; x += 0.4) addTrace(x, -2.7, x, 2.7);

    // ── Chip Die (center) ──
    const dieGeo = new THREE.BoxGeometry(2.2, 0.22, 2.2);
    const dieMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a2e, metalness: 0.85, roughness: 0.1,
    });
    const die = new THREE.Mesh(dieGeo, dieMat);
    die.position.y = -0.78;
    die.castShadow = true;
    group.add(die);

    // Die surface grid (logic blocks)
    const blockColors = [0x3b82f6, 0x06b6d4, 0x8b5cf6, 0x10b981, 0xf59e0b];
    const blockPositions = [
      [-0.6, -0.4], [0.6, -0.4], [-0.6, 0.4], [0.6, 0.4],
      [0, 0], [-0.6, 0], [0.6, 0], [0, -0.4], [0, 0.4],
    ];
    blockPositions.forEach(([bx, bz], i) => {
      const bGeo = new THREE.BoxGeometry(0.45, 0.05, 0.45);
      const bMat = new THREE.MeshStandardMaterial({
        color: blockColors[i % blockColors.length],
        metalness: 0.6, roughness: 0.3, emissive: blockColors[i % blockColors.length],
        emissiveIntensity: 0.25,
      });
      const block = new THREE.Mesh(bGeo, bMat);
      block.position.set(bx, -0.66, bz);
      group.add(block);
    });

    // Die wire-bond arcs (thin curved lines from die edge to PCB pads)
    const bondMat = new THREE.LineBasicMaterial({ color: 0xffd700, transparent: true, opacity: 0.7 });
    const makeArc = (startX, startZ, endX, endZ) => {
      const pts = [];
      for (let t = 0; t <= 1; t += 0.05) {
        const x = startX + (endX - startX) * t;
        const y = -0.66 + Math.sin(t * Math.PI) * 0.45;
        const z = startZ + (endZ - startZ) * t;
        pts.push(new THREE.Vector3(x, y, z));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      group.add(new THREE.Line(geo, bondMat));
    };
    const dieEdge = 1.1; const padEdge = 1.6;
    for (let i = -2; i <= 2; i++) {
      makeArc(dieEdge, i * 0.38, padEdge + 0.1, i * 0.38);
      makeArc(-dieEdge, i * 0.38, -padEdge - 0.1, i * 0.38);
      makeArc(i * 0.38, dieEdge, i * 0.38, padEdge + 0.1);
      makeArc(i * 0.38, -dieEdge, i * 0.38, -padEdge - 0.1);
    }

    // ── BGA Solder Balls (grid under chip) ──
    const ballGeo = new THREE.SphereGeometry(0.055, 10, 10);
    const ballMat = new THREE.MeshStandardMaterial({ color: 0xc0c0d0, metalness: 0.95, roughness: 0.05 });
    for (let bx = -1.0; bx <= 1.0; bx += 0.22) {
      for (let bz = -1.0; bz <= 1.0; bz += 0.22) {
        const ball = new THREE.Mesh(ballGeo, ballMat);
        ball.position.set(bx, -1.0, bz);
        group.add(ball);
      }
    }

    // ── Heat-sink fins (above chip) ──
    const hsMat = new THREE.MeshStandardMaterial({ color: 0x8899bb, metalness: 0.8, roughness: 0.25 });
    const hsBase = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.08, 2.0), hsMat);
    hsBase.position.y = -0.6;
    group.add(hsBase);
    for (let fx = -0.8; fx <= 0.8; fx += 0.2) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.5, 1.8), hsMat);
      fin.position.set(fx, -0.32, 0);
      group.add(fin);
    }

    // ── Capacitors / components on PCB ──
    const capPositions = [
      [2.0, 0.8], [-2.0, 0.8], [2.0, -0.8], [-2.0, -0.8],
      [1.5, 2.0], [-1.5, 2.0], [1.5, -2.0], [-1.5, -2.0],
      [0, 2.2], [0, -2.2], [2.2, 0], [-2.2, 0],
    ];
    capPositions.forEach(([cx, cz]) => {
      const isCap = Math.random() > 0.5;
      const geo = isCap
        ? new THREE.CylinderGeometry(0.065, 0.065, 0.18, 10)
        : new THREE.BoxGeometry(0.1, 0.14, 0.2);
      const mat = new THREE.MeshStandardMaterial({
        color: isCap ? 0x1a3a6a : 0x2a2a2a, metalness: 0.6, roughness: 0.4,
      });
      const comp = new THREE.Mesh(geo, mat);
      comp.position.set(cx, -0.77, cz);
      group.add(comp);
    });

    // ── Orbiting data packets (small glowing spheres) ──
    const orbitData = [
      { radius: 2.8, speed: 0.008, y: 0.3, color: 0x3b82f6, size: 0.09 },
      { radius: 3.4, speed: -0.005, y: -0.2, color: 0x06b6d4, size: 0.07 },
      { radius: 2.2, speed: 0.012, y: 0.6, color: 0x8b5cf6, size: 0.08 },
      { radius: 3.8, speed: 0.004, y: 0.1, color: 0x10b981, size: 0.06 },
    ];
    const orbiters = orbitData.map(d => {
      const geo = new THREE.SphereGeometry(d.size, 12, 12);
      const mat = new THREE.MeshStandardMaterial({
        color: d.color, emissive: d.color, emissiveIntensity: 1.2, roughness: 0.1,
      });
      const mesh = new THREE.Mesh(geo, mat);
      const angle = Math.random() * Math.PI * 2;
      mesh.userData = { ...d, angle };
      group.add(mesh);
      return mesh;
    });

    // Orbit rings (faint)
    orbitData.forEach(d => {
      const geo = new THREE.TorusGeometry(d.radius, 0.006, 4, 100);
      const mat = new THREE.MeshBasicMaterial({ color: d.color, transparent: true, opacity: 0.15 });
      const torus = new THREE.Mesh(geo, mat);
      torus.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.4;
      group.add(torus);
    });

    // ── Floating particles ──
    const pCount = 220;
    const pPos = new Float32Array(pCount * 3);
    const pCol = new Float32Array(pCount * 3);
    const palette = [[0.23, 0.51, 0.96], [0.02, 0.71, 0.83], [0.55, 0.36, 0.96], [0.06, 0.72, 0.51]];
    for (let i = 0; i < pCount; i++) {
      const r = 4 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPos[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      pCol[i * 3] = c[0]; pCol[i * 3 + 1] = c[1]; pCol[i * 3 + 2] = c[2];
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pCol, 3));
    const pMesh = new THREE.Points(pGeo,
      new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.65 })
    );
    scene.add(pMesh);

    // ── Mouse parallax ──
    let mx = 0, my = 0;
    const onMove = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    // ── Block pulse animation ──
    let raf, lastPulse = 0;
    const timer = new THREE.Timer();
    timer.connect(document);
    
    const animate = () => {
      raf = requestAnimationFrame(animate);
      
      timer.update();
      const t = timer.getElapsed();

      // Slow chip group rotation
      group.rotation.y = t * 0.12 + mx * 0.25;
      group.rotation.x = -0.35 + my * 0.1;

      // Orbit packets
      orbiters.forEach(o => {
        o.userData.angle += o.userData.speed;
        const a = o.userData.angle;
        o.position.set(
          Math.cos(a) * o.userData.radius,
          o.userData.y + Math.sin(t * 0.8) * 0.15,
          Math.sin(a) * o.userData.radius
        );
      });

      // Emissive pulse on logic blocks (subtle)
      if (t - lastPulse > 0.8) {
        lastPulse = t;
        group.children.forEach(c => {
          if (c.material && c.material.emissiveIntensity !== undefined && Math.random() > 0.6) {
            const orig = c.material.emissiveIntensity;
            c.material.emissiveIntensity = 0.9;
            setTimeout(() => { if (c.material) c.material.emissiveIntensity = orig; }, 180);
          }
        });
      }

      // Particle drift
      pMesh.rotation.y = t * 0.03;
      pMesh.rotation.x = t * 0.015;

      // Light animation
      fillLight.position.x = Math.sin(t * 0.45) * 5;
      fillLight.position.z = Math.cos(t * 0.45) * 4;
      rimLight.position.x = Math.cos(t * 0.35) * 4;

      // Camera drift
      camera.position.x += (mx * 0.5 - camera.position.x) * 0.03;
      camera.position.y += (my * 0.2 + 3.5 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!el) return;
      const w = el.clientWidth, h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      timer.dispose();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: "absolute", inset: 0, zIndex: 0 }} />;
}

/* ════════════════════════════════════════════════════════
   MAGNETIC BUTTON
════════════════════════════════════════════════════════ */
function MagneticBtn({ children, href, style: s }) {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 18 });
  const sy = useSpring(y, { stiffness: 300, damping: 18 });
  const onMove = useCallback((e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width  / 2) * 0.38);
    y.set((e.clientY - r.top  - r.height / 2) * 0.38);
  }, [x, y]);
  return (
    <motion.a ref={ref} href={href} onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: sx, y: sy, ...s }}
      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
    >{children}</motion.a>
  );
}

/* ════════════════════════════════════════════════════════
   GLITCH TEXT
════════════════════════════════════════════════════════ */
function GlitchText({ children, style }) {
  const [g, setG] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setG(true);
      setTimeout(() => setG(false), 180);
    }, 3800 + Math.random() * 2500);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{ position: "relative", display: "inline-block", ...style }}>
      {children}
      {g && <>
        <span aria-hidden style={{ position: "absolute", inset: 0, color: "#06b6d4",
          clipPath: "polygon(0 28%,100% 28%,100% 48%,0 48%)",
          transform: "translateX(-3px)", opacity: 0.7 }}>{children}</span>
        <span aria-hidden style={{ position: "absolute", inset: 0, color: "#8b5cf6",
          clipPath: "polygon(0 62%,100% 62%,100% 76%,0 76%)",
          transform: "translateX(3px)", opacity: 0.7 }}>{children}</span>
      </>}
    </span>
  );
}

/* ════════════════════════════════════════════════════════
   COUNT UP
════════════════════════════════════════════════════════ */
function CountUp({ to, suffix = "", inView }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let n = 0;
    const step = Math.ceil(to / 55);
    const id = setInterval(() => {
      n += step;
      if (n >= to) { setV(to); clearInterval(id); } else setV(n);
    }, 22);
    return () => clearInterval(id);
  }, [inView, to]);
  return <>{v}{suffix}</>;
}

/* ════════════════════════════════════════════════════════
   HOLO CARD
════════════════════════════════════════════════════════ */
const IMAGES = [
  { src: "https://images.unsplash.com/photo-1601132359864-c974e79890ac?w=800&q=85", alt: "Silicon chip close-up",       label: "ASIC Design",   span: "wide" },
  { src: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=85", alt: "Semiconductor wafer",         label: "Silicon Fab"             },
  { src: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=800&q=85", alt: "PCB electronics engineering", label: "PCB & Firmware"          },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85",    alt: "IoT connected devices",       label: "IoT & Embedded"          },
];

function HoloCard({ src, alt, label, delay, inView }) {
  const [tilt,  setTilt]  = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });
  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.93 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={e => {
        const r  = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top)  / r.height;
        setTilt({ x: (py - 0.5) * 16, y: (px - 0.5) * -16 });
        setShine({ x: px * 100, y: py * 100 });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ perspective: 800, height: "100%", cursor: "pointer" }}
    >
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ borderRadius: 14, overflow: "hidden", position: "relative", height: "100%",
          boxShadow: "0 16px 48px rgba(15,23,42,0.18), 0 0 0 1px rgba(59,130,246,0.12)" }}
      >
        <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0,
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(139,92,246,0.22) 0%, rgba(6,182,212,0.12) 40%, transparent 70%)`,
          pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(10,18,42,0.82) 0%, rgba(10,18,42,0.1) 55%, transparent 100%)" }} />
        <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#06b6d4",
            boxShadow: "0 0 8px #06b6d4", display: "inline-block" }} />
          <span style={{ color: "#fff", fontSize: 10, fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase" }}>{label}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   HUD BRACKET
════════════════════════════════════════════════════════ */
function HUDBracket({ position }) {
  const isTop  = position.startsWith("top");
  const isLeft = position.endsWith("left");
  const s = { position: "absolute", width: 22, height: 22, zIndex: 10 };
  if (isTop)  s.top    = 10; else s.bottom = 10;
  if (isLeft) s.left   = 10; else s.right  = 10;
  return (
    <div style={s}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d={isTop && isLeft ? "M0 14L0 0L14 0"
            : isTop           ? "M8 0L22 0L22 14"
            : isLeft          ? "M0 8L0 22L14 22"
            :                   "M8 22L22 22L22 8"}
          stroke="rgba(59,130,246,0.5)" strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   GLASS CONTACT CARD
════════════════════════════════════════════════════════ */
function GlassContactCard({ card, delay, inView }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.a href={card.href}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 16, padding: "20px 22px",
        borderRadius: 16, textDecoration: "none",
        background: hov ? "#fff" : "#f4f7ff",
        border: `1.5px solid ${hov ? card.accent + "55" : "#e2e8f0"}`,
        boxShadow: hov ? `0 8px 30px ${card.accent}20` : "0 2px 8px rgba(15,23,42,0.05)",
        transition: "all .28s",
      }}
    >
      <div style={{ width: 46, height: 46, borderRadius: 12, flexShrink: 0,
        background: `${card.accent}14`, border: `1.5px solid ${card.accent}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 21, color: card.accent,
        transform: hov ? "scale(1.1)" : "scale(1)", transition: "transform .28s" }}
      >{card.icon}</div>
      <div>
        <p style={{ color: "#0f172a", fontWeight: 700, fontSize: 14, margin: "0 0 2px" }}>{card.label}</p>
        <p style={{ color: "#64748b", fontSize: 12, margin: 0 }}>{card.sub}</p>
      </div>
    </motion.a>
  );
}

/* ════════════════════════════════════════════════════════
   DATA
════════════════════════════════════════════════════════ */
const STATS = [
  { num: 120, suffix: "+",  label: "Projects"  },
  { num: 18,  suffix: "",   label: "Countries" },
  { num: 99,  suffix: "%",  label: "On-Time"   },
  { num: 8,   suffix: "yr", label: "Expertise" },
];

const FOOTER_SERVICES = ["ASIC Design","VLSI & RTL","Embedded Firmware","IoT Systems","Power Electronics","PCB Design","FPGA Development","Product Engineering"];
const FOOTER_COMPANY  = ["About Us","Our Team","Case Studies","Careers","Blog","Contact"];
const FOOTER_CONTACT  = [
  { icon: "📍", text: "Chennai, Tamil Nadu, India" },
  { icon: "✉",  text: "info@aurowinx.com"         },
  { icon: "🌐", text: "www.aurowinx.com"           },
  { icon: "📞", text: "+91 98400 XXXXX"            },
];
const SOCIALS = [
  { label: "LI", href: "#", title: "LinkedIn"    },
  { label: "TW", href: "#", title: "Twitter / X" },
  { label: "GH", href: "#", title: "GitHub"      },
  { label: "YT", href: "#", title: "YouTube"     },
];

/* ════════════════════════════════════════════════════════
   RESPONSIVE STYLES
════════════════════════════════════════════════════════ */
const CSS = `
  .cta-wrap * { box-sizing: border-box; }
  .cta-wrap { overflow-x: clip; width: 100%; }

  .cta-inner { max-width: 1280px; margin: 0 auto; width: 100%; }

  .hero-grid {
    display: grid; grid-template-columns: 1fr;
    gap: clamp(1.75rem, 4vw, 3.5rem); align-items: center; min-height: unset;
  }
  .canvas-wrap  { position: relative; height: clamp(220px, 45vw, 480px); min-height: 220px; }
  .stats-row    { display: flex; gap: clamp(0.875rem, 3vw, 1.75rem); flex-wrap: wrap; }
  .contact-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
  .img-grid     { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; height: auto; }
  .img-grid > * { min-height: 100px; height: clamp(100px, 22vw, 150px); }
  .btn-row      { display: flex; gap: 12px; flex-wrap: wrap; }
  .btn-row a { max-width: 100%; }

  .footer-top    { display: grid; grid-template-columns: 1fr; gap: 24px; padding: 40px 20px 32px; }
  .footer-bottom { display: flex; flex-direction: column; align-items: flex-start; gap: 12px; flex-wrap: wrap; padding: 16px 20px 22px; }
  .footer-socials { display: flex; gap: 10px; flex-wrap: wrap; }
  .newsletter-row { display: flex; flex-direction: column; gap: 0; }

  .sec-pad { padding: clamp(3rem, 8vw, 5.5rem) clamp(1rem, 4vw, 3rem) clamp(2.75rem, 6vw, 4.5rem); }
  .sec-pad-compact { padding: clamp(2rem, 5vw, 3rem) clamp(1rem, 4vw, 3rem) clamp(1.75rem, 4vw, 2.5rem); }
  .img-pad { padding: 0 clamp(1rem, 4vw, 3rem) clamp(2.75rem, 6vw, 4.5rem); }
  .con-pad { padding: 0 clamp(1rem, 4vw, 3rem) clamp(2.75rem, 6vw, 4.5rem); }
  .con-pad-compact { padding: 0 clamp(1rem, 4vw, 3rem) clamp(2rem, 4vw, 3rem); }

  @media (min-width: 480px) {
    .btn-row { gap: 14px; }
    .img-grid > * { min-height: 120px; }
  }

  @media (min-width: 640px) {
    .contact-grid { grid-template-columns: 1fr 1fr; }
    .newsletter-row { flex-direction: row; }
    .newsletter-row button { width: auto; }
  }

  @media (min-width: 768px) {
    .footer-top   { grid-template-columns: 1fr 1fr; gap: 28px; padding: 40px 20px 32px; }
    .footer-bottom { flex-direction: row; align-items: center; justify-content: space-between; }
    .btn-row      { flex-direction: row; }
  }

  @media (min-width: 1100px) {
    .hero-grid    { grid-template-columns: 1fr 1fr; min-height: 520px; }
    .canvas-wrap  { height: 480px; }
    .img-grid     { grid-template-columns: 1.5fr 1fr 1fr 1fr; height: 256px; }
    .img-grid > * { height: 100%; min-height: unset; }
    .contact-grid { grid-template-columns: repeat(3, 1fr); }
    .footer-top   { grid-template-columns: 1.8fr 1fr 1fr 1.3fr; gap: 48px; padding: 64px 48px 48px; }
    .footer-bottom { padding: 20px 48px 28px; }
  }

  @media (min-width: 1536px) {
    .cta-inner { max-width: 90rem; }
  }
`;

/* ════════════════════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════════════════════ */
export default function CTASection({ compact = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <>
      <style>{CSS}</style>
      <section ref={ref} className="cta-wrap" style={{
        fontFamily: "'Sora', sans-serif",
        background: "#f5f8ff",
        position: "relative", overflow: "hidden",
      }}>

        {/* Dot grid */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: "radial-gradient(rgba(59,130,246,0.13) 1px, transparent 1px)",
          backgroundSize: "28px 28px" }} />

        {/* Top glow */}
        <div style={{ position: "absolute", top: "0%", left: "40%", transform: "translateX(-50%)",
          width: 700, height: 400, borderRadius: "50%",
          background: "radial-gradient(ellipse,rgba(59,130,246,0.1) 0%,transparent 70%)",
          filter: "blur(50px)", pointerEvents: "none", zIndex: 0 }} />

        {/* Right violet glow */}
        <div style={{ position: "absolute", top: "30%", right: "-5%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(ellipse,rgba(139,92,246,0.08) 0%,transparent 70%)",
          filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />

        {/* ════ HERO ════ */}
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 2 }} className={`cta-inner ${compact ? "sec-pad-compact" : "sec-pad"}`}>
          <div className="hero-grid">

            {/* LEFT */}
            <motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.55 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 9,
                  padding: "7px 16px", borderRadius: 40, marginBottom: 30,
                  border: "1px solid rgba(6,182,212,0.3)",
                  background: "rgba(6,182,212,0.07)" }}
              >
                <motion.span animate={{ scale: [1, 1.7, 1], opacity: [1, 0.35, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: "#06b6d4" }} />
                <span style={{ color: "#0891b2", fontSize: 10, fontWeight: 700,
                  letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  Ready to Collaborate
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.82, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontSize: "clamp(2.4rem,5vw,4.5rem)", fontWeight: 800,
                  lineHeight: 0.96, letterSpacing: "-0.05em", color: "#0a0f2c", margin: "0 0 18px" }}
              >
                Engineer<br />Your Next<br />
                <GlitchText style={{
                  background: "linear-gradient(135deg,#2563eb,#06b6d4 40%,#7c3aed)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>Breakthrough</GlitchText>
              </motion.h2>

              <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.75, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
                style={{ height: 2, width: 220, borderRadius: 2, transformOrigin: "left", marginBottom: 24,
                  background: "linear-gradient(90deg,#3b82f6,#06b6d4,#8b5cf6)" }} />

              <motion.p initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.25 }}
                style={{ color: "#475569", fontSize: 16, lineHeight: 1.85, maxWidth: 420, margin: "0 0 38px" }}
              >
                Silicon-proven ASIC, embedded firmware, IoT automation &amp; certified power electronics —
                <strong style={{ color: "#1e293b", fontWeight: 700 }}> AurowinX delivers end-to-end.</strong>
              </motion.p>

              <motion.div className="btn-row"
                initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.36 }}>
                <MagneticBtn href="/contact" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "14px 28px", borderRadius: 12, fontSize: 14, fontWeight: 700,
                  textDecoration: "none", letterSpacing: "-0.01em",
                  background: "linear-gradient(135deg,#2563eb,#7c3aed)", color: "#fff",
                  boxShadow: "0 8px 28px rgba(37,99,235,0.35), inset 0 1px 0 rgba(255,255,255,0.18)",
                }}>
                  Start a Project
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>→</motion.span>
                </MagneticBtn>
                <MagneticBtn href="mailto:info@aurowinx.com" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "14px 28px", borderRadius: 12, fontSize: 14, fontWeight: 600,
                  textDecoration: "none", background: "#fff",
                  border: "1.5px solid #e2e8f0", color: "#1e293b",
                  boxShadow: "0 2px 10px rgba(15,23,42,0.07)",
                }}>✉ info@aurowinx.com</MagneticBtn>
              </motion.div>

              <motion.div className="stats-row"
                initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.48 }}
                style={{ marginTop: 44, paddingTop: 26, borderTop: "1px solid #e2e8f0" }}>
                {STATS.map(s => (
                  <div key={s.label}>
                    <p style={{ fontSize: 27, fontWeight: 800, color: "#0a0f2c",
                      margin: "0 0 2px", letterSpacing: "-0.04em", lineHeight: 1 }}>
                      <CountUp to={s.num} suffix={s.suffix} inView={inView} />
                    </p>
                    <p style={{ fontSize: 10, color: "#94a3b8", fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: "0.14em", margin: 0 }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT — chip canvas */}
            <div className="canvas-wrap">
              <div style={{ position: "absolute", inset: 0, borderRadius: 24,
                background: "linear-gradient(145deg,#e8f0fe 0%,#eef9ff 45%,#f0ecff 100%)",
                border: "1px solid rgba(59,130,246,0.12)",
                boxShadow: "0 24px 72px rgba(59,130,246,0.12), 0 0 0 1px rgba(59,130,246,0.06)" }} />
              <ChipScene />
              {["top-left","top-right","bottom-left","bottom-right"].map(p => <HUDBracket key={p} position={p} />)}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: "absolute", inset: 0 }}
              >
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ position: "absolute", bottom: 22, left: 14,
                    background: "rgba(255,255,255,0.9)", backdropFilter: "blur(14px)",
                    border: "1px solid rgba(6,182,212,0.22)", borderRadius: 10, padding: "8px 14px",
                    boxShadow: "0 4px 18px rgba(6,182,212,0.12)" }}>
                  <p style={{ color: "#0891b2", fontSize: 9, fontWeight: 700,
                    letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 2px" }}>System Online</p>
                  <p style={{ color: "#0f172a", fontSize: 13, fontWeight: 700, margin: 0,
                    fontFamily: "'JetBrains Mono',monospace" }}>AurowinX Core v2.4</p>
                </motion.div>
                <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  style={{ position: "absolute", top: 22, right: 14, textAlign: "right",
                    background: "rgba(255,255,255,0.9)", backdropFilter: "blur(14px)",
                    border: "1px solid rgba(139,92,246,0.2)", borderRadius: 10, padding: "8px 14px",
                    boxShadow: "0 4px 18px rgba(139,92,246,0.1)" }}>
                  <p style={{ color: "#7c3aed", fontSize: 9, fontWeight: 700,
                    letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 2px" }}>Response</p>
                  <p style={{ color: "#0f172a", fontSize: 13, fontWeight: 700, margin: 0,
                    fontFamily: "'JetBrains Mono',monospace" }}>&lt; 24 hrs</p>
                </motion.div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* ════ IMAGE MOSAIC ════ */}
        {!compact && (
        <motion.div style={{ y: parallaxY }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }} className="cta-inner img-pad">
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.28 }}
              style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
              <div style={{ flex: 1, height: "0.5px", background: "#e2e8f0" }} />
              <span style={{ color: "#94a3b8", fontSize: 10, fontWeight: 700,
                letterSpacing: "0.2em", textTransform: "uppercase" }}>Our Engineering Domains</span>
              <div style={{ flex: 1, height: "0.5px", background: "#e2e8f0" }} />
            </motion.div>
            <div className="img-grid">
              {IMAGES.map((img, i) => <HoloCard key={img.label} {...img} delay={0.32 + i * 0.08} inView={inView} />)}
            </div>
          </div>
        </motion.div>
        )}

        {/* ════ CONTACT STRIP ════ */}
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 2 }} className={`cta-inner ${compact ? "con-pad-compact" : "con-pad"}`}>
          <div className="contact-grid">
            {[
              { icon: "⚡", label: "Start a Project", sub: "Tell us what you're building", href: "/contact",                accent: "#3b82f6" },
              { icon: "✉",  label: "Send an Email",   sub: "info@aurowinx.com",            href: "mailto:info@aurowinx.com", accent: "#06b6d4" },
              { icon: "↗",  label: "Visit Website",   sub: "www.aurowinx.com",             href: "https://aurowinx.com",     accent: "#8b5cf6" },
            ].map((c, i) => <GlassContactCard key={c.label} card={c} delay={0.38 + i * 0.1} inView={inView} />)}
          </div>
        </div>

        {/* ════ FOOTER ════ */}
        <footer style={{ background: "#060d1f", position: "relative", overflow: "hidden", marginTop: 8 }}>

          <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: `
              linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)`,
            backgroundSize: "48px 48px" }} />
          <div style={{ position: "absolute", top: 0, left: "30%",
            width: 600, height: 300, borderRadius: "50%",
            background: "radial-gradient(ellipse,rgba(37,99,235,0.08) 0%,transparent 70%)",
            filter: "blur(60px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 0, right: "10%",
            width: 400, height: 250, borderRadius: "50%",
            background: "radial-gradient(ellipse,rgba(139,92,246,0.07) 0%,transparent 70%)",
            filter: "blur(50px)", pointerEvents: "none" }} />

          <div style={{ height: 2, background: "linear-gradient(90deg,transparent,#3b82f6 25%,#06b6d4 50%,#8b5cf6 75%,transparent)" }} />

          <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 2 }} className="cta-inner footer-top">

            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                  background: "linear-gradient(135deg,#2563eb,#7c3aed)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 16px rgba(37,99,235,0.4)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                    <rect x="4" y="4" width="16" height="16" rx="2"/>
                    <line x1="9" y1="4" x2="9" y2="20"/><line x1="15" y1="4" x2="15" y2="20"/>
                    <line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/>
                  </svg>
                </div>
                <div>
                  <p style={{ color: "#fff", fontWeight: 800, fontSize: 17, margin: 0, letterSpacing: "-0.03em" }}>AurowinX</p>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, margin: 0, letterSpacing: "0.05em" }}>Technologies Pvt. Ltd.</p>
                </div>
              </div>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.75, margin: "0 0 28px", maxWidth: 300 }}>
                Engineering Today · Empowering Tomorrow. Silicon-proven ASIC, embedded systems &amp; IoT innovation from Chennai, India.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {FOOTER_CONTACT.map(({ icon, text }) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 13, width: 18, textAlign: "center" }}>{icon}</span>
                    <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}>{text}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 9, marginTop: 26 }}>
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.href} title={s.title}
                    style={{ width: 36, height: 36, borderRadius: 9,
                      background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700,
                      textDecoration: "none", transition: "all .2s",
                      fontFamily: "'JetBrains Mono',monospace" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(59,130,246,0.2)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.4)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                  >{s.label}</a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 18px" }}>Services</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {FOOTER_SERVICES.map(s => (
                  <a key={s} href="#"
                    style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, textDecoration: "none",
                      display: "flex", alignItems: "center", gap: 8, transition: "color .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#93c5fd"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
                  >
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#3b82f6",
                      display: "inline-block", flexShrink: 0 }} />
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 18px" }}>Company</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {FOOTER_COMPANY.map(s => (
                  <a key={s} href="#"
                    style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, textDecoration: "none",
                      display: "flex", alignItems: "center", gap: 8, transition: "color .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#93c5fd"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
                  >
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#8b5cf6",
                      display: "inline-block", flexShrink: 0 }} />
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 18px" }}>Stay Updated</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.65, margin: "0 0 18px" }}>
                Get the latest on semiconductor breakthroughs, embedded innovations &amp; AurowinX product launches.
              </p>
              <div className="newsletter-row" style={{ display: "flex", gap: 0, borderRadius: 10, overflow: "hidden",
                border: "1.5px solid rgba(59,130,246,0.25)", background: "rgba(255,255,255,0.04)" }}>
                <input placeholder="you@company.com" style={{
                  flex: 1, minWidth: 0, width: "100%", background: "transparent", border: "none", outline: "none",
                  color: "#fff", fontSize: 13, padding: "11px 14px",
                  fontFamily: "'Sora',sans-serif",
                }} />
                <button style={{
                  background: "linear-gradient(135deg,#2563eb,#7c3aed)",
                  border: "none", color: "#fff", fontWeight: 700, fontSize: 12,
                  padding: "11px 16px", cursor: "pointer", whiteSpace: "nowrap",
                  fontFamily: "'Sora',sans-serif", letterSpacing: "0.05em",
                  width: "100%",
                }}>Subscribe →</button>
              </div>
              <div style={{ marginTop: 24, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["ISO 9001","VLSI Certified","IPC Class II","RoHS"].map(b => (
                  <span key={b} style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    padding: "5px 10px", borderRadius: 6,
                    background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)",
                    color: "#93c5fd", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em",
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#3b82f6", display: "inline-block" }} />
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1rem, 4vw, 3rem)" }} className="cta-inner">
            <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />
          </div>

          <div style={{ maxWidth: 1280, margin: "0 auto" }} className="cta-inner footer-bottom">
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, margin: 0 }}>
              © {new Date().getFullYear()} AurowinX Technologies Pvt. Ltd. · Chennai, Tamil Nadu, India · All rights reserved.
            </p>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {["Privacy Policy","Terms of Use","Sitemap"].map(l => (
                <a key={l} href="#"
                  style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, textDecoration: "none", transition: "color .2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.2)"}
                >{l}</a>
              ))}
            </div>
            <p style={{ color: "rgba(255,255,255,0.12)", fontSize: 11, margin: 0, fontFamily: "'JetBrains Mono',monospace" }}>
              v2.4.1 · build_2025
            </p>
          </div>

          <div style={{ height: "1.5px", background: "linear-gradient(90deg,transparent,#2563eb 25%,#06b6d4 50%,#7c3aed 75%,transparent)" }} />
        </footer>

      </section>
    </>
  );
}
