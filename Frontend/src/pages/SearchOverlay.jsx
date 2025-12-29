import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";


/* ================= MOCK DATA ================= */
const TOURS = [
  {
    id: 1,
    title: "Saurashtra Darshan Group Tour",
    days: "08 Days / 07 Nights",
    city: ["Dwarka", "Somnath", "Sasan Gir", "Junagadh", "Diu", "Vadodara", "Ahmedabad"],
    tourType: "group",
    image: "/GroupTour.webp",
    desc: "Spiritual journey to many places",
    path: "/tours/group",
  },
  {
    id: 2,
    title: "Saurashtra Darshan Individual Tour",
    days: "05 Days / 04 Nights",
    city: ["Sasan Gir", "Vadodara", "Diu", "Sasan Gir", "Ahmedabad"],
    tourType: "individual",
    image: "/IndividualTour.webp",
    desc: "Enjoy and beautiful religious Gujarat tour",
    path: "/tours/indivisual",
  },
  {
    id: 3,
    title: "Saurashtra Darshan Group Tour",
    days: "07 Days / 06 Nights",
    city: ["Dwarka", "Somnath", "Vadodara", "Diu", "Ahmedabad", "Sasan Gir"],
    tourType: "group",
    image: "/GroupTour.webp",
    desc: "Extended religious Gujarat tour",
    path: "/tours/group",
  },
];


const HOTELS = [
  {
    id: 1,
    name: "Hotel Kashi",
    city: "Dwarka",
    shortDesc: "Premium stay near Dwarkadhish Temple with modern amenities",
    image: "/Dwarka/Kashi1.png",
    path: "/hotels/Dwarka",
  },
  {
    id: 2,
    name: "Hotel Nand Palace",
    city: "Dwarka",
    shortDesc: "Comfortable hotel with river view and spacious rooms",
    image: "/Dwarka/Nand1.png",
    path: "/hotels/Dwarka",
  },
  {
    id: 3,
    name: "Hotel Shri Radhe",
    city: "Dwarka",
    shortDesc: "Budget-friendly hotel near Somnath Temple",
    image: "/Dwarka/Radhe.jpg",
    path: "/hotels/Dwarka",
  },
  {
    id: 4,
    name: "Hotel Shri Ganesh",
    city: "Somnath",
    shortDesc: "Clean rooms and walking distance from the temple",
    image: "/Somnath/Ganesh.jpg",
    path: "/hotels/Somnath",
  },
  {
    id: 5,
    name: "Hotel Amrut Inn",
    city: "Somnath",
    shortDesc: "Nature stay surrounded by Gir jungle and wildlife",
    image: "/Somnath/Amrut.png",
    path: "/hotels/Somnath",
  },
  {
    id: 6,
    name: "Hotel Sunshine Inn",
    city: "Somnath",
    shortDesc: "Eco-friendly resort with safari assistance",
    image: "/Somnath/Sun3.jpg",
    path: "/hotels/Somnath",
  },
  {
    id: 7,
    name: "Hotel The Grand Dipak Rooms",
    city: "Junagadh",
    shortDesc: "Comfort stay near Girnar ropeway and city center",
    image: "/Junagadh/Dipak.png",
    path: "/hotels/Junagadh",
  },
  {
    id: 8,
    name: "Hotel Royal Inn",
    city: "Junagadh",
    shortDesc: "Peaceful hotel with scenic Girnar hill views",
    image: "/Junagadh/Royal.jpg",
    path: "/hotels/Junagadh",
  },
  {
    id: 9,
    name: "The Byke Boutique- Suraj Club",
    city: "Junagadh",
    shortDesc: "Luxury tent stay during Rann Utsav season",
    image: "/Junagadh/Suraj.jpg",
    path: "/hotels/Junagadh",
  },
  {
    id: 10,
    name: "Hotel 440 A Serene Stay",
    city: "Ahmedabad",
    shortDesc: "Desert-themed hotel close to White Rann",
    image: "/Ahmedabad/440.jpg",
    path: "/hotels/Ahmedabad",
  },
  {
    id: 11,
    name: "Hotel Silver Heights",
    city: "Ahmedabad",
    shortDesc: "Elegant business hotel with premium services",
    image: "/Ahmedabad/silver.jpg",
    path: "/hotels/Ahmedabad",
  },
  {
    id: 12,
    name: "Hotel Nilkanth Inn",
    city: "Ahmedabad",
    shortDesc: "Luxury hotel ideal for business and family stays",
    image: "/Ahmedabad/nilkanth.png",
    path: "/hotels/Ahmedabad",
  },
  {
    id: 13,
    name: "Hotel Sai Inn Rooms",
    city: "Vadodara",
    shortDesc: "Modern hotel near SG Highway with easy connectivity",
    image: "/Vadodara/Sai.jpg",
    path: "/hotels/Vadodara",
  },
  {
    id: 14,
    name: "Hotel Valley",
    city: "Vadodara",
    shortDesc: "Smart hotel with contemporary design and comfort",
    image: "/Vadodara/Vally.png",
    path: "/hotels/Vadodara",
  },
  {
    id: 15,
    name: "Villa Euphoria Resort",
    city: "Vadodara",
    shortDesc: "Beachside hotel with sea-facing rooms",
    image: "/Vadodara/Villa1.jpg",
    path: "/hotels/Vadodara",
  },
  {
    id: 16,
    name: "Shri Shiv Villa Resort",
    city: "Sasan Gir",
    shortDesc: "Relaxing resort close to Diu beach attractions",
    image: "/Gir/Shiv.jpg",
    path: "/hotels/Sasan Gir",
  },
  {
    id: 17,
    name: "Gir Night Resort",
    city: "Sasan Gir",
    shortDesc: "Eco-friendly premium hotel in Rajkot city",
    image: "/Gir/Night.png",
    path: "/hotels/Sasan Gir",
  },
  {
    id: 18,
    name: "The Bhagvati Resort",
    city: "Sasan Gir",
    shortDesc: "Comfortable stay with modern interiors",
    image: "/Gir/Bhagvati.jpeg",
    path: "/hotels/Sasan Gir",
  },
];


