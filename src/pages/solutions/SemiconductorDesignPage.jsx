import { lazy, Suspense } from "react";
import SDHero from "../../components/solutions/semiconductor/SDHero";

const SDMetrics = lazy(() => import("../../components/solutions/semiconductor/SDMetrics"));
const SDProcessFlow = lazy(() => import("../../components/solutions/semiconductor/SDProcessFlow"));
const SDCapabilities = lazy(() => import("../../components/solutions/semiconductor/SDCapabilities"));
const SDWhySection = lazy(() => import("../../components/solutions/semiconductor/SDWhySection"));
const SDTools = lazy(() => import("../../components/solutions/semiconductor/SDTools"));
const SDTestimonials = lazy(() => import("../../components/solutions/semiconductor/SDTestimonials"));
const SDFAQ = lazy(() => import("../../components/solutions/semiconductor/SDFAQ"));
const CTASection = lazy(() => import("../../components/home/CTASection"));

export default function SemiconductorDesignPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <SDHero />
      <Suspense fallback={<div style={{ minHeight: 220 }} />}><SDMetrics /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><SDProcessFlow /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><SDCapabilities /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><SDWhySection /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><SDTools /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><SDTestimonials /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><SDFAQ /></Suspense>
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><CTASection /></Suspense>
    </div>
  );
}