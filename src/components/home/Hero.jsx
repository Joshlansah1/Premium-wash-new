import { motion } from "framer-motion";
import { useMemo } from "react";
import { FaTshirt } from "react-icons/fa";
import { MdLocalLaundryService } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

function Hero() {
  const shirts = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        duration: 6 + Math.random() * 2,
        delay: i * 0.3,
      })),
    [],
  );

  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-screen flex flex-col justify-center items-center px-6 text-center bg-gradient-to-br from-blue-50 via-white to-emerald-50"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        {shirts.map((shirt, i) => (
          <motion.div
            key={i}
            className="absolute text-[var(--accent-color)] opacity-20 text-3xl"
            initial={{ y: 0 }}
            animate={{ y: [-10, 10, -10], rotate: [0, 10, -10, 0] }}
            transition={{
              duration: shirt.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shirt.delay,
            }}
            style={{ top: shirt.top, left: shirt.left }}
          >
            <FaTshirt />
          </motion.div>
        ))}
      </div>

      {/* Hero Text */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-[var(--text-primary)] max-w-3xl relative z-10"
      >
        Laundry,{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-500">
          Reinvented.
        </span>
      </motion.h1>

      {/* Typewriter */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-4 text-xl sm:text-2xl font-semibold text-[var(--primary-color)] relative z-10"
      >
        <Typewriter
          words={[
            "Dry Cleaning",
            "Express Wash",
            "Eco-Friendly Detergents",
            "Convenient Pickup & Delivery",
          ]}
          loop={true}
          cursor
          cursorStyle="|"
          typeSpeed={60}
          deleteSpeed={40}
          delaySpeed={1500}
        />
      </motion.p>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        className="mt-4 text-lg sm:text-xl text-[var(--text-secondary)] max-w-xl relative z-10"
      >
        Convenient, fast and eco-conscious laundry services tailored to your
        needs.
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, delay: 0.8 }}
        className="mt-8 flex flex-col sm:flex-row gap-4 relative z-10"
      >
        <NavLink
          to="/schedule-pickup"
          className="bg-[var(--primary-color)] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[var(--primary-hover)] transition shadow-md flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <MdLocalLaundryService className="text-xl" />
          Schedule Pickup
        </NavLink>
        <NavLink
          to="/services"
          className="border-2 border-[var(--primary-color)] text-[var(--primary-color)] px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          View Services
        </NavLink>
      </motion.div>
    </section>
  );
}

export default Hero;
