import { FaBalanceScale, FaBolt, FaClock } from "react-icons/fa";

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="relative py-20 px-6 bg-gray-50 text-center text-gray-800"
    >
      {/* Bubbles / Blobs */}
      <svg
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="blurBubble" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>
        </defs>

        {[...Array(12)].map((_, i) => (
          <circle
            key={i}
            cx={Math.random() * 100 + "%"}
            cy={Math.random() * 100 + "%"}
            r={Math.random() * 30 + 20}
            fill="url(#bubbleGradient)"
            stroke="white"
            strokeWidth="0.5"
            filter="url(#blurBubble)"
            className={`animate-bubble float-${i % 5}`}
          />
        ))}

        <defs>
          <radialGradient id="bubbleGradient" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="60%" stopColor="#90e0ef" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0077b6" stopOpacity="0.4" />
          </radialGradient>
          <radialGradient id="bubbleGradient" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="60%" stopColor="#90e0ef" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0077b6" stopOpacity="0.4" />
          </radialGradient>
        </defs>
      </svg>

      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-[var(--text-primary)]">
        Simple, Transparent Pricing
      </h2>
      <p className="max-w-xl mx-auto text-lg text-gray-600 mb-12">
        Affordable rates with flexible turnaround options. You only pay for the
        weight of your laundry!
      </p>

      <div className="grid gap-8 sm:grid-cols-2 max-w-5xl mx-auto">
        {/* Pricing by weight */}
        <div className="bg-white shadow-lg rounded-xl p-8 text-left hover:shadow-xl transition">
          <div className="flex items-center gap-4 mb-4">
            <FaBalanceScale className="text-5xl text-[var(--primary-color)]" />
            <h3 className="text-2xl font-semibold">Weight-Based Pricing</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Laundry is weighed using a digital scale, and charged per kilogram.
          </p>
          <p className="text-xl font-bold text-[var(--primary-color)]">
            GHS 12.00 per kg
          </p>
        </div>

        {/* Turnaround time options */}
        <div className="bg-white shadow-lg rounded-xl p-8 text-left hover:shadow-xl transition">
          <div className="flex items-center gap-4 mb-4">
            <FaClock className="text-5xl text-[var(--primary-color)]" />
            <h3 className="text-2xl font-semibold">Service Options</h3>
          </div>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start gap-3">
              <FaBolt className="text-2xl text-yellow-500 mt-1" />
              <div>
                <span className="font-bold">Express Service:</span> Get your
                clothes back within 2–4 hours.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <FaClock className="text-2xl text-blue-600 mt-1" />
              <div>
                <span className="font-bold">Standard Service:</span> Ready in 24
                hours.
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12">
        <a
          href="#request"
          className="bg-[var(--primary-color)] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-[var(--primary-hover)] transition"
        >
          Schedule a Pickup
        </a>
      </div>
    </section>
  );
};

export default Pricing;
