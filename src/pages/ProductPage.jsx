import { lazy, Suspense } from "react";
import ProductHero from "../components/products/ProductHero";
import EngineeringServices from "../components/products/EngineeringServices";
import ElectronicsDev from "../components/products/ElectronicsDev";
import RnD from "../components/products/RnD";
import { useSEO } from "../hooks/useSEO";

const CTASection = lazy(() => import("../components/home/CTASection"));

export default function ProductPage() {
    useSEO({
        title: "Products & Engineering Services",
        description: "Product architecture, hardware design, and PCB engineering; power electronics including EV charging, BLDC motor control, and solar inverters; and technology R&D consulting from concept to production.",
        path: "/products",
    });
    return (
        <>
            <ProductHero />
            <EngineeringServices />
            <ElectronicsDev />
            <RnD />
            <Suspense fallback={<div style={{ minHeight: 260 }} />}><CTASection /></Suspense>
        </>
    );
}
