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
  const [maxPrice, setMaxPrice] = useState(100); 
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

    const matchesPrice = Number(car.pricePerKm) <= maxPrice;
    const matchesSeats = seats === "all" ? true : Number(car.seats) === Number(seats);

    return matchesType && matchesSearch && matchesPrice && matchesSeats;
  });

  /* 🔥 SEAT OPTIONS GENERATOR (4 to 60) */
  const seatOptions = [4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20, 25, 30, 35, 45, 50, 56, 60];

  return (
    <div className="w-full overflow-x-hidden">

      {/* ── HERO ── */}
      <div className="relative h-[45vh] md:h-[65vh] w-full overflow-hidden">
        <img
          src="/heroofcar.webp"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Car Rental"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-orange-400 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs mb-3"
          >
            Saurashtra Darshan Tours
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-3xl md:text-6xl font-black drop-shadow-2xl uppercase tracking-tighter"
          >
            Choose Your <span className="text-[#F4612B]">Perfect Ride</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-200 mt-4 text-sm md:text-lg font-medium max-w-2xl"
          >
            From compact cars to luxury buses, we provide the best wheels for your Gujarat journey.
          </motion.p>
        </div>
      </div>

      {/* ── SEARCH & FILTER BAR ── */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-20 md:py-6 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-[350px] group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F4612B] transition-colors" />
              <input
                placeholder="Search vehicles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-50 bg-gray-50 text-sm focus:bg-white focus:border-[#F4612B] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-semibold"
              />
            </div>

            {/* 🔥 FILTERS UI */}
            <div className="flex flex-wrap md:flex-nowrap gap-4 items-center w-full lg:w-auto">
              {/* Seats Filter */}
              <div className="flex-1 md:w-48 bg-gray-50 border-2 border-gray-50 rounded-2xl px-4 py-3 flex items-center justify-between group focus-within:border-[#F4612B] focus-within:bg-white transition-all">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Capacity</span>
                  <select 
                    value={seats} 
                    onChange={e => setSeats(e.target.value)}
                    className="bg-transparent text-sm font-bold text-gray-800 outline-none cursor-pointer appearance-none pr-8"
                    style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C/polyline%3E%3C/svg%3E')", backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: '16px' }}
                  >
                    <option value="all">All Seats</option>
                    {seatOptions.map(s => <option key={s} value={s}>{s} Seater</option>)}
                  </select>
                </div>
              </div>

              {/* Price Filter */}
              <div className="flex-[2] md:w-64 bg-gray-50 border-2 border-gray-50 rounded-2xl px-4 py-3 group focus-within:border-[#F4612B] focus-within:bg-white transition-all">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rate (Per KM)</span>
                  <span className="text-sm font-black text-[#F4612B]">₹{maxPrice}</span>
                </div>
                <input 
                  type="range" min="10" max="100" step="5"
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#F4612B]"
                />
              </div>
              
              {(search || type !== "all" || seats !== "all" || maxPrice < 100) && (
                <button 
                  onClick={() => { setSearch(""); setType("all"); setSeats("all"); setMaxPrice(100); }}
                  className="px-4 py-2 text-xs font-black text-orange-600 hover:text-orange-700 bg-orange-50 rounded-xl transition-colors shrink-0"
                >
                  RESET
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
