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
import { Parallax, ParallaxElement } from "@/components/ui/Parallax";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-violet-500/30">
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

      <Header />
      <main>
        <HeroSection />
        <GridBackground>
          {/* Parallax floating elements */}
          <ParallaxElement speed={0.2} className="absolute top-20 left-10 z-0">
            <div className="w-32 h-32 bg-gradient-to-r from-violet/10 to-secondary/10 rounded-full blur-xl" />
          </ParallaxElement>
          <ParallaxElement speed={0.3} className="absolute top-40 right-20 z-0">
            <div className="w-24 h-24 bg-gradient-to-r from-secondary/10 to-violet/10 rounded-full blur-lg" />
          </ParallaxElement>

          <Parallax speed={0.1}>
            <AboutSection />
          </Parallax>

          {/* Enhanced ScrollVelocity Effect between sections */}
          <Parallax speed={0.2}>
            <motion.div
              className="bg-gradient-to-r from-violet/20 via-secondary/30 to-violet/20 py-4 relative overflow-hidden my-12"
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
          </Parallax>

          {/* More floating elements */}
          <ParallaxElement speed={0.4} className="absolute top-[800px] left-1/4 z-0">
            <div className="w-16 h-16 bg-gradient-to-r from-violet/20 to-secondary/20 rounded-full blur-md" />
          </ParallaxElement>

          <SportsSection />

          <ParallaxElement speed={0.25} className="absolute top-[1200px] right-10 z-0">
            <div className="w-40 h-40 bg-gradient-to-r from-secondary/10 to-violet/10 rounded-full blur-2xl" />
          </ParallaxElement>

          <Parallax speed={0.1} direction="down">
            <EventsSection />
          </Parallax>

          {/* Another Enhanced ScrollVelocity Effect */}
          <Parallax speed={0.3}>
            <motion.div
              className="bg-gradient-to-r from-secondary/20 via-violet/30 to-secondary/20 py-6 relative overflow-hidden my-12"
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
          </Parallax>

          <ParallaxElement speed={0.2} className="absolute top-[1800px] left-20 z-0">
            <div className="w-28 h-28 bg-gradient-to-r from-violet/15 to-secondary/15 rounded-full blur-lg" />
          </ParallaxElement>

          <Parallax speed={0.12}>
            <RegistrationSection />
          </Parallax>

          <Parallax speed={0.18} direction="up">
            <TeamSection />
          </Parallax>

          <ParallaxElement speed={0.35} className="absolute top-[2400px] right-1/4 z-0">
            <div className="w-20 h-20 bg-gradient-to-r from-secondary/20 to-violet/20 rounded-full blur-md" />
          </ParallaxElement>

          <Parallax speed={0.14}>
            <GallerySection />
          </Parallax>

          <Parallax speed={0.1}>
            <ContactSection />
          </Parallax>
        </GridBackground>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
