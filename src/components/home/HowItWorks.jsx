import { motion } from "framer-motion";
import { GiWashingMachine } from "react-icons/gi";
import { FaTruckLoading, FaClipboardList, FaCheckCircle, FaShoppingBasket } from "react-icons/fa";

const steps = [
  {
    title: "1. Book a Pickup",
    description:
      "Schedule a pickup in seconds through our website or phone call.",
    icon: <FaClipboardList size={40} />,
    animation: { rotate: [0, 3, -3, 0] },
  },
  {
    title: "2. We Grab Your Laundry",
    description: "A friendly rider comes by to scoop up your laundry.",
    icon: (
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
      >
        <FaShoppingBasket size={40} />
      </motion.div>
    ),
    animation: {},
  },
  {
    title: "3. Wash & Fold Magic",
    description: "Your clothes enjoy a spa day - washed, dried, folded!",
    icon: (
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      >
        <GiWashingMachine size={40} />
      </motion.div>
    ),
    animation: {},
  },
  {
    title: "4. Fresh Clothes Delivered",
    description:
      "Like magic, your clothes return fresh and folded at your door.",
    icon: (
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        <FaTruckLoading size={40} />
      </motion.div>
    ),
    animation: {},
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="bg-[var(--sky-bg)] py-20 px-6 sm:px-10 md:px-16 lg:px-28"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-extrabold text-center text-[var(--text-primary)] mb-4"
      >
        🧺 How It Works
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-[var(--text-secondary)] text-center max-w-2xl mx-auto mb-12"
      >
        Laundry day made delightful. Here's what your clothes go through.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={step.animation}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center text-[var(--primary-color)] mb-4">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
