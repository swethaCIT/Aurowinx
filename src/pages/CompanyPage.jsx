// src/pages/CompanyPage.jsx — Company page with all company sections
import { lazy, Suspense } from "react";
import HeroSection from "../components/company/HeroSection";

// Uncomment each line below as you build the component:
const CompanyOverview    = lazy(() => import("../components/company/CompanyOverview"));
const BusinessModel      = lazy(() => import("../components/company/BusinessModel"));
const KeyDifferentiators = lazy(() => import("../components/company/KeyDifferentiators"));
const FoundriesAndTools  = lazy(() => import("../components/company/FoundriesAndTools"));
const TeamStructure      = lazy(() => import("../components/company/TeamStructure"));
const WhyPartnerWithUs   = lazy(() => import("../components/company/WhyPartnerWithUs"));
// const FloatingCircuit    = lazy(() => import("../components/company/FloatingCircuit"));
const CTASection = lazy(() => import("../components/home/CTASection"));

export default function CompanyPage() {
  return (
    <main>
      <HeroSection />
      
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><CompanyOverview /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><BusinessModel /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><KeyDifferentiators /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><FoundriesAndTools /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><TeamStructure /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><WhyPartnerWithUs /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><CTASection /></Suspense>
      {/* <Suspense fallback={<div style={{ minHeight: 260 }} />}><FloatingCircuit /></Suspense> */}
    </main>
  );
}