
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  CheckCircle,
  XCircle,
  Trash2,
  CarTaxiFront,
  User,
  Phone,
  Mail
} from "lucide-react";

const BASE_URL = "http://localhost:1005";

export default function AdminCarBooking() {
  const [data, setData] = useState([]);
  const [openAction, setOpenAction] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/car-booking/admin`);
      setData(res.data);
    } catch {
      toast.error("Failed to load bookings");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${BASE_URL}/car-booking/admin/${id}`, { status });
      toast.success(`Booking ${status}`);
      fetchData();
    } catch {
      toast.error("Status update failed");
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking permanently?")) return;

    try {
      await axios.delete(`${BASE_URL}/car-booking/admin/${id}`);
      toast.success("Booking deleted");
      fetchData();
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
          🚗 Car Rental Bookings
        </h1>
        <p className="text-gray-600 mt-1">
          Manage all customer car rental enquiries
        </p>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 && (
        <div className="bg-white rounded-xl shadow p-12 text-center text-gray-500">
          No car bookings found
        </div>
      )}

      {/* BOOKINGS LIST */}
      <div className="space-y-6">
        {data.map((b) => (
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
            {/* CUSTOMER */}
            <div>
              <p className="text-xs text-gray-400 mb-1">Customer</p>
              <p className="font-bold text-lg flex items-center gap-2">
                <User size={18} /> {b.userName}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                <Phone size={14} /> {b.phone}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <Mail size={14} /> {b.email}
              </p>
            </div>

            {/* VEHICLE */}
            <div>
              <p className="text-xs text-gray-400 mb-1">Vehicle</p>
              <p className="font-semibold text-lg flex items-center gap-2">
                <CarTaxiFront size={18} />
                {b.vehicleName}
              </p>
              <span className="inline-block mt-1 text-xs bg-orange-100 text-[#F4612B] px-3 py-1 rounded-full">
                {b.vehicleType || "Car Rental"}
              </span>
            </div>

            {/* PRICING */}
            <div>
              <p className="text-xs text-gray-400 mb-1">Pricing</p>
              <p className="text-lg font-bold text-[#F4612B]">
                ₹{b.pricePerKm}/KM
              </p>
              <p className="text-sm text-gray-600">
                {b.persons} Passengers
              </p>
            </div>

            {/* STATUS */}
            <div>
              <p className="text-xs text-gray-400 mb-1">Status</p>
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

            {/* ACTIONS */}
            {/* <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => updateStatus(b._id, "confirmed")}
                className="
                  flex items-center gap-1
                  px-4 py-2
                  text-sm
                  bg-green-100
                  text-green-700
                  rounded-lg
                  hover:bg-green-200
                "
              >
                <CheckCircle size={16} /> Confirm
              </button>

              <button
                onClick={() => updateStatus(b._id, "cancelled")}
                className="
                  flex items-center gap-1
                  px-4 py-2
                  text-sm
                  bg-yellow-100
                  text-yellow-700
                  rounded-lg
                  hover:bg-yellow-200
                "
              >
                <XCircle size={16} /> Cancel
              </button>

              <button
                onClick={() => deleteBooking(b._id)}
                className="
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
            </div> */}
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
       w-8 h-12 mt-8 pl-3
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

          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
