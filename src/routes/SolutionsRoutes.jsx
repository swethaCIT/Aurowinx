// src/routes/SolutionsRoutes.jsx

import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Solution Pages lazy loaded to improve performance
const SemiconductorDesignPage = lazy(() => import("../pages/solutions/SemiconductorDesignPage"));
const DesignVerificationPage  = lazy(() => import("../pages/solutions/DesignVerificationPage"));
const DFTEngineeringPage      = lazy(() => import("../pages/solutions/DFTEngineeringPage"));
const PhysicalDesignPage      = lazy(() => import("../pages/solutions/PhysicalPage"));
const AnalogIPPage            = lazy(() => import("../pages/solutions/AnalogIPPage"));

export default function SolutionsRoutes() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <Routes>
        <Route path="semiconductor-design" element={<SemiconductorDesignPage />} />
        <Route path="design-verification"  element={<DesignVerificationPage />} />
        <Route path="dft-engineering"      element={<DFTEngineeringPage />} />
        <Route path="physical-design"      element={<PhysicalDesignPage />} />
        <Route path="analog-ip"            element={<AnalogIPPage />} />
      </Routes>
    </Suspense>
  );
}