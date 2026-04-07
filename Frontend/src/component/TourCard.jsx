import { motion } from "framer-motion";
import Slider from "react-slick";
import {
  FaMapMarkerAlt,
  FaHotel,
  FaUtensils,
  FaBusAlt,
  FaBinoculars,
  FaCalendarAlt,
  FaTag
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import QuickEnquiryModal from "./QuickEnquiryModal";
import { useState } from "react";

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
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
  return { days, nights: days - 1 };
};

const TourCard = ({ tour, type }) => {
  const navigate = useNavigate();
  const [openEnquiry, setOpenEnquiry] = useState(false);

  const handleView = () => {
    navigate(
      type === "group"
        ? `/group-tour/${tour._id}`
        : `/individual-tour/${tour._id}`
    );
  };

  const finalPrice = tour.finalPrice ||
    Math.round(
      Number(tour.oldPrice || 0) -
      (Number(tour.oldPrice || 0) * Number(tour.discount || 0)) / 100
    );

  const { days, nights } = tour.days && tour.nights
    ? { days: tour.days, nights: tour.nights }
    : tour.startDate && tour.endDate
    ? daysNights(tour.startDate, tour.endDate)
    : { days: 0, nights: 0 };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -5, boxShadow: "0 24px 60px -12px rgba(244,97,43,0.18)" }}
        className="w-full flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 cursor-pointer group"
        onClick={handleView}
      >
        {/* ── IMAGE AREA ── */}
        <div className="relative w-full h-[220px] sm:h-[240px] overflow-hidden">
          {tour.images?.length > 0 ? (
            <Slider {...sliderSettings}>
              {tour.images.map((img, i) => (
                <div key={i} className="h-[220px] sm:h-[240px]">
                  <img
                    src={`https://api.sdtour.online${img}`}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">No Image</div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Days/Nights badge - bottom left */}
          {days > 0 && (
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm text-gray-800 text-[11px] font-black px-3 py-1.5 rounded-full shadow-md">
              {days}D / {nights}N
            </div>
          )}

          {/* Discount badge - top right */}
          {tour.discount > 0 && (
            <div className="absolute top-3 right-3 bg-[#F4612B] text-white text-[11px] font-black px-3 py-1.5 rounded-full shadow-md overflow-hidden">
              <span className="relative z-10">{tour.discount}% OFF</span>
              <span
                className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style={{ animation: "shine 2s linear infinite" }}
              />
            </div>
          )}

          {/* Type badge - top left */}
          <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide capitalize">
            {type === "group" ? "Group Tour" : "Individual"}
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="flex flex-col flex-1 p-4">
          {/* Title */}
          <h3 className="text-base font-black text-gray-900 leading-tight line-clamp-2 group-hover:text-[#F4612B] transition-colors">
            {tour.title}
          </h3>

          {/* Date & Location row */}
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-gray-500 font-semibold">
            <div className="flex items-center gap-1.5">
              <FaCalendarAlt className="text-[#F4612B] shrink-0" />
              {type === "individual" ? (
                <span className="text-orange-600 font-bold uppercase tracking-wider">Flexible Dates</span>
              ) : (
                <>
                  <span>{formatDate(tour.startDate)}</span>
                  {tour.endDate && <><span className="text-gray-300">→</span><span>{formatDate(tour.endDate)}</span></>}
                </>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <FaMapMarkerAlt className="text-[#F4612B] shrink-0" />
              <span className="truncate max-w-[80px]">{tour.location}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="my-3 border-t border-dashed border-gray-100" />

          {/* Inclusions */}
          <div className="grid grid-cols-4 gap-1">
            {[
              { icon: <FaHotel />, label: "Hotel" },
              { icon: <FaUtensils />, label: "Meals" },
              { icon: <FaBusAlt />, label: "Transfer" },
              { icon: <FaBinoculars />, label: "Sightsee" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1 bg-orange-50 rounded-xl py-2 text-[#F4612B]">
                <span className="text-sm">{icon}</span>
                <span className="text-[9px] font-bold text-gray-600 uppercase tracking-tight">{label}</span>
              </div>
            ))}
          </div>

          {/* Tickets */}
          {tour.includedTickets?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {tour.includedTickets.map((ticket, i) => (
                <span key={i} className="flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 text-[9px] font-bold px-2 py-1 rounded-lg uppercase tracking-tight">
                  🎫 {ticket}
                </span>
              ))}
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Price strip */}
          <div className="mt-4 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-2xl px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Starting from</p>
              <div className="flex items-baseline gap-1">
                <span className="text-[11px] font-bold text-gray-500">₹</span>
                <span className="text-2xl font-black text-[#F4612B] leading-none">{Number(finalPrice).toLocaleString("en-IN")}</span>
              </div>
              {tour.oldPrice > finalPrice && (
                <p className="text-[9px] text-gray-400 line-through mt-0.5">₹{Number(tour.oldPrice).toLocaleString("en-IN")}</p>
              )}
            </div>
            <div className="flex items-center gap-1 bg-[#F4612B]/10 text-[#F4612B] text-[10px] font-bold px-2.5 py-1.5 rounded-xl">
              <FaTag size={9} />
              <span>Per Person</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-3 flex gap-2" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setOpenEnquiry(true)}
              className="flex-1 py-2.5 text-[12px] lg:text-[15px] font-black tracking-wide border-2 border-[#F4612B] text-[#F4612B] rounded-xl hover:bg-[#F4612B] hover:text-white transition-all active:scale-95"
            >
              Quick Inquiry
            </button>
            <button
              onClick={handleView}
              className="flex-1 py-2.5 text-[12px] lg:text-[15px] font-black tracking-wide bg-[#F4612B] text-white rounded-xl border-2 border-[#F4612B] hover:bg-white hover:text-[#F4612B] transition-all active:scale-95"
            >
              View Tour →
            </button>
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
      `}</style>

      <QuickEnquiryModal open={openEnquiry} onClose={() => setOpenEnquiry(false)} />
    </>
  );
};

export default TourCard;
