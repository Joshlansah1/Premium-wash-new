import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaTruck,
  FaSpinner,
  FaExclamationTriangle,
} from "react-icons/fa";
import { TbWashMachine, TbWind } from "react-icons/tb";
import usePageTitle from "../hooks/usePageTitle";
import { usePageMeta } from "../hooks/usePageMeta";

const statuses = [
  { label: "Received", icon: <FaCheckCircle />, key: "received" },
  { label: "Washing", icon: <TbWashMachine />, key: "washing" },
  { label: "Drying", icon: <TbWind />, key: "drying" },
  { label: "Out for Delivery", icon: <FaTruck />, key: "out for delivery" },
  { label: "Delivered", icon: <FaCheckCircle />, key: "delivered" },
];

const TrackOrder = () => {
  usePageTitle("Track order");
  usePageMeta({
    title: "Track Your Order - Premium Wash",
    description:
      "Track your laundry order in real-time. Know exactly when your clothes will be ready.",
    keywords: "track order, laundry status, order tracking",
    canonical: "https://www.premiumwashgh.com/track-order",
    ogImage: "https://www.premiumwashgh.com/laundry.avif",
  });
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [statusIndex, setStatusIndex] = useState(null);
  const [error, setError] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const RATE_LIMIT_MS = 2000; // 2 seconds between requests
  const CODE_PATTERN = /^[A-Za-z0-9]{3,20}$/; // Alphanumeric, 3-20 chars

  // Validate order code format
  const validateCode = (input) => {
    if (!input.trim()) {
      setError("Please enter an order code");
      return false;
    }
    if (!CODE_PATTERN.test(input)) {
      setError("Order code must be 3-20 alphanumeric characters only");
      return false;
    }
    return true;
  };

  const handleTrack = async () => {
    setError(false);

    // Validate input
    if (!validateCode(code)) return;

    // Rate limiting
    const now = Date.now();
    if (now - lastSubmitTime < RATE_LIMIT_MS) {
      setError("Please wait a moment before searching again");
      return;
    }
    setLastSubmitTime(now);

    setLoading(true);
    setOrder(null);

    try {
      const dbId = import.meta.env.VITE_SHEETDB_API;
      if (!dbId) {
        setError("Configuration error. Please contact support.");
        console.error("SheetDB API not configured");
        setLoading(false);
        return;
      }

      const res = await fetch(
        `https://sheetdb.io/api/v1/${dbId}/search?code=${encodeURIComponent(code)}`,
      );
      const data = await res.json();

      if (data && data.length > 0) {
        const statusKey = data[0].status?.toLowerCase();
        const foundIndex = statuses.findIndex(
          (s) => s.key.toLowerCase() === statusKey,
        );
        setStatusIndex(foundIndex);
        setOrder(data[0]);
      } else {
        setError("No order found with that code. Please try again.");
        setStatusIndex(null);
      }
    } catch (err) {
      console.error("Tracking Error:", err);
      setError("Failed to retrieve order. Please try again later.");
      setStatusIndex(null);
    }

    setLoading(false);
  };

  return (
    <section className="bg-[var(--white-bg)] pt-28 pb-20 sm:py-34 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-[var(--primary-color)] mb-4"
        >
          Track Your Order
        </motion.h2>
        <p className="text-gray-600 mb-8">
          Enter your order code to see its current status.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <input
            type="text"
            placeholder="Enter your code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="px-5 py-3 w-full sm:w-auto rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
          />
          <button
            onClick={handleTrack}
            className="bg-[var(--primary-color)] text-white px-6 py-3 rounded-full hover:bg-[var(--primary-hover)] transition"
          >
            Track Order
          </button>
        </div>

        {loading && (
          <div className="mt-10 flex justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="text-[var(--primary-color)] text-3xl"
            >
              <FaSpinner />
            </motion.div>
          </div>
        )}

        {error && !loading && (
          <div className="mt-10 text-red-600 flex flex-col items-center">
            <FaExclamationTriangle className="text-3xl mb-2" />
            <p>{error}</p>
          </div>
        )}

        {order && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-10">
              Order Status:{" "}
              <span className="text-[var(--primary-color)]">{order.code}</span>
            </h3>

            {/* Desktop: horizontal stepper */}
            <div className="hidden sm:flex justify-between items-start">
              {statuses.map((status, i) => {
                const isActive = i <= statusIndex;
                const isPast = i < statusIndex;
                const isCurrent = i === statusIndex;
                return (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center relative"
                  >
                    {/* Left connector half */}
                    {i > 0 && (
                      <div
                        className={`absolute top-5 right-1/2 w-1/2 h-0.5 transition-colors duration-500 ${
                          isActive
                            ? "bg-[var(--accent-color)]"
                            : "bg-gray-200"
                        }`}
                      />
                    )}
                    {/* Right connector half */}
                    {i < statuses.length - 1 && (
                      <div
                        className={`absolute top-5 left-1/2 w-1/2 h-0.5 transition-colors duration-500 ${
                          isPast
                            ? "bg-[var(--accent-color)]"
                            : "bg-gray-200"
                        }`}
                      />
                    )}
                    {/* Step circle */}
                    <div
                      className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-base border-2 flex-shrink-0 transition-all duration-300 ${
                        isActive
                          ? "bg-[var(--accent-color)] border-[var(--accent-color)] text-white shadow-md"
                          : "bg-white border-gray-200 text-gray-300"
                      } ${isCurrent ? "ring-4 ring-emerald-100 scale-110" : ""}`}
                    >
                      {status.icon}
                    </div>
                    <p
                      className={`text-xs font-semibold mt-3 text-center px-1 transition-colors duration-300 ${
                        isActive ? "text-gray-800" : "text-gray-400"
                      }`}
                    >
                      {status.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Mobile: vertical stepper */}
            <div className="flex sm:hidden flex-col">
              {statuses.map((status, i) => {
                const isActive = i <= statusIndex;
                const isPast = i < statusIndex;
                const isCurrent = i === statusIndex;
                return (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-base border-2 flex-shrink-0 transition-all duration-300 ${
                          isActive
                            ? "bg-[var(--accent-color)] border-[var(--accent-color)] text-white shadow-md"
                            : "bg-white border-gray-200 text-gray-300"
                        } ${isCurrent ? "ring-4 ring-emerald-100 scale-110" : ""}`}
                      >
                        {status.icon}
                      </div>
                      {i < statuses.length - 1 && (
                        <div
                          className={`w-0.5 h-8 transition-colors duration-500 ${
                            isPast
                              ? "bg-[var(--accent-color)]"
                              : "bg-gray-200"
                          }`}
                        />
                      )}
                    </div>
                    <p
                      className={`text-sm font-semibold pt-2.5 transition-colors duration-300 ${
                        isActive ? "text-gray-800" : "text-gray-400"
                      }`}
                    >
                      {status.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TrackOrder;
