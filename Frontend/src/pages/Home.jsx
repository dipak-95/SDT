import { useEffect, useState } from "react";
import {
  FaRegClock, FaMapMarkerAlt, FaHotel, FaUtensils,
  FaBusAlt, FaBinoculars
} from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Star, Users, MapPin, Award, Smile } from 'lucide-react';
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import QuickEnquiryModal from "../component/QuickEnquiryModal"
import GoogleReview from "../component/GoogleReview";

export default function Home() {

  /* ---- Achivements ---- */
    
  const stats = [
    {
      id: 1,
      title: "Years Experience",
      value: "8+",
      icon: <Award size={28} />,
    },
    {
      id: 2,
      title: "Happy Travellers",
      value: "18,000+",
      icon: <Users size={28} />,
    },
    {
      id: 3,
      title: "Tours Completed",
      value: "300+",
      icon: <MapPin size={28} />,
    },
    {
      id: 4,
      title: "Satisfaction Rate",
      value: "98%",
      icon: <Smile size={28} />,
    },
  ];
  const points = [
    { x: 133, y: 60 },
    { x: 445, y: 180 },
    { x: 750, y: 60 },
    { x: 1065, y: 180 },
  ];

  const roadPoints = `
    0,180
    ${points.map(p => `${p.x},${p.y}`).join(" ")}
    1200,80
  `;

  const [p, setP] = useState(0);
  

  const navigate = useNavigate();
  const [openEnquiry, setOpenEnquiry] = useState(false);
const handleBookTour = (tour) => {
  const tourId = tour?._id || tour?.id;

  if (!tourId) {
    console.error("Tour ID missing", tour);
    return;
  }

  if (tour.type === "group") {
    navigate(`/group-tour/${tourId}`);
  } else if (tour.type === "individual") {
    navigate(`/individual-tour/${tourId}`);
  }
};

  const activityRoutes = {
    "Religious Sites": "/activities/Relligious-site",
    "Beaches": "/activities/Beaches",
    "Heritage Sites": "/activities/Heritages-sites",
    "Wildlife Sancturies": "/activities/Wildlife",
    "Art & Craft": "/activities/ArtandCraft",
    "Fair & Festival": "/activities/FairandFestival",
    "Shopping in Gujrat": "/activities/ShoppinginGujarat",
    "Flora-Fauna": "/activities/Flora-Fauna",
    "Show & Glow Experience": "/activities/ShowandGlow"
  };
  const destinationRoutes = {
    "Somnath Temple": "/destinations/Somnath",
    "Dwarka": "/destinations/Dwarka",

    "Rann of Kutch": "/destinations/Kutch",
    "Statue of Unity": "/destinations/vadodara",

    "Gir Forest": "/destinations/Sasan",
  };

  useEffect(() => {
    const duration = 2800; // 🔥 CHANGE SPEED HERE (ms)
    const start = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      setP(Math.floor(progress * 100));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, []);
 

  /* ---- Tours Data ---- */
  const tours = [
    {
      id:"694e240af79325fb3586dd9e",
      title: "Saurashtra Darshan Group Tour",
      type: "group",
      images: ["/somnathmandir.webp", "/statueofunity2.webp", "/Dwarkamandir.webp", "/junglesafari.webp"],
      days: " 8 Days / 7 Nights",
      location: "Gujarat",
      hotel: true,
      meals: true,
      transfers: true,
      sightseeing: true,
      discount: "15%",
      oldPrice: "20000",
      newPrice: "17000",
    },
    {
      id:"694e2818f79325fb3586ddcd",
      title: "Saurashtra Darshan Group Tour",
      type: "group",
      images: ["/narmadaAarti2.webp", "/AkshardhamTemple.webp", "/GomtiGhat.webp", "/NagvaBeachDiu.webp"],
      days: "7 Days / 6 Nights ",
      location: "Gujarat",
      hotel: true,
      meals: true,
      transfers: true,
      sightseeing: true,
      discount: "10%",
      oldPrice: "18000",
      newPrice: "16200",
    },
    {
      id:"694e2bc8f79325fb3586dde2",
      title: "Saurashtra Darshan group Tour",
      type: "individual",
      images: ["/BetDwarka.webp", "/gangeshvermahadev.webp", "/shivVillaresort.webp", "/Nageshwar.webp"],
      days: "7 Days / 6 Night",
      location: "Gujarat",
      hotel: true,
      meals: true,
      transfers: true,
      sightseeing: true,
      discount: "15%",
      oldPrice: "20000",
      newPrice: "17000",
    },
    {
      id:"694e3ba8f79325fb3586de0e",
      title: "Saurashtra Darshan Individual Tour",
      type: "individual",
      images: ["/DiuFort.webp", "/junglesafari.webp", "/somnathmandir.webp", "/shivVillaresort.webp"],
      days: "5 Days / 4 Night",
      location: "Gujarat",
      hotel: true,
      meals: true,
      transfers: true,
      sightseeing: true,
      discount: "10%",
      oldPrice: "20000",
      newPrice: "18000",
    },
  ];

  /* ---- Custom Slider Arrows ---- */
  function PrevArrow({ onClick }) {
    return (
      <button
        onClick={onClick}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 shadow-md cursor-pointer rounded-full p-2"
      >
        <IoIosArrowBack className="text-[#F4612B] text-xl" />
      </button>
    );
  }

  function NextArrow({ onClick }) {
    return (
      <button
        onClick={onClick}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 shadow-md cursor-pointer rounded-full p-2"
      >
        <IoIosArrowForward className="text-[#F4612B] text-xl" />
      </button>
    );
  }

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    autoplay: false,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const glanceData = {
    "Religious Sites": {
      desc:
        "Gujarat is a sacred land deeply rooted in spirituality and devotion. From ancient Jyotirlingas to revered Shakti Peeths, the state offers a profound spiritual journey through centuries of faith and tradition.",
      tags: [
        "Somnath Temple",
        "Akshardham",
        "Dwarkadhish Temple",
        "Adalaj Trimandir",
        "Ambaji Temple",
        "Gangeshvar MahadevTemple",
      ],
      images: [
        "/somnathmandir.webp",
        "/AkshardhamTemple.webp",
        "/Dwarkamandir.webp",
        "/AdalajTrimandir.webp",
        "/ambajimandir.webp",
        "/gangeshvermahadev.webp",
      ],
    },

    "Wildlife Sancturies": {
      desc:
        "Home to diverse wildlife and rare species, Gujarat’s national parks offer thrilling encounters with nature, from Asiatic lions in Gir to migratory birds across scenic wetlands.",
      tags: [
        "Gir National Park",
        "Porbandar Bird Sanctuary",
        "Kutch Great Indian Bustard Sanctuary",
        "Narayan Sarovar Wildlife Sanctuary",
        "Kutch Desert Wildlife Sanctuary",
      ],
      images: [
        "/Girforestnatinalpark.webp",
        "/Narayansarovarsanctury.webp",
        "/Kutchbustardsanctury.webp",
        "/Porbandar-Bird-Sanctuary.webp",
        "/Kutchdessertwildlife.webp",
        "/Deer.webp",
      ],
    },

    "Beaches": {
      desc:
        "Gujarat’s coastline stretches along the Arabian Sea, offering serene beaches, golden sunsets, and peaceful coastal retreats away from crowded tourist hubs.",
      tags: [
        "Mandvi Beach",
        "Shivrajpur Beach",
        "Chorwad Beach",
        "Dandi Beach",
        "Madhavpur Beach",
        "Dunny Point",
      ],
      images: [
        "/Mandavibeach2.webp",
        "/shivrajpurbeach.webp",
        "/Chorvad2.webp",
        "/Dandi2.webp",
        "/MadhavpurBeach.webp",
        "/Dunny2.webp",
      ],
    },
    "Heritage Sites": {
      desc:
        "Gujarat’s heritage sites reflect centuries of architectural brilliance, ancient civilizations, and royal legacies, preserving the state’s rich history through forts, stepwells, and historic towns.",
      tags: [
        "Statue of Unity",
        "Adalaj Stepwell",
        "Ashoka Rock Edicts",
        "Diu Fort",
        "Uperkot Fort",
        "Buddhist Caves of Junagadh",
      ],
      images: [
        "/heroImg.webp",
        "/AdalajStepwell.webp",
        "/Uparkot2.webp",
        "/DiuFort.webp",
        "/Buddhistcave.webp",
        "/Ashokalekh.webp",
      ],
    },
    "Shopping in Gujrat": {
      desc:
        "Shopping in Gujarat offers a vibrant mix of traditional markets and local crafts, featuring textiles, handicrafts, jewelry, and regional specialties unique to every region.",
      tags: [
        "Shopping in Surat",
        "Shopping in Vadodara",
        "Shopping in Ahmedabad",
        "Shopping in Junagadh",
        "Shopping in Kutch",
        "Shopping in Jamnagar",
        "Shopping in Dwarka",
        "Shopping in Somnath",
      ],
      images: [
        "/market1[1].jpg",
        "/bazar1.webp",
        "/market3[1].jpg",
        "/bazar2.webp",
        "/market5[1].jpg",
        "/bazar3.webp",
      ],
    },
    "Fair & Festival": {
      desc:
        "Gujarat’s fairs and festivals celebrate culture, devotion, and joy, showcasing colorful traditions, folk music, dance, and community gatherings throughout the year.",
      tags: [
        "Vital Facts on Bhavnath Mahadev Mela",
        "Important Facts About Modhera Dance Festival",
        "Key Highlights of Navratri Festival",
        "Essential Information on Rann Utsav",
        "Important Facts About Tarnetar Fair",
        "Quick Facts About Uttarayan (Kite Festival)",
        "Important Facts About Janmashtami in Dwarka",
        "Essential Facts on Gujarat’s Cultural Festivals"
      ],
      images: [
        "/Ranutsav.webp",
        "/janmastmi.webp",
        "/Diwali.webp",
        "/Kite.webp",
        "/modhera.webp",
        "/Tarnetar.webp",
      ],
    },
    "Art & Craft": {
      desc:
        "Gujarat is renowned for its rich art and craft heritage, including intricate embroidery, pottery, handloom textiles, and traditional designs passed down through generations.",
      tags: [
        "Bandhani",
        "Patola",
        "Rogan Art",
        "Kutchi Embroidery",
        "Lippan Kaam",
        "Pithora Painting",
        "Mata ni Pachedi",
        "Terracotta Craft",
      ],
      images: [
        "/craft1.webp",
        "/patola.webp",
        "/craft3.webp",
        "/Jawellry.webp",
        "/craft2.webp",
        "/craft7.webp",
      ],
    },
  };
  const categories = Object.keys(glanceData);
  const [active, setActive] = useState(categories[0]);
  const [delayedActive, setDelayedActive] = useState(categories[0]);
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);

  const current = glanceData[active];

  const delayedCurrent = glanceData[delayedActive];

  useEffect(() => {
    // 1️⃣ Hide content immediately
    setVisible(false);

    // 2️⃣ After 0.5s, change content & show again
    const timer = setTimeout(() => {
      setDelayedActive(active);
      setVisible(true);
    }, 300); // ⏱ 0.5 second

    return () => clearTimeout(timer);
  }, [active]);



  return (
    <div style={{ fontFamily: "Poppins" }}>

      {/* INLINE ANIMATION (NO CSS FILE) */}
      <style>
        {`
          @keyframes shineMove {
            0% { transform: translateX(-150%) rotate(20deg); }
            100% { transform: translateX(150%) rotate(20deg); }
          }
        `}
      </style>

      {/* ---------------- VIDEO SECTION ---------------- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-[60vh] md:h-[90vh] overflow-hidden"
      >
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay muted loop playsInline
        >
          <source src="/videos/Saurastra Darshan.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-2xl text-[#f4612b] md:text-4xl md:text-[#f4612b] lg:text-5xl font-bold mb-3"
          >
            Discover Incredible Group Tours
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-sm md:text-[17px] lg:text-[20px] max-w-[700px]"
          >
            Explore Gujarat’s most iconic destinations with comfort,<br></br> safety and unforgettable memories.
          </motion.p>


          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              to="/tours/group"
              className="inline-block mt-5 px-6 py-3 rounded-full
               bg-[#F4612B] hover:bg-white hover:text-[#F4612B]
               border border-[#F4612B] text-white font-semibold
               transition-all"
            >
              Explore Tours
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* ---------------- TOUR CARDS SECTION ---------------- */}
      <div className="w-full py-12"
      >

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-[26px] md:text-4xl font-bold mb-10 text-[#f64f12] font-sans-serif"
        >
          Popular Tours & Packages
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-6 px-6 md:px-12 lg:px-40">

          {tours.map((tour, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full sm:w-[48%] md:w-full lg:w-[48%] bg-white rounded-xl border-1 border-gray-200 shadow-xl overflow-hidden"
            >

              {/* ---- SLIDER ---- */}
              <div className="relative">
                <Slider {...sliderSettings}>
                  {tour.images.map((img, i) => (
                    <img key={i} src={img} className="w-full  h-[220px]
    md:h-[260px]
    lg:h-[300px] object-cover rounded-2xl p-2" />
                  ))}
                </Slider>
              </div>

              {/* ---- CARD DETAILS ---- */}
              <div className="p-3">
                <div className="text-[20px] font-bold text-[#F4612B] text-center">{tour.title}</div>
                {/* Days + Location */}
                <div className="flex justify-between px-1 mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                    <FaRegClock className="text-[#F4612B]" /> {tour.days}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                    <FaMapMarkerAlt className="text-[#F4612B]" /> {tour.location}
                  </div>
                </div>

                {/* Features */}
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex flex-col items-center p-2"><FaHotel className="text-[#F4612B]" /><span className="text-xs mt-1">Hotel</span></div>
                  <div className="flex flex-col items-center p-2"><FaUtensils className="text-[#F4612B]" /><span className="text-xs mt-1">Meals</span></div>
                  <div className="flex flex-col items-center p-2"><FaBusAlt className="text-[#F4612B]" /><span className="text-xs mt-1">Transfers</span></div>
                  <div className="flex flex-col items-center p-2"><FaBinoculars className="text-[#F4612B]" /><span className="text-xs mt-1">Sightseeing</span></div>
                </div>

                {/* ---- DISCOUNT + OLD PRICE ---- */}
                <div className="mt-4 flex justify-center gap-3">

                  {/* SHINING BADGE */}
                  <span className="relative bg-[#F4612B] text-white text-xs font-semibold px-3 py-1 rounded-full overflow-hidden">
                    <span
                      className="absolute inset-0 w-[160%] h-full 
                      bg-gradient-to-r from-transparent via-white/70 to-transparent
                      animate-[shineMove_1.8s_linear_infinite]"
                      style={{ transform: "rotate(20deg)" }}
                    ></span>

                    <span className="relative z-10">{tour.discount} OFF</span>
                  </span>

                  <span className="text-gray-500 line-through text-sm">INR {tour.oldPrice}</span>
                </div>

                {/* NEW PRICE */}
                <div className="mt-3 text-center text-[15px] font-semibold text-gray-800">
                  Starting from <span className="text-[#F4612B] font-bold">INR {tour.newPrice}</span>
                </div>

                {/* BUTTONS */}
                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <button onClick={() => setOpenEnquiry(true)} className="w-full sm:w-1/2 py-2 border cursor-pointer border-[#F4612B] text-[#F4612B] rounded-full hover:bg-[#F4612B] hover:text-white transition-all">
                    Quick Inquiry
                  </button>
                  <button onClick={() => handleBookTour(tour)} className="w-full sm:w-1/2 py-2 cursor-pointer bg-[#F4612B] text-white border border-[#F4612B] rounded-full hover:bg-white hover:text-[#F4612B] transition-all">
                    Book Tour
                  </button>
                </div>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
      {/* ---------------- POPULAR DESTINATIONS SECTION ---------------- */}
      <div className="w-full pt-5 pb-15 bg-[url('bg4.webp')]">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-[#f4612b] text-[26px] md:text-4xl font-bold mt-10 mb-14 font-sans-serif"
        >
          Popular Destinations We Offer To All
        </motion.h2>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6 px-4 md:px-8 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: -2000, right: 0 }}
            dragElastic={0.08}
            whileTap={{ cursor: "grabbing" }}

            /* 🔁 AUTO SCROLL */
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 15,   // 🔥 CHANGE SPEED HERE
              ease: "linear",
            }}
          >
            {[
              {
                name: "Somnath Temple",
                img: "/somnathmandir.webp",
                info: "Sacred Jyotirlinga temple by the Arabian Sea.",
              },
              {
                name: "Rann of Kutch",
                img: "/ran.webp",
                info: "White desert landscapes & vibrant culture.",
              },
              {
                name: "Statue of Unity",
                img: "/statueofunity2.webp",
                info: "World’s tallest statue with riverfront views.",
              },
              {
                name: "Dwarka",
                img: "/Dwarkamandir.webp",
                info: "Ancient kingdom of Lord Krishna by the ocean.",
              },
              {
                name: "Gir Forest",
                img: "/junglesafari.webp",
                info: "Home of the majestic Asiatic lions.",
              },

              /* 🔁 DUPLICATE FOR SEAMLESS LOOP */
              {
                name: "Somnath Temple",
                img: "/somnathmandir.webp",
                info: "Sacred Jyotirlinga temple by the Arabian Sea.",
              },
              {
                name: "Rann of Kutch",
                img: "/ran.webp",
                info: "White desert landscapes & vibrant culture.",
              },
              {
                name: "Statue of Unity",
                img: "/statueofunity2.webp",
                info: "World’s tallest statue with riverfront views.",
              },
              {
                name: "Dwarka",
                img: "/Dwarkamandir.webp",
                info: "Ancient kingdom of Lord Krishna by the ocean.",
              },
              {
                name: "Gir Forest",
                img: "/junglesafari.webp",
                info: "Home of the majestic Asiatic lions.",
              },
            ].map((dest, index) => (
              <div
                key={index}
                className="
          min-w-[85%] sm:min-w-[45%] lg:min-w-[30%]
          h-[380px] md:h-[420px]
          rounded-2xl overflow-hidden
          shadow-2xl bg-black border-4 border-white relative group
        "
              >
                {/* IMAGE */}
                <img
                  src={dest.img}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover
                     group-hover:scale-110 transition-transform duration-700"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t
                        from-black/80 via-black/40 to-transparent" />

                {/* CONTENT */}
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="text-2xl font-bold tracking-wide">
                    {dest.name}
                  </h3>

                  <p className="text-sm text-gray-200 mt-2 line-clamp-2 max-w-[90%]">
                    {dest.info}
                  </p>

                  <button
                    onClick={() => {
                      const route = destinationRoutes[dest.name];
                      if (route) {
                        navigate(`${route}?place=${encodeURIComponent(dest.name)}`);
                      }
                    }}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold
                       border-b-2 border-[#F4612B] pb-1
                       hover:text-[#F4612B] transition-all cursor-pointer"
                  >
                    Explore Destination →
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ================= ABOUT US SECTION ================= */}
      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* -------- LEFT IMAGE SLIDER (BUTTON ONLY) -------- */}
          <div className="relative w-full h-[260px] sm:h-[320px] md:h-[420px] rounded-2xl overflow-hidden shadow-lg">

            <Slider {...sliderSettings} className="h-full">

              {[
                "/statueofunity2.webp",
                "/somnathmandir.webp",
                "/BetDwarka.webp",
                "/junglesafari.webp",
                "/NagvaBeachDiu.webp",
              ].map((img, i) => (
                <div key={i} className="h-[260px] sm:h-[320px] md:h-[420px]">

                  {/* Hover wrapper */}
                  <div className="relative w-full h-full overflow-hidden group">

                    {/* Image */}
                    <img
                      src={img}
                      alt="Travel destination"
                      className="w-full h-full object-cover
                       transition-transform duration-700 ease-out
                       group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div
                      className="absolute inset-0 bg-black/20 opacity-0
                        transition-opacity duration-700"
                    />
                  </div>

                </div>
              ))}

            </Slider>
          </div>

          {/* -------- RIGHT CONTENT (GUJARAT TOURS) -------- */}
          <div>
            <span className="text-lg tracking-widest text-[#f64f12] font-semibold">
              About Us
            </span>

            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-gray-90 leading-tight">
              Explore the Heart of <br className="hidden sm:block" />Vibrant
              <span className="text-[#f64f12]"> Gujarat</span>
            </h2>

            <p className="mt-6 text-gray-600 leading-relaxed">
              Explore Gujarat through journeys that blend spirituality, heritage, and
              natural beauty — from the sacred shores of <span className="text-[#f64f12] font-semibold">Somnath and Dwarka</span> to the iconic
              <span className="text-[#f64f12] font-semibold"> Statue of Unity </span> and the wild landscapes of<span className="text-[#f64f12] font-semibold"> Gir.</span>
            </p>

            <p className="mt-4 text-gray-600 leading-relaxed">
              Every route is thoughtfully designed for comfort and discovery, offering
              authentic local experiences, scenic travel, and memorable moments across
              Gujarat’s most celebrated destinations.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigate("/tours/group")} className="px-7 py-3 md:text-[14px] bg-[#f64f12] text-white border hover:bg-white cursor-pointer hover:text-[#f64f12] hover:border-[#f64f12]  rounded-full font-medium transition">
                View Tour Packages
              </button>

              <button onClick={() => navigate("/contact")} className="px-7 py-3 md:text-[14px] border border-[#f64f12] hover:text-white hover:bg-[#f64f12] cursor-pointer text-gray-700 rounded-full font-medium transition">
                Contact Our Team
              </button>
            </div>
          </div>

        </div>
      </section >
      {/* ================= ACHIEVEMENTS ================= */}
     <section className="w-full py-12 bg-[#f6f7f9]">
        <div className="max-w-7xl mx-auto px-4 ">
          {/* Heading */}
          <h2 className="text-3xl text-[#f4612b] md:text-4xl font-bold text-center mb-8">
            Our Achievements
          </h2>

          {/* ================= ROAD ================= */}
          <div className="relative hidden md:block mb-5">
            <svg
              viewBox="0 0 1200 220"
              className="w-full h-[220px]"
              preserveAspectRatio="none"
            >
              {/* Road */}
              <polyline
                points={roadPoints}
                fill="none"
                stroke="#1f2937"
                strokeWidth="28"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Center dashed line */}
              <polyline
                points={roadPoints}
                fill="none"
                stroke="#ffffff"
                strokeWidth="3"
                strokeDasharray="14 16"
              />

              {/* ROUNDS AT CORNERS */}
              {points.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r="18"
                  fill="#f97316"
                  stroke="#ffffff"
                  strokeWidth="5"
                />
              ))}
            </svg>

            {/* ================= ARROWS ================= */}
            {/* <svg
              viewBox="0 0 1200 90"
              className="absolute left-0 top-full border w-[205vh] h-[90px]"
            >
              {points.map((p, i) => (
                <g key={i}>
                  <line
                    x1={p.x}
                    y1="0"
                    x2={p.x}
                    y2="50"
                    stroke="#f97316"
                    strokeWidth="3"
                  />
                  <polygon
                    points={`${p.x - 6},50 ${p.x + 6},50 ${p.x},64`}
                    fill="#f97316"
                  />
                </g>
              ))}
            </svg> */}
          </div>

          {/* ================= CARDS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-7 text-center hover:shadow-xl transition"
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center">
                  {item.icon}
                </div>

                <h3 className="text-3xl font-bold text-gray-900">
                  {item.value}
                </h3>
                <p className="text-gray-600 mt-2">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ================= DESTINATIONS LIST ================= */}
      <section className="w-full py-20 md:py-28 px-4 bg-white">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-14 md:mb-20">
            <p className="text-sm md:text-base text-orange-500 font-semibold tracking-widest uppercase">
              Pick Your Trail
            </p>
            <h2 className="mt-4 md:mt-6 text-3xl md:text-5xl font-bold text-gray-900">
              Gujarat At a Glance
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-62">

            {/* ================= LEFT CATEGORY PANEL ================= */}
            {/* MOBILE ONLY DROPDOWN */}
            <div className="block md:hidden mb-6 relative z-40">
              <button
                type="button"
                onClick={() => setOpen((p) => !p)}
                className="w-full flex items-center justify-between
      px-5 py-4 rounded-xl
      bg-[#e6f3f5] text-gray-800 font-medium"
              >
                {active}
                <span
                  className={`transition-transform duration-300 ${open ? "rotate-180" : ""
                    }`}
                >
                  ▼
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[500px] mt-3" : "max-h-0"
                  }`}
              >
                <div className="bg-white rounded-xl shadow-md divide-y">
                  {categories.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setActive(item);
                        setOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3 text-sm font-medium transition
            ${active === item
                          ? "bg-[#f64f12] text-white"
                          : "hover:bg-gray-100 text-gray-800"}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* TABLET VIEW */}
            <div className="hidden md:block lg:hidden">
              <div className="bg-[#e6f3f5] rounded-2xl p-5 space-y-3">
                {categories.map((item) => (
                  <button
                    key={item}
                    onClick={() => setActive(item)}
                    className={`w-full text-left px-5 py-3 rounded-xl
          text-sm font-medium transition
          ${active === item
                        ? "bg-[#f64f12] text-white"
                        : "bg-white text-gray-800 hover:bg-gray-100"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            {/* DESKTOP / LAPTOP */}
            <div className="hidden lg:block h-full w-[350px]">
              <div className="bg-[#e6f3f5] rounded-2xl p-6 space-y-3 sticky top-28 h-fit">
                {categories.map((item) => (
                  <button
                    key={item}
                    onClick={() => setActive(item)}
                    className={`w-full text-left px-6 py-4 rounded-xl
          text-base font-medium transition-all
          ${active === item
                        ? "bg-[#f64f12] text-white shadow-md"
                        : "bg-white text-gray-800 hover:bg-gray-100"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>


            {/* ================= RIGHT SIDE ================= */}
            <div
              className={`lg:col-span-3 max-w-4xl mx-auto
              transition-opacity duration-300
              ${visible ? "opacity-100" : "opacity-0"}`}
            >

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
                {delayedActive}
              </h3>

              {/* Description */}
              <p className="text-base md:text-sm text-gray-900 leading-relaxed max-w-4xl mb-4 font-medium">
                {delayedCurrent.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 md:gap-2 mb-5">
                {delayedCurrent.tags.map((tag) => (
                  <span
                    key={tag}
                    onClick={() => {
                      const route = activityRoutes[active];
                      if (route) {
                        navigate(`${route}?place=${encodeURIComponent(tag)}`);
                      }
                    }}
                    className="px-4 py-2 text-xs md:text-sm font-semibold cursor-pointer hover:bg-[#f64f12] hover:text-white
                   rounded-full border border-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="relative overflow-hidden">

                {/* IMAGE GRID */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-0">
                  {delayedCurrent.images.map((img, i) => (
                    <div
                      key={i}
                      className={`
          overflow-hidden

          /* -------- ROUNDED CORNERS -------- */
          ${i === 0 ? "rounded-tl-2xl md:rounded-tl-2xl" : ""}
          ${i === 1 ? "rounded-tr-2xl md:rounded-none" : ""}
          ${i === 2 ? "md:rounded-tr-2xl" : ""}
          ${i === 3 ? "md:rounded-bl-2xl" : ""}
          ${i === 4 ? "rounded-bl-2xl md:rounded-none" : ""}
          ${i === 5 ? "rounded-br-2xl md:rounded-br-2xl" : ""}
        `}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full object-cover
                     h-40 sm:h-44 md:h-44
                     transition-transform duration-700
                     hover:scale-105"
                      />
                    </div>
                  ))}
                </div>

                {/* CENTERED HEADING OVER ALL IMAGES */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <h4 className="text-white text-xl sm:text-2xl md:text-5xl font-semibold tracking-wide drop-shadow-lg text-center px-4">
                    {delayedActive}
                  </h4>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>
      <QuickEnquiryModal
        open={openEnquiry}
        onClose={() => setOpenEnquiry(false)}
      />
    <GoogleReview />
    </div >
  );
}