import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://72.62.195.222:7345";

/* ===== FEATURE OPTIONS ===== */
const FEATURE_OPTIONS = [
  { key: "ac", label: "AC ❄️" },
  { key: "gps", label: "GPS 📍" },
  { key: "bluetooth", label: "Bluetooth 🔊" },
  { key: "music", label: "Music System 🎵" },
  { key: "charging", label: "Charging Port 🔌" },
  { key: "luggage", label: "Luggage Space 🧳" }
];

export default function AddCarModal({ onClose, onAdded }) {
  const [form, setForm] = useState({
    name: "",
    type: "car",
    seats: "",
    pricePerKm: "",
    fuelType: "petrol",
    features: []
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  /* 🔒 Disable background scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  /* ===== SUBMIT ===== */
  const submit = async () => {
    try {
      setLoading(true);

      const data = new FormData();
      Object.keys(form).forEach(key => {
        if (Array.isArray(form[key])) {
          form[key].forEach(v => data.append(key, v));
        } else {
          data.append(key, form[key]);
        }
      });
      images.forEach(img => data.append("images", img));

      await axios.post(`${BASE_URL}/cars`, data);
      toast.success("Car added successfully 🚘");
      onAdded();
      onClose();
    } catch (err) {
      toast.error("Failed to add car");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.95, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 30 }}
        transition={{ duration: 0.3 }}
        className="
          w-full max-w-lg bg-white rounded-2xl shadow-2xl
          max-h-[90vh] flex flex-col
        "
      >
        {/* ===== HEADER (FIXED) ===== */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-[#F4612B]">
            Add New Vehicle
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        {/* ===== SCROLLABLE FORM ===== */}
        <div className="p-6 overflow-y-auto space-y-4 hide-scrollbar">
          <input
            placeholder="Car Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="input-field"
          />

          <select
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
            className="input-field"
          >
            <option value="car">Car</option>
            <option value="bus">Bus</option>
            <option value="tempo traveller">Tempo Traveller</option>
          </select>

          <select
            value={form.fuelType}
            onChange={e => setForm({ ...form, fuelType: e.target.value })}
            className="input-field"
          >
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="cng">CNG</option>
            <option value="electric">Electric</option>
          </select>

          <input
            type="number"
            placeholder="Number of Seats"
            value={form.seats}
            onChange={e => setForm({ ...form, seats: e.target.value })}
            className="input-field"
          />

          <input
            type="number"
            placeholder="₹ per KM"
            value={form.pricePerKm}
            onChange={e => setForm({ ...form, pricePerKm: e.target.value })}
            className="input-field"
          />

          {/* FEATURES */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Vehicle Features
            </p>
            <div className="grid grid-cols-2 gap-3">
              {FEATURE_OPTIONS.map(f => (
                <label
                  key={f.key}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={form.features.includes(f.key)}
                    onChange={() =>
                      setForm(prev => ({
                        ...prev,
                        features: prev.features.includes(f.key)
                          ? prev.features.filter(x => x !== f.key)
                          : [...prev.features, f.key]
                      }))
                    }
                    className="accent-[#F4612B]"
                  />
                  {f.label}
                </label>
              ))}
            </div>
          </div>

          {/* IMAGES */}
          <label className="block">
            <span className="text-sm text-gray-600 mb-1 block">
              Car Images
            </span>
            <input
              type="file"
              multiple
              onChange={e => setImages([...e.target.files])}
              className="block w-full text-sm text-gray-600
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:bg-[#F4612B]/10 file:text-[#F4612B]"
            />
          </label>
        </div>

        {/* ===== FOOTER (FIXED) ===== */}
        <div className="px-6 py-4 border-t">
          <button
            onClick={submit}
            disabled={loading}
            className={`w-full py-3 rounded-full font-semibold text-white
              ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#F4612B] hover:bg-[#e65a0f]"
              }`}
          >
            {loading ? "Adding..." : "Add Car"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
