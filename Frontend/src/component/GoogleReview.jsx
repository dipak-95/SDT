import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";



/* ================= GOOGLE REVIEWS DATA ================= */
const reviews = [
  {
    id: 1,
    name: "Maya pati Ojha",
    location: "Ahmedabad",
    rating: 5,
    image: "/user/user1.webp",
    review:
      "Superb!! Very nicely planned and well executed tour. Very nice hotels and stay. The food served by their staff was very good. Mr Vivek as a tour guide was just excellent. Fully Paisa Vasool tour."
  },
  {
    id: 2,
    name: "Anand Savroop",
    location: "Mumbai",
    rating: 4,
    image: "/user/user2.webp",
    review:
      "We have made a Rajasthan Tour with Saurashta Tour & Travels Co. from 13.09.2025 to 19.09.2025. The said tour was excellent, tour Manager Vivek & Manish gave very good customer service."
  },
  {
    id: 3,
    name: "Ajaya Mishra",
    location: "Rajkot",
    rating: 5,
    image: "/user/user3.webp",
    review:
      "Saurashtra tour operator is very professional and highly efficient. Planning and hotel arrangements were fantastic. Worth accepting."
  },
  {
    id: 4,
    name: "Dr. Achintya Kumar Das",
    location: "Rajkot",
    rating: 5,
    image: "/user/user4.webp",
    review:
      "Excellent tour package fulfilling all commitments including transport, hotels, food and a speciality guide."
  },
  {
    id: 5,
    name: "AKANKSHA DARGAD",
    location: "Rajkot",
    rating: 5,
    image: "/user/user5.webp",
    review:
      "The tour was absolutely superb. Management, food and people were very good. We enjoyed the trip a lot."
  }
];

export default function GoogleReview() {
  const [index, setIndex] = useState(0);

  /* AUTO SLIDER */
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const getReview = (offset) =>
    reviews[(index + offset + reviews.length) % reviews.length];

  return (
    <section className="bg-gradient-to-b from-[#f5f8ff] to-[#eef3ff] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-[26px] md:text-4xl font-bold text-center mb-12 text-[#f4612b]">
          What Our Travellers Say
        </h2>

        <div className="flex justify-center items-center gap-6 overflow-hidden">

          {/* LEFT (DESKTOP ONLY) */}
          <div className="hidden lg:block">
            <ReviewCard review={getReview(-1)} faded />
          </div>

          {/* CENTER (ALWAYS VISIBLE) */}
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <ReviewCard review={getReview(0)} />
          </motion.div>

          {/* RIGHT (TABLET + DESKTOP) */}
          <div className="hidden sm:block">
            <ReviewCard review={getReview(1)} faded />
          </div>

        </div>
      </div>
    </section>
  );
}

/* ================= REVIEW CARD ================= */

function ReviewCard({ review, faded }) {
  return (
    <div
      className={`
        w-[280px] sm:w-[300px] lg:w-[320px]
        rounded-2xl
        transition-all duration-500
        ${faded ? "opacity-60 scale-[0.96]" : "scale-100"}
      `}
    >
      {/* OUTER SOFT LAYER */}
      <div className="rounded-2xl p-[1px] bg-white/60">
        {/* INNER CARD */}
        <div
          className={`
            rounded-2xl bg-white p-6
            border border-gray-200
            ${faded
              ? "shadow-sm"
              : "shadow-[0_12px_30px_rgba(0,0,0,0.12)]"}
          `}
        >
          {/* HEADER */}
          <div className="flex items-center gap-3">
            <img
              src={review.image}
              alt={review.name}
              className="w-10 h-10 rounded-full object-cover border border-gray-200"
            />

            <div>
              <p className="font-semibold text-gray-900">
                {review.name}
              </p>

              <div className="flex gap-1 text-[#F4612B] text-sm">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
            </div>
          </div>

          {/* REVIEW TEXT */}
          <p className="mt-4 text-sm text-gray-700 leading-relaxed line-clamp-4">
            {review.review}
          </p>

          {/* FOOTER */}
          <div className="mt-6 flex justify-between text-xs text-gray-500">
  <span className="flex items-center gap-0 text-[17px] font-medium">
  <span className="text-[#4285F4]">G</span>
  <span className="text-[#EA4335]  sm:inline">o</span>
  <span className="text-[#FBBC05]  sm:inline">o</span>
  <span className="text-[#4285F4]  sm:inline">g</span>
  <span className="text-[#34A853]  sm:inline">l</span>
  <span className="text-[#EA4335]  sm:inline">e</span>
</span>

            <span className="text-[13px] lg:text-[15px]">{review.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
