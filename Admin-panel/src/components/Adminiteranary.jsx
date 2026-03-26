import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { toast } from "react-toastify";

const BASE_URL = "http://72.62.195.222:7345";

/*
  type = "individual" | "group"
*/
const AdminItinerary = ({ tourId, totalDays, type, onClose }) => {
  const endpoint =
    type === "individual"
      ? "/individual-tours/individualitinerary"
      : "/group-tours/itinerary";

  /* ✅ ADD stay FIELD */
  const [daysData, setDaysData] = useState(
    Array.from({ length: totalDays }, (_, i) => ({
      day: i + 1,
      title: "",
      stay: "",        // 👈 NEW
      points: "",
      images: null
    }))
  );

  const [loading, setLoading] = useState(false);

  /* ---------------- UPDATE DAY ---------------- */
  const updateDay = (index, field, value) => {
    setDaysData(prev =>
      prev.map((d, i) =>
        i === index ? { ...d, [field]: value } : d
      )
    );
  };

  /* ---------------- SUBMIT ITINERARY ---------------- */
  const submitItinerary = async () => {
    const invalid = daysData.some(
      d => !d.title.trim() || !d.points.trim()
    );

    if (invalid) {
      toast.error("Please fill title & points for all days");
      return;
    }

    setLoading(true);

    try {
      /* ✅ INCLUDE stay */
      const itineraryPayload = daysData.map(d => ({
        day: d.day,
        title: d.title.trim(),
        stay: d.stay.trim(),        // 👈 SENT TO BACKEND
        points: d.points
          .split("\n")
          .map(p => p.trim())
          .filter(Boolean)
      }));

      const fd = new FormData();
      fd.append("tourId", tourId);
      fd.append("itinerary", JSON.stringify(itineraryPayload));

      daysData.forEach(d => {
        if (d.images) {
          Array.from(d.images).forEach(img => {
            fd.append(`images_${d.day}`, img);
          });
        }
      });

      await axios.post(`${BASE_URL}${endpoint}`, fd);

      toast.success("Itinerary saved successfully 🎉");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save itinerary ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 40 }}
          className="bg-white w-full max-w-3xl rounded-2xl p-6 shadow-xl"
        >
          {/* HEADER */}
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold text-[#f4612b]">
              {type === "individual"
                ? "Add Individual Tour Itinerary"
                : "Add Group Tour Itinerary"}
            </h2>
            <X className="cursor-pointer" onClick={onClose} />
          </div>

          {/* DAYS */}
          <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
            {daysData.map((day, index) => (
              <div key={day.day} className="border rounded-xl p-4">
                <h3 className="font-semibold text-[#f4612b] mb-3">
                  Day {day.day}
                </h3>

                {/* DAY TITLE */}
                <input
                  placeholder="Day Title"
                  value={day.title}
                  onChange={e =>
                    updateDay(index, "title", e.target.value)
                  }
                  className="w-full border p-2 rounded mb-3"
                />

                {/* 🏨 HOTEL / STAY (THIS WAS MISSING) */}
                <input
                  placeholder="Hotel / Stay (e.g. Hotel Somnath Inn)"
                  value={day.stay}
                  onChange={e =>
                    updateDay(index, "stay", e.target.value)
                  }
                  className="w-full border p-2 rounded mb-3"
                />

                {/* POINTS */}
                <textarea
                  placeholder="Points (one per line)"
                  value={day.points}
                  onChange={e =>
                    updateDay(index, "points", e.target.value)
                  }
                  rows={4}
                  className="w-full border p-2 rounded mb-3"
                />

                {/* IMAGES */}
                <input
                  type="file"
                  multiple
                  onChange={e =>
                    updateDay(index, "images", e.target.files)
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
            ))}
          </div>

          {/* SUBMIT */}
          <button
            onClick={submitItinerary}
            disabled={loading}
            className="mt-6 w-full bg-[#f4612b] text-white py-2 rounded-lg font-semibold"
          >
            {loading ? "Saving..." : "Save Full Itinerary"}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminItinerary;
