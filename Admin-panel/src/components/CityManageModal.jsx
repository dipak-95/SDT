import { useState, useEffect } from "react";
import axios from "axios";
import { X, Trash2, Plus } from "lucide-react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = "https://api.sdtour.online/cities";

export default function CityManageModal({ onClose }) {
  const [cities, setCities] = useState([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCities = async () => {
    try {
      const res = await axios.get(API_BASE);
      setCities(res.data);
    } catch (err) {
      toast.error("Failed to fetch cities");
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setLoading(true);
    try {
      await axios.post(API_BASE, { name: newName.trim() });
      toast.success("City added");
      setNewName("");
      fetchCities();
    } catch (err) {
      toast.error(err.response?.data?.msg || "Add failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this city?")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      toast.success("City deleted");
      fetchCities();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="p-6 border-b flex justify-between items-center bg-[#F4612B] text-white">
          <h2 className="text-xl font-bold">Manage Cities</h2>
          <button onClick={onClose} className="hover:rotate-90 transition-transform">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <form onSubmit={handleAdd} className="flex gap-2">
            <input
              type="text"
              placeholder="Add New City (e.g. Surat)"
              className="flex-1 border rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#F4612B] outline-none"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button
              disabled={loading}
              className="bg-[#F4612B] text-white p-2 rounded-xl hover:scale-105 active:scale-95 transition"
            >
              <Plus size={24} />
            </button>
          </form>

          <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {cities.map((city) => (
              <div
                key={city._id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-orange-50 transition"
              >
                <span className="font-semibold text-gray-700 capitalize">
                  {city.name}
                </span>
                <button
                  onClick={() => handleDelete(city._id)}
                  className="text-red-500 hover:scale-110 active:scale-90 transition p-1"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            {cities.length === 0 && (
              <p className="text-center text-gray-500 py-4 italic">No cities added yet</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