const CARS = [
  {
    id: 1,
    name: "Swift Dzire",
    category: "car",
    image: "/Dezire.webp",
    pricePerKm: 12,
    seater: "4 + Driver",
    path: "/rentalcar",
  },
  {
    id: 2,
    name: "Ertiga",
    category: "car",
    image: "/Ertiga.webp",
    pricePerKm: 14,
    seater: "6 + Driver",
    path: "/rentalcar",
  },
  {
    id: 3,
    name: "Innova Crysta",
    category: "car",
    image: "/Innova.webp",
    pricePerKm: 18,
    seater: "7 + Driver",
    path: "/rentalcar",
  },

  {
    id: 5,
    name: "Urbania",
    category: "tempo",
    image: "/Urbania.webp",
    pricePerKm: 28,
    seater: "12 + Driver",
    path: "/rentalcar",
  },
  {
    id: 6,
    name: "Maharaja Tempo Traveller",
    category: "tempo",
    image: "/Urbania.webp",
    pricePerKm: 30,
    seater: "12 + Driver",
    path: "/rentalcar",
  },
  {
    id: 7,
    name: "Mini Bus",
    category: "bus",
    image: "/bus2.webp",
    pricePerKm: 38,
    seater: "18 + Driver",
    path: "/rentalcar",
  },
  {
    id: 8,
    name: "Luxury Bus",
    category: "bus",
    image: "/bus2.webp",
    pricePerKm: 45,
    seater: "40 + Driver",
    path: "/rentalcar",
  },
  {
    id: 9,
    name: "Bharat Benz Bus",
    category: "bus",
    image: "/bus2.webp",
    pricePerKm: 50,
    seater: "45 + Driver",
    path: "/rentalcar",
  },
];


