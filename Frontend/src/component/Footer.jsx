import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaArrowUp,
} from "react-icons/fa6";
import { ScrollToTopButton } from "./ScrollToTopButton";

export default function Footer() {
  

  /* ================= DATA ================= */
  const whatsappMessage = encodeURIComponent(
    "Hello, I am interested in your tours. Please share details."
  );

  const socialLinks = [
    { icon: FaFacebookF, url: "https://facebook.com" },
    { icon: FaInstagram, url: "https://instagram.com" },
    { icon: FaEnvelope, url: "mailto:saurashtradarshantour@gmail.com" },
  ];

  const companyLinks = [
    { label: "How To Book", path: "/tours/group" },
    { label: "Hotel Booking", path: "/hotels" },
    { label: "Car Rental", path: "/rentalcar" },
    { label: "Payment Options", path: "/payment-options" },
    { label: "Our Journey", path: "/pastjournies" },
  ];

  const supportLinks = [
    { label: "Contact Us", path: "/contact" },
    { label: "Guest Review", path: "/pastjournies" },
    { label: "Booking Policy", path: "/booking-policy" },
    { label: "Refund Policy", path: "/refund-policy" },
  ];

  const destinationLinks = [
    { label: "Dwarka Tour", path: "/tours/group" },
    { label: "Somnath Tour", path: "/tours/group" },
    { label: "Gir Tour", path: "/tours/group" },
    { label: "Kutch Tour", path: "/tours/group" },
    { label: "Vadodara Tour", path: "/tours/group" },
  ];

  const packageLinks = [
    { label: "Dwarka Somnath Tour", path: "/tours/group" },
    { label: "Gir Safari Tour", path: "/tours/group" },
    { label: "Somnath Gir Diu Tour", path: "/tours/group" },
    { label: "Statue of Unity Tour", path: "/tours/group" },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#071c1f] to-[#020d10] text-white pt-16 relative">

      {/* ================= TOP FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:flex-wrap lg:flex-nowrap lg:justify-between">
          {[companyLinks, supportLinks, destinationLinks, packageLinks].map(
            (links, idx) => (
              <div key={idx} className="w-full sm:w-[45%] lg:w-[22%]">
                <h4 className="text-lg font-semibold mb-4">
                  {["Company", "Support", "Destinations", "Packages"][idx]}
                </h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  {links.map((item, i) => (
                    <li key={i}>
                      <Link
                        to={item.path}
                        className="hover:text-[#F4612B] transition"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="bg-white text-gray-800 mt-16 rounded-t-3xl">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

          <div>
            <img src="/logo.webp" alt="Logo" className="h-12 mb-3" />
            <p className="text-sm text-gray-600">
              Travel with Gujarat experts for authentic and seamless journeys.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Contact</h4>
            <p className="text-sm text-gray-600">
              Veraval, Gujarat 362265, India
            </p>
            <p className="text-sm mt-1">📞 +91 9979922797</p>
            <p className="text-sm">✉️ saurashtradarshantour@gmail.com</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Social Media</h4>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, url }, i) => (
                <motion.a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15 }}
                  className="w-10 h-10 rounded-full bg-[#F4612B] text-white flex items-center justify-center"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= SCROLL TO TOP ================= */}
     <ScrollToTopButton />
      {/* ================= WHATSAPP ================= */}
      <motion.a
        href={`https://wa.me/919979922797?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-28 right-12 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex flex-row-reverse items-center group transition-all duration-300"
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-full"
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        
        <FaWhatsapp className="text-2xl relative z-10 shrink-0" />
        
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold relative z-10 group-hover:max-w-[200px] group-hover:mr-3 transition-all duration-500 ease-in-out">
          Discuss on WhatsApp
        </span>
      </motion.a>
    </footer>
  );
}
