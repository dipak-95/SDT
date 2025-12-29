import { AnimatePresence, motion } from "framer-motion";
import VideoGallery from "../component/VideoGallery";
import { useEffect, useState } from "react";
import GoogleReview from "../component/GoogleReview";
import { useNavigate } from "react-router-dom";

/* ================= SAMPLE DATA ================= */
const journeys = [
  {
    id: 1,
    title: "Sunrise Safari in Gir",
    location: "Gir Forest, Gujarat",
    duration: "2 Days",
    emotion: "Adventure",
    images: ["/mem1.webp", "/mem2.webp", "/mem3.webp"],
    points: [
      "Early morning safari through dense Gir forest trails",
      "Witness Asiatic lions in their natural habitat",
      "Guided experience with trained forest professionals",
      "Golden sunrise moments ideal for wildlife photography",
      "Peaceful forest atmosphere with rich biodiversity"
    ]
  },
  {
    id: 2,
    title: "Spiritual Walk in Dwarka",
    location: "Dwarka, Gujarat",
    duration: "1 Day",
    emotion: "Peace",
    images: ["/mem4.webp", "/mem5.webp", "/mem6.webp"],
    points: [
      "Morning darshan at the sacred Dwarkadhish Temple",
      "Walk through ancient lanes filled with devotion",
      "Evening aarti with chants and temple bells",
      "Calming sea breeze along the Dwarka coastline",
      "A soulful experience connecting history and faith"
    ]
  },
  {
    id: 3,
    title: "White Rann Moonlight Night",
    location: "Kutch, Gujarat",
    duration: "3 Days",
    emotion: "Wonder",
    images: ["/mem7.webp", "/mem8.webp", "/mem9.webp"],
    points: [
      "Moonlit walk on the endless white salt desert",
      "Mesmerizing cultural performances under open skies",
      "Traditional Kutchi dinner and folk music night",
      "Sunrise photography over the White Rann",
      "A surreal desert experience unlike anywhere else"
    ]
  }
];

const testimonials = [
  {
    name: "Rahul Patel",
    city: "Ahmedabad",
    role: "Wildlife Enthusiast",
    review:
      "The Gir safari was beyond expectations. Seeing lions in their natural habitat was surreal. The entire journey was well-organized and unforgettable."
  },
  {
    name: "Neha Shah",
    city: "Mumbai",
    role: "Spiritual Traveler",
    review:
      "Walking through Dwarka felt deeply calming. From temple visits to the peaceful sea breeze, every moment was thoughtfully planned."
  },
  {
    name: "Amit Mehta",
    city: "Surat",
    role: "Travel Photographer",
    review:
      "The White Rann experience under the moonlight was magical. Perfect timing, great cultural programs, and stunning photography opportunities."
  },
  {
    name: "Pooja Desai",
    city: "Vadodara",
    role: "Family Traveler",
    review:
      "We traveled with family and everything was seamless. Hotels, transport, and guides were excellent. Highly recommended for stress-free travel."
  }
];

const heroImages = [
  "/SomanathTemple.webp",
  "/Dwarkamandir.webp",
  "/AkshardhamTemple.webp",
  "/Statueofunity.webp",
  "/ran.webp"
];

