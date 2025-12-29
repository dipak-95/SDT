import Slider from "react-slick";
import { motion } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function PrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-20
                 bg-white/90 rounded-full p-3 shadow"
    >
      <IoIosArrowBack className="text-[#F4612B] text-xl" />
    </button>
  );
}

function NextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-20
                 bg-white/90 rounded-full p-3 shadow"
    >
      <IoIosArrowForward className="text-[#F4612B] text-xl" />
    </button>
  );
}

const settings = {
  dots: false,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
  arrows: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />
};

const TourHeroSlider = ({ images }) => {
  return (
    <div className="relative">
      <Slider {...settings}>
        {images.map((img, i) => (
          <div key={i} className="relative h-[420px]">
            <img
              src={img}
              className="w-full h-full object-center"
              alt="tour"
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/40" />

            {/* TEXT + BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex flex-col
                         justify-center items-center text-center px-4"
            >
              <h1 className="text-white text-3xl md:text-4xl font-bold">
                Saurashtra Darshan Tour
              </h1>

              <p className="text-white/90 mt-2 max-w-xl">
                Explore Dwarka, Somnath, Gir, Diu & more sacred places
              </p>

              {/* CLICKABLE BUTTONS */}
              <div className="flex gap-3 mt-6 flex-wrap justify-center">
                <button
                  onClick={() =>
                    document
                      .getElementById("itinerary")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-6 py-2 bg-white text-[#F4612B]
                             rounded-full font-semibold"
                >
                  View Itinerary
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("book-tour")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-6 py-2 bg-[#F4612B] text-white
                             rounded-full font-semibold"
                >
                  Book Tour
                </button>
              </div>
            </motion.div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TourHeroSlider;
