import { ChevronDown, Calendar, Users, Award, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollVelocity from "@/components/ScrollVelocity";
import heroImage from "@/assets/hero-sports.jpg";

export const HeroSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-violet to-violet-dark rounded-full opacity-20 animate-float floating-element" style={{ '--delay': '0s' } as React.CSSProperties}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-secondary to-lavender rounded-full opacity-30 animate-float floating-element" style={{ '--delay': '2s' } as React.CSSProperties}></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-violet-dark to-violet rounded-full opacity-25 animate-float floating-element" style={{ '--delay': '4s' } as React.CSSProperties}></div>
        <div className="absolute top-60 left-1/3 w-8 h-8 bg-gradient-to-r from-lavender to-secondary rounded-full opacity-40 animate-float floating-element" style={{ '--delay': '1s' } as React.CSSProperties}></div>
      </div>

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Athletes celebrating victory"
          className="w-full h-full object-cover animate-scale-in"
        />
        <div className="absolute inset-0 bg-gradient-overlay animate-gradient-shift" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Floating Badge */}
          <div className="inline-flex items-center gap-3 glass-effect rounded-full px-6 py-3 mb-8 animate-bounce-in hover-lift">
            <div className="relative">
              <Award className="w-5 h-5 text-secondary animate-pulse-glow" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping"></div>
            </div>
            <span className="text-sm text-primary-foreground font-semibold tracking-wide">
              REC SPORTS CLUB
            </span>
            
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-primary-foreground tracking-wider mb-8 stagger-animation" style={{ '--delay': '0.2s' } as React.CSSProperties}>
            UNLEASH YOUR
            <span className="block gradient-text animate-text-glow relative">
              POTENTIAL
              <div className="absolute -top-4 -right-4 animate-bounce-in" style={{ '--delay': '1s' } as React.CSSProperties}>
                <Star className="w-8 h-8 text-yellow-400 animate-spin" />
              </div>
            </span>
          </h1>

          {/* Enhanced Subtitle */}
          <div className="relative max-w-3xl mx-auto mb-10 stagger-animation" style={{ '--delay': '0.4s' } as React.CSSProperties}>
            <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
              Join the <span className="gradient-text font-semibold">REC Sports Club</span> at Rajalakshmi Engineering College and be part of a legacy of champions. 
              Train with the best, compete at the highest level, and forge friendships that last a lifetime.
            </p>
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-secondary to-violet-dark rounded-full animate-shimmer"></div>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 stagger-animation" style={{ '--delay': '0.6s' } as React.CSSProperties}>
            <Button
              variant="athletic"
              size="lg"
              className="btn-athletic group relative overflow-hidden"
              onClick={() => scrollToSection("#register")}
            >
              <Zap className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Join the Club
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Button>
            <Button
              variant="hero"
              size="lg"
              className="btn-glass group"
              onClick={() => scrollToSection("#events")}
            >
              <Calendar className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Upcoming Events
            </Button>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto stagger-animation" style={{ '--delay': '0.8s' } as React.CSSProperties}>
            {[
              { icon: Users, value: "500+", label: "Athletes", color: "from-blue-400 to-blue-600" },
              { icon: Award, value: "50+", label: "Trophies", color: "from-yellow-400 to-orange-500" },
              { icon: Calendar, value: "20+", label: "Events/Year", color: "from-green-400 to-emerald-500" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="card-premium p-6 hover-lift group animate-rotate-in"
                style={{ '--delay': `${0.9 + index * 0.1}s` } as React.CSSProperties}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 animate-morph`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="font-display text-3xl md:text-4xl text-primary-foreground gradient-text">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/70 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-in" style={{ '--delay': '1.2s' } as React.CSSProperties}>
        <button
          onClick={() => scrollToSection("#about")}
          className="group flex flex-col items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground transition-all duration-300"
          aria-label="Scroll down"
        >
          <span className="text-xs font-medium tracking-wider">SCROLL</span>
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
            <div className="w-1 h-3 bg-current rounded-full mt-2 animate-bounce"></div>
          </div>
         
        </button>
      </div>

      {/* Particle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-secondary rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              '--delay': `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            } as React.CSSProperties}
          ></div>
        ))}
      </div>

      {/* ScrollVelocity Effect */}
      
    </section>
  );
};
