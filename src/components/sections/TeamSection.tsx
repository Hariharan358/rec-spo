import { Linkedin, Twitter, Mail } from "lucide-react";

const teamMembers = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Faculty Coordinator",
    description: "20+ years in sports administration",
    image: "RK",
  },
  {
    name: "Prof. Anita Sharma",
    role: "Sports Director",
    description: "Former national athlete",
    image: "AS",
  },
  {
    name: "Vikram Singh",
    role: "Club President",
    description: "4th Year, Computer Science",
    image: "VS",
  },
  {
    name: "Priya Patel",
    role: "Sports Secretary",
    description: "3rd Year, Commerce",
    image: "PP",
  },
  {
    name: "Rahul Verma",
    role: "Cricket Captain",
    description: "State level player",
    image: "RV",
  },
  {
    name: "Sneha Reddy",
    role: "Basketball Captain",
    description: "University topper",
    image: "SR",
  },
  {
    name: "Arjun Menon",
    role: "Football Captain",
    description: "All-rounder athlete",
    image: "AM",
  },
  {
    name: "Deepika Nair",
    role: "Volleyball Captain",
    description: "National camp trainee",
    image: "DN",
  },
];

export const TeamSection = () => {
  return (
    <section id="team" className="py-20 md:py-28 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-widest mb-3">
            Meet the Titans
          </span>
          <h2 className="section-heading text-foreground">
            OUR <span className="text-gradient">TEAM</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Dedicated leaders and athletes working together to achieve sporting excellence.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div key={member.name} className="card-sports p-6 text-center group">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center group-hover:shadow-glow transition-shadow">
                <span className="font-display text-2xl text-primary-foreground">
                  {member.image}
                </span>
              </div>

              {/* Info */}
              <h3 className="font-semibold text-foreground text-lg">{member.name}</h3>
              <p className="text-secondary font-medium text-sm">{member.role}</p>
              <p className="text-muted-foreground text-sm mt-1">{member.description}</p>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                {[Linkedin, Twitter, Mail].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-secondary transition-colors"
                  >
                    <Icon className="w-4 h-4 text-foreground" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
