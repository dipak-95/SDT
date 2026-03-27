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
  IndianRupee,
  CheckCircle
} from "lucide-react";

const BASE_URL = "https://api.sdtour.online";

export default function AdminHotelBooking() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/bookings/fetch`);
      setBookings(res.data || []);
    } catch {
      toast.error("Failed to load hotel bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  /* ================= CONFIRM BOOKING ================= */
  const confirmBooking = async (id) => {
    try {
      await axios.put(`${BASE_URL}/bookings/status/${id}`);
      toast.success("Booking confirmed ✅");
      fetchBookings();
    } catch (err) {
      toast.error(
        err.response?.data?.msg || "Failed to confirm booking"
      );
    }
  };

  /* ================= DELETE BOOKING ================= */
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
              bg-white rounded-2xl shadow-md
              border-l-4 border-[#F4612B]
              p-6 grid grid-cols-1 lg:grid-cols-5 gap-6
            "
          >
            {/* HOTEL INFO */}
            <div>
              <p className="text-xs text-gray-400 mb-1">Enquiry Received</p>
              <p className="font-bold text-gray-700">
                {new Date(b.createdAt).toLocaleDateString()}
              </p>
              <p className="text-xs text-orange-500 font-medium pb-4 border-b">
                {new Date(b.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              
              <p className="text-xs text-gray-400 mt-3 mb-1">Hotel</p>
              <p className="font-bold text-lg flex items-center gap-2">
                <Hotel size={18} />
                {b.hotelName}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                📍 {b.city}, {b.location}
              </p>

              {/* STATUS */}
              <span
                className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${
                  b.status === "confirmed"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {b.status || "pending"}
              </span>
            </div>

            {/* CUSTOMER */}
            <div>
              <p className="text-xs text-gray-400 mb-1">Guest</p>
              <p className="font-semibold text-lg flex items-center gap-2">
                <User size={18} /> {b.user?.name}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                <Phone size={14} /> {b.user?.phone}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <Mail size={14} /> {b.user?.email || "—"}
              </p>
              <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase">Pax Details</p>
                <p className="text-sm font-bold text-gray-700">
                   {b.adults || 0} Adults · {b.children || 0} Children
                </p>
              </div>
            </div>

            {/* ROOM */}
            <div className="lg:col-span-2">
              <p className="text-xs text-gray-400 mb-1">Room Setup</p>
              <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100">
                <p className="font-bold text-gray-800 flex items-center gap-2 mb-2">
                  <BedDouble size={20} className="text-[#F4612B]" />
                  {b.roomCombo || b.roomType}
                </p>
                <div className="flex gap-4">
                   <div className="text-center">
                      <p className="text-[10px] uppercase text-gray-400 font-bold">Total Rooms</p>
                      <p className="text-lg font-bold text-gray-700">{b.roomsBooked}</p>
                   </div>
                   <div className="w-px h-8 bg-orange-200 mt-1" />
                   <div className="text-center pl-4">
                      <p className="text-[10px] uppercase text-gray-400 font-bold">Stay Type</p>
                      <p className="text-sm font-bold text-[#F4612B]">{b.roomType}</p>
                   </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs text-gray-400 mb-1">Stay Duration</p>
                <p className="text-sm font-bold flex items-center gap-2 text-gray-700">
                  <CalendarDays size={16} />
                  {new Date(b.checkIn).toLocaleDateString()} — {new Date(b.checkOut).toLocaleDateString()}
                  <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded text-[10px]">{b.nights} Nights</span>
                </p>
              </div>
            </div>

            {/* PRICE + ACTIONS */}
            <div className="flex flex-col justify-between items-end border-l pl-6">
              <div className="text-right">
                <p className="text-xs text-gray-400 mb-1">Total Bill</p>
                <p className="text-2xl font-black text-[#F4612B] flex items-center gap-1 justify-end tracking-tight">
                  <IndianRupee size={22} strokeWidth={3} />
                  {b.totalAmount}
                </p>
              </div>

              <div className="flex flex-col gap-2 w-full mt-4">
                {b.status !== "confirmed" && (
                  <button
                    onClick={() => confirmBooking(b._id)}
                    className="flex justify-center items-center gap-2 px-4 py-2.5 text-sm font-bold bg-green-600 text-white rounded-xl shadow-lg shadow-green-100 hover:bg-green-700 transition"
                  >
                    <CheckCircle size={16} /> Confirm
                  </button>
                )}

                <button
                  onClick={() => deleteBooking(b._id)}
                  className="flex justify-center items-center gap-2 px-4 py-2 text-sm font-bold text-red-500 bg-red-50 rounded-xl hover:bg-red-100 transition"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
