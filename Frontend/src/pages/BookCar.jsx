import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
import CarCanceletion from "../component/CarCanceletion";

const BASE_URL = "https://api.sdtour.online";

export default function BookCar() {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    persons: "",
    startDate: "",
    endDate: ""
  });

  const [days, setDays] = useState(0);
  const [total, setTotal] = useState(0);

  /* ================= FETCH CAR ================= */
  useEffect(() => {
    axios
      .get(`${BASE_URL}/cars/${id}`)
      .then(res => setCar(res.data))
      .catch(() => toast.error("Failed to load car details"));
  }, [id]);

  /* ================= CALCULATE BILL ================= */
  useEffect(() => {
    if (!car || !form.startDate || !form.endDate) return;

    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    if (end < start) return;

    const diff =
      Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    setDays(diff);
    setTotal(diff * 300 * car.pricePerKm);
  }, [form.startDate, form.endDate, car]);

  /* ================= SUBMIT ================= */
 const submit = async () => {
  if (
    !form.name ||
    !form.email ||
    !form.phone ||
    !form.startDate ||
    !form.endDate ||
    form.persons < 1
  ) {
    toast.error("Please fill all required fields");
    return;
  }

  try {
    await axios.post(`${BASE_URL}/car-booking/book`, {
      carId: car._id,

      userName: form.name,
      email: form.email,
      phone: form.phone,
      persons: form.persons,

      startDate: form.startDate,
      endDate: form.endDate,
      days,

      pricePerKm: car.pricePerKm,
      total
    });

    toast.success("Enquiry submitted successfully 🚗");

    /* ✅ RESET FORM AFTER SUCCESS */
    setForm({
      name: "",
      email: "",
      phone: "",
      persons: "",
      startDate: "",
      endDate: ""
    });

    setDays(0);
    setTotal(0);

  } catch (err) {
    console.error(err.response?.data);
    toast.error("Failed to submit enquiry");
  }
};


  /* ================= LOADING ================= */
  if (!car) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-[#F4612B]/30 border-t-[#F4612B]
          rounded-full animate-spin" />
        <p className="text-gray-500">Loading car details...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#fafafa]">

      {/* ================= HERO ================= */}
      <div className="relative w-full h-[65vh] overflow-hidden">
        <img
          src="/BookCar.webp"
          alt={car.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r
          from-black/70 via-black/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex items-center">
          <div className="text-white space-y-4 max-w-xl">
            <span className="inline-block bg-[#F4612B] px-4 py-1 rounded-full
              text-sm font-semibold uppercase">
              {car.type}
            </span>

            <h1 className="text-3xl md:text-5xl font-extrabold">
              {car.name}
            </h1>

            <div className="flex gap-6 text-sm md:text-base">
              <span>👥 {car.seats} Seats</span>
              <span>💰 ₹{car.pricePerKm} / KM</span>
            </div>

            <p className="text-white/80 text-sm">
              Comfortable, reliable & perfect for your journey.
            </p>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="py-10">
        <div className="max-w-8xl mx-auto px-15 grid lg:grid-cols-3">

          {/* ================= FORM ================= */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white rounded-3xl shadow-xl shadow-gray-100 p-8 md:p-10 border border-gray-100 h-fit"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-8 bg-[#F4612B] rounded-full" />
              <h2 className="text-2xl font-bold text-gray-900">
                Confirm Your Journey
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* PRIMARY DETAILS */}
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <input
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-[#F4612B] focus:bg-white px-5 py-4 rounded-2xl outline-none transition-all font-semibold text-gray-700"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                <input
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-[#F4612B] focus:bg-white px-5 py-4 rounded-2xl outline-none transition-all font-semibold text-gray-700"
                  placeholder="WhatsApp Number"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <input
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-[#F4612B] focus:bg-white px-5 py-4 rounded-2xl outline-none transition-all font-semibold text-gray-700"
                  placeholder="example@mail.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Total Passengers</label>
                <input
                  type="number"
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-[#F4612B] focus:bg-white px-5 py-4 rounded-2xl outline-none transition-all font-semibold text-gray-700"
                  placeholder="How many people?"
                  value={form.persons}
                  onChange={e => setForm({ ...form, persons: Number(e.target.value) })}
                />
              </div>

              {/* DATE SELECTION */}
              <div className="md:col-span-2 pt-4">
                <div className="h-px bg-gray-100 w-full mb-8" />
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 block ml-1">Pick Journey Dates</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                     <span className="text-[10px] font-bold text-gray-400 uppercase ml-1">Start Date</span>
                     <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-[#F4612B] focus:bg-white px-5 py-4 rounded-2xl outline-none transition-all font-semibold text-gray-700"
                      value={form.startDate}
                      onChange={e => setForm({ ...form, startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase ml-1">End Date</span>
                    <input
                      type="date"
                      min={form.startDate || new Date().toISOString().split("T")[0]}
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-[#F4612B] focus:bg-white px-5 py-4 rounded-2xl outline-none transition-all font-semibold text-gray-700"
                      value={form.endDate}
                      onChange={e => setForm({ ...form, endDate: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={submit}
                className="md:col-span-2 w-full py-5 rounded-3xl font-bold text-white
                bg-[#F4612B] hover:bg-[#e14c1f] shadow-xl shadow-orange-100 
                active:scale-[0.98] transition-all text-lg mt-4"
              >
                Book This Journey
              </button>
            </div>
          </motion.div>

          {/* ================= RIGHT ================= */}
          <div className="space-y-6 lg:ml-8 mt-10 lg:mt-0">

            {/* SUMMARY */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-xl shadow-gray-100 p-8 border border-gray-50"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="p-2 bg-orange-50 text-[#F4612B] rounded-xl text-lg">📝</span>
                Fare Details
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Applied Rate</span>
                  <span className="font-bold text-gray-900">₹{car.pricePerKm} / KM</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Daily Limit (Min)</span>
                  <span className="font-bold text-gray-900">300 KM / Day</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Duration</span>
                  <span className="font-bold text-gray-900">{days} Days</span>
                </div>
                
                {days > 0 && (
                  <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100 space-y-2">
                    <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">Calculation Breakdown</p>
                    <div className="flex justify-between items-center text-xs">
                       <span className="text-gray-600 font-medium">Min Distance ({days} × 300)</span>
                       <span className="font-bold text-gray-800">{days * 300} KM</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                       <span className="text-gray-600 font-medium">Rate ({days * 300} × {car.pricePerKm})</span>
                       <span className="font-bold text-gray-800">₹{total}</span>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2">
                  <div className="space-y-1">
                    <span className="text-sm font-bold text-gray-900">Final Summary</span>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">* Excluding Toll & Parking</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-2xl font-black text-[#F4612B]">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* POLICY */}
            <CarCanceletion />

          </div>
        </div>
      </div>
    </div>
  );
}
