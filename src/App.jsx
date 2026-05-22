// src/App.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Clean root app — default Vite template removed.
// Sections will be imported here one by one as they are built.
// ─────────────────────────────────────────────────────────────────────────────

import Navbar from './components/Navbar'
import HeroSection from './components/home/HeroSection'
// import StatsBar       from './components/home/StatsBar'        // ← next
// import AboutSnapshot  from './components/home/AboutSnapshot'   // ← soon
// import SolutionsSection from './components/home/SolutionsSection'
// import ProductShowcase  from './components/home/ProductShowcase'
// import WhyAurowinx     from './components/home/WhyAurowinx'
// import CTASection      from './components/home/CTASection'

function App() {
  return (
    // bg-[#050c1a] ensures the dark hero colour shows behind the transparent navbar
    <div className="min-h-screen bg-[#050c1a]">

      {/* ── Navbar — already built; sits above hero ── */}
      <Navbar />

      {/* ── Page sections ── */}
      <main>
        <HeroSection />

        {/* Placeholder — remove once StatsBar is ready */}
        <div
          id="stats"
          className="h-32 flex items-center justify-center"
          style={{ background: '#f8fafc', color: '#94a3b8', fontSize: '13px', letterSpacing: '0.05em' }}
        >
          STATS BAR — coming next
        </div>

      </main>
    </div>
  )
}

export default App