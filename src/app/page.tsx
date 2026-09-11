import Hero from "@/components/hero/Hero";
import ServicesSection from "@/components/services/ServicesSection";
import WorkSection from "@/components/work/WorkSection";
import WorkProcessDivider from "@/components/ui/WorkProcessDivider";
import ProcessSection from "@/components/process/ProcessSection";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import CtaSection from "@/components/cta/CtaSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesSection />
      <WorkSection />
      <WorkProcessDivider />
      <ProcessSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </main>
  );
}

