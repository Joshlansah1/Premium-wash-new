import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  FaTwitter,
  FaInstagram,
  FaSnapchatGhost,
  FaTiktok,
} from "react-icons/fa";
import AnimatedBackground from "../ui/AnimatedBackground";
import LocationsMap from "./home/LocationsMap";
import toast from "react-hot-toast";
import Spinner from "../ui/Spinner";
import usePageTitle from "../hooks/usePageTitle";
import { usePageMeta } from "../hooks/usePageMeta";

// Security: Input sanitization helper
const sanitizeInput = (input) => {
  if (typeof input !== "string") return "";
  return input
    .trim()
    .slice(0, 5000) // Limit input length
    .replace(/[<>\"']/g, (char) => {
      const escapeMap = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
      };
      return escapeMap[char];
    });
};

// Security: Validate email format strictly
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Security: Rate limiting helper
const createRateLimiter = (maxAttempts = 5, windowMs = 60000) => {
  const attempts = [];
  return {
    isAllowed: () => {
      const now = Date.now();
      const recentAttempts = attempts.filter((time) => now - time < windowMs);
      if (recentAttempts.length >= maxAttempts) return false;
      attempts.push(now);
      return true;
    },
  };
};

const rateLimiter = createRateLimiter(5, 60000); // 5 attempts per minute

const Contact = () => {
  usePageTitle("Contact Us");
  usePageMeta({
    title: "Contact Premium Wash - Get In Touch",
    description:
      "Contact Premium Wash Laundry for inquiries, complaints, or to schedule your laundry pickup today.",
    keywords: "contact us, customer service, inquiries, schedule pickup",
    canonical: "https://www.premiumwashgh.com/contact",
    ogImage: "https://www.premiumwashgh.com/laundry.avif",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  async function onSubmit(data) {
    // Security: Rate limiting check
    if (!rateLimiter.isAllowed()) {
      toast.error("Too many requests. Please try again later.");
      return;
    }

    // Security: Validate and sanitize all inputs
    const sanitizedData = {
      name: sanitizeInput(data.name),
      email: sanitizeInput(data.email),
      message: sanitizeInput(data.message),
    };

    // Security: Additional validation
    if (!sanitizedData.name || sanitizedData.name.length < 2) {
      toast.error("Please enter a valid name (at least 2 characters).");
      return;
    }

    // Email is optional but if provided, must be valid
    if (sanitizedData.email && !isValidEmail(sanitizedData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!sanitizedData.message || sanitizedData.message.length < 5) {
      toast.error("Please enter a message (at least 5 characters).");
      return;
    }

    try {
      const formspreeIDContact = import.meta.env.VITE_FORMSPREE_ID_CONTACT;
      // Security: Use minimal headers to avoid CORS preflight issues
      const response = await fetch(
        `https://formspree.io/f/${formspreeIDContact}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sanitizedData),
        },
      );

      if (response.ok) {
        toast.success("Thank you! Your message has been sent.");
        reset();
      } else if (response.status === 429) {
        toast.error("Too many requests. Please try again later.");
      } else if (response.status >= 400 && response.status < 500) {
        toast.error("Invalid request. Please check your input.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An unexpected error occurred.");
    }
  }

  return (
    <section
      id="contact"
      className="bg-white sm:py-34 py-20 px-6 text-gray-800 relative"
    >
      <AnimatedBackground />

      <div className="relative z-20 max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start py-16 px-6">
        {/* Info Section */}
        <div>
          <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-6">
            We'd love to hear from you. Whether it's feedback, a question, or a
            custom request — drop us a message.
          </p>

          <div className="space-y-6 text-sm text-[var(--text-secondary)]">
            <div>
              <h4 className="text-lg font-semibold mb-1">KNUST Branch</h4>
              <p>Boadi Abaase Junction, Kumasi, Ghana</p>
              <p>
                📞{" "}
                <a href="tel:+233552481766" className="hover:underline">
                  +233 552 481 766
                </a>{" "}
                /{" "}
                <a href="tel:+233505613353" className="hover:underline">
                  +233 505 613 353
                </a>
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-1">Danyame Branch</h4>
              <p>O'Lady's Pub Building, Miklin Hotel road, Kumasi</p>
              <p>
                📞{" "}
                <a href="tel:+233209462712" className="hover:underline">
                  +233 209 462 712
                </a>
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-1">Ayeduase Branch</h4>
              <p>KNUST - St. Theresa's Hostel, Kumasi</p>
              <p>
                📞{" "}
                <a href="tel:+233505613353" className="hover:underline">
                  +233 505 613 353
                </a>
              </p>
            </div>
            <p>
              📧{" "}
              <a
                href="mailto:Premiumwash97@gmail.com"
                className="hover:underline"
              >
                Premiumwash97@gmail.com
              </a>
            </p>

            <div>
              <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
              <div className="flex gap-4 text-xl">
                <a
                  href="https://snapchat.com/add/the_premiumwash"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Premium Wash on Snapchat"
                  className="hover:text-[var(--primary-color)]"
                >
                  <FaSnapchatGhost />
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
                  <FaTiktok />
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
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl shadow-md p-6 sm:p-10 bg-white space-y-6"
        >
          <div>
            <label htmlFor="contact-name" className="block mb-1 font-medium">
              Full Name
            </label>
            <input
              id="contact-name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Name must not exceed 100 characters",
                },
                pattern: {
                  value: /^[a-zA-Z\s'-]+$/,
                  message: "Name contains invalid characters",
                },
              })}
              maxLength={100}
              autoComplete="name"
              aria-label="Full Name"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-[var(--primary-color)]"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="contact-email" className="block mb-1 font-medium">
              Email <span className="text-gray-500 text-sm">(Optional)</span>
            </label>
            <input
              id="contact-email"
              type="email"
              {...register("email", {
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
                maxLength: { value: 254, message: "Email is too long" },
              })}
              maxLength={254}
              autoComplete="email"
              aria-label="Email Address"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-[var(--primary-color)]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="contact-message" className="block mb-1 font-medium">
              Message
            </label>
            <textarea
              id="contact-message"
              rows={4}
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 5,
                  message: "Message must be at least 5 characters",
                },
                maxLength: {
                  value: 5000,
                  message: "Message must not exceed 5000 characters",
                },
              })}
              maxLength={5000}
              aria-label="Message"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-[var(--primary-color)]"
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white px-6 py-3 rounded-lg font-medium transition"
          >
            {/* {isSubmitting ? <Spinner /> : "Send Message"} */}
            {isSubmitting ? (
              <>
                <Spinner />
                <span className="sr-only">Sending...</span>
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>

      <LocationsMap />
    </section>
  );
};

export default Contact;
