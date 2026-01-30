import { Zap, Clock, MapPin, User, Star } from "lucide-react";
import { useData } from "@/context/DataContext";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { AnimatedHeading } from "@/components/ui/AnimatedText";
import { FloatingElement, MorphingShape, GlowOrb } from "@/components/ui/FloatingElements";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import CircularGallery from "@/component/CircularGallery";

export const SportsSection = () => {
  const { sports } = useData();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Transform sports data for CircularGallery
  const galleryItems = sports.map(sport => ({
    image: sport.image,
    text: sport.name
  }));

  // Responsive configuration
  const getResponsiveConfig = () => {
    if (windowWidth < 640) { // Mobile
      return {
        bend: 1,
        scrollSpeed: 1.2,
        scrollEase: 0.5,
        font: '500 18px Teko'
      };
    } else if (windowWidth < 768) { // Small tablet
      return {
        bend: 1.5,
        scrollSpeed: 1.5,
        scrollEase: 0.08,
        font: '500 22px Teko'
      };
    } else if (windowWidth < 1024) { // Tablet
      return {
        bend: 2,
        scrollSpeed: 1.8,
        scrollEase: 0.06,
        font: '500 26px Teko'
      };
    } else { // Desktop
      return {
        bend: 3,
        scrollSpeed: 2,
        scrollEase: 0.05,
        font: '500 30px Teko'
      };
    }
  };

  const config = getResponsiveConfig();

  return (
    <section id="sports" className="py-20 md:py-28 bg-muted relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <GlowOrb className="top-10 right-10" size={300} intensity={0.1} />
      <GlowOrb className="bottom-10 left-10" size={250} intensity={0.15} />
      <MorphingShape className="top-1/4 left-1/4" size={80} />
      <MorphingShape className="bottom-1/3 right-1/3" size={60} />
      
      <FloatingElement className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-violet/10 to-secondary/10 rounded-full" delay={0} />
      <FloatingElement className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-r from-secondary/10 to-violet/10 rounded-full" delay={3} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Section Header */}
        <ScrollReveal direction="fade" delay={0.2}>
          <div className="text-center mb-16">
            <motion.div 
              className="inline-flex items-center gap-2 glass-card rounded-full px-6 py-2 mb-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="w-4 h-4 text-secondary animate-pulse" />
              <span className="text-secondary font-semibold text-sm uppercase tracking-widest">
                Train Like Champions
              </span>
            </motion.div>
            <AnimatedHeading className="section-heading text-foreground" delay={0.3}>
              OUR <span className="gradient-text-animated">SPORTS</span>
            </AnimatedHeading>
            <ScrollReveal direction="up" delay={0.5}>
              <p className="text-muted-foreground mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
                Choose from our diverse range of sports and find your passion. Each program offers professional coaching and competitive opportunities.
              </p>
            </ScrollReveal>
          </div>
        </ScrollReveal>

        {/* Circular Gallery for Sports */}
        <ScrollReveal direction="up" delay={0.8}>
          <div className="mb-16 relative h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] xl:h-[700px]">
            <CircularGallery 
              items={galleryItems}
              bend={config.bend} 
              textColor="#ffffff" 
              borderRadius={0.05} 
              scrollSpeed={config.scrollSpeed}
              scrollEase={config.scrollEase}
              font={config.font}
            />
          </div>
        </ScrollReveal>

        {/* Sports Details Grid - Additional Information */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16" staggerDelay={0.1} initialDelay={1.0}>
          {sports.map((sport, index) => (
            <StaggerItem key={sport.id}>
              <motion.div 
                className="glass-card p-6 backdrop-blur-sm border border-white/10 hover-glow"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg gradient-text">{sport.name}</h3>
                  <span className="flex items-center gap-1 text-yellow-600 font-semibold">
                    <Star className="w-4 h-4 fill-current" /> {sport.rating}
                  </span>
                </div>
                
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <span>{sport.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span>{sport.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-secondary" />
                    <span>{sport.members} Active Members</span>
                  </div>
                </div>

                <motion.button 
                  className="w-full mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-violet to-secondary text-white font-semibold hover-bounce"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join {sport.name} Team
                </motion.button>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Enhanced Call to Action */}
        <ScrollReveal direction="up" delay={1.2}>
          <div className="text-center mt-16">
            <motion.div 
              className="glass-card p-8 max-w-2xl mx-auto backdrop-blur-sm border border-white/10 hover-glow"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-display text-2xl text-foreground mb-4 gradient-text-animated">
                CAN'T DECIDE? TRY THEM ALL!
              </h3>
              <p className="text-muted-foreground mb-6">
                Join our multi-sport membership and get access to all sports programs with flexible scheduling.
              </p>
              <motion.button 
                className="btn-athletic px-8 py-3 group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Star className="w-5 h-5 mr-2 group-hover:animate-spin" />
                Get Multi-Sport Pass
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
