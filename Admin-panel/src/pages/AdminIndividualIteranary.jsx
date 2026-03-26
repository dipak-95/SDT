import { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";

const BASE_URL = "https://api.sdtour.online";

const AdminIndividualIteranary = ({ tourId }) => {
  const [days, setDays] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    points: ""
  });

  /* ================= FETCH ITINERARY ================= */
  const fetchDays = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/individual-tours/${tourId}/individualitinerary`
      );
      setDays(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("FETCH ITINERARY ERROR:", err);
    }
  };

  useEffect(() => {
    if (tourId) fetchDays();
  }, [tourId]);

  /* ================= DELETE DAY ================= */
  const deleteDay = async (dayId) => {
    if (!window.confirm("Delete this day itinerary?")) return;

    try {
      await axios.delete(
        `${BASE_URL}/individual-tours/individualitinerary/${dayId}`
      );
      fetchDays();
    } catch (err) {
      console.error("DELETE DAY ERROR:", err);
    }
  };

  /* ================= START EDIT ================= */
  const startEdit = (day) => {
    setEditing(day._id);
    setForm({
      title: day.title,
      points: day.points.join("\n")
    });
  };

  /* ================= UPDATE DAY ================= */
  const updateDay = async () => {
    try {
      await axios.put(
        `${BASE_URL}/individual-tours/individualitinerary/${editing}`,
        {
          title: form.title,
          points: form.points
            .split("\n")
            .map(p => p.trim())
            .filter(Boolean)
        }
      );

      setEditing(null);
      fetchDays();
    } catch (err) {
      console.error("UPDATE DAY ERROR:", err);
    }
  };

  return (
    <div className="space-y-4">

      {/* ================= DAYS LIST ================= */}
      {days.map((day) => (
        <div
          key={day._id}
          className="border p-4 rounded-xl bg-white shadow"
        >
          {/* HEADER */}
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-gray-800">
              Day {day.day}: {day.title}
            </h3>

            <div className="flex gap-2">
              <Edit
                size={18}
                className="cursor-pointer text-blue-600"
                onClick={() => startEdit(day)}
              />
              <Trash2
                size={18}
                className="cursor-pointer text-red-600"
                onClick={() => deleteDay(day._id)}
              />
            </div>
          </div>

          {/* EDIT FORM */}
          {editing === day._id && (
            <div className="mt-3 space-y-2">
              <input
                className="border p-2 w-full rounded"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <textarea
                className="border p-2 w-full rounded"
                rows={4}
                value={form.points}
                onChange={(e) =>
                  setForm({ ...form, points: e.target.value })
                }
              />

              <div className="flex gap-3">
                <button
                  onClick={updateDay}
                  className="bg-green-600 text-white px-4 py-1 rounded"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditing(null)}
                  className="bg-gray-300 px-4 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* EMPTY STATE */}
      {days.length === 0 && (
        <p className="text-center text-gray-500">
          No itinerary added yet.
        </p>
      )}
    </div>
  );
};

export default AdminIndividualIteranary;
