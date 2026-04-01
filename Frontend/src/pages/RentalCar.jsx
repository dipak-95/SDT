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

  // 🔥 NEW FILTERS
  const [maxPrice, setMaxPrice] = useState(100); // Default high-ish
  const [seats, setSeats] = useState("all");

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

    // 🔥 Apply Price and Seat filters
    const matchesPrice = Number(car.pricePerKm) <= maxPrice;
    const matchesSeats = seats === "all" ? true : Number(car.seats) === Number(seats);

    return matchesType && matchesSearch && matchesPrice && matchesSeats;
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
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-20 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-[320px]">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Search vehicles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-orange-200 bg-orange-50/50 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none"
              />
            </div>

            {/* 🔥 FILTERS UI */}
            <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 shrink-0">
                <span className="text-xs font-bold text-gray-400">SEATS</span>
                <select 
                  value={seats} 
                  onChange={e => setSeats(e.target.value)}
                  className="bg-transparent text-sm font-bold text-gray-700 outline-none cursor-pointer"
                >
                  <option value="all">All</option>
                  <option value="4">4 Seater</option>
                  <option value="5">5 Seater</option>
                  <option value="6">6 Seater</option>
                  <option value="7">7 Seater</option>
                </select>
              </div>

              <div className="flex flex-1 lg:w-48 items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                <span className="text-xs font-bold text-gray-400 whitespace-nowrap">PRICE ≤</span>
                <input 
                  type="range" min="10" max="250" step="5"
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                  className="w-full h-1.5 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-[#F4612B]"
                />
                <span className="text-sm font-bold text-[#F4612B] min-w-[30px]">₹{maxPrice}</span>
              </div>
              
              {(search || type !== "all" || seats !== "all" || maxPrice < 250) && (
                <button 
                  onClick={() => { setSearch(""); setType("all"); setSeats("all"); setMaxPrice(250); }}
                  className="text-xs font-bold text-orange-600 hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Category tabs — horizontally scrollable */}
          <div className="flex gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar pt-2 border-t border-gray-50">
            <button
              onClick={() => setType("all")}
              className={`shrink-0 px-5 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap
                ${type === "all"
                  ? "bg-[#F4612B] text-white shadow-lg shadow-orange-100"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-orange-200"
                }`}
            >
              All Vehicles
            </button>
            {categories.map(c => (
              <button
                key={c._id}
                onClick={() => setType(c.name)}
                className={`shrink-0 px-5 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap capitalize
                  ${type?.toLowerCase() === c.name?.toLowerCase()
                    ? "bg-[#F4612B] text-white shadow-lg shadow-orange-100"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-orange-200"
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
