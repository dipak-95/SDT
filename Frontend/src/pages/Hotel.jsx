import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HotelCard from "../component/HotelCard";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = "https://sdt-7.onrender.com";

export default function Hotel() {
  const { city } = useParams();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const CITY_HERO_IMAGES = {
    dwarka: "/Hero2.jpg",
    somnath: "/Hero5.jpg",
    sasangir: "/Hero3.png",
    junagadh: "/Hero4.jpg",
    vadodara: "/Hero6.png",
    ahmedabad: "/Hero.jpg",
  };

  const DEFAULT_HERO = "/Hero.jpg";

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const res = await axios.get(`${API_BASE}/hotels`);
      setHotels(res.data);
    } catch (err) {
      console.error("Fetch hotels failed", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredHotels = city
    ? hotels.filter(
        (h) =>
          h.city &&
          h.city.trim().toLowerCase() === city.trim().toLowerCase()
      )
    : hotels;

  const heroImage = city
    ? CITY_HERO_IMAGES[city.toLowerCase()] || DEFAULT_HERO
    : DEFAULT_HERO;

  return (
    <div className="w-full">

      {/* ================= HERO ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative w-full h-[65vh] overflow-hidden"
      >
        <img
          src={heroImage}
          alt={city ? `${city} hotels` : "Hotels in Gujarat"}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 h-full flex items-center justify-center text-center px-4"
        >
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#f4612b]">
              {city ? `${city.toUpperCase()} HOTELS` : "Hotels Across Gujarat"}
            </h1>
            <p className="mt-3 text-gray-200">
              Best stays • Verified hotels • Trusted service
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* ================= LOADING ================= */}
      {loading && (
        <p className="text-center py-10 text-gray-500">
          Loading hotels...
        </p>
      )}

      {/* ================= EMPTY ================= */}
      {!loading && filteredHotels.length === 0 && (
        <p className="text-center py-10 text-gray-500">
          No hotels found in this city
        </p>
      )}

      {/* ================= HOTEL GRID ================= */}
      <div className="m-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredHotels.map((hotel, index) => (
          <motion.div
            key={hotel._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <HotelCard hotel={hotel} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
