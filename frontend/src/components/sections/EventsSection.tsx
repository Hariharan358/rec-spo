import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/context/DataContext";
import { TechCard } from "@/components/ui/TechCard";
import { motion, type BezierDefinition } from "framer-motion";

const pastEvents = [
  { title: "State Football Championship", result: "Winners 🏆" },
  { title: "National Volleyball Meet", result: "Runners-up 🥈" },
  { title: "Inter-University Cricket", result: "Semi-finalists" },
  { title: "Inter-University Football", result: "Semi-finalists" },
];

const smoothEase: BezierDefinition = [0.16, 1, 0.3, 1];

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: smoothEase },
  }),
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30, x: -20 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.6, ease: smoothEase },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: smoothEase },
  },
};

export const EventsSection = () => {
  const { events } = useData();

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
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span
            className="inline-block text-secondary font-semibold text-sm uppercase tracking-widest mb-3"
            variants={fadeInUp}
            custom={0}
          >
            Mark Your Calendar
          </motion.span>
          <motion.h2 className="section-heading text-foreground" variants={fadeInUp} custom={0.15}>
            EVENTS & <span className="text-gradient">TOURNAMENTS</span>
          </motion.h2>
          <motion.div
            className="mx-auto mt-6 h-[2px] bg-gradient-to-r from-transparent via-violet-500/60 to-transparent"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 180, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upcoming Events */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.h3
              className="font-display text-2xl text-foreground tracking-wider"
              variants={fadeInUp}
              custom={0}
            >
              UPCOMING EVENTS
            </motion.h3>

            <motion.div className="space-y-4" variants={staggerContainer}>
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  variants={staggerItem}
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <TechCard
                    className="p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 transition-all duration-500 hover:shadow-lg hover:shadow-violet-500/10"
                  >
                    {/* Date Badge */}
                    <motion.div
                      className="w-20 h-20 shrink-0 bg-violet-100 dark:bg-violet-900/10 border border-violet-500/20 rounded-xl flex flex-col items-center justify-center text-violet-600 dark:text-violet-400 transition-all duration-500"
                      whileHover={{ scale: 1.08, borderColor: "rgba(139,92,246,0.5)" }}
                    >
                      <span className="font-display text-2xl font-bold">
                        {event.date.split(" ")[1]?.split("-")[0] || event.date.split(" ")[1]}
                      </span>
                      <span className="text-xs uppercase font-mono tracking-wider">
                        {event.date.split(" ")[0]}
                      </span>
                    </motion.div>

                    {/* Event Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-display text-xl text-foreground tracking-wide">{event.title}</h4>
                        <Badge variant={event.status === "Registration Open" ? "default" : "secondary"} className="bg-violet-100 dark:bg-violet-900/20 text-violet-600 dark:text-violet-300 border-violet-500/20 hover:bg-violet-200 dark:hover:bg-violet-900/40 transition-colors duration-300">
                          {event.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs font-mono text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-violet-500" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-violet-500" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-violet-500" />
                          {event.venue}
                        </span>
                      </div>
                    </div>

                    {/* Action */}
                    {event.status === "Registration Open" && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={scrollToRegister}
                          className="shrink-0 border-violet-500/20 text-violet-600 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-900/20 hover:text-foreground font-mono uppercase text-xs tracking-wider transition-all duration-300"
                        >
                          Register
                          <ArrowRight className="w-3 h-3 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                      </motion.div>
                    )}
                  </TechCard>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Past Events & Announcements */}
          <motion.div
            className="space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={slideInRight}
          >
            {/* Past Events */}
            <div>
              <motion.h3
                className="font-display text-2xl text-foreground tracking-wider mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                RECENT RESULTS
              </motion.h3>
              <motion.div
                className="card-sports p-5 space-y-4"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {pastEvents.map((event, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center justify-between pb-3 border-b border-border last:border-0 last:pb-0 group/result"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  >
                    <span className="text-sm text-foreground group-hover/result:text-violet-600 dark:group-hover/result:text-violet-400 transition-colors duration-300">{event.title}</span>
                    <span className="text-sm font-medium text-secondary group-hover/result:scale-110 transition-transform duration-300 inline-block">{event.result}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Announcements */}
            <motion.div
              id="announcements"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-display text-2xl text-foreground tracking-wider mb-4">
                ANNOUNCEMENTS
              </h3>
              <div className="card-sports p-5 space-y-4 bg-secondary/5 border-secondary/20">
                <div className="space-y-3">
                  {[
                    { title: "Cricket Team Trials", desc: "Jan 20, 2026 - 4:00 PM at Main Ground", isLive: true },
                    { title: "New Gym Equipment Arrived", desc: "Fitness center now open extended hours", isLive: false },
                    { title: "Practice Schedule Updated", desc: "Check new timings on sports board", isLive: false },
                  ].map((ann, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3 group/ann"
                      initial={{ opacity: 0, x: 15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
                    >
                      <motion.div
                        className={`w-2 h-2 rounded-full mt-2 ${ann.isLive ? 'bg-secondary animate-pulse' : 'bg-secondary'}`}
                        whileHover={{ scale: 1.5 }}
                      />
                      <div>
                        <p className="text-sm text-foreground font-medium group-hover/ann:text-violet-600 dark:group-hover/ann:text-violet-400 transition-colors duration-300">{ann.title}</p>
                        <p className="text-xs text-muted-foreground">{ann.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
