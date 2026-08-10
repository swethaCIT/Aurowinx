import { lazy, Suspense } from "react";
import HeroSection from "../../components/solutions/physical-design/HeroSection";
import PhysicalFlow from "../../components/solutions/physical-design/PhysicalFlow";
import Projectstools from "../../components/solutions/physical-design/Projectstools";
import WhoWeAre from "../../components/solutions/physical-design/WhoWeAre";
import { useSEO } from "../../hooks/useSEO";

const CTASection = lazy(() => import("../../components/home/CTASection"));

export default function PhysicalPage() {
  useSEO({
    title: "Physical Design Services",
    description: "RTL to GDSII execution from architecture to tapeout, any node — floorplanning, place & route, timing closure and sign-off for cutting-edge process nodes with world-class turnaround.",
    path: "/solutions/physical-design",
  });
  return (
    <div style={{ fontFamily: "'Sora', system-ui, sans-serif" }}>
      <HeroSection />
      <PhysicalFlow />
      <Projectstools />
      <WhoWeAre />
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><CTASection /></Suspense>
    </div>
  );
}