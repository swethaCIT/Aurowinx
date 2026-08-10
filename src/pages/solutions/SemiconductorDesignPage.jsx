import { lazy, Suspense } from "react";
import SDHero from "../../components/solutions/semiconductor/SDHero";
import { useSEO } from "../../hooks/useSEO";

const SDProcessFlow = lazy(() => import("../../components/solutions/semiconductor/SDProcessFlow"));
const SDWhySection = lazy(() => import("../../components/solutions/semiconductor/SDWhySection"));
const SDTools = lazy(() => import("../../components/solutions/semiconductor/SDTools"));
const SDTestimonials = lazy(() => import("../../components/solutions/semiconductor/SDTestimonials"));
const SDFAQ = lazy(() => import("../../components/solutions/semiconductor/SDFAQ"));
const CTASection = lazy(() => import("../../components/home/CTASection"));

export default function SemiconductorDesignPage() {
  useSEO({
    title: "Semiconductor Design (SoC / ASIC)",
    description: "Advanced SoC and ASIC engineering capabilities with multi-process node support — from architecture exploration to tapeout, our design teams bring decades of silicon expertise.",
    path: "/solutions/semiconductor-design",
  });
  return (
    <div className="min-h-screen overflow-x-hidden">
      <SDHero />
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><SDProcessFlow /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><SDWhySection /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><SDTools /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><SDTestimonials /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><SDFAQ /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><CTASection compact /></Suspense>
    </div>
  );
}