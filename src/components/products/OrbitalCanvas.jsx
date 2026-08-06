// src/components/products/OrbitalCanvas.jsx
// R&D's 3D motion motif — an atomic/orbital system: a glowing wireframe core
// with three tilted rings, each carrying a traveling glowing node, plus sparse
// background dust for depth. Deliberately distinct from AmbientCanvas's drifting
// particle-field + static spheres (used by EngineeringServices) so the two
// sections don't feel like palette-swapped copies of the same visual.

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function OrbitalCanvas({ colors = ["#a78bfa", "#c4b5fd", "#7c3aed"], opacity = 0.6 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth, H = el.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.set(0, 1.1, 6.5);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Glowing wireframe core
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.5, 1),
      new THREE.MeshBasicMaterial({ color: colors[0], wireframe: true, transparent: true, opacity: 0.5 })
    );
    group.add(core);
    const coreGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.4, 16, 16),
      new THREE.MeshBasicMaterial({ color: colors[0], transparent: true, opacity: 0.16 })
    );
    group.add(coreGlow);

    // Tilted orbit rings, each with a traveling node
    const orbitDefs = [
      { radius: 1.6, tiltX: 0.35,  tiltZ: 0.12, speed: 0.006,  color: colors[0] },
      { radius: 2.15, tiltX: -0.55, tiltZ: 0.4,  speed: -0.0042, color: colors[1] },
      { radius: 2.7, tiltX: 0.18,  tiltZ: -0.6, speed: 0.0035, color: colors[2] },
    ];

    const orbits = orbitDefs.map((o) => {
      const pivot = new THREE.Group();
      pivot.rotation.x = o.tiltX;
      pivot.rotation.z = o.tiltZ;
      group.add(pivot);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(o.radius, 0.006, 8, 96),
        new THREE.MeshBasicMaterial({ color: o.color, transparent: true, opacity: 0.28 })
      );
      ring.rotation.x = Math.PI / 2;
      pivot.add(ring);

      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.065, 14, 14),
        new THREE.MeshBasicMaterial({ color: o.color, transparent: true, opacity: 0.95 })
      );
      pivot.add(node);

      return { pivot, node, radius: o.radius, speed: o.speed, angle: Math.random() * Math.PI * 2 };
    });

    // Sparse background dust for depth
    const COUNT = 260;
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
      color: colors[1], size: 0.028, transparent: true, opacity: 0.32, sizeAttenuation: true,
    }));
    scene.add(dust);

    let frame = null, t = 0, visible = true;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      t += 1;
      group.rotation.y = t * 0.0016;
      core.rotation.y = t * 0.012;
      core.rotation.x = t * 0.006;
      const pulse = 1 + Math.sin(t * 0.03) * 0.08;
      coreGlow.scale.setScalar(pulse);

      orbits.forEach((o) => {
        o.angle += o.speed;
        o.node.position.set(Math.cos(o.angle) * o.radius, 0, Math.sin(o.angle) * o.radius);
      });

      dust.rotation.y = t * 0.0004;
      renderer.render(scene, camera);
    };
    animate();

    // Pause while off-screen — see AmbientCanvas.jsx for why this matters here.
    const io = new IntersectionObserver(([entry]) => {
      const nowVisible = entry.isIntersecting;
      if (nowVisible && !visible) { visible = true; if (frame === null) animate(); }
      else if (!nowVisible && visible) { visible = false; if (frame !== null) { cancelAnimationFrame(frame); frame = null; } }
    }, { threshold: 0 });
    io.observe(el);

    const onResize = () => {
      const W2 = el.clientWidth, H2 = el.clientHeight;
      camera.aspect = W2 / H2; camera.updateProjectionMatrix();
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
