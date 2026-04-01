import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import CarCanceletion from "../component/CarCanceletion";

const API_BASE = "https://api.sdtour.online";

export default function BookCar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: "",
    endDate: ""
  });

  const [days, setDays] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get(`${API_BASE}/cars/${id}`)
      .then(res => setCar(res.data))
      .catch(() => toast.error("Failed to load car details"));
  }, [id]);

  useEffect(() => {
    if (!car || !form.startDate || !form.endDate) return;
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    if (end < start) {
      setDays(0);
      setTotal(0);
      return;
    }
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    setDays(diff);
    setTotal(diff * 300 * car.pricePerKm);
  }, [form.startDate, form.endDate, car]);

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.startDate || !form.endDate) {
      return toast.error("Please fill all required fields");
    }
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/car-booking/book`, {
        carId: car._id,
        userName: form.name,
        email: form.email,
        phone: form.phone,
        startDate: form.startDate,
        endDate: form.endDate,
        days,
        pricePerKm: car.pricePerKm,
        total
      });
      toast.success("Enquiry submitted successfully 🚗");
      navigate("/rental-car");
    } catch (err) {
      toast.error("Failed to submit enquiry");
    } finally {
      setLoading(false);
    }
  };

  if (!car) return <div className="h-96 flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 overflow-x-hidden">
      {/* HERO */}
      <div className="relative h-[40vh] md:h-[55vh] w-full overflow-hidden">
        <img src="/BookCar.webp" alt={car.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-6 w-full text-white">
            <span className="bg-orange-600 px-3 py-1 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest">{car.type}</span>
            <h1 className="text-3xl md:text-6xl font-black mt-4 uppercase tracking-tighter drop-shadow-lg">{car.name}</h1>
            <div className="h-1 w-20 bg-orange-500 mx-auto mt-4 rounded-full"></div>
            <p className="mt-4 text-sm md:text-lg text-gray-300 font-medium lowercase italic opacity-80 decoration-orange-500">Premium • Reliable • Comfortable</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-16 md:-mt-24 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FORM */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-2xl p-6 md:p-12 border border-white">
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-8 tracking-tight">Confirm Your <span className="text-orange-600">Booking</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="md:col-span-2 space-y-1">
              <label className="font-bold text-gray-400 uppercase text-[10px]">Full Name</label>
              <input 
                className="w-full bg-gray-50 border-2 border-transparent focus:border-orange-500 rounded-2xl px-5 py-4 outline-none font-semibold transition-all"
                placeholder="Enter Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-gray-400 uppercase text-[10px]">Phone Number</label>
              <input 
                className="w-full bg-gray-50 border-2 border-transparent focus:border-orange-500 rounded-2xl px-5 py-4 outline-none font-semibold transition-all"
                placeholder="WhatsApp Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-gray-400 uppercase text-[10px]">Email (optional)</label>
              <input 
                className="w-full bg-gray-50 border-2 border-transparent focus:border-orange-500 rounded-2xl px-5 py-4 outline-none font-semibold transition-all"
                placeholder="Email Address" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-gray-400 uppercase text-[10px]">Start Date</label>
              <input type="date" className="w-full bg-gray-50 border-2 border-transparent focus:border-orange-500 rounded-2xl px-5 py-4 outline-none font-semibold"
                value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-gray-400 uppercase text-[10px]">End Date</label>
              <input type="date" className="w-full bg-gray-50 border-2 border-transparent focus:border-orange-500 rounded-2xl px-5 py-4 outline-none font-semibold"
                value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} min={form.startDate}
              />
            </div>
            <button 
              onClick={handleSubmit} disabled={loading}
              className="md:col-span-2 w-full py-5 bg-orange-600 text-white font-bold rounded-2xl shadow-xl hover:bg-orange-700 transition-all uppercase tracking-widest mt-4"
            >
              {loading ? "Submitting..." : "Book This Journey"}
            </button>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Fare Summary</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b pb-3">
                <span className="text-gray-500">Rate</span>
                <span className="font-bold text-gray-900">₹{car.pricePerKm} / KM</span>
              </div>
              <div className="flex justify-between border-b pb-3">
                <span className="text-gray-500">Daily Min Limit</span>
                <span className="font-bold text-gray-900">300 KM</span>
              </div>
              <div className="flex justify-between border-b pb-3">
                <span className="text-gray-500">Duration</span>
                <span className="font-bold text-gray-900">{days} Days</span>
              </div>
              <div className="flex justify-between items-center bg-orange-50 p-4 rounded-2xl">
                <span className="text-orange-800 font-bold">Estimated Total</span>
                <span className="text-2xl font-black text-orange-600">₹{total.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-gray-400 text-center">* Toll, Taxes & Parking extra</p>
            </div>
          </div>
          <CarCanceletion />
        </div>
      </div>
    </div>
  );
}
