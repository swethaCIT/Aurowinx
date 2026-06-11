// src/components/products/ProductEngineering.jsx
// Glow text + glass cards + tight spacing — theme.js aligned

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import {
  Cpu, Layers, Zap, Shield,
  PackageCheck, ChevronLeft, ChevronRight,
} from "lucide-react";
import { C, FONT, EASE } from "./theme";

/* ── GLOW HELPERS ── */
const glowText = (color = "#4f46e5", blur = 18) =>
  `0 0 ${blur}px ${color}99, 0 0 ${blur * 2}px ${color}44`;

const glassCard = {
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(79,70,229,0.18)",
  boxShadow: "0 4px 24px rgba(79,70,229,0.10), inset 0 1px 0 rgba(255,255,255,0.80)",
};

const glassCardHover = {
  background: "rgba(255,255,255,0.75)",
  border: "1px solid rgba(79,70,229,0.32)",
  boxShadow: "0 8px 32px rgba(79,70,229,0.18), inset 0 1px 0 rgba(255,255,255,0.90), 0 0 0 1px rgba(99,102,241,0.12)",
};

const FEATURES = [
  { icon: Layers,       title: "System Architecture",       body: "Full hardware stack design from concept — block diagrams, BOM strategy, and architecture reviews before a single component is sourced." },
  { icon: Cpu,          title: "EVT / DVT / PVT Cycles",    body: "Structured validation cycles that catch failures early — engineering, design, and production verification tightly managed." },
  { icon: Zap,          title: "Rapid Prototyping",          body: "From sketch to functional prototype in weeks, not months. In-house fabrication pipeline cuts iteration time drastically." },
  { icon: Shield,       title: "Compliance & Certification", body: "CE, FCC, BIS readiness baked in from day one — not bolted on at the end. Reduces re-spin risk significantly." },
  { icon: PackageCheck, title: "Mass Production Readiness",  body: "DFM analysis, supplier qualification, and yield optimisation ensuring seamless transition from proto to high-volume manufacturing." },
];

/* ══ THREE.JS CANVAS ══ */
function PCBCanvas() {
  const mountRef = useRef(null);
  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth, H = el.clientHeight;
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.set(0, 0, 5);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const COUNT = 1800;
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);
    const sizes     = new Float32Array(COUNT);
    const c1 = new THREE.Color("#4f46e5");
    const c2 = new THREE.Color("#7c3aed");
    const c3 = new THREE.Color("#6366f1");
    for (let i = 0; i < COUNT; i++) {
      positions[i*3]   = (Math.random()-0.5)*9;
      positions[i*3+1] = (Math.random()-0.5)*9;
      positions[i*3+2] = (Math.random()-0.5)*3;
      const t = Math.random();
      const col = t < 0.5 ? c1.clone().lerp(c2, t*2) : c2.clone().lerp(c3, (t-0.5)*2);
      colors[i*3]=col.r; colors[i*3+1]=col.g; colors[i*3+2]=col.b;
      sizes[i] = Math.random()*3+1;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size",     new THREE.BufferAttribute(sizes, 1));
    const mat = new THREE.PointsMaterial({ size:0.045, vertexColors:true, transparent:true, opacity:0.85, sizeAttenuation:true });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const lineMat = new THREE.LineBasicMaterial({ color:"#4f46e5", transparent:true, opacity:0.14 });
    for (let i = 0; i < 60; i++) {
      const lineGeo = new THREE.BufferGeometry();
      const x1=(Math.random()-0.5)*8, y1=(Math.random()-0.5)*8;
      const x2=x1+(Math.random()-0.5)*2, y2=y1+(Math.random()-0.5)*2;
      lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array([x1,y1,0,x2,y2,0]),3));
      scene.add(new THREE.Line(lineGeo, lineMat));
    }
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.55,32,32), new THREE.MeshBasicMaterial({ color:"#4f46e5", transparent:true, opacity:0.22, wireframe:true }));
    scene.add(sphere);
    const outer  = new THREE.Mesh(new THREE.SphereGeometry(0.9,16,16),  new THREE.MeshBasicMaterial({ color:"#7c3aed", transparent:true, opacity:0.10, wireframe:true }));
    scene.add(outer);

    let frame, t=0;
    const animate = () => {
      frame = requestAnimationFrame(animate); t+=0.004;
      points.rotation.y=t*0.12; points.rotation.x=Math.sin(t*0.3)*0.08;
      sphere.rotation.y=t*0.6;  sphere.rotation.x=t*0.3;
      outer.rotation.y=-t*0.4;  outer.rotation.z=t*0.2;
      mat.opacity = 0.70+Math.sin(t*1.2)*0.15;
      renderer.render(scene, camera);
    };
    animate();
    const onResize = () => { const W2=el.clientWidth,H2=el.clientHeight; camera.aspect=W2/H2; camera.updateProjectionMatrix(); renderer.setSize(W2,H2); };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize",onResize); renderer.dispose(); if(el.contains(renderer.domElement))el.removeChild(renderer.domElement); };
  }, []);
  return <div ref={mountRef} style={{ width:"100%", height:"100%", position:"absolute", inset:0 }} />;
}

