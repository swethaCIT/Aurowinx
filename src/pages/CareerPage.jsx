import { lazy, Suspense } from "react";
import Hero from "../components/career/Hero";
import WhyJoin from "../components/career/WhyJoin";
import OpenRoles from "../components/career/Openroles";
import DidntFindRole from "../components/career/Didn'tfindrole";
import { useSEO } from "../hooks/useSEO";

const CTASection = lazy(() => import("../components/home/CTASection"));

export default function CareerPage() {
  useSEO({
    title: "Careers",
    description: "Join AurowinX Technologies — we're hiring design verification, DFT/ATPG, physical design, ASIC design, and analog/mixed-signal engineers across experience levels.",
    path: "/careers",
  });
  return (
    <>
      <Hero />
      <WhyJoin />
      <OpenRoles />
      <DidntFindRole />
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><CTASection /></Suspense>
    </>
  );
}