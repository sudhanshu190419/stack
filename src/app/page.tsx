import Hero from "@/components/hero/Hero";
import ServicesSection from "@/components/services/ServicesSection";
import WorkSection from "@/components/work/WorkSection";
import ContactSection from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesSection />
      <WorkSection />
      <ContactSection />
    </main>
  );
}
