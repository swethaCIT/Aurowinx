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
    <section className="relative h-screen overflow-hidden bg-white">

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
      <div className="absolute inset-0 bg-black/50" />

      {/* SOFT PREMIUM GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.03)_45%,transparent_75%)]" />

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

              {/* LABEL */}
              <div className="mb-7 mt-4">
                <span
                  className="
                    inline-block
                    whitespace-nowrap
                    rounded-full
                    border
                    border-white/30
                    bg-white/10
                    px-5
                    py-2.5
                    text-[11px]
                    font-medium
                    uppercase
                    tracking-[0.32em]
                    text-white
                    shadow-sm
                    backdrop-blur-md
                  "
                >
                  Future-Ready Engineering Solutions
                </span>
              </div>

              {/* HEADING */}
              <h1
                className={`
                  ${slides[current].headingClass}
                  mb-6
                  line-clamp-2
                  font-semibold
                  leading-[1.03]
                  tracking-[-0.045em]
                  text-white
                `}
              >
                {slides[current].title}
              </h1>

              {/* DESCRIPTION */}
              <p
                className="
                  mb-10
                  max-w-3xl
                  text-[15px]
                  font-light
                  leading-relaxed
                  text-white/80
                  md:text-[17px]
                "
              >
                {slides[current].description}
              </p>

              {/* BUTTONS */}
              <div className="flex flex-wrap justify-center gap-4">

                {/* PRIMARY — Brand gradient with glow */}
                <button
                  className="
                    rounded-full
                    bg-linear-to-r
                    from-blue-500
                    to-cyan-500
                    px-8
                    py-3.5
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-white
                    shadow-[0_0_25px_rgba(59,130,246,0.4)]
                    transition-all
                    duration-500
                    hover:scale-105
                    hover:shadow-[0_0_40px_rgba(59,130,246,0.6)]
                  "
                >
                  Explore Solutions
                </button>

                {/* SECONDARY — Clean white outline */}
                <button
                  className="
                    rounded-full
                    border
                    border-white/60
                    bg-white/10
                    px-8
                    py-3.5
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-white
                    backdrop-blur-md
                    transition-all
                    duration-500
                    hover:border-white/80
                    hover:bg-white/20
                  "
                >
                  Start a Project
                </button>

              </div>

            </motion.div>

          </AnimatePresence>

        </div>

      </div>

    </section>
  );
}