import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { C, FONT, EASE } from "././theme";

const TICKER = [
  "DFT Engineering","RTL Synthesis","Physical Design","ASIC Tape-out",
  "STA & Timing Closure","Formal Verification","ATPG & Fault Coverage",
  "Power Analysis","Floor Planning","Clock Tree Synthesis",
];

const FEATURES = [
  {
    num:"01", label:"Silicon Mastery",
    heading:"End-to-end ownership\nof cutting-edge DFT & RTL",
    detail:"From spec to tape-out — every decision is yours. Sub-5nm physical design challenges that most engineers only read about.",
    stat:"12+", statLabel:"tape-outs / year",
  },
  {
    num:"02", label:"Deep Mentorship",
    heading:"Principal engineers who\nactively invest in you",
    detail:"Weekly 1:1s with engineers who shipped silicon to billions of devices. Your growth is a KPI, not an afterthought.",
    stat:"94%", statLabel:"internal promotions",
  },
  {
    num:"03", label:"Structured Growth",
    heading:"Certifications, talks\n& clear career ladders",
    detail:"EDA mastery programs, conference budgets, and published growth tracks so you always know what's next.",
    stat:"3×", statLabel:"faster progression",
  },
  {
    num:"04", label:"Real-World Impact",
    heading:"Your silicon ships in\nconsumer & industrial products",
    detail:"ICs you verify and route end up in automotive controllers, flagship SoCs, and smart infrastructure worldwide.",
    stat:"4B+", statLabel:"devices powered",
  },
];

function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div style={{ overflow:"hidden", borderBottom:`1px solid #c7d2fe`, padding:"10px 0", background:"#eef2ff" }}>
      <style>{`@keyframes tk{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.tt{display:flex;width:max-content;animation:tk 28s linear infinite}.tt:hover{animation-play-state:paused}`}</style>
      <div className="tt" aria-hidden="true">
        {items.map((t, i) => (
          <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:16, paddingRight:30,
            fontFamily:FONT, fontWeight:500, fontSize:".72rem", letterSpacing:"1.5px",
            textTransform:"uppercase", color:"#4f46e5", whiteSpace:"nowrap" }}>
            {t}
            <svg width="3" height="3" viewBox="0 0 3 3"><circle cx="1.5" cy="1.5" r="1.5" fill="#818cf8"/></svg>
          </span>
        ))}
      </div>
    </div>
  );
}

