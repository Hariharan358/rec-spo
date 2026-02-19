import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useData } from "@/context/DataContext";
import { Clock, MapPin, Star, ArrowRight } from "lucide-react";
import { AnimatedHeading } from "@/components/ui/AnimatedText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const SportsCard = ({ sport }: { sport: any }) => {
  return (
    <div className="relative w-[340px] h-[550px] md:w-[900px] md:h-[450px] shrink-0 p-6 md:p-8 bg-white dark:bg-[#0f0f0f] border border-black/5 dark:border-white/10 rounded-[2rem] overflow-hidden group hover:border-black/20 dark:hover:border-white/30 transition-colors duration-500 shadow-xl dark:shadow-2xl dark:shadow-black/50 shadow-black/5">

      {/* Top Right Badge (Day/Rating) */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 flex flex-col items-center justify-center w-16 h-20 md:w-16 md:h-20 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl border border-black/5 dark:border-white/5 backdrop-blur-sm z-20 dark:group-hover:border-white/20 transition-colors">
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">RATING</span>
        <span className="text-xl md:text-2xl font-display font-bold text-foreground tracking-tighter">{sport.rating}</span>
        <div className="flex gap-0.5 mt-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-2 h-2 ${i < Math.floor(sport.rating) ? "text-yellow-500 fill-current" : "text-gray-300 dark:text-neutral-700"}`} />
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-10 h-full">

        {/* Left Column: Visuals */}
        <div className="lg:col-span-5 flex flex-col gap-4 h-full">
          {/* Main Image */}
          <div className="h-48 md:h-full w-full rounded-2xl overflow-hidden relative group/image flex-grow shadow-md dark:shadow-none">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <img
              src={sport.image}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-110 grayscale-[10%] dark:grayscale-[30%] group-hover/image:grayscale-0"
              alt={sport.name}
            />
            <span className="absolute bottom-4 left-4 z-20 px-3 py-1 rounded-full bg-violet-600/90 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg">
              {sport.featured ? "Featured Sport" : "Rec Sports"}
            </span>
          </div>

          {/* Team Leaders */}
          <div className="hidden md:grid grid-cols-2 gap-3">
            <div className="bg-gray-50 dark:bg-[#1a1a1a] p-3 rounded-xl border border-black/5 dark:border-white/5 flex items-center gap-3">
              <img src={`https://ui-avatars.com/api/?name=${sport.captain}&background=2e1065&color=fff`} className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10" alt="Captain" />
              <div className="overflow-hidden">
                <p className="text-[9px] uppercase text-muted-foreground font-bold tracking-wider">Captain</p>
                <p className="text-xs text-foreground font-medium truncate">{sport.captain}</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-[#1a1a1a] p-3 rounded-xl border border-black/5 dark:border-white/5 flex items-center gap-3">
              <img src={`https://ui-avatars.com/api/?name=${sport.coach}&background=2e1065&color=fff`} className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10" alt="Coach" />
              <div className="overflow-hidden">
                <p className="text-[9px] uppercase text-muted-foreground font-bold tracking-wider">Coach</p>
                <p className="text-xs text-foreground font-medium truncate">{sport.coach.replace("Mr. ", "").replace("Ms. ", "").split(" ")[0]}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full">
          <div>
            {/* Header */}
            <div className="mb-4 md:mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-violet-600 dark:text-violet-400 font-mono text-xs tracking-widest uppercase">
                  {sport.members} Active Members
                </span>
                <div className="h-px w-8 bg-violet-500/30" />
              </div>
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-medium text-foreground tracking-tight leading-[0.9]">
                {sport.name}
              </h3>
            </div>

            {/* Schedule & Venue Cards */}
            <div className="space-y-3 md:space-y-4">
              <div>
                <h4 className="flex items-center gap-2 text-muted-foreground text-xs font-medium uppercase tracking-widest mb-2 border-b border-black/10 dark:border-white/10 pb-2">
                  <Clock className="w-3 h-3" /> Training Schedule
                </h4>
                <div className="bg-gray-50 dark:bg-[#1a1a1a] rounded-xl p-4 border border-black/5 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 group/schedule hover:border-black/10 dark:hover:border-white/20 transition-colors">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Time</p>
                    <p className="text-lg md:text-xl font-mono text-foreground tracking-tight">{sport.schedule.split('-')[1]?.trim() || "TBA"}</p>
                  </div>
                  <div className="hidden md:block w-px h-8 bg-black/10 dark:bg-white/10" />
                  <div className="md:text-right">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Days</p>
                    <p className="text-sm text-gray-600 dark:text-neutral-300 font-medium">{sport.schedule.split('-')[0]?.trim()}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="flex items-center gap-2 text-muted-foreground text-xs font-medium uppercase tracking-widest mb-1">
                  <MapPin className="w-3 h-3" /> Venue
                </h4>
                <p className="text-base text-gray-700 dark:text-neutral-200">{sport.venue}</p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-4 pt-6 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="hidden md:flex gap-3 text-[10px] text-muted-foreground font-mono">
              <span>#REC{sport.name.replace(/\s/g, '')}</span>
              <span>#Champions</span>
            </div>

            <button className="w-full md:w-auto bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-violet-600 dark:hover:bg-violet-400 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-lg">
              Join Team <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export const SportsSection = () => {
  const { sports } = useData();
  const targetRef = useRef<HTMLDivElement>(null);

  // Create a wider scroll range
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Calculate generic horizontal scroll value
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-92%"]);

  return (
    <section ref={targetRef} id="sports" className="relative h-[500vh] bg-background">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

        {/* Section Header */}
        <div className="absolute top-8 left-0 right-0 z-20 px-8 md:px-12 container mx-auto pointer-events-none">
          <ScrollReveal direction="fade" delay={0.1}>
            <div className="flex items-end justify-between border-b border-black/10 dark:border-white/10 pb-4">
              <div>
                <span className="text-violet-600 dark:text-violet-400 font-mono text-xs tracking-[0.2em] uppercase mb-2 block">
                  Department of Physical Education
                </span>
                <AnimatedHeading className="section-heading text-foreground text-3xl md:text-4xl" delay={0.2}>
                  SPORTS <span className="text-muted-foreground">PROGRAMS</span>
                </AnimatedHeading>
              </div>
              <div className="hidden md:flex gap-2">
                <div className="w-3 h-3 rounded-full bg-violet-500 animate-pulse" />
                <span className="text-xs font-mono text-muted-foreground uppercase">Scroll to explore</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Horizontal Scroll Container */}
        <motion.div style={{ x }} className="flex gap-10 px-8 md:px-24 items-center h-full pt-16">

          {/* Intro Text Block */}
          <div className="flex-shrink-0 w-[300px] md:w-[400px] p-8 flex flex-col justify-center">
            <h3 className="text-6xl md:text-8xl font-display font-medium text-gray-100 dark:text-[#1a1a1a] uppercase leading-[0.8]">
              Choose<br />Your<br /><span className="text-violet-200 dark:text-violet-900/40">Battle</span>
            </h3>
            <p className="text-muted-foreground mt-8 max-w-xs leading-relaxed">
              From the cricket pitch to the basketball court, find your arena. Join a legacy of champions at REC Sports Club.
            </p>
          </div>

          {/* Sport Cards */}
          {sports.map((sport) => (
            <SportsCard key={sport.id} sport={sport} />
          ))}

          {/* End CTA Card */}
          <div className="flex-shrink-0 w-[300px] md:w-[400px] h-[500px] md:h-[600px] flex flex-col justify-center items-center p-8 border border-black/5 dark:border-white/5 rounded-[2rem] hover:bg-black/5 dark:hover:bg-white/5 transition-all group cursor-pointer border-dashed">
            <div className="w-24 h-24 rounded-full bg-gray-50 dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-violet-500/50 transition-all duration-300">
              <ArrowRight className="w-10 h-10 text-violet-600 dark:text-violet-400" />
            </div>
            <h3 className="text-4xl font-display font-bold text-foreground uppercase text-center leading-none">
              View All<br /><span className="text-violet-500">Activities</span>
            </h3>
            <p className="text-muted-foreground text-sm mt-4 text-center max-w-[200px]">
              Don't see your sport? Check our full catalog of recreational activities.
            </p>
          </div>
        </motion.div>

        {/* Background Gradients */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          {/* Deep atmospheric glow */}
          <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-violet-500/5 dark:bg-violet-900/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-indigo-500/5 dark:bg-indigo-900/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay" />
        </div>
      </div>
    </section>
  );
};
