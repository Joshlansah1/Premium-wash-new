import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const mobileMenuRef = useRef(null);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Track Order", path: "/track-order" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (menuOpen) setMenuOpen(false);
      setShowNavbar(currentScrollY < 80 || currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [lastScrollY, menuOpen]);

  return (
    <AnimatePresence>
      {showNavbar && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-full z-50 bg-[var(--white-bg)] shadow-md"
        >
          <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
            {/* Logo */}
            <NavLink to="/" className="">
              <img
                src="/logo.jpg"
                alt="Premium Wash Logo"
                className="h-12 sm:h-16 w-auto object-contain bg-[var(--primary-color)]"
              />
            </NavLink>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex items-center space-x-6 text-[var(--text-primary)] font-medium">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "text-[var(--primary-color)] font-semibold"
                          : "hover:text-[var(--primary-color)]"
                      } transition`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink
                  to="/schedule-pickup"
                  className="bg-[var(--primary-color)] text-[var(--text-inverse)] px-5 py-2 rounded-full font-semibold hover:bg-[var(--primary-hover)] transition"
                >
                  Schedule Pickup
                </NavLink>
              </li>
            </ul>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-2xl"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </nav>

          {/* Mobile Nav */}
          <AnimatePresence>
            {menuOpen && (
              <motion.ul
                ref={mobileMenuRef}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden bg-[var(--white-bg)] px-6 pb-4 text-[var(--text-primary)] font-medium overflow-hidden space-y-4"
              >
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "text-[var(--primary-color)] font-semibold"
                            : "hover:text-[var(--primary-color)]"
                        } block transition`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                <li>
                  <NavLink
                    to="/schedule-pickup"
                    onClick={() => setMenuOpen(false)}
                    className="block bg-[var(--primary-color)] text-[var(--text-inverse)] px-5 py-3 rounded-full font-semibold hover:bg-[var(--primary-hover)] transition text-center"
                  >
                    Schedule Pickup
                  </NavLink>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
