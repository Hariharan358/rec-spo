import { Clock, MapPin, User } from "lucide-react";
import cricketImg from "@/assets/sports/cricket.jpg";
import footballImg from "@/assets/sports/football.jpg";
import basketballImg from "@/assets/sports/basketball.jpg";
import badmintonImg from "@/assets/sports/badminton.jpg";
import volleyballImg from "@/assets/sports/volleyball.jpg";
import tabletennisImg from "@/assets/sports/tabletennis.jpg";

const sports = [
  {
    name: "Cricket",
    image: cricketImg,
    schedule: "Mon, Wed, Fri - 4:00 PM",
    venue: "Main Cricket Ground",
    captain: "Rahul Verma",
    coach: "Mr. Suresh Raina",
  },
  {
    name: "Football",
    image: footballImg,
    schedule: "Tue, Thu, Sat - 5:00 PM",
    venue: "Football Stadium",
    captain: "Arjun Menon",
    coach: "Mr. Bhaichung Bhutia",
  },
  {
    name: "Basketball",
    image: basketballImg,
    schedule: "Mon, Wed, Fri - 6:00 PM",
    venue: "Indoor Sports Complex",
    captain: "Sneha Reddy",
    coach: "Mr. Satnam Singh",
  },
  {
    name: "Badminton",
    image: badmintonImg,
    schedule: "Tue, Thu - 4:30 PM",
    venue: "Badminton Hall",
    captain: "Aditya Kumar",
    coach: "Ms. P.V. Sindhu",
  },
  {
    name: "Volleyball",
    image: volleyballImg,
    schedule: "Mon, Wed, Sat - 5:30 PM",
    venue: "Volleyball Court",
    captain: "Deepika Nair",
    coach: "Mr. Jimmy George",
  },
  {
    name: "Table Tennis",
    image: tabletennisImg,
    schedule: "Daily - 3:00 PM",
    venue: "TT Room, Sports Block",
    captain: "Karan Malhotra",
    coach: "Ms. Manika Batra",
  },
];

export const SportsSection = () => {
  return (
    <section id="sports" className="py-20 md:py-28 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-widest mb-3">
            Train Like Champions
          </span>
          <h2 className="section-heading text-foreground">
            OUR <span className="text-gradient">SPORTS</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Choose from our diverse range of sports and find your passion. Each program offers professional coaching and competitive opportunities.
          </p>
        </div>

        {/* Sports Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sports.map((sport) => (
            <div
              key={sport.name}
              className="card-sports overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={sport.image}
                  alt={sport.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                <h3 className="absolute bottom-4 left-4 font-display text-3xl text-primary-foreground tracking-wider">
                  {sport.name.toUpperCase()}
                </h3>
              </div>

              {/* Details */}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-secondary shrink-0" />
                  <span className="text-muted-foreground">{sport.schedule}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-secondary shrink-0" />
                  <span className="text-muted-foreground">{sport.venue}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <User className="w-4 h-4 text-secondary shrink-0" />
                  <span className="text-muted-foreground">
                    Coach: {sport.coach} | Captain: {sport.captain}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
