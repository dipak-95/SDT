import { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { Settings, MapPin, ListFilter, Plus } from "lucide-react";
import AddCarModal from "../components/AddCarModal";
import AdminCarCard from "../components/AdminCarCard";
import CarCategoryManageModal from "../components/CarCategoryManageModal";
import CarFacilityManageModal from "../components/CarFacilityManageModal";

const BASE_URL = "https://api.sdtour.online";

export default function AdminCar() {
  const [cars, setCars] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [showCategoryManage, setShowCategoryManage] = useState(false);
  const [showFacilityManage, setShowFacilityManage] = useState(false);

  const fetchCars = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/cars`);
      setCars(res.data);
    } catch(err) { console.error(err); }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/car-categories`);
      setCategories(res.data);
    } catch(err) { console.error(err); }
  };

  useEffect(() => {
    fetchCars();
    fetchCategories();
  }, []);

  const filteredCars =
    filter === "all" ? cars : cars.filter(c => c.type?.toLowerCase() === filter?.toLowerCase());

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="bg-white rounded-3xl shadow-sm p-6 mb-8 border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <span className="p-2 bg-orange-100 text-[#F4612B] rounded-xl">🚘</span>
              Car Management
            </h1>
            <p className="text-gray-500 text-sm">Manage car categories, facilities, and fleet</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowCategoryManage(true)}
              className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-semibold hover:bg-gray-50 hover:border-orange-300 hover:text-[#F4612B] transition-all shadow-sm active:scale-95 group"
            >
              <MapPin size={18} className="group-hover:rotate-12 transition-transform" />
              Manage Category
            </button>
            <button
              onClick={() => setShowFacilityManage(true)}
              className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-semibold hover:bg-gray-50 hover:border-orange-300 hover:text-[#F4612B] transition-all shadow-sm active:scale-95 group"
            >
              <Settings size={18} className="group-hover:rotate-45 transition-transform" />
              Manage Facility
            </button>
            
            <div className="h-10 w-px bg-gray-200 mx-2 hidden xl:block" />

            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 bg-[#F4612B] text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-orange-200 hover:bg-[#e65a0f] hover:-translate-y-0.5 active:translate-y-0 transition-all border-b-4 border-[#c74a1b]"
            >
              <Plus size={20} /> Add Car
            </button>
          </div>
        </div>

        {/* FILTERS */}
        <div className="mt-8 flex flex-wrap items-center gap-3 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2 text-gray-400 mr-2">
            <ListFilter size={18} />
            <span className="text-sm font-bold uppercase tracking-widest">Filter:</span>
          </div>
          
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-xl font-bold transition-all ${
              filter === "all"
                ? "bg-[#F4612B] text-white shadow-md shadow-orange-100"
                : "bg-white text-gray-400 hover:bg-orange-50 hover:text-orange-500 border border-transparent"
            }`}
          >
            ALL
          </button>
          
          {categories.map(c => (
            <button
              key={c._id}
              onClick={() => setFilter(c.name)}
              className={`px-6 py-2 rounded-xl font-bold capitalize transition-all ${
                filter === c.name
                  ? "bg-[#F4612B] text-white shadow-md shadow-orange-100"
                  : "bg-white text-gray-400 hover:bg-orange-50 hover:text-orange-500 border border-transparent"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCars.map(car => (
          <AdminCarCard
            key={car._id}
            car={car}
            fetchCars={fetchCars}
          />
        ))}
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {open && (
          <AddCarModal
            onClose={() => setOpen(false)}
            onAdded={fetchCars}
          />
        )}
      </AnimatePresence>

      {showCategoryManage && (
        <CarCategoryManageModal
          onClose={() => {
            setShowCategoryManage(false);
            fetchCategories();
          }}
        />
      )}
      
      {showFacilityManage && (
        <CarFacilityManageModal
          onClose={() => setShowFacilityManage(false)}
        />
      )}
    </div>
  );
}
