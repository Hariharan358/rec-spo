import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useData } from "@/context/DataContext";
import { Clock, MapPin, Star, ArrowRight } from "lucide-react";
import { AnimatedHeading } from "@/components/ui/AnimatedText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const SportsCard = ({ sport, index, scrollYProgress }: { sport: any; index: number; scrollYProgress: any }) => {
  // Each card gets a unique parallax offset based on its index
  const yOffset = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [60 + index * 15, 0, -(30 + index * 10)]
  );

  // Subtle rotation parallax — alternating directions
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [index % 2 === 0 ? 2 : -2, 0, 0, index % 2 === 0 ? -1 : 1]
  );

  // Scale up as cards approach center of viewport
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.95, 1, 1, 0.97]
  );

  // Image parallax — shifts slower than the card for depth
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [20 + index * 5, -(15 + index * 5)]
  );

  return (
    <motion.div
      style={{ y: yOffset, rotate, scale }}
      className="relative w-[280px] h-[400px] md:w-[480px] md:h-[360px] shrink-0 p-4 md:p-5 bg-white dark:bg-[#0f0f0f] border border-black/5 dark:border-white/10 rounded-[1.5rem] overflow-hidden group hover:border-black/20 dark:hover:border-white/30 transition-colors duration-500 shadow-xl dark:shadow-2xl dark:shadow-black/50 shadow-black/5"
    >

      {/* Top Right Badge (Day/Rating) */}
      <div className="absolute top-4 right-4 md:top-5 md:right-5 flex flex-col items-center justify-center w-12 h-14 md:w-12 md:h-16 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl border border-black/5 dark:border-white/5 backdrop-blur-sm z-20 dark:group-hover:border-white/20 transition-colors">
        <span className="text-[8px] text-muted-foreground uppercase tracking-widest font-bold mb-0.5">RATING</span>
        <span className="text-base md:text-lg font-display font-bold text-foreground tracking-tighter">{sport.rating}</span>
        <div className="flex gap-0.5 mt-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-1.5 h-1.5 ${i < Math.floor(sport.rating) ? "text-yellow-500 fill-current" : "text-gray-300 dark:text-neutral-700"}`} />
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-3 md:gap-5 h-full">

        {/* Left Column: Visuals */}
        <div className="lg:col-span-5 flex flex-col gap-2 h-full">
          {/* Main Image with parallax */}
          <div className="h-32 md:h-full w-full rounded-xl overflow-hidden relative group/image flex-grow shadow-md dark:shadow-none">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <motion.img
              src={sport.image}
              style={{ y: imageY }}
              className="w-full h-[120%] object-cover transition-transform duration-700 group-hover/image:scale-110 grayscale-[10%] dark:grayscale-[30%] group-hover/image:grayscale-0 -mt-[10%]"
              alt={sport.name}
            />
            <span className="absolute bottom-2 left-2 z-20 px-2 py-0.5 rounded-full bg-violet-600/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-lg">
              {sport.featured ? "Featured Sport" : "Rec Sports"}
            </span>
          </div>

          {/* Team Leaders */}
          <div className="hidden md:grid grid-cols-2 gap-2">
            <div className="bg-gray-50 dark:bg-[#1a1a1a] p-2 rounded-lg border border-black/5 dark:border-white/5 flex items-center gap-2">
              <img src={`https://ui-avatars.com/api/?name=${sport.captain}&background=2e1065&color=fff`} className="w-6 h-6 rounded-full border border-black/10 dark:border-white/10" alt="Captain" />
              <div className="overflow-hidden">
                <p className="text-[8px] uppercase text-muted-foreground font-bold tracking-wider">Captain</p>
                <p className="text-[10px] text-foreground font-medium truncate">{sport.captain}</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-[#1a1a1a] p-2 rounded-lg border border-black/5 dark:border-white/5 flex items-center gap-2">
              <img src={`https://ui-avatars.com/api/?name=${sport.coach}&background=2e1065&color=fff`} className="w-6 h-6 rounded-full border border-black/10 dark:border-white/10" alt="Coach" />
              <div className="overflow-hidden">
                <p className="text-[8px] uppercase text-muted-foreground font-bold tracking-wider">Coach</p>
                <p className="text-[10px] text-foreground font-medium truncate">{sport.coach.replace("Mr. ", "").replace("Ms. ", "").split(" ")[0]}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full">
          <div>
            {/* Header */}
            <div className="mb-2 md:mb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-violet-600 dark:text-violet-400 font-mono text-[10px] tracking-widest uppercase">
                  {sport.members} Active Members
                </span>
                <div className="h-px w-6 bg-violet-500/30" />
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-medium text-foreground tracking-tight leading-[0.9]">
                {sport.name}
              </h3>
            </div>

            {/* Schedule & Venue Cards */}
            <div className="space-y-2 md:space-y-2">
              <div>
                <h4 className="flex items-center gap-1.5 text-muted-foreground text-[10px] font-medium uppercase tracking-widest mb-1 border-b border-black/10 dark:border-white/10 pb-1">
                  <Clock className="w-2.5 h-2.5" /> Training Schedule
                </h4>
                <div className="bg-gray-50 dark:bg-[#1a1a1a] rounded-lg p-2.5 border border-black/5 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-3 group/schedule hover:border-black/10 dark:hover:border-white/20 transition-colors">
                  <div>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-widest mb-0.5">Time</p>
                    <p className="text-sm md:text-base font-mono text-foreground tracking-tight">{sport.schedule.split('-')[1]?.trim() || "TBA"}</p>
                  </div>
                  <div className="hidden md:block w-px h-6 bg-black/10 dark:bg-white/10" />
                  <div className="md:text-right">
                    <p className="text-[9px] text-muted-foreground uppercase tracking-widest mb-0.5">Days</p>
                    <p className="text-xs text-gray-600 dark:text-neutral-300 font-medium">{sport.schedule.split('-')[0]?.trim()}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="flex items-center gap-1.5 text-muted-foreground text-[10px] font-medium uppercase tracking-widest mb-0.5">
                  <MapPin className="w-2.5 h-2.5" /> Venue
                </h4>
                <p className="text-sm text-gray-700 dark:text-neutral-200">{sport.venue}</p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-2 pt-3 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="hidden md:flex gap-2 text-[9px] text-muted-foreground font-mono">
              <span>#REC{sport.name.replace(/\s/g, '')}</span>
              <span>#Champions</span>
            </div>

            <button className="w-full md:w-auto bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded-lg font-bold uppercase tracking-wider text-xs hover:bg-violet-600 dark:hover:bg-violet-400 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-1.5 group/btn shadow-lg">
              Join Team <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>

      </div>
    </motion.div>
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
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-92%"]);

  // Parallax layers — background elements move at different speeds
  const bgLayer1X = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const bgLayer2X = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const bgLayer1Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const bgLayer2Y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  // Intro text parallax — moves slower than cards for depth
  const introX = useTransform(scrollYProgress, [0, 0.5], ["0%", "8%"]);
  const introY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.15, 0.4], [1, 1, 0]);
  const introScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.9]);

  // End CTA parallax
  const ctaY = useTransform(scrollYProgress, [0.7, 1], [80, 0]);
  const ctaScale = useTransform(scrollYProgress, [0.7, 0.9, 1], [0.9, 1, 1]);
  const ctaOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0.3, 1]);

  // Scroll progress bar
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Floating decorative orbs parallax
  const orb1Y = useTransform(scrollYProgress, [0, 1], [-20, -120]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [40, -60]);
  const orb3Y = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const orb1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.3, 0.8]);
  const orb2Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 1]);

  return (
    <section ref={targetRef} id="sports" className="relative h-[420vh] bg-background">
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
              <div className="hidden md:flex items-center gap-3">
                <div className="flex gap-2 items-center">
                  <div className="w-3 h-3 rounded-full bg-violet-500 animate-pulse" />
                  <span className="text-xs font-mono text-muted-foreground uppercase">Scroll to explore</span>
                </div>
                {/* Scroll Progress Bar */}
                <div className="w-24 h-1 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                    style={{ width: progressWidth }}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Parallax Background Layers */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          {/* Layer 1 — Large slow-moving glow */}
          <motion.div
            className="absolute top-0 right-0 w-[60%] h-[60%] bg-violet-500/5 dark:bg-violet-900/10 rounded-full blur-[150px]"
            style={{ x: bgLayer1X, y: bgLayer1Y }}
          />
          {/* Layer 2 — Smaller faster-moving glow */}
          <motion.div
            className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-indigo-500/5 dark:bg-indigo-900/10 rounded-full blur-[120px]"
            style={{ x: bgLayer2X, y: bgLayer2Y }}
          />

          {/* Floating parallax orbs */}
          <motion.div
            className="absolute top-[15%] right-[10%] w-20 h-20 rounded-full bg-gradient-to-br from-violet-400/10 to-indigo-400/10 blur-sm"
            style={{ y: orb1Y, scale: orb1Scale }}
          />
          <motion.div
            className="absolute bottom-[20%] left-[5%] w-14 h-14 rounded-full bg-gradient-to-br from-fuchsia-400/10 to-violet-400/10 blur-sm"
            style={{ y: orb2Y, scale: orb2Scale }}
          />
          <motion.div
            className="absolute top-[40%] right-[30%] w-8 h-8 rounded-full bg-violet-500/10 blur-[2px]"
            style={{ y: orb3Y }}
          />

          {/* Grain overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay" />
        </div>

        {/* Horizontal Scroll Container */}
        <motion.div style={{ x }} className="flex gap-6 px-8 md:px-16 items-center h-full pt-16">

          {/* Intro Text Block — with parallax (moves slower, fades out) */}
          <motion.div
            className="flex-shrink-0 w-[240px] md:w-[300px] p-6 flex flex-col justify-center"
            style={{ x: introX, y: introY, opacity: introOpacity, scale: introScale }}
          >
            <h3 className="text-4xl md:text-6xl font-display font-medium text-gray-500 dark:text-[#1a1a1a] uppercase leading-[0.8]">
              Choose<br />Your<br /><span className="text-violet-500 dark:text-violet-900/40">Battle</span>
            </h3>
            <p className="text-muted-foreground mt-6 max-w-xs leading-relaxed text-sm">
              From the cricket pitch to the basketball court, find your arena. Join a legacy of champions at REC Sports Club.
            </p>
          </motion.div>

          {/* Sport Cards — each with unique parallax */}
          {sports.map((sport, index) => (
            <SportsCard
              key={sport.id}
              sport={sport}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}

          {/* End CTA Card — parallax entrance */}
          <motion.div
            className="flex-shrink-0 w-[240px] md:w-[300px] h-[350px] md:h-[360px] flex flex-col justify-center items-center p-6 border border-black/5 dark:border-white/5 rounded-[1.5rem] hover:bg-black/5 dark:hover:bg-white/5 transition-all group cursor-pointer border-dashed"
            style={{ y: ctaY, scale: ctaScale, opacity: ctaOpacity }}
          >
            <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-violet-500/50 transition-all duration-300">
              <ArrowRight className="w-7 h-7 text-violet-600 dark:text-violet-400" />
            </div>
            <h3 className="text-2xl font-display font-bold text-foreground uppercase text-center leading-none">
              View All<br /><span className="text-violet-500">Activities</span>
            </h3>
            <p className="text-muted-foreground text-xs mt-3 text-center max-w-[180px]">
              Don't see your sport? Check our full catalog of recreational activities.
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
