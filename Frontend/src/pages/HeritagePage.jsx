// HeritagePage.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiClock, FiMapPin } from "react-icons/fi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

export default function HeritagePage() {
  const [selectedSite, setSelectedSite] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  /* ================= HERITAGE SITES DATA ================= */
  const sites = [
    {
      name: "Statue of Unity (Kevadia)",
      img: "/Statueofunity.webp",
      bestTime: "October – February",
      shortDesc:
        "World’s tallest statue (182m) dedicated to Sardar Patel — with museum, viewing gallery & laser show.",
      cleanliness: 4.7,
      timings: "8:00 AM – 6:00 PM (Laser show after sunset)",
      warning: "Weekends get crowded; book online tickets in advance.",
      crowd: "High during holidays & weekends",
      type: "Modern Monument",
      activities: [
        "Viewing Gallery",
        "Laser Show",
        "Valley of Flowers",
        "Riverfront Activities"
      ],
      facilities: ["EV transport", "Restaurants", "Parking", "Guided Tours"],
      distance: "90 km from Vadodara",
      mapLink: "https://maps.app.goo.gl/NgdfdhzftYhhr9AZA"
    },

    {
      name: "Adalaj Stepwell (Gandhinagar)",
      img: "/AdalajStepwell.webp",
      bestTime: "November – February",
      shortDesc:
        "Historical 5-story stepwell built in 1498 — beautiful carvings & Indo-Islamic architecture.",
      cleanliness: 4.5,
      timings: "6:00 AM – 6:00 PM",
      warning: "Floor is uneven — walk carefully.",
      crowd: "Moderate",
      type: "Ancient Architecture",
      activities: ["Architecture Viewing", "Photography", "Heritage Walk"],
      facilities: ["Parking", "Local guides"],
      distance: "18 km from Ahmedabad",
      mapLink: "https://maps.app.goo.gl/HD4JN8zedtx2CnQS6?g_st=aw"
    },

    {
      name: "Ashoka Rock Edicts (Junagadh)",
      img: "/Ashokalekh.webp",
      bestTime: "November – March",
      shortDesc:
        "2,300-year-old Ashokan inscriptions carved on rock — valuable archaeological & historical site.",
      cleanliness: 4.1,
      timings: "6:00 AM – 7:00 PM",
      warning: "Preserved site — do not touch inscriptions.",
      crowd: "Low to Moderate",
      type: "Archaeological Site",
      activities: ["Historic Viewing", "Guided Tours"],
      facilities: ["Parking", "Information boards"],
      distance: "3 km from Junagadh city",
      mapLink: "https://maps.app.goo.gl/8hfN61s2KfJf9zjg9?g_st=aw"
    },

    {
      name: "Diu Fort (Diu)",
      img: "/DiuFort.webp",
      bestTime: "October – February",
      shortDesc:
        "Portuguese-era fort overlooking the sea — cannons, lighthouse & historic architecture.",
      cleanliness: 4.3,
      timings: "7:00 AM – 6:00 PM",
      warning: "Cliff edges — stay within safe zones.",
      crowd: "Moderate",
      type: "Coastal Fort",
      activities: ["Sea Views", "Photography", "History Walks"],
      facilities: ["Parking", "Food stalls"],
      distance: "2 km from Diu city",
      mapLink: "https://maps.app.goo.gl/cS97Vpd9pns768rRA"
    },

    {
      name: "Uparkot Fort (Junagadh)",
      img: "/Uparkotfort.webp",
      bestTime: "December – March",
      shortDesc:
        "Over 2,300-year-old fort — stepwells, Buddhist caves & panoramic hill views.",
      cleanliness: 4.2,
      timings: "7:00 AM – 6:00 PM",
      warning: "Large area — wear comfortable shoes.",
      crowd: "Moderate",
      type: "Ancient Fort",
      activities: ["Caves", "Stepwell", "Fort Walls", "Cannon points"],
      facilities: ["Parking", "Guides", "Shops"],
      distance: "2 km from Junagadh",
      mapLink: "https://maps.app.goo.gl/JcQmF329uZr9zEaD9?g_st=aw"
    },

    {
      name: "Buddhist Caves (Khambhalida / Junagadh)",
      img: "/Buddhistcave.webp",
      bestTime: "October – February",
      shortDesc:
        "Ancient Buddhist caves carved from limestone — peaceful historic meditation site.",
      cleanliness: 4.0,
      timings: "7:00 AM – 6:00 PM",
      warning: "Rock steps can be slippery during monsoon.",
      crowd: "Low",
      type: "Ancient Carved Caves",
      activities: ["Cave Viewing", "Photography", "Historic Walks"],
      facilities: ["Parking", "Signboards"],
      distance: "12 km from Gondal highway",
      mapLink: "https://maps.app.goo.gl/f5F3SKmj2JhTvoCR8"
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* CSS for Glass effect, scrollbar hide, reflection */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .glass-reflection {
          position: absolute;
          top: -50%;
          left: -60%;
          width: 160%;
          height: 200%;
          transform: rotate(25deg);
          background: linear-gradient(90deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.12) 45%,
            rgba(255,255,255,0.18) 50%,
            rgba(255,255,255,0.12) 55%,
            rgba(255,255,255,0) 100%
          );
          opacity: 0;
        }
        .card-image-wrap:hover .glass-reflection {
          animation: sweep 1s ease forwards;
        }
        @keyframes sweep {
          0% { transform: translateX(-30%) rotate(25deg); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateX(30%) rotate(25deg); opacity: 0; }
        }
      `}</style>

      {/* ================= HERO ================= */}
      <div className="relative h-[260px] md:h-[65vh] overflow-hidden">
        <motion.img
          src="/heroImg.webp"
          alt="Heritage hero"
          className="absolute w-full h-full object-center"
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/40" />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 text-white"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#f4612b]">
            Gujarat Heritage & Monuments
          </h1>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-white/90">
            Explore Gujarat’s most iconic architectural, archaeological & historical wonders.
          </p>
        </motion.div>
      </div>

      {/* ================= CARD GRID ================= */}
      <div className="max-w-6xl mx-auto px-4 mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sites.map((s, i) => {
          const r = parseFloat(s.cleanliness) || 0;
          const full = Math.floor(r);
          const half = r % 1 >= 0.5;
          const empty = 5 - full - (half ? 1 : 0);

          return (
            <motion.div
              key={s.name + i}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="rounded-2xl shadow-lg bg-white border border-gray-100 overflow-hidden"
            >
              {/* Image section */}
              <div
                className="relative h-52 w-full overflow-hidden card-image-wrap"
                onClick={() => setSelectedImage(s.img)}
              >
                <img
                  src={s.img}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Reflection */}
                <div className="glass-reflection" />

                {/* Badge */}
                <div className="absolute top-3 left-3 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white">
                  <FiMapPin className="inline-block mr-1" />
                  {s.distance}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{s.name}</h3>

                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-[#FFF4EF] text-[#F4612B] shadow-sm">
                    <FiClock /> {s.bestTime}
                  </span>
                </div>

                <p className="mt-3 text-sm text-gray-600">{s.shortDesc}</p>

                {/* Rating */}
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: full }).map((_, idx) => (
                        <AiFillStar key={idx} className="text-[#F4612B]" />
                      ))}
                      {half && <BsStarHalf className="text-[#F4612B]" />}
                      {Array.from({ length: empty }).map((_, idx) => (
                        <AiOutlineStar key={idx} className="text-gray-300" />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-[#F4612B]">
                      {r.toFixed(1)}/5
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedSite(s)}
                    className="bg-[#F4612B] text-white text-sm px-4 py-2 rounded-full shadow"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ================= FULL IMAGE POPUP ================= */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={selectedImage}
              className="max-h-[85vh] max-w-[92vw] rounded-xl shadow-2xl object-cover"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 bg-white/80 p-2 rounded-full shadow"
            >
              <FiX size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= INFO POPUP ================= */}
      <AnimatePresence>
        {selectedSite && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center 
                       bg-black/20 backdrop-blur-xl p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-xl bg-white/30 backdrop-blur-2xl border border-white/40 
                         rounded-2xl p-6 shadow-2xl hide-scrollbar overflow-y-auto max-h-[90vh] relative"
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedSite(null)}
                className="absolute top-5 right-5 bg-white p-2 rounded-full shadow"
              >
                <FiX size={20} />
              </button>

              {/* Image */}
              <img
                src={selectedSite.img}
                className="w-full h-56 object-cover rounded-xl shadow"
              />

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 mt-4">
                {selectedSite.name}
              </h2>

              <p className="text-gray-700 text-sm mt-1">
                {selectedSite.shortDesc}
              </p>

              {/* Rating */}
              <div className="mt-6 glass-box">
                <p className="font-semibold text-gray-800">Cleanliness</p>

                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: Math.floor(selectedSite.cleanliness) }).map((_, i) => (
                    <AiFillStar key={i} className="text-[#F4612B]" />
                  ))}
                  {selectedSite.cleanliness % 1 >= 0.5 && (
                    <BsStarHalf className="text-[#F4612B]" />
                  )}
                  {Array.from({
                    length:
                      5 -
                      Math.floor(selectedSite.cleanliness) -
                      (selectedSite.cleanliness % 1 >= 0.5 ? 1 : 0),
                  }).map((_, i) => (
                    <AiOutlineStar key={i} className="text-gray-300" />
                  ))}

                  <span className="ml-2 text-[#F4612B] font-semibold">
                    {selectedSite.cleanliness}/5
                  </span>
                </div>
              </div>

              {/* Info Boxes */}
              <div className="mt-6 space-y-4">

                <div className="glass-box backdrop-blur-md p-4 rounded-xl border border-white/50">
                  <p className="text-xs text-gray-600">🗓️ Timings</p>
                  <p className="font-semibold mt-1">{selectedSite.timings}</p>
                </div>

                <div className="glass-box backdrop-blur-md p-4 rounded-xl border border-white/50">
                  <p className="text-xs text-gray-600">📍 Distance</p>
                  <a
                    href={selectedSite.mapLink}
                    target="_blank"
                    className="font-semibold text-[#F4612B] underline mt-1 inline-block"
                  >
                    {selectedSite.distance}
                  </a>
                </div>

                <div className="glass-box backdrop-blur-md p-4 rounded-xl border border-white/50">
                  <p className="text-xs text-gray-600">🏛️ Heritage Type</p>
                  <p className="font-semibold mt-1">{selectedSite.type}</p>
                </div>

                <div className="glass-box backdrop-blur-md p-4 rounded-xl border border-white/50">
                  <p className="text-xs text-red-600">⚠️ Warning</p>
                  <p className="font-semibold text-red-600 mt-1">{selectedSite.warning}</p>
                </div>

                <div className="glass-box backdrop-blur-md p-4 rounded-xl border border-white/50">
                  <p className="text-xs text-gray-600">👥 Crowd Level</p>
                  <p className="font-semibold mt-1">{selectedSite.crowd}</p>
                </div>

                {/* Activities */}
                <div className="glass-box backdrop-blur-md p-4 rounded-xl border border-white/50">
                  <p className="text-xs text-gray-600">🎯 Activities</p>
                  <div className="mt-2 text-sm space-y-1">
                    {selectedSite.activities.map((a, i) => (
                      <p key={i}>• {a}</p>
                    ))}
                  </div>
                </div>

                {/* Facilities */}
                <div className="glass-box backdrop-blur-md p-4 rounded-xl border border-white/50">
                  <p className="text-xs text-gray-600">🛠️ Facilities</p>
                  <div className="mt-2 text-sm space-y-1">
                    {selectedSite.facilities.map((f, i) => (
                      <p key={i}>• {f}</p>
                    ))}
                  </div>
                </div>

              </div>

              {/* Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={selectedSite.mapLink}
                  target="_blank"
                  className="px-4 py-2 rounded-full bg-white text-[#F4612B] shadow text-center font-semibold"
                >
                  Open Map
                </a>
                <button
                  onClick={() => setSelectedSite(null)}
                  className="px-4 py-2 rounded-full bg-[#F4612B] text-white font-semibold shadow"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
