import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

// Pages
import HomePage from "./pages/HomePage";
import CompanyPage from "./pages/CompanyPage";
import CareerPage from "./pages/CareerPage";
import ProductPage from "./pages/ProductPage";
const JobDetailPage = lazy(() => import("./pages/JobDetailPage"));
const SolutionsRoutes = lazy(() => import("./routes/SolutionsRoutes"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen overflow-x-clip bg-white">
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
            <Route path="/products" element={<ProductPage />} />
            <Route path="/solutions/*" element={<SolutionsRoutes />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/careers" element={<CareerPage />} />
            <Route path="/careers/:slug" element={<JobDetailPage />} />
            <Route path="/contact" element={<ContactPage />} /> 
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}