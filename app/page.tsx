import { HeroSection } from "@/components/funnel/HeroSection";
import { ProjectsSection } from "@/components/funnel/ProjectsSection";
import { ServicesSection } from "@/components/funnel/ServicesSection";
import { BeforeAfterSection } from "@/components/funnel/BeforeAfterSection";
import { VideosSection } from "@/components/funnel/VideosSection";
import { TrustSection } from "@/components/funnel/TrustSection";
import { FinalCtaSection } from "@/components/funnel/FinalCtaSection";
import { SiteHeader } from "@/components/funnel/SiteHeader";
import { SiteFooter } from "@/components/funnel/SiteFooter";
import { FloatingWhatsApp } from "@/components/funnel/FloatingWhatsApp";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <HeroSection />
      <ProjectsSection />
      <ServicesSection />
      <BeforeAfterSection />
      <VideosSection />
      <TrustSection />
      <FinalCtaSection />
      <SiteFooter />
      <FloatingWhatsApp />
    </main>
  );
}
