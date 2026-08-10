import { lazy, Suspense } from "react";
import ContactHero from "../components/contact/ContactHero";
import ContactInfoBar from "../components/contact/ContactInfoBar";
import ContactForm from "../components/contact/ContactForm";
import { useSEO } from "../hooks/useSEO";

const CTASection = lazy(() => import("../components/home/CTASection"));

export default function ContactPage() {
  useSEO({
    title: "Contact Us",
    description: "Get in touch with AurowinX Technologies for semiconductor design services, engineering partnerships, or product enquiries. Our team responds within 1 business day.",
    path: "/contact",
  });
  return (
    <main className="min-h-screen bg-white">
      <ContactHero />
      <ContactInfoBar />
      <ContactForm context="general" sourcePage="Contact" />
      <Suspense fallback={<div style={{ minHeight: 260 }} />}><CTASection /></Suspense>
    </main>
  );
}
