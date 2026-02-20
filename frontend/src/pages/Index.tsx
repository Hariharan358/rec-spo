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
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { ScrollAnimatedSection } from "@/components/ui/ScrollAnimatedSection";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

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
    <div ref={containerRef} className="min-h-screen bg-background text-foreground relative selection:bg-violet-500/30">
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

      {/* Scroll-linked floating orbs - enhanced with Lenis smoothness */}
      <motion.div
        className="fixed top-20 left-10 w-72 h-72 bg-gradient-to-r from-violet-500/8 to-purple-500/8 rounded-full blur-3xl pointer-events-none z-0"
        style={{ y: bgY1 }}
      />
      <motion.div
        className="fixed bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-indigo-500/5 to-violet-500/5 rounded-full blur-3xl pointer-events-none z-0"
        style={{ y: bgY2, rotate: bgRotate }}
      />
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-violet-500/3 to-transparent rounded-full blur-3xl pointer-events-none z-0"
        style={{ scale: bgScale }}
      />

      <Header />
      <main>
        {/* Hero with scroll-fade indicator */}
        <div className="relative">
          <HeroSection />
          {/* Scroll hint that fades on scroll */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-20"
            style={{ opacity: opacityFade }}
          />
        </div>

        <GridBackground>
          {/* Parallax floating elements */}
          <ParallaxElement speed={0.2} className="absolute top-20 left-10 z-0">
            <div className="w-32 h-32 bg-gradient-to-r from-violet/10 to-secondary/10 rounded-full blur-xl" />
          </ParallaxElement>
          <ParallaxElement speed={0.3} className="absolute top-40 right-20 z-0">
            <div className="w-24 h-24 bg-gradient-to-r from-secondary/10 to-violet/10 rounded-full blur-lg" />
          </ParallaxElement>

          {/* About Section - Smooth fade-up reveal */}
          <ScrollAnimatedSection animation="fade-up" duration={1.2}>
            <Parallax speed={0.1}>
              <AboutSection />
            </Parallax>
          </ScrollAnimatedSection>

          {/* Enhanced ScrollVelocity Effect between sections */}
          <ScrollAnimatedSection animation="scale" duration={1}>
            <Parallax speed={0.2}>
              <motion.div
                className="scroll-velocity-banner bg-gradient-to-r from-violet/20 via-secondary/30 to-violet/20 py-4 relative overflow-hidden my-12"
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
          </ScrollAnimatedSection>

          {/* More floating elements */}
          <ParallaxElement speed={0.4} className="absolute top-[800px] left-1/4 z-0">
            <div className="w-16 h-16 bg-gradient-to-r from-violet/20 to-secondary/20 rounded-full blur-md" />
          </ParallaxElement>

          {/* Sports Section - Blur reveal for dramatic effect */}
          <ScrollAnimatedSection animation="blur" duration={1}>
            <SportsSection />
          </ScrollAnimatedSection>

          <ParallaxElement speed={0.25} className="absolute top-[1200px] right-10 z-0">
            <div className="w-40 h-40 bg-gradient-to-r from-secondary/10 to-violet/10 rounded-full blur-2xl" />
          </ParallaxElement>

          {/* Events Section - Slide from left */}
          <ScrollAnimatedSection animation="fade-up" duration={1.1}>
            <Parallax speed={0.1} direction="down">
              <EventsSection />
            </Parallax>
          </ScrollAnimatedSection>

          {/* Another Enhanced ScrollVelocity Effect */}
          <ScrollAnimatedSection animation="clip-reveal" duration={1.2}>
            <Parallax speed={0.3}>
              <motion.div
                className="scroll-velocity-banner bg-gradient-to-r from-secondary/20 via-violet/30 to-secondary/20 py-6 relative overflow-hidden my-12"
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
          </ScrollAnimatedSection>

          <ParallaxElement speed={0.2} className="absolute top-[1800px] left-20 z-0">
            <div className="w-28 h-28 bg-gradient-to-r from-violet/15 to-secondary/15 rounded-full blur-lg" />
          </ParallaxElement>

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

          <ParallaxElement speed={0.35} className="absolute top-[2400px] right-1/4 z-0">
            <div className="w-20 h-20 bg-gradient-to-r from-secondary/20 to-violet/20 rounded-full blur-md" />
          </ParallaxElement>

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
        </GridBackground>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
