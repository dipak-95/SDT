import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DayAccordion from "../component/DayAccordian";
import WhyChooseUs from "../component/WhyChooseUs";
import { motion } from "framer-motion";

const BASE_URL = "https://api.sdtour.online";

const IndividualDetailPage = () => {
  const { id } = useParams();

  const [tour, setTour] = useState(null);
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchTour();
      fetchItinerary();
    }
  }, [id]);

  /* ================= FETCH TOUR ================= */
  const fetchTour = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/individual-tours/${id}`
      );
      setTour(res.data);
    } catch (err) {
      console.error("Individual tour fetch error", err);
    }
  };

  /* ================= FETCH ITINERARY ================= */
  const fetchItinerary = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/individual-tours/${id}/individualitinerary`
      );

      console.log("INDIVIDUAL ITINERARY RAW 👉", res.data);

      // backend returns either array or { itinerary: [] }
      const daysData = res.data?.itinerary || res.data;

      setItinerary(Array.isArray(daysData) ? daysData : []);
    } catch (err) {
      console.error("Individual itinerary fetch error", err);
      setItinerary([]);
    } finally {
      setLoading(false);
    }
  };

  if (!tour || loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading tour details...
      </div>
    );
  }

    const getDaysNights = (startDate, endDate) => {
    if (!startDate || !endDate) return "";
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days =
      Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return `${days} Days / ${days - 1} Nights`;
  };
  return (
    <div className="w-full">

      {/* ================= HERO ================= */}
      <div className="relative h-[65vh]">
        <img
          src={tour.images?.length > 0 ? `${BASE_URL}${tour.images[0]}` : "/IndividualBooking.webp"}
          alt={tour.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
          onError={(e) => {
             e.target.src = "/IndividualBooking.webp";
          }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 h-full flex items-center justify-center text-center"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#f4612b]">
              {tour.title}
            </h1>
             <p className="mt-3 text-gray-200">
              {getDaysNights(tour.startDate, tour.endDate)} • {tour.location}
            </p>
          </div>
        </motion.div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 py-14 grid lg:grid-cols-3 gap-10">

        {/* LEFT – ITINERARY */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-[#F4612B] mb-2">
            Tour Itinerary
          </h2>
          <p className="text-gray-500 mb-6">
            Day-wise detailed schedule with sightseeing & stay
          </p>

          {itinerary.length > 0 ? (
            <DayAccordion data={itinerary} />
          ) : (
            <p className="text-gray-500">
              Itinerary will be updated soon.
            </p>
          )}
        </div>

        {/* RIGHT – WHY CHOOSE US */}
        <WhyChooseUs tourId={tour._id} type="individual"/>
      </div>
    </div>
  );
};

export default IndividualDetailPage;
