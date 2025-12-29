import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiClock, FiMapPin } from "react-icons/fi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

export default function FairFestival() {
    const [selectedFestival, setSelectedFestival] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    /* ================= FAIR & FESTIVAL DATA ================= */
    const festivals = [
        {
            name: "Diwali Festival",
            img: "/Diwali.webp",
            bestTime: "October – November",
            shortDesc:
                "Festival of lights celebrated with diyas, fireworks, rangoli and family gatherings across Gujarat.",
            cleanliness: 4.7,
            timings: "All Day Celebration",
            warning: "Firecrackers may cause noise and smoke.",
            crowd: "Very High",
            type: "Religious Festival",
            activities: ["Lighting Diyas", "Fireworks", "Lakshmi Puja"],
            facilities: ["Parking", "Local Markets", "Food Stalls"],
            distance: "Across Gujarat",
            mapLink: "https://maps.app.goo.gl/2YP3LckL3DV2zhJ5A"
        },
        {
            name: "Navratri Festival",
            img: "/Navratri.webp",
            bestTime: "September – October",
            shortDesc:
                "Nine nights of vibrant Garba and Dandiya celebrations dedicated to Goddess Durga.",
            cleanliness: 4.8,
            timings: "7:00 PM – 12:00 AM",
            warning: "Heavy crowd during peak Garba nights.",
            crowd: "Very High",
            type: "Cultural Festival",
            activities: ["Garba Dance", "Dandiya Raas", "Live Music"],
            facilities: ["Parking", "Security", "Food Courts"],
            distance: "Major cities & grounds",
            mapLink: "https://maps.app.goo.gl/2YP3LckL3DV2zhJ5A"
        },
        {
            name: "Holi Festival",
            img: "/holi.webp",
            bestTime: "March",
            shortDesc:
                "Festival of colors celebrated with joy, music, dance and traditional sweets.",
            cleanliness: 4.3,
            timings: "Morning – Afternoon",
            warning: "Use herbal colors to avoid skin irritation.",
            crowd: "High",
            type: "Cultural Festival",
            activities: ["Color Play", "Music", "Festive Food"],
            facilities: ["Water Supply", "First Aid", "Food Stalls"],
            distance: "Across Gujarat",
            mapLink: "https://maps.app.goo.gl/2YP3LckL3DV2zhJ5A"
        },
        {
            name: "Janmashtami Celebration",
            img: "/janmastmi.webp",
            bestTime: "August",
            shortDesc:
                "Celebration of Lord Krishna’s birth with prayers, dances and Dahi Handi events.",
            cleanliness: 4.6,
            timings: "Evening – Midnight",
            warning: "Crowd control restrictions near temples.",
            crowd: "High",
            type: "Religious Festival",
            activities: ["Dahi Handi", "Bhajans", "Temple Aarti"],
            facilities: ["Temple Services", "Security", "Drinking Water"],
            distance: "Dwarka & major temples",
            mapLink: "https://maps.app.goo.gl/2YP3LckL3DV2zhJ5A"
        },
        {
            name: "Tarnetar Fair (Melo)",
            img: "/Tarnetar.webp",
            bestTime: "August – September",
            shortDesc:
                "A traditional matchmaking fair featuring folk music, dance and cultural rituals.",
            cleanliness: 4.4,
            timings: "10:00 AM – 8:00 PM",
            warning: "Very crowded during peak days.",
            crowd: "High",
            type: "Traditional Fair",
            activities: ["Folk Dance", "Cultural Events", "Handicrafts"],
            facilities: ["Parking", "Local Shops", "Food Stalls"],
            distance: "Surendranagar District",
            mapLink: "https://maps.app.goo.gl/pS2FDxMiw26Ck96B6"
        },
        {
            name: "Local Village Melo",
            img: "/Mela.webp",
            bestTime: "Winter Season",
            shortDesc:
                "Small local fairs showcasing rural culture, games, food and folk performances.",
            cleanliness: 4.1,
            timings: "Afternoon – Evening",
            warning: "Limited facilities in rural areas.",
            crowd: "Moderate",
            type: "Local Fair",
            activities: ["Local Games", "Folk Music", "Street Food"],
            facilities: ["Temporary Stalls", "Basic Seating"],
            distance: "Villages of Gujarat",
            mapLink: "https://maps.app.goo.gl/2YP3LckL3DV2zhJ5A"
        },
        {
            name: "Rann Utsav",
            img: "/Ranutsav.webp",
            bestTime: "November – February",
            shortDesc:
                "World-famous cultural festival in the White Rann of Kutch featuring art, music and desert experiences.",
            cleanliness: 4.9,
            timings: "All Day Activities",
            warning: "Advance booking required during peak season.",
            crowd: "Very High",
            type: "International Festival",
            activities: ["Cultural Shows", "Desert Safari", "Handicrafts"],
            facilities: ["Tents", "Food Courts", "Guides", "Parking"],
            distance: "Kutch (White Rann)",
            mapLink: "https://maps.app.goo.gl/Sue9QRZHpZU6EGAV8"
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
                    src={festivals[0].img}
                    className="absolute w-full h-full object-cover"
                    initial={{ scale: 1.06, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/40" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 text-white">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-[#f4612b]">
                        Fair & Festival Experiences
                    </h1>
                    <p className="mt-3 max-w-2xl text-white/90 text-sm md:text-base">
                        Explore vibrant fairs and festivals of Gujarat filled with culture, devotion and celebration.
                    </p>
                </div>
            </div>

            {/* ================= CARD GRID ================= */}
            <div className="max-w-6xl mx-auto px-4 mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {festivals.map((f, i) => {
                    const r = f.cleanliness;
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
                                onClick={() => setSelectedImage(f.img)}
                            >
                                <img
                                    src={f.img}
                                    className="w-full h-full object-cover hover:scale-105 transition duration-700"
                                />
                                <div className="glass-reflection" />
                                <div className="absolute top-3 left-3 bg-white/30 backdrop-blur px-3 py-1 rounded-full text-xs text-white">
                                    <FiMapPin className="inline mr-1" />
                                    {f.distance}
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800">{f.name}</h3>

                                <span className="inline-flex items-center gap-2 mt-2 text-xs px-3 py-1 rounded-full bg-[#FFF4EF] text-[#F4612B]">
                                    <FiClock /> {f.bestTime}
                                </span>

                                <p className="mt-3 text-sm text-gray-600">{f.shortDesc}</p>

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
                                        onClick={() => setSelectedFestival(f)}
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
                {selectedFestival && (
                    <motion.div
                        className="fixed inset-0 bg-black/20 backdrop-blur-xl z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="hide-scrollbar bg-white/30 backdrop-blur-2xl border border-white/40 rounded-2xl p-6 max-w-xl w-full shadow-2xl overflow-y-auto max-h-[90vh]"
                            initial={{ scale: 0.92, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.92, y: 20 }}
                        >
                            <button
                                onClick={() => setSelectedFestival(null)}
                                className="absolute top-5 right-5 bg-white p-2 rounded-full shadow"
                            >
                                <FiX />
                            </button>

                            <img
                                src={selectedFestival.img}
                                className="rounded-xl h-56 w-full object-cover"
                            />

                            <h2 className="text-2xl font-bold mt-4">
                                {selectedFestival.name}
                            </h2>

                            <p className="text-sm text-gray-700 mt-1">
                                {selectedFestival.shortDesc}
                            </p>

                            {/* ⭐ RATING */}
                            <div className="mt-4 glass-box p-4 rounded-xl">
                                <p className="text-xs text-gray-600 mb-1">⭐ Rating</p>
                                <div className="flex items-center">
                                    {Array.from({ length: Math.floor(selectedFestival.cleanliness) }).map((_, i) => (
                                        <AiFillStar key={i} className="text-[#F4612B]" />
                                    ))}

                                    {selectedFestival.cleanliness % 1 >= 0.5 && (
                                        <BsStarHalf className="text-[#F4612B]" />
                                    )}

                                    {Array.from({
                                        length:
                                            5 -
                                            Math.floor(selectedFestival.cleanliness) -
                                            (selectedFestival.cleanliness % 1 >= 0.5 ? 1 : 0),
                                    }).map((_, i) => (
                                        <AiOutlineStar key={i} className="text-gray-300" />
                                    ))}

                                    <span className="ml-2 font-semibold text-[#F4612B]">
                                        {selectedFestival.cleanliness}/5
                                    </span>
                                </div>
                            </div>


                            <div className="mt-6 space-y-4">
                                <p className="glass-box"><b>🕒 Timings:</b> {selectedFestival.timings}</p>
                                <p className="text-red-600 glass-box"><b>⚠️ Warning:</b> {selectedFestival.warning}</p>

                                <div className="glass-box">
                                    <p className="font-semibold">🎯 Activities</p>
                                    {selectedFestival.activities.map((a, i) => (
                                        <p key={i}>• {a}</p>
                                    ))}
                                </div>

                                <div className="glass-box">
                                    <p className="font-semibold">🛠 Facilities</p>
                                    {selectedFestival.facilities.map((f, i) => (
                                        <p key={i}>• {f}</p>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <a
                                    href={selectedFestival.mapLink}
                                    target="_blank"
                                    className="bg-white px-4 py-2 rounded-full text-[#F4612B] shadow"
                                >
                                    Open Map
                                </a>
                                <button
                                    onClick={() => setSelectedFestival(null)}
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
