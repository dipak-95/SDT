import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import TourCard from "../component/TourCard";


const GroupTour = () => {
  const [tours, setTours] = useState([]);
  const BASE_URL = "http://localhost:1005"; 

  useEffect(() => {
    axios.get(`${BASE_URL}/group-tours`)
      .then(res => setTours(res.data));
  }, []);

  return (
    <div className="w-full">

      {/* ================= HERO SECTION ================= */}
      <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
        {/* HERO IMAGE */}
        <img
          src="/GroupTour.webp"   // 👈 put image in public folder
          alt="Group Tours"
          className="absolute inset-0 w-full h-full object-center"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/55" />

        {/* HERO CONTENT */}
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
            className="mt-4 max-w-2xl text-sm md:text-lg
                       text-gray-200"
          >
            Travel together. Discover more. Experience spiritual and
            cultural journeys with comfort, safety, and unforgettable memories.
          </motion.p>

          {/* <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-6 px-8 py-3 rounded-full
                       bg-[#F4612B] text-white font-semibold
                       hover:bg-white hover:text-[#F4612B]
                       transition-all"
          >
            View Packages
          </motion.button> */}
        </motion.div>
      </div>

      {/* ================= TOUR CARDS ================= */}
      <div className="w-full py-14">
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          // viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl md:text-4xl
                     font-bold mb-10 text-[#F4612B]"
        >
          Popular Group Tours
        </motion.h2>
        <div className="
  grid
  grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-3
  gap-8
  px-6 sm:px-8 md:px-16 lg:px-32
  items-stretch
">
          {tours.map(tour => (
            <TourCard key={tour._id} tour={tour} type="group" />
          ))}
        </div>


      </div>
    </div>
  );
};

export default GroupTour;
