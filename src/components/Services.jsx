import { motion } from "framer-motion";
import { MdLocalLaundryService } from "react-icons/md";
import usePageTitle from "../hooks/usePageTitle";
import { usePageMeta } from "../hooks/usePageMeta";
import { NavLink } from "react-router-dom";
import AnimatedBackground from "../ui/AnimatedBackground";

const services = [
  {
    title: "Laundry",
    description: "Eco-friendly wash services that leave your clothes fresh.",
    image: "/laundry.avif",
  },
  {
    title: "Drying",
    description: "Thorough yet gentle drying that maintains fabric quality.",
    image: "/drying.avif",
  },
  {
    title: "Shoe Care",
    description: "Expert shoe cleaning and care for all kinds of footwear.",
    image: "/shoecare.avif",
  },
  {
    title: "Ironing",
    description: "Professional wrinkle-free finishing for sharp clothing.",
    image: "/ironing.avif",
  },
  {
    title: "Folding or Hanging",
    description: "Perfectly folded or hung laundry, ready for your wardrobe.",
    image: "/folding.avif",
  },
  {
    title: "Carpet Maintenance",
    description: "Deep-cleaning solutions that restore and freshen carpets.",
    image: "/carpet.avif",
  },
  {
    title: "Apartment Cleaning",
    description: "Sparkling clean spaces with attention to every detail.",
    image: "/apartment.avif",
  },
  {
    title: "Office Hygiene",
    description: "Maintain a sanitized, safe workspace for your team.",
    image: "/office.avif",
  },
  {
    title: "Quick Express Service",
    description: "Fast turnaround when you need your laundry ASAP.",
    image: "/express.avif",
  },
  {
    title: "Move-in/Move-out Cleanup",
    description: "Make moving smooth with professional cleaning.",
    image: "/moving.avif",
  },
  {
    title: "Pickup & Delivery",
    description: "We’ll handle pickup and drop-off so you don’t have to.",
    image: "/pickup.avif",
  },
];

const Services = () => {
  usePageTitle("Services");
  usePageMeta({
    title: "Our Services - Laundry, Dry Cleaning & More",
    description:
      "Explore our comprehensive laundry services including washing, dry cleaning, ironing, folding, and specialty fabric care.",
    keywords:
      "laundry services, dry cleaning, ironing service, fabric care, washing service",
    canonical: "https://www.premiumwashgh.com/services",
    ogImage: "https://www.premiumwashgh.com/laundry.avif",
  });
  return (
    <section
      id="services"
      className="bg-[var(--white-bg)] sm:py-34 py-20 px-6 relative"
    >
      <AnimatedBackground />

      {/* Section heading */}
      <div className="relative z-10 text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4"
        >
          Our Services
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-600 max-w-xl mx-auto"
        >
          Discover what we do best.
        </motion.p>
      </div>

      {/* Cards Grid */}
      <div className="relative z-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 hover:scale-[1.02] hover:-translate-y-1 transform ease-in-out"
          >
            <div className="overflow-hidden h-56">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-[var(--primary-color)] mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          </motion.article>
        ))}
      </div>

      {/* CTA button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 text-center relative z-10"
      >
        <NavLink
          to="/schedule-pickup"
          className="bg-[var(--primary-color)] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[var(--primary-hover)] transition shadow-md inline-flex items-center gap-2"
        >
          <MdLocalLaundryService className="text-xl" />
          Schedule Pickup
        </NavLink>
      </motion.div>
    </section>
  );
};

export default Services;
