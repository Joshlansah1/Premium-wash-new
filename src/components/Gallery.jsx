import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight, FiImage } from "react-icons/fi";
import AnimatedBackground from "../ui/AnimatedBackground";
import usePageTitle from "../hooks/usePageTitle";
import { usePageMeta } from "../hooks/usePageMeta";

// Drop real photos into public/gallery/ using these exact filenames
// (e.g. public/gallery/facility-1.jpg) and they will replace the placeholders automatically.
const galleryImages = [
  { id: 1, src: "/gallery/facility-1.jpg", alt: "Our laundry facility", category: "Facility" },
  { id: 2, src: "/gallery/facility-2.jpg", alt: "Washing in progress", category: "Facility" },
  { id: 3, src: "/gallery/team-1.jpg", alt: "Our team at work", category: "Team" },
  { id: 4, src: "/gallery/team-2.jpg", alt: "Ironing and folding", category: "Team" },
  { id: 5, src: "/gallery/before-after-1.jpg", alt: "Before and after cleaning", category: "Before & After" },
  { id: 6, src: "/gallery/before-after-2.jpg", alt: "Stain removal result", category: "Before & After" },
  { id: 7, src: "/gallery/delivery-1.jpg", alt: "Pickup and delivery", category: "Delivery" },
  { id: 8, src: "/gallery/delivery-2.jpg", alt: "Packaged and ready clothes", category: "Delivery" },
  { id: 9, src: "/gallery/branch-1.jpg", alt: "One of our branches", category: "Branches" },
];

const GalleryImage = ({ image, onClick }) => {
  const [errored, setErrored] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative aspect-square w-full overflow-hidden rounded-xl bg-[var(--gray-bg)] shadow-sm border border-[var(--gray-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
      aria-label={`View image: ${image.alt}`}
    >
      {!errored ? (
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          onError={() => setErrored(true)}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[var(--text-secondary)]">
          <FiImage className="text-4xl" />
          <span className="text-xs font-medium px-2 text-center">
            Photo coming soon
          </span>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 bg-black/50 px-3 py-2 opacity-0 transition group-hover:opacity-100">
        <p className="text-xs font-medium text-white">{image.category}</p>
      </div>
    </button>
  );
};

const Gallery = () => {
  usePageTitle("Gallery");
  usePageMeta({
    title: "Gallery - Premium Wash Laundry",
    description:
      "Take a look at our facility, team, and the quality laundry results Premium Wash delivers every day.",
    keywords: "laundry gallery, photos, before and after, premium wash",
    canonical: "https://www.premiumwashgh.com/gallery",
    ogImage: "https://www.premiumwashgh.com/laundry.avif",
  });

  const [activeIndex, setActiveIndex] = useState(null);

  const openAt = (index) => setActiveIndex(index);
  const close = () => setActiveIndex(null);
  const showPrev = () =>
    setActiveIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  const showNext = () => setActiveIndex((i) => (i + 1) % galleryImages.length);

  const activeImage = activeIndex !== null ? galleryImages[activeIndex] : null;

  return (
    <section className="bg-[var(--white-bg)] text-[var(--text-primary)] relative">
      <AnimatedBackground />

      {/* Hero */}
      <div className="relative bg-[var(--primary-color)] pt-28 pb-20 sm:py-34 text-white px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl font-extrabold"
        >
          Gallery
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto"
        >
          A look at our facility, our team, and the care we put into every load.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="relative z-10 py-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {galleryImages.map((image, index) => (
            <GalleryImage
              key={image.id}
              image={image}
              onClick={() => openAt(index)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center px-4"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-6 right-6 text-white text-3xl hover:text-[var(--primary-color)] transition"
            >
              <FiX />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous image"
              className="absolute left-4 sm:left-8 text-white text-3xl hover:text-[var(--primary-color)] transition"
            >
              <FiChevronLeft />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-3xl w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto aspect-video w-full max-w-2xl overflow-hidden rounded-xl bg-white/5 flex items-center justify-center">
                <img
                  src={activeImage.src}
                  alt={activeImage.alt}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <p className="mt-4 text-white font-medium">{activeImage.alt}</p>
              <p className="text-white/60 text-sm">{activeImage.category}</p>
            </motion.div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              className="absolute right-4 sm:right-8 text-white text-3xl hover:text-[var(--primary-color)] transition"
            >
              <FiChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
