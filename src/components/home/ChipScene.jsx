// src/components/home/ChipScene.jsx
// Split out of CTASection.jsx so three.js (the heaviest dependency in the
// app) lives in its own chunk and is only fetched when this scene actually
// renders, instead of shipping in every page that pulls in CTASection.

import { useRef, useEffect } from "react";
import * as THREE from "three";

/* ════════════════════════════════════════════════════════
   THREE.JS — REAL CHIP / PCB 3D SCENE
   • Central flat chip die with bond-wire arcs
   • PCB substrate plane with circuit trace lines
   • Floating solder-ball BGA grid
   • Orbiting data-packet spheres
   • Particles
════════════════════════════════════════════════════════ */
export default function ChipScene() {
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
    let raf = null, lastPulse = 0, visible = true;
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

    // Pause the render loop while this hero canvas is scrolled off-screen —
    // it's a full WebGL scene with bond-wire lines, a BGA ball grid, and
    // orbiting particles rendered on every frame; left running unconditionally
    // it competes with the page's other 3D sections for the main thread even
    // when nobody can see it, which shows up as scroll stutter elsewhere.
    const io = new IntersectionObserver(([entry]) => {
      const nowVisible = entry.isIntersecting;
      if (nowVisible && !visible) { visible = true; if (raf === null) animate(); }
      else if (!nowVisible && visible) { visible = false; if (raf !== null) { cancelAnimationFrame(raf); raf = null; } }
    }, { threshold: 0 });
    io.observe(el);

    const onResize = () => {
      if (!el) return;
      const w = el.clientWidth, h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      io.disconnect();
      timer.dispose();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: "absolute", inset: 0, zIndex: 0 }} />;
}
