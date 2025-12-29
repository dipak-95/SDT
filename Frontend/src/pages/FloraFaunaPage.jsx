import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiClock, FiMapPin } from "react-icons/fi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

export default function FloraFaunaPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  /* ================= FLORA & FAUNA DATA ================= */
  const items = [
    {
      name: "Asiatic Lion",
      img: "/lion.webp",
      bestTime: "October – June",
      shortDesc:
        "The Asiatic Lion is found only in Gir Forest, Gujarat. A powerful symbol of conservation success in India.",
      cleanliness: 4.6,
      timings: "Safari hours (morning & evening)",
      warning: "Safari entry allowed only with official permit.",
      crowd: "High during peak season",
      type: "Animal (Fauna)",
      activities: ["Jeep Safari", "Wildlife Photography"],
      facilities: ["Forest guides", "Safari vehicles", "Rest houses"],
      distance: "Gir Forest, Junagadh",
      mapLink: "https://maps.app.goo.gl/bJToMTP2GTVCED7G7"
    },
    {
      name: "Indian Leopard",
      img: "/lepord.webp",
      bestTime: "October – March",
      shortDesc:
        "The Indian Leopard is a stealthy big cat found in Gir and surrounding forest regions of Gujarat.",
      cleanliness: 4.4,
      timings: "Early morning & late evening",
      warning: "Sightings are rare; maintain silence during safari.",
      crowd: "Moderate",
      type: "Animal (Fauna)",
      activities: ["Safari", "Nature Observation"],
      facilities: ["Forest guides", "Watch towers"],
      distance: "Gir & nearby forest zones",
      mapLink: "https://maps.app.goo.gl/bJToMTP2GTVCED7G7"
    },
    {
      name: "Spotted Deer (Chital)",
      img: "/Deer.webp",
      bestTime: "October – March",
      shortDesc:
        "Graceful spotted deer commonly seen grazing in Gir forests and wildlife sanctuaries.",
      cleanliness: 4.5,
      timings: "Morning & evening",
      warning: "Do not feed animals.",
      crowd: "Low",
      type: "Animal (Fauna)",
      activities: ["Wildlife Viewing", "Photography"],
      facilities: ["Safari routes", "Guides"],
      distance: "Gir Forest region",
      mapLink: "https://maps.app.goo.gl/bJToMTP2GTVCED7G7"
    },
    {
      name: "Laggar Falcon",
      img: "/Laggarfalcon.webp",
      bestTime: "October – February",
      shortDesc:
        "A powerful bird of prey found in open grasslands and semi-desert regions of Gujarat.",
      cleanliness: 4.3,
      timings: "Daytime",
      warning: "Avoid disturbing nesting sites.",
      crowd: "Low",
      type: "Bird (Fauna)",
      activities: ["Bird Watching", "Photography"],
      facilities: ["Viewing points"],
      distance: "Kutch & Saurashtra region",
      mapLink: "https://maps.app.goo.gl/bJToMTP2GTVCED7G7"
    },
    {
      name: "Asian Green Bee-eater",
      img: "/Asiangreenbee-eater.webp",
      bestTime: "October – March",
      shortDesc:
        "Small colorful bird known for catching insects mid-air, commonly seen near farmlands.",
      cleanliness: 4.6,
      timings: "Morning",
      warning: "Maintain distance while photographing.",
      crowd: "Low",
      type: "Bird (Fauna)",
      activities: ["Bird Watching", "Nature Photography"],
      facilities: ["Open viewing areas"],
      distance: "Across Gujarat plains",
      mapLink: "https://maps.app.goo.gl/bJToMTP2GTVCED7G7"
    },
    {
      name: "Woolly-necked Stork",
      img: "/Willyneckedstork.webp",
      bestTime: "November – February",
      shortDesc:
        "Large wetland bird with distinctive white neck, found near lakes and marshes.",
      cleanliness: 4.4,
      timings: "Early morning",
      warning: "Wetland areas can be slippery.",
      crowd: "Low",
      type: "Bird (Fauna)",
      activities: ["Bird Watching", "Wetland Photography"],
      facilities: ["Lake-side paths"],
      distance: "Wetlands of Gujarat",
      mapLink: "https://maps.app.goo.gl/bJToMTP2GTVCED7G7"
    },
    {
      name: "Lotus (Kamal)",
      img: "/Lotus.webp",
      bestTime: "July – October",
      shortDesc:
        "Sacred aquatic flower symbolizing purity and peace, commonly seen in ponds and lakes.",
      cleanliness: 4.5,
      timings: "Daytime",
      warning: "Do not pluck flowers.",
      crowd: "Low",
      type: "Flower (Flora)",
      activities: ["Photography", "Nature Walks"],
      facilities: ["Lake pathways"],
      distance: "Lakes across Gujarat",
      mapLink: "https://maps.app.goo.gl/bJToMTP2GTVCED7G7"
    },
    {
      name: "Parijat (Night-flowering Jasmine)",
      img: "/Parijatflower.webp",
      bestTime: "August – October",
      shortDesc:
        "Fragrant night-blooming flower with mythological significance in Indian culture.",
      cleanliness: 4.3,
      timings: "Evening & early morning",
      warning: "Seasonal flowering only.",
      crowd: "Low",
      type: "Flower (Flora)",
      activities: ["Garden Visit", "Photography"],
      facilities: ["Garden walkways"],
      distance: "Temple gardens & villages",
      mapLink: "https://maps.app.goo.gl/bJToMTP2GTVCED7G7"
    },
    {
      name: "Star Jasmine",
      img: "/Starjasmin.webp",
      bestTime: "March – June",
      shortDesc:
        "Highly fragrant white flower often used in garlands and decorative gardens.",
      cleanliness: 4.2,
      timings: "Morning",
      warning: "Avoid damaging plants.",
      crowd: "Low",
      type: "Flower (Flora)",
      activities: ["Garden Walks", "Photography"],
      facilities: ["Public gardens"],
      distance: "Urban & rural gardens",
      mapLink: "https://maps.app.goo.gl/bJToMTP2GTVCED7G7"
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
          src={items[2].img}
          className="absolute w-full h-full object-center"
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/40" />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 text-white"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#f4612b]">
            Flora & Fauna of Gujarat
          </h1>
          <p className="mt-3 max-w-2xl text-white/90 text-sm md:text-base">
            Discover Gujarat’s unique wildlife and native plant species.
          </p>
        </motion.div>
      </div>

      {/* ================= CARD GRID ================= */}
      <div className="max-w-6xl mx-auto px-4 mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, i) => {
          const full = Math.floor(item.cleanliness);
          const half = item.cleanliness % 1 >= 0.5;
          const empty = 5 - full - (half ? 1 : 0);

          return (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 220 }}
              className="rounded-2xl shadow-lg bg-white overflow-hidden"
            >
              <div
                className="relative h-52 overflow-hidden cursor-pointer card-image-wrap"
                onClick={() => setSelectedImage(item.img)}
              >
                <img
                  src={item.img}
                  className="w-full h-full object-cover hover:scale-105 transition duration-700"
                />
                 <div className="glass-reflection" />
                <div className="absolute top-3 left-3 bg-white/30 backdrop-blur px-3 py-1 rounded-full text-xs text-white">
                  <FiMapPin className="inline mr-1" />
                  {item.type}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>

                <span className="inline-flex items-center gap-2 mt-2 text-xs px-3 py-1 rounded-full bg-[#FFF4EF] text-[#F4612B]">
                  <FiClock /> {item.bestTime}
                </span>

                <p className="mt-3 text-sm text-gray-600">{item.shortDesc}</p>

                {/* ⭐ RATING (CARD) */}
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
                      {item.cleanliness}/5
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedItem(item)}
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
  {selectedItem && (
    <motion.div
      className="fixed inset-0 bg-black/20 backdrop-blur-xl z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white/30 backdrop-blur-2xl border border-white/40 
                   rounded-2xl p-6 max-w-xl w-full shadow-2xl 
                   overflow-y-auto max-h-[90vh] hide-scrollbar"
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
      >
        <button
          onClick={() => setSelectedItem(null)}
          className="absolute top-5 right-5 bg-white p-2 rounded-full shadow"
        >
          <FiX />
        </button>

        <img
          src={selectedItem.img}
          className="rounded-xl h-56 w-full object-cover"
        />

        <h2 className="text-2xl font-bold mt-4">{selectedItem.name}</h2>
        <p className="text-sm text-gray-700 mt-1">
          {selectedItem.shortDesc}
        </p>

        {/* ⭐ RATING */}
        <div className="mt-4 glass-box p-4 rounded-xl">
          <p className="text-xs text-gray-600">⭐ Rating</p>
          <div className="flex items-center mt-1">
            {Array.from({ length: Math.floor(selectedItem.cleanliness) }).map((_, i) => (
              <AiFillStar key={i} className="text-[#F4612B]" />
            ))}
            {selectedItem.cleanliness % 1 >= 0.5 && (
              <BsStarHalf className="text-[#F4612B]" />
            )}
            {Array.from({
              length:
                5 -
                Math.floor(selectedItem.cleanliness) -
                (selectedItem.cleanliness % 1 >= 0.5 ? 1 : 0),
            }).map((_, i) => (
              <AiOutlineStar key={i} className="text-gray-300" />
            ))}
            <span className="ml-2 font-semibold text-[#F4612B]">
              {selectedItem.cleanliness}/5
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="glass-box p-4 rounded-xl">
            <p className="text-xs text-gray-600">🕒 Timings</p>
            <p className="font-semibold">{selectedItem.timings}</p>
          </div>

          <div className="glass-box p-4 rounded-xl">
            <p className="text-xs text-gray-600">⚠️ Warning</p>
            <p className="font-semibold text-red-600">
              {selectedItem.warning}
            </p>
          </div>

          <div className="glass-box p-4 rounded-xl">
            <p className="text-xs text-gray-600">🎯 Activities</p>
            {selectedItem.activities.map((a, i) => (
              <p key={i}>• {a}</p>
            ))}
          </div>

          <div className="glass-box p-4 rounded-xl">
            <p className="text-xs text-gray-600">🛠 Facilities</p>
            {selectedItem.facilities.map((f, i) => (
              <p key={i}>• {f}</p>
            ))}
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <a
            href={selectedItem.mapLink}
            target="_blank"
            className="bg-white px-4 py-2 rounded-full text-[#F4612B] shadow"
          >
            Open Map
          </a>
          <button
            onClick={() => setSelectedItem(null)}
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
       