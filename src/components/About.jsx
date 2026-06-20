import { motion } from "framer-motion";
import MissionSection from "./MissionSection";
import { MdLocalLaundryService } from "react-icons/md";
import usePageTitle from "../hooks/usePageTitle";
import AnimatedBackground from "../ui/AnimatedBackground";
import { usePageMeta } from "../hooks/usePageMeta";
import HowItWorks from "./home/HowItWorks";
import Testimonials from "./home/Testimonials";
import { NavLink } from "react-router-dom";

const About = () => {
  usePageTitle("About");
  usePageMeta({
    title: "About Premium Wash - Our Story & Mission",
    description:
      "Learn about Premium Wash Laundry - our commitment to quality, sustainability, and customer satisfaction in Ghana.",
    keywords:
      "about premium wash, laundry company, our mission, fabric care experts",
    canonical: "https://www.premiumwashgh.com/about",
    ogImage: "https://www.premiumwashgh.com/about.avif",
  });
  return (
    <section className="bg-[var(--white-bg)] text-[var(--text-primary)] relative">
      <AnimatedBackground />
      {/* Hero */}
      <div className="relative bg-[var(--primary-color)]  py-20 sm:py-34 text-white px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl font-extrabold"
        >
          About Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto"
        >
          Passionate about laundry. Obsessed with service. Proudly local.
        </motion.p>
      </div>

      {/* Our Story */}
      <div className="py-20 px-6 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-6 text-center"
        >
          Our Story
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-gray-700 leading-relaxed text-center"
        >
          We started with a simple idea: take the hassle out of laundry. From a
          single room operation to one of the most loved laundry services in the
          city, we have built our reputation on care, speed, and customer
          delight.
        </motion.p>
      </div>

      {/* Mission + Values */}
      <MissionSection />
      <Testimonials />

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center py-16 px-6"
      >
        <h2 className="text-3xl font-bold mb-4">
          Ready to experience laundry the easy way?
        </h2>
        <NavLink
          to="/schedule-pickup"
          className="bg-[var(--primary-color)] w-fit mx-auto text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[var(--primary-hover)] transition shadow-md flex items-center gap-2"
        >
          <MdLocalLaundryService className="text-xl" />
          Schedule Pickup
        </NavLink>
      </motion.div>
    </section>
  );
};

export default About;
