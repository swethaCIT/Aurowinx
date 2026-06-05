// src/App.jsx

import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

// Pages
import HomePage from "./pages/HomePage";
import CompanyPage from "./pages/CompanyPage";
import CareerPage from "./pages/CareerPage";

// Feature Routes
const SolutionsRoutes = lazy(() => import("./routes/SolutionsRoutes"));

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Navbar />

        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              Loading...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/solutions/*" element={<SolutionsRoutes />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/careers" element={<CareerPage />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}