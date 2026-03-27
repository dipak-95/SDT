import { useNavigate } from "react-router-dom";
import ImageSlider from "./ImageSlider";
import {
  Wifi,
  Users,
  IndianRupee,
  Snowflake,
  Bluetooth,
  MapPin,
  Music,
  BatteryCharging,
  Luggage,
  Car,
  Coffee,
  Shield,
  Info
} from "lucide-react";
import { motion } from "framer-motion";

/* ================= FEATURE ICON MAP ================= */
const getCarIcon = (name) => {
  if (!name) return Info;
  const lName = name.toLowerCase();
  if (lName.includes("ac") || lName.includes("air") || lName.includes("cool")) return Snowflake;
  if (lName.includes("gps") || lName.includes("map") || lName.includes("nav")) return MapPin;
  if (lName.includes("blue") || lName.includes("tooth")) return Bluetooth;
  if (lName.includes("music") || lName.includes("song") || lName.includes("audio") || lName.includes("sound")) return Music;
  if (lName.includes("charg") || lName.includes("plug") || lName.includes("usb")) return BatteryCharging;
  if (lName.includes("luggage") || lName.includes("bag") || lName.includes("boot") || lName.includes("space")) return Luggage;
  if (lName.includes("wifi") || lName.includes("internet")) return Wifi;
  if (lName.includes("food") || lName.includes("water") || lName.includes("drink")) return Coffee;
  if (lName.includes("safe") || lName.includes("aid") || lName.includes("kit") || lName.includes("secur")) return Shield;
  return Info;
};

export default function CarCard({ car }) {
  const navigate = useNavigate();

  return (
    <div
      className="
        bg-white rounded-2xl shadow
        hover:shadow-xl transition
        overflow-hidden
        w-[92%] mx-auto
      "
    >
      {/* IMAGE */}
      <div className="relative h-40">
        <ImageSlider images={car.images} />

        <span className="
          absolute top-3 left-3 flex items-center gap-1
          bg-[#F4612B] text-white text-xs px-3 py-1 rounded-full
        ">
          <Car size={14} />
          {car.type?.toUpperCase()}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-base text-gray-800">
          {car.name}
        </h3>

        <div className="flex justify-between text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Users size={14} /> {car.seats} Seats
          </span>

          <span className="flex items-center gap-1 font-semibold text-[#F4612B]">
            <IndianRupee size={14} /> {car.pricePerKm}/KM
          </span>
        </div>

        {/* FEATURES */}
        <div className="flex flex-wrap gap-2">
          {car.features?.map(f => {
            const Icon = getCarIcon(f);

            return (
              <span
                key={f}
                className="
                  flex items-center gap-1 text-xs
                  bg-gray-100 px-2 py-1 rounded-full
                "
              >
                <Icon size={12} />
                {f}
              </span>
            );
          })}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate(`/car-book/${car._id}`)}
          className="
            w-full mt-3 py-2 rounded-xl
            bg-[#F4612B] text-white font-semibold
            hover:bg-[#e65a0f] transition
          "
        >
          Check Enquiry
        </motion.button>
      </div>
    </div>
  );
}
