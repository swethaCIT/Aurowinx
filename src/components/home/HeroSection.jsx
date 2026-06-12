import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    video: "/videos/hero-2.mp4",
    title: "Redefining The Future Of Intelligent Engineering",
    headingClass:
      "text-[clamp(1.5rem,5.5vw,3.2rem)] md:text-[3rem] lg:text-[3.2rem] 2xl:text-[4rem] max-w-[min(900px,100%)]",
    description:
      "Advanced semiconductor engineering powering next-generation innovation, performance, and scalability.",
  },
  {
    video: "/videos/hero-2.mp4",
    title: "Engineering Intelligence Beyond Hardware Systems",
    headingClass:
      "text-[clamp(1.5rem,5.5vw,3.2rem)] md:text-[3rem] lg:text-[3.2rem] 2xl:text-[4rem] max-w-[min(900px,100%)]",
    description:
      "Precision-driven embedded systems designed for connected, high-performance technologies.",
  },
  {
    video: "/videos/hero-2.mp4",
    title: "Transforming Industries Through Connected Intelligence",
    headingClass:
      "text-[clamp(1.5rem,5.5vw,3.2rem)] md:text-[3rem] lg:text-[3.2rem] 2xl:text-[4rem] max-w-[min(900px,100%)]",
    description:
      "Building intelligent automation ecosystems that accelerate the future of smart industries.",
  },
  {
    video: "/videos/hero-2.mp4",
    title: "Powering The Next Generation Of Smart Mobility",
    headingClass:
      "text-[clamp(1.5rem,5.5vw,3.2rem)] md:text-[3rem] lg:text-[3.2rem] 2xl:text-[4rem] max-w-[min(900px,100%)]",
    description:
      "Advanced engineering solutions driving intelligent electronics and future-ready energy systems.",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100dvh] h-[100svh] overflow-hidden bg-[#080f1e]">

      {/* VIDEO BACKGROUND - Rendered once for better performance */}
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
      <div className="absolute inset-0 bg-black/55" />

      {/* BLUE CORNER GLOW - top left */}
      <div
        className="absolute pointer-events-none z-[1] -top-32 -left-32 h-[min(700px,120vw)] w-[min(700px,120vw)] rounded-full sm:-top-48 sm:-left-48"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 60%)",
        }}
      />

      {/* CYAN CORNER GLOW - bottom right */}
      <div
        className="absolute pointer-events-none z-[1] -bottom-16 -right-16 h-[min(500px,90vw)] w-[min(500px,90vw)] rounded-full sm:-bottom-24 sm:-right-24"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 60%)",
        }}
      />

      {/* GRID OVERLAY */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          opacity: 0.035,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* BOTTOM GRADIENT - blends into dark StatsBar */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-[3]"
        style={{
          height: 180,
          background: "linear-gradient(to bottom, transparent 0%, rgba(8,15,30,0.7) 100%)",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-20 flex h-full items-center justify-center px-4 py-20 text-center sm:px-6 sm:py-24 2xl:px-12 2xl:py-32">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
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
              className="flex w-full max-w-7xl flex-col items-center"
            >

              {/* BADGE with pulsing border glow */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(96,165,250,0)",
                    "0 0 12px rgba(96,165,250,0.3)",
                    "0 0 0px rgba(96,165,250,0)",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="mb-5 mt-2 sm:mb-7 sm:mt-4"
                style={{ borderRadius: 9999, display: "inline-block" }}
              >
                <span
                  className="inline-block max-w-full rounded-full border border-white/30 bg-white/10 px-3 py-2 text-[9px] font-medium uppercase tracking-[0.18em] text-white shadow-sm backdrop-blur-md sm:px-5 sm:py-2.5 sm:text-[11px] sm:tracking-[0.32em]"
                >
                  Future-Ready Engineering Solutions
                </span>
              </motion.div>

              {/* HEADING - first word gradient colored */}
              <h1
                className={`${slides[current].headingClass} mb-4 px-1 font-semibold leading-[1.08] tracking-[-0.045em] text-balance text-white sm:mb-6 sm:leading-[1.03]`}
              >
                {(() => {
                  const words = slides[current].title.split(" ");
                  return (
                    <>
                      <span
                        style={{
                          background: "linear-gradient(135deg, #60a5fa, #22d3ee)",
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
              <p className="mb-8 max-w-3xl px-1 text-sm font-light leading-relaxed text-white/80 sm:mb-10 sm:text-[15px] md:text-[17px]">
                {slides[current].description}
              </p>

              {/* BUTTONS */}
              <div className="flex w-full max-w-md flex-col justify-center gap-3 px-1 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-4">

                {/* PRIMARY */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full min-w-0 rounded-full border-none px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white sm:w-auto sm:px-8 sm:py-3.5 sm:text-[11px] sm:tracking-[0.2em]"
                  style={{
                    background: "linear-gradient(135deg, #2563eb, #0891b2)",
                    boxShadow: "0 0 32px rgba(37,99,235,0.45)",
                    cursor: "pointer",
                  }}
                >
                  Explore Solutions
                </motion.button>

                {/* SECONDARY */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full min-w-0 rounded-full px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white sm:w-auto sm:px-8 sm:py-3.5 sm:text-[11px] sm:tracking-[0.2em]"
                  style={{
                    border: "1px solid rgba(255,255,255,0.5)",
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                    cursor: "pointer",
                  }}
                >
                  Start a Project
                </motion.button>

              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5 sm:bottom-8"
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
            background: "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)",
          }}
        />
      </motion.div>

    </section>
  );
}
