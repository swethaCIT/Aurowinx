// src/pages/HomePage.jsx  ── wraps all 7 home sections
import { lazy, Suspense } from "react";
import HeroSection from "../components/home/HeroSection";
import { useSEO } from "../hooks/useSEO";

const AboutSnapshot = lazy(() => import("../components/home/AboutSnapshot"));
const SolutionsSection = lazy(() => import("../components/home/SolutionsSection"));
const ProductShowcase = lazy(() => import("../components/home/ProductShowcase"));
const WhyAurowinx = lazy(() => import("../components/home/WhyAurowinx"));
const CTASection = lazy(() => import("../components/home/CTASection"));

export default function HomePage() {
  useSEO({
    title: "Semiconductor Design & Engineering Services",
    description: "AurowinX Technologies delivers semiconductor design services — SoC/ASIC design, verification, DFT, physical design, and analog/mixed-signal IP — plus embedded systems, IoT automation, and power electronics engineering.",
    path: "/",
  });
  return (
    <main className="w-full max-w-[100vw] overflow-x-clip">
      <HeroSection />
      <Suspense fallback={<div style={{ minHeight: 220 }} />}><AboutSnapshot /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><SolutionsSection /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><ProductShowcase /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 220 }} />}><WhyAurowinx /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><CTASection /></Suspense>
    </main>
  );
}