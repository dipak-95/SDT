import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus, FiMail, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            q: "How do I book a tour package?",
            a: "Select your preferred package, click on 'Check Availability', and follow the booking and payment steps.",
        },
        {
            q: "Can I customize a tour package?",
            a: "Yes, our itineraries are flexible. Contact our support team to modify activities, destinations, or duration.",
        },
        {
            q: "What payment methods do you accept?",
            a: "Currently, we accept secure online bank transfers.",
        },
        {
            q: "How do I receive my booking confirmation?",
            a: "After payment, a confirmation email with full itinerary details will be sent to you.",
        },
        {
            q: "Can I cancel my booking?",
            a: "Yes, cancellation is allowed as per our policy. Charges may apply based on the package.",
        },
        {
            q: "What is included in the tour packages?",
            a: "Accommodation, meals, sightseeing, and transfers are usually included. Please check package details.",
        },
        {
            q: "Do I need to book in advance?",
            a: "Advance booking is recommended, especially during peak travel seasons.",
        },
        {
            q: "What should I pack for the tour?",
            a: "Comfortable clothing, sunscreen, medications, and personal essentials based on destination.",
        },
        {
            q: "How do I contact customer support?",
            a: "You can reach us via phone, email, or live chat available on our website.",
        },
    ];

    return (
        <div className="min-h-screen bg-white">

            {/* ================= HERO ================= */}
            <div className="relative h-[280px] md:h-[360px]  lg:h-[420px]">
                <img
                    src="/Faq-hero.webp"
                    alt="FAQ"
                    className="absolute inset-0 w-full h-full object-fill"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />

                {/* Text Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: -25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#f4612b] tracking-wide"
                    >
                        Frequently Asked Questions
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                        className="mt-4 max-w-2xl text-sm md:text-base text-white/90"
                    >
                        Everything you need to know for a smooth, stress-free travel experience.
                    </motion.p>
                </div>
            </div>

            {/* ================= FAQ TIMELINE ================= */}
            <div className="max-w-5xl mx-auto px-4 py-16">
                <div className="relative">

                    {/* Vertical line */}
                    <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-[#F4612B]/30 hidden md:block" />

                    <div className="space-y-6">
                        {faqs.map((item, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4 }}
                                    className={`relative pl-10 md:pl-14 pr-6 py-5 rounded-xl border
                    ${isOpen
                                            ? "border-[#F4612B] bg-[#FFF4EF]"
                                            : "border-gray-200 bg-white"}
                  `}
                                >
                                    {/* Circle */}
                                    <div
                                        className={`absolute left-[2px] top-6 w-4 h-4 rounded-full border-2
                      ${isOpen
                                                ? "bg-[#F4612B] border-[#F4612B]"
                                                : "bg-white border-[#F4612B]"}
                    `}
                                    />

                                    <button
                                        onClick={() =>
                                            setOpenIndex(isOpen ? null : index)
                                        }
                                        className="w-full flex justify-between items-start text-left gap-4"
                                    >
                                        <h3 className="text-gray-800 font-semibold leading-snug">
                                            {item.q}
                                        </h3>

                                        {isOpen ? (
                                            <FiMinus className="text-[#F4612B] mt-1" />
                                        ) : (
                                            <FiPlus className="text-[#F4612B] mt-1" />
                                        )}
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.p
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.35 }}
                                                className="mt-4 text-gray-600 text-sm leading-relaxed"
                                            >
                                                {item.a}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {/* ================= HELP SECTION (FIXED ✅) ================= */}
            <div className="bg-[#f4612b] py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">

                    {/* HEADING */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl font-bold text-white"
                    >
                        Still Need Help?
                    </motion.h2>

                    {/* SUBTEXT */}
                    <p className="mt-3 text-white/90">
                        Speak directly with our travel experts for personalized assistance.
                    </p>

                    {/* BUTTONS */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

                        {/* EMAIL – DESKTOP ONLY */}
                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=saurashtradarshantour@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden lg:flex items-center gap-2
          bg-white text-[#F4612B]
          px-7 py-3 rounded-full font-semibold
          hover:bg-[#F4612B] hover:text-white
          border border-white transition"
                        >
                            <FiMail />
                            Email Support
                        </a>

                        {/* CALL – MOBILE + TABLET */}
                        <a
                            href="tel:+919979922797"
                            className="flex lg:hidden items-center justify-center gap-2
          bg-white text-[#F4612B]
          px-7 py-3 rounded-full font-semibold
          hover:bg-[#F4612B] hover:text-white
          border border-white transition"
                        >
                            <FiPhone />
                            Call Support
                        </a>

                        {/* WHATSAPP – ALL DEVICES */}
                        <a
                            href="https://wa.me/9979922797?text=Hello!%20I%20want%20to%20enquire%20about%20your%20tour%20packages."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2
          bg-[#25D366] text-white
          px-7 py-3 rounded-full font-semibold
          hover:bg-white hover:text-[#25D366]
          border border-[#25D366] transition"
                        >
                            <FaWhatsapp className="text-lg" />
                            WhatsApp Us
                        </a>

                    </div>
                </div>
            </div>


        </div>
    );
}

