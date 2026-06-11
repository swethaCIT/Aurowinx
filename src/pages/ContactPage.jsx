import ContactHero from "../components/contact/ContactHero";
import ContactInfoBar from "../components/contact/ContactInfoBar";
import ContactForm from "../components/contact/ContactForm";
import ContactModal from "../components/contact/ContactModal";
import CTASection from "../components/home/CTASection";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <ContactHero />
      <ContactInfoBar />
      <ContactForm context="general" sourcePage="Contact" />
      <ContactModal />
      <CTASection />
    </main>
  );
}
