import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SportsSection } from "@/components/sections/SportsSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { RegistrationSection } from "@/components/sections/RegistrationSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { ContactSection } from "@/components/sections/ContactSection";
import ScrollVelocity from "@/components/ScrollVelocity";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        
        {/* ScrollVelocity Effect between sections */}
        <div className="bg-primary py-2">
          <ScrollVelocity
            texts={['REC SPORTS CLUB', 'RAJALAKSHMI ENGINEERING COLLEGE']} 
            velocity={75} 
            className="custom-scroll-text"
          />
        </div>
        
        <SportsSection />
        <EventsSection />
        
        {/* Another ScrollVelocity Effect */}
        <div className="bg-muted py-4">
          <ScrollVelocity
            texts={['CHAMPIONS LEAGUE', 'REC SPORTS', 'EXCELLENCE']} 
            velocity={-60} 
            className="custom-scroll-text"
          />
        </div>

        <RegistrationSection />
        <TeamSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
