import { Trash2, CheckCircle, Calendar, Phone, Mail, User, Info, DollarSign } from "lucide-react";
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
    try {
      const res = await axios.get(`${BASE_URL}/car-booking/admin`);
      setBookings(res.data);
    } catch {
      toast.error("Failed to load bookings");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${BASE_URL}/car-booking/admin/${id}`, { status });
      toast.success(`Booking status updated to ${status}`);
      fetchBookings();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking?")) return;

    try {
      await axios.delete(`${BASE_URL}/car-booking/admin/${id}`);
      toast.success("Booking deleted");
      fetchBookings();
    } catch {
      toast.error("Failed to delete booking");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Car & Bus <span className="text-orange-600">Rental Bookings</span></h1>
        <p className="text-sm text-gray-500">View customer rental details, payment types, advance paid, and confirm pending offline bookings.</p>
      </div>

      {bookings.length === 0 && (
        <div className="bg-white border border-dashed rounded-3xl p-16 text-center shadow-md">
          <Info className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-700">No Bookings Found</h3>
          <p className="text-gray-500 text-sm mt-1">There are no car or bus rental bookings currently registered in the database.</p>
        </div>
      )}

      <div className="space-y-6">
        {bookings.map(b => {
          const payType = b.paymentType || "advance";
          const totalAmt = b.total || 0;
          const paidAmt = typeof b.payableAmount === 'number' ? b.payableAmount : (payType === "full" ? totalAmt : Math.round(totalAmt * 0.3));
          const remAmt = typeof b.remainingAmount === 'number' ? b.remainingAmount : (payType === "full" ? 0 : totalAmt - paidAmt);

          return (
            <div
              key={b._id}
              className="bg-white rounded-3xl shadow-xl p-6 border-l-8 border-orange-500 transition-all hover:shadow-2xl border border-gray-100"
            >
              {/* HEADER */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 border-b pb-4">
                 <div>
                   <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider mb-1">Enquiry & Payment Details</p>
                   <div className="flex items-center gap-2">
                     <p className="font-bold text-gray-800 text-sm">{new Date(b.createdAt).toLocaleDateString("en-IN")}</p>
                     <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                     <p className="text-xs text-orange-600 font-black">{new Date(b.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                   </div>
                 </div>
                 
                 <div>
                   <span
                    className={`text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider ${b.status === "confirmed"
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-orange-100 text-orange-700 border border-orange-200"
                      }`}
                   >
                     {b.status}
                   </span>
                 </div>
              </div>

              {/* CAR INFO & CUSTOMER INFO */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left: Car & Journey Details */}
                <div className="space-y-3 md:col-span-1">
                  <h3 className="text-xl font-black text-gray-900 leading-tight">
                    🚗 {b.carId?.name || "Premium Car Rental"}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-4 h-4 text-orange-500 shrink-0" />
                    <span className="font-semibold">{formatDate(b.startDate)}</span>
                    <span className="font-bold">→</span>
                    <span className="font-semibold">{formatDate(b.endDate)}</span>
                  </div>
                  {b.days && (
                    <span className="bg-gray-100 text-gray-600 font-bold px-2.5 py-0.5 rounded-md text-[10px] uppercase block w-max mt-1">
                      {b.days} Days Booking
                    </span>
                  )}
                </div>

                {/* Middle: Passenger Info */}
                <div className="space-y-2 md:col-span-2 bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50 text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-orange-500 shrink-0" />
                      <span><b>Name:</b> {b.userName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                      <span><b>Phone:</b> {b.phone}</span>
                    </div>
                    {b.email && (
                      <div className="flex items-center gap-2 sm:col-span-2">
                        <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                        <span><b>Email:</b> {b.email}</span>
                      </div>
                    )}
                  </div>
                  {b.note && (
                    <div className="mt-2 pt-2 border-t text-xs text-gray-500 leading-relaxed">
                      <b>Notes:</b> {b.note}
                    </div>
                  )}
                </div>
              </div>

              {/* PAYMENT BREAKDOWN */}
              <div className="bg-gray-50/80 rounded-2xl p-4 mt-5 border border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs shadow-inner">
                <div>
                  <span className="text-gray-400 font-black uppercase text-[10px] block mb-0.5">Total Amount</span>
                  <span className="font-extrabold text-gray-800 text-sm">₹{totalAmt.toLocaleString("en-IN")}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-black uppercase text-[10px] block mb-0.5">Payment Type</span>
                  <span className="font-extrabold text-orange-600 uppercase text-[10px]">
                    {payType === "full" ? "Full Payment" : "30% Advance"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 font-black uppercase text-[10px] block mb-0.5">
                    {b.status === "confirmed" ? "Paid Amount" : "Payable Advance"}
                  </span>
                  <span className="font-extrabold text-green-600 text-sm">₹{paidAmt.toLocaleString("en-IN")}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-black uppercase text-[10px] block mb-0.5">Remaining Balance</span>
                  <span className="font-extrabold text-red-600 text-sm">₹{remAmt.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex justify-between items-center border-t mt-5 pt-4">
                <div className="flex items-center gap-1.5 text-[#F4612B]">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-lg font-black tracking-tight">
                    ₹{totalAmt.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex gap-3">
                  {/* CONFIRM BUTTON */}
                  {b.status === "pending" && (
                    <button
                      onClick={() => updateStatus(b._id, "confirmed")}
                      className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all shadow-md"
                    >
                      <CheckCircle size={14} />
                      Confirm Booking
                    </button>
                  )}

                  {/* DELETE */}
                  <button
                    onClick={() => deleteBooking(b._id)}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all border-2 border-transparent hover:border-red-200"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
