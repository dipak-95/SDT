import { useState } from "react";
import {
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiMessageSquare,
  FiBriefcase,
  FiHome,
  FiClock
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Car } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

export default function QuickEnquiryModal({ open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* ================= VALIDATION ================= */
  const validate = () => {
    let err = {};

    if (!form.name.trim()) err.name = "Name is required";

    if (!form.phone.trim()) {
      err.phone = "Phone is required";
    } else if (!/^[6-9]\d{9}$/.test(form.phone)) {
      err.phone = "Enter valid 10-digit phone";
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      err.email = "Invalid email address";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return toast.error("Please fix the errors");

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:1005/Enquiry/quick-enquiry",
        form
      );
      toast.success("Enquiry submitted successfully");
      setForm({ name: "", email: "", phone: "", message: "" });
      setErrors({});
      onClose();
    } catch {
      toast.error("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

   const whatsappMessage = encodeURIComponent(
    "Hello! I want to enquire about your tour packages."
  );

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm
                   flex items-center justify-center px-3 sm:px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* MODAL */}
        <motion.div
          initial={{ scale: 0.95, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 40 }}
          transition={{ type: "spring", stiffness: 120 }}
          onClick={(e) => e.stopPropagation()}
          className="
            relative
            w-full max-w-5xl
            max-h-[90vh] overflow-y-auto
            rounded-2xl shadow-2xl
            bg-gradient-to-br from-white via-orange-50 to-orange-100
            grid grid-cols-1 md:grid-cols-2
          "
        >
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-30
                       bg-white text-[#F4612B]
                       p-2 rounded-full shadow"
          >
            <FiX />
          </button>

          {/* LEFT INFO */}
          <div className="p-5 sm:p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Trusted Travel Experts
              </h2>

              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                With <span className="font-semibold text-[#F4612B]">8+ years</span>{" "}
                experience, we offer tours, hotels & car rentals.
              </p>

              <div className="space-y-6">
                <Info icon={<FiBriefcase />} title="Tour Packages" text="Group & private tours" />
                <Info icon={<FiHome />} title="Hotel Bookings" text="Budget to luxury stays" />
                <Info icon={<Car size={20} />} title="Car Rentals" text="Vehicles with drivers" />
                <Info icon={<FiClock />} title="Quick Support" text="Fast response team" />
              </div>
            </div>
 <motion.a
  href={`https://wa.me/919979922797?text=${whatsappMessage}`}
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  className="
    relative
    w-full
    mt-6
    bg-green-500 hover:bg-green-600
    text-white
    py-3
    rounded-xl
    shadow-lg
    overflow-hidden
    flex items-center justify-center gap-3
  "
>
  {/* SHINE EFFECT */}
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
    initial={{ x: "-120%" }}
    animate={{ x: "120%" }}
    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
  />

  <FaWhatsapp className="text-xl relative z-10" />

  <span className="text-sm sm:text-base font-semibold relative z-10">
    Discuss on WhatsApp
  </span>
</motion.a>

          </div>

          {/* RIGHT FORM */}
          <div className="bg-white border-t md:border-t-0 md:border-l">
            <div className="bg-[#F4612B] px-5 py-4 text-white">
              <h2 className="text-lg font-bold">Quick Enquiry</h2>
              <p className="text-xs text-white/90">
                Get expert help for your journey
              </p>
            </div>

            <form className="p-5 space-y-4" onSubmit={handleSubmit}>
              <Input icon={<FiUser />} placeholder="Your Name" value={form.name}
                error={errors.name} onChange={(v) => setForm({ ...form, name: v })} />

              <Input icon={<FiMail />} placeholder="Email Address" value={form.email}
                error={errors.email} onChange={(v) => setForm({ ...form, email: v })} />

              <Input icon={<FiPhone />} placeholder="Phone Number" value={form.phone}
                error={errors.phone} onChange={(v) => setForm({ ...form, phone: v })} />

              <div className="relative">
                <FiMessageSquare className="absolute left-3 top-3.5 text-gray-400" />
                <textarea
                  rows="3"
                  placeholder="Your Message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg
                             focus:ring-2 focus:ring-[#F4612B]
                             outline-none resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-3 rounded-full font-semibold shadow transition
                  ${loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#F4612B] text-white hover:bg-orange-600"
                  }`}
              >
                {loading ? "Submitting..." : "Submit Enquiry"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ================= SMALL COMPONENTS ================= */

function Info({ icon, title, text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-3 rounded-xl bg-orange-50 text-[#F4612B] text-lg">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-gray-800 text-sm">{title}</h4>
        <p className="text-xs text-gray-500">{text}</p>
      </div>
    </div>
  );
}

function Input({ icon, placeholder, value, onChange, error }) {
  return (
    <div>
      <div className="relative">
        <span className="absolute left-3 top-3.5 text-gray-400">{icon}</span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-3 border rounded-lg
            ${error ? "border-red-500" : "border-gray-300"}
            focus:ring-2 focus:ring-[#F4612B] outline-none`}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
