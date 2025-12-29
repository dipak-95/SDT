import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  Trash2,
  Hotel,
  User,
  Phone,
  Mail,
  BedDouble,
  CalendarDays,
  IndianRupee
} from "lucide-react";

const BASE_URL = "https://sdt-7.onrender.com";

export default function AdminHotelBooking() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/bookings/fetch`);
      setBookings(res.data);
    } catch {
      toast.error("Failed to load hotel bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking permanently?")) return;

    try {
      await axios.delete(`${BASE_URL}/bookings/delete/${id}`);
      toast.success("Booking deleted successfully");
      fetchBookings();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-[#f8f8f8] min-h-screen"
    >
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#F4612B]">
          🏨 Hotel Bookings
        </h1>
        <p className="text-gray-600 mt-1">
          Manage all hotel room reservations
        </p>
      </div>

      {/* EMPTY STATE */}
      {bookings.length === 0 && (
        <div className="bg-white rounded-xl shadow p-12 text-center text-gray-500">
          No hotel bookings found
        </div>
      )}

      {/* BOOKINGS LIST */}
      <div className="space-y-6">
        {bookings.map((b) => (
          <motion.div
            key={b._id}
            whileHover={{ scale: 1.01 }}
            className="
              bg-white
              rounded-2xl
              shadow-md
              border-l-4
              border-[#F4612B]
              p-6
              grid
              grid-cols-1
              lg:grid-cols-5
              gap-6
            "
          >
            {/* HOTEL INFO */}
            <div>
              <p className="text-xs text-gray-400 mb-1">Hotel</p>
              <p className="font-bold text-lg flex items-center gap-2">
                <Hotel size={18} />
                {b.hotelName}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                📍 {b.city}, {b.location}
              </p>
            </div>

            {/* CUSTOMER */}
            <div>
              <p className="text-xs text-gray-400 mb-1">Guest</p>
              <p className="font-semibold text-lg flex items-center gap-2">
                <User size={18} /> {b.user.name}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                <Phone size={14} /> {b.user.phone}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <Mail size={14} /> {b.user.email || "—"}
              </p>
            </div>

            {/* ROOM DETAILS */}
            <div>
              <p className="text-xs text-gray-400 mb-1">Room</p>
              <p className="font-semibold text-lg flex items-center gap-2">
                <BedDouble size={18} />
                {b.roomType}
              </p>
              <p className="text-sm text-gray-600">
                Rooms Booked: {b.roomsBooked}
              </p>
            </div>

            {/* DATES */}
            <div>
              <p className="text-xs text-gray-400 mb-1">Stay</p>
              <p className="text-sm flex items-center gap-2 text-gray-700">
                <CalendarDays size={16} />
                {new Date(b.checkIn).toLocaleDateString()} →
                {new Date(b.checkOut).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                Nights: {b.nights}
              </p>
            </div>

            {/* PRICE + ACTION */}
            <div className="flex flex-col justify-between items-end">
              <div className="text-right">
                <p className="text-xs text-gray-400 mb-1">Total</p>
                <p className="text-xl font-bold text-[#F4612B] flex items-center gap-1 justify-end">
                  <IndianRupee size={18} />
                  {b.totalAmount}
                </p>
              </div>

              <button
                onClick={() => deleteBooking(b._id)}
                className="
                  mt-4
                  flex items-center gap-1
                  px-4 py-2
                  text-sm
                  bg-red-100
                  text-red-700
                  rounded-lg
                  hover:bg-red-200
                "
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
