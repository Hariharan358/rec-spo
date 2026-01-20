import { useData } from "@/context/DataContext";
import ChromaGrid, { ChromaItem } from "@/component/ChromaGrid";

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

        {/* ChromaGrid Team Display */}
        <div style={{ minHeight: '800px', position: 'relative' }}>
          <ChromaGrid
            items={formattedItems}
            radius={300}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
          />
        </div>
      </div>
    </section>
  );
};
