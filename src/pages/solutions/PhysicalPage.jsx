import HeroSection from "../../components/solutions/physical-design/HeroSection";
import PhysicalFlow from "../../components/solutions/physical-design/PhysicalFlow";
import WhoWeAre from "../../components/solutions/physical-design/WhoWeAre";

export default function PhysicalPage() {
  return (
    <div style={{ fontFamily: "'Sora', system-ui, sans-serif" }}>
      <HeroSection />
      <PhysicalFlow />
      <WhoWeAre />
    </div>
  );
}