import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TourImageSlider = ({ images = [] }) => {
  const [index, setIndex] = useState(0);

  if (!images.length) return null;

  const prev = () =>
    setIndex(index === 0 ? images.length - 1 : index - 1);

  const next = () =>
    setIndex(index === images.length - 1 ? 0 : index + 1);

  return (
    <div className="relative h-48 w-full overflow-hidden rounded-xl">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={`http://localhost:1005${images[index]}`}
          alt=""
          className="h-full w-full object-cover"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2
                       bg-black/60 text-white p-1 rounded-full"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2
                       bg-black/60 text-white p-1 rounded-full"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}
    </div>
  );
};

export default TourImageSlider;
