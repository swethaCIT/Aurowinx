import { lazy, Suspense } from "react";
import HeroSection from "../../components/solutions/dft/HeroSection";
import { useSEO } from "../../hooks/useSEO";

const DFTArchitecture = lazy(() => import("../../components/solutions/dft/DFTArchitecture"));
const DFTFlow = lazy(() => import("../../components/solutions/dft/DFTFlow"));
const ProjectsList = lazy(() => import("../../components/solutions/dft/ProjectsList"));
const WhoWeAre = lazy(() => import("../../components/solutions/dft/WhoWeAre"));
const CTASection = lazy(() => import("../../components/home/CTASection"));

export default function DFTEngineeringPage() {
  useSEO({
    title: "DFT Engineering Services",
    description: "Design for testability and structural yield improvement methodologies — structural scan, BIST, boundary scan, and ATPG solutions that maximise test coverage while minimising area overhead.",
    path: "/solutions/dft-engineering",
  });
  return (
    <div style={{ fontFamily: "'Sora', system-ui, sans-serif" }}>
      <HeroSection />
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><DFTArchitecture /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><DFTFlow /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><ProjectsList /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><WhoWeAre /></Suspense> 
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><CTASection /></Suspense>
    </div>
  );
}