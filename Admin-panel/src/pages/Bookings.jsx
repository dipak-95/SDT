import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const BASE_URL = "http://72.62.195.222:7345";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [openAction, setOpenAction] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/bookingtour/admin/bookings`
      );
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${BASE_URL}/bookingtour/admin/bookings/${id}`,
        { status }
      );
      toast.success(`Booking ${status}`);
      fetchBookings();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;

    try {
      await axios.delete(
        `${BASE_URL}/bookingtour/admin/bookings/${id}`
      );
      toast.success("Booking deleted");
      fetchBookings();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 bg-[#f8f8f8] min-h-screen"
    >
      <h1 className="text-4xl font-bold text-[#F4612B] mb-8">
        Tour Bookings
      </h1>

      <div className="space-y-6">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="
              bg-white
              rounded-2xl
              shadow-md
              border-l-4
              border-[#F4612B]
              p-6
              grid
              grid-cols-1
              md:grid-cols-6
              gap-8
              items-center
              relative
            "
          >
            {/* CUSTOMER */}
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Customer</p>
              <p className="text-lg font-semibold">{b.userName}</p>
              <p className="text-sm text-gray-600">{b.phone}</p>
              <p className="text-sm text-gray-600">{b.email}</p>
            </div>

            {/* TOUR */}
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Tour</p>
              <p className="text-lg font-semibold">{b.tourTitle}</p>
              <span className="inline-block text-sm bg-orange-100 text-[#F4612B] px-3 py-1 rounded-full capitalize">
                {b.tourType} tour
              </span>
            </div>

            {/* PERSONS */}
            <div className="text-center">
              <p className="text-sm text-gray-400">Persons</p>
              <p className="text-2xl font-bold">{b.persons}</p>
            </div>

            {/* AMOUNT */}
            <div className="text-center">
              <p className="text-sm text-gray-400">Total</p>
              <p className="text-2xl font-bold text-[#F4612B]">
                ₹{b.totalAmount}
              </p>
            </div>

            {/* STATUS */}
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-1">Status</p>
              <span
                className={`inline-block px-4 py-1 rounded-full text-sm font-semibold
                  ${
                    b.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : b.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
              >
                {b.status}
              </span>
            </div>

            {/* ACTION */}
            <div className="flex justify-center relative">
  <button
    onClick={() =>
      setOpenAction(openAction === b._id ? null : b._id)
    }
    className="
      text-2xl
      px-3
      py-2
      rounded-full
      hover:bg-gray-100
    "
  >
    ⋮
  </button>

  {openAction === b._id && (
  <div
    className="
      absolute
      right-0
      top-12
      bg-white
      shadow-2xl
      rounded-xl
      w-56
      z-50
      overflow-hidden
    "
  >
    {/* HEADER */}
    <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
      <span className="text-sm font-semibold text-gray-700">
        Booking Actions
      </span>

      <button
        onClick={() => setOpenAction(null)}
        className="
          text-gray-400
          hover:text-gray-700
          text-lg
          leading-none
        "
        aria-label="Close actions"
      >
        ✕
      </button>
    </div>

    {/* ACTION LIST */}
    <div className="py-1">
      <button
        onClick={() => {
          updateStatus(b._id, "confirmed");
          setOpenAction(null);
        }}
        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-green-600 hover:bg-green-50"
      >
        ✔ Confirm Booking
      </button>

      <button
        onClick={() => {
          updateStatus(b._id, "cancelled");
          setOpenAction(null);
        }}
        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-yellow-600 hover:bg-yellow-50"
      >
        ⏸ Cancel Booking
      </button>

      <button
        onClick={() => {
          deleteBooking(b._id);
          setOpenAction(null);
        }}
        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
      >
        🗑 Delete Booking
      </button>
    </div>
  </div>
)}

</div>

          </div>
        ))}

        {bookings.length === 0 && (
          <div className="text-center py-24 text-gray-500 text-lg">
            No bookings found
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Bookings;
