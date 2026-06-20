import { motion } from "framer-motion";
import { MdLocalLaundryService } from "react-icons/md";
import { NavLink } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section
      id="request"
      className="relative overflow-hidden py-24 px-6 text-center bg-gradient-to-br from-blue-600 to-blue-800"
    >
      {/* Decorative background circles */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-white/5 -translate-y-1/2" />
        <div className="absolute bottom-0 left-1/2 w-56 h-56 rounded-full bg-white/5 -translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Heading */}
      <motion.h2
        className="text-4xl sm:text-5xl font-bold mb-4 relative z-10 text-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Your Laundry. Done Right.
      </motion.h2>

      {/* Subtext */}
      <motion.p
        className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto text-blue-100 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Clean clothes, more time, zero hassle. Schedule your first pickup and
        let us do the heavy lifting.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="z-10 relative flex flex-col sm:flex-row justify-center items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        <NavLink
          to="/schedule-pickup"
          className="bg-white text-blue-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition shadow-md flex items-center gap-2"
        >
          <MdLocalLaundryService className="text-xl" />
          Schedule Pickup
        </NavLink>
        <NavLink
          to="/contact"
          className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition flex items-center gap-2"
        >
          Contact Us
        </NavLink>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
