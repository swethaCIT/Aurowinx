import Hero from "../components/career/Hero";
import Domains from "../components/career/Domains";
import WhyJoin from "../components/career/WhyJoin";
import OpenRoles from "../components/career/Openroles";
import DidntFindRole from "../components/career/Didn'tfindrole";
import CTASection from "../components/home/CTASection";

export default function CareerPage() {
  return (
    <>
      <Hero />
      <Domains />
      <WhyJoin />
      <OpenRoles />
      <DidntFindRole />
      <CTASection />
    </>
  );
}