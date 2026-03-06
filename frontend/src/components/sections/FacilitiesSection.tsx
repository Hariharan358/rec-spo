import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin, Users, Clock, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedHeading } from "@/components/ui/AnimatedText";

interface Facility {
  id: number;
  title: string;
  description: string;
  features: string[];
  capacity: string;
  timing: string;
  image: string;
  icon: any;
}

const facilities: Facility[] = [
  {
    id: 1,
    title: "Cricket Ground",
    description: "Our state-of-the-art cricket ground features a professionally maintained turf wicket and practice nets. The facility meets international standards and hosts inter-college tournaments throughout the year.",
    features: [
      "Full-size turf wicket",
      "6 practice nets with bowling machines",
      "Floodlights for night practice",
      "Professional coaching available"
    ],
    capacity: "200+ spectators",
    timing: "6:00 AM - 8:00 PM",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80",
    icon: Award
  },
  {
    id: 2,
    title: "Basketball Court",
    description: "Indoor and outdoor basketball courts with professional-grade flooring and equipment. Our courts are designed to international specifications and provide an excellent training environment.",
    features: [
      "2 indoor courts with AC",
      "1 outdoor court",
      "Electronic scoreboards",
      "Professional training equipment"
    ],
    capacity: "150+ spectators",
    timing: "6:00 AM - 9:00 PM",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
    icon: Users
  },
  {
    id: 3,
    title: "Football Stadium",
    description: "A full-sized football stadium with natural grass turf and modern amenities. The stadium hosts major tournaments and provides excellent training facilities for aspiring footballers.",
    features: [
      "FIFA standard dimensions",
      "Natural grass turf",
      "Covered seating area",
      "Modern changing rooms"
    ],
    capacity: "500+ spectators",
    timing: "5:30 AM - 7:30 PM",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    icon: MapPin
  },
  {
    id: 4,
    title: "Swimming Pool",
    description: "Olympic-size swimming pool with temperature control and advanced filtration systems. Perfect for competitive swimming, water polo, and recreational activities.",
    features: [
      "Olympic-size 50m pool",
      "Separate diving area",
      "Temperature controlled",
      "Certified lifeguards on duty"
    ],
    capacity: "100+ swimmers",
    timing: "6:00 AM - 8:00 PM",
    image: "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=800&q=80",
    icon: Clock
  },
  {
    id: 5,
    title: "Indoor Sports Complex",
    description: "Multi-purpose indoor facility for badminton, table tennis, volleyball, and other indoor sports. Climate-controlled environment with professional equipment.",
    features: [
      "8 badminton courts",
      "10 table tennis tables",
      "2 volleyball courts",
      "Air-conditioned facility"
    ],
    capacity: "300+ athletes",
    timing: "6:00 AM - 10:00 PM",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80",
    icon: Award
  },
  {
    id: 6,
    title: "Fitness Center",
    description: "Modern gymnasium equipped with latest cardio and strength training equipment. Personal trainers available to help you achieve your fitness goals.",
    features: [
      "Latest cardio equipment",
      "Free weights section",
      "Personal training available",
      "Nutrition counseling"
    ],
    capacity: "80+ members",
    timing: "5:30 AM - 10:00 PM",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    icon: Users
  }
];

