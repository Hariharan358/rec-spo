import { useData } from "@/context/DataContext";
import DomeGallery from "@/component/DomeGallery";

export const GallerySection = () => {
  const { galleryImages } = useData();

  const images = galleryImages.map((img) => ({
    src: img.src,
    alt: img.alt,
  }));

  return (
    <section id="gallery" className="py-20 md:py-28 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-background to-background overflow-hidden relative">
      <div className="container mx-auto px-4 mb-12">
        {/* Section Header */}
        <div className="text-center">
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
      </div>

      {/* Dome Gallery Container */}
      <div className="w-full h-[800px] relative">
        <DomeGallery images={images} />
      </div>
    </section>
  );
};
