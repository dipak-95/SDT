// import {
//   FiX,
//   FiUser,
//   FiMail,
//   FiPhone,
//   FiMessageSquare,
//   FiBriefcase,
//   FiHome,
//   FiClock
// } from "react-icons/fi";
// import { FaWhatsapp } from "react-icons/fa";
// import { Car } from "lucide-react";
// import { AnimatePresence,motion } from "framer-motion";

// export default function QuickEnquiryModal({ open, onClose }) {
//   return (
//     <AnimatePresence>
//       {open && (
//         <motion.div
//           className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm
//                      flex items-center justify-center px-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={onClose}
//         >
//           {/* MODAL CARD */}
//           <motion.div
//             initial={{ scale: 0.9, y: 30 }}
//             animate={{ scale: 1, y: 0 }}
//             exit={{ scale: 0.9, y: 30 }}
//             transition={{ type: "spring", stiffness: 120 }}
//             onClick={(e) => e.stopPropagation()}
//             className="relative w-full max-w-5xl rounded-2xl shadow-2xl
//                        overflow-hidden grid grid-cols-1 md:grid-cols-2
//                        bg-gradient-to-br from-white via-orange-50 to-orange-100"
//           >
//             {/* CLOSE BUTTON (FIXED – NO JUMP) */}
//             <button
//               onClick={onClose}
//               className="absolute top-4 right-4 z-20
//                          bg-white/90 hover:bg-white
//                          text-[#F4612B] p-2 rounded-full
//                          shadow transition"
//             >
//               <FiX />
//             </button>

//             {/* ================= LEFT INFO ================= */}
//             <div className="p-8 flex flex-col justify-between">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900 mb-2">
//                   Trusted Travel Experts
//                 </h2>

//                 <p className="text-gray-600 text-sm leading-relaxed mb-6">
//                   With over{" "}
//                   <span className="font-semibold text-[#F4612B]">
//                     8+ years
//                   </span>{" "}
//                   of experience, we provide expertly planned tours, hotel
//                   bookings, and reliable car rentals for a smooth and
//                   stress-free journey.
//                 </p>

//                 {/* SERVICES */}
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-4">
//                     <div className="p-3 rounded-xl bg-orange-50 text-[#F4612B]">
//                       <FiBriefcase className="text-xl" />
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-800">
//                         Tour Packages
//                       </h4>
//                       <p className="text-sm text-gray-500">
//                         Group & customized private tours
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-4">
//                     <div className="p-3 rounded-xl bg-orange-50 text-[#F4612B]">
//                       <FiHome className="text-xl" />
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-800">
//                         Hotel Bookings
//                       </h4>
//                       <p className="text-sm text-gray-500">
//                         Budget to luxury stays
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-4">
//                     <div className="p-3 rounded-xl bg-orange-50 text-[#F4612B]">
//                       <Car size={22} />
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-800">
//                         Car Rentals
//                       </h4>
//                       <p className="text-sm text-gray-500">
//                         Comfortable vehicles with drivers
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-4">
//                     <div className="p-3 rounded-xl bg-orange-50 text-[#F4612B]">
//                       <FiClock className="text-xl" />
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-800">
//                         Quick Support
//                       </h4>
//                       <p className="text-sm text-gray-500">
//                         Fast response & expert assistance
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* WHATSAPP CTA */}
//               <a
//                 href="https://wa.me/91XXXXXXXXXX"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="mt-6 flex items-center justify-center gap-3
//                            bg-green-500 hover:bg-green-600
//                            text-white py-3 rounded-xl
//                            font-semibold transition shadow"
//               >
//                 <FaWhatsapp className="text-xl" />
//                 Chat on WhatsApp
//               </a>
//             </div>

//             {/* ================= RIGHT FORM ================= */}
//             <div className="bg-white border-l">
//               <div className="bg-[#F4612B] px-6 py-4 text-white">
//                 <h2 className="text-xl font-bold">Quick Enquiry</h2>
//                 <p className="text-sm text-white/90">
//                   Get expert help for your journey
//                 </p>
//               </div>

//               <form className="p-6 space-y-4">
//                 <div className="relative">
//                   <FiUser className="absolute left-3 top-3.5 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Your Name"
//                     className="w-full pl-10 pr-4 py-3 border rounded-lg
//                                focus:ring-2 focus:ring-[#F4612B] outline-none"
//                   />
//                 </div>

//                 <div className="relative">
//                   <FiMail className="absolute left-3 top-3.5 text-gray-400" />
//                   <input
//                     type="email"
//                     placeholder="Email Address"
//                     className="w-full pl-10 pr-4 py-3 border rounded-lg
//                                focus:ring-2 focus:ring-[#F4612B] outline-none"
//                   />
//                 </div>

