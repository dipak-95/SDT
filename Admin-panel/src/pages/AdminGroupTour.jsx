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
import AdminIteranary from "../components/Adminiteranary";

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
          src={`https://api.sdtour.online${images[index]}`}
          className="h-40 w-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2
            bg-black/60 text-white p-1 rounded-full"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2
            bg-black/60 text-white p-1 rounded-full"
          >
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
  // price: "",
  days: "",
  nights: "",
  oldPrice: "",
  discount: "",
  location: "",
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
const AdminGroupTour = () => {
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
    const res = await axios.get("https://api.sdtour.online/group-tours");
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
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("startDate", form.startDate);
    fd.append("endDate", form.endDate);
    fd.append("days", form.days);
    fd.append("nights", form.nights);
    fd.append("location", form.location);
    fd.append("oldPrice", form.oldPrice);
    fd.append("discount", form.discount);

    if (form.images) {
      Array.from(form.images).forEach((img) =>
        fd.append("images", img)
      );
    }

    try {
      let res;

      if (editingId) {
        /* UPDATE TOUR */
        res = await axios.put(
          `https://api.sdtour.online/group-tours/${editingId}`,
          fd
        );
        toast.success("Group tour updated ✅", { theme: "light" });
      } else {
        /* ADD TOUR */
        res = await axios.post(
          "https://api.sdtour.online/group-tours",
          fd
        );
        toast.success("Group tour added 🎉", { theme: "light" });

        /* 🔥 IMPORTANT: OPEN ITINERARY FORM */
        setCreatedTourId(res.data._id);
        setShowItinerary(true);
        setItineraryDays(Number(form.days));
        setOpen(false);
      }

      setOpen(false);
      setForm(emptyForm);
      setEditingId(null);
      fetchTours();

    } catch (error) {
      console.error(error);
      toast.error("Operation failed ❌", { theme: "light" });
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
      // price: tour.price,
      oldPrice: tour.oldPrice,
      discount: tour.discount,
      location: tour.location,
      images: null
    });
    setEditingId(tour._id);
    setOpen(true);
  };

  /* DELETE */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this tour?")) return;
    await axios.delete(`https://api.sdtour.online/group-tours/${id}`);
    toast.info("Tour deleted 🗑️", { theme: "light" });
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
          Group Tours
        </h1>
        <button
          onClick={() => {
            setForm(emptyForm);
            setEditingId(null);
            setOpen(true);
          }}
          className="bg-[#f4612b] text-white px-4 py-2 rounded-lg"
        >
          + Add Group Tour
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
              📅 {formatDate(t.startDate)} → {formatDate(t.endDate)}                     </p>
            <p className="text-sm mt-1">
              ⏱ {daysNights(t.startDate, t.endDate)}
            </p>
            {/* <p className="font-semibold text-[#f4612b]">₹ {t.price}</p> */}
            <p className="text-sm text-gray-500 mt-1">
              📍 {t.location}
            </p>

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
              <button
                onClick={() => handleEdit(t)}
                className="text-blue-600 flex gap-1 text-sm items-center"
              >
                <Edit size={16} /> Edit
              </button>
              <button
                onClick={() => handleDelete(t._id)}
                className="flex items-center gap-1 text-red-600 text-sm"
              >
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
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold text-[#f4612b]">
                  {editingId ? "Edit Group Tour" : "Add Group Tour"}
                </h2>
                <X
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>

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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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


                {/* <input
                  type="number"
                  placeholder="Price"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: e.target.value })
                  }
                  required
                  className="w-full border p-2 rounded"
                /> */}
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

                <input type="file" multiple
                  onChange={(e) => setForm({ ...form, images: e.target.files })}
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
          <AdminIteranary
            tourId={createdTourId}
            totalDays={itineraryDays}
              type="group"
            endpointPath="/group-tours/itinerary"
            onClose={() => {
              setShowItinerary(false);
              setForm(emptyForm);
              fetchTours();
            }}
          />
        )}


    </div>
  );
};

export default AdminGroupTour; 
