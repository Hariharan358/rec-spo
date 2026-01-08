import { Trophy, Medal, Award } from "lucide-react";
import cricketImg from "@/assets/sports/cricket.jpg";
import footballImg from "@/assets/sports/football.jpg";
import basketballImg from "@/assets/sports/basketball.jpg";
import badmintonImg from "@/assets/sports/badminton.jpg";
import volleyballImg from "@/assets/sports/volleyball.jpg";
import tabletennisImg from "@/assets/sports/tabletennis.jpg";

const achievements = [
  { icon: Trophy, title: "State Champions", count: "12", subtitle: "Championships Won" },
  { icon: Medal, title: "National Level", count: "25+", subtitle: "Players Selected" },
  { icon: Award, title: "Best Sports Club", count: "5x", subtitle: "University Award" },
];

const galleryImages = [
  { src: cricketImg, alt: "Cricket team in action" },
  { src: footballImg, alt: "Football match highlights" },
  { src: basketballImg, alt: "Basketball tournament" },
  { src: badmintonImg, alt: "Badminton championship" },
  { src: volleyballImg, alt: "Volleyball team victory" },
  { src: tabletennisImg, alt: "Table tennis competition" },
];

export const GallerySection = () => {
  return (
    <section id="gallery" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-widest mb-3">
            Our Pride
          </span>
          <h2 className="section-heading text-foreground">
            ACHIEVEMENTS & <span className="text-gradient">GALLERY</span>
          </h2>
        </div>

        {/* Achievements */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {achievements.map((item) => (
            <div
              key={item.title}
              className="bg-primary rounded-2xl p-8 text-center group hover:shadow-glow transition-shadow"
            >
              <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center group-hover:animate-bounce-subtle">
                <item.icon className="w-8 h-8 text-secondary-foreground" />
              </div>
              <div className="font-display text-5xl text-primary-foreground mb-2">
                {item.count}
              </div>
              <h3 className="font-semibold text-primary-foreground">{item.title}</h3>
              <p className="text-primary-foreground/70 text-sm">{item.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-xl group ${
                index === 0 || index === 5 ? "md:col-span-1 md:row-span-1" : ""
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-primary-foreground font-medium text-sm text-center px-4">
                  {image.alt}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trophy Cabinet */}
        <div className="mt-16 bg-muted rounded-2xl p-8 md:p-12">
          <h3 className="font-display text-2xl md:text-3xl text-foreground tracking-wider text-center mb-8">
            TROPHY CABINET
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { year: "2024", title: "State Cricket Championship" },
              { year: "2023", title: "National Volleyball Silver" },
              { year: "2023", title: "University Best Club Award" },
              { year: "2022", title: "Inter-College Football Cup" },
            ].map((trophy, i) => (
              <div key={i} className="card-sports p-4">
                <Trophy className="w-8 h-8 text-secondary mx-auto mb-2" />
                <div className="font-display text-xl text-foreground">{trophy.year}</div>
                <p className="text-sm text-muted-foreground">{trophy.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
