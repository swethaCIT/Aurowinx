// src/pages/HomePage.jsx  ── wraps all 7 home sections
import { lazy, Suspense } from "react";
import HeroSection from "../components/home/HeroSection";

const StatsBar = lazy(() => import("../components/home/StatsBar"));
const AboutSnapshot = lazy(() => import("../components/home/AboutSnapshot"));
const SolutionsSection = lazy(() => import("../components/home/SolutionsSection"));
const ProductShowcase = lazy(() => import("../components/home/ProductShowcase"));
const WhyAurowinx = lazy(() => import("../components/home/WhyAurowinx"));
const CTASection = lazy(() => import("../components/home/CTASection"));

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <Suspense fallback={<div style={{ minHeight: 180 }} />}><StatsBar /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 220 }} />}><AboutSnapshot /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><SolutionsSection /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><ProductShowcase /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 220 }} />}><WhyAurowinx /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><CTASection /></Suspense>
    </main>
  );
}