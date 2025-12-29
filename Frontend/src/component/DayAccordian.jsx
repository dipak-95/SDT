import { useState } from "react";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoIosArrowDown,
  IoIosArrowBack,
  IoIosArrowForward
} from "react-icons/io";

const BASE_URL = "http://localhost:1005";

/* ---------- SLIDER ARROWS ---------- */
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-2 top-1/2 -translate-y-1/2 z-10
               bg-white/90 shadow p-2 rounded-full"
  >
    <IoIosArrowBack className="text-[#F4612B] text-xl" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-2 top-1/2 -translate-y-1/2 z-10
               bg-white/90 shadow p-2 rounded-full"
  >
    <IoIosArrowForward className="text-[#F4612B] text-xl" />
  </button>
);

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />
};

/* ---------- MAIN ACCORDION ---------- */
const DayAccordion = ({ data = [] }) => {
  const [openDay, setOpenDay] = useState(null);

  /* ---------- SAFETY ---------- */
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        <p className="text-lg font-medium">
          Itinerary details will be updated soon.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ---------- HEADING ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Tour Itinerary
        </h2>

        <div className="flex justify-center mt-2">
          <span className="h-1 w-20 bg-[#F4612B] rounded-full"></span>
        </div>

        <p className="mt-3 text-sm md:text-base text-gray-500">
          Explore a thoughtfully planned day-wise journey with sightseeing and stays.
        </p>
      </motion.div>

      {/* ---------- DAYS ---------- */}
      {data.map((day) => (
        <div
          key={day.day}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* ---------- HEADER ---------- */}
          <button
            onClick={() =>
              setOpenDay(openDay === day.day ? null : day.day)
            }
            className="w-full flex justify-between items-center
                       px-5 py-4 text-left"
          >
            <h3 className="font-bold text-base text-gray-800">
              Day {String(day.day).padStart(2, "0")}: {day.title}
            </h3>

            <IoIosArrowDown
              className={`text-[#F4612B] text-xl transition-transform
                ${openDay === day.day ? "rotate-180" : ""}`}
            />
          </button>

          {/* ---------- CONTENT ---------- */}
          <AnimatePresence>
            console.log(
            "day.day:", day.day,
            "typeof:", typeof day.day,
            "points:", day.points
            );

            {openDay === day.day && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-6 space-y-4">

                  {/* ---------- IMAGE SLIDER ---------- */}
                  {Array.isArray(day.images) && day.images.length > 0 && (
                    <div className="relative rounded-xl overflow-hidden">
                      <Slider {...sliderSettings}>
                        {day.images.map((img, i) => (
                          <div key={i} className="h-[220px]">
                            <img
                              src={`${BASE_URL}${img}`}
                              alt={`Day ${day.day}`}
                              className="w-full h-full object-center rounded-xl"
                            />
                          </div>
                        ))}
                      </Slider>
                    </div>
                  )}

                  {/* ---------- POINTS ---------- */}
                  {Array.isArray(day.points) && (
                    <ul className="ml-5 space-y-2 list-disc">
                      {day.points.map((point, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-600"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default DayAccordion;

