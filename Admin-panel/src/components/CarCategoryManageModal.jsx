import { useState, useEffect } from "react";
import axios from "axios";
import { X, Trash2, Plus } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const API_BASE = "https://api.sdtour.online/car-categories";

export default function CarCategoryManageModal({ onClose }) {
  const [categories, setCategories] = useState([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(API_BASE);
      setCategories(res.data);
    } catch (err) {
      toast.error("Failed to fetch car categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setLoading(true);
    try {
      await axios.post(API_BASE, { name: newName.trim() });
      toast.success("Category added");
      setNewName("");
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.msg || "Add failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      toast.success("Category deleted");
      fetchCategories();
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
          <h2 className="text-xl font-bold">Manage Car Categories</h2>
          <button onClick={onClose} className="hover:rotate-90 transition-transform">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <form onSubmit={handleAdd} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Car, Bus, Tempo"
              className="flex-1 border-2 rounded-xl px-4 py-3 focus:ring-0 focus:border-[#F4612B] outline-none transition-all font-semibold"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button
              disabled={loading}
              className="bg-[#F4612B] text-white px-5 py-3 rounded-xl flex items-center gap-2 font-bold hover:scale-105 transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              <Plus size={20} /> Add
            </button>
          </form>

          <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {categories.length === 0 ? (
              <p className="text-center text-gray-400 py-4 italic">No categories added yet.</p>
            ) : (
              categories.map((cat) => (
                <div
                  key={cat._id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition border border-transparent hover:border-orange-200"
                >
                  <span className="font-bold text-gray-700 capitalize text-lg">{cat.name}</span>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="text-red-500 hover:bg-red-100 p-2 rounded-lg transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
