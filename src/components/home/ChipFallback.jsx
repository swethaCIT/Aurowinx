// src/components/home/ChipFallback.jsx
// Pure SVG chip illustration — no WebGL, no Three.js, no dependencies
// Drop inside any position:relative container

export default function ChipFallback() {
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes cfPulseBlock {
          0%,100% { opacity: 0.7; }
          50%      { opacity: 1;   }
        }
        @keyframes cfOrbitCW {
          from { transform: rotate(0deg)   translateX(0) rotate(0deg);   }
          to   { transform: rotate(360deg) translateX(0) rotate(-360deg);}
        }
        @keyframes cfOrbitCCW {
          from { transform: rotate(0deg)    translateX(0) rotate(0deg);  }
          to   { transform: rotate(-360deg) translateX(0) rotate(360deg);}
        }
        @keyframes cfBlink {
          0%,100% { opacity: 0.9; }
          50%      { opacity: 0.2; }
        }
        @keyframes cfTraceGlow {
          0%,100% { opacity: 0.22; }
          50%      { opacity: 0.55; }
        }

        /* logic block pulses — 9 staggered delays */
        .cf-lb0 { animation: cfPulseBlock 2s ease-in-out infinite 0.00s; }
        .cf-lb1 { animation: cfPulseBlock 2s ease-in-out infinite 0.22s; }
        .cf-lb2 { animation: cfPulseBlock 2s ease-in-out infinite 0.44s; }
        .cf-lb3 { animation: cfPulseBlock 2s ease-in-out infinite 0.66s; }
        .cf-lb4 { animation: cfPulseBlock 2s ease-in-out infinite 0.88s; }
        .cf-lb5 { animation: cfPulseBlock 2s ease-in-out infinite 1.10s; }
        .cf-lb6 { animation: cfPulseBlock 2s ease-in-out infinite 1.32s; }
        .cf-lb7 { animation: cfPulseBlock 2s ease-in-out infinite 1.54s; }
        .cf-lb8 { animation: cfPulseBlock 2s ease-in-out infinite 1.76s; }

        /* orbit wrappers — rotated around the chip centre (340,340) */
        .cf-orb1 {
          transform-origin: 340px 340px;
          animation: cfOrbitCW   8s  linear infinite;
        }
        .cf-orb2 {
          transform-origin: 340px 340px;
          animation: cfOrbitCCW  12s linear infinite;
        }
        .cf-orb3 {
          transform-origin: 340px 340px;
          animation: cfOrbitCW   6s  linear infinite;
        }
        .cf-orb4 {
          transform-origin: 340px 340px;
          animation: cfOrbitCCW  15s linear infinite;
        }

        /* blinking packets / LEDs */
        .cf-blink { animation: cfBlink      1.6s ease-in-out infinite; }

        /* animated PCB trace glow */
        .cf-tr  { animation: cfTraceGlow 2.4s ease-in-out infinite 0.0s; }
        .cf-tr2 { animation: cfTraceGlow 2.4s ease-in-out infinite 0.3s; }
        .cf-tr3 { animation: cfTraceGlow 2.4s ease-in-out infinite 0.6s; }
      `}</style>

      <svg
        width="100%"
        viewBox="0 0 680 680"
        xmlns="http://www.w3.org/2000/svg"
        style={{ maxWidth: 480, maxHeight: 480 }}
        role="img"
        aria-label="AurowinX chip illustration"
      >
        <rect x="90" y="90" width="500" height="500" rx="10"
          fill="#0a3d1e" stroke="#1a6b3a" strokeWidth="2"/>
        <rect x="96" y="96" width="488" height="488" rx="8"
          fill="none" stroke="#1d5c30" strokeWidth="1"/>

        <line x1="96" y1="130" x2="584" y2="130" stroke="#c8a000" strokeWidth="0.8" className="cf-tr"/>
        <line x1="96" y1="160" x2="584" y2="160" stroke="#c8a000" strokeWidth="0.8" className="cf-tr2"/>
        <line x1="96" y1="196" x2="584" y2="196" stroke="#c8a000" strokeWidth="0.8" className="cf-tr3"/>
        <line x1="96" y1="484" x2="584" y2="484" stroke="#c8a000" strokeWidth="0.8" className="cf-tr2"/>
        <line x1="96" y1="520" x2="584" y2="520" stroke="#c8a000" strokeWidth="0.8" className="cf-tr"/>
        <line x1="96" y1="550" x2="584" y2="550" stroke="#c8a000" strokeWidth="0.8" className="cf-tr3"/>
        <line x1="130" y1="96" x2="130" y2="584" stroke="#c8a000" strokeWidth="0.8" className="cf-tr2"/>
        <line x1="160" y1="96" x2="160" y2="584" stroke="#c8a000" strokeWidth="0.8" className="cf-tr3"/>
        <line x1="196" y1="96" x2="196" y2="584" stroke="#c8a000" strokeWidth="0.8" className="cf-tr"/>
        <line x1="484" y1="96" x2="484" y2="584" stroke="#c8a000" strokeWidth="0.8" className="cf-tr"/>
        <line x1="520" y1="96" x2="520" y2="584" stroke="#c8a000" strokeWidth="0.8" className="cf-tr2"/>
        <line x1="550" y1="96" x2="550" y2="584" stroke="#c8a000" strokeWidth="0.8" className="cf-tr3"/>

        {[[112,112],[568,112],[112,568],[568,568]].map(([cx,cy],i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="7" fill="#061408" stroke="#1a6b3a" strokeWidth="1.5"/>
            <circle cx={cx} cy={cy} r="3" fill="#0a3d1e"/>
          </g>
        ))}

        <rect x="210" y="100" width="18" height="9" rx="2" fill="#1a3a6a"/>
        <rect x="240" y="100" width="18" height="9" rx="2" fill="#2a2a2a"/>
        <rect x="270" y="100" width="9"  height="14" rx="2" fill="#1a3a6a"/>
        <rect x="340" y="100" width="18" height="9" rx="2" fill="#2a2a2a"/>
        <rect x="400" y="100" width="9"  height="14" rx="2" fill="#1a3a6a"/>
        <rect x="430" y="100" width="18" height="9" rx="2" fill="#2a2a2a"/>
        <rect x="210" y="571" width="18" height="9" rx="2" fill="#1a3a6a"/>
        <rect x="270" y="571" width="9"  height="14" rx="2" fill="#2a2a2a"/>
        <rect x="340" y="571" width="18" height="9" rx="2" fill="#1a3a6a"/>
        <rect x="430" y="571" width="18" height="9" rx="2" fill="#2a2a2a"/>
        <rect x="100" y="210" width="9"  height="18" rx="2" fill="#1a3a6a"/>
        <rect x="100" y="270" width="14" height="9"  rx="2" fill="#2a2a2a"/>
        <rect x="100" y="340" width="9"  height="18" rx="2" fill="#1a3a6a"/>
        <rect x="100" y="430" width="14" height="9"  rx="2" fill="#2a2a2a"/>
        <rect x="571" y="210" width="9"  height="18" rx="2" fill="#1a3a6a"/>
        <rect x="571" y="270" width="14" height="9"  rx="2" fill="#2a2a2a"/>
        <rect x="571" y="340" width="9"  height="18" rx="2" fill="#1a3a6a"/>
        <rect x="571" y="430" width="14" height="9"  rx="2" fill="#2a2a2a"/>

        <g fill="#b0b0c8" stroke="#888" strokeWidth="0.5">
          {[230,258,286,340,394,422,450].map(cx =>
            [230,258].map(cy => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" />)
          )}
          {[230,258,286,340,394,422,450].map(cx =>
            [422,450].map(cy => <circle key={`${cx}-${cy}b`} cx={cx} cy={cy} r="5" />)
          )}
          {[286,314,340,366,394].map(cy => (
            <g key={`lc${cy}`}>
              <circle cx="230" cy={cy} r="5" />
              <circle cx="450" cy={cy} r="5" />
            </g>
          ))}
        </g>

        <g stroke="#ffd700" strokeWidth="1" fill="none" opacity="0.7">
          <path d="M290,248 Q290,210 290,200"/>
          <path d="M315,248 Q315,205 315,196"/>
          <path d="M340,248 Q340,205 340,196"/>
          <path d="M365,248 Q365,205 365,196"/>
          <path d="M390,248 Q390,210 390,200"/>
          <path d="M290,432 Q290,470 290,480"/>
          <path d="M315,432 Q315,475 315,484"/>
          <path d="M340,432 Q340,475 340,484"/>
          <path d="M365,432 Q365,475 365,484"/>
          <path d="M390,432 Q390,470 390,480"/>
          <path d="M248,290 Q210,290 200,290"/>
          <path d="M248,315 Q205,315 196,315"/>
          <path d="M248,340 Q205,340 196,340"/>
          <path d="M248,365 Q205,365 196,365"/>
          <path d="M248,390 Q210,390 200,390"/>
          <path d="M432,290 Q470,290 480,290"/>
          <path d="M432,315 Q475,315 484,315"/>
          <path d="M432,340 Q475,340 484,340"/>
          <path d="M432,365 Q475,365 484,365"/>
          <path d="M432,390 Q470,390 480,390"/>
        </g>
        <g fill="#ffd700" opacity="0.6">
          {[
            [290,200],[315,196],[340,196],[365,196],[390,200],
            [290,480],[315,484],[340,484],[365,484],[390,480],
            [200,290],[196,315],[196,340],[196,365],[200,390],
            [480,290],[484,315],[484,340],[484,365],[480,390],
          ].map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r="3" />)}
        </g>

        <rect x="245" y="245" width="190" height="190" rx="6"
          fill="#1e1e30" stroke="#3b4a6a" strokeWidth="2.5"/>
        <line x1="245" y1="260" x2="260" y2="245" stroke="#4a5a7a" strokeWidth="1.5"/>
        <line x1="425" y1="245" x2="435" y2="260" stroke="#4a5a7a" strokeWidth="1.5"/>
        <line x1="245" y1="420" x2="260" y2="435" stroke="#4a5a7a" strokeWidth="1.5"/>
        <line x1="435" y1="420" x2="425" y2="435" stroke="#4a5a7a" strokeWidth="1.5"/>
        <rect x="252" y="252" width="176" height="176" rx="4"
          fill="none" stroke="#2a3050" strokeWidth="1"/>

        <rect x="264" y="264" width="152" height="152" rx="3"
          fill="#12122a" stroke="#3b4a8a" strokeWidth="1.5"/>
        <g stroke="#1e2245" strokeWidth="0.5">
          <line x1="264" y1="315" x2="416" y2="315"/>
          <line x1="264" y1="340" x2="416" y2="340"/>
          <line x1="264" y1="365" x2="416" y2="365"/>
          <line x1="315" y1="264" x2="315" y2="416"/>
          <line x1="340" y1="264" x2="340" y2="416"/>
          <line x1="365" y1="264" x2="365" y2="416"/>
        </g>

        <rect x="268" y="268" width="43" height="43" rx="2" fill="#3b82f6" className="cf-lb0"/>
        <rect x="318" y="268" width="43" height="43" rx="2" fill="#06b6d4" className="cf-lb1"/>
        <rect x="368" y="268" width="43" height="43" rx="2" fill="#8b5cf6" className="cf-lb2"/>
        <rect x="268" y="318" width="43" height="43" rx="2" fill="#10b981" className="cf-lb3"/>
        <rect x="318" y="318" width="43" height="43" rx="2" fill="#f59e0b" className="cf-lb4"/>
        <rect x="368" y="318" width="43" height="43" rx="2" fill="#3b82f6" className="cf-lb5"/>
        <rect x="268" y="368" width="43" height="43" rx="2" fill="#8b5cf6" className="cf-lb6"/>
        <rect x="318" y="368" width="43" height="43" rx="2" fill="#06b6d4" className="cf-lb7"/>
        <rect x="368" y="368" width="43" height="43" rx="2" fill="#10b981" className="cf-lb8"/>

        <g stroke="#ffffff" strokeWidth="0.6" opacity="0.2">
          {[268,318,368].map(bx =>
            [268,318,368].map(by => (
              <g key={`${bx}-${by}`}>
                <line x1={bx + 4} y1={by + 10} x2={bx + 39} y2={by + 10} />
                <line x1={bx + 4} y1={by + 17} x2={bx + 39} y2={by + 17} />
              </g>
            ))
          )}
        </g>

        <rect x="252" y="252" width="176" height="176" rx="4" fill="#7888a8" opacity="0.15"/>
        <g stroke="#9aaabb" strokeWidth="3.5" opacity="0.3">
          {[268,281,294,307,320,333,346,359,372,385,398,411].map(x => (
            <line key={x} x1={x} y1="255" x2={x} y2="422" />
          ))}
        </g>

        <circle cx="340" cy="340" r="130" fill="none" stroke="#8b5cf6" strokeWidth="0.8" opacity="0.18"/>
        <circle cx="340" cy="340" r="165" fill="none" stroke="#3b82f6" strokeWidth="0.8" opacity="0.18"/>
        <circle cx="340" cy="340" r="210" fill="none" stroke="#06b6d4" strokeWidth="0.8" opacity="0.14"/>

        <g className="cf-orb1">
          <circle cx="340" cy="175" r="7" fill="#3b82f6" opacity="0.85" className="cf-blink"/>
          <circle cx="340" cy="175" r="4" fill="#7ab3f8"/>
        </g>
        <g className="cf-orb2">
          <circle cx="550" cy="340" r="6" fill="#06b6d4" opacity="0.85" className="cf-blink"/>
          <circle cx="550" cy="340" r="3" fill="#7ae3f4"/>
        </g>
        <g className="cf-orb3">
          <circle cx="248" cy="432" r="6" fill="#8b5cf6" opacity="0.85" className="cf-blink"/>
          <circle cx="248" cy="432" r="3" fill="#b89af8"/>
        </g>
        <g className="cf-orb4">
          <circle cx="130" cy="340" r="5" fill="#10b981" opacity="0.85" className="cf-blink"/>
          <circle cx="130" cy="340" r="2.5" fill="#6ddfc0"/>
        </g>

        <g fill="#c8a000" opacity="0.75">
          {[212,224,236,290,302,372,384,438,450,462].map(x => (
            <rect key={`tp${x}`} x={x} y="218" width="6" height="22" rx="1"/>
          ))}
          {[212,224,236,290,302,372,384,438,450,462].map(x => (
            <rect key={`bp${x}`} x={x} y="440" width="6" height="22" rx="1"/>
          ))}
          {[212,224,236,290,302,372,384,438,450,462].map(y => (
            <rect key={`lp${y}`} x="218" y={y} width="22" height="6" rx="1"/>
          ))}
          {[212,224,236,290,302,372,384,438,450,462].map(y => (
            <rect key={`rp${y}`} x="440" y={y} width="22" height="6" rx="1"/>
          ))}
        </g>

        <circle cx="250" cy="250" r="4" fill="#10b981" className="cf-lb0"/>
        <circle cx="430" cy="250" r="4" fill="#3b82f6" className="cf-lb2"/>
        <circle cx="250" cy="430" r="4" fill="#f59e0b" className="cf-lb5"/>
        <circle cx="430" cy="430" r="4" fill="#8b5cf6" className="cf-lb8"/>

        <text x="340" y="347" textAnchor="middle"
          fontFamily="monospace" fontSize="11" fill="#ffffff"
          opacity="0.5" fontWeight="bold" letterSpacing="2">
          AUROWINX
        </text>
        <text x="340" y="362" textAnchor="middle"
          fontFamily="monospace" fontSize="9" fill="#ffffff"
          opacity="0.3" letterSpacing="1">
          AX-V2.4 · 5nm
        </text>
      </svg>
    </div>
  );
}
