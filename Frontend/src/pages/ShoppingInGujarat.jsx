import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiClock, FiMapPin } from "react-icons/fi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

export default function ShoppingInGujarat() {
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  /* ================= SHOPPING DATA ================= */
  const markets = [
    {
      name: "Sindhi Market",
      img: "/market1[1].jpg",
      bestTime: "Morning – Evening",
      shortDesc:
        "Famous wholesale market for garments, fabrics and daily shopping in Ahmedabad.",
      cleanliness: 4.3,
      timings: "10:00 AM – 9:00 PM",
      warning: "Crowded during weekends.",
      crowd: "High",
      type: "Wholesale Market",
      activities: ["Clothing Shopping", "Fabric Buying"],
      facilities: ["Parking", "Food Stalls"],
      distance: "Ahmedabad",
      mapLink: "https://maps.app.goo.gl/6v9e1N7UUiRjSY3w8"
    },
    {
      name: "Old Bombay Market",
      img: "/market2[1].jpg",
      bestTime: "Afternoon – Evening",
      shortDesc:
        "Popular for budget clothing, accessories and street shopping.",
      cleanliness: 4.1,
      timings: "11:00 AM – 10:00 PM",
      warning: "Bargaining required.",
      crowd: "Very High",
      type: "Street Market",
      activities: ["Street Shopping", "Accessories"],
      facilities: ["Local Eateries"],
      distance: "Surat",
      mapLink: "https://maps.app.goo.gl/RTAJ2eZNiR8tSwHU8"
    },
    {
      name: "Chandni Bazaar",
      img: "/market3[1].jpg",
      bestTime: "Evening",
      shortDesc:
        "Famous for jewelry, bangles, garments and festive shopping.",
      cleanliness: 4.2,
      timings: "10:00 AM – 9:30 PM",
      warning: "Narrow lanes.",
      crowd: "High",
      type: "Traditional Market",
      activities: ["Jewellery Shopping", "Festive Wear"],
      facilities: ["Restrooms", "Food Stalls"],
      distance: "Vadodara",
      mapLink: "https://maps.app.goo.gl/hufYPrSe4bip1nBx7"
    },
    {
      name: "Shriram Bazaar",
      img: "/market4[1].jpg",
      bestTime: "Morning – Evening",
      shortDesc:
        "Local market known for daily essentials, clothes and traditional items.",
      cleanliness: 4.0,
      timings: "9:00 AM – 8:00 PM",
      warning: "Limited parking space.",
      crowd: "Moderate",
      type: "Local Market",
      activities: ["Local Shopping"],
      facilities: ["Parking"],
      distance: "Jamnagar",
      mapLink: "https://maps.app.goo.gl/8vsLFibNDKMtJe3j8"
    },
    {
      name: "Teen Darwaza Market",
      img: "/market5[1].jpg",
      bestTime: "Evening",
      shortDesc:
        "Historic market famous for clothes, footwear and street food.",
      cleanliness: 4.4,
      timings: "10:00 AM – 11:00 PM",
      warning: "Heavy crowd at night.",
      crowd: "Very High",
      type: "Historic Market",
      activities: ["Clothes Shopping", "Street Food"],
      facilities: ["Food Stalls", "ATM"],
      distance: "Ahmedabad",
      mapLink: "https://maps.app.goo.gl/wnxuW9VcXNaKyN9bA"
    },
    {
      name: "Bhuj Main Market",
      img: "/market6[1].jpg",
      bestTime: "Morning – Evening",
      shortDesc:
        "Best place to buy Kutchi handicrafts, embroidery, pottery and souvenirs.",
      cleanliness: 4.6,
      timings: "9:00 AM – 8:30 PM",
      warning: "Avoid peak afternoon heat.",
      crowd: "Moderate",
      type: "Handicraft Market",
      activities: ["Handicrafts", "Souvenir Shopping"],
      facilities: ["Parking", "Local Shops"],
      distance: "Bhuj, Kutch",
      mapLink: "https://maps.app.goo.gl/T7azfsXyG4miCnht5"
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
          src={markets[4].img}
          className="absolute w-full h-full object-cover"
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 text-white">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#f4612b]">
            Shopping in Gujarat
          </h1>
          <p className="mt-3 max-w-2xl text-white/90">
            Explore famous markets, bazaars and handicraft hubs across Gujarat.
          </p>
        </div>
      </div>

      {/* ================= CARD GRID ================= */}
      <div className="max-w-6xl mx-auto px-4 mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {markets.map((m, i) => {
          const r = m.cleanliness;
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
                onClick={() => setSelectedImage(m.img)}
              >
                <img
                  src={m.img}
                  className="w-full h-full object-cover hover:scale-105 transition duration-700"
                />
                <div className="glass-reflection" />
                <div className="absolute top-3 left-3 bg-white/30 backdrop-blur px-3 py-1 rounded-full text-xs text-white">
                  <FiMapPin className="inline mr-1" />
                  {m.distance}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{m.name}</h3>

                <span className="inline-flex items-center gap-2 mt-2 text-xs px-3 py-1 rounded-full bg-[#FFF4EF] text-[#F4612B]">
                  <FiClock /> {m.bestTime}
                </span>

                <p className="mt-3 text-sm text-gray-600">{m.shortDesc}</p>

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
                    onClick={() => setSelectedMarket(m)}
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
              className="max-h-[85vh] max-w-[92vw] rounded-xl shadow-2xl"
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
  {selectedMarket && (
    <motion.div
      className="fixed inset-0 bg-black/20 backdrop-blur-xl z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="
          relative
          bg-white/30 backdrop-blur-2xl border
          rounded-2xl p-6 max-w-xl w-full
          shadow-2xl overflow-y-auto max-h-[90vh] hide-scrollbar
        "
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* CLOSE */}
        <button
          onClick={() => setSelectedMarket(null)}
          className="absolute top-5 right-5 bg-white p-2 rounded-full shadow"
        >
          <FiX />
        </button>

        {/* IMAGE */}
        <img
          src={selectedMarket.img}
          className="rounded-xl h-56 w-full object-cover"
        />

        {/* TITLE */}
        <h2 className="text-2xl font-bold mt-4">
          {selectedMarket.name}
        </h2>

        <p className="text-sm text-gray-700 mt-1">
          {selectedMarket.shortDesc}
        </p>

        {/* ⭐ RATING */}
        <div className="mt-4 glass-box p-4 rounded-xl">
          <p className="text-xs text-gray-600 mb-1">⭐ Rating</p>
          <div className="flex items-center">
            {Array.from({ length: Math.floor(selectedMarket.cleanliness) }).map(
              (_, i) => (
                <AiFillStar key={i} className="text-[#F4612B]" />
              )
            )}
            {selectedMarket.cleanliness % 1 >= 0.5 && (
              <BsStarHalf className="text-[#F4612B]" />
            )}
            {Array.from({
              length:
                5 -
                Math.floor(selectedMarket.cleanliness) -
                (selectedMarket.cleanliness % 1 >= 0.5 ? 1 : 0),
            }).map((_, i) => (
              <AiOutlineStar key={i} className="text-gray-300" />
            ))}
            <span className="ml-2 font-semibold text-[#F4612B]">
              {selectedMarket.cleanliness}/5
            </span>
          </div>
        </div>

        {/* DETAILS */}
        <div className="mt-6 space-y-4">
          <div className="glass-box">
            <b>🕒 Timings:</b> {selectedMarket.timings}
          </div>

          <div className="text-red-600 glass-box">
            <b>⚠️ Warning:</b> {selectedMarket.warning}
          </div>

          <div className="glass-box">
            <b>🎯 Activities</b>
            {selectedMarket.activities.map((a, i) => (
              <p key={i}>• {a}</p>
            ))}
          </div>

          <div className="glass-box">
            <b>🛠 Facilities</b>
            {selectedMarket.facilities.map((f, i) => (
              <p key={i}>• {f}</p>
            ))}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex gap-3">
          <a
            href={selectedMarket.mapLink}
            target="_blank"
            className="bg-white px-4 py-2 rounded-full text-[#F4612B] shadow"
          >
            Open Map
          </a>

          <button
            onClick={() => setSelectedMarket(null)}
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
