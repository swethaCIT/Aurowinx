// src/App.jsx
import Navbar from "./components/Navbar";
import HeroSection from "./components/home/HeroSection";
import StatsBar from "./components/home/StatsBar";
// import AboutSnapshot    from "./components/home/AboutSnapshot"    ← next
// import SolutionsSection from "./components/home/SolutionsSection"
// import ProductShowcase  from "./components/home/ProductShowcase"
// import WhyAurowinx     from "./components/home/WhyAurowinx"
// import CTASection      from "./components/home/CTASection"

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        {/* next sections mount here */}
      </main>
    </div>
  );
}