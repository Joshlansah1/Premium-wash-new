import { motion } from "framer-motion";
import {
  FaUserCheck,
  FaTags,
  FaMobileAlt,
  FaStar,
  FaBolt,
  FaBell,
} from "react-icons/fa";

const features = [
  {
    title: "Personalized Experience",
    description:
      "We take utmost care of your clothes, segregating based on the cloth type and giving you instant clothes to make a statement.",
    icon: <FaUserCheck className="text-4xl text-blue-500" />,
    animation: "wiggle",
  },
  {
    title: "Affordable Pricing",
    description:
      "Prices that suit your pocket is one of our USPs. Choose between two types of pricing options.",
    icon: <FaTags className="text-4xl text-emerald-500" />,
    animation: "pulse",
  },
  {
    title: "Convenience",
    description:
      "With just a tap of a button, your laundry gets done - giving you more time for what truly matters.",
    icon: <FaMobileAlt className="text-4xl text-indigo-500" />,
    animation: "bounce",
  },
  {
    title: "Quality",
    description:
      "We use the best-in-class products to make sure your favorite clothes always feel brand new.",
    icon: <FaStar className="text-4xl text-yellow-500" />,
    animation: "spin",
  },
  {
    title: "Express Delivery",
    description:
      "Need your clothes fast? We deliver clean laundry in less than 4 hours with our express service.",
    icon: <FaBolt className="text-4xl text-rose-500" />,
    animation: "shake",
  },
  {
    title: "Instant Order Update",
    description:
      "Track your laundry status in real time. Get regular updates and never miss a thing.",
    icon: <FaBell className="text-4xl text-orange-500" />,
    animation: "bounce",
  },
];

const getIconAnimation = (type) => {
  switch (type) {
    case "pulse":
      return {
        scale: [1, 1.1, 1],
        transition: { duration: 2, repeat: Infinity },
      };
    case "wiggle":
      return {
        rotate: [-5, 5, -5, 0],
        transition: { duration: 1.5, repeat: Infinity },
      };
    case "bounce":
      return {
        y: [0, -5, 0],
        transition: { duration: 1.6, repeat: Infinity },
      };
    case "spin":
      return {
        rotate: [0, 360],
        transition: { duration: 3, repeat: Infinity, ease: "linear" },
      };
    case "shake":
      return {
        x: [-2, 2, -2, 0],
        transition: { duration: 0.6, repeat: Infinity },
      };
    default:
      return {};
  }
};

const WhyChooseUs = () => {
  return (
    <section
      id="why-us"
      className="bg-[var(--sky-bg)] py-20 px-6 sm:px-10 md:px-16 lg:px-32 text-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-4"
      >
        Why Choose{" "}
        <span className="text-[var(--primary-color)]">PremiumWash</span>?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-[var(--text-secondary)] max-w-2xl mx-auto mb-12"
      >
        We’re not just doing laundry - we are redefining convenience, care, and
        quality.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, icon, animation }, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <motion.div
              animate={getIconAnimation(animation)}
              className="mb-4 flex justify-center"
            >
              {icon}
            </motion.div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              {title}
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              {description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
