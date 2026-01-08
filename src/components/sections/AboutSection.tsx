import { Target, Eye, Users, Award } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-widest mb-3">
            Est. 1985
          </span>
          <h2 className="section-heading text-foreground">
            ABOUT <span className="text-gradient">TITANS</span>
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left - Story */}
          <div className="space-y-6">
            <h3 className="font-display text-3xl md:text-4xl text-foreground tracking-wider">
              BUILDING CHAMPIONS SINCE 1985
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              The Titans Sports Club was established with a vision to create a platform where students could excel in sports while pursuing their academic goals. Over the decades, we have grown into one of the most prestigious college sports clubs in the region.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our state-of-the-art facilities, experienced coaches, and dedicated training programs have produced numerous national and state-level athletes. We believe that sports build character, discipline, and leadership qualities that extend far beyond the playing field.
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { value: "39+", label: "Years of Excellence" },
                { value: "10K+", label: "Alumni Athletes" },
                { value: "6", label: "Sports Categories" },
                { value: "15+", label: "Expert Coaches" },
              ].map((stat) => (
                <div key={stat.label} className="card-sports p-4">
                  <div className="font-display text-3xl text-secondary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Vision & Mission */}
          <div className="space-y-6">
            <div className="card-sports p-6 md:p-8">
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                <Eye className="w-7 h-7 text-secondary" />
              </div>
              <h4 className="font-display text-2xl text-foreground tracking-wider mb-3">
                OUR VISION
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                To be the leading college sports club that nurtures athletic excellence while developing well-rounded individuals who excel in sports and life.
              </p>
            </div>

            <div className="card-sports p-6 md:p-8">
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-secondary" />
              </div>
              <h4 className="font-display text-2xl text-foreground tracking-wider mb-3">
                OUR MISSION
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                To provide world-class sports training, promote physical fitness, foster team spirit, and create opportunities for students to compete and excel at national and international levels.
              </p>
            </div>
          </div>
        </div>

        {/* Leadership */}
        <div className="bg-muted rounded-2xl p-8 md:p-12">
          <h3 className="font-display text-2xl md:text-3xl text-foreground tracking-wider text-center mb-8">
            CLUB LEADERSHIP
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Dr. Rajesh Kumar", role: "Faculty Coordinator", icon: Users },
              { name: "Prof. Anita Sharma", role: "Sports Director", icon: Award },
              { name: "Vikram Singh", role: "Student Coordinator", icon: Users },
              { name: "Priya Patel", role: "Student Coordinator", icon: Users },
            ].map((person) => (
              <div key={person.name} className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary mx-auto mb-4 flex items-center justify-center">
                  <person.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h4 className="font-semibold text-foreground">{person.name}</h4>
                <p className="text-sm text-muted-foreground">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
