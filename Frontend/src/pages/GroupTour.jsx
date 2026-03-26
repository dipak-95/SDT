import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import TourCard from "../component/TourCard";
import TourCardSkeleton from "../component/TourCardSkeleton";

const BASE_URL = "https://api.sdtour.online";

const GroupTour = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH TOURS ================= */
  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/group-tours`);
      setTours(res.data);
    } catch (err) {
      console.error("Failed to fetch group tours", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">

      {/* ================= HERO SECTION ================= */}
      <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
        <img
          src="/GroupTour.webp"
          alt="Group Tours"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 h-full flex flex-col
                     items-center justify-center text-center px-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl md:text-5xl lg:text-6xl
                       font-extrabold text-[#f4612b] tracking-wide"
          >
            Explore Group Tours
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-4 max-w-2xl text-sm md:text-lg text-gray-200"
          >
            Travel together. Discover more. Experience spiritual and
            cultural journeys with comfort, safety, and unforgettable memories.
          </motion.p>
        </motion.div>
      </div>

      {/* ================= TOUR LIST ================= */}
      <div className="w-full py-14">
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl md:text-4xl
                     font-bold mb-10 text-[#F4612B]"
        >
          Popular Group Tours
        </motion.h2>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-8
            px-6 sm:px-8 md:px-16 lg:px-12
            items-stretch
          "
        >
          {/* ================= SKELETON ================= */}
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <TourCardSkeleton key={i} />
            ))}

          {/* ================= TOUR CARDS ================= */}
          {!loading &&
            tours.map(tour => (
              <TourCard key={tour._id} tour={tour} type="group" />
            ))}
        </div>
      </div>
    </div>
  );
};

export default GroupTour;
