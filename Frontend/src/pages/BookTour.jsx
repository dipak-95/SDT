import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import TourCancel from "../component/TourCancel";

const BASE_URL = "http://localhost:1005";



/* ===== HELPER ===== */
const getDaysNights = (startDate, endDate) => {
  if (!startDate || !endDate) return "—";
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days =
    Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  return `${days} Days / ${days - 1} Nights`;
};

export default function BookTour() {

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type"); // group | individual

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ===== PAYMENT ===== */
  const [paymentType, setPaymentType] = useState("advance"); // advance | full

  /* ===== FORM ===== */
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    persons: "",
    note: ""
  });


  const [errors, setErrors] = useState({});

  /* ===== FETCH TOUR ===== */
  useEffect(() => {
    if (id && type) fetchTour();
  }, [id, type]);

  const fetchTour = async () => {
    try {
      const endpoint =
        type === "group"
          ? `/group-tours/${id}`
          : `/individual-tours/${id}`;

      const res = await axios.get(`${BASE_URL}${endpoint}`);
      setTour(res.data);
    } catch {
      toast.error("Failed to load tour details");
    }
  };

  /* ===== VALIDATION ===== */
  const validateForm = () => {
    const e = {};

    if (!form.name.trim()) e.name = "Name is required";
    else if (!/^[a-zA-Z\s]{3,}$/.test(form.name))
      e.name = "Minimum 3 letters required";

    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email";

    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (!/^\d{10}$/.test(form.phone))
      e.phone = "Phone must be 10 digits";

    if (form.persons < 1 || form.persons > 20)
      e.persons = "Persons must be 1–20";

    if (form.note.length > 50)
      e.note = "Note max 50 characters";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ===== BILL CALCULATION ===== */
  const pricePerPerson = tour?.price || tour?.oldPrice || 0;
  const totalAmount = pricePerPerson * Number(form.persons);

  const advanceAmount = Math.round(totalAmount * 0.3);
  const payableAmount =
    paymentType === "full" ? totalAmount : advanceAmount;
  const remainingAmount =
    paymentType === "full" ? 0 : totalAmount - advanceAmount;

  /* ===== SUBMIT ===== */

  //   if (!validateForm()) {
  //     toast.error("Please fix form errors");
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     await axios.post(`${BASE_URL}/bookingtour/book-tour`, {
  //       userName: form.name,
  //       email: form.email,
  //       phone: form.phone,
  //       persons: form.persons,
  //       tourId: tour._id,
  //       tourTitle: tour.title,
  //       tourType: type,
  //       pricePerPerson,
  //       totalAmount,
  //       paymentType,
  //       payableAmount,
  //       remainingAmount,
  //       note: form.note
  //     });

  //     toast.success(
  //       "Booking submitted! Our team will contact you shortly 📞"
  //     );

  //     setForm({
  //       name: "",
  //       email: "",
  //       phone: "",
  //       persons: 1,
  //       note: ""
  //     });
  //     setErrors({});
  //     setPaymentType("advance");
  //   } catch {
  //     toast.error("Booking failed ❌");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fix form errors");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ CREATE BOOKING (EXISTING)
      await axios.post(`${BASE_URL}/bookingtour/book-tour`, {
        userName: form.name,
        email: form.email,
        phone: form.phone,
        persons: form.persons,
        tourId: tour._id,
        tourTitle: tour.title,
        tourType: type, // group | individual
        pricePerPerson,
        totalAmount,
        paymentType,
        payableAmount,
        remainingAmount,
        note: form.note
      });

      // 2️⃣ CREATE ORDER (🔥 THIS WAS MISSING)
      await axios.post(`${BASE_URL}/order/create`, {
        serviceType: type,           // ✅ USE `type`, NOT tour.type
        amount: Number(payableAmount) // ✅ number
      });

      toast.success(
        "Booking submitted! Our team will contact you shortly 📞"
      );

      // reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        persons: 1,
        note: ""
      });
      setErrors({});
      setPaymentType("advance");

    } catch (error) {
      console.error(error);
      toast.error("Booking failed ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!tour) {
    return (
      <div className="py-24 text-center text-gray-500">
        Loading booking page...
      </div>
    );
  }

  const isPersonsInvalid =
    form.persons === "" || Number(form.persons) < 2;

  return (
    <>
      {/* ===== HERO ===== */}
      <div className="relative h-[65vh]">
        <img
          src="/BookTour.webp"
          alt="Book Tour"
          className="absolute inset-0 w-full h-full object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 h-full flex items-center justify-center text-center px-4"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#f4612b]">
              Secure Tour Booking
            </h1>
            <p className="mt-3 text-gray-200">
              Trusted • Easy • Flexible Payment
            </p>
          </div>
        </motion.div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="bg-[#f8f8f8] py-14 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">

          {/* ===== FORM ===== */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[#F4612B] mb-6">
              Traveller Details
            </h2>

            {/* ===== FORM FIELDS ===== */}
            <div className="flex flex-col">

              {/* NAME */}
              <input
                placeholder="Full Name *"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full border p-3 rounded-lg focus:outline-[#f4612b] mb-6"
              />

              {/* EMAIL */}
              <input
                type="email"
                placeholder="Email *"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full border p-3 rounded-lg focus:outline-[#f4612b] mb-6"
              />

              {/* PHONE */}
              <input
                type="tel"
                placeholder="Phone *"
                maxLength={10}
                value={form.phone}
                onChange={e =>
                  setForm({
                    ...form,
                    phone: e.target.value.replace(/\D/g, "")
                  })
                }
                className="w-full border p-3 rounded-lg focus:outline-[#f4612b] mb-6"
              />

              {/* ===== PERSONS FIELD (SELF-CONTAINED SPACING) ===== */}
              <div className="mb-4">
                <input
                  type="number"
                  min="2"
                  max="100"
                  placeholder="Enter number of persons (Min 2)"
                  value={form.persons}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      setForm({ ...form, persons: "" });
                      return;
                    }
                    const num = Number(value);
                    setForm({ ...form, persons: num > 100 ? 100 : num });
                  }}
                  className={`
      w-full border p-3 rounded-lg focus:outline-none focus:ring-2
      ${isPersonsInvalid
                      ? "border-red-400 focus:ring-red-300"
                      : "border-gray-300 focus:ring-[#f4612b]"
                    }
    `}
                />

                {/* ERROR MESSAGE (ONLY WHEN INVALID) */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isPersonsInvalid ? 1 : 0,
                    height: isPersonsInvalid ? "auto" : 0,
                    marginTop: isPersonsInvalid ? "6px" : "0px"
                  }}
                  className="overflow-hidden"
                >
                  <p
                    className="
        px-3 py-2.5 mt-2 rounded-md
        bg-orange-50 border-l-4 border-orange-400
        text-xs text-orange-700
      "
                  >
                    Minimum 2 persons allowed for this tour
                  </p>
                </motion.div>
              </div>


              {/* TEXTAREA */}
              <div className="mb-6">
                <textarea
                  rows="5"
                  placeholder="Special Request (optional)"
                  maxLength={50}
                  value={form.note}
                  onChange={e =>
                    setForm({ ...form, note: e.target.value.slice(0, 50) })
                  }
                  className="w-full border p-3 rounded-lg focus:outline-[#f4612b]"
                />
                <p className="text-xs text-gray-400 text-right mt-1">
                  {form.note.length}/50 characters
                </p>
              </div>


              {/* BUTTON */}
              <button
                onClick={handleSubmit}
                disabled={loading || isPersonsInvalid}
                className={`w-full py-3 rounded-full font-semibold text-white transition
        ${loading || isPersonsInvalid
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#F4612B] hover:bg-[#e14c1f]"}
      `}
              >
                {loading ? "Submitting..." : "Confirm Booking"}
              </button>

            </div>
          </div>



          {/* ===== BILL ===== */}

          <div className="flex flex-col gap-6">

            {/* ===== STICKY BILL SECTION ===== */}
            <div className="relative">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                  <h3 className="text-xl font-bold text-[#F4612B] mb-5">
                    Booking Summary
                  </h3>

                  <div className="space-y-4 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Tour</span>
                      <span className="font-semibold">{tour.title}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Duration</span>
                      <span>
                        {getDaysNights(tour.startDate, tour.endDate)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Total Amount</span>
                      <span>₹{totalAmount}</span>
                    </div>

                    <hr />

                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          checked={paymentType === "advance"}
                          onChange={() => setPaymentType("advance")}
                        />
                        Pay 30% Advance (₹{advanceAmount})
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          checked={paymentType === "full"}
                          onChange={() => setPaymentType("full")}
                        />
                        Pay Full Amount (₹{totalAmount})
                      </label>
                    </div>

                    <hr />

                    <div className="flex justify-between text-lg font-bold text-[#F4612B]">
                      <span>Payable Now</span>
                      <span>₹{payableAmount}</span>
                    </div>

                    {paymentType === "advance" && (
                      <p className="text-xs text-gray-500">
                        Remaining ₹{remainingAmount} payable later
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ===== NON-STICKY CANCELLATION POLICY ===== */}
            <div className="relative">
              <TourCancel />
            </div>

          </div>




        </div>
      </div>
    </>
  );
}
