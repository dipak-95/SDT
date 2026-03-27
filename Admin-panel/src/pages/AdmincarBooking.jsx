// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Trash2 } from "lucide-react";
// import { toast } from "react-toastify";

// const BASE_URL = "https://api.sdtour.online";

// const formatDate = (date) => {
//   if (!date) return "N/A";
//   const d = new Date(date);
//   return isNaN(d) ? "N/A" : d.toDateString();
// };

// export default function AdminCarBookings() {
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/car-booking/admin`);
//       setBookings(res.data);
//     } catch {
//       toast.error("Failed to load bookings");
//     }
//   };

//   const deleteBooking = async (id) => {
//     if (!window.confirm("Delete this booking?")) return;

//     try {
//       await axios.delete(`${BASE_URL}/car-booking/admin/${id}`);
//       toast.success("Booking deleted");
//       fetchBookings();
//     } catch {
//       toast.error("Failed to delete booking");
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <h2 className="text-2xl font-bold text-[#F4612B]">
//         Car Bookings
//       </h2>

//       {bookings.length === 0 && (
//         <p className="text-gray-500">No bookings found</p>
//       )}

//       {bookings.map(b => (
//         <div
//           key={b._id}
//           className="bg-white rounded-2xl shadow-md p-5
//                      flex flex-col gap-3"
//         >
//           {/* HEADER */}
//           <div className="flex justify-between items-center">
//             <h3 className="font-semibold text-lg">
//               🚗 {b.carId?.name || "Unknown Car"}
//             </h3>
//             <span className="text-sm text-orange-600 font-medium">
//               {b.status}
//             </span>
//           </div>

//           {/* USER INFO */}
//           <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
//             <p><b>Name:</b> {b.userName}</p>
//             <p><b>Phone:</b> {b.phone}</p>
//             <p><b>Email:</b> {b.email}</p>
//             <p><b>Persons:</b> {b.persons}</p>
//           </div>

//           {/* DATES */}
//           <div className="text-sm text-gray-700">
//             <b>Journey:</b>{" "}
//             {formatDate(b.startDate)} → {formatDate(b.endDate)}
//           </div>

//           {/* TOTAL */}
//           <div className="flex justify-between items-center border-t pt-3">
//             <span className="font-semibold text-[#F4612B] text-lg">
//               ₹{b.total}
//             </span>

//             <button
//               onClick={() => deleteBooking(b._id)}
//               className="
//                 flex items-center gap-2
//                 text-red-600 hover:bg-red-50
//                 px-3 py-1.5 rounded-lg text-sm
//               "
//             >
//               <Trash2 size={16} />
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

import { Trash2, CheckCircle } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const BASE_URL = "https://api.sdtour.online";

const formatDate = (date) => {
  const d = new Date(date);
  return isNaN(d) ? "N/A" : d.toDateString();
};

export default function AdminCarBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await axios.get(`${BASE_URL}/car-booking/admin`);
    setBookings(res.data);
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${BASE_URL}/car-booking/admin/${id}`, { status });
      toast.success(`Booking ${status}`);
      fetchBookings();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking?")) return;

    await axios.delete(`${BASE_URL}/car-booking/admin/${id}`);
    toast.success("Booking deleted");
    fetchBookings();
  };

  return (
    <div className="space-y-6">
      {bookings.map(b => (
        <div
          key={b._id}
          className="bg-white rounded-2xl shadow p-6 border-l-4 border-[#F4612B]"
        >
          {/* HEADER */}
          <div className="flex justify-between items-start mb-4 border-b pb-3">
             <div>
               <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Enquiry Received</p>
               <p className="font-bold text-gray-800">{new Date(b.createdAt).toLocaleDateString()}</p>
               <p className="text-xs text-orange-500 font-medium">{new Date(b.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
             </div>
             
             <div className="text-right">
               <span
                className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest ${b.status === "confirmed"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                  }`}
               >
                 {b.status}
               </span>
             </div>
          </div>

          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">
              🚗 {b.carId?.name || "Car Enquiry"}
            </h3>
          </div>

          {/* INFO */}
          <div className="grid md:grid-cols-2 gap-3 text-sm mt-3">
            <p><b>Name:</b> {b.userName}</p>
            <p><b>Phone:</b> {b.phone}</p>
            <p><b>Email:</b> {b.email}</p>
          </div>

          {/* JOURNEY */}
          <p className="text-sm mt-3">
            <b>Journey:</b>{" "}
            {formatDate(b.startDate)} → {formatDate(b.endDate)}
          </p>

          {/* FOOTER */}
          <div className="flex justify-between items-center border-t mt-4 pt-4">
            <span className="text-lg font-bold text-[#F4612B]">
              <b>Total Rupees : </b>
              ₹{b.total ? b.total.toLocaleString("en-IN") : 0}
            </span>

            <div className="flex gap-3">
              {/* CONFIRM BUTTON */}
              {b.status === "pending" && (
                <button
                  onClick={() => updateStatus(b._id, "confirmed")}
                  className="
                    flex items-center gap-1
                    px-3 py-1.5 text-sm
                    bg-green-600 text-white
                    rounded-lg hover:bg-green-700
                  "
                >
                  <CheckCircle size={16} />
                  Confirm
                </button>
              )}

              {/* DELETE */}
              <button
                onClick={() => deleteBooking(b._id)}
                className="
                  flex items-center gap-1
                  px-3 py-1.5 text-sm
                  text-red-600 hover:bg-red-50
                  rounded-lg
                "
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
