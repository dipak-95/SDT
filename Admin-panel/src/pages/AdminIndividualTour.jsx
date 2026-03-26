import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Trash2,
  Edit,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { toast } from "react-toastify";
import AdminItinerary from "../components/Adminiteranary";

const BASE_URL = "https://api.sdtour.online";

/* ================= IMAGE SLIDER ================= */
const AdminImageSlider = ({ images }) => {
  const [index, setIndex] = useState(0);
  if (!images || images.length === 0) return null;

  const prev = () =>
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));

  const next = () =>
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative h-40 w-full overflow-hidden rounded-lg mb-3">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={`${BASE_URL}${images[index]}`}
          className="h-40 w-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-1 rounded-full">
            <ChevronLeft size={18} />
          </button>
          <button onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-1 rounded-full">
            <ChevronRight size={18} />
          </button>
        </>
      )}
    </div>
  );
};

/* ================= HELPERS ================= */
const emptyForm = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  days: "",
  nights: "",
  location: "",
  oldPrice: "",
  discount: "",
  images: null
};

const formatInputDate = (d) =>
  d ? new Date(d).toISOString().split("T")[0] : "";

const daysNights = (s, e) => {
  const days = Math.ceil((new Date(e) - new Date(s)) / 86400000) + 1;
  return `${days} Days / ${days - 1} Nights`;
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

/* ================= MAIN ================= */
const AdminIndividualTour = () => {
  const [tours, setTours] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showItinerary, setShowItinerary] = useState(false);
  const [createdTourId, setCreatedTourId] = useState(null);
  const [itineraryDays, setItineraryDays] = useState(0);

  /* FETCH */
  const fetchTours = async () => {
    const res = await axios.get(`${BASE_URL}/individual-tours`);
    setTours(res.data);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  /* ADD / UPDATE */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    Object.keys(form).forEach((key) => {
      if (key !== "images") fd.append(key, form[key]);
    });

    if (form.images) {
      Array.from(form.images).forEach((img) =>
        fd.append("images", img)
      );
    }

    try {
      let res;

      if (editingId) {
        res = await axios.put(
          `${BASE_URL}/individual-tours/${editingId}`,
          fd
        );
        toast.success("Individual tour updated ✅");
      } else {
        res = await axios.post(
          `${BASE_URL}/individual-tours`,
          fd
        );
        toast.success("Individual tour added 🎉");

        /* 🔥 OPEN ITINERARY */
        setCreatedTourId(res.data._id);
        setItineraryDays(Number(form.days));
        setShowItinerary(true);
        setOpen(false);
      }

      setOpen(false);
      setForm(emptyForm);
      setEditingId(null);
      fetchTours();

    } catch (err) {
      toast.error("Operation failed ❌");
    } finally {
      setLoading(false);
    }
  };

  /* EDIT */
  const handleEdit = (tour) => {
    setForm({
      title: tour.title,
      description: tour.description,
      startDate: formatInputDate(tour.startDate),
      endDate: formatInputDate(tour.endDate),
      days: tour.days,
      nights: tour.nights,
      location: tour.location,
      oldPrice: tour.oldPrice,
      discount: tour.discount,
      images: null
    });
    setEditingId(tour._id);
    setOpen(true);
  };

  /* DELETE */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this tour?")) return;
    await axios.delete(`${BASE_URL}/individual-tours/${id}`);
    toast.info("Tour deleted 🗑️");
    fetchTours();
  };

  const calculateNewPrice = (oldPrice, discount) => {
    if (!discount) return oldPrice;
    return Math.round(oldPrice - (oldPrice * discount) / 100);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#f4612b]">
          Individual Tours
        </h1>
        <button
          onClick={() => {
            setForm(emptyForm);
            setEditingId(null);
            setOpen(true);
          }}
          className="bg-[#f4612b] text-white px-4 py-2 rounded-lg"
        >
          + Add Individual Tour
        </button>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tours.map((t) => (
          <div key={t._id} className="bg-white p-4 rounded-xl shadow">
            <AdminImageSlider images={t.images} />

            <h2 className="font-bold">{t.title}</h2>
            <p className="text-sm text-gray-600">{t.description}</p>
            <p className="text-sm mt-2">
              📅 {formatDate(t.startDate)} → {formatDate(t.endDate)}
            </p>
            <p className="text-sm mt-1">
              ⏱ {daysNights(t.startDate, t.endDate)}
            </p>
            <p className="text-sm text-gray-500">📍 {t.location}</p>

            <div className="mt-2 flex items-center gap-2">
              <span className="line-through text-gray-400 text-sm">
                ₹ {t.oldPrice}
              </span>
              <span className="text-lg font-bold text-[#f4612b]">
                ₹ {calculateNewPrice(t.oldPrice, t.discount)}
              </span>
              {t.discount > 0 && (
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                  {t.discount}% OFF
                </span>
              )}
            </div>

            <div className="flex gap-4 mt-3">
              <button onClick={() => handleEdit(t)}
                className="text-blue-600 flex gap-1 text-sm">
                <Edit size={16} /> Edit
              </button>
              <button onClick={() => handleDelete(t._id)}
                className="text-red-600 flex gap-1 text-sm">
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50
                 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              className="bg-white w-full max-w-lg rounded-2xl p-6"
            >
              {/* ===== HEADER ===== */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#f4612b]">
                  {editingId ? "Edit Individual Tour" : "Add Individual Tour"}
                </h2>
                <X
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => setOpen(false)}
                />
              </div>

              {/* ===== FORM ===== */}
              <form onSubmit={handleSubmit} className="space-y-4">

                <input
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  required
                  className="w-full border p-2 rounded"
                />

                <textarea
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  required
                  className="w-full border p-2 rounded"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) =>
                      setForm({ ...form, startDate: e.target.value })
                    }
                    required
                    className="border p-2 rounded"
                  />
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) =>
                      setForm({ ...form, endDate: e.target.value })
                    }
                    required
                    className="border p-2 rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Days"
                    value={form.days}
                    onChange={(e) =>
                      setForm({ ...form, days: e.target.value })
                    }
                    required
                    className="border p-2 rounded"
                  />
                  <input
                    type="number"
                    placeholder="Nights"
                    value={form.nights}
                    onChange={(e) =>
                      setForm({ ...form, nights: e.target.value })
                    }
                    required
                    className="border p-2 rounded"
                  />
                </div>

                <input
                  placeholder="Location"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  required
                  className="w-full border p-2 rounded"
                />

                <input
                  type="number"
                  placeholder="Old Price"
                  value={form.oldPrice}
                  onChange={(e) =>
                    setForm({ ...form, oldPrice: e.target.value })
                  }
                  required
                  className="w-full border p-2 rounded"
                />

                <input
                  type="number"
                  placeholder="Discount (%)"
                  value={form.discount}
                  onChange={(e) =>
                    setForm({ ...form, discount: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />

                <input
                  type="file"
                  multiple
                  onChange={(e) =>
                    setForm({ ...form, images: e.target.files })
                  }
                  className="w-full border p-2 rounded"
                />

                <button
                  disabled={loading}
                  className="w-full bg-[#f4612b] text-white py-2
                       rounded-lg font-semibold"
                >
                  {loading ? "Saving..." : "Save Tour"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {showItinerary && (
        <AdminItinerary
          tourId={createdTourId}
          totalDays={itineraryDays}
          type="individual"
          onClose={() => setShowItinerary(false)}
        />
      )}
    </div>
  );
};

export default AdminIndividualTour;
