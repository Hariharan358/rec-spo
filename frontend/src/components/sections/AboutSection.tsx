import { Target, Eye, Users, Award } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { AnimatedHeading, AnimatedCounter } from "@/components/ui/AnimatedText";
import { FloatingElement, ParticleSystem } from "@/components/ui/FloatingElements";
import { TechCard } from "@/components/ui/TechCard";
import CardSwap, { Card } from "@/component/CardSwap";

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <ParticleSystem count={15} className="opacity-30" />
      <FloatingElement className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-violet/10 to-secondary/10 rounded-full" delay={0} />
      <FloatingElement className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-r from-secondary/10 to-violet/10 rounded-full" delay={2} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="fade" delay={0.2}>
          <div className="text-center mb-16">
            <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-widest mb-3 animate-shimmer">
              Est. 1985
            </span>
            <AnimatedHeading className="section-heading text-foreground" delay={0.3}>
              ABOUT <span className="gradient-text-animated">REC SPORTS</span>
            </AnimatedHeading>
          </div>
        </ScrollReveal>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left - Story */}
          <ScrollReveal direction="left" delay={0.4}>
            <div className="space-y-6">
              <h3 className="font-display text-3xl md:text-4xl text-foreground tracking-wider animate-text-glow">
                BUILDING CHAMPIONS SINCE 1985
              </h3>
              <p className="text-muted-foreground leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                The REC Sports Club at Rajalakshmi Engineering College was established with a vision to create a platform where students could excel in sports while pursuing their academic goals. Over the decades, we have grown into one of the most prestigious college sports clubs in the region.
              </p>
              <p className="text-muted-foreground leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                Our state-of-the-art facilities, experienced coaches, and dedicated training programs have produced numerous national and state-level athletes. We believe that sports build character, discipline, and leadership qualities that extend far beyond the playing field.
              </p>

              {/* Enhanced Stats Grid */}
              <StaggerContainer className="grid grid-cols-2 gap-4 pt-4" staggerDelay={0.1} initialDelay={1}>
                {[
                  { value: 39, suffix: "+", label: "Years of Excellence" },
                  { value: 10, suffix: "K+", label: "Alumni Athletes" },
                  { value: 6, suffix: "", label: "Sports Categories" },
                  { value: 15, suffix: "+", label: "Expert Coaches" },
                ].map((stat, index) => (
                  <StaggerItem key={stat.label} className="group">
                    <TechCard className="p-4 border-none bg-violet-50/50 dark:bg-white/5 shadow-none hover:bg-violet-100/50 dark:hover:bg-white/10 transition-colors">
                      <div className="font-display text-3xl text-violet-600 dark:text-violet-400 group-hover:animate-pulse-scale">
                        <AnimatedCounter
                          end={stat.value}
                          suffix={stat.suffix}
                          duration={2}
                          delay={1.2 + index * 0.1}
                        />
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </TechCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>

          {/* Right - Vision & Mission */}
          <ScrollReveal direction="right" delay={0.6}>
            <div className="relative h-[600px] w-full flex items-center justify-center lg:translate-x-10">
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
                    <div className="w-14 h-14 rounded-xl bg-violet-100 dark:bg-violet-900/10 flex items-center justify-center mb-4 border border-violet-500/20">
                      <Eye className="w-7 h-7 text-violet-600 dark:text-violet-400 animate-pulse-glow" />
                    </div>
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
                    <div className="w-14 h-14 rounded-xl bg-violet-100 dark:bg-violet-900/10 flex items-center justify-center mb-4 border border-violet-500/20">
                      <Target className="w-7 h-7 text-violet-600 dark:text-violet-400 animate-pulse-glow" />
                    </div>
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
                    <div className="w-14 h-14 rounded-xl bg-violet-100 dark:bg-violet-900/10 flex items-center justify-center mb-4 border border-violet-500/20">
                      <Award className="w-7 h-7 text-violet-600 dark:text-violet-400 animate-pulse-glow" />
                    </div>
                    <h4 className="font-display text-3xl text-foreground tracking-wider mb-4">
                      OUR <span className="text-violet-600 dark:text-violet-400">VALUES</span>
                    </h4>
                    <p className="text-muted-foreground leading-relaxed text-base font-light">
                      We prioritize integrity, discipline, teamwork, and inclusivity, creating an environment where every student athlete feels valued, empowered, and inspired to reach their full potential.
                    </p>
                  </TechCard>
                </Card>
              </CardSwap>
            </div>
          </ScrollReveal>
        </div>

        {/* Enhanced Leadership */}
        <ScrollReveal direction="up" delay={0.8}>
          <div className="glass-card rounded-2xl p-8 md:p-12 hover-glow">
            <AnimatedHeading className="font-display text-2xl md:text-3xl text-foreground tracking-wider text-center mb-8" delay={1}>
              CLUB LEADERSHIP
            </AnimatedHeading>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Left Column - Image */}
              <ScrollReveal direction="right" delay={1}>
                <div className="relative h-full min-h-[400px] flex items-center justify-center">
                  <div className="absolute inset-0 bg-violet-500/10 blur-3xl rounded-full" />
                  <img
                    src="https://images.unsplash.com/photo-1552674605-46d536d2e613?auto=format&fit=crop&q=80&w=800"
                    alt="Runner Sprinting"
                    className="relative z-10 w-full max-w-[500px] object-contain drop-shadow-2xl opacity-90 hover:scale-105 transition-transform duration-700 mix-blend-luminosity hover:mix-blend-normal"
                  />
                </div>
              </ScrollReveal>

              {/* Right Column - Leadership Cards */}
              <StaggerContainer className="flex flex-col gap-6" staggerDelay={0.15} initialDelay={1.2}>
                {[
                  { name: "Dr.M.Vijayaragavan", role: "Director Of Physical Education", id: "REC-DIR-01", icon: Users },
                  { name: "Ms.Renuga", role: "Sports Director", id: "REC-SPT-02", icon: Award },
                ].map((person, index) => (
                  <StaggerItem key={person.name} className="group w-full">
                    <TechCard className="p-6 md:p-8 flex items-center gap-6 bg-white/50 dark:bg-[#0a0a0a]/80 backdrop-blur-sm border border-black/40 dark:border-violet-500/10 hover:border-violet-500/40 text-left">

                      {/* Avatar */}
                      <div className="relative shrink-0">
                        <div className="absolute inset-0 bg-violet-500/20 blur-xl rounded-full group-hover:bg-violet-500/30 transition-all duration-500" />
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white to-violet-50 dark:from-neutral-900 dark:to-neutral-800 border-2 border-violet-500/20 flex items-center justify-center relative z-10 group-hover:scale-105 transition-transform duration-500">
                          <person.icon className="w-8 h-8 text-violet-600 dark:text-violet-400 group-hover:text-violet-500 transition-colors" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-display text-xl md:text-2xl text-foreground group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors truncate">
                            {person.name}
                          </h4>
                          <span className="text-[10px] font-mono text-violet-400 opacity-60 ml-2 shrink-0">
                            [{person.id}]
                          </span>
                        </div>

                        <div className="h-px w-12 bg-violet-500/30 my-2 group-hover:w-full transition-all duration-500" />

                        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground truncate">
                          {person.role}
                        </p>
                      </div>
                    </TechCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
