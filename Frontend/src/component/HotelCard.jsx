import { useState, useEffect, useRef } from "react";
import {
  MapPin, Wifi, Coffee, Car, Waves, ThermometerSnowflake,
  Tv, Utensils, Dumbbell, Shield, Key, UserCheck, Map, Phone,
  Info, ChevronLeft, ChevronRight, ExternalLink, ArrowRight
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://api.sdtour.online";

/* ── ICON HELPER ── */
const getIcon = (name) => {
  const lName = (name || "").toLowerCase();
  if (lName.includes("wifi") || lName.includes("internet")) return Wifi;
  if (lName.includes("food") || lName.includes("meal") || lName.includes("coffee") || lName.includes("breakfast") || lName.includes("tea")) return Coffee;
  if (lName.includes("car") || lName.includes("park") || lName.includes("transport") || lName.includes("taxi")) return Car;
  if (lName.includes("pool") || lName.includes("swim")) return Waves;
  if (lName.includes("ac") || lName.includes("air") || lName.includes("cool")) return ThermometerSnowflake;
  if (lName.includes("tv") || lName.includes("television")) return Tv;
  if (lName.includes("rest") || lName.includes("dine") || lName.includes("lunch")) return Utensils;
  if (lName.includes("gym") || lName.includes("fit")) return Dumbbell;
  if (lName.includes("secur") || lName.includes("safe") || lName.includes("cctv")) return Shield;
  if (lName.includes("recep") || lName.includes("key")) return Key;
  if (lName.includes("staff") || lName.includes("serv")) return UserCheck;
  if (lName.includes("area") || lName.includes("map")) return Map;
  if (lName.includes("support") || lName.includes("call") || lName.includes("phone")) return Phone;
  return Info;
};

/* ── IMAGE SLIDER ── */
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
  }, [paused, index, images.length]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative h-56 w-full overflow-hidden rounded-t-2xl group"
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        />
      </AnimatePresence>

      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={e => { e.stopPropagation(); setIndex(i => i === 0 ? images.length - 1 : i - 1); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition shadow-md hover:text-[#F4612B]"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={e => { e.stopPropagation(); setIndex(i => i === images.length - 1 ? 0 : i + 1); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition shadow-md hover:text-[#F4612B]"
          >
            <ChevronRight size={16} />
          </button>

          {/* dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={e => { e.stopPropagation(); setIndex(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === index ? "bg-white w-4" : "bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

/* ── HOTEL CARD ── */
export default function HotelCard({ hotel }) {
  const navigate = useNavigate();

  const images =
    hotel.images?.length > 0
      ? hotel.images.map(img => `${API_BASE}${img}`)
      : ["/no-hotel.jpg"];

  const activeAmenities = Object.entries(hotel.amenities || {})
    .filter(([, v]) => v)
    .map(([k]) => k);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, boxShadow: "0 24px 48px -12px rgba(244,97,43,0.18)" }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md cursor-pointer group"
      onClick={() => navigate(`/hotels/${hotel._id}/book`, { state: { hotel } })}
    >
      {/* ── IMAGE ── */}
      <div className="relative">
        <ImageSlider images={images} name={hotel.name} />

        {/* city badge */}
        {hotel.city && (
          <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <MapPin size={11} className="text-orange-400" />
            {hotel.city}
          </span>
        )}
      </div>

      {/* ── CONTENT ── */}
      <div className="p-4 space-y-3">
        {/* name + location */}
        <div>
          <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-[#F4612B] transition-colors">
            {hotel.name}
          </h3>
          <div className="flex items-center gap-1 mt-1 flex-wrap">
            <MapPin size={13} className="text-[#F4612B] shrink-0" />
            <span className="text-gray-500 text-sm truncate">{hotel.location}</span>
            {hotel.mapLink && (
              <a
                href={hotel.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="ml-1 flex items-center gap-0.5 text-[#F4612B] text-xs font-semibold hover:underline"
              >
                <ExternalLink size={11} /> Map
              </a>
            )}
          </div>
        </div>

        {/* amenities chips */}
        {activeAmenities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activeAmenities.slice(0, 5).map((item, i) => {
              const Icon = getIcon(item);
              return (
                <span
                  key={i}
                  className="flex items-center gap-1.5 bg-orange-50 text-orange-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-orange-100"
                >
                  <Icon size={12} />
                  <span className="capitalize">{item}</span>
                </span>
              );
            })}
            {activeAmenities.length > 5 && (
              <span className="text-xs text-gray-400 font-medium self-center">
                +{activeAmenities.length - 5} more
              </span>
            )}
          </div>
        )}

        {/* rooms available hint */}
        {hotel.rooms?.length > 0 && (
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
            {hotel.rooms.length} room type{hotel.rooms.length > 1 ? "s" : ""} available
          </p>
        )}

        {/* CTA */}
        <button
          onClick={e => {
            e.stopPropagation();
            navigate(`/hotels/${hotel._id}/book`, { state: { hotel } });
          }}
          className="w-full py-3 flex items-center justify-center gap-2
                     bg-[#F4612B] text-white text-sm font-bold rounded-xl
                     hover:bg-[#e85f0f] active:scale-[0.98] transition-all
                     shadow-sm shadow-orange-200 group-hover:shadow-orange-300"
        >
          Enquiry Now
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
