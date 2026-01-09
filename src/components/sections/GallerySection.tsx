import { useRef, useMemo } from "react";
import { useData } from "@/context/DataContext";
import Masonry from "@/component/Masonry";

export const GallerySection = () => {
  const { galleryImages } = useData();

  // Generate deterministic heights for masonry layout based on index
  const items = useMemo(() => {
    return galleryImages.map((img, index) => ({
      id: img.id,
      img: img.src,
      url: img.src, // Clicking opens the image
      // varied heights: 300, 400, 500, 350, 450, etc.
      height: [300, 450, 600, 350, 500, 400][index % 6]
    }));
  }, [galleryImages]);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-widest mb-3">
            Capture The Moment
          </span>
          <h2 className="section-heading text-foreground">
            OUR <span className="text-gradient">GALLERY</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Glimpses of our victories, training sessions, and team spirit.
          </p>
        </div>

        {/* Masonry Grid Container */}
        <div className="w-full relative min-h-[800px] md:min-h-[1000px]">
          <Masonry
            items={items}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={0.95}
            blurToFocus={true}
            colorShiftOnHover={false}
          />
        </div>
      </div>
    </section>
  );
};
