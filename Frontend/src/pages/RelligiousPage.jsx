
// ReligiousPage.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiClock, FiMapPin, FiCalendar } from "react-icons/fi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

export default function RelligiousPage() {
  const [selectedSite, setSelectedSite] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  /* ================= RELIGIOUS SITES DATA (6 Sites) ================= */
  const sites = [
    {
      name: "Dwarkadhish Temple (Dwarka)",
      img: "/Dwarkamandir.webp",
      bestTime: "October – March",
      shortDesc:
        "Ancient temple dedicated to Lord Krishna — important pilgrimage & evening aarti.",
      cleanliness: 4.4,
      timings: "5:00 AM – 10:00 PM (aarti timings vary)",
      warning: "Peak pilgrimage days get crowded; carry water & follow local guides.",
      crowd: "High during Jan–Feb and major festivals",
      type: "Major Pilgrimage",
      activities: ["Darshan", "Evening Aarti", "Cultural Walks"],
      facilities: ["Prasad counters", "Parking", "Rest areas"],
      distance: "0 km (city center)",
      mapLink: "https://maps.app.goo.gl/wxrpCMhjwx4ywz9J7"
    },
    {
      name: "Somnath Temple (Somnath)",
      img: "/SomanathTemple.webp",
      bestTime: "October – March",
      shortDesc:
        "Coastal Shiva temple — one of the 12 Jyotirlingas with strong heritage & light-show evenings.",
      cleanliness: 4.5,
      timings: "6:00 AM – 9:00 PM",
      warning: "Watch your belongings during crowded aarti timings.",
      crowd: "High during festivals and weekends",
      type: "Heritage & Religious",
      activities: ["Darshan", "Light & Sound Show", "Seafront Walk"],
      facilities: ["Visitor center", "Parking", "Restrooms"],
      distance: "5 km from Somnath bus stand",
      mapLink: "https://maps.app.goo.gl/pC42FvQkM9QGQDza8?g_st=aw"
    },
    {
      name: "Koteshwar Mahadev Temple (Kutch)",
      img: "/Koteshwartemple.webp",
      bestTime: "October – February",
      shortDesc:
        "Cliff-top Shiva shrine overlooking the Arabian Sea — scenic & spiritual experience.",
      cleanliness: 4.1,
      timings: "5:30 AM – 8:30 PM",
      warning: "Coastal winds — mind footwear on the cliff steps.",
      crowd: "Moderate, spikes on Shivratri",
      type: "Seaside Shrine",
      activities: ["Darshan", "Seaside viewing", "Photography"],
      facilities: ["Basic parking", "Local stalls"],
      distance: "60 km from Bhuj",
      mapLink: "https://maps.app.goo.gl/Mht7Mjw3t2yS2aZY7?g_st=aw"
    },
    {
      name: "Akshardham (Gandhinagar)",
      img: "/AkshardhamTemple.webp",
      bestTime: "October – February",
      shortDesc:
        "Modern temple complex with exhibitions, cultural shows and meticulously landscaped gardens.",
      cleanliness: 4.8,
      timings: "9:30 AM – 7:30 PM (closed on some weekdays for maintenance)",
      warning: "No photography inside exhibitions; follow dress code at entry.",
      crowd: "Moderate to High (weekends)",
      type: "Cultural Complex",
      activities: ["Exhibitions", "Water show", "Gardens"],
      facilities: ["Cafeteria", "Large parking", "Wheelchair access"],
      distance: "20 km from Ahmedabad city center",
      mapLink: "https://maps.app.goo.gl/nsG6sY9wSuJsWPit8"
    },
    {
      name: "Ambaji Temple (Ambaji)",
      img: "/ambajimandir.webp",
      bestTime: "November – February",
      shortDesc:
        "Powerful Shakti peeth — attracts devotees from across India, especially during Navratri.",
      cleanliness: 4.3,
      timings: "5:00 AM – 9:30 PM",
      warning: "Large crowds during Navratri; book accommodation early.",
      crowd: "Very High during festivals",
      type: "Shakti Peeth",
      activities: ["Darshan", "Prasad", "Pilgrimage routes"],
      facilities: ["Pilgrim amenities", "Lodging nearby", "Medical aid"],
      distance: "25 km from Palanpur",
      mapLink: "https://maps.app.goo.gl/SdwBBs9SG1LeDP4g6?g_st=aw"
    },
    {
      name: "Adalaj Trimandir (Adalaj)",
      img: "/AdalajTrimandir.webp",
      bestTime: "October – March",
      shortDesc:
        "Peaceful multi-faith temple complex with beautiful carvings and serene atmosphere.",
      cleanliness: 4.6,
      timings: "6:00 AM – 8:00 PM",
      warning: "Keep noise to a minimum; maintain the sanctity of the site.",
      crowd: "Low to Moderate",
      type: "Multi-faith Temple",
      activities: ["Meditation", "Architecture viewing", "Cultural tours"],
      facilities: ["Guided tours", "Parking", "Restrooms"],
      distance: "13 km from Ahmedabad",
      mapLink: "https://maps.app.goo.gl/mUG394YT2hvxXcuP9"
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Inline styles for custom small things (hide scrollbar, reflection) */}
      <style>{`
        /* Hide scrollbar (for modern browsers) */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Glass reflection animation: a soft white gradient sweep */
        .glass-reflection {
          position: absolute;
          top: -50%;
          left: -60%;
          width: 160%;
          height: 200%;
          transform: rotate(25deg);
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.12) 55%, rgba(255,255,255,0) 100%);
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

        /* glass popup style (lighter white glass) */
        .glass-popup {
          background: rgba(255,255,255,0.95); /* mostly white per your request */
          backdrop-filter: blur(14px) saturate(1.05);
          border: 1px solid rgba(0,0,0,0.04);
        }

        /* glass-box small helpers for popup internals */
        .glass-box {
          background: rgba(255,245,239,0.6); /* faint warm tint */
          padding: 12px;
          border-radius: 10px;
        }

        /* buttons */
        .btn-white {
          padding: 10px 16px;
          border-radius: 999px;
          border: 1px solid rgba(0,0,0,0.06);
          color: #F4612B;
          background: white;
        }
        .btn-orange {
          padding: 10px 16px;
          border-radius: 999px;
          background: #F4612B;
          color: white;
        }
      `}</style>

      {/* ========== HERO ========== */}
      <div className="relative h-[260px] md:h-[65vh] overflow-hidden">
        <motion.img
          src={sites[5].img}
          alt="Religious hero"
          className="absolute w-full h-full object-center"
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/28 to-black/38" />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 text-white"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#f4612b]">
            Sacred & Heritage Sites
          </h1>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-white/90">
            Well-researched info for pilgrims & travellers — timings, accessibility, and safety tips.
          </p>
        </motion.div>
      </div>

      {/* ========== CARD GRID ========== */}
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
              {/* Image + glass reflection */}
              <div
                className="relative h-52 w-full overflow-hidden card-image-wrap"
                onClick={() => setSelectedImage(s.img)}
              >
                <img
                  src={s.img}
                  alt={s.name}
                  className="w-full h-full object-cover transform transition-transform duration-700 ease-out hover:scale-105"
                />

                {/* subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent" />

                {/* glass reflection element */}
                <div className="glass-reflection" />

                {/* small badge (distance) */}
                <div className="absolute top-3 left-3 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white">
                  <FiMapPin className="inline-block mr-1 -mt-0.5" />
                  {s.distance}
                </div>
              </div>

              {/* Card body */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{s.name}</h3>

                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-[#FFF4EF] text-[#F4612B] shadow-sm">
                    <FiClock />
                    {s.bestTime}
                  </span>

                  <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-[#FFF4EF] text-[#F4612B] shadow-sm">
                    {s.type}
                  </span>
                </div>

                <p className="mt-3 text-sm text-gray-600">{s.shortDesc}</p>

                {/* Rating row */}
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {Array.from({ length: full }).map((_, idx) => (
                        <AiFillStar key={`full-${idx}`} className="text-[#F4612B] text-base" />
                      ))}
                      {half && <BsStarHalf className="text-[#F4612B] text-base" />}
                      {Array.from({ length: empty }).map((_, idx) => (
                        <AiOutlineStar key={`empty-${idx}`} className="text-gray-300 text-base" />
                      ))}
                    </div>
                    <div className="ml-2 text-sm font-semibold text-[#F4612B]">
                      {r.toFixed(1)} <span className="text-gray-400 text-xs">/5</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => setSelectedSite(s)}
                    className="ml-3 bg-[#F4612B] text-white text-sm px-4 py-2 rounded-full shadow hover:brightness-95 transition"
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

      {/* ========== INFO POPUP (WHITE + ORANGE ACCENT, VERTICAL INFO) ========== */}
{/* ================= LIGHT BLUR GLASS INFO POPUP ================= */}
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
        className="
          w-full max-w-xl rounded-2xl p-6 shadow-2xl relative hide-scrollbar
          bg-white/30 backdrop-blur-2xl border border-white/40
          overflow-y-auto max-h-[90vh]
        "
        initial={{ scale: 0.92, y: 12 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 12 }}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setSelectedSite(null)}
          className="absolute top-5 right-5 bg-white/90 backdrop-blur-md 
                     p-2 rounded-full shadow hover:bg-white transition"
        >
          <FiX size={20} className="text-gray-700" />
        </button>

        {/* IMAGE */}
        <img
          src={selectedSite.img}
          className="w-full h-56 object-cover rounded-xl shadow"
          alt={selectedSite.name}
        />

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-gray-900 mt-4 drop-shadow">
          {selectedSite.name}
        </h2>

        <p className="text-gray-700 text-sm mt-1">
          {selectedSite.shortDesc}
        </p>

        {/* CLEANLINESS RATING */}
        <div className="mt-6 glass-box">
          <p className="font-semibold text-gray-800 flex items-center gap-2">
            🧼 Cleanliness
          </p>

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

        {/* ========== SLIGHT WHITE GLASS BOXES ========== */}
        <div className="mt-6 space-y-4">

          {/* Best Time */}
          <div className="glass-box backdrop-blur-md p-4 rounded-xl border border-white/50">
            <p className="text-xs text-gray-600">🗓️ Timings</p>
            <p className="font-semibold text-gray-900 mt-1">{selectedSite.timings}</p>
          </div>

          {/* Distance */}
          <div className="glass-box backdrop-blur-md p-4 rounded-xl border border-white/50">
            <p className="text-xs text-gray-600">📍 Distance</p>
            <a
              href={selectedSite.mapLink}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[#F4612B] mt-1 inline-block"
            >
              {selectedSite.distance}
            </a>
          </div>

          {/* Temple Type */}
          <div className="glass-box backdrop-blur-md p-4 rounded-xl border border-white/50">
            <p className="text-xs text-gray-600">🏝️ Temple Type</p>
            <p className="font-semibold text-gray-900 mt-1">{selectedSite.type}</p>
          </div>

          {/* Warning */}
          <div className="glass-box backdrop-blur-md p-4 rounded-xl border border-white/50">
            <p className="text-xs text-red-600">⚠️ Warning</p>
            <p className="font-semibold text-red-600 mt-1">{selectedSite.warning}</p>
          </div>

          {/* Crowd */}
          <div className="glass-box backdrop-blur-md p-4 rounded-xl border border-white/50">
            <p className="text-xs text-gray-600">👥 Crowd Level</p>
            <p className="font-semibold text-gray-900 mt-1">{selectedSite.crowd}</p>
          </div>

          {/* Activities */}
          <div className="glass-box backdrop-blur-md p-4 rounded-xl border border-white/50">
            <p className="text-xs text-gray-600">🎯 Activities</p>
            <div className="mt-2 space-y-1 text-sm text-gray-800">
              {selectedSite.activities.map((a, i) => (
                <p key={i}>• {a}</p>
              ))}
            </div>
          </div>

          {/* Facilities */}
          <div className="glass-box backdrop-blur-md p-4 rounded-xl border border-white/50">
            <p className="text-xs text-gray-600">🛠️ Facilities</p>
            <div className="mt-2 space-y-1 text-sm text-gray-800">
              {selectedSite.facilities.map((f, i) => (
                <p key={i}>• {f}</p>
              ))}
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href={selectedSite.mapLink}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-full bg-white text-[#F4612B] 
                       font-semibold shadow text-center"
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
