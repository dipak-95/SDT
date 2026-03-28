import React, { useState, useEffect } from "react";
import { FiPhone, FiSearch, FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import QuickEnquiryModal from "./QuickEnquiryModal";
import SearchOverlay from "../pages/SearchOverlay";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasScrolledOnce, setHasScrolledOnce] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const [cities, setCities] = useState([]);

useEffect(() => {
  const handleScroll = () => {
    setShowTopBar(window.scrollY <= 20);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

// 🔹 Fetch Cities dynamically
useEffect(() => {
  const fetchCities = async () => {
    try {
      const res = await axios.get("https://api.sdtour.online/cities");
      setCities(res.data);
    } catch (err) {
      console.error("Fetch cities failed", err);
    }
  };
  fetchCities();
}, []);



  // 🔹 Typewriter state
  const typePhrases = [
    "Search Tours...",
    "Search Hotels...",
    "Search Destinations...",
    "Search Activities...",
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typedText, setTypedText] = useState("");

  // 🔹 Resize listener (fix refresh issue between mobile/tablet/desktop)
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);

      if (width >= 768) {
        setOpen(false);      // close mobile menu
      }
      // reset dropdown when switching layout
      setDropdown(null);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔹 Typewriter effect for search placeholder
  useEffect(() => {
    const currentPhrase = typePhrases[phraseIndex];
    const speed = isDeleting ? 55 : 110;

    const timer = setTimeout(() => {
      let nextIndex = charIndex + (isDeleting ? -1 : 1);

      // finished typing
      if (!isDeleting && nextIndex === currentPhrase.length + 1) {
        setIsDeleting(true);
        return;
      }

      // finished deleting
      if (isDeleting && nextIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % typePhrases.length);
        return;
      }

      setCharIndex(nextIndex);
      setTypedText(currentPhrase.slice(0, nextIndex));
    }, speed);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIndex, isDeleting, phraseIndex]);

  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;
  const isDesktop = screenWidth >= 1024;

  const menuItems = [
    { name: "Home", url: "/" },
    {
      name: "Tours ▾",
      submenu: [
        { label: "Gujrat Group Tours", url: "/tours/group" },
        { label: "Gujrat Indivisual Tours", url: "/tours/indivisual" },
      ],
    },
    {
      name: "Destinations ▾",
      submenu: [
        { label: "Ahmedabad", url: "/destinations/Ahmedabad" },
        { label: "Vadodara", url: "/destinations/Vadodara" },
        { label: "Dwarka", url: "/destinations/Dwarka" },
        { label: "Sasan Gir", url: "/destinations/Sasan" },
        // { label: "Kevadia", url: "/destinations/Kevadia" },
        { label: "Diu", url: "/destinations/Diu" },
        { label: "Kutch", url: "/destinations/Kutch" },
        { label: "Somnath", url: "/destinations/Somnath" },
        { label: "Junagadh", url: "/destinations/Junagadh" },
        { label: "Rajkot", url: "/destinations/Rajkot" },
      ],
    },
    {
      name: "Activities ▾",
      submenu: [
        { label: "Beaches", url: "/activities/Beaches" },
        { label: "Religious Sites", url: "/activities/Relligious-site" },
        { label: "Heritage Sites", url: "/activities/Heritages-site" },
        { label: "Wildlife Sanctuary", url: "/activities/Wildlife" },
        { label: "Flora-Fauna", url: "/activities/Flora-Fauna" },
        { label: "Show & Glow Experience", url: "/activities/ShowandGlow" },
        { label: "Fair & Festival", url: "/activities/FairFestival" },
        { label: "Shopping in Gujarat", url: "/activities/ShoppinginGujarat" },
        { label: "Art & Craft", url: "/activities/ArtandCraft" },
      ],
    },
    {
      name: "Hotels ▾",
      submenu: cities.length > 0
        ? cities.map(city => ({
            label: city.name,
            url: `/hotels/${city.name.toLowerCase().trim()}`
          }))
        : [{ label: "Loading...", url: "#" }],
    },
    { name: "Car Rental", url: "/rentalcar" },
    { name: "Memorable Journeys", url: "/pastjournies" },
  ];

  return (
    <div style={{ fontFamily: "Poppins" }}>
      <div
     className={`
    fixed top-0 left-0 w-full z-[9999]
    ${hasScrolledOnce ? "transition-all duration-500 ease-out" : ""}
    ${isScrolled
      ? "bg-white/95 shadow-xl backdrop-blur-xl"
      : "bg-white"}
  `}
      >
        {/* 🔹 FIRST NAVBAR (Desktop + Tablet) */}
        <div className="bg-[#F4612B] shadow-sm hidden md:block">
          <AnimatePresence>
  {showTopBar && (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -40, opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-[#F4612B] shadow-sm hidden md:block"
    >
          <div className="max-w-[1350px] mx-auto flex justify-between items-center py-2 lg:px-8 md:px-2">
            {/* PHONE */}
            <div className="flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.1 }}>
                <div className="bg-white p-[8px] rounded-full">
                  <FiPhone className="text-[#F4612B] text-lg" />
                </div>
              </motion.div>

              {/* hide text only on tablet */}
              <div className={isTablet ? "block" : "block"}>
                <p className="text-[11px] text-white">Call Anytime</p>
                <p className="text-[15px] md:text-[13px] font-semibold text-white">
                  +91 9979922797
                </p>
              </div>
            </div>

            {/* SEARCH BAR with typewriter placeholder */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className={`flex items-center bg-white px-4 py-2 rounded-full border border-gray-300
              ${isTablet ? "w-[350px]" : "w-[550px]"}`}
            >
              <FiSearch className="text-gray-500 text-lg" />
              <input
                type="text"
                onClick={() => setSearchOpen(true)}
                placeholder={typedText || "Search Tours..."}
                className="bg-transparent ml-2 w-full outline-none text-[14px] text-gray-700"
              />

            </motion.div>

            {/* FAQ + Quick Enquiry */}
            <div className="flex items-center gap-2">
              <Link
                to="/faq"
                className={` active:scale-95 hover:scale-105 hover:bg-[#f4612b] hover:text-white border border-white ${isTablet ? "px-6 py-2 text-[12px]" : "px-6 py-2 text-sm"
                  } text-[#F4612B] bg-white border rounded-full font-semibold`}
              >
                FAQ
              </Link>
              <button
                onClick={() => setEnquiryOpen(true)}
                className="active:scale-95 hover:scale-105 hover:bg-[#f4612b] hover:text-white border border-white px-4 hover:cursor-pointer py-2 bg-white text-[#F4612B] rounded-full text-sm font-semibold"
              >
                Quick Enquiry
              </button>
            </div>
          </div>
             </motion.div>
  )}
</AnimatePresence>
        </div>

        {/* 🔸 SECOND NAVBAR */}
        <nav className="backdrop-blur-xl bg-white/70 shadow-md">

          <div className="max-w-[1350px] mx-auto px-4 md:px-6">
            {/* MOBILE HEADER */}
            <div className="flex items-center justify-between md:hidden py-1 px-1">
              <img src="/logo.webp" alt="Logo" className="h-9" />
              <div className="flex items-center gap-3">
                <FiSearch
                  onClick={() => setSearchOpen((p) => !p)}
                  className="text-[#F4612B] text-xl cursor-pointer"
                />
                {open ? (
                  <FiX
                    onClick={() => setOpen(false)}
                    className="text-[#F4612B] text-2xl cursor-pointer"
                  />
                ) : (
                  <FiMenu
                    onClick={() => setOpen(true)}
                    className="text-[#F4612B] text-2xl cursor-pointer"
                  />
                )}
              </div>
            </div>

            {/* MOBILE QUICK CATEGORIES */}
            <div className="md:hidden pt-1 pb-3 px-2">
              <div className="flex justify-between gap-2.5">
                <button 
                  onClick={() => setDropdown(dropdown === "mobile-tours" ? null : "mobile-tours")}
                  className={`flex-1 flex flex-col items-center justify-center p-3 rounded-2xl border transition-all active:scale-95 shadow-sm
                    ${dropdown === "mobile-tours" ? "bg-orange-100 border-orange-300 shadow-inner" : "bg-orange-50/40 border-orange-100"}`}
                >
                  <div className="text-3xl mb-1">🚌</div>
                  <span className="text-[12px] font-bold text-gray-800 uppercase tracking-tight">Tours</span>
                </button>
                
                <button 
                  onClick={() => setDropdown(dropdown === "mobile-hotels" ? null : "mobile-hotels")}
                  className={`flex-1 flex flex-col items-center justify-center p-3 rounded-2xl border transition-all active:scale-95 shadow-sm
                    ${dropdown === "mobile-hotels" ? "bg-orange-100 border-orange-300 shadow-inner" : "bg-orange-50/40 border-orange-100"}`}
                >
                  <div className="text-3xl mb-1">🏨</div>
                  <span className="text-[12px] font-bold text-gray-800 uppercase tracking-tight">Hotels</span>
                </button>

                <Link 
                  to="/rentalcar" 
                  className="flex-1 flex flex-col items-center justify-center p-3 rounded-2xl bg-orange-50/40 border border-orange-100 active:scale-95 transition shadow-sm"
                >
                  <div className="text-3xl mb-1">🚗</div>
                  <span className="text-[12px] font-bold text-gray-800 uppercase tracking-tight">Rental</span>
                </Link>
              </div>

              {/* MOBILE QUICK MENU DROPDOWN LISTS */}
              <AnimatePresence>
                {/* Tours Submenu */}
                {dropdown === "mobile-tours" && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: "auto", opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-white border border-orange-100 rounded-2xl mt-3 p-3 flex gap-3 shadow-md"
                  >
                    <Link to="/tours/group" onClick={() => setDropdown(null)} className="flex-1 py-4 bg-orange-50 rounded-xl text-center text-xs font-bold text-[#F4612B] border border-orange-200">
                      Group Tours
                    </Link>
                    <Link to="/tours/indivisual" onClick={() => setDropdown(null)} className="flex-1 py-4 bg-orange-50 rounded-xl text-center text-xs font-bold text-[#F4612B] border border-orange-200">
                      Individual Tours
                    </Link>
                  </motion.div>
                )}

                {/* Hotels (Cities) Submenu - Grid layout */}
                {dropdown === "mobile-hotels" && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: "auto", opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-white border border-orange-100 rounded-2xl mt-3 p-4 shadow-md"
                  >
                    <p className="text-[11px] uppercase font-bold text-gray-400 mb-3 px-1 text-center">Select Destination City</p>
                    <div className="grid grid-cols-2 gap-2">
                      {["Somnath","Dwarka","Ahmedabad","Rajkot","Sasan","Junagadh","Diu","Surat"].map(city => (
                        <Link 
                          key={city} to={`/hotels/${city.toLowerCase()}`} 
                          onClick={() => setDropdown(null)}
                          className="py-2.5 px-4 bg-orange-50 border border-orange-100 rounded-xl text-xs font-bold text-[#F4612B] text-center"
                        >
                          {city}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* MOBILE SEARCH (smooth animated) */}
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="md:hidden flex items-center gap-2 bg-white px-3 py-2 border-y border-gray-200"
                >
                  <FiSearch className="text-[#F4612B] text-lg" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search..."
                    className="bg-transparent flex-1 outline-none text-[14px]"
                  />
                  <FiX
                    onClick={() => setSearchOpen(false)}
                    className="text-[#F4612B] text-xl cursor-pointer"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* DESKTOP + TABLET NAVBAR */}
            <div className="hidden md:flex items-center justify-between">
              <img
                src="/logo.webp"
                alt="Logo"
                className={`transition-all duration-300 ${scrolled ? "h-9" : isTablet ? "h-9" : "h-12"
                  }`}
              />

              <ul
                className={`flex font-medium text-[#333] relative ${isTablet ? "gap-3 text-[14px]" : "gap-7 text-[17px]"
                  }`}
              >
                {menuItems.map((item) => (
                  <li
                    key={item.name}
                    className="py-4 h-14 relative cursor-pointer"
                    // desktop = hover, tablet = click
                    onMouseEnter={() =>
                      isDesktop && item.submenu && setDropdown(item.name)
                    }
                    onMouseLeave={() =>
                      isDesktop && item.submenu && setDropdown(null)
                    }
                  >
                    {/* Link wrapper so tablet can toggle on click */}
                    <button
                      type="button"
                      className="inline-block"
                      onClick={() => {
                        if (isTablet && item.submenu) {
                          setDropdown((prev) =>
                            prev === item.name ? null : item.name
                          );
                        }
                      }}
                    >
                      <Link to={item.url || "#"}>{item.name}</Link>
                    </button>

                    {/* DESKTOP/TABLET SUBMENU with animation */}
                    <AnimatePresence>
                      {item.submenu && dropdown === item.name && (
                        <motion.ul
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className={`absolute left-0 ${isTablet ? "mt-6" : "mt-3.5"
                            } border-2 border-t-[#F4612B] border-l-white border-r-white border-b-white bg-white shadow-lg py-1 w-70 z-50`}
                        >
                          {item.submenu.map((sub, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.04 }}
                            >
                              <Link
                                to={sub.url}
                                className="flex gap-2 px-1 py-2 text-gray-700 hover:text-[#F4612B]"
                              >
                                <svg
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="border-2 rounded-full text-[#F4612B]"
                                >
                                  <path d="m6 10l-2 2l6 6L20 8l-2-2l-8 8z" />
                                </svg>
                                {sub.label}
                              </Link>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </ul>

              {/* CONTACT BUTTON */}
              <motion.div whileHover={{ scale: 1.03 }}>
                <Link
                  to="/contact"
                  className={`${isTablet ? "w-18 text-[12px] py-1.5 px-0" : "w-36 px-6 py-2 text-sm"
                    } block text-center rounded-full font-semibold bg-[#F4612B] text-white hover:bg-white hover:text-[#F4612B] border border-[#F4612B] active:scale-95 hover:scale-105`}
                >
                  Contact
                </Link>
              </motion.div>
            </div>
          </div>

          {/* MOBILE MENU (with + / − and dash in submenu) */}
          {/* MOBILE MENU */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="md:hidden bg-white px-5 py-3"
              >
                <ul className="flex flex-col gap-3 text-[#F4612B] font-medium text-[16px]">
                  {menuItems.map((m) => (
                    <li key={m.name}>
                      {/* ✅ IF SUBMENU → BUTTON */}
                      {m.submenu ? (
                        <>
                          <button
                            className="w-full py-1 flex items-center justify-between text-left"
                            onClick={() =>
                              setDropdown((prev) =>
                                prev === m.name ? null : m.name
                              )
                            }
                          >
                            <span>{m.name.replace(" ▾", "")}</span>
                            <span className="text-lg font-bold">
                              {dropdown === m.name ? "−" : "+"}
                            </span>
                          </button>

                          {/* SUBMENU */}
                          <AnimatePresence>
                            {dropdown === m.name && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="pl-4 border-l border-[#F4612B]/60 mt-1"
                              >
                                {m.submenu.map((s, i) => (
                                  <Link
                                    key={i}
                                    to={s.url}
                                    onClick={() => setOpen(false)}
                                    className="block py-2 text-gray-700"
                                  >
                                    - {s.label}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        /* ✅ IF NO SUBMENU → LINK */
                        <Link
                          to={m.url}
                          onClick={() => setOpen(false)}
                          className="block py-2"
                        >
                          {m.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
                {/* Bottom buttons */}
                <div className="border-t mt-4 pt-3 flex flex-col gap-2 w-full">
                  <Link to="/faq" onClick={() => setOpen(false)} className="border text-center py-2 text-[#F4612B] border-[#F4612B] rounded-full" > FAQ </Link>
                  {/* <Link to="/contact" onClick={() => setOpen(false)} className="text-center py-2 bg-[#F4612B] text-white rounded-full" > Quick Enquiry </Link>  */}
                  <button
                    onClick={() => {
                      setOpen(false);
                      setEnquiryOpen(true);
                    }}
                    className="w-full mt-3 border rounded-full py-2 text-[#F4612B]"
                  >
                    Quick Enquiry
                  </button>


                  <Link to="/contact" onClick={() => setOpen(false)} className="text-center py-2 bg-[#F4612B] text-white rounded-full" > Contact </Link>


                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </nav>
        <QuickEnquiryModal
          open={enquiryOpen}
          onClose={() => setEnquiryOpen(false)}
        />
        {/* 🔍 SEARCH OVERLAY (THIS WAS MISSING) */}
        <SearchOverlay
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
        />
      </div>
    </div>
  );
}
