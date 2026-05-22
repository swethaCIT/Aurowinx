import HeroSection from '../components/home/HeroSection';
import StatsBar from '../components/home/StatsBar';
import AboutSnapshot from '../components/home/AboutSnapshot';
import SolutionsSection from '../components/home/SolutionsSection';
import ProductShowcase from '../components/home/ProductShowcase';
import WhyAurowinx from '../components/home/WhyAurowinx';
import CTASection from '../components/home/CTASection';

export default function HomePage() {
  return (
    <main className="w-full">
      <HeroSection />
      <StatsBar />
      <AboutSnapshot />
      <SolutionsSection />
      <ProductShowcase />
      <WhyAurowinx />
      <CTASection />
    </main>
  );
}