//                 <div className="relative">
//                   <FiPhone className="absolute left-3 top-3.5 text-gray-400" />
//                   <input
//                     type="tel"
//                     placeholder="Phone Number"
//                     className="w-full pl-10 pr-4 py-3 border rounded-lg
//                                focus:ring-2 focus:ring-[#F4612B] outline-none"
//                   />
//                 </div>

//                 <div className="relative">
//                   <FiMessageSquare className="absolute left-3 top-3.5 text-gray-400" />
//                   <textarea
//                     rows="3"
//                     placeholder="Your Message"
//                     className="w-full pl-10 pr-4 py-3 border rounded-lg
//                                focus:ring-2 focus:ring-[#F4612B]
//                                outline-none resize-none"
//                   />
//                 </div>

//                 <motion.button
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.97 }}
//                   className="w-full bg-[#F4612B] text-white py-3
//                              rounded-full font-semibold shadow
//                              hover:bg-orange-600 transition"
//                 >
//                   Submit Enquiry
//                 </motion.button>
//               </form>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

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

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:1005/Enquiry/quick-enquiry",
        form
      );

      toast.success("Enquiry submitted successfully");

      setForm({
        name: "",
        email: "",
        phone: "",
        message: ""
      });

      setErrors({});
      onClose();
    } catch {
      toast.error("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm
                   flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* MODAL CARD */}
        <motion.div
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 30 }}
          transition={{ type: "spring", stiffness: 120 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl rounded-2xl shadow-2xl
                     overflow-hidden grid grid-cols-1 md:grid-cols-2
                     bg-gradient-to-br from-white via-orange-50 to-orange-100"
        >
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20
                       bg-white/90 hover:bg-white
                       text-[#F4612B] p-2 rounded-full
                       shadow transition"
          >
            <FiX />
          </button>

          {/* ================= LEFT INFO ================= */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Trusted Travel Experts
              </h2>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                With <span className="font-semibold text-[#F4612B]">8+ years</span>{" "}
                of experience, we offer tours, hotels & car rentals.
              </p>

              <div className="space-y-4">
                <Info icon={<FiBriefcase />} title="Tour Packages" text="Group & private tours" />
                <Info icon={<FiHome />} title="Hotel Bookings" text="Budget to luxury stays" />
                <Info icon={<Car size={20} />} title="Car Rentals" text="Vehicles with drivers" />
                <Info icon={<FiClock />} title="Quick Support" text="Fast response team" />
              </div>
            </div>

            <a
              href="https://wa.me/919979922797"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-3
                         bg-green-500 hover:bg-green-600
                         text-white py-3 rounded-xl
                         font-semibold transition shadow"
            >
              <FaWhatsapp className="text-xl" />
              Chat on WhatsApp
            </a>
          </div>

          {/* ================= RIGHT FORM ================= */}
          <div className="bg-white border-l">
            <div className="bg-[#F4612B] px-6 py-4 text-white">
              <h2 className="text-xl font-bold">Quick Enquiry</h2>
              <p className="text-sm text-white/90">
                Get expert help for your journey
              </p>
            </div>

            <form className="p-6 space-y-4" onSubmit={handleSubmit}>
              {/* NAME */}
              <Input
                icon={<FiUser />}
                placeholder="Your Name"
                value={form.name}
                error={errors.name}
                onChange={(v) => setForm({ ...form, name: v })}
              />

              {/* EMAIL */}
              <Input
                icon={<FiMail />}
                placeholder="Email Address"
                value={form.email}
                error={errors.email}
                onChange={(v) => setForm({ ...form, email: v })}
              />

              {/* PHONE */}
              <Input
                icon={<FiPhone />}
                placeholder="Phone Number"
                value={form.phone}
                error={errors.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
              />

              {/* MESSAGE */}
              <div className="relative">
                <FiMessageSquare className="absolute left-3 top-3.5 text-gray-400" />
                <textarea
                  rows="3"
                  placeholder="Your Message"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 border rounded-lg
                             focus:ring-2 focus:ring-[#F4612B]
                             outline-none resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.03 } : {}}
                whileTap={!loading ? { scale: 0.97 } : {}}
                className={`w-full py-3 rounded-full font-semibold shadow transition
                  ${
                    loading
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
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-xl bg-orange-50 text-[#F4612B] text-xl">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <p className="text-sm text-gray-500">{text}</p>
      </div>
    </div>
  );
}

function Input({ icon, placeholder, value, onChange, error }) {
  return (
    <div>
      <div className="relative">
        <span className="absolute left-3 top-3.5 text-gray-400">
          {icon}
        </span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-3 border rounded-lg
            ${
              error ? "border-red-500" : "border-gray-300"
            }
            focus:ring-2 focus:ring-[#F4612B] outline-none`}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
