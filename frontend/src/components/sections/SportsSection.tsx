import { Zap, Clock, MapPin, User, Star } from "lucide-react";
import { useData } from "@/context/DataContext";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { AnimatedHeading } from "@/components/ui/AnimatedText";
import { FloatingElement, MorphingShape, GlowOrb } from "@/components/ui/FloatingElements";
import { motion } from "framer-motion";

export const SportsSection = () => {
  const { sports } = useData();

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

        {/* Enhanced Sports Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.15} initialDelay={0.6}>
          {sports.map((sport, index) => (
            <StaggerItem key={sport.id}>
              <CardContainer className="inter-var" containerClassName="py-10">
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-auto h-auto rounded-xl p-6 border transition-all duration-500 hover-lift">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white gradient-text"
                  >
                    {sport.name}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3 animate-pulse" /> {sport.venue}
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4 overflow-hidden rounded-xl">
                    <motion.img
                      src={sport.image}
                      height="1000"
                      width="1000"
                      className="h-60 w-full object-cover group-hover/card:shadow-xl transition-all duration-500"
                      alt={sport.name}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </CardItem>

                  {/* Enhanced Additional Info / Footer */}
                  <div className="flex justify-between items-center mt-10">
                    <CardItem
                      translateZ={20}
                      className="flex items-center gap-2 text-xs font-normal dark:text-white"
                    >
                      <User className="w-3 h-3 animate-pulse" /> {sport.members} Members
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as={motion.button}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet to-secondary text-white text-xs font-bold hover-bounce"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Join Team
                    </CardItem>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <CardItem translateZ={30} className="flex items-center justify-between text-xs text-neutral-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 animate-pulse" /> {sport.schedule}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-yellow-600">
                        <Star className="w-3 h-3 fill-current animate-pulse-glow" /> {sport.rating}
                      </span>
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
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
