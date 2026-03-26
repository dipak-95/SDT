import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import CarCard from "../component/CarCard";
import CarCardSkeleton from "../component/CarCardSkeleton";
import {
  Search,
  Car,
  Bus,
  Truck
} from "lucide-react";

const BASE_URL = "https://api.sdtour.online";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");
   const [loading, setLoading] = useState(true);

  /* ================= FETCH CARS ================= */
  useEffect(() => {
  const fetchCars = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/cars`);
      setCars(res.data);
    } catch (error) {
      console.error("Car fetch error:", error);
    } finally {
      setLoading(false); // ✅ VERY IMPORTANT
    }
  };

  fetchCars();
}, []);

  /* ================= FILTER LOGIC ================= */
  const filteredCars = cars.filter(car => {
    const matchesType =
      type === "all" ? true : car.type === type;

    const matchesSearch =
      car.name.toLowerCase().includes(search.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <div className="w-full">

      {/* ================= HERO ================= */}
      <div className="relative h-[65vh] w-full">
        <img
          src="/heroofcar.webp"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Cars"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold">
            Choose Your Perfect Ride
          </h1>
        </div>
      </div>

      {/* ================= SEARCH & CATEGORY ================= */}
      <div className="px-6 py-8">

        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-8">

          {/* SEARCH */}
          <div className="relative w-full lg:w-[480px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search vehicle name or model"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="
                w-full pl-11 pr-4 py-3 rounded-xl
                border border-[#F4612B]
                focus:ring-2 focus:ring-[#F4612B]/30
                focus:outline-none text-sm
              "
            />
          </div>

          {/* CATEGORY TABS */}
          <div className="flex flex-wrap gap-3">
            {[
              { key: "all", label: "All Vehicles", icon: Car },
              { key: "car", label: "Cars", icon: Car },
              { key: "bus", label: "Buses", icon: Bus },
              { key: "tempo traveller", label: "Tempo Traveller", icon: Truck }
            ].map(t => (
              <button
                key={t.key}
                onClick={() => setType(t.key)}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-300
                  ${type === t.key
                    ? "bg-[#F4612B] text-white shadow-md"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-orange-50"
                  }
                `}
              >
                <t.icon size={16} />
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ================= CAR LIST ================= */}
       <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
>
  {/* ================= SKELETON ================= */}
  {loading &&
    Array.from({ length: 6 }).map((_, i) => (
      <CarCardSkeleton key={i} />
    ))}

  {/* ================= DATA ================= */}
  {!loading && filteredCars.length > 0 &&
    filteredCars.map(car => (
      <CarCard key={car._id} car={car} />
    ))}

  {/* ================= EMPTY STATE ================= */}
  {!loading && filteredCars.length === 0 && (
    <div className="col-span-full text-center py-16 text-gray-500">
      No vehicles found
    </div>
  )}
</motion.div>


      </div>
    </div>
  );
}
