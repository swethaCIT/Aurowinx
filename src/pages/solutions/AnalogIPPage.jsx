// src/pages/solutions/AnalogIPPage.jsx

import { lazy, Suspense } from "react";
import HeroSection          from "../../components/solutions/analog/HeroSection";
import CapabilitiesSection  from "../../components/solutions/analog/CapabilitiesSection";
import ProcessFlowSection   from "../../components/solutions/analog/ProcessFlowSection";
import { useSEO } from "../../hooks/useSEO";

const CTASection = lazy(() => import("../../components/home/CTASection"));

export default function AnalogIPPage() {
  useSEO({
    title: "Analog & IP Solutions",
    description: "Custom mixed-signal block design, characterisation, and IP hardening — high-performance PLLs, SerDes, ADC/DAC and custom analog IP with silicon-proven reliability across voltage domains.",
    path: "/solutions/analog-ip",
  });
  return (
    <>
      <HeroSection />
      <CapabilitiesSection />
      <ProcessFlowSection />
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><CTASection /></Suspense>
    </>
  );
}