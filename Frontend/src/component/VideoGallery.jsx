import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlay, FiX } from "react-icons/fi";

/* ================= VIDEO DATA ================= */
const videos = [
  {
    id: 1,
    title: "Gir Forest Resort",
    location: "Junagadh gir, Gujarat",
    thumb: "/mem7.webp",
    src: "/videos/video1.mp4"
  },
  {
    id: 2,
    title: "Statue Of Unity",
    location: "Vadodra kevadiya, Gujarat",
    thumb: "/mem8.webp",
    src: "/videos/video2.mp4"
  },
  {
    id: 3,
    title: "Dhamal Dance",
    location: "Git Resort, Gujarat",
    thumb: "/mem4.webp",
    src: "/videos/video3.mp4"
  },

];

export default function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState(null);
  


  return (
    <section className="bg-white py-20">

      {/* ===== Heading ===== */}
      <motion.div
        className="text-center max-w-3xl mx-auto px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#f4612b]">
          Journey Video Gallery
        </h2>
        <p className="mt-3 text-gray-600">
          Experience the emotions, culture and beauty through real journey moments.
        </p>
      </motion.div>

      {/* ===== Video Cards ===== */}
      <div className="max-w-7xl mx-auto px-4 mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <motion.div
            key={video.id}
            className="relative group rounded-2xl overflow-hidden shadow-lg"
            whileHover={{ y: -6 }}
          >
            {/* Thumbnail */}
            <img
              src={video.thumb}
              alt={video.title}
              className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <button
                onClick={() => setActiveVideo(video)}
                className="bg-white/90 p-4 rounded-full shadow hover:scale-110 transition"
              >
                <FiPlay className="text-[#F4612B]" size={26} />
              </button>
            </div>

            {/* Text */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 className="text-white font-semibold">{video.title}</h3>
              <p className="text-white/80 text-xs">{video.location}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ===== VIDEO MODAL ===== */}
      {/* ===== VIDEO MODAL ===== */}
<AnimatePresence>
  {activeVideo && (
    <motion.div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setActiveVideo(null)}
    >
      <motion.div
        className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden"
        initial={{ scale: 0.85, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          onClick={() => setActiveVideo(null)}
          className="absolute top-4 right-4 bg-white p-2 rounded-full z-10"
        >
          ✕
        </button>

        {/* VIDEO ONLY */}
        <video
          src={activeVideo.src}
          controls
          autoPlay
          className="w-full h-[70vh] object-contain bg-black"
        />
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


    </section>
  );
}
