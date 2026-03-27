import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import CarCard from "../component/CarCard";
import CarCardSkeleton from "../component/CarCardSkeleton";
import { Search } from "lucide-react";

const BASE_URL = "https://api.sdtour.online";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carsRes, catRes] = await Promise.all([
          axios.get(`${BASE_URL}/cars`),
          axios.get(`${BASE_URL}/car-categories`)
        ]);
        setCars(carsRes.data);
        setCategories(catRes.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredCars = cars.filter(car => {
    const matchesType = type === "all" ? true
      : car.type?.toLowerCase() === type?.toLowerCase();
    const matchesSearch = car.name.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="w-full overflow-x-hidden">

      {/* ── HERO ── */}
      <div className="relative h-[65vh] w-full overflow-hidden">
        <img
          src="/heroofcar.webp"
          className="absolute inset-0 w-full h-full object-cover scale-105"
          alt="Car Rental"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-orange-400 font-semibold uppercase tracking-widest text-sm mb-3"
          >
            Saurashtra Darshan Tours
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-white text-4xl md:text-5xl font-extrabold drop-shadow-lg"
          >
            Choose Your Perfect Ride
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 mt-3 text-base"
          >
            Comfortable · Safe · Affordable
          </motion.p>
        </div>
      </div>

      {/* ── SEARCH & FILTER BAR ── */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">

          {/* Search */}
          <div className="relative w-full sm:w-[380px]">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search vehicle name or model..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-orange-200 bg-orange-50
                         focus:ring-2 focus:ring-[#F4612B]/30 focus:outline-none focus:border-[#F4612B]
                         text-sm text-gray-700 placeholder-gray-400 transition"
            />
          </div>

          {/* Category tabs — horizontally scrollable */}
          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 max-w-full scrollbar-hide">
            <button
              onClick={() => setType("all")}
              className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap
                ${type === "all"
                  ? "bg-[#F4612B] text-white shadow-md shadow-orange-200"
                  : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-[#F4612B]"
                }`}
            >
              All Vehicles
            </button>
            {categories.map(c => (
              <button
                key={c._id}
                onClick={() => setType(c.name)}
                className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap capitalize
                  ${type?.toLowerCase() === c.name?.toLowerCase()
                    ? "bg-[#F4612B] text-white shadow-md shadow-orange-200"
                    : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-[#F4612B]"
                  }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CAR GRID ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">

        {/* result count */}
        {!loading && (
          <p className="text-sm text-gray-400 mb-6">
            Showing <span className="font-bold text-gray-700">{filteredCars.length}</span> vehicle{filteredCars.length !== 1 ? "s" : ""}
            {type !== "all" ? ` in "${type}"` : ""}
          </p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {loading && Array.from({ length: 6 }).map((_, i) => <CarCardSkeleton key={i} />)}

          {!loading && filteredCars.map((car, i) => (
            <motion.div
              key={car._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <CarCard car={car} />
            </motion.div>
          ))}

          {!loading && filteredCars.length === 0 && (
            <div className="col-span-full flex flex-col items-center py-20 text-gray-400">
              <span className="text-5xl mb-3">🚗</span>
              <p className="text-lg font-semibold">No vehicles found</p>
              <p className="text-sm mt-1">Try a different category or search term</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
