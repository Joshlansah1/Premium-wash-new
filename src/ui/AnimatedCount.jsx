import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import CountUp from "react-countup";

const AnimatedCount = ({ end, duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    if (isInView) {
      setStartCount(true);
    }
  }, [isInView]);

  return (
    <div ref={ref}>
      {startCount ? <CountUp end={end} duration={duration} /> : "0"}
    </div>
  );
};

export default AnimatedCount;
