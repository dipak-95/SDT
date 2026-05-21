import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const BASE_URL = "https://api.sdtour.online";

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
            {/* TIMESTAMP */}
            <div className="absolute top-2 right-4 text-right">
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Booked On</p>
               <p className="text-xs font-bold text-gray-700">{new Date(b.createdAt).toLocaleDateString()}</p>
               <p className="text-[10px] text-orange-400 font-bold">{new Date(b.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
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
              <div className="flex flex-col gap-1">
                <span className="inline-block text-xs bg-orange-100 text-[#F4612B] px-3 py-1 rounded-full capitalize w-fit">
                  {b.tourType} tour
                </span>
                {b.travelDate && (
                  <p className="text-xs font-bold text-gray-700 mt-1">
                    📅 Travel: <span className="text-[#F4612B]">{new Date(b.travelDate).toLocaleDateString("en-IN", { day:'2-digit', month:'short', year:'numeric' })}</span>
                  </p>
                )}
              </div>
            </div>

            {/* PERSONS */}
            <div className="text-center">
              <p className="text-sm text-gray-400">Persons</p>
              <p className="text-2xl font-bold">{b.persons}</p>
            </div>

            {/* AMOUNT & PAYMENT DETAILS */}
            <div className="space-y-1">
              <p className="text-sm text-gray-400 text-center font-semibold">Payment Details</p>
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 text-xs space-y-2 shadow-sm">
                
                {/* Dynamic Status Badge */}
                {b.paymentType === "full" || !b.remainingAmount || b.remainingAmount === 0 ? (
                  <div className="bg-green-100 text-green-700 text-center py-1 px-2 rounded-lg font-bold flex items-center justify-center gap-1 border border-green-200">
                    <span>✅</span> Full Payment Received
                  </div>
                ) : (
                  <div className="bg-amber-100 text-amber-800 text-center py-1 px-2 rounded-lg font-bold flex items-center justify-center gap-1 border border-amber-200">
                    <span>⏳</span> Partial (30%) Received
                  </div>
                )}

                <div className="space-y-1 pt-1">
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500 font-medium">Total Price:</span>
                    <span className="font-bold text-gray-800">₹{b.totalAmount}</span>
                  </div>
                  
                  {b.paymentType === "advance" && b.remainingAmount > 0 ? (
                    <>
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-500 font-medium">Paid (30%):</span>
                        <span className="font-bold text-green-600">₹{b.payableAmount}</span>
                      </div>
                      <div className="flex justify-between gap-4 border-t border-dashed border-orange-200 pt-1 mt-1">
                        <span className="text-gray-500 font-semibold">Remaining:</span>
                        <span className="font-bold text-red-500">₹{b.remainingAmount}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500 font-medium">Paid:</span>
                      <span className="font-bold text-green-600">₹{b.totalAmount}</span>
                    </div>
                  )}
                </div>
              </div>
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