function FeatureRow({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, y:16 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.5, delay:index*0.06, ease:EASE }}
      className="frow"
      style={{
        display:"grid", gridTemplateColumns:"1fr 1fr",
        borderBottom:"1px solid #c7d2fe", position:"relative",
        background: index % 2 === 0 ? "#ffffff" : "#f8fafc",
        transition:"background .2s",
      }}
      onMouseEnter={e => { e.currentTarget.style.background="#eef2ff"; e.currentTarget.querySelector(".fbar").style.transform="scaleX(1)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = index%2===0?"#ffffff":"#f8fafc"; e.currentTarget.querySelector(".fbar").style.transform="scaleX(0)"; }}
    >
      <style>{`.fbar{position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#4f46e5,#7c3aed);transform:scaleX(0);transform-origin:left;transition:transform .35s cubic-bezier(.22,1,.36,1);pointer-events:none}@media(max-width:600px){.frow{grid-template-columns:1fr!important}.frow>div:first-child{border-right:none!important;border-bottom:1px solid #c7d2fe!important}}`}</style>
      <div className="fbar" />

      {/* Left */}
      <div style={{ padding:"20px clamp(16px,3vw,44px)", borderRight:"1px solid #c7d2fe",
        display:"flex", flexDirection:"column", gap:10, justifyContent:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontFamily:FONT, fontWeight:800, fontSize:".6rem", letterSpacing:"2.8px",
            textTransform:"uppercase", color:"#4f46e5" }}>{item.num}</span>
          <div style={{ flex:1, height:1, background:"linear-gradient(90deg,#c7d2fe,transparent)" }} />
          <span style={{ fontFamily:FONT, fontWeight:600, fontSize:".62rem", letterSpacing:"1.6px",
            textTransform:"uppercase", color:"#94a3b8" }}>{item.label}</span>
        </div>
        <h3 style={{ fontFamily:FONT, fontWeight:700, fontSize:"clamp(1rem,1.9vw,1.3rem)",
          color:"#0f172a", lineHeight:1.25, letterSpacing:"-.35px", whiteSpace:"pre-line" }}>
          {item.heading}
        </h3>
        <p style={{ fontFamily:FONT, fontSize:"clamp(.78rem,.92vw,.86rem)", color:"#475569",
          lineHeight:1.72, maxWidth:400, margin:0 }}>
          {item.detail}
        </p>
      </div>

      {/* Right */}
      <div style={{ padding:"20px clamp(16px,3vw,44px)", display:"flex", alignItems:"center",
        justifyContent:"flex-end", position:"relative", overflow:"hidden" }}>
        <span aria-hidden="true" style={{ position:"absolute", right:-8, bottom:-10,
          fontFamily:FONT, fontWeight:900, fontSize:"clamp(5rem,10vw,8rem)", lineHeight:1,
          letterSpacing:-4, color: index%2===0?"#f1f5f9":"#e8edf2",
          userSelect:"none", pointerEvents:"none" }}>{item.num}</span>
        <div style={{ position:"relative", zIndex:1, textAlign:"right" }}>
          <div style={{ fontFamily:FONT, fontWeight:800, fontSize:"clamp(2rem,4vw,3rem)",
            lineHeight:1, letterSpacing:"-1.5px", background:"linear-gradient(135deg,#4f46e5,#7c3aed)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            marginBottom:4 }}>{item.stat}</div>
          <div style={{ fontFamily:FONT, fontSize:".63rem", fontWeight:600, letterSpacing:"1.3px",
            textTransform:"uppercase", color:"#94a3b8", maxWidth:110, marginLeft:"auto", lineHeight:1.4 }}>
            {item.statLabel}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function WhyJoin() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section id="life-at-aurowinx" style={{ background:"#ffffff", overflow:"hidden" }}>

      {/* Header */}
      <div ref={ref} style={{ background:"#eef2ff", borderBottom:"1px solid #c7d2fe",
        padding:"36px clamp(18px,4vw,56px) 28px", position:"relative", overflow:"hidden" }}>
        <div aria-hidden="true" style={{ position:"absolute", right:-60, top:-80, width:340, height:340,
          borderRadius:"50%", background:"radial-gradient(circle,#c7d2fe 0%,transparent 65%)",
          opacity:.5, pointerEvents:"none" }} />

        <div style={{ maxWidth:1100, margin:"0 auto", display:"grid",
          gridTemplateColumns:"1fr auto", gap:"clamp(20px,4vw,56px)", alignItems:"center", position:"relative", zIndex:1 }}>
          <div>
            <motion.div initial={{ opacity:0, y:14 }} animate={inView?{opacity:1,y:0}:{}}
              transition={{ duration:.5, ease:EASE }}
              style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
              <motion.span initial={{ scaleX:0 }} animate={inView?{scaleX:1}:{}}
                transition={{ duration:.6, delay:.15, ease:EASE }}
                style={{ display:"block", width:28, height:2,
                  background:"linear-gradient(90deg,#4f46e5,#7c3aed)", borderRadius:2,
                  transformOrigin:"left", flexShrink:0 }} />
              <span style={{ fontFamily:FONT, fontWeight:700, fontSize:".64rem", letterSpacing:"2.4px",
                textTransform:"uppercase", color:"#4f46e5" }}>Life at AurowinX</span>
            </motion.div>

            <motion.h2 initial={{ opacity:0, y:18 }} animate={inView?{opacity:1,y:0}:{}}
              transition={{ duration:.5, delay:.1, ease:EASE }}
              style={{ fontFamily:FONT, fontWeight:800,
                fontSize:"clamp(1.75rem,4vw,2.9rem)", color:"#0f172a",
                lineHeight:1.1, letterSpacing:-1, marginBottom:10 }}>
              Why engineers{" "}
              <span style={{ background:C.gradPrimary, WebkitBackgroundClip:"text",
                WebkitTextFillColor:"transparent", backgroundClip:"text" }}>choose AurowinX</span>
            </motion.h2>

            <motion.p initial={{ opacity:0, y:14 }} animate={inView?{opacity:1,y:0}:{}}
              transition={{ duration:.5, delay:.18, ease:EASE }}
              style={{ fontFamily:FONT, fontSize:"clamp(.82rem,1vw,.92rem)", color:"#475569",
                lineHeight:1.7, maxWidth:460 }}>
              Silicon from first principles. Craft, depth, and work that ships at scale.
            </motion.p>
          </div>

          <motion.div initial={{ opacity:0, x:16 }} animate={inView?{opacity:1,x:0}:{}}
            transition={{ duration:.5, delay:.22, ease:EASE }}
            style={{ display:"flex", gap:32, alignItems:"center", flexShrink:0 }}>
            {[["250+","engineers"],["18yr","heritage"]].map(([v,l],i) => (
              <div key={l} style={{ textAlign:"right", ...(i===0?{paddingRight:32,borderRight:"1px solid #c7d2fe"}:{}) }}>
                <div style={{ fontFamily:FONT, fontWeight:800, fontSize:"clamp(1.6rem,2.5vw,2.1rem)",
                  letterSpacing:-1, lineHeight:1, background:C.gradPrimary,
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>{v}</div>
                <div style={{ fontFamily:FONT, fontSize:".65rem", fontWeight:600, letterSpacing:"1.5px",
                  textTransform:"uppercase", color:"#94a3b8", marginTop:3 }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <Ticker />

      <div style={{ borderTop:"1px solid #c7d2fe" }}>
        {FEATURES.map((item, i) => <FeatureRow key={item.num} item={item} index={i} />)}
      </div>

      {/* CTA strip */}
      <div style={{ background:"#0f172a", padding:"24px clamp(18px,4vw,56px)",
        display:"flex", alignItems:"center", justifyContent:"space-between", gap:20, flexWrap:"wrap" }}>
        <div>
          <div style={{ fontFamily:FONT, fontWeight:800, fontSize:"clamp(1rem,2.2vw,1.45rem)",
            color:"#fff", letterSpacing:"-.4px", lineHeight:1.2 }}>
            Ready to build something{" "}
            <span style={{ background:C.gradPrimary, WebkitBackgroundClip:"text",
              WebkitTextFillColor:"transparent", backgroundClip:"text" }}>that matters?</span>
          </div>
          <p style={{ fontFamily:FONT, fontSize:".78rem", color:"#64748b", marginTop:4 }}>
            Open roles in DFT, RTL, Physical Design and more.
          </p>
        </div>
        <div style={{ display:"flex", gap:8, flexShrink:0 }}>
          <motion.button whileHover={{ opacity:.88 }} whileTap={{ scale:.97 }}
            style={{ fontFamily:FONT, fontWeight:700, fontSize:".78rem", letterSpacing:".4px",
              padding:"10px 22px", borderRadius:100, background:C.gradPrimary,
              color:"#fff", border:"none", cursor:"pointer" }}>
            View open roles →
          </motion.button>
          <motion.button whileHover={{ borderColor:"rgba(255,255,255,.5)" }} whileTap={{ scale:.97 }}
            style={{ fontFamily:FONT, fontWeight:600, fontSize:".78rem", padding:"10px 20px",
              borderRadius:100, background:"transparent", color:"#fff",
              border:"1px solid rgba(255,255,255,.2)", cursor:"pointer" }}>
            Life at AurowinX
          </motion.button>
        </div>
      </div>
    </section>
  );
}