import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiClock, FiMapPin } from "react-icons/fi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

export default function ArtAndCraft() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  /* ================= ART & CRAFT DATA ================= */
  const crafts = [
    {
      name: "Handcrafted Purse",
      img: "/craft1.webp",
      bestTime: "All Year",
      shortDesc:
        "Beautifully handcrafted purses made by local artisans using traditional techniques.",
      cleanliness: 4.5,
      timings: "10:00 AM – 8:00 PM",
      warning: "Handle with care; handmade products are delicate.",
      crowd: "Moderate",
      type: "Handicraft",
      activities: ["Shopping", "Artisan Interaction"],
      facilities: ["Local Shops", "Payment Counter"],
      distance: "Local craft markets",
      mapLink: "https://maps.app.goo.gl/4nUZd86BWVaZ4qvc8"
    },
    {
      name: "Decorative Pottery",
      img: "/craft2.webp",
      bestTime: "All Year",
      shortDesc:
        "Traditional clay pots and decorative pottery reflecting rural Gujarati art.",
      cleanliness: 4.6,
      timings: "9:00 AM – 7:00 PM",
      warning: "Fragile items; packing recommended.",
      crowd: "Moderate",
      type: "Pottery Art",
      activities: ["Pottery Display", "Local Art Shopping"],
      facilities: ["Packaging", "Craft Stalls"],
      distance: "Art villages",
      mapLink: "https://maps.app.goo.gl/4nUZd86BWVaZ4qvc8"
    },
    {
      name: "Traditional Jewelry Craft",
      img: "/Jawellry.webp",
      bestTime: "All Year",
      shortDesc:
        "Authentic handcrafted jewelry showcasing Gujarat’s heritage designs.",
      cleanliness: 4.7,
      timings: "10:00 AM – 9:00 PM",
      warning: "Verify material authenticity before purchase.",
      crowd: "High",
      type: "Jewelry Art",
      activities: ["Jewelry Shopping", "Design Viewing"],
      facilities: ["Showrooms", "Security"],
      distance: "Urban craft markets",
      mapLink: "https://maps.app.goo.gl/4nUZd86BWVaZ4qvc8"
    },
    {
      name: "Patola Silk Weaving",
      img: "/patola.webp",
      bestTime: "All Year",
      shortDesc:
        "World-famous Patola silk weaving art from Gujarat using intricate patterns.",
      cleanliness: 4.9,
      timings: "9:00 AM – 6:00 PM",
      warning: "High-value items; handle responsibly.",
      crowd: "Moderate",
      type: "Textile Art",
      activities: ["Weaving Demo", "Silk Shopping"],
      facilities: ["Guides", "Workshops"],
      distance: "Patan",
      mapLink: "https://maps.app.goo.gl/SG5rZ1nU1RBzjnzZ6"
    },
    {
      name: "Decorative Flower Pots",
      img: "/craft3.webp",
      bestTime: "All Year",
      shortDesc:
        "Colorful decorative flower pots crafted for home and garden decor.",
      cleanliness: 4.4,
      timings: "8:00 AM – 6:00 PM",
      warning: "Outdoor items may fade with weather exposure.",
      crowd: "Low to Moderate",
      type: "Decor Craft",
      activities: ["Garden Decor Shopping", "Craft Display"],
      facilities: ["Open Stalls", "Parking"],
      distance: "Local art markets",
      mapLink: "https://maps.app.goo.gl/4nUZd86BWVaZ4qvc8"
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
          src={crafts[0].img}
          className="absolute w-full h-full object-cover"
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 text-white">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#f4612b]">
            Art & Craft Experiences
          </h1>
          <p className="mt-3 max-w-2xl text-white/90 text-sm md:text-base">
            Discover traditional art and handcrafted masterpieces of Gujarat.
          </p>
        </div>
      </div>

      {/* ================= CARD GRID ================= */}
      <div className="max-w-6xl mx-auto px-4 mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {crafts.map((c, i) => {
          const r = c.cleanliness;
          const full = Math.floor(r);
          const half = r % 1 >= 0.5;
          const empty = 5 - full - (half ? 1 : 0);

          return (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="rounded-2xl shadow-lg bg-white overflow-hidden"
            >
              <div
                className="relative h-52 overflow-hidden cursor-pointer card-image-wrap"
                onClick={() => setSelectedImage(c.img)}
              >
                <img
                  src={c.img}
                  className="w-full h-full object-cover hover:scale-105 transition duration-700"
                />
                <div className="glass-reflection" />
                <div className="absolute top-3 left-3 bg-white/30 backdrop-blur px-3 py-1 rounded-full text-xs text-white">
                  <FiMapPin className="inline mr-1" />
                  {c.distance}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{c.name}</h3>

                <span className="inline-flex items-center gap-2 mt-2 text-xs px-3 py-1 rounded-full bg-[#FFF4EF] text-[#F4612B]">
                  <FiClock /> {c.bestTime}
                </span>

                <p className="mt-3 text-sm text-gray-600">{c.shortDesc}</p>

                <div className="mt-3 flex justify-between items-center">
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
                    onClick={() => setSelectedItem(c)}
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

      {/* ================= IMAGE POPUP ================= */}
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
              className="max-h-[85vh] max-w-[92vw] rounded-xl shadow-2xl object-cover"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 bg-white p-2 rounded-full shadow"
            >
              <FiX />
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
              className="bg-white/30 backdrop-blur-2xl border border-white/40 rounded-2xl p-6 max-w-xl w-full shadow-2xl overflow-y-auto max-h-[90vh] hide-scrollbar"
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

              <h2 className="text-2xl font-bold mt-4">
                {selectedItem.name}
              </h2>

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
