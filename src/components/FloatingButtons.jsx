import { FaPhoneAlt, FaCalendarAlt, FaWhatsapp } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-3 sm:gap-4 z-[9999]">
      {/* Call Now */}
      <a
        href="tel:+233552481766"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white text-lg sm:text-xl shadow-lg transition"
        title="Call Now"
        aria-label="Call Premium Wash"
      >
        <FaPhoneAlt />
      </a>

      {/* Schedule Pickup */}
      <NavLink
        to="/schedule-pickup"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white text-lg sm:text-xl shadow-lg transition"
        title="Schedule Pickup"
        aria-label="Schedule a Pickup"
      >
        <FaCalendarAlt />
      </NavLink>

      {/* WhatsApp Chat */}
      <a
        href="https://wa.me/233552481766"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-[#25D366] hover:bg-[#1EBE5D] text-white text-lg sm:text-xl shadow-lg transition"
        title="Chat on WhatsApp"
        aria-label="Chat with us on WhatsApp"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
};

export default FloatingButtons;
