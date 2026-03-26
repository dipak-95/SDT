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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-lg
            p-6 md:p-8 max-w-3xl"
          >
            <h2 className="text-xl md:text-2xl font-bold text-[#F4612B] mb-6">
              Traveller Details
            </h2>

            <div className="space-y-8">
              <input
                className="input-field"
                placeholder="Full Name *"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />

              <input
                className="input-field"
                placeholder="Email *"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />

              <input
                className="input-field"
                placeholder="Phone *"
                value={form.phone}
                onChange={e =>
                  setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })
                }
              />

              <input
                type="number"
                className="input-field"
                placeholder="Number of persons"
                value={form.persons}
                onChange={e =>
                  setForm({ ...form, persons: Number(e.target.value) })
                }
              />

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="date"
                  className="input-field"
                  value={form.startDate}
                  onChange={e =>
                    setForm({ ...form, startDate: e.target.value })
                  }
                />
                <input
                  type="date"
                  className="input-field"
                  value={form.endDate}
                  onChange={e =>
                    setForm({ ...form, endDate: e.target.value })
                  }
                />
              </div>

              <button
                onClick={submit}
                className="w-full py-3 rounded-full font-semibold text-white
                bg-[#F4612B] hover:bg-[#e14c1f]"
              >
                Submit Enquiry
              </button>
            </div>
          </motion.div>

          {/* ================= RIGHT ================= */}
          <div className="space-y-6">

            {/* SUMMARY */}
            <div className="bg-white rounded-2xl shadow-lg w-100 p-6">
              <h3 className="text-lg font-bold text-[#F4612B] mb-4">
                Booking Summary
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Car</span>
                  <span className="font-medium">{car.name}</span>
                </div>

                <div className="flex justify-between">
                  <span>Seats</span>
                  <span>{car.seats}</span>
                </div>

                <div className="flex justify-between">
                  <span>Duration</span>
                  <span>{days} Days</span>
                </div>

                <div className="flex justify-between border-t pt-4 font-semibold">
                  <span>Total Amount</span>
                  <span className="text-[#F4612B] text-lg">
                    ₹{total}
                  </span>
                </div>
              </div>
            </div>

            {/* POLICY */}
            <CarCanceletion />

          </div>
        </div>
      </div>
    </div>
  );
}
