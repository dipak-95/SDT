import { motion, useScroll, useTransform } from "framer-motion";
import { FaArrowUp } from "react-icons/fa6";
import { useEffect, useState } from "react";

/* 🔥 THICK RING VALUES */
const RADIUS = 24;
const STROKE = 6;
const SIZE = 60;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ScrollToTopButton() {
  const { scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setShow(v > 0.05);
    });
    return () => unsub();
  }, [scrollYProgress]);

  /* Progress animation */
  const strokeDashoffset = useTransform(
    scrollYProgress,
    [0, 1],
    [CIRCUMFERENCE, 0]
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!show) return null;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 cursor-pointer"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.12 }}
      onClick={scrollToTop}
    >
      {/* ================= PROGRESS RING ================= */}
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="-rotate-90"
      >
        {/* Background ring */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="#fde7df"
          strokeWidth={STROKE}
          fill="none"
        />

        {/* Progress ring */}
        <motion.circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="#F4612B"
          strokeWidth={STROKE}
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
        />
      </svg>

      {/* ================= CENTER ICON ================= */}
      <div
        className="
          absolute inset-[6px]
          bg-white
          rounded-full
          shadow-lg
          flex items-center justify-center
          text-[#F4612B]
        "
      >
        <FaArrowUp className="text-lg" />
      </div>
    </motion.div>
  );
}
