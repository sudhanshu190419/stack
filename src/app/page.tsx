import Hero from "@/components/hero/Hero";
import ServicesSection from "@/components/services/ServicesSection";
import WorkSection from "@/components/work/WorkSection";
import OfferSection from "@/components/offer/OfferSection";
import WorkProcessDivider from "@/components/ui/WorkProcessDivider";
import ProcessSection from "@/components/process/ProcessSection";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import CtaSection from "@/components/cta/CtaSection";
import Footer from "@/components/footer/Footer";

const HOMEPAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.stackstich.online/#organization",
      name: "StackStich",
      url: "https://www.stackstich.online",
      logo: "https://www.stackstich.online/logo.png",
      sameAs: [
        "https://www.instagram.com/stackstich.online/",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+918860979255",
        contactType: "customer service",
        email: "contact@stackstich.online",
        availableLanguage: ["English", "Hindi"],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.stackstich.online/#website",
      url: "https://www.stackstich.online",
      name: "StackStich",
      description:
        "From startup MVPs to enterprise software, we design, develop and launch high-performance mobile apps, web applications, AI solutions, and custom software.",
      publisher: {
        "@id": "https://www.stackstich.online/#organization",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOMEPAGE_SCHEMA) }}
      />
      <main>
        <Hero />
        <ServicesSection />
        <WorkSection />
        <OfferSection />
        <WorkProcessDivider />
        <ProcessSection />
        <TestimonialsSection />
        <CtaSection />
        <Footer />
      </main>
    </>
  );
}
