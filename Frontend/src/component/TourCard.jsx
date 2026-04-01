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
import QuickEnquiryModal from "./QuickEnquiryModal";
import { useState } from "react";



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
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1200,
  arrows: false,
  pauseOnHover: false
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
  const diff = Math.abs(new Date(end) - new Date(start));
  const days = Math.ceil(diff / 86400000) + 1;
  return `${days} Days / ${days - 1} Nights`;
};

const TourCard = ({ tour, type }) => {
  const navigate = useNavigate();



  const handleView = () => {
    navigate(
      type === "group"
        ? `/group-tour/${tour._id}`
        : `/individual-tour/${tour._id}`
    );
  };
  const [openEnquiry, setOpenEnquiry] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
   w-full
flex flex-col
bg-white
rounded-2xl
border border-gray-200
shadow-xl
hover:shadow-2xl
transition-shadow
   
  "
    >
      {/* IMAGE SLIDER */}
      <div className="relative w-full h-[260px] sm:h-[260px]">
        {tour.images?.length > 0 && (
          <Slider {...sliderSettings}>
            {tour.images.map((img, i) => (
              <div key={i} className=" h-[240px] sm:h-[240px]">
                <img
                  src={`https://api.sdtour.online${img}`}
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

        {/* 🔥 INCLUDED TICKETS BADGES with better design */}
        {tour.includedTickets?.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {tour.includedTickets.map((ticket, i) => (
              <div key={i} className="flex items-center gap-1 px-2.5 py-1.5 bg-green-50 border border-green-200 rounded-lg shadow-sm">
                <span className="text-sm">🎫</span>
                <span className="text-[10px] font-bold text-green-700 leading-tight uppercase tracking-tight">
                  {ticket}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 text-center">
          <p className="text-sm text-gray-500 font-medium mb-1 uppercase tracking-widest">Starting from</p>
          <div className="text-2xl font-black text-[#F4612B] flex items-center justify-center gap-1">
            <span className="text-lg">INR</span>
            <span>
              {tour.finalPrice || 
                Math.round(
                  Number(tour.oldPrice || 0) - 
                  (Number(tour.oldPrice || 0) * (Number(tour.discount || 0))) / 100
                )
              }
            </span>
          </div>
        </div>

        <div className="mt-5 flex flex-row gap-2">
          <button
            onClick={() => setOpenEnquiry(true)}
            className="flex-1 py-3 text-[11px] font-bold border border-[#F4612B] text-[#F4612B] rounded-full hover:bg-[#F4612B] hover:text-white transition-all shadow-sm active:scale-95"
          >
            Quick Inquiry
          </button>

          <button
            onClick={handleView}
            className="flex-1 py-3 text-[11px] font-bold bg-[#F4612B] text-white border border-[#F4612B] rounded-full hover:bg-white hover:text-[#F4612B] transition-all shadow-sm active:scale-95"
          >
            View Tour
          </button>
        </div>
      </div>
      <QuickEnquiryModal
  open={openEnquiry}
  onClose={() => setOpenEnquiry(false)}
/>

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