export const FacilitiesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentFacility = facilities[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = facilities.length - 1;
      if (nextIndex >= facilities.length) nextIndex = 0;
      return nextIndex;
    });
  };

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section id="facilities" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block text-secondary font-semibold text-sm uppercase tracking-widest mb-3"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            World-Class Infrastructure
          </motion.span>
          <AnimatedHeading className="section-heading text-foreground" delay={0.3}>
            OUR <span className="gradient-text-animated">FACILITIES</span>
          </AnimatedHeading>
          <motion.div
            className="mx-auto mt-6 h-[2px] bg-gradient-to-r from-transparent via-violet-500/60 to-transparent"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 200, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              className="space-y-4 md:space-y-6 order-2 lg:order-1"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  className="space-y-4 md:space-y-6"
                >
                  {/* Icon and Title */}
                  <div className="flex items-start gap-3 md:gap-4">
                    <motion.div
                      className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center border border-violet-500/20 shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <currentFacility.icon className="w-6 h-6 md:w-8 md:h-8 text-violet-600 dark:text-violet-400" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground tracking-wider">
                        {currentFacility.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-2 text-xs md:text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3 md:w-4 md:h-4" />
                          {currentFacility.capacity}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 md:w-4 md:h-4" />
                          {currentFacility.timing}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base lg:text-lg">
                    {currentFacility.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 md:space-y-3">
                    <h4 className="font-semibold text-foreground text-base md:text-lg">Key Features:</h4>
                    <ul className="space-y-2">
                      {currentFacility.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start gap-2 md:gap-3 text-muted-foreground text-sm md:text-base"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-violet-500 mt-1.5 md:mt-2 shrink-0" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    className="btn-athletic px-6 py-2.5 md:px-8 md:py-3 rounded-xl text-sm md:text-base w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book This Facility
                  </motion.button>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="flex items-center justify-center lg:justify-start gap-3 md:gap-4 pt-4 md:pt-6">
                <button
                  onClick={() => paginate(-1)}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center hover:bg-violet-200 dark:hover:bg-violet-900/40 transition-colors border border-violet-500/20"
                  aria-label="Previous facility"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-violet-600 dark:text-violet-400" />
                </button>

                {/* Dots Indicator */}
                <div className="flex gap-1.5 md:gap-2">
                  {facilities.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDirection(index > currentIndex ? 1 : -1);
                        setCurrentIndex(index);
                      }}
                      className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "w-6 md:w-8 bg-violet-600 dark:bg-violet-400"
                          : "w-1.5 md:w-2 bg-violet-300 dark:bg-violet-700 hover:bg-violet-400 dark:hover:bg-violet-600"
                      }`}
                      aria-label={`Go to facility ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => paginate(1)}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center hover:bg-violet-200 dark:hover:bg-violet-900/40 transition-colors border border-violet-500/20"
                  aria-label="Next facility"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-violet-600 dark:text-violet-400" />
                </button>
              </div>
            </motion.div>

            {/* Right Side - Image */}
            <motion.div
              className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] order-1 lg:order-2"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute inset-0"
                >
                  <div className="relative h-full w-full rounded-2xl md:rounded-3xl overflow-hidden bg-white dark:bg-gray-900 shadow-xl md:shadow-2xl border border-gray-200 dark:border-gray-800">
                    {/* Image */}
                    <img
                      src={currentFacility.image}
                      alt={currentFacility.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                    {/* Badge */}
                    <div className="absolute top-3 right-3 md:top-6 md:right-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm text-violet-600 dark:text-violet-400 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider shadow-lg border border-violet-200 dark:border-violet-800">
                      {currentIndex + 1} / {facilities.length}
                    </div>

                    {/* Bottom Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-white/95 via-white/90 to-transparent dark:from-gray-900/95 dark:via-gray-900/90 backdrop-blur-md border-t border-white/20 dark:border-gray-800/20">
                      <h4 className="text-gray-900 dark:text-white font-display text-xl md:text-2xl lg:text-3xl mb-1 md:mb-2">
                        {currentFacility.title}
                      </h4>
                      <div className="flex items-center gap-3 md:gap-4 text-gray-600 dark:text-gray-400 text-xs md:text-sm">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                          REC Campus
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div
          className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {[
            { value: "15+", label: "Sports Facilities" },
            { value: "50K+", label: "Sq. Ft. Area" },
            { value: "24/7", label: "Access Available" },
            { value: "100%", label: "Safety Standards" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl p-4 md:p-6 text-center shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="font-display text-2xl md:text-3xl lg:text-4xl text-violet-600 dark:text-violet-400 mb-1 md:mb-2">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
