import { Target, Eye, Users, Award } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { AnimatedHeading, AnimatedCounter } from "@/components/ui/AnimatedText";
import { FloatingElement, ParticleSystem } from "@/components/ui/FloatingElements";

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
                  <StaggerItem key={stat.label} className="card-sports p-4 hover-lift group">
                    <div className="font-display text-3xl text-secondary group-hover:animate-pulse-scale">
                      <AnimatedCounter 
                        end={stat.value} 
                        suffix={stat.suffix}
                        duration={2}
                        delay={1.2 + index * 0.1}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>

          {/* Right - Vision & Mission */}
          <ScrollReveal direction="right" delay={0.6}>
            <div className="space-y-6">
              <div className="card-sports p-6 md:p-8 hover-tilt group">
                <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:animate-bounce">
                  <Eye className="w-7 h-7 text-secondary group-hover:animate-pulse-glow" />
                </div>
                <h4 className="font-display text-2xl text-foreground tracking-wider mb-3 gradient-text">
                  OUR VISION
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  To be the leading college sports club that nurtures athletic excellence while developing well-rounded individuals who excel in sports and life.
                </p>
              </div>

              <div className="card-sports p-6 md:p-8 hover-tilt group">
                <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:animate-bounce">
                  <Target className="w-7 h-7 text-secondary group-hover:animate-pulse-glow" />
                </div>
                <h4 className="font-display text-2xl text-foreground tracking-wider mb-3 gradient-text">
                  OUR MISSION
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  To provide world-class sports training, promote physical fitness, foster team spirit, and create opportunities for students to compete and excel at national and international levels.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Enhanced Leadership */}
        <ScrollReveal direction="up" delay={0.8}>
          <div className="glass-card rounded-2xl p-8 md:p-12 hover-glow">
            <AnimatedHeading className="font-display text-2xl md:text-3xl text-foreground tracking-wider text-center mb-8" delay={1}>
              CLUB LEADERSHIP
            </AnimatedHeading>
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.15} initialDelay={1.2}>
              {[
                { name: "Dr.M.Vijayaragavan", role: "Director Of Physical Education", icon: Users },
                { name: "Ms.Renuga", role: "Sports Director", icon: Award },
              ].map((person, index) => (
                <StaggerItem key={person.name} className="text-center group">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-violet to-secondary mx-auto mb-4 flex items-center justify-center group-hover:animate-pulse-scale hover-bounce">
                    <person.icon className="w-8 h-8 text-white group-hover:animate-wave" />
                  </div>
                  <h4 className="font-semibold text-foreground group-hover:gradient-text transition-all duration-300">{person.name}</h4>
                  <p className="text-sm text-muted-foreground">{person.role}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
