import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const upcomingEvents = [
  {
    id: 1,
    title: "Inter-College Cricket Championship",
    date: "Jan 25-28, 2026",
    time: "9:00 AM onwards",
    venue: "University Cricket Stadium",
    type: "Tournament",
    status: "Registration Open",
  },
  {
    id: 2,
    title: "Annual Sports Day",
    date: "Feb 15, 2026",
    time: "8:00 AM - 6:00 PM",
    venue: "Main Sports Complex",
    type: "Event",
    status: "Coming Soon",
  },
  {
    id: 3,
    title: "Basketball League Finals",
    date: "Feb 22, 2026",
    time: "4:00 PM",
    venue: "Indoor Stadium",
    type: "Match",
    status: "Registration Open",
  },
  {
    id: 4,
    title: "Badminton Open Tournament",
    date: "Mar 5-7, 2026",
    time: "10:00 AM onwards",
    venue: "Badminton Arena",
    type: "Tournament",
    status: "Registration Open",
  },
];

const pastEvents = [
  { title: "State Football Championship", result: "Winners 🏆" },
  { title: "National Volleyball Meet", result: "Runners-up 🥈" },
  { title: "Inter-University Cricket", result: "Semi-finalists" },
];

export const EventsSection = () => {
  const scrollToRegister = () => {
    const element = document.querySelector("#register");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="events" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-widest mb-3">
            Mark Your Calendar
          </span>
          <h2 className="section-heading text-foreground">
            EVENTS & <span className="text-gradient">TOURNAMENTS</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upcoming Events */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-display text-2xl text-foreground tracking-wider">
              UPCOMING EVENTS
            </h3>
            
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="card-sports p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4"
                >
                  {/* Date Badge */}
                  <div className="w-20 h-20 shrink-0 bg-primary rounded-xl flex flex-col items-center justify-center text-primary-foreground">
                    <span className="font-display text-2xl">
                      {event.date.split(" ")[1]?.split("-")[0] || event.date.split(" ")[1]}
                    </span>
                    <span className="text-xs uppercase">
                      {event.date.split(" ")[0]}
                    </span>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-semibold text-foreground">{event.title}</h4>
                      <Badge variant={event.status === "Registration Open" ? "default" : "secondary"}>
                        {event.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {event.venue}
                      </span>
                    </div>
                  </div>

                  {/* Action */}
                  {event.status === "Registration Open" && (
                    <Button
                      variant="athletic"
                      size="sm"
                      onClick={scrollToRegister}
                      className="shrink-0"
                    >
                      Register
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Past Events & Announcements */}
          <div className="space-y-8">
            {/* Past Events */}
            <div>
              <h3 className="font-display text-2xl text-foreground tracking-wider mb-4">
                RECENT RESULTS
              </h3>
              <div className="card-sports p-5 space-y-4">
                {pastEvents.map((event, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between pb-3 border-b border-border last:border-0 last:pb-0"
                  >
                    <span className="text-sm text-foreground">{event.title}</span>
                    <span className="text-sm font-medium text-secondary">{event.result}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcements */}
            <div id="announcements">
              <h3 className="font-display text-2xl text-foreground tracking-wider mb-4">
                ANNOUNCEMENTS
              </h3>
              <div className="card-sports p-5 space-y-4 bg-secondary/5 border-secondary/20">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 animate-pulse" />
                    <div>
                      <p className="text-sm text-foreground font-medium">Cricket Team Trials</p>
                      <p className="text-xs text-muted-foreground">Jan 20, 2026 - 4:00 PM at Main Ground</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2" />
                    <div>
                      <p className="text-sm text-foreground font-medium">New Gym Equipment Arrived</p>
                      <p className="text-xs text-muted-foreground">Fitness center now open extended hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2" />
                    <div>
                      <p className="text-sm text-foreground font-medium">Practice Schedule Updated</p>
                      <p className="text-xs text-muted-foreground">Check new timings on sports board</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
