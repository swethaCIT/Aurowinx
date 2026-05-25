import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    video: "/videos/hero-2.mp4",
    title: "Redefining The Future Of Intelligent Engineering",
    headingClass:
      "text-[1.8rem] md:text-[2.6rem] lg:text-[3.2rem] max-w-[900px]",
    description:
      "Advanced semiconductor engineering powering next-generation innovation, performance, and scalability.",
  },
  {
    video: "/videos/hero-2.mp4",
    title: "Engineering Intelligence Beyond Hardware Systems",
    headingClass:
      "text-[1.8rem] md:text-[2.6rem] lg:text-[3.2rem] max-w-[900px]",
    description:
      "Precision-driven embedded systems designed for connected, high-performance technologies.",
  },
  {
    video: "/videos/hero-2.mp4",
    title: "Transforming Industries Through Connected Intelligence",
    headingClass:
      "text-[1.8rem] md:text-[2.6rem] lg:text-[3.2rem] max-w-[900px]",
    description:
      "Building intelligent automation ecosystems that accelerate the future of smart industries.",
  },
  {
    video: "/videos/hero-2.mp4",
    title: "Powering The Next Generation Of Smart Mobility",
    headingClass:
      "text-[1.8rem] md:text-[2.6rem] lg:text-[3.2rem] max-w-[900px]",
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
    <section className="relative h-screen overflow-hidden bg-[#080f1e]">

      {/* VIDEO BACKGROUND */}
      <AnimatePresence>
        <motion.video
          key={current}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <source src={slides[current].video} type="video/mp4" />
        </motion.video>
      </AnimatePresence>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/55" />

      {/* BLUE CORNER GLOW - top left */}
      <div
        className="absolute pointer-events-none z-[1]"
        style={{
          top: -200,
          left: -200,
          width: 700,
          height: 700,
          background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 60%)",
          borderRadius: "50%",
        }}
      />

      {/* CYAN CORNER GLOW - bottom right */}
      <div
        className="absolute pointer-events-none z-[1]"
        style={{
          bottom: -100,
          right: -100,
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 60%)",
          borderRadius: "50%",
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
                className="mb-7 mt-4"
                style={{ borderRadius: 9999, display: "inline-block" }}
              >
                <span
                  className="inline-block whitespace-nowrap rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.32em] text-white shadow-sm backdrop-blur-md"
                >
                  Future-Ready Engineering Solutions
                </span>
              </motion.div>

              {/* HEADING - first word gradient colored */}
              <h1
                className={`${slides[current].headingClass} mb-6 font-semibold leading-[1.03] tracking-[-0.045em] text-white`}
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
                    background: "linear-gradient(135deg, #2563eb, #0891b2)",
                    padding: "14px 32px",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "white",
                    boxShadow: "0 0 32px rgba(37,99,235,0.45)",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Explore Solutions
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
            background: "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)",
          }}
        />
      </motion.div>

    </section>
  );
}
