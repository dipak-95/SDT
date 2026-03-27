import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Wifi,
  Coffee,
  Car,
  Waves,
  ThermometerSnowflake,
  Tv,
  Utensils,
  Dumbbell,
  Shield,
  Key,
  UserCheck,
  Map,
  Phone,
  Info
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://api.sdtour.online";

/* ================= IMAGE SLIDER ================= */
const ImageSlider = ({ images, name }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (paused || images.length <= 1) return;
    intervalRef.current = setInterval(
      () => setIndex(i => (i === images.length - 1 ? 0 : i + 1)),
      3000
    );
    return () => clearInterval(intervalRef.current);
  }, [paused, index]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative h-52 w-full overflow-hidden rounded-2xl"
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>
    </div>
  );
};

/* ================= HOTEL CARD ================= */
export default function HotelCard({ hotel }) {
  const navigate = useNavigate();

  const images =
    hotel.images?.length > 0
      ? hotel.images.map(img => `${API_BASE}${img}`)
      : ["/no-hotel.jpg"];

  const getIcon = (name) => {
    const lName = name.toLowerCase();
    if (lName.includes("wifi") || lName.includes("internet")) return <Wifi size={22} />;
    if (lName.includes("food") || lName.includes("meal") || lName.includes("coffee") || lName.includes("breakfast") || lName.includes("tea")) return <Coffee size={22} />;
    if (lName.includes("car") || lName.includes("park") || lName.includes("transport") || lName.includes("taxi")) return <Car size={22} />;
    if (lName.includes("pool") || lName.includes("swim")) return <Waves size={22} />;
    if (lName.includes("ac") || lName.includes("air") || lName.includes("cool")) return <ThermometerSnowflake size={22} />;
    if (lName.includes("tv") || lName.includes("television")) return <Tv size={22} />;
    if (lName.includes("rest") || lName.includes("dine") || lName.includes("lunch")) return <Utensils size={22} />;
    if (lName.includes("gym") || lName.includes("fit")) return <Dumbbell size={22} />;
    if (lName.includes("secur") || lName.includes("safe") || lName.includes("cctv")) return <Shield size={22} />;
    if (lName.includes("recep") || lName.includes("key")) return <Key size={22} />;
    if (lName.includes("staff") || lName.includes("serv") || lName.includes("room")) return <UserCheck size={22} />;
    if (lName.includes("area") || lName.includes("map")) return <Map size={22} />;
    if (lName.includes("support") || lName.includes("call") || lName.includes("phone") || lName.includes("help")) return <Phone size={22} />;
    return <Info size={22} />;
  };

  const activeAmenities = Object.entries(hotel.amenities || {})
    .filter(([, v]) => v)
    .map(([k]) => k);


  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-white h-131 rounded-2xl overflow-hidden
                 border border-gray-200 shadow-sm hover:shadow-lg"
    >
      {/* IMAGE */}
      <div className="p-2">
        <ImageSlider images={images} name={hotel.name} />
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-4">
        {/* NAME + LOCATION */}
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            {hotel.name}
          </h3>
          <div className="flex items-center flex-wrap gap-1 text-sm text-gray-500">
            <MapPin size={14} className="text-[#F4612B]" />
            <span>{hotel.location}</span>
            {hotel.mapLink && (
              <a href={hotel.mapLink} target="_blank" rel="noopener noreferrer" className="ml-1 text-[#F4612B] underline text-xs font-semibold hover:text-orange-600">
                (Explore on Map)
              </a>
            )}
          </div>
        </div>

        {/* AMENITIES */}
        <div className="flex justify-around">
          {activeAmenities.slice(0, 4).map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 flex flex-col items-center justify-center
                              rounded-lg bg-orange-50 text-[#F4612B]">
                {getIcon(item)}
                <span className="text-[11px] font-semibold text-gray-600 capitalize">
                  {item}
                </span>
              </div>
            </div>
          ))}
        </div>



        {/* FULL WIDTH CTA */}
        <button
          onClick={() =>
            navigate(`/hotels/${hotel._id}/book`, {
              state: { hotel }
            })
          }
          className="w-full py-3 rounded-lg
                     bg-[#F4612B] text-white text-sm font-semibold
                     hover:bg-[#e85f0f] transition relative bottom-4"
        >
          Enquiry Now
        </button>
      </div>
    </motion.div>
  );
}
