import { useData } from "@/context/DataContext";
import ChromaGrid, { ChromaItem } from "@/component/ChromaGrid";
import { motion } from "framer-motion";

// Pre-defined styles to cycle through for visual variety
const styleVariants = [
  {
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)"
  },
  {
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)"
  },
  {
    borderColor: "#F59E0B",
    gradient: "linear-gradient(165deg, #F59E0B, #000)"
  },
  {
    borderColor: "#EF4444",
    gradient: "linear-gradient(195deg, #EF4444, #000)"
  },
  {
    borderColor: "#8B5CF6",
    gradient: "linear-gradient(225deg, #8B5CF6, #000)"
  },
  {
    borderColor: "#06B6D4",
    gradient: "linear-gradient(135deg, #06B6D4, #000)"
  },
  {
    borderColor: "#EC4899",
    gradient: "linear-gradient(150deg, #EC4899, #000)"
  },
  {
    borderColor: "#6366F1",
    gradient: "linear-gradient(160deg, #6366F1, #000)"
  }
];

export const TeamSection = () => {
  const { teamMembers } = useData();

  const formattedItems: ChromaItem[] = teamMembers.map((member, index) => {
    const style = styleVariants[index % styleVariants.length];

    // Determine image source: if it looks like a URL, use it; otherwise use ui-avatars
    const imageSrc = member.image.startsWith('http') || member.image.startsWith('/')
      ? member.image
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&size=300`;

    return {
      image: imageSrc,
      title: member.name,
      subtitle: member.role,
      location: member.description, // Using description as location since it fits the layout well
      borderColor: style.borderColor,
      gradient: style.gradient,
      handle: "", // Optional, leaving blank or could be a short handle if we had one
      url: "#"
    };
  });

  return (
    <section id="team" className="py-20 md:py-28 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Decorative background blob */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/10 rounded-full blur-[120px] pointer-events-none"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="inline-block text-secondary font-semibold text-sm uppercase tracking-widest mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Meet the Titans
          </motion.span>
          <motion.h2
            className="section-heading text-foreground"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            OUR <span className="text-gradient">TEAM</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Dedicated leaders and athletes working together to achieve sporting excellence.
          </motion.p>
          {/* Animated divider */}
          <motion.div
            className="mx-auto mt-6 h-[2px] bg-gradient-to-r from-transparent via-violet-500/60 to-transparent"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 160, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        {/* ChromaGrid Team Display */}
        <motion.div
          style={{ minHeight: '800px', position: 'relative' }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <ChromaGrid
            items={formattedItems}
            radius={300}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
          />
        </motion.div>
      </div>
    </section>
  );
};
