import { motion } from "framer-motion";
import { FaHandsHelping, FaLeaf, FaUserCheck, FaHistory } from "react-icons/fa";
import AnimatedCount from "../ui/AnimatedCount";

const MissionSection = () => {
  const features = [
    {
      icon: <FaHandsHelping />,
      title: "Customer First",
      desc: "Every shirt, sock, and smile matters to us. You’re our priority.",
    },
    {
      icon: <FaLeaf />,
      title: "Eco-Friendly",
      desc: "We use biodegradable products that are kind to your clothes and the planet.",
    },
    {
      icon: <FaUserCheck />,
      title: "Trusted by Many",
      desc: "Hundreds of satisfied customers trust us with their weekly laundry.",
    },
    {
      icon: <FaHistory />,
      title: "Always Evolving",
      desc: "We constantly innovate to improve our process and service.",
    },
  ];

  const stats = [
    { label: "Happy Clients", count: 2500 },
    { label: "Clothes Cleaned", count: 180000 },
    { label: "Locations", count: 3 },
    { label: "Team Members", count: 12 },
  ];

  return (
    <section className="bg-[var(--section-bg)] py-20 px-6">
      {/* Feature Cards */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white p-6 rounded-2xl shadow-md text-center group"
          >
            <motion.div
              whileHover={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.6 }}
              className="text-4xl text-[var(--primary-color)] mb-4 flex justify-center items-center"
            >
              {item.icon}
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center max-w-6xl mx-auto">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl py-6 shadow-md"
          >
            <h4 className="text-4xl font-bold text-[var(--primary-color)] mb-2 flex justify-center items-baseline">
              <AnimatedCount end={stat.count} />
              {stat.label !== "Locations" && "+"}
            </h4>
            <p className="text-gray-700">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MissionSection;
