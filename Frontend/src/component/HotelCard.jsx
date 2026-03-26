import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Wifi,
  Coffee,
  Car,
  Waves,
  ThermometerSnowflake
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:1005";

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
  const [selectedRoom, setSelectedRoom] = useState(0);
  const navigate = useNavigate();

  const images =
    hotel.images?.length > 0
      ? hotel.images.map(img => `${API_BASE}${img}`)
      : ["/no-hotel.jpg"];

  const icons = {
    wifi: <Wifi size={22} />,
    meal: <Coffee size={22} />,
    parking: <Car size={22} />,
    pool: <Waves size={22} />,
    ac: <ThermometerSnowflake size={22} />
  };

  const activeAmenities = Object.entries(hotel.amenities || {})
    .filter(([, v]) => v)
    .map(([k]) => k);

  const room = hotel.rooms[selectedRoom];

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
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin size={14} className="text-[#F4612B]" />
            {hotel.location}
          </div>
        </div>

        {/* AMENITIES */}
        <div className="flex justify-around">
          {activeAmenities.slice(0, 4).map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 flex flex-col items-center justify-center
                              rounded-lg bg-orange-50 text-[#F4612B]">
                {icons[item]}
                <span className="text-[11px] font-semibold text-gray-600 capitalize">
                  {item}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ROOM SELECT (NATIVE SELECT) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Select Room Type
          </label>

          <select
            value={selectedRoom}
            onChange={e => setSelectedRoom(Number(e.target.value))}
            className="w-full border border-orange-300 rounded-lg
                       px-4 py-2 text-sm bg-orange-50
                       focus:outline-none focus:ring-2
                       focus:ring-[#F4612B]"
          >
            {hotel.rooms.map((r, i) => (
              <option key={i} value={i}>
                {r.type} 
              </option>
            ))}
          </select>
        </div>

        {/* PRICE */}
        <div className="text-center pt-1">
          {/* <p className="text-xs text-gray-500">Price per night</p>
          <p className="text-2xl font-bold text-[#F4612B]">
            ₹{room.price}
          </p>*/}
        </div> 

        {/* FULL WIDTH CTA */}
        <button
          onClick={() =>
            navigate(`/hotels/${hotel._id}/book`, {
              state: { hotel, room }
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
