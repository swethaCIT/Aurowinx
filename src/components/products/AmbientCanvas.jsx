// src/components/products/AmbientCanvas.jsx
// Full-bleed ambient Three.js particle field + wireframe sphere — used as a
// low-opacity background layer so sections get 3D motion without needing a
// dedicated visual column (keeps layouts compact / one-screen-fit).

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AmbientCanvas({ colors = ["#4f46e5", "#7c3aed", "#6366f1"], opacity = 0.5 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth, H = el.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    // On narrow/tall containers (mobile portrait) a fixed camera distance makes
    // world-space objects appear blown up, since the horizontal frustum narrows
    // with aspect. Push the camera back proportionally to keep apparent size
    // consistent across aspect ratios instead of just on wide desktop screens.
    const baseZ = 5;
    camera.position.set(0, 0, Math.max(baseZ, baseZ / Math.max(W / H, 0.001)));
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const COUNT = 1000;
    const positions = new Float32Array(COUNT * 3);
    const colorArr = new Float32Array(COUNT * 3);
    const c1 = new THREE.Color(colors[0]);
    const c2 = new THREE.Color(colors[1]);
    const c3 = new THREE.Color(colors[2] || colors[0]);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 13;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      const t = Math.random();
      const col = t < 0.5 ? c1.clone().lerp(c2, t * 2) : c2.clone().lerp(c3, (t - 0.5) * 2);
      colorArr[i * 3] = col.r; colorArr[i * 3 + 1] = col.g; colorArr[i * 3 + 2] = col.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colorArr, 3));
    const mat = new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.75, sizeAttenuation: true });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 24, 24),
      new THREE.MeshBasicMaterial({ color: colors[0], transparent: true, opacity: 0.12, wireframe: true })
    );
    scene.add(sphere);
    const outer = new THREE.Mesh(
      new THREE.SphereGeometry(2.1, 16, 16),
      new THREE.MeshBasicMaterial({ color: colors[1], transparent: true, opacity: 0.06, wireframe: true })
    );
    scene.add(outer);

    let frame = null, t = 0, visible = true;
    const animate = () => {
      frame = requestAnimationFrame(animate); t += 0.003;
      points.rotation.y = t * 0.1; points.rotation.x = Math.sin(t * 0.2) * 0.06;
      sphere.rotation.y = t * 0.5; sphere.rotation.x = t * 0.25;
      outer.rotation.y = -t * 0.3; outer.rotation.z = t * 0.15;
      renderer.render(scene, camera);
    };
    animate();

    // Pause the render loop while scrolled off-screen — this scene runs
    // continuously otherwise, and stacked with the other WebGL/canvas
    // sections on this page, that's a steady main-thread/GPU load that
    // makes scrolling stutter even when this section isn't visible.
    const io = new IntersectionObserver(([entry]) => {
      const nowVisible = entry.isIntersecting;
      if (nowVisible && !visible) { visible = true; if (frame === null) animate(); }
      else if (!nowVisible && visible) { visible = false; if (frame !== null) { cancelAnimationFrame(frame); frame = null; } }
    }, { threshold: 0 });
    io.observe(el);

    const onResize = () => {
      const W2 = el.clientWidth, H2 = el.clientHeight;
      camera.aspect = W2 / H2;
      camera.position.z = Math.max(baseZ, baseZ / Math.max(W2 / H2, 0.001));
      camera.updateProjectionMatrix();
      renderer.setSize(W2, H2);
    };
    window.addEventListener("resize", onResize);
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [colors]);

  return <div ref={mountRef} style={{ position: "absolute", inset: 0, opacity, pointerEvents: "none" }} />;
}
