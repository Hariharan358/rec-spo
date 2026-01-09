import { Clock, MapPin, User, Star, Trophy, Zap } from "lucide-react";
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
            OUR <span className="gradient-text animate-text-glow">SPORTS</span>
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
              className={`group relative ${sport.featured ? 'card-premium' : 'card-sports'} overflow-hidden hover-lift card-3d stagger-animation`}
              style={{ '--delay': `${0.6 + index * 0.1}s` } as React.CSSProperties}
            >
              {/* Featured Badge */}
              {sport.featured && (
                <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse-glow">
                  <Star className="w-3 h-3 inline mr-1" />
                  FEATURED
                </div>
              )}

              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={sport.image}
                  alt={sport.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent" />

                {/* Sport Name Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-3xl text-primary-foreground tracking-wider mb-2 group-hover:animate-text-glow">
                    {sport.name.toUpperCase()}
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-primary-foreground/90 text-sm font-medium">{sport.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4 text-secondary" />
                      <span className="text-primary-foreground/90 text-sm">{sport.members} members</span>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-violet/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="text-center">
                    <Trophy className="w-12 h-12 text-white mx-auto mb-2 animate-bounce-in" />
                    <p className="text-white font-semibold">Join Now</p>
                  </div>
                </div>
              </div>

              {/* Enhanced Details */}
              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 group/item hover:bg-muted/50 p-2 rounded-lg transition-colors">
                    <Clock className="w-5 h-5 text-secondary shrink-0 mt-0.5 group-hover/item:animate-spin" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Schedule</p>
                      <p className="text-sm text-muted-foreground">{sport.schedule}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group/item hover:bg-muted/50 p-2 rounded-lg transition-colors">
                    <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5 group-hover/item:animate-bounce" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Venue</p>
                      <p className="text-sm text-muted-foreground">{sport.venue}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group/item hover:bg-muted/50 p-2 rounded-lg transition-colors">
                    <User className="w-5 h-5 text-secondary shrink-0 mt-0.5 group-hover/item:animate-pulse" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Leadership</p>
                      <p className="text-xs text-muted-foreground">
                        Coach: <span className="font-medium">{sport.coach}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Captain: <span className="font-medium">{sport.captain}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full btn-athletic py-3 text-sm font-semibold group/btn">
                  <Zap className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />
                  Join {sport.name}
                </button>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
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
