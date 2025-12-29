import { motion } from "framer-motion";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  FaRegClock,
  FaMapMarkerAlt,
  FaHotel,
  FaUtensils,
  FaBusAlt,
  FaBinoculars,
  FaCalendarAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";



function PrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 shadow-md cursor-pointer rounded-full p-2"
    >
      <IoIosArrowBack className="text-[#F4612B] text-xl" />
    </button>
  );
}

function NextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 shadow-md cursor-pointer rounded-full p-2"
    >
      <IoIosArrowForward className="text-[#F4612B] text-xl" />
    </button>
  );
}


const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  // autoplaySpeed: 3000,
  arrows: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />
};

const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};

const daysNights = (start, end) => {
  const days =
    Math.ceil((new Date(end) - new Date(start)) / 86400000) + 1;
  return `${days} Days / ${days - 1} Nights`;
};

const TourCard = ({ tour,type }) => {
  const navigate = useNavigate();

    

  const handleView = () => {
    navigate(
      type === "group"
        ? `/group-tour/${tour._id}`
        : `/individual-tour/${tour._id}`
    );
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
    w-full
    flex flex-col
    bg-white
    rounded-xl
    border border-gray-200
    shadow-xl
   
  "
    >
    {/* IMAGE SLIDER */}
      <div className="relative w-full h-[260px] sm:h-[260px]">
        {tour.images?.length > 0 && (
          <Slider {...sliderSettings}>
            {tour.images.map((img, i) => (
              <div key={i} className=" h-[240px] sm:h-[240px]">
                <img
                  src={`https://sdt-7.onrender.com${img}`}
                  alt={tour.title}
                  className="rounded-xl w-full h-full object-cover"
                />
              </div>
            ))}
          </Slider>
        )}
      </div>

      {/* DETAILS */}
      <div className="p-3">
        <div className="text-[20px] font-bold text-[#F4612B] text-center">
          {tour.title}
        </div>

        
 <div className="mt-4 px-1">
  <div className="flex justify-between items-center text-sm font-medium text-gray-700">
    {/* Date */}
    <div className="flex items-center gap-2">
      <FaCalendarAlt className="text-[#F4612B]" />
      {formatDate(tour.startDate)} – {formatDate(tour.endDate)}
    </div>

    {/* Location */}
    <div className="flex items-center gap-2">
      <FaMapMarkerAlt className="text-[#F4612B]" />
      {tour.location}
    </div>
  </div>
</div>




        <div className="flex justify-center gap-6 mt-4">
          <Feature icon={<FaHotel />} label="Hotel" />
          <Feature icon={<FaUtensils />} label="Meals" />
          <Feature icon={<FaBusAlt />} label="Transfers" />
          <Feature icon={<FaBinoculars />} label="Sightseeing" />
        </div>

        <div className="mt-4 flex justify-center gap-3 items-center">
          {tour.discount > 0 && (
            // <span className="bg-[#F4612B] text-white text-xs font-semibold px-3 py-1 rounded-full">
            //   {tour.discount}% OFF
            // </span>
            <span className="relative bg-[#F4612B] text-white text-xs font-semibold px-3 py-1 rounded-full overflow-hidden">
              <span
                className="absolute inset-0 w-[160%] h-full
               bg-gradient-to-r from-transparent via-white/70 to-transparent"
                style={{
                  transform: "rotate(20deg)",
                  animation: "shine 1.8s linear infinite"
                }}
              ></span>

              <span className="relative z-10">
                {tour.discount}% OFF
              </span>

              <style>
                {`
      @keyframes shine {
        0% { transform: translateX(-100%) rotate(20deg); }
        100% { transform: translateX(100%) rotate(20deg); }
      }
    `}
              </style>
            </span>

          )}
          <span className="text-gray-500 line-through text-sm">
            INR {tour.oldPrice}
          </span>
        </div>

        <div className="mt-3 text-center text-[15px] font-semibold text-gray-800">
          Starting from{" "}
          <span className="text-[#F4612B] font-bold">
            INR {tour.finalPrice}
          </span>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <button className="w-full sm:w-1/2 py-2 border border-[#F4612B]
                             text-[#F4612B] rounded-full
                             hover:bg-[#F4612B] hover:text-white transition">
            Quick Inquiry
          </button>

               <button
        onClick={handleView}
        className=" sm:w-1/2 w-full py-2 bg-[#F4612B] text-white
                   border border-[#F4612B] rounded-full
                   hover:bg-white hover:text-[#F4612B] transition"
      >
        View Tour
      </button>
        </div>
      </div>
    </motion.div>
  );
};

const Feature = ({ icon, label }) => (
  <div className="flex flex-col items-center p-2 text-[#F4612B]">
    {icon}
    <span className="text-xs mt-1 text-black">{label}</span>
  </div>
);

export default TourCard;
