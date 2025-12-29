import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiClock, FiMapPin } from "react-icons/fi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

export default function ShowGlowExperiance() {
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  /* ================= SHOW & GLOW DATA ================= */
  const shows = [
    {
      name: "Pool Party Experience",
      img: "/Pool.webp",
      bestTime: "Evenings & Weekends",
      shortDesc:
        "High-energy poolside party with DJs, lights, music and luxury vibes.",
      cleanliness: 4.3,
      timings: "7:00 PM – 12:00 AM",
      warning: "Alcohol consumption allowed only for adults.",
      crowd: "High on weekends",
      type: "Party Experience",
      activities: ["DJ Music", "Pool Dance", "Night Party"],
      facilities: ["Changing rooms", "Food & Drinks", "Security"],
      distance: "Major resorts & clubs",
      mapLink: "https://maps.app.goo.gl/73F2xHtSrdj8d7sN6"
    },
    {
  name: "Disco Bar Experience",
  img: "/disco-bar.webp",
  bestTime: "Evening – Late Night",
  shortDesc:
    "A vibrant disco bar experience with energetic music, dazzling lights, and a lively dance floor for nightlife lovers.",
  cleanliness: 4.2,
  timings: "7:00 PM – 1:00 AM",
  warning: "Entry restricted to 18+; valid ID required.",
  crowd: "High on weekends",
  type: "Nightlife",
  activities: ["DJ Music", "Dance Floor", "Live Performances"],
  facilities: ["Bar Counter", "Seating", "Sound & Lighting System"],
  distance: "City nightlife zone",
  mapLink: "https://maps.app.goo.gl/73F2xHtSrdj8d7sN6"
},

    {
      name: "Dhamal Folk Dance Show",
      img: "/Dhamaldance.webp",
      bestTime: "Festival Seasons",
      shortDesc:
        "Traditional Gujarati dhamal dance with drums, colors & cultural energy.",
      cleanliness: 4.5,
      timings: "6:00 PM – 8:00 PM",
      warning: "Loud drum beats — sensitive visitors take care.",
      crowd: "Moderate",
      type: "Cultural Performance",
      activities: ["Live Folk Dance", "Cultural Music"],
      facilities: ["Seating", "Local stalls"],
      distance: "Cultural grounds",
      mapLink: "https://maps.app.goo.gl/73F2xHtSrdj8d7sN6"
    },
    {
      name: "Somnath Temple Light & Sound Show",
      img: "/Somanathtemplelightandsoundshow.webp",
      bestTime: "October – March",
      shortDesc:
        "Mesmerizing light & sound show narrating the rich history of Somnath Temple.",
      cleanliness: 4.6,
      timings: "8:00 PM – 9:00 PM",
      warning: "Arrive early for seating.",
      crowd: "High",
      type: "Heritage Show",
      activities: ["Light Show", "Historical Narration"],
      facilities: ["Seating", "Audio systems"],
      distance: "Somnath Temple complex",
      mapLink: "https://maps.app.goo.gl/TvuAdWxxtvnJVvbs6"
    },
    {
      name: "Statue of Unity Light & Sound Show",
      img: "/statuelightshow.webp",
      bestTime: "October – February",
      shortDesc:
        "World-class laser and sound show depicting the life of Sardar Patel.",
      cleanliness: 4.8,
      timings: "7:30 PM – 8:30 PM",
      warning: "Mobile photography restricted during show.",
      crowd: "Very High",
      type: "Mega Light Show",
      activities: ["Laser Show", "Storytelling"],
      facilities: ["Seating", "Guides", "Parking"],
      distance: "Kevadia",
      mapLink: "https://maps.app.goo.gl/NgdfdhzftYhhr9AZA"
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
          src={shows[0].img}
          className="absolute w-full h-full object-cover"
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 text-white">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#f4612b]">
            Show & Glow Experiences
          </h1>
          <p className="mt-3 max-w-2xl text-white/90 text-sm md:text-base">
            Enjoy nightlife, cultural performances and iconic light & sound shows of Gujarat.
          </p>
        </div>
      </div>

      {/* ================= CARD GRID ================= */}
      <div className="max-w-6xl mx-auto px-4 mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {shows.map((s, i) => {
          const r = s.cleanliness;
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
                onClick={() => setSelectedImage(s.img)}
              >
                <img
                  src={s.img}
                  className="w-full h-full object-cover hover:scale-105 transition duration-700"
                />
                <div className="glass-reflection" />
                <div className="absolute top-3 left-3 bg-white/30 backdrop-blur px-3 py-1 rounded-full text-xs text-white">
                  <FiMapPin className="inline mr-1" />
                  {s.distance}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{s.name}</h3>

                <span className="inline-flex items-center gap-2 mt-2 text-xs px-3 py-1 rounded-full bg-[#FFF4EF] text-[#F4612B]">
                  <FiClock /> {s.bestTime}
                </span>

                <p className="mt-3 text-sm text-gray-600">{s.shortDesc}</p>

                {/* ⭐ RATING IN CARD */}
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
                    onClick={() => setSelectedShow(s)}
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
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              transition={{ duration: 0.35 }}
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
  {selectedShow && (
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
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <button
          onClick={() => setSelectedShow(null)}
          className="absolute top-5 right-5 bg-white p-2 rounded-full shadow"
        >
          <FiX />
        </button>

        <img
          src={selectedShow.img}
          className="rounded-xl h-56 w-full object-cover"
        />

        <h2 className="text-2xl font-bold mt-4">{selectedShow.name}</h2>
        <p className="text-sm text-gray-700 mt-1">
          {selectedShow.shortDesc}
        </p>

        {/* ⭐ RATING IN INFO POPUP */}
        <div className="mt-4 glass-box p-4 rounded-xl">
          <p className="text-xs text-gray-600">⭐ Rating</p>
          <div className="flex items-center mt-1">
            {Array.from({ length: Math.floor(selectedShow.cleanliness) }).map((_, i) => (
              <AiFillStar key={i} className="text-[#F4612B]" />
            ))}
            {selectedShow.cleanliness % 1 >= 0.5 && (
              <BsStarHalf className="text-[#F4612B]" />
            )}
            {Array.from({
              length:
                5 -
                Math.floor(selectedShow.cleanliness) -
                (selectedShow.cleanliness % 1 >= 0.5 ? 1 : 0),
            }).map((_, i) => (
              <AiOutlineStar key={i} className="text-gray-300" />
            ))}
            <span className="ml-2 font-semibold text-[#F4612B]">
              {selectedShow.cleanliness}/5
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="glass-box p-4 rounded-xl">
            <p className="text-xs text-gray-600">🕒 Timings</p>
            <p className="font-semibold">{selectedShow.timings}</p>
          </div>

          <div className="glass-box p-4 rounded-xl">
            <p className="text-xs text-gray-600">⚠️ Warning</p>
            <p className="font-semibold text-red-600">
              {selectedShow.warning}
            </p>
          </div>

          <div className="glass-box p-4 rounded-xl">
            <p className="text-xs text-gray-600">🎯 Activities</p>
            {selectedShow.activities.map((a, i) => (
              <p key={i}>• {a}</p>
            ))}
          </div>

          <div className="glass-box p-4 rounded-xl">
            <p className="text-xs text-gray-600">🛠 Facilities</p>
            {selectedShow.facilities.map((f, i) => (
              <p key={i}>• {f}</p>
            ))}
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <a
            href={selectedShow.mapLink}
            target="_blank"
            className="bg-white px-4 py-2 rounded-full text-[#F4612B] shadow"
          >
            Open Map
          </a>
          <button
            onClick={() => setSelectedShow(null)}
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
