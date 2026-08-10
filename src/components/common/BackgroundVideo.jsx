import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Autoplaying, muted, looping background video used across every hero
 * section. Centralizes the performance/accessibility behavior that used
 * to be duplicated per-page:
 *  - `poster` paints instantly so there's no blank/black flash while the
 *    video buffers.
 *  - `preload="metadata"` avoids pulling the full file before it's needed.
 *  - Playback pauses whenever the video scrolls off-screen, so it isn't
 *    silently decoding video the visitor can't see (same pattern already
 *    used for the 3D canvas in CTASection).
 *  - Visitors with `prefers-reduced-motion` get the poster only — no
 *    `<source>` is rendered, so the video is never downloaded for them.
 */
export default function BackgroundVideo({ src, poster, className, style }) {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduceMotion) return;
    if (isVisible) el.play().catch(() => {});
    else el.pause();
  }, [isVisible, reduceMotion]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      autoPlay={!reduceMotion}
      loop
      muted
      playsInline
      preload="metadata"
      className={className}
      style={style}
    >
      {!reduceMotion && <source src={src} type="video/mp4" />}
    </video>
  );
}
