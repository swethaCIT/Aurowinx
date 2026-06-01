import { lazy, Suspense } from "react";
import HeroSection from "../../components/solutions/dft/HeroSection";

const DFTArchitecture = lazy(() => import("../../components/solutions/dft/DFTArchitecture"));
const WhoWeAre = lazy(() => import("../../components/solutions/dft/WhoWeAre"));
const CTASection = lazy(() => import("../../components/home/CTASection"));

export default function DFTEngineeringPage() {
  return (
    <div style={{ fontFamily: "'Sora', system-ui, sans-serif" }}>
      <HeroSection />
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><DFTArchitecture /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><WhoWeAre /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><CTASection /></Suspense>
    </div>
  );
}