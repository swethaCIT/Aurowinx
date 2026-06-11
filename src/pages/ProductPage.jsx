import ProductHero from "../components/products/ProductHero";
import ProductEngineering from "../components/products/ProductEngineering";
import EmbeddedSystems from "../components/products/EmbeddedSystems";
import IotAutomation from "../components/products/IotAutomation";
import ElectronicsDev from "../components/products/ElectronicsDev";
import CustomRD from "../components/products/CustomRD";
import CTASection from "../components/home/CTASection";

export default function ProductPage() {
    return (
        <>
            <ProductHero />
            <ProductEngineering />
            <EmbeddedSystems />
            <IotAutomation />
            <ElectronicsDev />
            <CustomRD />
            <CTASection />
        </>
    );
}
