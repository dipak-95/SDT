import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { CalendarDays, BedDouble } from "lucide-react";

import HotelCancel from "../component/HotelCancel";

const API_BASE = "http://localhost:1005";

export default function BookingHotel() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const hotel = state?.hotel;
  const room = state?.room;

if (!hotel || !room) return null;

  const [bookedDates, setBookedDates] = useState([]);
  const [priceMap, setPriceMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [availableroom, setavailableRoom] = useState(null);



  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: null,
    checkOut: null,
    rooms: 1
  });

  /* ===== PROTECT ===== */
  useEffect(() => {
    if (!hotel || !room) navigate("/hotels");
  }, [hotel, room, navigate]);

  /* ===== BOOKED DATES ===== */
  useEffect(() => {
    if (!hotel?._id) return;

    axios
      .get(`${API_BASE}/hotels/calendar`, {
        params: { hotelId: hotel._id, roomType: room.type }
      })
      .then(res => setBookedDates(res.data.map(d => new Date(d))))
      .catch(() => toast.error("Failed to load booked dates"));
  }, [hotel?._id, room?.type]);

  /* ===== MONTH PRICES ===== */
  useEffect(() => {
    if (!hotel?._id) return;

    const ref = form.checkIn || new Date();

    axios
      .get(`${API_BASE}/hotels/month-prices`, {
        params: {
          hotelId: hotel._id,
          roomType: room.type,
          month: ref.getMonth() + 1,
          year: ref.getFullYear()
        }
      })
      .then(res => {
        const map = {};
        (res.data.prices || res.data).forEach(p => {
          map[new Date(p.date).toDateString()] = Number(p.price);
        });
        setPriceMap(map);
      })
      .catch(() => toast.error("Failed to load prices"));
  }, [hotel?._id, room?.type, form.checkIn]);

