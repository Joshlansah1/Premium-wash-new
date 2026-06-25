import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { SiSnapchat, SiTiktok } from "react-icons/si";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[var(--footer-bg)] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="flex flex-col items-start space-y-4">
          <NavLink to="/" className="">
            <img
              src="/logo.jpg"
              alt="Premium Wash Logo"
              className="h-12 sm:h-16 w-auto object-contain bg-[var(--primary-color)]"
            />
          </NavLink>
          <p className="text-sm">
            Fast, eco-friendly laundry & cleaning services with convenient
            pickup and delivery. Your clothes, our care.
          </p>
        </div>

        {/* Branches */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Our Branches</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <p className="font-medium">KNUST Branch</p>
              <p>Boadi Abaase Junction, Kumasi</p>
              <p>
                <a href="tel:+233552481766" className="hover:underline">
                  +233 552 481 766
                </a>{" "}
                /{" "}
                <a href="tel:+233505613353" className="hover:underline">
                  +233 505 613 353
                </a>
              </p>
            </li>
            <li>
              <p className="font-medium">Danyame Branch</p>
              <p>O'Lady's Pub Building, Miklin Hotel Road, Kumasi</p>
              <p>
                <a href="tel:+233209462712" className="hover:underline">
                  +233 209 462 712
                </a>
              </p>
            </li>
            <li>
              <p className="font-medium">Ayeduase Branch</p>
              <p>KNUST - St. Theresa's Hostel, Kumasi</p>
              <p>
                <a href="tel:+233505613353" className="hover:underline">
                  +233 505 613 353
                </a>
              </p>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-[var(--primary-color)]" />
              <a
                href="mailto:Premiumwash97@gmail.com"
                className="hover:underline"
              >
                Premiumwash97@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[var(--primary-color)]" />
              <span>Kumasi, Ghana</span>
            </li>
          </ul>
        </div>

        {/* Quick Links & Socials */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm mb-6">
            <li>
              <NavLink to="/services" className="hover:underline">
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:underline">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/track-order" className="hover:underline">
                Track order
              </NavLink>
            </li>
            <li>
              <NavLink to="/schedule-pickup" className="hover:underline">
                Schedule Pickup
              </NavLink>
            </li>
          </ul>

          <h4 className="text-sm font-semibold mb-2">Follow us</h4>
          <div className="flex gap-4 text-lg">
            <a
              href="https://snapchat.com/add/the_premiumwash"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Premium Wash on Snapchat"
              className="hover:text-[var(--primary-color)]"
            >
              <SiSnapchat />
            </a>
            <a
              href="https://instagram.com/the_premiumwash"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Premium Wash on Instagram"
              className="hover:text-[var(--primary-color)]"
            >
              <FaInstagram />
            </a>
            <a
              href="https://tiktok.com/@the_premiumwash"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Premium Wash on TikTok"
              className="hover:text-[var(--primary-color)]"
            >
              <SiTiktok />
            </a>
            <a
              href="https://x.com/the_premiumwash"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Premium Wash on X"
              className="hover:text-[var(--primary-color)]"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-white/10 pt-6 text-sm text-center">
        <p>
          &copy; {new Date().getFullYear()} Premium Wash. All rights reserved.
        </p>
        <p className="mt-2">
          Developed with <span className="text-red-500">❤️</span> by{" "}
          <a
            href="tel:+233550663125"
            className="text-[var(--primary-color)] hover:underline font-medium"
          >
            Lansah
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