export default function SearchOverlay({ open, onClose }) {
  const [activeTab, setActiveTab] = useState("tours");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  if (!open) return null;

  const filterByQuery = (text, fields) =>
    fields.some((f) => f.toLowerCase().includes(text.toLowerCase()));

  const filteredTours = TOURS.filter((t) => {
    const matchesQuery = filterByQuery(query, [
      t.title,
      ...t.city,
      t.days,
      t.tourType
    ]);

    const durationFilters = filters.filter((f) =>
      f.includes("Days")
    );

    const typeFilters = filters.filter((f) =>
      ["group", "individual"].includes(f)
    );

    const matchesDuration =
      durationFilters.length === 0 ||
      durationFilters.includes(t.days);

    const matchesType =
      typeFilters.length === 0 ||
      typeFilters.includes(t.tourType);

    return matchesQuery && matchesDuration && matchesType;
  });


  const filteredHotels = HOTELS.filter((h) => {
    const matchesQuery = filterByQuery(query, [
      h.name,
      h.city
    ]);

    const cityFilters = filters.map(f => f.toLowerCase());

    const matchesCity =
      cityFilters.length === 0 ||
      cityFilters.includes(h.city.toLowerCase());

    return matchesQuery && matchesCity;
  });


  const filteredCars = CARS.filter((c) => {
    const matchesQuery = filterByQuery(query, [
      c.name,
      c.category,
    ]);

    const matchesCategory =
      filters.length === 0 ||
      (filters.includes("cars") && c.category === "car") ||
      (filters.includes("buses") && c.category === "bus") ||
      (filters.includes("tempo travellers") && c.category === "tempo");

    return matchesQuery && matchesCategory;
  });

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-md flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden"
          initial={{ y: 40, scale: 0.96 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: 40, scale: 0.96 }}
        >
          {/* ================= HEADER ================= */}
          <div className="flex items-center gap-3 px-4 py-4 border-b">
            <div className="w-9 h-9 rounded-full bg-[#FFF4EF] flex items-center justify-center">
              <FiSearch className="text-[#F4612B]" />
            </div>

            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Tours, Hotels or Car Rentals"
              className="flex-1 text-sm md:text-lg font-medium outline-none"
            />

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <FiX />
            </button>
          </div>


          {/* ================= TABS ================= */}
          <div className="relative flex gap-3 px-4 py-3 border-b overflow-x-auto hide-scrollbar">
            {["tours", "hotels", "cars"].map((tab) => {
              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setFilters([]);
                  }}
                  className={`
          relative px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap
          transition-colors
          ${isActive
                      ? "text-white"
                      : "text-[#F4612B] bg-[#FFF4EF] hover:bg-[#FFE6DC]"
                    }
        `}
                >
                  {/* 🔥 ACTIVE BACKGROUND */}
                  {isActive && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-full bg-[#F4612B]"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}

                  {/* LABEL */}
                  <span className="relative z-10">
                    {tab === "cars"
                      ? "Car Rental"
                      : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </span>
                </button>
              );
            })}
          </div>


          {/* ================= BODY ================= */}
          <div className="grid md:grid-cols-3 gap-6 p-6">
            {/* ================= RESULTS ================= */}
            <div className="md:col-span-2 space-y-4 max-h-[55vh] overflow-y-auto pr-2 hide-scrollbar">
              {/* MOBILE FILTER BUTTON */}
              <div className="md:hidden flex justify-end">
                <button
                  onClick={() => setShowMobileFilter(true)}
                  className="px-4 py-2 rounded-full text-sm font-semibold bg-[#FFF4EF] text-[#F4612B]"
                >
                  Filter
                </button>
              </div>
              {activeTab === "tours" &&
                filteredTours.map((t) => (
                  <Card key={t.id} data={t} onClose={onClose} />
                ))}
              {activeTab === "hotels" &&
                filteredHotels.map((h) => (
                  <Card key={h.id} data={h} onClose={onClose} />
                ))}
              {activeTab === "cars" &&
                filteredCars.map((c) => (
                  <Card key={c.id} data={c} onClose={onClose} />
                ))}


            </div>

            {/* ================= DESKTOP FILTER ================= */}
            <div className="hidden md:block border-l pl-6">
              <FilterSection
                activeTab={activeTab}
                filters={filters}
                setFilters={setFilters}
              />
            </div>
          </div>
        </motion.div>

        {/* ================= MOBILE FILTER MODAL ================= */}
        <AnimatePresence>
          {showMobileFilter && (
            <motion.div
              className="fixed inset-0 z-[10000] bg-black/40 flex items-end md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-full bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
                initial={{ y: 300 }}
                animate={{ y: 0 }}
                exit={{ y: 300 }}
              >
                <div className="flex justify-between mb-4">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  <button onClick={() => setShowMobileFilter(false)} className="text-[#F4612B]">
                    Close
                  </button>
                </div>

                <FilterSection
                  activeTab={activeTab}
                  filters={filters}
                  setFilters={setFilters}
                />

                <button
                  onClick={() => setShowMobileFilter(false)}
                  className="w-full mt-4 py-3 rounded-full bg-[#F4612B] text-white font-semibold"
                >
                  Apply Filters
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function Card({ data, onClose }) {
  const navigate = useNavigate();

  if (!data) return null;

  const handleClick = () => {
    if (data.path) {
      navigate(data.path);
      onClose(); // ✅ CLOSE SEARCH OVERLAY
    }
  };

  return (
    <div
      onClick={handleClick}
      className="
        cursor-pointer
        flex flex-col md:flex-row gap-4
        p-4 rounded-2xl border
        hover:bg-[#FFF8F4]
        hover:shadow-md
        transition
      "
    >
      <img
        src={data.image || "/placeholder.webp"}
        alt={data.title || data.name}
        className="w-full md:w-24 h-32 md:h-20 rounded-xl object-cover"
      />

      <div className="flex-1 space-y-1">
        <h3 className="font-semibold">
          {data.title || data.name}
        </h3>

        {data.days && (
          <p className="text-sm text-[#F4612B]">
            {data.days}
          </p>
        )}

        {(data.desc || data.shortDesc) && (
          <p className="text-sm text-gray-600">
            {data.desc || data.shortDesc}
          </p>
        )}

        {data.pricePerKm && (
          <div className="text-xs text-gray-700">
            ₹{data.pricePerKm}/km • {data.seater}
          </div>
        )}
      </div>
    </div>
  );
}



function FilterSection({ activeTab, filters, setFilters }) {
  const options =
    activeTab === "tours"
      ? [
        "group",
        "individual",
        "08 Days / 07 Nights",
        "07 Days / 06 Nights",
        "05 Days / 04 Nights",
      ]
      : activeTab === "hotels"
        ? [
          "ahmedabad",
          "dwarka",
          "junagadh",
          "sasan gir",
          "vadodara",
          "somnath"
        ]
        : ["cars", "buses", "tempo travellers"]

  return options.map((opt) => (
    <label
      key={opt}
      className="flex items-center gap-2 mb-3 text-sm capitalize"
    >
      <input
        type="checkbox"
        checked={filters.includes(opt)}
        onChange={() =>
          setFilters((f) =>
            f.includes(opt)
              ? f.filter((x) => x !== opt)
              : [...f, opt]
          )
        }
      />
      {opt === "group"
        ? "Group Tour"
        : opt === "individual"
          ? "Individual Tour"
          : opt}
    </label>
  ));
}
