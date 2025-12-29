// BeachesPage.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiClock, FiCalendar, FiMapPin } from "react-icons/fi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

export default function BeachesPage() {
  const [selectedBeach, setSelectedBeach] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  /* ================= BEACH DATA (6 Beaches) ================= */
  const beaches = [
    {
      name: "Mandvi Beach",
      img: "/Mandvibeach.webp",
      bestTime: "November – February",
      shortDesc: "Golden sand beach famous for camel rides & peaceful vibe.",
      cleanliness: 4.2,
      swimming: "Yes",
      warning: "Strong waves in monsoon.",
      crowd: "Low (best on weekdays)",
      type: "Romantic Beach",
      activities: ["Sunset Point", "Camel Ride", "Photography"],
      facilities: ["Parking", "Stalls", "Washrooms"],
      distance: "45 km from city center",
      mapLink: "https://maps.app.goo.gl/kqbjJH5zxEiqyEZB9"
    },
    {
      name: "Shivrajpur Beach",
      img: "/shivrajpurbeach.webp",
      bestTime: "October – March",
      shortDesc: "Blue Flag certified beach with crystal-clear water & natural vibe",
      cleanliness: 4.8,
      swimming: "Yes (Very Safe)",
      warning: "Avoid restricted coral zones.",
      crowd: "Moderate",
      type: "Family Friendly",
      activities: ["Snorkeling", "Boat Ride", "Sunset View"],
      facilities: ["Lifeguards", "Parking", "Cafés"],
      distance: "26 km from city center",
      mapLink: "https://maps.app.goo.gl/ojm5EXYLocsSJGEt5"
    },
    {
      name: "Chorwad Beach",
      img: "/chorvad-beach.webp",
      bestTime: "December – March",
      shortDesc: "Rocky coastline with strong waves — scenic but risky.",
      cleanliness: 3.9,
      swimming: "Not Safe",
      warning: "Deep water & strong tides.",
      crowd: "High (weekends)",
      type: "Adventure Beach",
      activities: ["Cliff Photography", "Sunrise View"],
      facilities: ["Parking", "Refreshments"],
      distance: "70 km from city center",
      mapLink: "https://maps.app.goo.gl/7z6M1PdSosivLHN77"
    },
    {
      name: "Dandi Beach",
      img: "/Dandibeach.webp",
      bestTime: "October – February",
      shortDesc: "Historic beach known for Gandhi’s Dandi March & pround of indian people",
      cleanliness: 4.0,
      swimming: "Yes (cautious)",
      warning: "Mud patches at low tide.",
      crowd: "Moderate",
      type: "Calm Beach",
      activities: ["Historic Spot", "Morning Walk"],
      facilities: ["Parking", "Washrooms"],
      distance: "55 km from city center",
      mapLink: "https://maps.app.goo.gl/83NmHmbe2cmMWvNp9"
    },
    {
      name: "Madhavpur Beach",
      img: "/MadhavpurBeach.webp",
      bestTime: "January – April",
      shortDesc: "Pristine beach with long coastline & turquoise water.",
      cleanliness: 4.6,
      swimming: "Yes",
      warning: "Strong mid-sea currents.",
      crowd: "Low",
      type: "Quiet Beach",
      activities: ["Photography", "Wave Watching"],
      facilities: ["Coconut Water", "Parking"],
      distance: "95 km from city center",
      mapLink: "https://maps.app.goo.gl/aSdgVaTbp3Z25Feg9"
    },
    {
      name: "Dunny Point",
      img: "/DuunyPoint.webp",
      bestTime: "November – March",
      shortDesc: "Eco-tourism spot great for camping & dolphin spotting.",
      cleanliness: 4.7,
      swimming: "Yes (supervised at spots)",
      warning: "Remote — limited facilities.",
      crowd: "Low",
      type: "Adventure Beach",
      activities: ["Dolphin Spotting", "Camping", "Sunset"],
      facilities: ["Camping Zone", "Eco-friendly Area"],
      distance: "120 km from city center",
      mapLink: "https://maps.app.goo.gl/YN2MWBjh95VQ1b1L6"
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

        /* subtle glass card backdrop for info popup */
        .glass-popup {
          background: rgba(255,255,255,0.14);
          backdrop-filter: blur(8px) saturate(1.05);
          border: 1px solid rgba(255,255,255,0.12);
        }
      `}</style>

      {/* ========== HERO ========== */}
      <div className="relative h-[260px] md:h-[65vh] overflow-hidden">
        <motion.img
          src={beaches[1].img}
          alt="Beaches hero"
          className="absolute w-full h-full object-cover"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/40" />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 text-white"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#f4612b]">
            Beautiful Beaches of Gujarat
          </h1>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-white/90">
            Hand-picked beaches with safety info, activities & facilities — designed for confident travel.
          </p>
        </motion.div>
      </div>

      {/* ========== CARD GRID ========== */}
      <div className="max-w-6xl mx-auto px-4 mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {beaches.map((b, i) => {
          const r = parseFloat(b.cleanliness) || 0;
          const full = Math.floor(r);
          const half = r % 1 >= 0.5;
          const empty = 5 - full - (half ? 1 : 0);

          return (
            <motion.div
              key={b.name + i}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="rounded-2xl shadow-lg bg-white border border-gray-100 overflow-hidden"
            >
              {/* Image + glass reflection */}
              <div
                className="relative h-52 w-full overflow-hidden card-image-wrap"
                onClick={() => setSelectedImage(b.img)}
              >
                <img
                  src={b.img}
                  alt={b.name}
                  className="w-full h-full object-cover transform transition-transform duration-700 ease-out hover:scale-105"
                />

                {/* subtle gradient overlay for premium look */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {/* glass reflection element */}
                <div className="glass-reflection" />

                {/* small badge (distance) */}
                <div className="absolute top-3 left-3 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white">
                  <FiMapPin className="inline-block mr-1 -mt-0.5" />
                  {b.distance}
                </div>
              </div>

              {/* Card body */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{b.name}</h3>

                {/* Best Time pill */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-[#FFF4EF] text-[#F4612B] shadow-sm">
                    <FiClock />
                    {b.bestTime}
                  </span>

                  <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-[#FFF4EF] text-[#F4612B] shadow-sm">
                    {b.type}
                  </span>
                </div>

                {/* short desc */}
                <p className="mt-3 text-sm text-gray-600">{b.shortDesc}</p>

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
                    onClick={() => setSelectedBeach(b)}
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
              alt="Full beach"
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

      
        {/* ================= INFO POPUP (SUPER GLASS + ICONS) ================= */}
<AnimatePresence>
  {selectedBeach && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center 
                 bg-black/30 backdrop-blur-xl p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="
          w-full max-w-xl rounded-2xl p-6 shadow-2xl relative hide-scrollbar
          bg-white/50 backdrop-blur-2xl border border-white/40
          overflow-y-auto max-h-[90vh]
        "
        initial={{ scale: 0.9, y: 12 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 12 }}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setSelectedBeach(null)}
          className="absolute top-5 right-5 bg-white/90 backdrop-blur-md 
                     p-2 rounded-full shadow hover:bg-white transition"
        >
          <FiX size={20} className="text-gray-700" />
        </button>

        {/* IMAGE */}
        <img
          src={selectedBeach.img}
          className="w-full h-56 object-cover rounded-xl shadow"
        />

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-gray-900 mt-4">
          {selectedBeach.name}
        </h2>

        <p className="text-gray-700 text-sm mt-1">
          {selectedBeach.shortDesc}
        </p>

        {/* CLEANLINESS */}
        <div className="mt-6 glass-box">
          <p className="font-semibold text-gray-800 flex items-center gap-2">
            🧼 Cleanliness
          </p>

          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: Math.floor(selectedBeach.cleanliness) }).map((_, i) => (
              <AiFillStar key={i} className="text-[#F4612B]" />
            ))}
            {selectedBeach.cleanliness % 1 >= 0.5 && (
              <BsStarHalf className="text-[#F4612B]" />
            )}
            {Array.from({
              length:
                5 -
                Math.floor(selectedBeach.cleanliness) -
                (selectedBeach.cleanliness % 1 >= 0.5 ? 1 : 0),
            }).map((_, i) => (
              <AiOutlineStar key={i} className="text-gray-300" />
            ))}

            <span className="ml-2 text-[#F4612B] font-semibold">
              {selectedBeach.cleanliness}/5
            </span>
          </div>
        </div>

        {/* BASIC INFO - VERTICAL */}
        <div className="mt-6 space-y-4">

          <div className="glass-box">
            <p className="label">🗓️ Best Time</p>
            <p className="value">{selectedBeach.bestTime}</p>
          </div>

          <div className="glass-box">
            <p className="label">📍 Distance</p>
            <a
              href={selectedBeach.mapLink}
              target="_blank"
              className="value text-[#F4612B] underline"
            >
              {selectedBeach.distance}
            </a>
          </div>

          <div className="glass-box">
            <p className="label">🏊 Swimming Safe</p>
            <p className="value">{selectedBeach.swimming}</p>
          </div>

          <div className="glass-box">
            <p className="label">🏝️ Beach Type</p>
            <p className="value">{selectedBeach.type}</p>
          </div>
        </div>

        {/* WARNING */}
        <div className="glass-box mt-5 border-red-300">
          <p className="label text-red-600">⚠️ Warning</p>
          <p className="value text-red-600">{selectedBeach.warning}</p>
        </div>

        {/* CROWD */}
        <div className="glass-box mt-4">
          <p className="label">👥 Crowd Level</p>
          <p className="value">{selectedBeach.crowd}</p>
        </div>

        {/* ACTIVITIES */}
        <div className="glass-box mt-4">
          <p className="label">🎯 Activities</p>
          <div className="mt-2 space-y-1">
            {selectedBeach.activities.map((a, i) => (
              <p key={i} className="value">• {a}</p>
            ))}
          </div>
        </div>

        {/* FACILITIES */}
        <div className="glass-box mt-4">
          <p className="label">🛠️ Facilities</p>
          <div className="mt-2 space-y-1">
            {selectedBeach.facilities.map((f, i) => (
              <p key={i} className="value">• {f}</p>
            ))}
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href={selectedBeach.mapLink}
            target="_blank"
            className="btn-white"
          >
            Open Map
          </a>
          <button
            onClick={() => setSelectedBeach(null)}
            className="btn-orange"
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


