import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import EditCarModal from "./EditCarModal";
import {
  Pencil,
  Trash2,
  Users,
  IndianRupee,
  Car,
  ChevronLeft,
  ChevronRight,
  Snowflake,
  MapPin,
  Bluetooth,
  Music,
  BatteryCharging,
  Luggage,
  Fuel,
  Zap
} from "lucide-react";

const BASE_URL = "http://72.62.195.222:7345";

/* FEATURE ICON MAP */
const featureIconMap = {
  ac: { icon: Snowflake, label: "AC" },
  gps: { icon: MapPin, label: "GPS" },
  bluetooth: { icon: Bluetooth, label: "Bluetooth" },
  music: { icon: Music, label: "Music" },
  charging: { icon: BatteryCharging, label: "Charging" },
  luggage: { icon: Luggage, label: "Luggage" }
};

const fuelIconMap = {
  petrol: { icon: Fuel, label: "Petrol" },
  diesel: { icon: Fuel, label: "Diesel" },
  cng: { icon: Zap, label: "CNG" },
  electric: { icon: Zap, label: "Electric" }
};

export default function AdminCarCard({ car, fetchCars }) {
  const [index, setIndex] = useState(0);
  const [editOpen, setEditOpen] = useState(false);

  const prev = () =>
    setIndex(i => (i === 0 ? car.images.length - 1 : i - 1));

  const next = () =>
    setIndex(i => (i === car.images.length - 1 ? 0 : i + 1));

  const handleDelete = async () => {
  if (!window.confirm("Are you sure you want to delete this car?")) return;

  try {
    await axios.delete(`${BASE_URL}/cars/${car._id}`);
    toast.success("Car deleted successfully 🚗");
    fetchCars();
  } catch (error) {
    toast.error("Failed to delete car");
  }
};

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden border border-gray-100"
      >
        {/* IMAGE SLIDER */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={`${BASE_URL}${car.images[index]}`}
            alt={car.name}
            className="w-full h-full object-cover"
          />

          {car.images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2
                bg-white/80 p-1.5 rounded-full shadow"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2
                bg-white/80 p-1.5 rounded-full shadow"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* TYPE BADGE */}
          <span className="absolute top-3 left-3 flex items-center gap-1
            bg-[#F4612B] text-white text-xs px-3 py-1 rounded-full uppercase">
            <Car size={14} />
            {car.type}
          </span>
        </div>

        {/* CONTENT */}
        <div className="p-5 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {car.name}
          </h3>

          {/* BASIC INFO */}
          <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Users size={15} /> Seats
            </div>
            <span className="font-medium text-right">{car.seats}</span>

            <div className="flex items-center gap-2">
              <IndianRupee size={15} /> Price / KM
            </div>
            <span className="font-semibold text-right text-[#F4612B]">
              ₹{car.pricePerKm}
            </span>
          </div>

          {/* FUEL TYPE */}
          {car.fuelType && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              {(() => {
                const FuelIcon = fuelIconMap[car.fuelType]?.icon;
                return FuelIcon ? <FuelIcon size={16} /> : null;
              })()}
              <span className="font-medium">
                {fuelIconMap[car.fuelType]?.label}
              </span>
            </div>
          )}

          {/* FEATURES */}
          {car.features?.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {car.features.map(f => {
                const Feature = featureIconMap[f];
                if (!Feature) return null;
                const Icon = Feature.icon;

                return (
                  <span
                    key={f}
                    className="flex items-center gap-1 text-xs
                    bg-gray-100 px-2 py-1 rounded-full text-gray-700"
                  >
                    <Icon size={14} />
                    {Feature.label}
                  </span>
                );
              })}
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex justify-between items-center pt-3 border-t">
            <button
              onClick={() => setEditOpen(true)}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              <Pencil size={16} />
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 font-medium"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      </motion.div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editOpen && (
          <EditCarModal
            car={car}
            onClose={() => setEditOpen(false)}
            onUpdated={fetchCars}
          />
        )}
      </AnimatePresence>
    </>
  );
}
