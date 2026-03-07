import { Header } from "@/components/layout/Header";
import { GridBackground } from "@/components/ui/GridBackground";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SportsSection } from "@/components/sections/SportsSection";
import { FacilitiesSection } from "@/components/sections/FacilitiesSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { RegistrationSection } from "@/components/sections/RegistrationSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { ContactSection } from "@/components/sections/ContactSection";
import { IntroSection } from "@/components/sections/IntroSection";
import ScrollVelocity from "@/components/ScrollVelocity";
import { Parallax, ParallaxElement } from "@/components/ui/Parallax";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { ScrollAnimatedSection } from "@/components/ui/ScrollAnimatedSection";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Track intro section scroll to control main content fade-in
  const { scrollYProgress: introScrollProgress } = useScroll({
    target: introRef,
    offset: ["start start", "end start"],
  });

  // Main content fades in as intro finishes (opacity 0 → 1)
  const mainContentOpacity = useTransform(introScrollProgress, [0.75, 0.95], [0, 1]);

  // Smooth spring-based scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax transforms for decorative elements
  const bgY1 = useTransform(smoothProgress, [0, 1], [0, -300]);
  const bgY2 = useTransform(smoothProgress, [0, 1], [0, -500]);
  const bgRotate = useTransform(smoothProgress, [0, 1], [0, 360]);
  const bgScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.2, 0.8]);
  const opacityFade = useTransform(smoothProgress, [0, 0.1], [1, 0]);


  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground relative selection:bg-muted/50">
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>


      <Header />
      <main>
        {/* Intro Landing - REC SPO zoom into S */}
        <div ref={introRef}>
          <IntroSection />
        </div>

        {/* Main content fades in after intro completes */}
        <motion.div style={{ opacity: mainContentOpacity }}>
          {/* Hero with scroll-fade indicator */}
          <div className="relative">
            <HeroSection />
            {/* Scroll hint that fades on scroll */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-20"
              style={{ opacity: opacityFade }}
            />
          </div>

          <div className="relative w-full text-foreground">

            {/* About Section - Smooth fade-up reveal */}
            <ScrollAnimatedSection animation="fade-up" duration={1.2}>
              <Parallax speed={0.1}>
                <AboutSection />
              </Parallax>
            </ScrollAnimatedSection>

            {/* Enhanced ScrollVelocity Effect between sections */}
            <div
              className="scroll-velocity-banner bg-muted py-12 md:py-16 relative overflow-hidden my-12 border-y-2 border-primary/20 z-50"
            >
              <ScrollVelocity
                texts={['REC SPORTS CLUB', 'RAJALAKSHMI ENGINEERING COLLEGE', 'CHAMPIONS LEAGUE']}
                velocity={75}
                numCopies={12}
                className="custom-scroll-text"
              />
            </div>


            {/* Sports Section - Blur reveal for dramatic effect */}
            <ScrollAnimatedSection animation="blur" duration={1}>
              <SportsSection />
            </ScrollAnimatedSection>

            {/* Facilities Section - Fade up reveal */}
            <ScrollAnimatedSection animation="fade-up" duration={1.1}>
              <Parallax speed={0.12}>
                <FacilitiesSection />
              </Parallax>
            </ScrollAnimatedSection>

            {/* Events Section - Slide from left */}
            <ScrollAnimatedSection animation="fade-up" duration={1.1}>
              <Parallax speed={0.1} direction="down">
                <EventsSection />
              </Parallax>
            </ScrollAnimatedSection>

            {/* Another Enhanced ScrollVelocity Effect */}
            <div
              className="scroll-velocity-banner bg-primary/5 py-16 md:py-24 relative overflow-hidden my-12 border-y-2 border-primary/20 z-50"
            >
              <ScrollVelocity
                texts={['EXCELLENCE', 'REC SPORTS', 'VICTORY']}
                velocity={-60}
                numCopies={12}
                className="custom-scroll-text"
              />
            </div>

            {/* Parallax elements removed */}

            {/* Registration Section - Scale reveal */}
            <ScrollAnimatedSection animation="scale" duration={1}>
              <Parallax speed={0.12}>
                <RegistrationSection />
              </Parallax>
            </ScrollAnimatedSection>

            {/* Team Section - Fade up */}
            <ScrollAnimatedSection animation="fade-up" duration={1.2} delay={0.1}>
              <Parallax speed={0.18} direction="up">
                <TeamSection />
              </Parallax>
            </ScrollAnimatedSection>

            {/* Parallax elements removed */}

            {/* Gallery Section - Blur reveal */}
            <ScrollAnimatedSection animation="blur" duration={1.1}>
              <Parallax speed={0.14}>
                <GallerySection />
              </Parallax>
            </ScrollAnimatedSection>

            {/* Contact Section - Slide up */}
            <ScrollAnimatedSection animation="fade-up" duration={1}>
              <Parallax speed={0.1}>
                <ContactSection />
              </Parallax>
            </ScrollAnimatedSection>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
