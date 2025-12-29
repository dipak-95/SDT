// WildlifePage.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiClock, FiMapPin } from "react-icons/fi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

export default function WildlifePage() {
  const [selectedSite, setSelectedSite] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  /* ================= WILDLIFE DATA ================= */
  const sites = [
    {
      name: "Gir Forest National Park",
      img: "/Girforestnatinalpark.webp",
      bestTime: "October – June",
      shortDesc:
        "The only natural habitat of Asiatic Lions — India’s most famous wildlife destination.",
      cleanliness: 4.6,
      timings: "6:00 AM – 6:00 PM (Safari timings vary)",
      warning: "Safari booking mandatory; follow forest rules strictly.",
      crowd: "High during peak season",
      type: "National Park",
      activities: ["Jeep Safari", "Bird Watching", "Nature Trails"],
      facilities: ["Safari booking", "Guides", "Forest rest houses"],
      distance: "60 km from Junagadh",
      mapLink: "https://maps.app.goo.gl/PsiNSYp8hoQHRmTU9"
    },
    {
      name: "Porbandar Bird Sanctuary",
      img: "/Porbandar-Bird-Sanctuary.webp",
      bestTime: "November – February",
      shortDesc:
        "Urban bird sanctuary hosting migratory birds like flamingos & pelicans.",
      cleanliness: 4.2,
      timings: "7:00 AM – 6:00 PM",
      warning: "Avoid loud noise; maintain silence.",
      crowd: "Low to Moderate",
      type: "Bird Sanctuary",
      activities: ["Bird Watching", "Photography"],
      facilities: ["Watch towers", "Information boards"],
      distance: "3 km from Porbandar city",
      mapLink: "https://maps.app.goo.gl/sW28PzBhuffeBkTG9?g_st=aw"
    },
    {
      name: "Kutch Great Indian Bustard Sanctuary",
      img: "/Kutchbustardsanctury.webp",
      bestTime: "October – March",
      shortDesc:
        "Protected grassland habitat of the rare Great Indian Bustard bird.",
      cleanliness: 4.0,
      timings: "8:00 AM – 5:00 PM",
      warning: "Restricted zones — entry only with permission.",
      crowd: "Low",
      type: "Grassland Sanctuary",
      activities: ["Bird Watching", "Photography"],
      facilities: ["Guided tours", "Basic amenities"],
      distance: "70 km from Bhuj",
      mapLink: "https://maps.app.goo.gl/JjgBPX3Bq9J7tD57A"
    },
    {
      name: "Narayan Sarovar Wildlife Sanctuary",
      img: "/duck.webp",
      bestTime: "October – February",
      shortDesc:
        "Dry forest sanctuary near sacred Narayan Sarovar — desert wildlife.",
      cleanliness: 4.1,
      timings: "6:00 AM – 6:00 PM",
      warning: "Carry water; limited facilities inside sanctuary.",
      crowd: "Low",
      type: "Dry Forest Sanctuary",
      activities: ["Nature Walks", "Photography"],
      facilities: ["Forest check-posts"],
      distance: "150 km from Bhuj",
      mapLink: "https://maps.app.goo.gl/Q6kjmQFi4knbHhpt7?g_st=aw"
    },
    {
      name: "Kutch Desert Wildlife Sanctuary",
      img: "/Kutchdessertwildlife.webp",
      bestTime: "November – February",
      shortDesc:
        "Largest saline wetland — flamingos, wild asses & desert wildlife.",
      cleanliness: 4.3,
      timings: "Sunrise – Sunset",
      warning: "Extreme heat in summer; winter visits recommended.",
      crowd: "Moderate",
      type: "Desert Wildlife",
      activities: ["Wildlife Safari", "Photography", "Bird Watching"],
      facilities: ["Guided safaris", "Forest camps"],
      distance: "100 km from Bhuj",
      mapLink: "https://maps.app.goo.gl/GZH1ESy8TLDpPZbB9"
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
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
            rgba(255,255,255,0) 100%);
          pointer-events: none;
          opacity: 0;
        }
        .card-image-wrap:hover .glass-reflection {
          animation: sweep 1s ease forwards;
        }
        @keyframes sweep {
          0% { transform: translateX(-30%) rotate(25deg); opacity: 0; }
          30% { opacity: 0.9; }
          100% { transform: translateX(30%) rotate(25deg); opacity: 0; }
        }
      `}</style>

      {/* ================= HERO ================= */}
      <div className="relative h-[260px] md:h-[65vh] overflow-hidden">
        <motion.img
          src={sites[1].img}
          className="absolute w-full h-full object-center"
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/40" />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 text-white"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#f4612b]">
            Wildlife Sanctuaries of Gujarat
          </h1>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-white/90">
            Explore forests, deserts & bird sanctuaries with safety insights.
          </p>
        </motion.div>
      </div>

      {/* ================= CARD GRID ================= */}
      <div className="max-w-6xl mx-auto px-4 mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sites.map((s, i) => {
          const r = s.cleanliness;
          const full = Math.floor(r);
          const half = r % 1 >= 0.5;
          const empty = 5 - full - (half ? 1 : 0);

          return (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 220 }}
              className="rounded-2xl shadow-lg bg-white border border-gray-100 overflow-hidden"
            >
              {/* IMAGE WITH GLASS EFFECT */}
              <div
                className="relative h-52 overflow-hidden cursor-pointer card-image-wrap"
                onClick={() => setSelectedImage(s.img)}
              >
                <img
                  src={s.img}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="glass-reflection" />
                <div className="absolute top-3 left-3 bg-white/30 backdrop-blur px-3 py-1 rounded-full text-xs text-white">
                  <FiMapPin className="inline mr-1" />
                  {s.distance}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{s.name}</h3>

                <div className="mt-2 flex gap-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-[#FFF4EF] text-[#F4612B] flex items-center gap-1">
                    <FiClock /> {s.bestTime}
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-[#FFF4EF] text-[#F4612B]">
                    {s.type}
                  </span>
                </div>

                <p className="mt-3 text-sm text-gray-600">{s.shortDesc}</p>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center">
                    {Array.from({ length: full }).map((_, i) => (
                      <AiFillStar key={i} className="text-[#F4612B]" />
                    ))}
                    {half && <BsStarHalf className="text-[#F4612B]" />}
                    {Array.from({ length: empty }).map((_, i) => (
                      <AiOutlineStar key={i} className="text-gray-300" />
                    ))}
                    <span className="ml-2 text-sm font-semibold text-[#F4612B]">
                      {r}/5
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedSite(s)}
                    className="bg-[#F4612B] text-white px-4 py-2 rounded-full text-sm shadow"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
        {/* ========== FULL IMAGE POPUP ========== */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={selectedImage}
              alt="Full site"
              initial={{ scale: 0.85, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 12 }}
              transition={{ duration: 0.35 }}
              className="max-h-[86vh] max-w-[92vw] rounded-xl shadow-2xl object-cover"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 bg-white/80 backdrop-blur-md p-2 rounded-full shadow"
            >
              <FiX size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= INFO POPUP ================= */}
      <AnimatePresence>
  {selectedSite && (
    <motion.div
      className="fixed inset-0 z-50 bg-black/20 backdrop-blur-xl flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white/30 backdrop-blur-2xl border border-white/40 rounded-2xl p-6 max-w-xl w-full shadow-2xl overflow-y-auto max-h-[90vh] hide-scrollbar"
        initial={{ scale: 0.92, y: 12 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 12 }}
      >
        <button
          onClick={() => setSelectedSite(null)}
          className="absolute top-5 right-5 bg-white p-2 rounded-full shadow"
        >
          <FiX />
        </button>

        <img
          src={selectedSite.img}
          className="w-full h-56 object-cover rounded-xl"
        />

        <h2 className="text-2xl font-bold mt-4">{selectedSite.name}</h2>
        <p className="text-sm text-gray-700 mt-1">
          {selectedSite.shortDesc}
        </p>

        {/* ⭐ RATING (ADDED) */}
        <div className="mt-4 glass-box p-4 rounded-xl">
          <p className="text-xs text-gray-600">⭐ Cleanliness Rating</p>

          <div className="flex items-center mt-1">
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

            <span className="ml-2 font-semibold text-[#F4612B]">
              {selectedSite.cleanliness}/5
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="glass-box p-4 rounded-xl">
            <p className="text-xs text-gray-600">🕒 Timings</p>
            <p className="font-semibold">{selectedSite.timings}</p>
          </div>

          <div className="glass-box p-4 rounded-xl">
            <p className="text-xs text-gray-600">⚠️ Warning</p>
            <p className="font-semibold text-red-600">
              {selectedSite.warning}
            </p>
          </div>

          <div className="glass-box p-4 rounded-xl">
            <p className="text-xs text-gray-600">👥 Crowd Level</p>
            <p className="font-semibold">{selectedSite.crowd}</p>
          </div>

          <div className="glass-box p-4 rounded-xl">
            <p className="text-xs text-gray-600">🎯 Activities</p>
            {selectedSite.activities.map((a, i) => (
              <p key={i}>• {a}</p>
            ))}
          </div>

          <div className="glass-box p-4 rounded-xl">
            <p className="text-xs text-gray-600">🛠 Facilities</p>
            {selectedSite.facilities.map((f, i) => (
              <p key={i}>• {f}</p>
            ))}
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <a
            href={selectedSite.mapLink}
            target="_blank"
            className="bg-white px-4 py-2 rounded-full text-[#F4612B] shadow"
          >
            Open Map
          </a>
          <button
            onClick={() => setSelectedSite(null)}
            className="bg-[#F4612B] text-white px-4 py-2 rounded-full shadow"
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
