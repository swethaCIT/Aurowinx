// src/pages/CompanyPage.jsx — Company page with all company sections
import { lazy, Suspense } from "react";
import HeroSection from "../components/company/HeroSection";
import { useSEO } from "../hooks/useSEO";

// Uncomment each line below as you build the component:
const CompanyOverview    = lazy(() => import("../components/company/CompanyOverview"));
const BusinessModel      = lazy(() => import("../components/company/BusinessModel"));
const KeyDifferentiators = lazy(() => import("../components/company/KeyDifferentiators"));
const FoundriesAndTools  = lazy(() => import("../components/company/FoundriesAndTools"));
// const FloatingCircuit    = lazy(() => import("../components/company/FloatingCircuit"));
const CTASection = lazy(() => import("../components/home/CTASection"));

export default function CompanyPage() {
  useSEO({
    title: "About Us",
    description: "AurowinX Technologies is a semiconductor design and engineering partner — learn about our business model, key differentiators, and the foundries and tools we work with.",
    path: "/company",
  });
  return (
    <main>
      <HeroSection />
      
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><CompanyOverview /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><BusinessModel /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><KeyDifferentiators /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><FoundriesAndTools /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><CTASection /></Suspense>
      {/* <Suspense fallback={<div style={{ minHeight: 260 }} />}><FloatingCircuit /></Suspense> */}
    </main>
  );
}