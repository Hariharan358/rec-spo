import { Clock, MapPin, User, Star, Zap } from "lucide-react";
import { useData } from "@/context/DataContext";

export const SportsSection = () => {
  const { sports } = useData();

  return (
    <section id="sports" className="py-20 md:py-28 bg-muted relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-violet/10 to-secondary/10 rounded-full animate-float floating-element" style={{ '--delay': '0s' } as React.CSSProperties}></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-r from-secondary/10 to-violet/10 rounded-full animate-float floating-element" style={{ '--delay': '3s' } as React.CSSProperties}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet/10 to-secondary/10 rounded-full px-6 py-2 mb-4 animate-bounce-in">
            <Zap className="w-4 h-4 text-secondary animate-pulse" />
            <span className="text-secondary font-semibold text-sm uppercase tracking-widest">
              Train Like Champions
            </span>
          </div>
          <h2 className="section-heading text-foreground stagger-animation" style={{ '--delay': '0.2s' } as React.CSSProperties}>
            OUR <span className="text-purple-500 ">SPORTS</span>
          </h2>
          <p className="text-muted-foreground mt-6 max-w-3xl mx-auto text-lg leading-relaxed stagger-animation" style={{ '--delay': '0.4s' } as React.CSSProperties}>
            Choose from our diverse range of sports and find your passion. Each program offers professional coaching and competitive opportunities.
          </p>
        </div>

        {/* Sports Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sports.map((sport, index) => (
            <div
              key={sport.id}
              className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] stagger-animation"
              style={{ '--delay': `${0.6 + index * 0.1}s` } as React.CSSProperties}
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                <img
                  src={sport.image}
                  alt={sport.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Floating Badge */}
                {sport.featured && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/90 backdrop-blur-sm text-black text-xs font-bold tracking-wide shadow-lg">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      FEATURED
                    </span>
                  </div>
                )}

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-display font-black text-4xl text-white tracking-wide uppercase mb-2 drop-shadow-lg">
                    {sport.name}
                  </h3>
                  <div className="flex items-center gap-4 text-white/90 text-sm font-medium">
                    <span className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      <User className="w-4 h-4 text-purple-400" />
                      {sport.members} Members
                    </span>
                    <span className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      <Star className="w-4 h-4 text-yellow-400" />
                      {sport.rating}/5.0
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 space-y-6 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
                      <Clock className="w-3.5 h-3.5" />
                      Schedule
                    </div>
                    <p className="text-sm text-white/80 font-medium leading-tight">
                      {sport.schedule}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
                      <MapPin className="w-3.5 h-3.5" />
                      Venue
                    </div>
                    <p className="text-sm text-white/80 font-medium leading-tight">
                      {sport.venue}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white ring-2 ring-white/10">
                        <span className="font-display font-bold text-lg">{sport.coach.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">Head Coach</p>
                        <p className="text-sm text-white font-medium">{sport.coach}</p>
                      </div>
                    </div>

                    <button className="group/btn relative w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:border-white transition-all duration-300">
                      <Zap className="w-5 h-5 text-white group-hover/btn:text-purple-600 transition-colors duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 stagger-animation" style={{ '--delay': '1.2s' } as React.CSSProperties}>
          <div className="card-premium p-8 max-w-2xl mx-auto">
            <h3 className="font-display text-2xl text-foreground mb-4 gradient-text">
              CAN'T DECIDE? TRY THEM ALL!
            </h3>
            <p className="text-muted-foreground mb-6">
              Join our multi-sport membership and get access to all sports programs with flexible scheduling.
            </p>
            <button className="btn-athletic px-8 py-3 group">
              <Star className="w-5 h-5 mr-2 group-hover:animate-spin" />
              Get Multi-Sport Pass
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
