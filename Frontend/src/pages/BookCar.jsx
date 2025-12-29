import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";

export default function BookCar() {
    const BASE_URL = "http://localhost:1005";
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    persons: 1,
    note: ""
  });

  /* MOCK DATA */
  const cars = [
    { id: 1, name: "Swift Dzire", type: "Car", price: 14, seats: 5 },
    { id: 2, name: "Ertiga", type: "Car", price: 22, seats: 7 },
    { id: 3, name: "Innova Crysta", type: "Car", price: 18, seats: 7 },
    { id: 4, name: "Luxury Bus", type: "Bus", price: 30, seats: 45 },
    { id: 5, name: "Bharat Benz Bus", type: "Bus", price: 40, seats: 45 },
    { id: 6, name: "Mini Bus", type: "Bus", price: 35, seats: 19 },
    { id: 7, name: "Force Urbania", type: "Tempo Traveller", price: 35, seats: 17 },
    { id: 8, name: "Maharaja", type: "Tempo Traveller", price: 32, seats: 17 }
  ];

  useEffect(() => {
    const selected = cars.find(c => c.id === Number(id));
    setCar(selected);
  }, [id]);

  /* VALIDATION */
  const validate = () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      toast.error("Enter valid email");
      return false;
    }
    if (!/^[0-9]{10}$/.test(form.phone)) {
      toast.error("Enter valid 10 digit phone number");
      return false;
    }
    if (form.persons < 1 || form.persons > car.seats) {
      toast.error(`Passengers must be between 1 and ${car.seats}`);
      return false;
    }
    return true;
  };
const submitBooking = async () => {
  if (!validate()) return;

  try {
    // 1️⃣ CREATE CAR ENQUIRY (EXISTING)
    await axios.post(`${BASE_URL}/car-booking/book`, {
      userName: form.name,
      email: form.email,
      phone: form.phone,
      persons: form.persons,
      note: form.note,

      vehicleName: car.name,
      vehicleType: car.type,
      pricePerKm: car.price,
      seats: car.seats,
    });

    // 🔥 2️⃣ CREATE ORDER FOR DASHBOARD (ENQUIRY)
    await axios.post(`${BASE_URL}/order/create`, {
      serviceType: "car",
      status: "enquiry",      // IMPORTANT
      amount: 0               // enquiry has no revenue
    });

    toast.success(
      "Car booking submitted 🚗 We will contact you within 1 hour"
    );

    setForm({
      name: "",
      email: "",
      phone: "",
      persons: 1,
      note: "",
    });

  } catch (err) {
    console.error(err);
    toast.error("Booking failed");
  }
};

  if (!car) {
    return (
      <div className="py-24 text-center text-gray-500">
        Loading car details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <div className="relative h-[65vh]">
        <img
          src="/BookCar.webp"
          alt="Car Booking"
          className="absolute inset-0 w-full h-full object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex items-center justify-center text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Book Your Ride
            <span className="block text-orange-500 mt-2">
              {car.name}
            </span>
          </h1>
        </div>
      </div>

      {/* FORM */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-orange-500 mb-6">
            Booking Details
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <input
              value={car.name}
              readOnly
              className="border p-3 rounded-lg bg-gray-100 font-semibold"
            />
            <input
              value={car.type}
              readOnly
              className="border p-3 rounded-lg bg-gray-100 font-semibold"
            />
            <input
              value={`₹${car.price} / KM`}
              readOnly
              className="border p-3 rounded-lg bg-gray-100 font-semibold"
            />
            <input
              value={`${car.seats} Seats`}
              readOnly
              className="border p-3 rounded-lg bg-gray-100 font-semibold"
            />
          </div>

          <div className="space-y-4">
            <input
              placeholder="Full Name *"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full border p-3 rounded-lg focus:outline-orange-500"
            />

            <input
              type="email"
              placeholder="Email Address *"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full border p-3 rounded-lg focus:outline-orange-500"
            />

            <input
              type="tel"
              placeholder="Phone Number *"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full border p-3 rounded-lg focus:outline-orange-500"
            />

            <input
              type="number"
              min="1"
              max={car.seats}
              placeholder="Number of Passengers"
              value={form.persons}
              onChange={e => setForm({ ...form, persons: e.target.value })}
              className="w-full border p-3 rounded-lg focus:outline-orange-500"
            />

            <textarea
              rows="3"
              placeholder="Special Request (optional)"
              value={form.note}
              onChange={e => setForm({ ...form, note: e.target.value })}
              className="w-full border p-3 rounded-lg focus:outline-orange-500"
            />

            <button
              onClick={submitBooking}
              className="
                w-full
                bg-orange-500
                text-white
                py-3
                rounded-full
                font-semibold
                hover:bg-orange-600
                transition
              "
            >
              Submit Booking Request
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
