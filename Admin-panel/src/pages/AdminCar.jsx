import { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import AddCarModal from "../components/AddCarModal";
import AdminCarCard from "../components/AdminCarCard";

const BASE_URL = "https://api.sdtour.online";

export default function AdminCar() {
  const [cars, setCars] = useState([]);
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(false);

  const fetchCars = async () => {
    const res = await axios.get(`${BASE_URL}/cars`);
    setCars(res.data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const filteredCars =
    filter === "all" ? cars : cars.filter(c => c.type === filter);

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#F4612B]">Car Rentals</h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-[#F4612B] text-white px-4 py-2 rounded-lg"
        >
          + Add Car
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex gap-3 mb-8">
        {["all", "car", "bus", "tempo"].map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-6 py-2 rounded-lg border
              ${filter === t
                ? "bg-[#F4612B] text-white"
                : "bg-white text-[#F4612B] border-[#F4612B]"
              }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* CAR LIST */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCars.map(car => (
          <AdminCarCard
            key={car._id}
            car={car}
            fetchCars={fetchCars}
          />
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <AddCarModal
            onClose={() => setOpen(false)}
            onAdded={fetchCars}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
