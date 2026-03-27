import { useState, useEffect } from "react";
import axios from "axios";
import { X, Trash2, Plus, Wifi, Coffee, Car, Waves, ThermometerSnowflake, Tv, Utensils, Dumbbell, Shield, Key, UserCheck, Map, Phone, Info } from "lucide-react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = "https://api.sdtour.online/facilities";

const AVAILABLE_ICONS = [
  { name: "wifi", Icon: Wifi },
  { name: "meal", Icon: Coffee },
  { name: "parking", Icon: Car },
  { name: "pool", Icon: Waves },
  { name: "ac", Icon: ThermometerSnowflake },
  { name: "tv", Icon: Tv },
  { name: "restaurant", Icon: Utensils },
  { name: "gym", Icon: Dumbbell },
  { name: "security", Icon: Shield },
  { name: "reception", Icon: Key },
  { name: "staff", Icon: UserCheck },
  { name: "area", Icon: Map },
  { name: "support", Icon: Phone },
  { name: "info", Icon: Info },
];

export default function FacilityManageModal({ onClose }) {
  const [facilities, setFacilities] = useState([]);
  const [newName, setNewName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("wifi");
  const [loading, setLoading] = useState(false);

  const fetchFacilities = async () => {
    try {
      const res = await axios.get(API_BASE);
      setFacilities(res.data);
    } catch (err) {
      toast.error("Failed to fetch facilities");
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setLoading(true);
    try {
      await axios.post(API_BASE, { name: newName.trim(), iconName: selectedIcon });
      toast.success("Facility added");
      setNewName("");
      fetchFacilities();
    } catch (err) {
      toast.error(err.response?.data?.msg || "Add failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this facility?")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      toast.success("Facility deleted");
      fetchFacilities();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        <div className="p-6 border-b flex justify-between items-center bg-[#F4612B] text-white">
          <h2 className="text-xl font-bold">Manage Facilities</h2>
          <button onClick={onClose} className="hover:rotate-90 transition-transform">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Facility Name (e.g. Free Wifi)"
                className="flex-1 border rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#F4612B] outline-none text-sm"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <button
                disabled={loading}
                className="bg-[#F4612B] text-white px-4 py-2 rounded-xl flex items-center gap-1 text-sm font-semibold hover:scale-105 transition"
              >
                <Plus size={18} /> Add
              </button>
            </div>

            {/* ICON SELECTOR */}
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Select Icon</p>
              <div className="grid grid-cols-7 gap-2 max-h-40 overflow-y-auto p-2 border rounded-xl bg-gray-50 scrollbar-hide">
                {AVAILABLE_ICONS.map((item) => (
                  <button
                    type="button"
                    key={item.name}
                    onClick={() => setSelectedIcon(item.name)}
                    className={`p-3 rounded-lg flex items-center justify-center transition-all ${
                      selectedIcon === item.name
                        ? "bg-[#F4612B] text-white scale-110 shadow-lg"
                        : "bg-white text-gray-400 hover:text-orange-400"
                    }`}
                  >
                    <item.Icon size={20} />
                  </button>
                ))}
              </div>
            </div>
          </form>

          <div className="max-h-[250px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {facilities.map((fac) => {
              const IconComp = AVAILABLE_ICONS.find(i => i.name === fac.iconName)?.Icon || Info;
              return (
                <div
                  key={fac._id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-orange-50 transition border border-transparent hover:border-orange-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm text-orange-500 border border-gray-100">
                      <IconComp size={20} />
                    </div>
                    <span className="font-semibold text-gray-700 capitalize">{fac.name}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(fac._id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
