import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DayAccordion from "../component/DayAccordian";
import WhyChooseUs from "../component/WhyChooseUs";
import { motion } from "framer-motion";

const BASE_URL = "http://72.62.195.222:7345";

const isValidObjectId = (id) =>
  /^[0-9a-fA-F]{24}$/.test(id);

const GroupTourDetail = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [itinerary, setItinerary] = useState([]);

  useEffect(() => {
    if (!isValidObjectId(id)) return;
    fetchTour();
    fetchItinerary();
  }, [id]);

  const fetchTour = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/group-tours/${id}`
      );
      setTour(res.data);
    } catch (err) {
      console.error("Tour fetch error", err);
    }
  };

  const fetchItinerary = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/group-tours/${id}/itinerary`
      );
      setItinerary(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Itinerary fetch error", err);
      setItinerary([]);
    }
  };

  const getDaysNights = (startDate, endDate) => {
    if (!startDate || !endDate) return "";
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days =
      Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return `${days} Days / ${days - 1} Nights`;
  };

  if (!tour) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading tour details...
      </div>
    );
  }

  

  return (
    <div className="w-full">

      {/* HERO */}
      <div className="relative h-[65vh]">
        <img
          src="/grouptourbooking2.webp"
          alt={tour.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
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
              {getDaysNights(tour.startDate, tour.endDate)}
              {tour.location && ` • ${tour.location}`}
            </p>
          </div>
        </motion.div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-14 grid lg:grid-cols-3 gap-10">

        {/* LEFT */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-[#F4612B] mb-2">
            Tour Itinerary
          </h2>
          <p className="text-gray-500 mb-6">
            Day-wise detailed schedule with sightseeing & stay
          </p>

          <DayAccordion data={itinerary} />
        </div>

        {/* RIGHT */}
        <WhyChooseUs tourId={tour._id} type="group" />
      </div>
    </div>
  );
};

export default GroupTourDetail;
