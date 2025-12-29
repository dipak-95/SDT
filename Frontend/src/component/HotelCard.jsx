import { useState } from "react";
import Slider from "react-slick";
import {
  MapPin,
  Wifi,
  Coffee,
  Car,
  Waves,
  ChevronDown,
  ThermometerSnowflake
} from "lucide-react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaN } from "react-icons/fa6";


const API_BASE = "http://127.0.0.1:1005";

/* ===== CUSTOM SLIDER ARROWS ===== */
function PrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 -translate-y-1/2 z-20
                 bg-white/90 shadow-md rounded-full p-2"
    >
      <IoIosArrowBack className="text-[#F4612B] text-xl" />
    </button>
  );
}

function NextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 z-20
                 bg-white/90 shadow-md rounded-full p-2"
    >
      <IoIosArrowForward className="text-[#F4612B] text-xl" />
    </button>
  );
}

export default function HotelCard({ hotel }) {
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();


  /* IMAGES */
  const images =
    hotel.images?.length > 0
      ? hotel.images.map(img => `${API_BASE}${img}`)
      : ["/no-hotel.jpg"];

  /* SLIDER SETTINGS */
  const sliderSettings = {
    dots: false,
    infinite: images.length > 1,
    speed: 600,
    autoplay: false,
    arrows: images.length > 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  /* AMENITY ICONS */
  const icons = {
    wifi: <Wifi size={22} />,
    meal: <Coffee size={22} />,
    parking: <Car size={22} />,
    pool: <Waves size={22} />,
    ac:<ThermometerSnowflake size={22}/>

  };

  const activeAmenities = Object.entries(hotel.amenities || {})
    .filter(([, value]) => value)
    .map(([key]) => key);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl overflow-hidden
                 border border-gray-200 h-122 shadow-sm
                 hover:shadow-xl transition-all duration-300"
    >
      {/* ================= IMAGE SLIDER ================= */}
      <div className="h-50 w-full relative overflow-hidden">
        <Slider {...sliderSettings}>
          {images.map((img, i) => (
            <div key={i}>
              <img
                src={img}
                alt={hotel.name}
                className="w-full h-52 object-cover p-2 rounded-2xl"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-4 space-y-4">

        {/* HOTEL NAME + LOCATION */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
            {hotel.name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin size={15} className="text-[#F4612B]" />
             {hotel.location}
          </div>
        </div>

        {/* ================= AMENITIES ================= */}
        <div className="flex justify-around gap-2">
          {activeAmenities.slice(0, 4).map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-14 h-14 flex flex-col items-center justify-center
                              rounded-lg bg-orange-50 text-[#F4612B] gap-1">
                {icons[item]}
                <span className="text-[11px] font-semibold text-gray-600 capitalize">
                  {item}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ================= ROOM TYPE DROPDOWN ================= */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="w-full  flex items-center justify-between
                       px-4 py-2 rounded-lg border border-orange-200
                       text-sm font-medium text-gray-700
                       hover:border-orange-400 transition"
          >
            {hotel.rooms[selectedRoom].type}
            <ChevronDown
              size={18}
              className={`text-[#F4612B] transition-transform ${open ? "rotate-180" : ""
                }`}
            />
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute z-20 w-full bg-white
                           border border-orange-100 rounded-lg
                           shadow-lg overflow-hidden"
              >
                {hotel.rooms.map((room, index) => (
                  <button
                    key={room.type}
                    onClick={() => {
                      setSelectedRoom(index);
                      setOpen(false);
                    }}
                    className={`w-full flex justify-between px-4 py-1
                                text-sm hover:bg-orange-50
                                ${selectedRoom === index
                        ? "bg-orange-50"
                        : ""
                      }`}
                  >
                    <span>{room.type}</span>
                    <span className="font-semibold text-[#F4612B]">
                      ₹{room.price}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================= PRICE + BOOK ================= */}
        <div className="flex items-center justify-between pt-3">
          <div>
            <p className="text-xs text-gray-500">Price / night</p>
            <p className="text-xl font-bold text-[#F4612B]">
              ₹{hotel.rooms[selectedRoom].price}
            </p>
          </div>

          <button
            onClick={() =>
              navigate(`/hotels/${hotel._id}/book`, {
                state: {
                  hotel,
                  room: hotel.rooms[selectedRoom]
                }
              })  
            }
            className="px-5 py-2.5 rounded-lg
             bg-[#F4612B] text-white text-sm font-semibold
             border border-[#F4612B]
             hover:bg-white hover:text-[#F4612B]
             transition shadow-md"
          >
            Book Now
          </button>

        </div>
      </div>
    </motion.div>
  );
}
