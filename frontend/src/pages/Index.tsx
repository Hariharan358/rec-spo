import { Header } from "@/components/layout/Header";
import { GridBackground } from "@/components/ui/GridBackground";
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
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <GridBackground>
          <AboutSection />

          {/* Enhanced ScrollVelocity Effect between sections */}
          <motion.div 
            className="bg-gradient-to-r from-violet/20 via-secondary/30 to-violet/20 py-4 relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet/10 to-transparent animate-shimmer" />
            
            <ScrollVelocity
              texts={['REC SPORTS CLUB', 'RAJALAKSHMI ENGINEERING COLLEGE', 'CHAMPIONS LEAGUE']}
              velocity={75}
              className="custom-scroll-text text-shadow-glow"
            />
          </motion.div>

          <SportsSection />
          <EventsSection />

          {/* Another Enhanced ScrollVelocity Effect */}
          <motion.div 
            className="bg-gradient-to-r from-secondary/20 via-violet/30 to-secondary/20 py-6 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated background pattern */}
            <div className="absolute inset-0">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-secondary/20 rounded-full"
                  style={{
                    left: `${20 + i * 20}%`,
                    top: '50%',
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            <ScrollVelocity
              texts={['EXCELLENCE', 'REC SPORTS', 'VICTORY']}
              velocity={-60}
              className="custom-scroll-text gradient-text-animated"
            />
          </motion.div>

          <RegistrationSection />
          <TeamSection />
          <GallerySection />
          <ContactSection />
        </GridBackground>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