/* ══ MOBILE CAROUSEL ══ */
function FeatureCarousel() {
  const [idx, setIdx] = useState(0);
  const total = FEATURES.length;
  const item = FEATURES[idx];
  const Icon = item.icon;
  return (
    <div style={{ width:"100%", position:"relative" }}>
      <AnimatePresence mode="wait">
        <motion.div key={idx}
          initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}}
          transition={{duration:0.35,ease:EASE}}
          style={{ ...glassCard, borderRadius:16, padding:"20px 18px" }}>
          <div style={{ width:40,height:40,borderRadius:10,background:"rgba(79,70,229,0.10)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12,
            boxShadow:"0 0 16px rgba(79,70,229,0.25)" }}>
            <Icon style={{ width:18,height:18,color:"#4f46e5",filter:"drop-shadow(0 0 4px #4f46e599)" }} strokeWidth={1.8} />
          </div>
          <h4 style={{ margin:"0 0 6px",fontSize:15,fontWeight:700,color:"#0f172a",fontFamily:FONT,
            textShadow:"0 0 12px rgba(79,70,229,0.25)" }}>{item.title}</h4>
          <p style={{ margin:0,fontSize:13,lineHeight:1.7,color:"#475569",fontFamily:FONT }}>{item.body}</p>
        </motion.div>
      </AnimatePresence>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:14 }}>
        <div style={{ display:"flex",gap:5 }}>
          {FEATURES.map((_,i)=>(
            <button key={i} onClick={()=>setIdx(i)} style={{ width:i===idx?18:5,height:5,borderRadius:3,border:"none",cursor:"pointer",background:i===idx?"#4f46e5":"#c7d2fe",transition:"all 0.3s ease",padding:0 }} />
          ))}
        </div>
        <div style={{ display:"flex",gap:6 }}>
          {[{icon:ChevronLeft,fn:()=>setIdx(i=>(i-1+total)%total)},{icon:ChevronRight,fn:()=>setIdx(i=>(i+1)%total)}].map(({icon:Ic,fn},i)=>(
            <button key={i} onClick={fn} style={{ width:32,height:32,borderRadius:"50%",...glassCard,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#4f46e5" }}>
              <Ic style={{ width:14,height:14 }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══ MAIN EXPORT ══ */
export default function ProductEngineering() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once:true, margin:"-80px" });
  const mx=useMotionValue(0), my=useMotionValue(0);
  const rx=useSpring(my,{stiffness:80,damping:18}), ry=useSpring(mx,{stiffness:80,damping:18});
  const handleMouseMove = (e) => {
    const r = sectionRef.current?.getBoundingClientRect();
    if(!r) return;
    mx.set(((e.clientX-r.left-r.width/2)/r.width)*8);
    my.set(((e.clientY-r.top-r.height/2)/r.height)*-8);
  };
  const handleMouseLeave = () => { mx.set(0); my.set(0); };

  return (
    <section id="product-engineering" ref={sectionRef}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{
        position:"relative", minHeight:"100vh",
        background:"linear-gradient(160deg,#eef2ff 0%,#f5f3ff 40%,#faf5ff 100%)",
        overflow:"hidden", display:"flex", alignItems:"center", fontFamily:FONT,
      }}>

      {/* BG dot grid */}
      <div style={{ position:"absolute",inset:0,pointerEvents:"none",zIndex:0,
        backgroundImage:"radial-gradient(circle,rgba(79,70,229,0.07) 1px,transparent 1px)",
        backgroundSize:"28px 28px" }} />

      {/* Ambient blobs */}
      <div style={{ position:"absolute",top:"10%",left:"55%",width:"40vw",height:"40vw",borderRadius:"50%",
        background:"radial-gradient(circle,rgba(79,70,229,0.12) 0%,transparent 70%)",pointerEvents:"none",zIndex:0 }} />
      <div style={{ position:"absolute",bottom:"10%",left:"5%",width:"25vw",height:"25vw",borderRadius:"50%",
        background:"radial-gradient(circle,rgba(124,58,237,0.08) 0%,transparent 70%)",pointerEvents:"none",zIndex:0 }} />

      {/* ══ INNER ══ */}
      <div className="pe-inner" style={{
        position:"relative",zIndex:1,width:"100%",maxWidth:1280,margin:"0 auto",
        padding:"90px 48px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:56,alignItems:"center",
      }}>

        {/* ── LEFT ── */}
        <div>

          {/* Badge */}
          <motion.div initial={{opacity:0,y:-12}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.5,ease:EASE}}
            style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"5px 14px",borderRadius:50,marginBottom:20,
              ...glassCard }}>
            <motion.span animate={{scale:[1,1.7,1],opacity:[1,0.3,1]}} transition={{duration:2.2,repeat:Infinity}}
              style={{ width:6,height:6,borderRadius:"50%",background:"#4f46e5",display:"inline-block",
                boxShadow:"0 0 8px #4f46e5" }} />
            <span style={{ color:"#3730a3",fontSize:10,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",
              textShadow:"0 0 10px rgba(79,70,229,0.40)" }}>
              Coming Soon — AUROWINX
            </span>
          </motion.div>

          {/* Eyebrow */}
          <motion.p initial={{opacity:0,x:-20}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.5,delay:0.08,ease:EASE}}
            style={{ margin:"0 0 10px",fontSize:11,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",
              color:"#6366f1",display:"flex",alignItems:"center",gap:10,
              textShadow:"0 0 14px rgba(99,102,241,0.50)" }}>
            <span style={{ width:24,height:1,background:"#4f46e5",opacity:0.6,boxShadow:"0 0 6px #4f46e5" }} />
            Product Engineering
          </motion.p>

          {/* Heading */}
          <motion.h2 initial={{opacity:0,y:32}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.75,delay:0.14,ease:EASE}}
            style={{ margin:"0 0 16px",fontSize:"clamp(2.2rem,4.5vw,3.6rem)",fontWeight:900,lineHeight:1.0,
              letterSpacing:"-0.04em",color:"#0f172a" }}>
            Concept to<br />
            <span style={{
              background:"linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%)",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
              filter:"drop-shadow(0 0 18px rgba(79,70,229,0.55))",
            }}>
              Production.
            </span>
          </motion.h2>

          {/* Body */}
          <motion.p initial={{opacity:0,y:18}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.65,delay:0.22}}
            style={{ margin:"0 0 24px",fontSize:"clamp(0.92rem,1.4vw,1.02rem)",lineHeight:1.80,color:"#475569",maxWidth:480 }}>
            End-to-end hardware product lifecycle management — from the first block diagram to mass-production handoff.
            AUROWINX handles architecture, prototyping, validation cycles, and manufacturing readiness so your product ships right, the first time.
          </motion.p>

          {/* Desktop features — NO gaps, stacked flush */}
          <motion.div className="pe-features-desktop"
            initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.30}}
            style={{ display:"flex",flexDirection:"column",borderRadius:16,overflow:"hidden",
              border:"1px solid rgba(79,70,229,0.16)",
              boxShadow:"0 4px 24px rgba(79,70,229,0.08), inset 0 1px 0 rgba(255,255,255,0.80)",
            }}>
            {FEATURES.map((f,i) => {
              const Icon = f.icon;
              const isLast = i === FEATURES.length - 1;
              return (
                <motion.div key={f.title}
                  initial={{opacity:0,x:-24}} animate={inView?{opacity:1,x:0}:{}}
                  transition={{duration:0.5,delay:0.34+i*0.07,ease:EASE}}
                  style={{
                    display:"flex",alignItems:"flex-start",gap:12,
                    padding:"13px 16px",
                    background:"rgba(255,255,255,0.55)",
                    backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",
                    borderBottom: isLast ? "none" : "1px solid rgba(79,70,229,0.10)",
                    transition:"background 0.2s",cursor:"default",
                  }}
                  whileHover={{ background:"rgba(238,242,255,0.85)" }}>
                  <div style={{ width:32,height:32,borderRadius:8,flexShrink:0,
                    background:"rgba(79,70,229,0.08)",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    boxShadow:"0 0 12px rgba(79,70,229,0.18)" }}>
                    <Icon style={{ width:14,height:14,color:"#4f46e5",
                      filter:"drop-shadow(0 0 3px rgba(79,70,229,0.70))" }} strokeWidth={1.8} />
                  </div>
                  <div>
                    <p style={{ margin:"0 0 2px",fontSize:13,fontWeight:700,color:"#1e1b4b",
                      textShadow:"0 0 10px rgba(79,70,229,0.18)" }}>{f.title}</p>
                    <p style={{ margin:0,fontSize:12,lineHeight:1.60,color:"#64748b" }}>{f.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Mobile carousel */}
          <div className="pe-features-mobile" style={{ display:"none" }}>
            <FeatureCarousel />
          </div>

          {/* Notify strip */}
          <motion.div initial={{opacity:0,y:12}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.70}}
            style={{ marginTop:12,padding:"11px 16px",borderRadius:12, ...glassCard,
              display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap" }}>
            <p style={{ margin:0,fontSize:12,color:"#94a3b8" }}>
              Hardware PLM · EVT/DVT/PVT · DFM · Mass Production
            </p>
            <div style={{ display:"flex",alignItems:"center",gap:5,fontSize:11,fontWeight:700,
              color:"#4f46e5",letterSpacing:"0.06em",textShadow:"0 0 10px rgba(79,70,229,0.45)" }}>
              <motion.span animate={{scale:[1,1.5,1],opacity:[1,0.4,1]}} transition={{duration:2,repeat:Infinity}}
                style={{ width:5,height:5,borderRadius:"50%",background:"#16a34a",
                  boxShadow:"0 0 6px #16a34a",display:"inline-block" }} />
              In Development
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT — Three.js ── */}
        <motion.div style={{ rotateX:rx,rotateY:ry,perspective:1000 }}
          initial={{opacity:0,scale:0.92}} animate={inView?{opacity:1,scale:1}:{}}
          transition={{duration:0.9,delay:0.18,ease:EASE}}>

          <div className="pe-canvas-wrap" style={{
            position:"relative",width:"100%",aspectRatio:"1/1",borderRadius:24,overflow:"hidden",
            border:"1px solid rgba(79,70,229,0.20)",
            boxShadow:"0 0 0 1px rgba(99,102,241,0.08), 0 24px 64px rgba(79,70,229,0.20), 0 8px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.80)",
            background:"linear-gradient(135deg,#eef2ff 0%,#f5f3ff 100%)",
            backdropFilter:"blur(8px)",
          }}>
            <PCBCanvas />

            {/* Bottom overlay */}
            <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"36px 24px 22px",
              background:"linear-gradient(0deg,rgba(238,242,255,0.96) 0%,transparent 100%)",zIndex:2 }}>
              <p style={{ margin:"0 0 3px",fontSize:10,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",
                color:"#6366f1",textShadow:"0 0 12px rgba(99,102,241,0.55)" }}>
                End-to-End Hardware PLM
              </p>
              <p style={{ margin:0,fontSize:20,fontWeight:900,color:"#1e1b4b",letterSpacing:"-0.03em",
                textShadow:"0 0 20px rgba(79,70,229,0.25)" }}>
                From Sketch to Ship
              </p>
            </div>

            {/* Corner tag */}
            <div style={{ position:"absolute",top:16,right:16,zIndex:2,padding:"4px 10px",borderRadius:50,
              ...glassCard,fontSize:9,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",
              color:"#3730a3",textShadow:"0 0 8px rgba(55,48,163,0.35)" }}>
              Product Eng.
            </div>
          </div>

          {/* Stat row — glass, no gaps */}
          <motion.div initial={{opacity:0,y:14}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.55}}
            style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",marginTop:12,
              borderRadius:14,overflow:"hidden",
              border:"1px solid rgba(79,70,229,0.16)",
              boxShadow:"0 4px 16px rgba(79,70,229,0.08), inset 0 1px 0 rgba(255,255,255,0.80)",
            }}>
            {[{val:"E2E",label:"Ownership"},{val:"3×",label:"Faster Cycles"},{val:"DFM",label:"Ready"}].map((s,i)=>(
              <div key={i} style={{ textAlign:"center",padding:"13px 8px",
                background:"rgba(255,255,255,0.55)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",
                borderRight: i < 2 ? "1px solid rgba(79,70,229,0.10)" : "none" }}>
                <p style={{ margin:0,fontSize:19,fontWeight:900,color:"#4f46e5",letterSpacing:"-0.03em",
                  textShadow:"0 0 16px rgba(79,70,229,0.45)" }}>{s.val}</p>
                <p style={{ margin:"2px 0 0",fontSize:9,fontWeight:600,color:"#94a3b8",
                  letterSpacing:"0.08em",textTransform:"uppercase" }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width:1024px){
          .pe-inner{grid-template-columns:1fr!important;padding:72px 32px!important;gap:40px!important}
          .pe-canvas-wrap{aspect-ratio:16/9!important;max-height:340px}
        }
        @media (max-width:768px){
          .pe-inner{padding:64px 20px!important;gap:32px!important}
          .pe-features-desktop{display:none!important}
          .pe-features-mobile{display:block!important}
          .pe-canvas-wrap{aspect-ratio:4/3!important}
        }
        @media (max-width:480px){.pe-inner{padding:56px 16px!important}}
        @media (min-width:1920px){.pe-inner{max-width:1600px!important;padding:110px 80px!important}}
      `}</style>
    </section>
  );
}