export default function Memorablejournys() {
  const [activeStory, setActiveStory] = useState(null);
  const [slide, setSlide] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const navigate=useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // 👇 card slider state (per card)
  const [cardSlide, setCardSlide] = useState({});

  /* HERO SLIDER */
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextCardImage = (id, total) => {
    setCardSlide((prev) => ({
      ...prev,
      [id]: ((prev[id] || 0) + 1) % total
    }));
  };

  const prevCardImage = (id, total) => {
    setCardSlide((prev) => ({
      ...prev,
      [id]: (prev[id] - 1 + total) % total
    }));
  };

  return (
    <div className="bg-white">

      {/* ================= HERO ================= */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <AnimatePresence>
          <motion.img
            key={heroIndex}
            src={heroImages[heroIndex]}
            className="absolute inset-0 w-full h-full object-center"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{
              duration: 1.8,
              ease: "easeInOut"
            }}
          />
        </AnimatePresence>

        <motion.div
          className="relative z-10 text-center text-white px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#f4612b]">
            Memorable Journeys
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-white/90">
            Moments that turn trips into lifelong stories
          </p>
        </motion.div>
      </section>

      {/* ================= IMAGE GALLERY ================= */}
      <section className="bg-gray-100 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#f4612b]">
          Journey Gallery
        </h2>

        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {journeys.flatMap(j => j.images).map((img, i) => (
            <motion.img
              key={i}
              src={img}
              className="rounded-xl h-48 w-full object-cover"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            />
          ))}
        </div>
      </section>

      {/* ================= STORY MODAL ================= */}
      <AnimatePresence>
        {activeStory && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveStory(null)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden relative"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveStory(null)}
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow"
              >
                ✕
              </button>

              <div className="relative h-56 overflow-hidden">
                <motion.img
                  src={activeStory.images[slide]}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold">{activeStory.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  {activeStory.points.map((p, i) => (
                    <li key={i}>• {p}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <VideoGallery />

      <GoogleReview />

      {/* Testimonial */}

 <section className="relative py-20 overflow-hidden">

  {/* BACKGROUND IMAGE */}
  

  {/* GRADIENT OVERLAY */}
  <div className="absolute inset-0 bg-[#f67648]" />

  {/* SOFT BLUR ACCENTS */}
  <div className="absolute -top-20 -left-20 w-72 h-72 bg-orange-400/30 rounded-full blur-3xl" />
  <div className="absolute bottom-0 -right-20 w-72 h-72 bg-orange-300/30 rounded-full blur-3xl" />

  {/* CONTENT */}
  <div className="relative z-10">
    <h2 className="text-3xl font-bold text-center mb-12 text-white">
      What Our Travellers Say
    </h2>

    <div className="max-w-3xl mx-auto px-4 relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-center"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.03 }}
        >
          {/* QUOTE */}
          <p className="text-gray-700 italic text-lg leading-relaxed">
            “{testimonials[index].review}”
          </p>

          {/* USER INFO */}
          <div className="mt-6">
            <p className="font-bold text-lg text-gray-900">
              {testimonials[index].name}
            </p>
            <p className="text-sm text-gray-500">
              {testimonials[index].role} • {testimonials[index].city}
            </p>
          </div>

          {/* DOT INDICATOR */}
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <span
                key={i}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  i === index
                    ? "bg-[#F4612B] scale-125"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
</section>

      {/* ================= CTA ================= */}
      <section className="bg-white py-14 sm:py-16 text-center px-4">
        <h2
          className="
      text-2xl sm:text-3xl md:text-4xl
      font-bold
      text-gray-900
    "
        >
          Ready to create your own memorable journey?
        </h2>

        <p
          className="
      mt-3
      text-sm sm:text-base
      text-gray-600
      max-w-xl
      mx-auto
    "
        >
          Let us plan an experience you’ll never forget.
        </p>

        <div
          className="
      mt-6
      flex flex-col sm:flex-row
      justify-center
      gap-3 sm:gap-4
    "
        >
          {/* PRIMARY CTA */}
          <button
          onClick={()=>navigate("/tours/group")}
            className="
        w-full sm:w-auto
        bg-[#F4612B]
        text-white
        px-6 py-3
        rounded-full
        font-semibold
        shadow-md
        hover:bg-[#e45424]
        transition
      "
          >
            Plan My Journey
          </button>

          {/* SECONDARY CTA */}
          <button
          onClick={()=>navigate("/tours/group")}
            className="
        w-full sm:w-auto
        border border-[#F4612B]
        text-[#F4612B]
        px-6 py-3
        rounded-full
        font-semibold
        hover:bg-[#F4612B]
        hover:text-white
        transition
      "
          >
            View Tours
          </button>
        </div>
      </section>



    </div>
  );
}
