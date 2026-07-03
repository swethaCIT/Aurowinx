import ProductHero from "../components/products/ProductHero";
import ProductEngineering from "../components/products/ProductEngineering";
import EmbeddedSystems from "../components/products/EmbeddedSystems";
import IoTAutomation from "../components/products/IoTAutomation";
import ElectronicsDev from "../components/products/ElectronicsDev";
import CTASection from "../components/home/CTASection";

export default function ProductPage() {
    return (
        <>
            <ProductHero />
            <ProductEngineering />
            <EmbeddedSystems />
            <IoTAutomation />
            <ElectronicsDev />
            <CTASection />
        </>
    );
}
