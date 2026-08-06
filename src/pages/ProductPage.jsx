import ProductHero from "../components/products/ProductHero";
import EngineeringServices from "../components/products/EngineeringServices";
import EmbeddedSystems from "../components/products/EmbeddedSystems";
import IoTAutomation from "../components/products/IoTAutomation";
import ElectronicsDev from "../components/products/ElectronicsDev";
import RnD from "../components/products/RnD";
import CTASection from "../components/home/CTASection";

export default function ProductPage() {
    return (
        <>
            <ProductHero />
            <EngineeringServices />
            <EmbeddedSystems />
            <IoTAutomation />
            <ElectronicsDev />
            <RnD />
            <CTASection />
        </>
    );
}
