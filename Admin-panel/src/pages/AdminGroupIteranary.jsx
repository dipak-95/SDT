import { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Trash2, X } from "lucide-react";

const AdminGroupIteranary = ({ tourId }) => {
  const [days, setDays] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    points: ""
  });

  const fetchDays = async () => {
    const res = await axios.get(`https://sdt-7.onrender.com/group-tours/${tourId}`);
    setDays(res.data.itinerary);
  };

  useEffect(() => {
    fetchDays();
  }, []);

  /* DELETE */
  const deleteDay = async (id) => {
    if (!window.confirm("Delete this day?")) return;
    await axios.delete(`https://sdt-7.onrender.com/group-tours/itinerary/${id}`);
    fetchDays();
  };

  /* EDIT */
  const startEdit = (day) => {
    setEditing(day._id);
    setForm({
      title: day.title,
      points: day.points.join("\n")
    });
  };

  const updateDay = async () => {
    await axios.put(`https://sdt-7.onrender.com/group-tours/itinerary/${editing}`, {
      title: form.title,
      points: form.points.split("\n")
    });
    setEditing(null);
    fetchDays();
  };

  return (
    <div className="space-y-4">
      {days.map((day) => (
        <div key={day._id} className="border p-4 rounded-lg">

          <div className="flex justify-between">
            <h3 className="font-bold">
              Day {day.day}: {day.title}
            </h3>

            <div className="flex gap-2">
              <Edit
                className="cursor-pointer text-blue-600"
                onClick={() => startEdit(day)}
              />
              <Trash2
                className="cursor-pointer text-red-600"
                onClick={() => deleteDay(day._id)}
              />
            </div>
          </div>

          {/* EDIT FORM */}
          {editing === day._id && (
            <div className="mt-3 space-y-2">
              <input
                className="border p-2 w-full"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <textarea
                className="border p-2 w-full"
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
    </div>
  );
};

export default AdminGroupIteranary;
