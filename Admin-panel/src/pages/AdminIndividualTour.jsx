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
          src={images[index] ? `${BASE_URL}${images[index]}` : "https://placehold.co/600x400?text=No+Image"}
          className="h-40 w-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onError={(e) => {
            e.target.src = "https://placehold.co/600x400?text=No+Image";
          }}
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
  days: "",
  nights: "",
  location: "",
  oldPrice: "",
  discount: "",
  images: null,
  includedTickets: [],
  ticketInput: ""
};

const formatDuration = (d, n) => {
  return `${d} Days / ${n} Nights`;
};

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
  const [modalStep, setModalStep] = useState("details"); // "details" | "itinerary"

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
      if (key !== "images" && key !== "ticketInput" && key !== "includedTickets") {
        fd.append(key, form[key]);
      }
    });

    if (form.includedTickets && form.includedTickets.length > 0) {
      form.includedTickets.forEach((t) => fd.append("includedTickets", t));
    }

    if (form.images) {
      Array.from(form.images).forEach((img) =>
        fd.append("images", img)
      );
    }

    try {
      let res;

      if (editingId) {
        res = await axios.put(`${BASE_URL}/individual-tours/${editingId}`, fd);
        toast.success("Individual tour updated ✅");
        setOpen(false);
      } else {
        res = await axios.post(`${BASE_URL}/individual-tours`, fd);
        toast.success("Individual tour added 🎉");
        
        setCreatedTourId(res.data._id);
        setItineraryDays(Number(form.days));
        setModalStep("itinerary");
      }

      fetchTours();

    } catch (err) {
      console.error("INDIVIDUAL TOUR ERROR:", err);
      toast.error(err.response?.data?.message || "Operation failed ❌");
    } finally {
      setLoading(false);
    }
  };

  /* EDIT */
  const handleEdit = (tour) => {
    setForm({
      title: tour.title,
      description: tour.description,
      days: tour.days,
      nights: tour.nights,
      location: tour.location,
      oldPrice: tour.oldPrice,
      discount: tour.discount,
      images: null,
      includedTickets: tour.includedTickets || []
    });
    setEditingId(tour._id);
    setCreatedTourId(tour._id);
    setItineraryDays(Number(tour.days));
    setModalStep("details");
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
            <p className="text-sm mt-1 font-semibold text-orange-600">
              ⏱ {formatDuration(t.days, t.nights)}
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
                className="bg-blue-50 text-blue-600 flex-1 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors">
                <Edit size={16} /> Edit Tour
              </button>
              <button onClick={() => handleDelete(t._id)}
                className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
                aria-label="Delete tour">
                <Trash2 size={16} />
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
              className="bg-white w-full max-w-lg rounded-2xl p-6 max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              {/* ===== HEADER ===== */}
              <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10 pb-2 border-b">
                <div className="flex gap-4">
                   <button 
                     onClick={() => setModalStep("details")}
                     className={`text-lg font-bold transition-colors ${modalStep === "details" ? "text-[#f4612b]" : "text-gray-400 hover:text-gray-600"}`}
                   >
                     {editingId ? "Edit Tour" : "Add Tour"}
                   </button>
                   { (editingId || createdTourId) && (
                     <button 
                       onClick={() => setModalStep("itinerary")}
                       className={`text-lg font-bold transition-colors ${modalStep === "itinerary" ? "text-[#f4612b]" : "text-gray-400 hover:text-gray-600"}`}
                     >
                       Manage Itinerary
                     </button>
                   )}
                </div>
                <X
                  className="cursor-pointer hover:text-red-500 transition-colors"
                  onClick={() => {
                    setOpen(false);
                    setForm(emptyForm);
                    setEditingId(null);
                    setCreatedTourId(null);
                    setModalStep("details");
                  }}
                />
              </div>

              {/* ===== INTEGRATED CONTENT ===== */}
              {modalStep === "details" ? (
                <form onSubmit={handleSubmit} className="space-y-5">

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

                {/* 🔥 INCLUDED TICKETS SECTION */}
                <div className="border p-3 rounded-lg bg-gray-50">
                  <label className="text-sm font-bold text-[#f4612b] block mb-2">Included Tickets</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      placeholder="e.g. Sasan Safari Ticket"
                      value={form.ticketInput || ""}
                      onChange={(e) => setForm({ ...form, ticketInput: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (form.ticketInput?.trim()) {
                            const newTickets = [...(form.includedTickets || []), form.ticketInput.trim()];
                            setForm({ ...form, includedTickets: newTickets, ticketInput: "" });
                          }
                        }
                      }}
                      className="flex-1 border p-2 rounded-lg text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (form.ticketInput?.trim()) {
                          const newTickets = [...(form.includedTickets || []), form.ticketInput.trim()];
                          setForm({ ...form, includedTickets: newTickets, ticketInput: "" });
                        }
                      }}
                      className="bg-[#f4612b] text-white px-3 rounded-lg text-sm"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(form.includedTickets || []).map((t, idx) => (
                      <span key={idx} className="bg-white border border-[#f4612b] text-[#f4612b] px-3 py-1 rounded-full text-xs flex items-center gap-1">
                        {t}
                        <X size={12} className="cursor-pointer" onClick={() => {
                          const newer = form.includedTickets.filter((_, i) => i !== idx);
                          setForm({ ...form, includedTickets: newer });
                        }} />
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  disabled={loading}
                  className="w-full bg-[#f4612b] text-white py-2
                       rounded-lg font-semibold"
                >
                  {loading ? "Saving..." : "Save Tour"}
                </button>
              </form>
              ) : (
                <AdminItinerary
                  tourId={createdTourId}
                  totalDays={itineraryDays}
                  type="individual"
                  onClose={() => {
                    setOpen(false);
                    setForm(emptyForm);
                    setEditingId(null);
                    setCreatedTourId(null);
                    setModalStep("details");
                  }}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminIndividualTour;
