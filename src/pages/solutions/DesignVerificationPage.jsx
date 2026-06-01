// src/pages/solutions/DesignVerificationPage.jsx
import { lazy, Suspense } from "react";
import HeroSection from "../../components/solutions/design-verification/HeroSection";

const VerifFlow = lazy(() => import("../../components/solutions/design-verification/VerifFlow"));
const ProjectsList = lazy(() => import("../../components/solutions/design-verification/ProjectsList"));
const LevelOfVerif = lazy(() => import("../../components/solutions/design-verification/LevelOfVerif"));
const ToolsSection = lazy(() => import("../../components/solutions/design-verification/ToolsSection"));
const WhoWeAre = lazy(() => import("../../components/solutions/design-verification/WhoWeAre"));
const CTASection = lazy(() => import("../../components/home/CTASection"));
export default function DesignVerificationPage() {
  return (
    <div style={{ fontFamily: "'Sora', system-ui, sans-serif" }}>
      <HeroSection />
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><VerifFlow /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><ProjectsList /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><LevelOfVerif /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><ToolsSection /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><WhoWeAre /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><CTASection /></Suspense>
    </div>
  );
}