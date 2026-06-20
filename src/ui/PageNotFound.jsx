import { Link } from "react-router-dom";
import { BiHomeAlt2 } from "react-icons/bi";
import { motion } from "framer-motion";

function PageNotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-[var(--white-bg)] text-[var(--text-primary)] px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl"
      >
        <h1 className="text-6xl font-extrabold mb-4 text-[var(--primary-color)]">
          404
        </h1>
        <p className="text-xl sm:text-2xl font-semibold mb-2">
          This page is still in the wash 🧺
        </p>
        <p className="text-md sm:text-lg mb-6 text-gray-600">
          Looks like this page took a spin and got lost in the rinse cycle.
          Let's get you back on track.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--primary-color)] text-[var(--text-inverse)] rounded-lg hover:bg-[var(--primary-hover)] transition"
        >
          <BiHomeAlt2 className="text-xl" />
          Go Back Home
        </Link>
      </motion.div>
    </section>
  );
}

export default PageNotFound;
