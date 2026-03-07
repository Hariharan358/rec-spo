import { Target, Eye, Users, Award } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { AnimatedHeading, AnimatedCounter } from "@/components/ui/AnimatedText";
import { FloatingElement, ParticleSystem } from "@/components/ui/FloatingElements";
import { TechCard } from "@/components/ui/TechCard";
import CardSwap, { Card } from "@/component/CardSwap";
import { motion, type BezierDefinition } from "framer-motion";

const smoothEase: BezierDefinition = [0.16, 1, 0.3, 1];

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: smoothEase,
    },
  }),
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      delay,
      ease: smoothEase,
    },
  }),
};

const fadeInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      delay,
      ease: smoothEase,
    },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      delay,
      ease: smoothEase,
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
};

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <ParticleSystem count={15} className="opacity-30" />
      <FloatingElement className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-violet/10 to-secondary/10 rounded-full" delay={0} />
      <FloatingElement className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-r from-secondary/10 to-violet/10 rounded-full" delay={2} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span
            className="inline-block text-secondary font-semibold text-sm uppercase tracking-widest mb-3 animate-shimmer"
            variants={fadeInUp}
            custom={0}
          >
            Est. 1985
          </motion.span>
          <motion.div variants={fadeInUp} custom={0.15}>
            <AnimatedHeading className="section-heading text-foreground" delay={0.3}>
              ABOUT <span className="gradient-text-animated">REC SPORTS</span>
            </AnimatedHeading>
          </motion.div>
          {/* Animated divider line */}
          <motion.div
            className="mx-auto mt-6 h-[2px] bg-gradient-to-r from-transparent via-violet-500/60 to-transparent"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 200, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left - Story */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.h3
              className="font-display text-3xl md:text-4xl text-foreground tracking-wider"
              variants={fadeInLeft}
              custom={0.1}
            >
              BUILDING CHAMPIONS SINCE 1985
            </motion.h3>
            <motion.p
              className="text-muted-foreground leading-relaxed"
              variants={fadeInLeft}
              custom={0.25}
            >
              The REC Sports Club at Rajalakshmi Engineering College was established with a vision to create a platform where students could excel in sports while pursuing their academic goals. Over the decades, we have grown into one of the most prestigious college sports clubs in the region.
            </motion.p>
            <motion.p
              className="text-muted-foreground leading-relaxed"
              variants={fadeInLeft}
              custom={0.4}
            >
              Our state-of-the-art facilities, experienced coaches, and dedicated training programs have produced numerous national and state-level athletes. We believe that sports build character, discipline, and leadership qualities that extend far beyond the playing field.
            </motion.p>

            {/* Enhanced Stats Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4 pt-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {[
                { value: 39, suffix: "+", label: "Years of Excellence" },
                { value: 10, suffix: "K+", label: "Alumni Athletes" },
                { value: 6, suffix: "", label: "Sports Categories" },
                { value: 15, suffix: "+", label: "Expert Coaches" },
              ].map((stat, index) => (
                <motion.div key={stat.label} className="group" variants={staggerItem}>
                  <TechCard className="p-4 border-none bg-violet-50/50 dark:bg-white/5 shadow-none hover:bg-violet-100/50 dark:hover:bg-white/10 transition-all duration-500 hover:-translate-y-1">
                    <div className="font-display text-3xl text-violet-600 dark:text-violet-400 group-hover:animate-pulse-scale">
                      <AnimatedCounter
                        end={stat.value}
                        suffix={stat.suffix}
                        duration={2}
                        delay={1.2 + index * 0.1}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-violet-600 dark:group-hover:text-violet-400">{stat.label}</div>
                  </TechCard>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Vision & Mission */}
          <motion.div
            className="relative h-[600px] w-full flex items-center justify-center lg:translate-x-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInRight}
            custom={0.3}
          >
            <CardSwap
              cardDistance={60}
              verticalDistance={40}
              delay={4000}
              pauseOnHover={true}
              width="100%"
              height="auto"
            >
              <Card customClass="p-0 border-none bg-transparent shadow-none">
                <TechCard className="p-6 md:p-8 w-full h-[400px] flex flex-col justify-center">
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-violet-100 dark:bg-violet-900/10 flex items-center justify-center mb-4 border border-violet-500/20"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Eye className="w-7 h-7 text-violet-600 dark:text-violet-400 animate-pulse-glow" />
                  </motion.div>
                  <h4 className="font-display text-3xl text-foreground tracking-wider mb-4">
                    OUR <span className="text-violet-600 dark:text-violet-400">VISION</span>
                  </h4>
                  <p className="text-muted-foreground leading-relaxed text-base font-light">
                    To be the leading college sports club that nurtures athletic excellence while developing well-rounded individuals who excel in sports and life.
                  </p>
                </TechCard>
              </Card>
              <Card customClass="p-0 border-none bg-transparent shadow-none">
                <TechCard className="p-6 md:p-8 w-full h-[400px] flex flex-col justify-center">
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-violet-100 dark:bg-violet-900/10 flex items-center justify-center mb-4 border border-violet-500/20"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Target className="w-7 h-7 text-violet-600 dark:text-violet-400 animate-pulse-glow" />
                  </motion.div>
                  <h4 className="font-display text-3xl text-foreground tracking-wider mb-4">
                    OUR <span className="text-violet-600 dark:text-violet-400">MISSION</span>
                  </h4>
                  <p className="text-muted-foreground leading-relaxed text-base font-light">
                    To provide world-class sports training, promote physical fitness, foster team spirit, and create opportunities for students to compete and excel at national and international levels.
                  </p>
                </TechCard>
              </Card>
              <Card customClass="p-0 border-none bg-transparent shadow-none">
                <TechCard className="p-6 md:p-8 w-full h-[400px] flex flex-col justify-center">
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-violet-100 dark:bg-violet-900/10 flex items-center justify-center mb-4 border border-violet-500/20"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Award className="w-7 h-7 text-violet-600 dark:text-violet-400 animate-pulse-glow" />
                  </motion.div>
                  <h4 className="font-display text-3xl text-foreground tracking-wider mb-4">
                    OUR <span className="text-violet-600 dark:text-violet-400">VALUES</span>
                  </h4>
                  <p className="text-muted-foreground leading-relaxed text-base font-light">
                    We prioritize integrity, discipline, teamwork, and inclusivity, creating an environment where every student athlete feels valued, empowered, and inspired to reach their full potential.
                  </p>
                </TechCard>
              </Card>
            </CardSwap>
          </motion.div>
        </div>

        <div className="mt-32 relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-display text-4xl md:text-5xl text-foreground tracking-tighter mb-4">
              CLUB <span className="opacity-40">LEADERSHIP</span>
            </h3>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </motion.div>

          {/* New Leadership Grid */}
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto px-4">
            {[
              {
                name: "Dr. M. Vijayaragavan",
                role: "Director of Physical Education",
                id: "REC-DIR-01",
                icon: Users,
                description: "Over 25 years of experience in athletic development and sports administration."
              },
              {
                name: "Ms. Renuga",
                role: "Sports Director",
                id: "REC-SPT-02",
                icon: Award,
                description: "Dedicated to fostering competitive spirit and excellence in collegiate sports."
              },
            ].map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-muted/20 -inset-x-4 -inset-y-4 rounded-3xl scale-95 group-hover:scale-100 transition-transform duration-500" />
                <div className="relative border border-border bg-card p-10 rounded-2xl flex flex-col items-start gap-6 h-full transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/5 group-hover:-translate-y-1">
                  <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10 mb-2">
                    <person.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1 block">
                      {person.id}
                    </span>
                    <h4 className="font-display text-2xl text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                      {person.name}
                    </h4>
                    <p className="font-sans text-sm font-semibold text-primary/80 uppercase tracking-widest mb-4">
                      {person.role}
                    </p>
                    <div className="w-full h-px bg-border/50 mb-4" />
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {person.description}
                    </p>
                  </div>

                  {/* Decorative corner element */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-4 h-4 border-t-2 border-r-2 border-primary/20" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Background Spirit Element - Runner moved to background with low opacity */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-[0.03] flex items-center justify-center z-0">
            <img src="/images/runner.png" alt="" className="w-full max-w-4xl object-contain grayscale" />
          </div>
        </div>
      </div>
    </section>
  );
};