useEffect(() => {
  if (!hotel?._id || !room?.type) return;
  if (!form.checkIn || !form.checkOut) return;

  axios.get(`${API_BASE}/hotels/availability`, {
    params: {
      hotelId: hotel._id,
      roomType: room.type,
      checkIn: form.checkIn,
      checkOut: form.checkOut
    }
  })
  .then(res => {
    setavailableRoom(res.data.availableRooms);
  })
  .catch(err => {
    console.error(err);
    toast.error("Failed to fetch available rooms");
  });

}, [form.checkIn, form.checkOut, hotel?._id, room?.type]);



  const getPrice = (date) =>
    priceMap[date.toDateString()] ?? room.price;

  const nights = useMemo(() => {
    if (!form.checkIn || !form.checkOut) return 0;
    return (form.checkOut - form.checkIn) / 86400000;
  }, [form.checkIn, form.checkOut]);

  // const availableRooms = useMemo(() => {
  //   if (!room) return 0;
  //   return Math.max(0, room.totalRooms - room.bookedRooms);
  // }, [availableroom]);
  const availableRooms = availableroom ?? 0;


  const totalAmount = useMemo(() => {
    if (!form.checkIn || !form.checkOut) return 0;
    let sum = 0;
    let d = new Date(form.checkIn);
    while (d < form.checkOut) {
      sum += getPrice(d);
      d.setDate(d.getDate() + 1);
    }
    return sum * Number(form.rooms || 1);
  }, [form.checkIn, form.checkOut, form.rooms, priceMap]);

  const disabledDays = [{ before: new Date() }, ...bookedDates];

  /* ===== BOOK ===== */
  const confirmBooking = async () => {
  if (!form.name || !form.phone || !form.checkIn || !form.checkOut) {
    toast.error("Fill all required fields");
    return;
  }

  if (form.rooms > availableRooms) {
    toast.error("Not enough rooms available");
    return;
  }

  try {
    setLoading(true);

    await axios.post(`${API_BASE}/bookings/create`, {
      hotelId: hotel._id,
      roomType: room.type,
      roomsBooked: form.rooms,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      user: {
        name: form.name,
        email: form.email,
        phone: form.phone
      }
    });

    toast.success("Thank you for your enquiry! Our team will contact you within 3 hours.");
    

    /* 🔥 REFETCH AVAILABILITY AFTER BOOKING */
    const res = await axios.get(`${API_BASE}/hotels/availability`, {
      params: {
        hotelId: hotel._id,
        roomType: room.type,
        checkIn: form.checkIn,
        checkOut: form.checkOut
      }
    });
    
    setavailableRoom(res.data.availableRooms);

    setForm({
      name: "",
      email: "",
      phone: "",
      checkIn: null,
      checkOut: null,
      rooms: 1
    });

  } catch (err) {
    toast.error(err.response?.data?.msg || "Booking failed");
  } finally {
    setLoading(false);
  }
};


  return (

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-8xl mx-auto p-0"
    >
      {/* ================= HERO ================= */}
      <div className="relative h-[65vh] w-full">
        <img
          src="/BookHotel.webp"
          alt={hotel.name}
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* CENTERED CONTENT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#f46b12]">
            {hotel.name}
          </h1>



          <p className="flex items-center gap-1 mt-3 text-sm md:text-base">
            <MapPin size={18} className="text-[#f46b12]" />
            {hotel.location}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-10 max-sm:p-2.5">

        {/* LEFT */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6 border space-y-5">

          {/* HOTEL INFO + ROOMS AVAILABLE */}
          <div className="flex items-start justify-between">

            {/* LEFT CONTENT */}
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                bjkb
              </h2>

              <p className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                <MapPin size={14} className="text-[#F4612B]" />
                nkn
              </p>
            </div>

            {/* RIGHT BADGE */}
            <span
              className="
      flex items-center gap-2
      px-4 py-1.5
      text-sm font-semibold
      text-[#F4612B]
      bg-[#F4612B]/20
      rounded-full
      whitespace-nowrap
    "
            >
              <BedDouble size={16} />
              {room.type}
            </span>


          </div>

          {/* USER DETAILS */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Guest Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full border rounded-lg px-4 py-2
                   focus:outline-none focus:ring-2
                   focus:ring-[#f46b12]"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                className="w-full border rounded-lg px-4 py-2
                   focus:outline-none focus:ring-2
                   focus:ring-[#f46b12]"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full border rounded-lg px-4 py-2
                   focus:outline-none focus:ring-2
                   focus:ring-[#f46b12]"
              />
            </div>
          </div>

          {/* DATE PICKERS */}


          <div className="flex justify-end">
            <span
              className="
      flex items-center gap-2
      text-sm font-semibold
      px-5 py-2 rounded-full
      bg-[#f46b12]/20 text-[#f46b12]
      transition-all duration-300
    "
            >
              {availableroom === null ? (
                <>
                  <CalendarDays size={16} />
                  Select dates
                </>
              ) : (
                <>
                  <BedDouble size={16} />
                  {availableroom} rooms available
                </>
              )}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DayPicker
              className="border border-[#f46b12] rounded-2xl lg:pl-7 max-sm:pl-0 md:pl-0"
              mode="single"
              selected={form.checkIn}
              onSelect={d => setForm({ ...form, checkIn: d, checkOut: null })}
              disabled={disabledDays}
              formatters={{
                formatDay: (date) => (
                  <div className="flex flex-col items-center justify-center leading-none">
                    <span className="text-[13px] text-[#f46b12] font-semibold">
                      {date.getDate()}
                    </span>
                    <span className="text-[10px] font-medium">
                      ₹{getPrice(date)}
                    </span>
                  </div>
                )
              }}

            />
            <DayPicker
              mode="single"
              className="border border-[#f46b12] rounded-2xl lg:pl-7 max-sm:pl-0 md:pl-0"
              selected={form.checkOut}
              onSelect={d => setForm({ ...form, checkOut: d })}
              disabled={[...disabledDays, { before: form.checkIn }]}
              formatters={{
                formatDay: (date) => (
                  <div className="flex flex-col items-center justify-center leading-none">
                    <span className="text-[13px] text-[#f46b12] font-semibold">
                      {date.getDate()}
                    </span>
                    <span className="text-[10px] font-medium">
                      ₹{getPrice(date)}
                    </span>
                  </div>
                )
              }}

            />
          </div>


          {/* ROOMS INPUT */}
          <div className="max-w-4xl">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Number of Rooms
            </label>

            <input
              className="w-full border rounded-lg px-4 py-2  focus:outline-none focus:ring-2 focus:ring-[#f46b12]"
              type="number"
              min={1}
              max={availableroom || 1}
              value={form.rooms}
              onChange={e => {
                const val = Number(e.target.value);
                if (!isNaN(val)) {
                  setForm({
                    ...form,
                    rooms: Math.min(availableroom || 1, Math.max(1, val))
                  });
                }
              }}
            />



            <p className="text-xs text-gray-500 mt-1">
              Maximum {availableroom ?? 0} rooms allowed
            </p>
          </div>

        </div>
        {/* RIGHT */}
        <div className="space-y-6">

          {/* ================= BOOKING SUMMARY ================= */}
          <div className="bg-white rounded-xl shadow border overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-bold mb-4">Booking Summary</h2>

              {form.checkIn && form.checkOut && (
                <>
                  {/* DATE WISE PRICE */}
                  <div className="text-sm space-y-2">
                    {(() => {
                      let d = new Date(form.checkIn);
                      const rows = [];
                      while (d < form.checkOut) {
                        rows.push(
                          <div
                            key={d.toDateString()}
                            className="flex justify-between text-gray-600"
                          >
                            <span>{d.toDateString()}</span>
                            <span>₹{getPrice(d)}</span>
                          </div>
                        );
                        d.setDate(d.getDate() + 1);
                      }
                      return rows;
                    })()}
                  </div>

                  {/* TOTAL */}
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-red-300">
                    <span className="font-semibold text-[#F4612B]">Total</span>
                    <span className="font-bold text-[#F4612B] text-lg">
                      ₹{totalAmount}
                    </span>
                  </div>
                </>
              )}

              {/* CONFIRM BUTTON */}
              <button
                onClick={confirmBooking}
                disabled={loading || totalAmount === 0}
                className="mt-6 w-full bg-[#F4612B] text-white py-3 rounded-lg
                   font-semibold text-sm hover:bg-[#e85f0f]
                   transition disabled:opacity-60"
              >
                {loading ? "Booking..." : "Enquiry for Booking"}
              </button>
            </div>
          </div>

          {/* ================= CANCELLATION POLICY ================= */}
          <div className="bg-white rounded-xl shadow border p-6">
            <h3 className="text-lg font-bold text-center text-[#F4612B] mb-5">
              Cancellation Policy
            </h3>

            {/* FULL REFUND */}
            <div className="flex gap-3 p-4 rounded-lg bg-orange-50 border-l-4 border-[#F4612B] mb-4">
              <span className="text-[#F4612B] font-bold">✓</span>
              <p className="text-sm text-gray-700">
                Cancel the hotel <b>7 days or more</b> before the departure date and get
                a <span className="text-green-600 font-semibold">100% refund</span>.
              </p>
            </div>

            {/* PARTIAL REFUND */}
            <div className="flex gap-3 p-4 rounded-lg bg-red-50 border-l-4 border-red-400 mb-4">
              <span className="text-red-500 font-bold">!</span>
              <p className="text-sm text-gray-700">
                If you cancel the hotel <b>7 days or less</b> before departure,
                <span className="text-red-600 font-semibold">
                  {" "}
                  30% of the total amount
                </span>{" "}
                will be deducted as cancellation charges.
              </p>
            </div>

            <p className="text-xs text-center text-gray-500">
              Refunds will be processed within <b>7–10 working days</b> to the original
              payment method.
            </p>
          </div>

        </div>



      </div>
    </motion.div>
  );
}
