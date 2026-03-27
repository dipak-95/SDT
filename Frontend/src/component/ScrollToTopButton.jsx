import { motion, useScroll, useTransform } from "framer-motion";
import { FaArrowUp } from "react-icons/fa6";
import { useEffect, useState } from "react";

/* 🔥 DESKTOP VALUES */
const DESKTOP_RADIUS = 24;
const DESKTOP_STROKE = 6;
const DESKTOP_SIZE = 60;

/* 🔥 MOBILE VALUES */
const MOBILE_RADIUS = 18;
const MOBILE_STROKE = 5;
const MOBILE_SIZE = 46;

export function ScrollToTopButton() {
  const { scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setShow(v > 0.05);
    });
    return () => unsub();
  }, [scrollYProgress]);

  /* 🔥 Responsive values */
  const RADIUS = isMobile ? MOBILE_RADIUS : DESKTOP_RADIUS;
  const STROKE = isMobile ? MOBILE_STROKE : DESKTOP_STROKE;
  const SIZE = isMobile ? MOBILE_SIZE : DESKTOP_SIZE;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

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
      className="
        fixed
        bottom-6 sm:bottom-8
        right-10 sm:right-12
        z-50
        cursor-pointer
      "
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
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="#fde7df"
          strokeWidth={STROKE}
          fill="none"
        />

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
          absolute
          inset-[4px] sm:inset-[6px]
          bg-white
          rounded-full
          shadow-lg
          flex items-center justify-center
          text-[#F4612B]
        "
      >
        <FaArrowUp className="text-sm sm:text-lg" />
      </div>
    </motion.div>
  );
}
