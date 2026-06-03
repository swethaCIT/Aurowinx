import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    video: "/videos/hero-2.mp4",
    badge: "Enlightening Tech World",
    title: "End-To-End Silicon Design From Concept To Tapeout",
    headingClass:
      "text-[1.8rem] md:text-[2.6rem] lg:text-[3.2rem] max-w-[900px]",
    description:
      "Delivering high-quality, low-power, high-performance SoC solutions across the full silicon lifecycle — Architecture to GDSII.",
  },
  {
    video: "/videos/hero-2.mp4",
    badge: "Spec2GDSII Expertise",
    title: "Proven Silicon Success Across Advanced Technology Nodes",
    headingClass:
      "text-[1.8rem] md:text-[2.6rem] lg:text-[3.2rem] max-w-[900px]",
    description:
      "Successful tapeouts at 7nm, 5nm, and 3nm FinFET nodes — trusted by Tier 1 semiconductor companies worldwide.",
  },
  {
    video: "/videos/hero-2.mp4",
    badge: "Domain-Focused Engineering",
    title: "Deep Expertise Across Verification, DFT And Physical Design",
    headingClass:
      "text-[1.8rem] md:text-[2.6rem] lg:text-[3.2rem] max-w-[900px]",
    description:
      "Specialists in SV-UVM verification, DFT architecture, and low-power PNR — backed by engineers with 8–20 years of hands-on experience.",
  },
  {
    video: "/videos/hero-2.mp4",
    badge: "Established 2020 · Chennai",
    title: "Your Extended Engineering Arm For Silicon Product Success",
    headingClass:
      "text-[1.8rem] md:text-[2.6rem] lg:text-[3.2rem] max-w-[900px]",
    description:
      "We engage with customers to build their silicon products through domain expertise, established workflows, and automation-driven execution.",
  },
];

export default function CompanyHeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-[#080f1e]">

      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0.9 }}
      >
        <source src={slides[0].video} type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      {/* BLUE CORNER GLOW - top left */}
      <div
        className="absolute pointer-events-none z-[1]"
        style={{
          top: -200,
          left: -200,
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle, rgba(79,70,229,0.22) 0%, transparent 60%)",
          borderRadius: "50%",
        }}
      />

      {/* VIOLET CORNER GLOW - bottom right */}
      <div
        className="absolute pointer-events-none z-[1]"
        style={{
          bottom: -100,
          right: -100,
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 60%)",
          borderRadius: "50%",
        }}
      />

      {/* INDIGO GLOW - center */}
      <div
        className="absolute pointer-events-none z-[1]"
        style={{
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 900,
          height: 400,
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)",
        }}
      />

      {/* GRID OVERLAY */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          opacity: 0.03,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* FLOATING CIRCUIT DOTS */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none z-[2]"
          style={{
            width: i % 2 === 0 ? 6 : 4,
            height: i % 2 === 0 ? 6 : 4,
            borderRadius: "50%",
            background:
              i % 3 === 0
                ? "rgba(99,102,241,0.7)"
                : i % 3 === 1
                ? "rgba(124,58,237,0.6)"
                : "rgba(167,139,250,0.5)",
            top: `${15 + i * 13}%`,
            left: i % 2 === 0 ? `${8 + i * 4}%` : undefined,
            right: i % 2 !== 0 ? `${6 + i * 3}%` : undefined,
          }}
          animate={{
            y: [0, -14, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 3 + i * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* FLOATING CHIP OUTLINES */}
      {[
        { top: "12%", left: "6%", size: 48, delay: 0 },
        { top: "70%", left: "4%", size: 36, delay: 1.2 },
        { top: "20%", right: "7%", size: 44, delay: 0.6 },
        { top: "65%", right: "5%", size: 32, delay: 1.8 },
      ].map((chip, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none z-[2]"
          style={{
            top: chip.top,
            left: chip.left,
            right: chip.right,
            width: chip.size,
            height: chip.size,
            border: "1px solid rgba(99,102,241,0.25)",
            borderRadius: 6,
          }}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 4, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4 + i * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: chip.delay,
          }}
        >
          {/* chip pins left */}
          {[...Array(3)].map((_, p) => (
            <div
              key={p}
              style={{
                position: "absolute",
                left: -6,
                top: 8 + p * 10,
                width: 5,
                height: 2,
                background: "rgba(99,102,241,0.4)",
                borderRadius: 1,
              }}
            />
          ))}
          {/* chip pins right */}
          {[...Array(3)].map((_, p) => (
            <div
              key={p}
              style={{
                position: "absolute",
                right: -6,
                top: 8 + p * 10,
                width: 5,
                height: 2,
                background: "rgba(99,102,241,0.4)",
                borderRadius: 1,
              }}
            />
          ))}
        </motion.div>
      ))}

      {/* BOTTOM GRADIENT */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-[3]"
        style={{
          height: 180,
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(8,15,30,0.75) 100%)",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-20 flex h-full items-center justify-center text-center">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex max-w-7xl flex-col items-center"
            >
              {/* BADGE */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(99,102,241,0)",
                    "0 0 14px rgba(99,102,241,0.35)",
                    "0 0 0px rgba(99,102,241,0)",
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mb-7 mt-4"
                style={{ borderRadius: 9999, display: "inline-block" }}
              >
                <span className="inline-block whitespace-nowrap rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.32em] text-white shadow-sm backdrop-blur-md">
                  {slides[current].badge}
                </span>
              </motion.div>

              {/* HEADING */}
              <h1
                className={`${slides[current].headingClass} mb-6 font-semibold leading-[1.03] tracking-[-0.045em] text-white`}
              >
                {(() => {
                  const words = slides[current].title.split(" ");
                  return (
                    <>
                      <span
                        style={{
                          background:
                            "linear-gradient(135deg, #818cf8, #a78bfa)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {words[0]}
                      </span>{" "}
                      {words.slice(1).join(" ")}
                    </>
                  );
                })()}
              </h1>

              {/* DESCRIPTION */}
              <p className="mb-10 max-w-3xl text-[15px] font-light leading-relaxed text-white/80 md:text-[17px]">
                {slides[current].description}
              </p>

              {/* BUTTONS */}
              <div className="flex flex-wrap justify-center gap-4">
                {/* PRIMARY */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    borderRadius: 9999,
                    background:
                      "linear-gradient(135deg, #4f46e5, #7c3aed)",
                    padding: "14px 32px",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "white",
                    boxShadow: "0 0 32px rgba(79,70,229,0.45)",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Our Capabilities
                </motion.button>

                {/* SECONDARY */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    borderRadius: 9999,
                    border: "1px solid rgba(255,255,255,0.5)",
                    background: "rgba(255,255,255,0.08)",
                    padding: "14px 32px",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "white",
                    backdropFilter: "blur(12px)",
                    cursor: "pointer",
                  }}
                >
                  Start a Project
                </motion.button>
              </div>

              {/* SLIDE DOTS */}
              <div className="mt-10 flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    style={{
                      width: i === current ? 24 : 6,
                      height: 6,
                      borderRadius: 9999,
                      background:
                        i === current
                          ? "rgba(129,140,248,1)"
                          : "rgba(255,255,255,0.25)",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.4s ease",
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span
          style={{
            fontSize: 9,
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 28,
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}