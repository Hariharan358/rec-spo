import { ChevronDown, Calendar, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Athletes celebrating victory"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <Award className="w-4 h-4 text-secondary" />
            <span className="text-sm text-primary-foreground font-medium">
              State Champions 2024
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary-foreground tracking-wider mb-6 animate-slide-up">
            UNLEASH YOUR
            <span className="block text-gradient">POTENTIAL</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Join the Titans Sports Club and be part of a legacy of champions. Train with the best, compete at the highest level, and forge friendships that last a lifetime.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button
              variant="athletic"
              size="lg"
              onClick={() => scrollToSection("#register")}
            >
              Join the Club
            </Button>
            <Button
              variant="hero"
              size="lg"
              onClick={() => scrollToSection("#events")}
            >
              Upcoming Events
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto animate-slide-up" style={{ animationDelay: "0.3s" }}>
            {[
              { icon: Users, value: "500+", label: "Athletes" },
              { icon: Award, value: "50+", label: "Trophies" },
              { icon: Calendar, value: "20+", label: "Events/Year" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/20"
              >
                <stat.icon className="w-6 h-6 text-secondary mx-auto mb-2" />
                <div className="font-display text-2xl md:text-3xl text-primary-foreground">
                  {stat.value}
                </div>
                <div className="text-xs text-primary-foreground/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
        <button
          onClick={() => scrollToSection("#about")}
          className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
};
