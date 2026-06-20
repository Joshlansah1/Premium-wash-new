import { useMemo } from "react";
import { motion } from "framer-motion";
import { FaTshirt } from "react-icons/fa";

const AnimatedBackground = ({ shirtCount = 25 }) => {
  const shirts = useMemo(
    () =>
      Array.from({ length: shirtCount }, (_, i) => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        duration: 6 + Math.random() * 3,
        delay: i * 0.3,
      })),
    [shirtCount],
  );

  const bubbles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        cx: `${Math.random() * 100}%`,
        cy: `${Math.random() * 100}%`,
        r: Math.random() * 30 + 20,
        floatClass: `float-${i % 5}`,
      })),
    [],
  );

  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        {shirts.map((shirt, i) => (
          <motion.div
            key={i}
            className="absolute text-[var(--accent-color)] opacity-10 text-3xl"
            initial={{ y: 0 }}
            animate={{ y: [-10, 10, -10], rotate: [0, 10, -10, 0] }}
            transition={{
              duration: shirt.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shirt.delay,
            }}
            style={{ top: shirt.top, left: shirt.left }}
          >
            <FaTshirt />
          </motion.div>
        ))}
      </div>

      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="blurBubble" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>
          <radialGradient id="bubbleGradient" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="60%" stopColor="#90e0ef" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0077b6" stopOpacity="0.4" />
          </radialGradient>
        </defs>
        {bubbles.map((b, i) => (
          <circle
            key={i}
            cx={b.cx}
            cy={b.cy}
            r={b.r}
            fill="url(#bubbleGradient)"
            stroke="white"
            strokeWidth="0.5"
            filter="url(#blurBubble)"
            className={`animate-bubble ${b.floatClass}`}
          />
        ))}
      </svg>
    </>
  );
};

export default AnimatedBackground;
