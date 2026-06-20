import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Sarah Adusei",
    role: "Busy Entrepreneur",
    quote:
      "PremiumWash has literally changed how I do laundry. Scheduling is a breeze, and the express delivery saved me for an important meeting.",
    avatar: "./testimonial1.jpg",
  },
  {
    name: "Kwame Owusu",
    role: "University Student",
    quote:
      "No more worrying about finding time to do laundry. They’re fast, reliable, and always keep me updated. Total game changer.",
    avatar: "./testimonial2.jpg",
  },
  {
    name: "Ama Nyarko",
    role: "Working Mom",
    quote:
      "As a mom of three, I don’t have time to spare. PremiumWash handles it all. Clothes are always clean, fresh, and folded perfectly.",
    avatar: "./testimonial3.jpg",
  },
  {
    name: "Michael Boateng",
    role: "Tech Startup Founder",
    quote:
      "Clean clothes without the hassle. Their pickup and delivery service is smooth and reliable. I recommend them to all my colleagues.",
    avatar: "./testimonial4.jpg",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="bg-[var(--section-bg)] py-20 px-6 sm:px-10 md:px-16 lg:px-32"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-extrabold text-center text-[var(--text-primary)] mb-4"
      >
        What Our Clients Say
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-[var(--text-secondary)] text-center max-w-2xl mx-auto mb-12"
      >
        Hear directly from the people who trust us to keep them looking fresh.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="flex items-start gap-4 mb-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[var(--primary-color)]"
              />
              <div className="text-left">
                <h3 className="font-semibold text-[var(--text-primary)] text-lg">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {testimonial.role}
                </p>
              </div>
            </div>

            <div className="relative text-[var(--text-secondary)] text-sm leading-relaxed">
              <FaQuoteLeft className="absolute top-[-10px] left-[-10px] text-[var(--primary-color)] opacity-20 text-xl" />
              {testimonial.quote}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
