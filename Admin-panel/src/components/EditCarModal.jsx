import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:1005";

const FEATURE_OPTIONS = [
  { key: "ac", label: "AC ❄️" },
  { key: "gps", label: "GPS 📍" },
  { key: "bluetooth", label: "Bluetooth 🔊" },
  { key: "music", label: "Music 🎵" },
  { key: "charging", label: "Charging 🔌" },
  { key: "luggage", label: "Luggage 🧳" }
];

export default function EditCarModal({ car, onClose, onUpdated }) {
  const [images, setImages] = useState([]);
  const [form, setForm] = useState({
    name: "",
    type: "",
    seats: "",
    pricePerKm: "",
    fuelType: "",
    features: []
  });

  /* AUTO-FILL */
  useEffect(() => {
    if (car) {
      setForm({
        name: car.name || "",
        type: car.type || "car",
        seats: car.seats || "",
        pricePerKm: car.pricePerKm || "",
        fuelType: car.fuelType || "petrol",
        features: car.features || []
      });
    }
  }, [car]);

  const submit = async () => {
    try {
      const data = new FormData();

      Object.keys(form).forEach(key => {
        if (Array.isArray(form[key])) {
          form[key].forEach(v => data.append(key, v));
        } else {
          data.append(key, form[key]);
        }
      });

      images.forEach(img => data.append("images", img));

      await axios.put(`${BASE_URL}/cars/${car._id}`, data);
      toast.success("Car updated successfully 🚘");
      onUpdated();
      onClose();
    } catch (err) {
      toast.error("Failed to update car");
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl"
      >
        {/* ❌ CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4
          text-gray-400 hover:text-black
          text-2xl font-semibold transition"
        >
          ×
        </button>

        {/* HEADER */}
        <h2 className="text-xl font-bold text-[#F4612B] mb-4">
          Edit Vehicle
        </h2>

        <div className="space-y-3">
          <input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="input-field"
            placeholder="Car Name"
          />

          <select
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
            className="input-field"
          >
            <option value="car">Car</option>
            <option value="bus">Bus</option>
            <option value="tempo">Tempo Traveller</option>
          </select>

          <input
            value={form.seats}
            onChange={e => setForm({ ...form, seats: e.target.value })}
            className="input-field"
            placeholder="Seats"
          />

          <input
            value={form.pricePerKm}
            onChange={e =>
              setForm({ ...form, pricePerKm: e.target.value })
            }
            className="input-field"
            placeholder="₹ per KM"
          />

          <select
            value={form.fuelType}
            onChange={e =>
              setForm({ ...form, fuelType: e.target.value })
            }
            className="input-field"
          >
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="cng">CNG</option>
            <option value="electric">Electric</option>
          </select>

          {/* FEATURES */}
          <div className="grid grid-cols-2 gap-2">
            {FEATURE_OPTIONS.map(f => (
              <label key={f.key} className="flex items-center gap-2 text-sm">
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

          {/* IMAGE REPLACE */}
          <label className="block">
            <span className="text-sm text-gray-600">
              Replace Images
            </span>
            <input
              type="file"
              multiple
              onChange={e => setImages([...e.target.files])}
              className="block mt-2 w-full text-sm text-gray-600
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:bg-[#F4612B]/10 file:text-[#F4612B]"
            />
          </label>

          <button
            onClick={submit}
            className="w-full bg-[#F4612B] hover:bg-[#e65a0f]
            text-white py-2.5 rounded-lg font-semibold transition"
          >
            Update Car
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
