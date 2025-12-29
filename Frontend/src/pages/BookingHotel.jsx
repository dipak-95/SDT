import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { DayPicker } from "react-day-picker";

const API_BASE = "http://127.0.0.1:1005";

export default function BookingHotel() {
  const { hotelId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const hotel = state?.hotel;
  const room = state?.room;

  const [bookedDates, setBookedDates] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: null,
    checkOut: null,
    rooms: 1
  });

  /* 🔒 PROTECT PAGE */
  useEffect(() => {
    if (!hotel || !room) {
      navigate("/hotels");
    }
  }, [hotel, room, navigate]);

  /* 📅 FETCH BOOKED DATES */
  useEffect(() => {
    if (!hotel?._id) return;

    axios
      .get(`${API_BASE}/bookings/booked-dates/${hotel._id}/${room.type}`)
      .then(res => {
        setBookedDates(res.data.map(d => new Date(d)));
      })
      .catch(() => toast.error("Failed to load booked dates"));
  }, [hotel?._id]);

  if (!hotel || !room) return null;

  /* 🏨 AVAILABLE ROOMS */
  const availableRooms =
    room.totalRooms - room.bookedRooms;

  /* 📆 CALENDAR LOGIC */
  const today = new Date();

  const disabledDays = [
    { before: today },
    ...bookedDates
  ];

  /* ❌ CHECK RANGE OVERLAP */
  const hasBlockedDate = useMemo(() => {
    if (!form.checkIn || !form.checkOut) return false;

    let d = new Date(form.checkIn);
    while (d < form.checkOut) {
      if (
        bookedDates.some(
          bd => bd.toDateString() === d.toDateString()
        )
      ) {
        return true;
      }
      d.setDate(d.getDate() + 1);
    }
    return false;
  }, [form.checkIn, form.checkOut, bookedDates]);

  /* 🌙 NIGHTS */
  const nights = useMemo(() => {
    if (!form.checkIn || !form.checkOut) return 0;
    return (
      (form.checkOut - form.checkIn) /
      (1000 * 60 * 60 * 24)
    );
  }, [form.checkIn, form.checkOut]);

  /* 💰 BILL */
  const totalAmount =
    nights > 0 ? nights * room.price * form.rooms : 0;

  /* ✅ CONFIRM BOOKING */
  
  //   if (!form.name || !form.phone || !form.checkIn || !form.checkOut) {
  //     toast.error("Please fill all required fields");
  //     return;
  //   }

  //   if (hasBlockedDate) {
  //     toast.error("Selected dates include already booked days");
  //     return;
  //   }

  //   if (form.rooms > availableRooms) {
  //     toast.error("Not enough rooms available");
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     await axios.post(`${API_BASE}/bookings/create`, {
  //       hotelId: hotel._id,
  //       roomType: room.type,
  //       roomsBooked: form.rooms,
  //       checkIn: form.checkIn,
  //       checkOut: form.checkOut,
  //       user: {
  //         name: form.name,
  //         email: form.email,
  //         phone: form.phone
  //       }
  //     });

  //     toast.success("Booking confirmed 🎉");
  //     navigate("/hotels");
  //   } catch (err) {
  //     toast.error("Booking failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const confirmBooking = async () => {
  if (!form.name || !form.phone || !form.checkIn || !form.checkOut) {
    toast.error("Please fill all required fields");
    return;
  }

  if (hasBlockedDate) {
    toast.error("Selected dates include already booked days");
    return;
  }

  if (form.rooms > availableRooms) {
    toast.error("Not enough rooms available");
    return;
  }

  try {
    setLoading(true);

    // 1️⃣ CREATE HOTEL BOOKING (EXISTING)
    const res = await axios.post(`${API_BASE}/bookings/create`, {
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

    // 🔥 2️⃣ CREATE ORDER FOR DASHBOARD
    await axios.post(`${API_BASE}/order/create`, {
      serviceType: "hotel",
      status: "confirmed",          // IMPORTANT
      amount: Number(res.data.totalAmount || room.price * form.rooms)
    });

    toast.success("Booking confirmed 🎉");
    navigate("/hotels");

  } catch (err) {
    console.error(err);
    toast.error("Booking failed");
  } finally {
    setLoading(false);
  }
};

  return (
    
    
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-8xl mx-auto px-0 py-0"
    >
      <div className="relative h-[65vh]">
        <img
          src="/BookCar.webp"
          alt="Car Booking"
          className="absolute inset-0 w-full h-full object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex items-center justify-center text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Book Your Hotel
            <span className="block text-orange-500 mt-2 text-[25px]">
              {hotel.name}
            </span>
          </h1>
        </div>
      </div>
      

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ================= LEFT ================= */}
        <div className="lg:m-10 lg:col-span-2 bg-white rounded-2xl shadow p-6 space-y-6">

          {/* HOTEL INFO */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-bold">{hotel.name}</h2>
            <p className="flex items-center gap-1 text-gray-500 text-sm">
              <MapPin size={16} className="text-[#F4612B]" />
               {hotel.location}
            </p>
            <p className="mt-2 text-sm">
              Room Type:
              <span className="ml-1 font-semibold text-[#F4612B]">
                {room.type}
              </span>
            </p>
            <p className="text-sm">
              Available Rooms:
              <span
                className={`ml-1 font-semibold ${
                  availableRooms === 0
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {availableRooms}
              </span>
            </p>
          </div>

          {/* USER INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="input"
              placeholder="Full Name"
              value={form.name}
              onChange={e =>
                setForm({ ...form, name: e.target.value })
              }
            />
            <input
              className="input"
              placeholder="Email"
              value={form.email}
              onChange={e =>
                setForm({ ...form, email: e.target.value })
              }
            />
            <input
              className="input"
              placeholder="Phone"
              value={form.phone}
              onChange={e =>
                setForm({ ...form, phone: e.target.value })
              }
            />
          </div>

          {/* 📅 CALENDAR */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* CHECK-IN */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border rounded-xl p-4 shadow-sm"
            >
              <p className="text-sm font-semibold mb-3">
                Check-in Date
              </p>
              <DayPicker
                mode="single"
                selected={form.checkIn}
                onSelect={date =>
                  setForm({ ...form, checkIn: date, checkOut: null })
                }
                disabled={disabledDays}
                className="rdp-sm"
                modifiersClassNames={{
                  disabled:
                    "opacity-40 blur-[1px] cursor-not-allowed",
                  selected:
                    "bg-[#F4612B] text-white"
                }}
              />
            </motion.div>

            {/* CHECK-OUT */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border rounded-xl p-4 shadow-sm"
            >
              <p className="text-sm font-semibold mb-3">
                Check-out Date
              </p>
              <DayPicker
                mode="single"
                selected={form.checkOut}
                onSelect={date =>
                  setForm({ ...form, checkOut: date })
                }
                disabled={[
                  ...disabledDays,
                  { before: form.checkIn || today }
                ]}
                className="rdp-sm"
                modifiersClassNames={{
                  disabled:
                    "opacity-40 blur-[1px] cursor-not-allowed",
                  selected:
                    "bg-[#F4612B] text-white"
                }}
              />
            </motion.div>
          </div>

          {/* LEGEND */}
          <div className="flex gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-[#F4612B] rounded"></span>
              Selected
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-gray-300 rounded blur-[1px]"></span>
              Booked
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-gray-100 rounded"></span>
              Available
            </div>
          </div>

          {/* ROOMS */}
          {/* <input
            type="number"
            min={1}
            max={availableRooms}
            className="input w-32"
            value={form.rooms}
            onChange={e =>
              setForm({ ...form, rooms: Number(e.target.value) })
            }
          /> */}
          <div className="space-y-1">
  <label className="text-sm font-semibold text-gray-700">
    Number of Rooms
  </label>

  <input
    type="number"
    min={1}
    max={availableRooms}
    className="input w-40"
    value={form.rooms}
    onChange={e =>
      setForm({
        ...form,
        rooms: Number(e.target.value)
      })
    }
  />

  <p className="text-xs text-gray-500">
    Maximum available: {availableRooms} rooms
  </p>
</div>
    
        </div>

        {/* ================= RIGHT ================= */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit lg:mt-10 mr-5 lg:ml-[-30px] m-5 ">
          <h2 className="text-xl font-bold mb-4">
            Booking Summary
          </h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Room Price</span>
              <span>₹{room.price}</span>
            </div>
            <div className="flex justify-between">
              <span>Nights</span>
              <span>{nights}</span>
            </div>
            <div className="flex justify-between font-bold text-[#F4612B]">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          <button
            onClick={confirmBooking}
            disabled={loading || hasBlockedDate || totalAmount === 0}
            className="mt-6 w-full bg-[#F4612B] text-white py-3 rounded-lg
                       disabled:opacity-50"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
