import { useState, useEffect } from "react";
import axios from "axios";
import CityManageModal from "../components/CityManageModal";
import FacilityManageModal from "../components/FacilityManageModal";
import HotelCard from "../components/HotelCards";
import HotelFormModal from "../components/HotelFormModel";
import PriceCalendarModal from "../components/PricecalenderModal";
import { Settings, Plus, MapPin, ListFilter } from "lucide-react";

export default function Hotel() {
  const [hotels, setHotels] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("all");
  const [openForm, setOpenForm] = useState(false);
  const [editHotel, setEditHotel] = useState(null);
  
  const [showCityManage, setShowCityManage] = useState(false);
  const [showFacilityManage, setShowFacilityManage] = useState(false);

  const [priceHotel, setPriceHotel] = useState(null); 

  const fetchHotels = async () => {
    try {
      const res = await axios.get("https://api.sdtour.online/hotels");
      setHotels(res.data);
    } catch (err) {
      console.error("Fetch hotels failed", err);
    }
  };

  const fetchCities = async () => {
    try {
      const res = await axios.get("https://api.sdtour.online/cities");
      setCities(res.data);
    } catch (err) {
      console.error("Fetch cities failed", err);
    }
  };

  useEffect(() => {
    fetchHotels();
    fetchCities();
  }, []);

  /* 🔥 FILTER LOGIC */
  const filteredHotels =
    selectedCity === "all"
      ? hotels
      : hotels.filter(hotel => hotel.city?.toLowerCase() === selectedCity?.toLowerCase());

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER SECTION */}
      <div className="bg-white rounded-3xl shadow-sm p-6 mb-8 border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <span className="p-2 bg-orange-100 text-[#F4612B] rounded-xl">🏨</span>
              Hotel Management
            </h1>
            <p className="text-gray-500 text-sm">Create, manage and update your hotel properties</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* MANAGE BUTTONS */}
            <button
              onClick={() => setShowCityManage(true)}
              className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-semibold hover:bg-gray-50 hover:border-orange-300 hover:text-[#F4612B] transition-all shadow-sm active:scale-95 group"
            >
              <MapPin size={18} className="group-hover:rotate-12 transition-transform" />
              Manage City
            </button>
            <button
              onClick={() => setShowFacilityManage(true)}
              className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-semibold hover:bg-gray-50 hover:border-orange-300 hover:text-[#F4612B] transition-all shadow-sm active:scale-95 group"
            >
              <Settings size={18} className="group-hover:rotate-45 transition-transform" />
              Manage Facility
            </button>
            
            <div className="h-10 w-px bg-gray-200 mx-2 hidden xl:block" />

            {/* ADD BUTTON */}
            <button
              onClick={() => setOpenForm(true)}
              className="flex items-center gap-2 bg-[#F4612B] text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-orange-200 hover:bg-[#e65a0f] hover:-translate-y-0.5 active:translate-y-0 transition-all border-b-4 border-[#c74a1b]"
            >
              <Plus size={20} />
              Add New Hotel
            </button>
          </div>
        </div>

        {/* DYNAMIC CITY FILTERS */}
        <div className="mt-8 flex flex-wrap items-center gap-3 pt-6 border-t border-gray-100">
           <div className="flex items-center gap-2 text-gray-400 mr-2">
             <ListFilter size={18} />
             <span className="text-sm font-bold uppercase tracking-widest">Filter:</span>
           </div>
           <button
             onClick={() => setSelectedCity("all")}
             className={`px-6 py-2 rounded-xl font-bold transition-all ${
               selectedCity === "all"
                 ? "bg-[#F4612B] text-white shadow-md shadow-orange-100"
                 : "bg-white text-gray-400 hover:bg-orange-50 hover:text-orange-500 border border-transparent"
             }`}
           >
             ALL PROPERTIES
           </button>
           {cities.map(city => (
             <button
               key={city._id}
               onClick={() => setSelectedCity(city.name)}
               className={`px-6 py-2 rounded-xl font-bold capitalize transition-all ${
                 selectedCity === city.name
                   ? "bg-[#F4612B] text-white shadow-md shadow-orange-100"
                   : "bg-white text-gray-400 hover:bg-orange-50 hover:text-orange-500 border border-transparent"
               }`}
             >
               {city.name}
             </button>
           ))}
        </div>
      </div>

      {/* HOTEL CARDS */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredHotels.map(hotel => (
            <HotelCard
              key={hotel._id}
              hotel={hotel}
              refresh={fetchHotels}
              onEdit={() => {
                setEditHotel(hotel);
                setOpenForm(true);
              }}
              onPrice={() => setPriceHotel(hotel)}
            />
          ))}
        </div>
      </div>



      {/* ADD / EDIT HOTEL MODAL */}
      {openForm && (
        <HotelFormModal
          close={() => {
            setOpenForm(false);
            setEditHotel(null);
          }}
          editData={editHotel}
          refresh={fetchHotels}
        />
      )}

      {/* MODALS */}
      {showCityManage && (
        <CityManageModal 
          onClose={() => {
            setShowCityManage(false);
            fetchCities();
          }} 
        />
      )}
      
      {showFacilityManage && (
        <FacilityManageModal 
          onClose={() => setShowFacilityManage(false)} 
        />
      )}

      {/* PRICE CALENDAR MODAL */}
      {priceHotel && (
        <PriceCalendarModal
          hotel={priceHotel}
          close={() => setPriceHotel(null)}
        />
      )}
    </div>
  );
}
