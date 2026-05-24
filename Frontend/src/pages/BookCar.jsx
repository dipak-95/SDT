import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import CarCanceletion from "../component/CarCanceletion";
import { ArrowLeft, CheckCircle, Info } from "lucide-react";

const API_BASE = "https://api.sdtour.online";

/* ===== HELPER FOR RAZORPAY ===== */
const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

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
    endDate: "",
    note: ""
  });

  const [days, setDays] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentType, setPaymentType] = useState("advance"); // advance | full

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

  // Breakdown values
  const advanceAmount = Math.round(total * 0.3);
  const payableAmount = paymentType === "full" ? total : advanceAmount;
  const remainingAmount = paymentType === "full" ? 0 : total - advanceAmount;

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.startDate || !form.endDate) {
      return toast.error("Please fill all required fields");
    }
    if (!/^\d{10}$/.test(form.phone)) {
      return toast.error("Please enter a valid 10-digit phone number");
    }

    setLoading(true);
    try {
      // 1. Load Razorpay script
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        toast.error("Razorpay SDK failed to load ❌");
        setLoading(false);
        return;
      }

      // 2. Create the Car Booking in Database (status: pending)
      const bookingRes = await axios.post(`${API_BASE}/car-booking/book`, {
        carId: car._id,
        userName: form.name,
        email: form.email,
        phone: form.phone,
        startDate: form.startDate,
        endDate: form.endDate,
        days,
        pricePerKm: car.pricePerKm,
        total,
        note: form.note,
        paymentType,
        payableAmount,
        remainingAmount
      });

      const carBookingId = bookingRes.data.booking._id;

      // 3. Create the order on the backend for Razorpay
      const orderRes = await axios.post(`${API_BASE}/order/create`, {
        serviceType: "car",
        amount: Number(payableAmount)
      });

      const { keyId, order } = orderRes.data;

      // 4. Open Razorpay Window
      const options = {
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Saurashtra Darshan Tour",
        description: `Car Booking for ${car.name}`,
        order_id: order.id,
        handler: async (response) => {
          try {
            setLoading(true);
            // 5. Verify the Payment
            const verifyRes = await axios.post(`${API_BASE}/order/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              carBookingId
            });

            if (verifyRes.data.success) {
              toast.success("Car Booking & Payment Confirmed! 🚗🎉");
              navigate("/rental-car");
            } else {
              toast.error("Payment verification failed ❌");
            }
          } catch (err) {
            toast.error("Payment verification failed ❌");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: form.name,
          email: form.email || "",
          contact: form.phone
        },
        theme: { color: "#ea580c" } // Orange color
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Failed to initiate booking payment");
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
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="p-2.5 rounded-full bg-gray-100 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">Confirm Your <span className="text-orange-600">Booking</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="md:col-span-2 space-y-1">
              <label className="font-bold text-gray-400 uppercase text-[10px]">Full Name *</label>
              <input 
                className="w-full bg-gray-50 border-2 border-transparent focus:border-orange-500 rounded-2xl px-5 py-4 outline-none font-semibold transition-all"
                placeholder="Enter Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-gray-400 uppercase text-[10px]">Phone Number *</label>
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
              <label className="font-bold text-gray-400 uppercase text-[10px]">Start Date *</label>
              <input type="date" className="w-full bg-gray-50 border-2 border-transparent focus:border-orange-500 rounded-2xl px-5 py-4 outline-none font-semibold"
                value={form.startDate} min={new Date().toISOString().split("T")[0]} onChange={e => setForm({...form, startDate: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-gray-400 uppercase text-[10px]">End Date *</label>
              <input type="date" className="w-full bg-gray-50 border-2 border-transparent focus:border-orange-500 rounded-2xl px-5 py-4 outline-none font-semibold"
                value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} min={form.startDate || new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="md:col-span-2 space-y-1">
              <label className="font-bold text-gray-400 uppercase text-[10px]">Special Instructions (optional)</label>
              <textarea 
                className="w-full bg-gray-50 border-2 border-transparent focus:border-orange-500 rounded-2xl px-5 py-4 outline-none font-semibold transition-all"
                rows="3" placeholder="Any special requests or instructions..." value={form.note} onChange={e => setForm({...form, note: e.target.value})}
              />
            </div>

            {/* Payment Mode Selector */}
            <div className="md:col-span-2 mt-4">
              <label className="font-bold text-gray-400 uppercase text-[10px] mb-2 block">Choose Payment Mode</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  onClick={() => setPaymentType("advance")}
                  className={`border-2 rounded-2xl p-4 cursor-pointer transition-all flex flex-col justify-between ${paymentType === 'advance' ? 'border-orange-500 bg-orange-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <span className="font-bold text-gray-900">Pay 30% Advance</span>
                  <span className="text-sm text-gray-500 mt-1">Reserve by paying advance, rest paid on trip</span>
                  <span className="text-lg font-black text-orange-600 mt-2">₹{advanceAmount.toLocaleString()}</span>
                </div>
                <div 
                  onClick={() => setPaymentType("full")}
                  className={`border-2 rounded-2xl p-4 cursor-pointer transition-all flex flex-col justify-between ${paymentType === 'full' ? 'border-orange-500 bg-orange-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <span className="font-bold text-gray-900">Pay Full Amount</span>
                  <span className="text-sm text-gray-500 mt-1">Pay complete amount online now</span>
                  <span className="text-lg font-black text-orange-600 mt-2">₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={handleSubmit} disabled={loading || !days}
              className={`md:col-span-2 w-full py-5 text-white font-bold rounded-2xl shadow-xl transition-all uppercase tracking-widest mt-6 flex items-center justify-center gap-2 ${
                loading || !days ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Confirm & Pay ₹{payableAmount.toLocaleString()}
                </>
              )}
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
              
              {days > 0 && (
                <>
                  <div className="flex justify-between border-b pb-3">
                    <span className="text-gray-500">Total Price</span>
                    <span className="font-bold text-gray-900">₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-b pb-3 text-orange-600">
                    <span>Payable Now ({paymentType === "advance" ? "30% Advance" : "Full"})</span>
                    <span className="font-bold">₹{payableAmount.toLocaleString()}</span>
                  </div>
                  {paymentType === "advance" && (
                    <div className="flex justify-between border-b pb-3 text-gray-500">
                      <span>Remaining Balance</span>
                      <span className="font-bold">₹{remainingAmount.toLocaleString()}</span>
                    </div>
                  )}
                </>
              )}

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
